const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// ⚠️ ВСТАВЬ СЮДА СВОЙ ВЕБХУК ИЗ BITRIX24
const BITRIX24_WEBHOOK = 'https://b24-xrpmdc.bitrix24.ru/rest/15/tg84as8mljzspraq/';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));

app.post('/api/lead', async (req, res) => {
  const leadData = req.body;
  
  console.log('🔥 NEW LEAD:', new Date().toISOString());
  console.log('📝 Data:', leadData);
  
  // Отправка в Bitrix24
  try {
    await sendToBitrix24(leadData);
    console.log('✅ Sent to Bitrix24');
  } catch (error) {
    console.error('❌ Bitrix24 error:', error.message);
  }
  
  res.json({ success: true, message: 'Lead received' });
});

async function sendToBitrix24(data) {
  console.log('\n📊 ДАННЫЕ С ФОРМЫ:');
  console.log('Все данные:', JSON.stringify(data, null, 2));
  
  const bitrixData = {
    fields: {
      TITLE: `Заявка с сайта - ${data['Ваше имя'] || data['name'] || 'Новый лид'}`,
      NAME: data['Ваше имя'] || data['name'] || '',
      
      PHONE: [
  {
    VALUE: data['Телефон / Мессенджер'] || 
           data['Телефон'] || 
           data['yourPhone'] || 
           data['phone'] || 
           data['Ваш телефон'] ||  // ← ДОБАВЬ ЭТО!
           '',
    VALUE_TYPE: 'WORK'
  }
],
      
      STATUS_ID: 'ASSIGNED',
      SOURCE_ID: 'WEB',
      
      // Теперь используем правильные ключи
      OPPORTUNITY: data['Ваш бюджет'] || 
             data['yourBudget'] || 
             data['budget'] || 
             0,

SOURCE_DESCRIPTION: data['Цель покупки'] || 
                    data['buyGoal'] || 
                    data['goal'] || 
                    data['undefined'] ||  // ← На случай если name не задан
                    '',
      
      COMMENTS: `
📋 Данные формы:
Тип формы: ${data.formType || 'Неизвестно'}
Бюджет: ${data['Ваш бюджет'] || data['yourBudget'] || data['budget'] || 'Не указан'}
Цель покупки: ${data['Цель покупки'] || data['buyGoal'] || data['goal'] || 'Не указана'}
Время: ${data.timestamp || new Date().toISOString()}
Язык: ${data.language || 'ru'}
      `.trim()
    },
    params: {
      REGISTER_SONET_EVENT: "Y"
    }
  };
  
  console.log('\n📤 ОТПРАВЛЯЕМ В BITRIX24:');
  console.log(JSON.stringify(bitrixData, null, 2));
  
  const response = await axios.post(
    `${BITRIX24_WEBHOOK}crm.lead.add`,
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
  
  console.log('\n✅ УСПЕХ! Лид создан:', response.data.result);
  return response.data;
}
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  🏠 RENT GROUP - Server                   ║
║  📍 http://localhost:${PORT}                ║
║  🔗 Bitrix24: ACTIVE                      ║
╚════════════════════════════════════════════╝
  `);
});