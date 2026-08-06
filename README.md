# منظومة إدارة وحدة المدرعات والدعم الإمدادي والآلي
## Armored and Logistics Unit Management System

منظومة متكاملة لإدارة النوبات، الحضور والغياب، التوكات، الخدمة اليومية، ضباط الخفر، وتطبيق المقاتل الميداني لوحدات المدرعات والدعم الإمدادي والآلي.

---

## 📋 نظرة عامة على المشروع (Project Overview)

تم تطوير هذه المنظومة بالكامل باستخدام أحدث تقنيات الويب والأنظمة التفاعلية:
* **الواجهة الأمامية (Frontend):** React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Motion
* **الخادم والخلفية (Backend):** Express.js (Node.js / tsx) داعم لبيئة الانتاج العسكرية وإمكانية التكامل المستقبلي مع PostgreSQL / REST API
* **التصميم والواجهة:** دعم كامل للغة العربية والاتجاه من اليمين لليسار (RTL)، وضع ليلي مخصص عالي التباين، ومرونة التنقل بين الصلاحيات (الآمر، المشرف/ضابط الخفر، المقاتل).

---

## 🚀 خطوة بخطوة: كيفية رفع المشروع على GitHub

### 1️⃣ خيار أول: التصدير المباشر من منصة AI Studio (الأسهل)
1. من القائمة العلوية أو قائمة الإعدادات **(Settings / Share Menu)** في منصة Google AI Studio.
2. اضغط على **Export to GitHub** أو **Download ZIP**.
3. قم بتمرير المستودع الخاص بك على GitHub للمزامنة المباشرة.

---

### 2️⃣ خيار ثاني: الرفع اليدوي عبر السطر البرمجي (Git CLI)

إذا قمت بتنزيل الملفات أو أرشيف ZIP وتريد رفعها يدويًا على مستودع جديد في GitHub:

#### 1. افتح مجلد المشروع في السطر البرمجي (Terminal):
```bash
cd armored-unit-management-system
```

#### 2. تهيئة مستودع Git المحلي:
```bash
git init
```

#### 3. إضافة جميع الملفات وإكمال أول Commit:
```bash
git add .
git commit -m "feat: Initial commit - Armored & Logistics Unit Management System"
```

#### 4. تغيير الفرع الرئيسي إلى `main`:
```bash
git branch -M main
```

#### 5. ربط المستودع بمستودعك على GitHub:
*(استبدل `YOUR_USERNAME` و `YOUR_REPOSITORY` ببيانات حسابك على GitHub)*
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

#### 6. رفع الكود إلى GitHub:
```bash
git push -u origin main
```

---

## 🛠️ تشغيل المشروع محلياً (Local Development)

### المتطلبات الأساسية:
* **Node.js** (الإصدار 18 أو أحدث)
* **npm** أو **yarn** أو **pnpm**

### خطوات التشغيل:
1. **تثبيت الحزم والمكتبات:**
   ```bash
   npm install
   ```

2. **تشغيل الخادم والتطبيق في بيئة التطوير (Dev Mode):**
   ```bash
   npm run dev
   ```
   سيتم فتح التطبيق على الرابط المحلي: `http://localhost:3000`

3. **فحص جودة وتوافق الأنواع (Linting / Typecheck):**
   ```bash
   npm run lint
   ```

4. **بناء المشروع للإنتاج (Production Build):**
   ```bash
   npm run build
   ```

5. **تشغيل النسخة الجاهزة للإنتاج (Production Server):**
   ```bash
   npm start
   ```

---

## 📂 هيكلية المشروع (Project Architecture)

```
├── src/
│   ├── App.tsx                        # المكون الرئيسي وعارض الشاشات
│   ├── main.tsx                       # مدخل التطبيق (React Entry)
│   ├── index.css                      # تنسيقات Tailwind CSS الشاملة
│   ├── types/
│   │   └── srs.ts                     # تعاريف البيانات والأنواع (TypeScript Types)
│   ├── data/
│   │   └── mockData.ts                # البيانات الأساسية للجاهزية والآليات والضباط
│   └── components/
│       ├── Header.tsx                 # شريط التنقل والتنقل بين الأنظمة والوظائف
│       ├── DailyServiceManagementModule.tsx  # وحدة إدارة الخدمة اليومية وضباط الخفر
│       ├── AttendanceManagementModule.tsx    # وحدة الحضور والغياب والتمام اليومي
│       ├── SoldierMobileApp.tsx       # تطبيق المقاتل الميداني وتأكيد الحضور
│       ├── PrototypeView.tsx          # لوحة تحكم القيادة والجاهزية القتالية
│       ├── SRSView.tsx                # وثيقة تحليل المتطلبات البرمجية والشروط
│       ├── DatabaseSchemaSection.tsx  # هيكل قاعدة البيانات العلاقاتية API
│       ├── DesignSystemSection.tsx    # دليل الهوية البصرية والمكونات القياسية
│       ├── AiAssistantModal.tsx       # مساعد الذكاء الاصطناعي الميداني
│       └── PrintModal.tsx             # مركز طباعة التقارير والمحاضر الرسمية
├── package.json                       # التبعيات والسكربتات
├── server.ts                          # خادم Express للتطوير والإنتاج
├── vite.config.ts                     # إعدادات Vite
├── tsconfig.json                      # إعدادات TypeScript
├── metadata.json                      # تعريفات المنظومة وصلاحيات المنصة
└── README.md                          # التوثيق الرسمي للمشروع
```

---

## 🔒 الأمان وحماية البيانات (Security & Standards)
* المنظومة مصممة لتراعي معايير الأمن السيبراني والأمن العسكري.
* مفاتيح وتكوينات البيئة تُحفظ في ملف `.env` غير المرفوع للمستودع العام.
* تم إعداد ملف `.gitignore` لمنع رفع التبعيات أو الملفات المؤقتة الحساسة.

---

## 📄 الترخيص (License)
جميع الحقوق محفوظة - منظومة إدارة وحدة المدرعات والدعم الإمدادي والآلي © 2026.
