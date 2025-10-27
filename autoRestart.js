import fetch from 'node-fetch';

// رابط API لتشغيل السيرفر
const SERVER_URL = 'https://api.magmanode.com/client/servers/14166bb8/power';

// قراءة API Key من Environment Variable على Render
const API_KEY = process.env.STAR_SERVER;

if (!API_KEY) {
  console.error('❌ لم يتم العثور على API Key في Environment Variables!');
  process.exit(1); // إنهاء التطبيق إذا المفتاح مفقود
}

// فترة التشغيل للتجربة: 5 دقائق (تستطيع تعديلها لاحقًا)
const DELAY = 5 * 60 * 1000;

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

// إعادة التشغيل كل DELAY
setInterval(startServer, DELAY);
