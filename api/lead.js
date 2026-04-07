export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, formType, source, language, telegramUserId } = req.body;
  
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone required' });
  }

  const BITRIX24_WEBHOOK = process.env.BITRIX24_WEBHOOK;
  
  if (!BITRIX24_WEBHOOK) {
    return res.status(500).json({ error: 'BITRIX24_WEBHOOK not set' });
  }

  // 🔥 ПРОВЕРКА: ЭТО БОТ?
  const isBot = formType === 'telegram_bot' || telegramUserId !== undefined;
  
  const title = isBot ? `🤖 Заявка с бота - ${name}` : `Заявка с сайта - ${name}`;

  try {
    // Создаём сделку СРАЗУ с контактом внутри
    const dealResponse = await fetch(`${BITRIX24_WEBHOOK}crm.deal.add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          TITLE: title,
          NAME: name,
          PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
          CATEGORY_ID: 1,
          STATUS_ID: 'NEW',
          CURRENCY_ID: 'USD',
          OPPORTUNITY: 0,
          SOURCE_ID: 'WEB',
          SOURCE_DESCRIPTION: isBot ? `Telegram Bot (${language || 'ru'})` : 'Сайт',
          COMMENTS: isBot 
            ? `🤖 Заявка из Telegram Bot\nTelegram ID: ${telegramUserId || 'Нет'}\nЯзык: ${language || 'ru'}`
            : '🌐 Заявка с сайта'
        }
      })
    });

    const dealResult = await dealResponse.json();
    
    if (dealResult.error) {
      return res.status(500).json({ 
        error: 'Bitrix24 error', 
        details: dealResult.error_description || dealResult.error 
      });
    }

    return res.status(200).json({ 
      success: true, 
      dealId: dealResult.result 
    });
    
  } catch (error) {
    return res.status(500).json({ 
      error: 'Server error', 
      message: error.message 
    });
  }
}