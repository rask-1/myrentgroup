const axios = require('axios');

const WEBHOOK = 'https://b24-xrpmdc.bitrix24.ru/rest/15/7qwwvmnd2h3mupgo/';

async function test() {
  try {
    // Тестовый запрос - получаем профиль
    const response = await axios.get(`${WEBHOOK}profile.json`);
    console.log('✅ Вебхук работает!');
    console.log(response.data);
    
    // Пробуем создать лид
    const lead = await axios.post(`${WEBHOOK}crm.lead.add.json`, {
      fields: {
        TITLE: 'Тестовый лид',
        NAME: 'Тест',
        PHONE: [{ VALUE: '+79999999999', VALUE_TYPE: 'WORK' }],
        STATUS_ID: 'NEW'
      }
    });
    
    console.log('✅ Лид создан!', lead.data);
  } catch (error) {
    console.error('❌ Ошибка:', error.response?.data || error.message);
  }
}

test();