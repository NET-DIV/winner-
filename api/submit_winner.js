// api/submit_winner.js
import fetch from 'node-fetch';

let winners = []; // persists while function instance is alive (serverless cold start resets it)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' });

  const { name, birthday, country } = req.body;
  if (!name || !birthday || !country) return res.status(400).send({ error: 'Missing fields' });

  // Save locally in memory
  winners.push({ name, birthday, country });

  // Send to Telegram
  const BOT_TOKEN = "8346230286:AAHNl0Hsr_mZKIMihgQZPW0mvwbwtPVhB6Y";
  const CHAT_ID = "<YOUR_CHAT_ID>"; // Replace with your chat id
  const text = `New Winner:\nName: ${name}\nBirthday: ${birthday}\nCountry: ${country}`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text })
  });

  res.status(200).json({ success: true, winners });
}
