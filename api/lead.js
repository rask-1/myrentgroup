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
  
  // ⚠️ ID ВОРОНКИ "RENT GROUP" - ЗАМЕНИ НА СВОЙ!
  const RENT_GROUP_FUNNEL_ID = 1; // ← ВПИШИ СЮДА ID ВОРОНКИ!
  
  try {
    // Создаём СДЕЛКУ (не Лид!)
    const response = await fetch(`${BITRIX24_WEBHOOK}crm.deal.add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          TITLE: `Заявка с сайта - ${cleanData.name}`,
          OPPORTUNITY: cleanData.budget ? cleanData.budget.replace(/[^0-9-]/g, '') : 0,
          CATEGORY_ID: RENT_GROUP_FUNNEL_ID, // ID воронки Rent Group
          STATUS_ID: 'NEW', // Новая сделка
          SOURCE_ID: 'WEB',
          CONTACT: {
            NAME: cleanData.name,
            PHONE: [{ VALUE: cleanData.phone, VALUE_TYPE: 'WORK' }]
          },
          COMMENTS: `
Тип формы: ${cleanData.formType}
Бюджет: ${cleanData.budget || 'Не указан'}
Цель: ${cleanData.goal || 'Не указана'}
Время: ${cleanData.timestamp}
IP: ${cleanData.ip}
          `.trim()
        }
      })
    });

    const result = await response.json();
    
    if (result.error) {
      console.error('Bitrix24 error:', result);
      return res.status(500).json({ error: 'Failed to create deal', details: result });
    }

    console.log('✅ Deal created:', result.result);
    return res.status(200).json({ success: true, dealId: result.result });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error', message: error.message });
  }
}