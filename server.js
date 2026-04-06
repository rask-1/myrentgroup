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
  
  // Получаем бюджет (очищаем от не-цифр)
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
  
  const bitrixData = {
    fields: {
      // ✅ СДЕЛКА (не Лид!)
      TITLE: `Заявка с сайта - ${name}`,
      
      // ✅ ВОРОНКА "RENT GROUP"
      CATEGORY_ID: RENT_GROUP_FUNNEL_ID,
      
      // ✅ СТАТУС СДЕЛКИ
      STATUS_ID: 'NEW',
      
      // ✅ СУММА СДЕЛКИ (из бюджета)
      OPPORTUNITY: budget,
      CURRENCY_ID: 'USD',
      
      // ✅ ИСТОЧНИК
      SOURCE_ID: 'WEB',
      SOURCE_DESCRIPTION: goal,
      
      // ✅ КОНТАКТ (создаётся вместе со сделкой)
      CONTACT: {
        NAME: name,
        PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }]
      },
      
      // ✅ КОММЕНТАРИЙ
      COMMENTS: `
📋 Данные формы:
Тип формы: ${data.formType || 'Неизвестно'}
Бюджет: ${budgetRaw}
Цель покупки: ${goal}
Время: ${data.timestamp || new Date().toISOString()}
Язык: ${data.language || 'ru'}
IP: ${data.ip || 'Не указан'}
      `.trim()
    },
    params: {
      REGISTER_SONET_EVENT: "Y"
    }
  };
  
  console.log('\n📤 ОТПРАВЛЯЕМ В BITRIX24 (СДЕЛКА):');
  console.log(JSON.stringify(bitrixData, null, 2));
  
  // ✅ МЕТОД: crm.deal.add (НЕ crm.lead.add!)
  const response = await axios.post(
    `${BITRIX24_WEBHOOK}crm.deal.add`,
    bitrixData,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (response.data.error) {
    console.error('\n❌ ОШИБКА:', response.data);
    throw new Error(response.data.error_description);
  }
  
  console.log('\n✅ УСПЕХ! Сделка создана в воронке Rent Group:', response.data.result);
  return response.data;
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