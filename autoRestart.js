import fetch from 'node-fetch';

// رابط API لتشغيل السيرفر مع Server ID الصحيح
const SERVER_URL = 'https://panel.magmanode.com/api/client/servers/14166bb8-8ffa-49ab-b27d-563dfb4d4575/power';

// مفتاح API مباشرة
const API_KEY = 'ptlc_d3DfVnhDIfVZpsh4wxpYPHLtMW7Sv1YBlDKkOOjULxB';

// 5 ساعات و30 دقيقة = 5*60 + 30 = 330 دقيقة
// بالمللي ثانية: 330 * 60 * 1000
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
      console.log('✅ السيرفر اشتغل تلقائياً!');
    } else {
      console.log('❌ فشل تشغيل السيرفر:', await response.text());
    }
  } catch (err) {
    console.error('⚠️ خطأ في الاتصال:', err);
  }
}

// تشغيل السيرفر فورًا عند بداية التطبيق
startServer();

// إعادة التشغيل التلقائي كل 5 ساعات و30 دقيقة
setInterval(startServer, DELAY);
