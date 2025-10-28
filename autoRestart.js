import fetch from 'node-fetch';
import http from 'http';

// 🔗 رابط API لتشغيل السيرفر
const SERVER_URL = 'https://panel.magmanode.com/api/client/servers/14166bb8-8ffa-49ab-b27d-563dfb4d4575/power';

// 🔑 مفتاح API الخاص بك
const API_KEY = 'ptlc_d3DfVnhDIfVZpsh4wxpYPHLtMW7Sv1YBlDKkOOjULxB';

// 🕒 6 ساعات و30 دقيقة = 6.5 * 60 * 60 * 1000 = 23,400,000 ملّي ثانية
const DELAY = 6.5 * 60 * 60 * 1000;

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

// 🔹 تشغيل السيرفر فورًا عند بداية التطبيق
startServer();

// 🔁 إعادة التشغيل كل 6 ساعات و30 دقيقة
setInterval(startServer, DELAY);

// 🔸 منفذ وهمي ليبقي الخدمة شغالة على Render (مطلوب للخطة المجانية)
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running ✅');
}).listen(process.env.PORT || 3000, () => {
  console.log('HTTP listener started on port', process.env.PORT || 3000);
});
