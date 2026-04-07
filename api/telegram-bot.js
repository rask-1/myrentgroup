// Переводы для бота
const BOT_I18N = {
  ru: {
    welcome: `👋 Привет! Добро пожаловать в Rent Group!

🏠 Подберём квартиру в Батуми за 24 часа
🔹 Рассрочка от застройщика
🔹 Юридическая поддержка
🔹 Доходность 10-14% годовых

🌐 Наш сайт: myrentgroup.com (кнопка "Site" в меню)

Выберите язык / Select language:`,
    selectLang: '🌐 Выберите язык:',
    langRu: '🇷🇺 Русский',
    langEn: '🇬🇧 English',
    
    privacyTitle: '📋 Политика конфиденциальности',
    privacyText: `Мы обрабатываем ваши персональные данные в соответствии с политикой конфиденциальности.

🔗 Полная версия:`,
    privacyAgree: '✅ Я согласен с политикой конфиденциальности',
    privacyDecline: '❌ Отмена',
    
    mainMenu: `🏠 Главное меню Rent Group

📌 Наш сайт: myrentgroup.com (кнопка "Site" в меню)

Выберите действие:`,
    leaveRequest: '📩 Оставить заявку',
    contactUs: '📞 Связаться с нами',
    channel: '🔥 Наш канал',
    
    enterName: '✍️ Напишите ваше имя:',
    enterPhone: '📱 Теперь напишите ваш телефон в формате +X XXX XXX XX',
    
    success: `✅ Спасибо, {name}!

Ваша заявка принята. Менеджер свяжется с вами в ближайшее время. 📞`,
    error: '❌ Произошла ошибка. Попробуйте позже или напишите нам: @rent_group_geo',
    cancel: '❌ Заявка отменена',
    
    backToMenu: '🏠 В главное меню'
  },
  en: {
    welcome: `👋 Hello! Welcome to Rent Group!

🏠 We'll find an apartment in Batumi in 24 hours
🔹 Installment plan from developer
🔹 Legal support
🔹 Return 10-14% per annum

🌐 Our website: myrentgroup.com ("Site" button in menu)

Select language / Выберите язык:`,
    selectLang: '🌐 Select language:',
    langRu: '🇷🇺 Русский',
    langEn: '🇬🇧 English',
    
    privacyTitle: '📋 Privacy Policy',
    privacyText: `We process your personal data in accordance with our privacy policy.

🔗 Full version:`,
    privacyAgree: '✅ I agree with the Privacy Policy',
    privacyDecline: '❌ Cancel',
    
    mainMenu: `🏠 Rent Group Main Menu

📌 Our website: myrentgroup.com ("Site" button in menu)

Select action:`,
    leaveRequest: '📩 Leave a request',
    contactUs: '📞 Contact us',
    channel: '🔥 Our channel',
    
    enterName: '✍️ Please enter your name:',
    enterPhone: '📱 Now enter your phone in format +X XXX XXX XX',
    
    success: `✅ Thank you, {name}!

Your request has been received. Our manager will contact you soon. 📞`,
    error: '❌ An error occurred. Try later or contact us: @rent_group_geo',
    cancel: '❌ Request cancelled',
    
    backToMenu: '🏠 Main menu'
  }
};

