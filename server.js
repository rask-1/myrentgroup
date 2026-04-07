const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const BITRIX24_WEBHOOK = 'https://b24-xrpmdc.bitrix24.ru/rest/15/7qwwvmnd2h3mupgo/';
const RENT_GROUP_FUNNEL_ID = 1;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'client')));

app.post('/api/lead', async (req, res) => {
  const leadData = req.body;
  
  console.log('🔥 NEW DEAL:', new Date().toISOString());
  console.log('📝 Data:', leadData);
  
  try {
    await sendToBitrix24(leadData);
    console.log('✅ Sent to Bitrix24 as DEAL');
  } catch (error) {
    console.error('❌ Bitrix24 error:', error.message);
  }
  
  res.json({ success: true, message: 'Deal received' });
});

async function sendToBitrix24(data) {
  console.log('\n📊 ДАННЫЕ С ФОРМЫ:');
  console.log('Все данные:', JSON.stringify(data, null, 2));
  
  const name = data['Ваше имя'] || data['name'] || 'Новая сделка';
  const phone = data['Телефон / Мессенджер'] || 
                data['Телефон'] || 
                data['yourPhone'] || 
                data['phone'] || 
                data['Ваш телефон'] || 
                '';
  
  const budgetRaw = data['Ваш бюджет'] || 
                   data['yourBudget'] || 
                   data['budget'] || 
                   '0';
  const budget = parseInt(budgetRaw.replace(/[^0-9]/g, '')) || 0;
  
  const goal = data['Цель покупки'] || 
               data['buyGoal'] || 
               data['goal'] || 
               'Не указана';
  
  // 🔥 ОПРЕДЕЛЯЕМ ТИП ФОРМЫ
  const formType = data.formType || 'website';
  const isBot = formType === 'telegram_bot';
  
  try {
    // ✅ ШАГ 1: СОЗДАЁМ КОНТАКТ
    const contactResponse = await axios.post(
      `${BITRIX24_WEBHOOK}crm.contact.add`,
      {
        fields: {
          NAME: name,
          PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }]
        }
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    if (contactResponse.data.error) {
      console.error('❌ Ошибка создания контакта:', contactResponse.data);
      throw new Error('Failed to create contact');
    }
    
    const contactId = contactResponse.data.result;
    console.log('✅ Контакт создан:', contactId);
    
    // ✅ ШАГ 2: СОЗДАЁМ СДЕЛКУ
    const dealResponse = await axios.post(
      `${BITRIX24_WEBHOOK}crm.deal.add`,
      {
        fields: {
          // 🔥 ГЛАВНОЕ: МЕТКА БОТА В ЗАГОЛОВКЕ
          TITLE: isBot 
            ? `🤖 Заявка с бота - ${name}` 
            : `Заявка с сайта - ${name}`,
          
          CATEGORY_ID: RENT_GROUP_FUNNEL_ID,
          STATUS_ID: 'NEW',
          OPPORTUNITY: budget,
          CURRENCY_ID: 'USD',
          SOURCE_ID: 'WEB',
          
          // 🔥 ИСТОЧНИК
          SOURCE_DESCRIPTION: isBot
            ? `Telegram Bot (${data.language || 'ru'})`
            : (goal || 'Не указана'),
          
          CONTACT_ID: contactId,
          
          // 🔥 КОММЕНТАРИЙ
          COMMENTS: `
📋 Данные формы:
Тип формы: ${isBot ? '🤖 Telegram Bot' : '🌐 Сайт'}
Источник: ${data.source || (isBot ? 'Telegram Bot' : 'Сайт')}
Язык: ${data.language || 'ru'}
Бюджет: ${budgetRaw}
Цель: ${goal}
Время: ${data.timestamp || new Date().toISOString()}
IP: ${data.ip || 'Не указан'}
Телефон: ${phone}
Telegram ID: ${data.telegramUserId || 'Нет'}
Telegram Username: @${data.telegramUsername || 'Нет'}
          `.trim()
        },
        params: { REGISTER_SONET_EVENT: "Y" }
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    if (dealResponse.data.error) {
      console.error('❌ Ошибка создания сделки:', dealResponse.data);
      throw new Error('Failed to create deal');
    }
    
    console.log('\n✅ УСПЕХ! Сделка создана:', dealResponse.data.result);
    console.log('🤖 Is bot:', isBot);
    
    return dealResponse.data;
    
  } catch (error) {
    console.error('❌ Критическая ошибка:', error.message);
    throw error;
  }
}

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  🏠 RENT GROUP - Server                   ║
║  📍 http://localhost:${PORT}                ║
║  🔗 Bitrix24: DEALS + Bot Label          ║
╚════════════════════════════════════════════╝
  `);
});