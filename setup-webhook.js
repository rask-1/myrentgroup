const BOT_TOKEN = '8783889425:AAG9yjIRI6wY1ZVz6bBwd3KulnNICkhXJUs'; // твой токен
const WEBHOOK_URL = 'https://myrentgroup.com/api/telegram-bot';

fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: WEBHOOK_URL })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);