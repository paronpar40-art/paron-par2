# الدليل الفني والشامل لمنظومة إدارة وحدة المدرعات والدعم الإمدادي والآلي
## Armored and Logistics Unit Management System - Comprehensive Documentation

---

## 📑 جدول المحتويات (Table of Contents)
1. [مقدمة عن المنظومة](#1-مقدمة-عن-المنظومة)
2. [الهيكلية البرمجية الشاملة (System Architecture)](#2-الهيكلية-البرمجية-الشاملة)
3. [الموديولات والأقسام الرئيسية (Core Modules)](#3-الموديولات-والأقسام-الرئيسية)
4. [تصميم قاعدة البيانات (PostgreSQL Schema)](#4-تصميم-قاعدة-البيانات)
5. [واجهات البرمجة والخدمات (REST APIs & Controllers)](#5-واجهات-البرمجة-والخدمات)
6. [تطبيق المقاتل الميداني (Flutter Mobile App)](#6-تطبيق-المقاتل-الميداني)
7. [لوحة تحكم قيادة الوحدة (React Dashboard)](#7-لوحة-تحكم-قيادة-الوحدة)
8. [دليل الرفع والتكامل مع GitHub (GitHub Deployment Guide)](#8-دليل-الرفع-والتكامل-مع-github)
9. [دليل التشغيل والاستخدام (Operator & Admin Manual)](#9-دليل-التشغيل-والاستخدام)

---

## 1. مقدمة عن المنظومة

منظومة **إدارة وحدة المدرعات والدعم الإمدادي والآلي** هي حل رقمي متكامل مصمم للوحدات والتشكيلات العسكرية لإدارة الجاهزية القتالية، وتوزيع الخدمات اليومية، ومتابعة ضباط الخفر والتوكات، وضبط التمام وحضور الأفراد والضباط، ومتابعة الصيانة الدورية وحالة الآليات والمدرعات، وتوفير تطبيق ميداني للمقاتلين.

### ✨ أبرز المميزات:
- **إدارة التمام والجاهزية:** متابعة نسبة القوة الموجودة، المستشفيات، العيادات، الأجازات، المأموريات، والسجن.
- **إدارة الخدمة اليومية وضباط الخفر:** تنظيم التوزيع التلقائي واليدوي للنوبات، الحراسات، وضباط الخفر، وطباعة أوامر الخدمة.
- **تطبيق المقاتل الميداني:** واجهة هاتف ذكي تتيح للمقاتل تأكيد التمام، الاطلاع على الجدول اليومي، واستلام التعليمات والنداءات التكتيكية.
- **سلاح المدرعات والخدمات الفنية:** متابعة الجاهزية القتالية للدبابات، ناقلات الجند، والعربات المدرعة وساعات العمل وحالة الصيانة.
- **أرشيف وسجل مراجعة وتدقيق (Audit Log):** تسجيل كافة التحركات، التعديلات، وطباعة المحاضر الرسمية بختم الوحدة وتوقيع القيادة.

---

## 2. الهيكلية البرمجية الشاملة

تعتمد المنظومة على نمط **Clean Architecture** ونمط **CQRS** لتوفير أعلى مستويات الأمان والسرعة والاعتمادية.

```
                    ┌──────────────────────────────────────────┐
                    │      React Web Dashboard (Admin/Cmd)     │
                    │      Flutter Mobile App (Soldiers/Duty)  │
                    └─────────────────────┬────────────────────┘
                                          │
                                   HTTPS / REST API
                                          │
                    ┌─────────────────────▼────────────────────┐
                    │       ASP.NET Core 9 Web API Gateway     │
                    └─────────────────────┬────────────────────┘
                                          │
    ┌─────────────────────────────────────┼─────────────────────────────────────┐
    │                                     │                                     │
┌───▼──────────────────┐     ┌────────────▼─────────────┐     ┌─────────────────▼───┐
│ Domain & Entities    │     │ Application Layer (CQRS) │     │ Infrastructure Layer│
│ - Soldier            │     │ - MediatR Handlers       │     │ - Entity Framework  │
│ - DailyDuty          │     │ - FluentValidation       │     │ - PostgreSQL DB     │
│ - VehicleStatus      │     │ - AutoMapper Profiles    │     │ - Serilog & FCM     │
└──────────────────────┘     └──────────────────────────┘     └─────────────────────┘
```

---

## 3. الموديولات والأقسام الرئيسية

### 1. لوحة قيادة الوحدة (Command Dashboard)
- عارض التمام اليومي المباشر وحساب نسبة الجاهزية القتالية.
- توزيع القوة (موجود، أجازة، مأمورية، عيادة، مستشفى، سجن، خفر).
- مؤشرات أداء الآليات وسلاح المدرعات.

### 2. وحدة الخدمة اليومية وضباط الخفر (Daily Service & Guard Duty)
- توزيع ضابط خفر الوحدة، خفر السرية، وحرس البوابة.
- جدول التوكات والنوبات للحراسات الليلية والنهارية.
- طباعة أوامر الخدمة الرسمية والمحاضر المعتمدة.

### 3. وحدة الحضور والغياب (Attendance & Roll Call)
- تسجيل التمام اليومي لجميع السرايا والفصائل.
- متابعة التصاريح والأجازات والعودة من المأموريات.
- تصدير تقارير إحصائية دورية (يومية، أسبوعية، شهرية).

### 4. وحدة الآليات والمدرعات (Armor & Vehicles Fleet)
- متابعة الحالة الفنية لدبابات القتال الرئيسية وناقلات الجند.
- سجل الصيانة، الوقود، والذخيرة.
- تنبيهات الأعطال والصيانة الوقائية.

### 5. مركز الذكاء الاصطناعي والتقارير (AI Assistant & Reports Center)
- مساعد ذكي ميداني للإجابة على التساؤلات التنظيمية والتعليمات.
- طباعة المحاضر والتقارير بصيغ PDF / Excel / Print View.

---

## 4. تصميم قاعدة البيانات (PostgreSQL Schema)

جدول البيانات العلاقاتية مصمم لدعم التوسع وسرعة الاستعلام:

```sql
-- جدول الأفراد والضباط
CREATE TABLE soldiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    military_number VARCHAR(50) UNIQUE NOT NULL,
    rank VARCHAR(50) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    unit_company VARCHAR(100) NOT NULL,
    platoon VARCHAR(100),
    status VARCHAR(50) DEFAULT 'PRESENT', -- PRESENT, LEAVE, MISSION, HOSPITAL, CLINIC, PRISON
    role VARCHAR(50) DEFAULT 'SOLDIER', -- COMMANDER, SUPERVISOR, SOLDIER
    phone_number VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- جدول الخدمة اليومية وضباط الخفر
CREATE TABLE daily_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_date DATE NOT NULL,
    duty_officer_id UUID REFERENCES soldiers(id),
    assistant_duty_officer_id UUID REFERENCES soldiers(id),
    gate_guard_commander_id UUID REFERENCES soldiers(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- جدول التوكات والنوبات
CREATE TABLE duty_shifts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    daily_service_id UUID REFERENCES daily_services(id) ON DELETE CASCADE,
    soldier_id UUID REFERENCES soldiers(id),
    post_location VARCHAR(100) NOT NULL,
    shift_start_time TIME NOT NULL,
    shift_end_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, ON_DUTY, COMPLETED, EXCUSED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- جدول الآليات والمدرعات
CREATE TABLE armored_vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_code VARCHAR(50) UNIQUE NOT NULL,
    vehicle_type VARCHAR(100) NOT NULL, -- TANK, APC, LOGISTICS_TRUCK, COMMAND_VEHICLE
    model VARCHAR(100),
    readiness_status VARCHAR(50) DEFAULT 'OPERATIONAL', -- OPERATIONAL, MAINTENANCE, OUT_OF_SERVICE
    fuel_level INT DEFAULT 100,
    ammo_status VARCHAR(50) DEFAULT 'FULL',
    last_maintenance_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- جدول سجل التدقيق والمراجعة
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action VARCHAR(100) NOT NULL,
    module VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- الفهارس لتحسين سرعة الاستعلامات
CREATE INDEX idx_soldiers_military_num ON soldiers(military_number);
CREATE INDEX idx_soldiers_status ON soldiers(status);
CREATE INDEX idx_daily_services_date ON daily_services(service_date);
CREATE INDEX idx_duty_shifts_service ON duty_shifts(daily_service_id);
CREATE INDEX idx_vehicles_status ON armored_vehicles(readiness_status);
```

---

## 5. واجهات البرمجة والخدمات (REST APIs)

| HTTP Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | تسجيل الدخول واستلام رمز JWT | No |
| `GET` | `/api/v1/soldiers` | جلب قائمة الأفراد والضباط مع الفلترة والبحث | Yes |
| `POST` | `/api/v1/soldiers` | إضافة فرد جديد للوحدة | Yes (Commander/Supervisor) |
| `GET` | `/api/v1/attendance/today` | جلب التمام والبيان اليومي | Yes |
| `PUT` | `/api/v1/attendance/status` | تحديث حالة فرد (حضور، أجازة، عيادة...) | Yes (Supervisor) |
| `GET` | `/api/v1/daily-service/current` | جلب أمر الخدمة وضباط الخفر لليوم | Yes |
| `POST` | `/api/v1/daily-service` | إنشاء جدول خدمة جديد | Yes (Commander) |
| `GET` | `/api/v1/vehicles` | قائمة الجاهزية لسلاح المدرعات والآليات | Yes |
| `GET` | `/api/v1/reports/print/duty-order` | جلب نموذج طباعة أمر الخدمة الرسمية | Yes |

---

## 6. تطبيق المقاتل الميداني (Flutter Mobile App)

تطبيق الهاتف الميداني يوفر تجربة سلسة للمقاتلين والضباط في الميدان:
- **تأكيد التمام اليومي:** إرسال التمام والموقع الميداني.
- **جدول النوبات والحراسات:** عرض وقت وموقع التوك الخاص بالمقاتل مع التنبيهات.
- **النداءات العاجلة والتنبيهات:** استقبال بلاغات الاستدعاء ورفع درجة الاستعداد.
- **الوضع الليلي عالي التباين:** مخصص للعمل في الظروف الميدانية الصعبة.

---

## 7. لوحة تحكم قيادة الوحدة (React Dashboard)

تم بناء الواجهة باستخدام **React 19 + TypeScript + Tailwind CSS** لتوفير تجربة فائقة السرعة والاستجابة:
- **تنسيق مرن RTL:** داعم بالكامل للغة العربية والاتجاه العسكري.
- **مكونات تفاعلية:** إحصائيات حية، عوارض تمام، وجداول صيانة وإدارة حراسات.
- **مركز الطباعة المتقدم:** طباعة أوامر الخدمة، والتقارير الإحصائية بصيغة رسمية جاهزة للاعتماد.

---

## 8. دليل الرفع والتكامل مع GitHub

لرفع المشروع كاملاً على GitHub:

1. **الرفع المباشر عبر منصة AI Studio:**
   - افتح القائمة العلوية واختر `Export to GitHub`.
   - حدد المستودع وحسابك الخاص لتصدير المشروع بنقرة واحدة.

2. **الرفع اليدوي عبر السطر البرمجي (Git CLI):**
   ```bash
   git init
   git add .
   git commit -m "feat: Initial commit for Armored & Logistics Management System"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```

---

## 9. دليل التشغيل والاستخدام

### التشغيل المحلي للتطوير:
```bash
# 1. تثبيت التبعيات
npm install

# 2. تشغيل تطبيق React والخادم في بيئة التطوير
npm run dev

# 3. التأكد من سلامة الأكواد والتوافق البرمجي
npm run lint

# 4. بناء نسخة الإنتاج
npm run build
```

---
**منظومة إدارة وحدة المدرعات والدعم الإمدادي والآلي © 2026**
