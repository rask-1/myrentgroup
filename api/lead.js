export default async function handler(req, res) {
  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || 'unknown';
  const now = Date.now();
  
  if (!global.lastSubmission) global.lastSubmission = {};
  if (global.lastSubmission[ip] && (now - global.lastSubmission[ip] < 10000)) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  global.lastSubmission[ip] = now;

  // Получаем данные из формы
  const { telegramInitData, name, phone, budget, goal, formType, source, language, telegramUserId, telegramUsername } = req.body;
  
  // Валидация базовых полей
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone required' });
  }

  // Проверка Telegram данных (если есть токен и initData)
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  if (telegramInitData && BOT_TOKEN) {
    try {
      const urlParams = new URLSearchParams(telegramInitData);
      const hash = urlParams.get('hash');
      if (hash) {
        urlParams.delete('hash');
        const dataCheckString = Array.from(urlParams.entries())
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, value]) => `${key}=${value}`)
          .join('\n');
        const crypto = await import('crypto');
        const secretKey = crypto.default
          .createHmac('sha256', 'WebAppData')
          .update(BOT_TOKEN)
          .digest();
        const calculatedHash = crypto.default
          .createHmac('sha256', secretKey)
          .update(dataCheckString)
          .digest('hex');
        if (calculatedHash !== hash) {
          console.error('❌ Invalid Telegram initData');
          // Не блокируем, просто логируем
        }
      }
    } catch (e) {
      console.error('Telegram validation error:', e);
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
    source: sanitize(source),
    language: sanitize(language),
    telegramUserId: telegramUserId,
    telegramUsername: sanitize(telegramUsername),
    timestamp: new Date().toISOString(),
    ip: ip
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
          // 🔥 ГЛАВНОЕ: МЕТКА "ЗАЯВКА С БОТА"
          TITLE: cleanData.formType === 'telegram_bot' 
            ? `🤖 Заявка с бота - ${cleanData.name}` 
            : `Заявка с сайта - ${cleanData.name}`,
          
          CATEGORY_ID: RENT_GROUP_FUNNEL_ID,
          STATUS_ID: 'NEW',
          OPPORTUNITY: cleanData.budget ? parseInt(String(cleanData.budget).replace(/[^0-9]/g, '')) || 0 : 0,
          CURRENCY_ID: 'USD',
          SOURCE_ID: 'WEB',
          
          // 🔥 ИСТОЧНИК: Telegram Bot или Сайт
          SOURCE_DESCRIPTION: cleanData.formType === 'telegram_bot'
            ? `Telegram Bot (${cleanData.language || 'ru'})`
            : (cleanData.goal || 'Не указана'),
          
          CONTACT_ID: contactId,
          
          // 🔥 КОММЕНТАРИЙ С ПОЛНОЙ ИНФОРМАЦИЕЙ
          COMMENTS: `
📋 Данные формы:
Тип формы: ${cleanData.formType === 'telegram_bot' ? '🤖 Telegram Bot' : '🌐 Сайт'}
Источник: ${cleanData.source || (cleanData.formType === 'telegram_bot' ? 'Telegram Bot' : 'Сайт')}
Язык: ${cleanData.language || 'ru'}
Бюджет: ${cleanData.budget || 'Не указан'}
Цель: ${cleanData.goal || 'Не указана'}
Время: ${cleanData.timestamp}
IP: ${cleanData.ip}
Телефон: ${cleanData.phone}
Telegram ID: ${cleanData.telegramUserId || 'Нет'}
Telegram Username: @${cleanData.telegramUsername || 'Нет'}
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
    console.log('🤖 Form type:', cleanData.formType);
    
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