export default async function handler(req, res) {
  // Telegram Webhook принимает только POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const update = req.body;
  
  // Обрабатываем сообщение
  if (update.message?.text === '/start') {
    const chatId = update.message.chat.id;
    const firstName = update.message.from.first_name;
    
    // Отправляем ответ
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `👋 Привет, ${firstName}!\n\n🏠 Добро пожаловать в Rent Group!\n\n🔹 Подберём квартиру в Батуми за 24 часа\n🔹 Рассрочка от застройщика\n🔹 Юридическая поддержка\n\n👇 Нажми на кнопку меню ниже, чтобы начать подбор!`,
        reply_markup: {
          inline_keyboard: [[
            { text: '🔹 Сайт Rent Group', url: 'https://myrentgroup.com/' },
            { text: '📞 Связаться', url: 'https://t.me/Rent_Group_Batumi' }
          ]]
        }
      })
    });
  }
  
  // Всегда отвечаем 200, чтобы Телеграм не спамил
  return res.status(200).json({ ok: true });
}