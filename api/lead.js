export default async function handler(req, res) {
  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const now = Date.now();
  
  if (global.lastSubmission && global.lastSubmission[ip]) {
    const timeDiff = now - global.lastSubmission[ip];
    if (timeDiff < 10000) {
      return res.status(429).json({ error: 'Too many requests' });
    }
  }
  global.lastSubmission = global.lastSubmission || {};
  global.lastSubmission[ip] = now;

  // Получаем данные из формы
  const { name, phone, budget, goal, formType } = req.body;
  
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone required' });
  }

  // Очистка от XSS
  const sanitize = (str) => {
    if (!str) return '';
    return str.replace(/[<>"'&]/g, '');
  };

  const cleanData = {
    name: sanitize(name),
    phone: sanitize(phone),
    budget: sanitize(budget),
    goal: sanitize(goal),
    formType: sanitize(formType),
    timestamp: new Date().toISOString(),
    ip: ip
  };

  // Bitrix24 Webhook
  const BITRIX24_WEBHOOK = process.env.BITRIX24_WEBHOOK;
  
  // ID ВОРОНКИ "RENT GROUP"
  const RENT_GROUP_FUNNEL_ID = 1; // ← ЗАМЕНИ НА СВОЙ ID!
  
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
          OPPORTUNITY: cleanData.budget ? parseInt(cleanData.budget.replace(/[^0-9]/g, '')) : 0,
          CURRENCY_ID: 'USD',
          SOURCE_ID: 'WEB',
          SOURCE_DESCRIPTION: cleanData.goal,
          CONTACT_ID: contactId, // ← ПРИВЯЗЫВАЕМ КОНТАКТ!
          COMMENTS: `
📋 Данные формы:
Тип формы: ${cleanData.formType}
Бюджет: ${cleanData.budget || 'Не указан'}
Цель: ${cleanData.goal || 'Не указана'}
Время: ${cleanData.timestamp}
IP: ${cleanData.ip}
Телефон: ${cleanData.phone}
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
    console.error('❌ Error:', error);
    return res.status(500).json({ error: 'Server error', message: error.message });
  }
}