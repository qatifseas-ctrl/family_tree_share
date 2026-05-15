# 🌳 شجرة العائلة — دليل رفع نسخة العائلة

## هيكل الملفات
```
family-tree-pwa/
├── index.html       ← التطبيق (بدون بيانات — يطلب استيراد JSON)
├── manifest.json
├── sw.js
└── icons/  (11 أيقونة PNG)
```

## رفع على GitHub Pages (مجاني — مُوصى به)
1. github.com/new ← اسم المستودع: family-tree ← Public ← Create
2. ارفع جميع الملفات (بما فيها مجلد icons/)
3. Settings → Pages → Source: main / (root) → Save
4. انتظر دقيقتين ← رابطك: https://USERNAME.github.io/family-tree/

## رفع على Netlify (أسرع — سحب وإفلات)
1. netlify.com ← سجّل دخول
2. اسحب مجلد family-tree-pwa وأفلته في لوحة التحكم
3. رابطك جاهز فوراً: https://xxxx.netlify.app

## التثبيت كـ PWA
- Android/Chrome: بانر التثبيت يظهر تلقائياً
- iPhone/Safari: زر المشاركة ⬆️ ← "إضافة إلى الشاشة الرئيسية"
- كمبيوتر: أيقونة ➕ في شريط العنوان

## تدفق الاستخدام
1. المالك يرسل الرابط + ملف JSON للبيانات
2. فرد العائلة يفتح الرابط → يضغط "استيراد ملف JSON"
3. البيانات تُحفظ محلياً — يعمل التطبيق بدون إنترنت
