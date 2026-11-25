# Empire Games: Digital Menu

موقع منيو رقمي لمقهى امباير كيمز. يفتحه الزبون عبر باركود، ولا يحتاج قاعدة بيانات ولا تسجيل دخول.

## التشغيل محلياً

```bash
npm start
```

بعدها افتح الرابط `http://localhost:5173`. وتظهر في الطرفية أيضاً روابط للفتح من الموبايل إذا كان على نفس شبكة الواي فاي.

> لا تفتح `index.html` بالنقر المزدوج، لأن المتصفح يمنع ملفات ES Modules من العمل بهذه الطريقة. شغّله دائماً عبر سيرفر.

## أين أعدّل؟

| أريد أن… | الملف |
|---|---|
| أغيّر سعراً، أو أضيف صنفاً أو أحذفه | `js/data/menu.js` |
| أضع رابط الخرائط أو الإنستغرام | `js/config.js` → `links` |
| أغيّر سعر الوجبة، أو فرق سعر الأركيلة الألمانية | `js/config.js` → `meal` / `hookah` |
| أضع ملف موسيقى بدل الموسيقى المولّدة | ضع الملف في `assets/audio/` ثم اكتب مساره في `js/config.js` → `music.file` |
| أغيّر نصوص الواجهة | `js/i18n/strings.js` |
| أغيّر الألوان | `css/variables.css` |
| أغيّر العنوان المكتوب بواجهة التحميل | `js/config.js` → `brand.address` |
| أغيّر الشعار | استبدل `assets/images/logo.webp` (و`icon.png` لأيقونة المتصفح) |

## الهيكل

```
index.html            الصفحة الوحيدة
css/                  fonts, variables, base, loader, layout, menu, effects
js/main.js            نقطة البداية
js/config.js          الإعدادات
js/data/menu.js       بيانات المنيو
js/i18n/strings.js    نصوص الواجهة باللغتين
js/modules/           loader, router, renderer, search, language, theme,
                      particles, ripple, music, format, storage
tools/serve.js        سيرفر محلي بدون مكتبات
tools/build.js        يجمع الموقع بملف واحد سريع داخل dist/
```

## النشر

```bash
npm install
npm run build
npx vercel deploy dist --prod
```

مجلد `dist/` هو النسخة السريعة التي تُرفع: صفحة واحدة مضغوطة، وتُحفظ بجهاز الزبون فتفتح حتى بدون نت بعد أول زيارة.
