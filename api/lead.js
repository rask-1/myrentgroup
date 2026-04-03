export default async function handler(req, res) {
  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting (простая проверка)
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const now = Date.now();
  
  // Проверка на спам (можно добавить Redis для хранения)
  if (global.lastSubmission && global.lastSubmission[ip]) {
    const timeDiff = now - global.lastSubmission[ip];
    if (timeDiff < 10000) { // 10 секунд между заявками
      return res.status(429).json({ error: 'Too many requests' });
    }
  }
  global.lastSubmission = global.lastSubmission || {};
  global.lastSubmission[ip] = now;

  // Валидация данных
  const { name, phone, budget, goal } = req.body;
  
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone required' });
  }

  // Проверка телефона (только цифры и +)
  const phoneRegex = /^\+?[0-9\s\-\(\)]{10,20}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone format' });
  }

  // Очистка от XSS
  const sanitize = (str) => {
    if (!str) return '';
    return str.replace(/[<>\"'&]/g, '');
  };

  const cleanData = {
    name: sanitize(name),
    phone: sanitize(phone),
    budget: sanitize(budget),
    goal: sanitize(goal),
    timestamp: new Date().toISOString(),
    ip: ip
  };

  // Отправка в Bitrix24
  const BITRIX24_WEBHOOK = process.env.BITRIX24_WEBHOOK;
  
  try {
    const response = await fetch(`${BITRIX24_WEBHOOK}crm.lead.add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          TITLE: `Заявка с сайта - ${cleanData.name}`,
          NAME: cleanData.name,
          PHONE: [{ VALUE: cleanData.phone, VALUE_TYPE: 'WORK' }],
          STATUS_ID: 'ASSIGNED',
          SOURCE_ID: 'WEB',
          COMMENTS: `Бюджет: ${cleanData.budget}\nЦель: ${cleanData.goal}\nIP: ${cleanData.ip}`
        }
      })
    });

    const result = await response.json();
    
    if (result.error) {
      console.error('Bitrix24 error:', result);
      return res.status(500).json({ error: 'Failed to send lead' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}