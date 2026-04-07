import crypto from 'crypto';

// Функция для проверки initData от Телеграм
function validateTelegramData(initData, botToken) {
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    if (!hash) return false;
    
    urlParams.delete('hash');
    
    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();
    
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');
    
    return calculatedHash === hash;
  } catch (e) {
    console.error('Telegram validation error:', e);
    return false;
  }
}

export default async function handler(req, res) {
  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting (простой, для серверлесс)
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || 'unknown';
  const now = Date.now();
  
  if (!global.lastSubmission) global.lastSubmission = {};
  if (global.lastSubmission[ip] && (now - global.lastSubmission[ip] < 10000)) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  global.lastSubmission[ip] = now;

  // Получаем данные из формы
  const { telegramInitData, name, phone, budget, goal, formType } = req.body;
  
  // Валидация базовых полей
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone required' });
  }

  // Проверка Telegram данных (если есть токен и initData)
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  if (telegramInitData && BOT_TOKEN) {
    const isValid = validateTelegramData(telegramInitData, BOT_TOKEN);
    if (!isValid) {
      console.error('❌ Invalid Telegram initData');
      return res.status(401).json({ error: 'Invalid Telegram data' });
    }
  }

  // Очистка от XSS
  const sanitize = (str) => {
    if (!str) return '';
    return String(str).replace(/[<>"'&]/g, '');
  };

  const cleanData = {
    name: sanitize(name),
    phone: sanitize(phone),
    budget: sanitize(budget),
    goal: sanitize(goal),
    formType: sanitize(formType),
    timestamp: new Date().toISOString(),
    ip: ip,
    telegramUserId: telegramInitData ? JSON.parse(Buffer.from(telegramInitData.split('=')[1]?.split('&')[0] || '', 'base64').toString())?.id : null
  };

  // Bitrix24 Webhook
  const BITRIX24_WEBHOOK = process.env.BITRIX24_WEBHOOK;
  
  if (!BITRIX24_WEBHOOK) {
    console.error('❌ BITRIX24_WEBHOOK not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }
  
  // ID ВОРОНКИ "RENT GROUP" (замени на свой!)
  const RENT_GROUP_FUNNEL_ID = 1;
  
  try {
    // ✅ ШАГ 1: СОЗДАЁМ КОНТАКТ С ТЕЛЕФОНОМ
    const contactResponse = await fetch(`${BITRIX24_WEBHOOK}crm.contact.add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          NAME: cleanData.name,
          PHONE: [{ VALUE: cleanData.phone, VALUE_TYPE: 'WORK' }]
        }
      })
    });

    const contactResult = await contactResponse.json();
    
    if (contactResult.error) {
      console.error('❌ Ошибка создания контакта:', contactResult);
      return res.status(500).json({ error: 'Failed to create contact', details: contactResult });
    }

    const contactId = contactResult.result;
    console.log('✅ Контакт создан:', contactId);

    // ✅ ШАГ 2: СОЗДАЁМ СДЕЛКУ И ПРИВЯЗЫВАЕМ КОНТАКТ
    const dealResponse = await fetch(`${BITRIX24_WEBHOOK}crm.deal.add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          TITLE: `Заявка с сайта - ${cleanData.name}`,
          CATEGORY_ID: RENT_GROUP_FUNNEL_ID,
          STATUS_ID: 'NEW',
          OPPORTUNITY: cleanData.budget ? parseInt(String(cleanData.budget).replace(/[^0-9]/g, '')) || 0 : 0,
          CURRENCY_ID: 'USD',
          SOURCE_ID: 'WEB',
          SOURCE_DESCRIPTION: cleanData.goal || 'Не указана',
          CONTACT_ID: contactId,
          COMMENTS: `
📋 Данные формы:
Тип формы: ${cleanData.formType || 'Неизвестно'}
Бюджет: ${cleanData.budget || 'Не указан'}
Цель: ${cleanData.goal || 'Не указана'}
Время: ${cleanData.timestamp}
IP: ${cleanData.ip}
Телефон: ${cleanData.phone}
Telegram ID: ${cleanData.telegramUserId || 'Нет'}
          `.trim()
        }
      })
    });

    const dealResult = await dealResponse.json();
    
    if (dealResult.error) {
      console.error('❌ Ошибка создания сделки:', dealResult);
      return res.status(500).json({ error: 'Failed to create deal', details: dealResult });
    }

    console.log('✅ Сделка создана:', dealResult.result);
    console.log('📞 Телефон сохранён в контакте:', cleanData.phone);
    
    return res.status(200).json({ 
      success: true, 
      dealId: dealResult.result,
      contactId: contactId 
    });
    
  } catch (error) {
    console.error('❌ Critical error:', error);
    return res.status(500).json({ 
      error: 'Server error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}