export default async function handler(req, res) {
  // Telegram Webhook принимает только POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const update = req.body;
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!BOT_TOKEN) {
    console.error('❌ TELEGRAM_BOT_TOKEN not set');
    return res.status(500).json({ error: 'Bot token not configured' });
  }

  const api = (method, data) => 
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

  // ============================================
  // ОБРАБОТКА /start
  // ============================================
  if (update.message?.text === '/start') {
    const chatId = update.message.chat.id;
    const firstName = update.message.from.first_name;
    
    await api('sendMessage', {
      chat_id: chatId,
      text: `👋 Привет, ${firstName}!\n\n🏠 Добро пожаловать в Rent Group!\n\n🔹 Подберём квартиру в Батуми за 24 часа\n🔹 Рассрочка от застройщика\n🔹 Юридическая поддержка`,
      reply_markup: {
        inline_keyboard: [[
          { text: '🏠 Каталог квартир', url: 'https://myrentgroup.com/' },
          { text: '📩 Оставить заявку', callback_data: 'lead_start' }
        ],[
          { text: '🔥 Канал Rent Group', url: 'https://t.me/rent_group_geo' },
          { text: '📞 Связаться', url: 'https://wa.me/995599322122' }
        ]]
      }
    });
  }

  // ============================================
  // ОБРАБОТКА CALLBACK (кнопки)
  // ============================================
  if (update.callback_query) {
    const callback = update.callback_query;
    const chatId = callback.message.chat.id;
    const userId = callback.from.id;
    const data = callback.data;

    // Кнопка "Оставить заявку"
    if (data === 'lead_start') {
      // Сохраняем состояние пользователя
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: callback.id })
      });

      await api('sendMessage', {
        chat_id: chatId,
        text: '✍️ Напишите ваше имя:',
        reply_markup: { force_reply: true, input_field_placeholder: 'Ваше имя' }
      });

      // Сохраняем состояние в "базе" (простой объект в памяти)
      if (!global.botStates) global.botStates = {};
      global.botStates[userId] = { step: 'waiting_name', chatId };
    }

    return res.status(200).json({ ok: true });
  }

  // ============================================
  // ОБРАБОТКА ОТВЕТОВ (форма заявки)
  // ============================================
  if (update.message?.reply_to_message) {
    const userId = update.message.from.id;
    const chatId = update.message.chat.id;
    const userText = update.message.text;
    
    // Получаем состояние пользователя
    if (!global.botStates) global.botStates = {};
    const state = global.botStates[userId];
    
    if (!state) {
      // Нет активного состояния — игнорируем
      return res.status(200).json({ ok: true });
    }

    // ШАГ 1: Получили имя
    if (state.step === 'waiting_name' && userText) {
      state.name = userText.trim();
      state.step = 'waiting_phone';
      
      await api('sendMessage', {
        chat_id: chatId,
        text: '📱 Теперь напишите ваш телефон в формате +995 _________',
        reply_markup: { force_reply: true, input_field_placeholder: '+995 ...' }
      });
      
      return res.status(200).json({ ok: true });
    }
    
    // ШАГ 2: Получили телефон → отправляем в Bitrix24
    if (state.step === 'waiting_phone' && userText) {
      const phone = userText.trim();
      const name = state.name;
      
      // Отправляем в Bitrix24
      try {
        const bitrixResponse = await fetch('https://myrentgroup.com/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            phone: phone,
            formType: 'telegram_bot',  // ← МЕТКА ДЛЯ BITRIX24
            source: 'Telegram Bot',
            telegramUserId: userId,
            telegramUsername: update.message.from.username,
            timestamp: new Date().toISOString()
          })
        });
        
        if (bitrixResponse.ok) {
          await api('sendMessage', {
            chat_id: chatId,
            text: `✅ Спасибо, ${name}!\n\nВаша заявка принята. Менеджер свяжется с вами в ближайшее время. 📞`,
            reply_markup: {
              inline_keyboard: [[
                { text: '🏠 Вернуться в каталог', url: 'https://myrentgroup.com/' }
              ]]
            }
          });
        } else {
          await api('sendMessage', {
            chat_id: chatId,
            text: '❌ Произошла ошибка. Попробуйте позже или напишите нам напрямую: @rent_group_geo'
          });
        }
      } catch (error) {
        console.error('Bitrix24 error:', error);
        await api('sendMessage', {
          chat_id: chatId,
          text: '❌ Ошибка соединения. Попробуйте позже.'
        });
      }
      
      // Очищаем состояние
      delete global.botStates[userId];
      return res.status(200).json({ ok: true });
    }
  }

  // ============================================
  // ВСЕГДА ОТВЕЧАЕМ 200
  // ============================================
  return res.status(200).json({ ok: true });
}