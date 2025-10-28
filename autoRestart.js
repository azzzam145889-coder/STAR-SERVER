import fetch from 'node-fetch';
import http from 'http';

// رابط API لتشغيل السيرفر (Server ID تم وضعه)
const SERVER_URL = 'https://panel.magmanode.com/api/client/servers/14166bb8-8ffa-49ab-b27d-563dfb4d4575/power';

// ضع هنا مفتاح API الخاص بك
const API_KEY = 'ptlc_d3DfVnhDIfVZpsh4wxpYPHLtMW7Sv1YBlDKkOOjULxB';

// 5 ساعات و30 دقيقة = 330 دقيقة -> بالمللي ثانية
const DELAY = 330 * 60 * 1000;

async function startServer() {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ signal: 'start' })
    });

    if (response.ok) {
      console.log(new Date().toISOString(), '✅ السيرفر اشتغل تلقائياً!');
    } else {
      const text = await response.text();
      console.log(new Date().toISOString(), '❌ فشل تشغيل السيرفر:', text);
    }
  } catch (err) {
    console.error(new Date().toISOString(), '⚠️ خطأ في الاتصال:', err.message || err);
  }
}

// شغّل فورًا عند بداية التطبيق ثم جدول كل DELAY
startServer();
setInterval(startServer, DELAY);

// اجعل Render يقبل الخدمة كموقع (يفتح منفذ) — لا يؤثر على عمل السكربت
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running ✅');
}).listen(process.env.PORT || 3000, () => {
  console.log('HTTP listener started on port', process.env.PORT || 3000);
});
