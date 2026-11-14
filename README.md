# Empire Games: Digital Menu

موقع منيو رقمي لمقهى إمباير جيمز. يفتحه الزبون عبر باركود، ولا يحتاج قاعدة بيانات ولا تسجيل دخول.

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
| أغيّر الشعار | استبدل `assets/images/logo.png` |

## الهيكل

```
index.html            الصفحة الوحيدة
css/                  variables, base, loader, layout, menu, effects
js/main.js            نقطة البداية
js/config.js          الإعدادات
js/data/menu.js       بيانات المنيو
js/i18n/strings.js    نصوص الواجهة باللغتين
js/modules/           loader, router, renderer, search, language, theme,
                      particles, ripple, music, format, storage
tools/serve.js        سيرفر محلي بدون مكتبات
```

## النشر وإنشاء الباركود

1. ارفع المجلد كاملاً على استضافة مجانية للمواقع الثابتة، مثل GitHub Pages أو Netlify أو Cloudflare Pages.
2. حوّل الرابط الناتج إلى باركود QR.
