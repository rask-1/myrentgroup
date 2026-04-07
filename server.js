const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// ⚠️ ВСТАВЬ СЮДА СВОЙ ВЕБХУК ИЗ BITRIX24
const BITRIX24_WEBHOOK = 'https://b24-xrpmdc.bitrix24.ru/rest/15/7qwwvmnd2h3mupgo/';

// ⚠️ ID ВОРОНКИ "RENT GROUP" - ЗАМЕНИ 15 НА СВОЙ!
// Как узнать: Сделки → нажми на название воронки → посмотри в URL category_id=XX
const RENT_GROUP_FUNNEL_ID = 1;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // корень
app.use(express.static(path.join(__dirname, 'client')));

app.post('/api/lead', async (req, res) => {
  const leadData = req.body;
  
  console.log('🔥 NEW DEAL:', new Date().toISOString());
  console.log('📝 Data:', leadData);
  
  // Отправка в Bitrix24
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
  
  // Получаем имя и телефон
  const name = data['Ваше имя'] || data['name'] || 'Новая сделка';
  const phone = data['Телефон / Мессенджер'] || 
                data['Телефон'] || 
                data['yourPhone'] || 
                data['phone'] || 
                data['Ваш телефон'] || 
                '';
  
  // Получаем бюджет
  const budgetRaw = data['Ваш бюджет'] || 
                   data['yourBudget'] || 
                   data['budget'] || 
                   '0';
  const budget = parseInt(budgetRaw.replace(/[^0-9]/g, '')) || 0;
  
  // Получаем цель
  const goal = data['Цель покупки'] || 
               data['buyGoal'] || 
               data['goal'] || 
               'Не указана';
  
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
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    if (contactResponse.data.error) {
      console.error('❌ Ошибка создания контакта:', contactResponse.data);
      throw new Error('Failed to create contact');
    }
    
    const contactId = contactResponse.data.result;
    console.log('✅ Контакт создан:', contactId);
    
    // ✅ ШАГ 2: СОЗДАЁМ СДЕЛКУ И ПРИВЯЗЫВАЕМ КОНТАКТ
    const dealResponse = await axios.post(
      `${BITRIX24_WEBHOOK}crm.deal.add`,
      {
        fields: {
          TITLE: `Заявка с сайта - ${name}`,
          CATEGORY_ID: RENT_GROUP_FUNNEL_ID,
          STATUS_ID: 'NEW',
          OPPORTUNITY: budget,
          CURRENCY_ID: 'USD',
          SOURCE_ID: 'WEB',
          SOURCE_DESCRIPTION: goal,
          
          // ✅ ПРИВЯЗЫВАЕМ КОНТАКТ ПО ID
          CONTACT_ID: contactId,
          
          COMMENTS: `
📋 Данные формы:
Тип формы: ${data.formType || 'Неизвестно'}
Бюджет: ${budgetRaw}
Цель покупки: ${goal}
Время: ${data.timestamp || new Date().toISOString()}
Язык: ${data.language || 'ru'}
IP: ${data.ip || 'Не указан'}
Телефон: ${phone}
          `.trim()
        },
        params: {
          REGISTER_SONET_EVENT: "Y"
        }
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    if (dealResponse.data.error) {
      console.error('❌ Ошибка создания сделки:', dealResponse.data);
      throw new Error('Failed to create deal');
    }
    
    console.log('\n✅ УСПЕХ! Сделка создана:', dealResponse.data.result);
    console.log('📞 Контакт с телефоном привязан:', contactId);
    
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
║  🔗 Bitrix24: DEALS → Rent Group Funnel  ║
╚════════════════════════════════════════════╝
  `);
});