// Ссылка на политику и сайт
const POLICY_URL = 'https://myrentgroup.com/policy';
const SITE_URL = 'https://myrentgroup.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const update = req.body;
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!BOT_TOKEN) {
    console.error('❌ TELEGRAM_BOT_TOKEN not set');
    return res.status(500).json({ error: 'Bot token not configured' });
  }

  // Helper для API Telegram
  const api = (method, data) => 
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

  // Инициализация хранилища состояний
  if (!global.botStates) global.botStates = {};

  // ============================================
  // ПОЛУЧЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  // ============================================
  const getMessageData = () => {
    if (update.message) return { 
      chatId: update.message.chat.id, 
      userId: update.message.from.id, 
      text: update.message.text,
      username: update.message.from.username,
      firstName: update.message.from.first_name,
      message: update.message 
    };
    if (update.callback_query) return {
      chatId: update.callback_query.message.chat.id,
      userId: update.callback_query.from.id,
      data: update.callback_query.data,
      username: update.callback_query.from.username,
      firstName: update.callback_query.from.first_name,
      callback: update.callback_query
    };
    return null;
  };

  const userData = getMessageData();
  if (!userData) return res.status(200).json({ ok: true });

  const { chatId, userId, text, data, username, firstName, message, callback } = userData;
  const state = global.botStates[userId] || {};
  const lang = state.lang || 'ru';
  const t = BOT_I18N[lang];

  // ============================================
  // ОБРАБОТКА /start
  // ============================================
  if (text === '/start') {
    delete global.botStates[userId];
    
    await api('sendMessage', {
      chat_id: chatId,
      text: t.welcome,
      reply_markup: {
        inline_keyboard: [[
          { text: t.langRu, callback_data: 'lang_ru' },
          { text: t.langEn, callback_data: 'lang_en' }
        ]]
      }
    });
    return res.status(200).json({ ok: true });
  }

  // ============================================
  // ОБРАБОТКА CALLBACK (кнопки)
  // ============================================
  if (callback) {
    await api('answerCallbackQuery', {
      callback_query_id: callback.id
    });

    // === ВЫБОР ЯЗЫКА ===
    if (data === 'lang_ru' || data === 'lang_en') {
      const newLang = data === 'lang_ru' ? 'ru' : 'en';
      
      global.botStates[userId] = { 
        ...state, 
        lang: newLang, 
        step: 'privacy' 
      };
      
      const newT = BOT_I18N[newLang];
      
      await api('editMessageText', {
        chat_id: chatId,
        message_id: callback.message.message_id,
        text: `${newT.privacyTitle}\n\n${newT.privacyText}\n${POLICY_URL}`,
        reply_markup: {
          inline_keyboard: [[
            { text: newT.privacyAgree, callback_data: 'privacy_agree' }
          ],[
            { text: newT.privacyDecline, callback_data: 'privacy_decline' }
          ]]
        }
      });
      return res.status(200).json({ ok: true });
    }

    // === СОГЛАСИЕ НА ПОЛИТИКУ → ГЛАВНОЕ МЕНЮ ===
    if (data === 'privacy_agree') {
      global.botStates[userId] = { 
        ...state, 
        step: 'privacy_agreed',
        privacyAccepted: true
      };
      
      await api('sendMessage', {
        chat_id: chatId,
        text: t.mainMenu,
        reply_markup: {
          inline_keyboard: [[
            { text: t.leaveRequest, callback_data: 'lead_start' }
          ],[
            { text: '🌐 Site', url: SITE_URL },
            { text: t.channel, url: 'https://t.me/rent_group_geo' }
          ],[
            { text: t.contactUs, url: 'https://wa.me/995599322122' }
          ]]
        }
      });
      return res.status(200).json({ ok: true });
    }

    if (data === 'privacy_decline') {
      delete global.botStates[userId];
      await api('sendMessage', {
        chat_id: chatId,
        text: t.cancel
      });
      return res.status(200).json({ ok: true });
    }

    // === НАЧАТЬ ЗАЯВКУ ===
    if (data === 'lead_start') {
      global.botStates[userId] = { ...state, step: 'waiting_name' };
      
      await api('sendMessage', {
        chat_id: chatId,
        text: t.enterName,
        reply_markup: { force_reply: true, input_field_placeholder: t.enterName }
      });
      return res.status(200).json({ ok: true });
    }

    // === ГЛАВНОЕ МЕНЮ ===
    if (data === 'menu_main') {
      await api('sendMessage', {
        chat_id: chatId,
        text: t.mainMenu,
        reply_markup: {
          inline_keyboard: [[
            { text: t.leaveRequest, callback_data: 'lead_start' }
          ],[
            { text: '🌐 Site', url: SITE_URL },
            { text: t.channel, url: 'https://t.me/rent_group_geo' }
          ],[
            { text: t.contactUs, url: 'https://wa.me/995599322122' }
          ]]
        }
      });
      return res.status(200).json({ ok: true });
    }

    return res.status(200).json({ ok: true });
  }

  // ============================================
  // ОБРАБОТКА ТЕКСТОВЫХ ОТВЕТОВ (форма)
  // ============================================
  if (message?.reply_to_message && state.step) {
    
    // === ШАГ 1: ПОЛУЧИЛИ ИМЯ ===
    if (state.step === 'waiting_name' && text) {
      global.botStates[userId] = { 
        ...state, 
        step: 'waiting_phone', 
        name: text.trim() 
      };
      
      await api('sendMessage', {
        chat_id: chatId,
        text: t.enterPhone,
        reply_markup: { force_reply: true, input_field_placeholder: t.enterPhone }
      });
      return res.status(200).json({ ok: true });
    }
    
    // === ШАГ 2: ПОЛУЧИЛИ ТЕЛЕФОН → ВАЛИДАЦИЯ → BITRIX24 ===
    if (state.step === 'waiting_phone' && text) {
      const phone = text.trim();
      
      // === ВАЛИДАЦИЯ ТЕЛЕФОНА ===
      const digitsOnly = phone.replace(/\D/g, '');
      
      if (digitsOnly.length < 7) {
        await api('sendMessage', {
          chat_id: chatId,
          text: `❌ Номер слишком короткий. Введите минимум 7 цифр.\n\nПример: +995 599 123 456`,
          reply_markup: { force_reply: true, input_field_placeholder: t.enterPhone }
        });
        return res.status(200).json({ ok: true });
      }
      
      if (digitsOnly.length > 15) {
        await api('sendMessage', {
          chat_id: chatId,
          text: `❌ Номер слишком длинный. Введите не более 15 цифр.\n\nПример: +995 599 123 456`,
          reply_markup: { force_reply: true, input_field_placeholder: t.enterPhone }
        });
        return res.status(200).json({ ok: true });
      }
      
      const name = state.name;
      
      try {
        // Отправка в Bitrix24 через твой API
        const bitrixResponse = await fetch('https://myrentgroup.com/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            phone: phone,
            formType: 'telegram_bot',  // ← МЕТКА ДЛЯ BITRIX24
            source: 'Telegram Bot',
            language: lang,
            telegramUserId: userId,
            telegramUsername: username,
            timestamp: new Date().toISOString()
          })
        });
        
        if (bitrixResponse.ok) {
          const successText = t.success.replace('{name}', name);
          
          await api('sendMessage', {
            chat_id: chatId,
            text: successText,
            reply_markup: {
              inline_keyboard: [[
                { text: t.backToMenu, callback_data: 'menu_main' }
              ]]
            }
          });
        } else {
          await api('sendMessage', {
            chat_id: chatId,
            text: t.error
          });
        }
      } catch (error) {
        console.error('Bitrix24 error:', error);
        await api('sendMessage', {
          chat_id: chatId,
          text: t.error
        });
      }
      
      // Очищаем состояние (сохраняем язык)
      global.botStates[userId] = { lang };
      return res.status(200).json({ ok: true });
    }
  }

  // ============================================
  // ВСЕГДА ОТВЕЧАЕМ 200
  // ============================================
  return res.status(200).json({ ok: true });
}