export interface DatabaseTableSpec {
  tableName: string;
  tableTitleAr: string;
  category: 'المستخدمون والأمن' | 'الهيكلية والتوكات' | 'الخدمات والعمليات' | 'المهام والتكامل' | 'الانضباط والتقييم' | 'النظام والنشر';
  description: string;
  primaryKey: string;
  foreignKeys: { column: string; referencesTable: string; referencesColumn: string }[];
  indexes: string[];
  columnsCount: number;
}

export const DATABASE_TABLES_LIST: DatabaseTableSpec[] = [
  {
    tableName: 'roles',
    tableTitleAr: '1. جدول الأدوار القيادية والوظيفية (Roles)',
    category: 'المستخدمون والأمن',
    description: 'يُعرّف الأدوار الأربعة بالمنظومة (الآمر، المشرف الأول، المشرف الثاني، العنصر) ونطاق كل دور.',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'created_by', referencesTable: 'users', referencesColumn: 'id' }],
    indexes: ['idx_roles_code (UNIQUE)'],
    columnsCount: 7,
  },
  {
    tableName: 'permissions',
    tableTitleAr: '2. جدول الصلاحيات الدقيقة (Permissions)',
    category: 'المستخدمون والأمن',
    description: 'قائمة الصلاحيات لكل وحدة من وحدات النظام الـ 17 (استعراض، إضافة، تعديل، حذف، اعتماد، طباعة).',
    primaryKey: 'id (UUID)',
    foreignKeys: [],
    indexes: ['idx_permissions_code (UNIQUE)', 'idx_permissions_module'],
    columnsCount: 6,
  },
  {
    tableName: 'role_permissions',
    tableTitleAr: '3. جدول ربط الأدوار بالصلاحيات (Role Permissions)',
    category: 'المستخدمون والأمن',
    description: 'مصفوفة الربط المباشر بين الأدور والصلاحيات (Many-to-Many).',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'role_id', referencesTable: 'roles', referencesColumn: 'id' },
      { column: 'permission_id', referencesTable: 'permissions', referencesColumn: 'id' },
    ],
    indexes: ['idx_role_perm_unique (UNIQUE: role_id, permission_id)'],
    columnsCount: 5,
  },
  {
    tableName: 'military_ranks',
    tableTitleAr: '4. جدول الرتب العسكرية (Military Ranks)',
    category: 'الهيكلية والتوكات',
    description: 'دليل الرتب العسكرية من عميد ركن إلى جندي لتنظيم الأسبقية العسكرية الصارمة.',
    primaryKey: 'id (UUID)',
    foreignKeys: [],
    indexes: ['idx_ranks_level_priority'],
    columnsCount: 6,
  },
  {
    tableName: 'tawkat',
    tableTitleAr: '5. جدول التوكات الأربع (Tawkat 1 - 4)',
    category: 'الهيكلية والتوكات',
    description: 'بيانات التوكات الأربع (التوكة 1 الصدمة والاستطلاع، 2 الدعم الآلي والمدفعية، 3 الصيانة الفنية، 4 حرس المقر الأبراج).',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'leader_user_id', referencesTable: 'users', referencesColumn: 'id' }],
    indexes: ['idx_tawkat_code (UNIQUE)'],
    columnsCount: 11,
  },
  {
    tableName: 'users',
    tableTitleAr: '6. جدول الأفراد والمستخدمين الرئيسية (Users)',
    category: 'المستخدمون والأمن',
    description: 'السجل القيادي الشامل للضباط والمقاتلين بالكتيبة متضمناً الرقم العسكري، الرتبة، التوكة، وحالة الحساب.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'rank_id', referencesTable: 'military_ranks', referencesColumn: 'id' },
      { column: 'role_id', referencesTable: 'roles', referencesColumn: 'id' },
      { column: 'tawka_id', referencesTable: 'tawkat', referencesColumn: 'id' },
    ],
    indexes: ['idx_users_military_id (UNIQUE)', 'idx_users_tawka_status', 'idx_users_deleted_at'],
    columnsCount: 17,
  },
  {
    tableName: 'user_permissions',
    tableTitleAr: '7. جدول الاستثناءات الفردية للصلاحيات (User Permissions)',
    category: 'المستخدمون والأمن',
    description: 'استثناءات الصلاحيات الممنوحة أو المحجوبة عن مستخدم محدد استثناءً من دور القيادي.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'user_id', referencesTable: 'users', referencesColumn: 'id' },
      { column: 'permission_id', referencesTable: 'permissions', referencesColumn: 'id' },
    ],
    indexes: ['idx_user_perm_unique (UNIQUE: user_id, permission_id)'],
    columnsCount: 6,
  },
  {
    tableName: 'leave_types',
    tableTitleAr: '8. جدول أنواع الإجازات العسكرية (Leave Types)',
    category: 'الخدمات والعمليات',
    description: 'أنواع الإجازات (ميدانية، مرضية، طارئة، إدارية) والحد الأقصى للأيام واشتراطات الاعتماد.',
    primaryKey: 'id (UUID)',
    foreignKeys: [],
    indexes: ['idx_leave_types_code (UNIQUE)'],
    columnsCount: 7,
  },
  {
    tableName: 'leave_requests',
    tableTitleAr: '9. جدول طلبات الإجازات (Leave Requests)',
    category: 'الخدمات والعمليات',
    description: 'سجل طلبات الإجازات ومسار الاعتماد الثنائي (المشرف ثم الآمر) والتحقق من نسبة الجاهزية 75%.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'user_id', referencesTable: 'users', referencesColumn: 'id' },
      { column: 'leave_type_id', referencesTable: 'leave_types', referencesColumn: 'id' },
      { column: 'tawka_id', referencesTable: 'tawkat', referencesColumn: 'id' },
      { column: 'supervisor_id', referencesTable: 'users', referencesColumn: 'id' },
      { column: 'commander_id', referencesTable: 'users', referencesColumn: 'id' },
    ],
    indexes: ['idx_leave_req_user_status', 'idx_leave_req_dates_tawka'],
    columnsCount: 16,
  },
  {
    tableName: 'attendance',
    tableTitleAr: '10. جدول الحضور والانصراف (Attendance)',
    category: 'الخدمات والعمليات',
    description: 'تسجيل دخول وخروج الأفراد بالبصمة أو البطاقات الممغنطة وحساب التأخير والغياب اللحظي.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'user_id', referencesTable: 'users', referencesColumn: 'id' },
      { column: 'tawka_id', referencesTable: 'tawkat', referencesColumn: 'id' },
    ],
    indexes: ['idx_attendance_user_date (UNIQUE: user_id, date)', 'idx_attendance_date_status'],
    columnsCount: 12,
  },
  {
    tableName: 'attendance_history',
    tableTitleAr: '11. جدول أرشيف وتعديلات الحضور (Attendance History)',
    category: 'الخدمات والعمليات',
    description: 'تتبع كافة التغييرات والتعديلات الإدارية الاستثنائية التي تتم على سجلات الحضور مع بيان السبب والضابط المنفذ.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'attendance_id', referencesTable: 'attendance', referencesColumn: 'id' },
      { column: 'changed_by', referencesTable: 'users', referencesColumn: 'id' },
    ],
    indexes: ['idx_att_hist_attendance_id'],
    columnsCount: 7,
  },
  {
    tableName: 'daily_services',
    tableTitleAr: '12. جدول الخدمة اليومية (Daily Service)',
    category: 'الخدمات والعمليات',
    description: 'جدول الخدمة اليومية المعمد وتناوب التوكات وتعيين ضباط الخفر لنوبة الصباح والمساء والليل.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'tawka_in_charge_id', referencesTable: 'tawkat', referencesColumn: 'id' },
      { column: 'duty_officer_id', referencesTable: 'users', referencesColumn: 'id' },
    ],
    indexes: ['idx_daily_service_date (UNIQUE: service_date, shift_type)'],
    columnsCount: 10,
  },
  {
    tableName: 'daily_service_members',
    tableTitleAr: '13. جدول أفراد الخدمة اليومية والأبراج (Daily Service Members)',
    category: 'الخدمات والعمليات',
    description: 'توزيع عناصر الخدمة على أبراج الحراسة للبوابات والمستودعات والبدلاء المعتمدين.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'service_id', referencesTable: 'daily_services', referencesColumn: 'id' },
      { column: 'user_id', referencesTable: 'users', referencesColumn: 'id' },
      { column: 'substitute_user_id', referencesTable: 'users', referencesColumn: 'id' },
    ],
    indexes: ['idx_service_members_post'],
    columnsCount: 11,
  },
  {
    tableName: 'guard_officers',
    tableTitleAr: '14. جدول دفتر محضر ضابط الخفر (Guard Officer Log)',
    category: 'الخدمات والعمليات',
    description: 'توثيق تسليم وتسلم نوبة الخفر، جرد الأسلحة والذخائر، وحالة جاهزية الآليات المدرعة.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'service_id', referencesTable: 'daily_services', referencesColumn: 'id' },
      { column: 'officer_user_id', referencesTable: 'users', referencesColumn: 'id' },
    ],
    indexes: ['idx_guard_officers_service (UNIQUE: service_id)'],
    columnsCount: 10,
  },
  {
    tableName: 'daily_orders',
    tableTitleAr: '15. جدول الأوامر اليومية والنشرات (Daily Orders)',
    category: 'المهام والتكامل',
    description: 'الأوامر العسكرية والنشرات القيادية الصادرة من الآمر وتتبع إقرارات الاستلام والقراءة.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'issued_by_user_id', referencesTable: 'users', referencesColumn: 'id' },
      { column: 'target_tawka_id', referencesTable: 'tawkat', referencesColumn: 'id' },
    ],
    indexes: ['idx_daily_orders_number (UNIQUE)', 'idx_daily_orders_date_importance'],
    columnsCount: 12,
  },
  {
    tableName: 'daily_order_readers',
    tableTitleAr: '16. جدول قُرّاء الأوامر اليومية (Daily Order Readers)',
    category: 'المهام والتكامل',
    description: 'توثيق قراءة وتأكيد كل عنصر للأمر العسكري الموجه له بالتاريخ والوقت وعنوان IP.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'order_id', referencesTable: 'daily_orders', referencesColumn: 'id' },
      { column: 'user_id', referencesTable: 'users', referencesColumn: 'id' },
    ],
    indexes: ['idx_order_readers_unique (UNIQUE: order_id, user_id)'],
    columnsCount: 6,
  },
  {
    tableName: 'tasks',
    tableTitleAr: '17. جدول المهام الميدانية والتكتيكية (Tasks)',
    category: 'المهام والتكامل',
    description: 'المهام الميدانية والتكليفات الفنية لصيانة المدرعات بالتوكة 3 والدعم الآلي بالتوكة 2.',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'created_by', referencesTable: 'users', referencesColumn: 'id' }],
    indexes: ['idx_tasks_status_priority', 'idx_tasks_due_date'],
    columnsCount: 13,
  },
  {
    tableName: 'task_assignments',
    tableTitleAr: '18. جدول إسناد المهام للتوكات والأفراد (Task Assignments)',
    category: 'المهام والتكامل',
    description: 'توزيع وتكليف المهمة لتوكة محددة أو عناصر بأعينهم مع متابعة حالة التقدم.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'task_id', referencesTable: 'tasks', referencesColumn: 'id' },
      { column: 'assigned_to_user_id', referencesTable: 'users', referencesColumn: 'id' },
      { column: 'assigned_to_tawka_id', referencesTable: 'tawkat', referencesColumn: 'id' },
    ],
    indexes: ['idx_task_assign_task_user'],
    columnsCount: 7,
  },
  {
    tableName: 'task_attachments',
    tableTitleAr: '19. جدول مرفقات وثائق المهام (Task Attachments)',
    category: 'المهام والتكامل',
    description: 'ربط صور الفحص الفني والتقارير الميدانية بالمهمة المسندة.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'task_id', referencesTable: 'tasks', referencesColumn: 'id' },
      { column: 'file_id', referencesTable: 'files', referencesColumn: 'id' },
      { column: 'uploaded_by', referencesTable: 'users', referencesColumn: 'id' },
    ],
    indexes: ['idx_task_attachments_task_file'],
    columnsCount: 5,
  },
  {
    tableName: 'task_reports',
    tableTitleAr: '20. جدول تقارير إنجاز المهام (Task Reports)',
    category: 'المهام والتكامل',
    description: 'تقارير متابعة نسبة الإنجاز والتعثر الفني المرفوعة من المشرفين.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'task_id', referencesTable: 'tasks', referencesColumn: 'id' },
      { column: 'reported_by_user_id', referencesTable: 'users', referencesColumn: 'id' },
    ],
    indexes: ['idx_task_reports_task_id'],
    columnsCount: 7,
  },
  {
    tableName: 'notifications',
    tableTitleAr: '21. جدول الإشعارات والتنبيهات (Notifications)',
    category: 'المهام والتكامل',
    description: 'الإشعارات الفورية العاجلة ونداءات رفع الجاهزية والنداء العام للتوكات.',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'sender_id', referencesTable: 'users', referencesColumn: 'id' }],
    indexes: ['idx_notifications_category_priority'],
    columnsCount: 10,
  },
  {
    tableName: 'notification_readers',
    tableTitleAr: '22. جدول متلقي الإشعارات (Notification Readers)',
    category: 'المهام والتكامل',
    description: 'سجل قراءة واستلام التنبيهات الفورية لكل مستخدم.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'notification_id', referencesTable: 'notifications', referencesColumn: 'id' },
      { column: 'user_id', referencesTable: 'users', referencesColumn: 'id' },
    ],
    indexes: ['idx_notif_readers_unique (UNIQUE: notification_id, user_id)'],
    columnsCount: 5,
  },
  {
    tableName: 'rewards',
    tableTitleAr: '23. جدول المكافآت وكتب الشكر (Rewards)',
    category: 'الانضباط والتقييم',
    description: 'توثيق التكريمات والإجازات التشجيعية الممنوحة وانعكاسها الإيجابي على نقاط التقييم.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'user_id', referencesTable: 'users', referencesColumn: 'id' },
      { column: 'issued_by_user_id', referencesTable: 'users', referencesColumn: 'id' },
    ],
    indexes: ['idx_rewards_user_date'],
    columnsCount: 9,
  },
  {
    tableName: 'penalties',
    tableTitleAr: '24. جدول الجزاءات والمخالفات العسكرية (Penalties)',
    category: 'الانضباط والتقييم',
    description: 'سجل المخالفات الانضباطية (حجز/خصم/لفت نظر) وانعكاسها المباشر بحسم النقاط وتأخير الترقية.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'user_id', referencesTable: 'users', referencesColumn: 'id' },
      { column: 'issued_by_user_id', referencesTable: 'users', referencesColumn: 'id' },
    ],
    indexes: ['idx_penalties_user_date'],
    columnsCount: 10,
  },
  {
    tableName: 'evaluations',
    tableTitleAr: '25. جدول تقييم الأداء التراكمي (Evaluations)',
    category: 'الانضباط والتقييم',
    description: 'بطاقة التقييم الميكانيكية التراكمية بناءً على الحضور، تنفيذ المهام، الثواب، والعقاب.',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'user_id', referencesTable: 'users', referencesColumn: 'id' }],
    indexes: ['idx_evaluations_user_period (UNIQUE: user_id, evaluation_period)'],
    columnsCount: 9,
  },
  {
    tableName: 'evaluation_details',
    tableTitleAr: '26. جدول تفاصيل معايير التقييم (Evaluation Details)',
    category: 'الانضباط والتقييم',
    description: 'تفصيل توزيع درجات التقييم على المحاور الأربعة (حضور، مهام، مكافآت، جزاءات).',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'evaluation_id', referencesTable: 'evaluations', referencesColumn: 'id' }],
    indexes: ['idx_eval_details_evaluation_id'],
    columnsCount: 7,
  },
  {
    tableName: 'reports',
    tableTitleAr: '27. جدول التقارير القيادية الذكية (Reports)',
    category: 'النظام والنشر',
    description: 'سجل التقارير التحليلية والبيانية المولّدة محفظوة للرجوع والتصدير.',
    primaryKey: 'id (UUID)',
    foreignKeys: [
      { column: 'generated_by_user_id', referencesTable: 'users', referencesColumn: 'id' },
      { column: 'file_id', referencesTable: 'files', referencesColumn: 'id' },
    ],
    indexes: ['idx_reports_type_generated_by'],
    columnsCount: 8,
  },
  {
    tableName: 'print_templates',
    tableTitleAr: '28. جدول قوالب الطباعة المعتمدة (Print Templates)',
    category: 'النظام والنشر',
    description: 'قوالب النشرات والمستندات العسكرية المعتمدة المزودة بشعار القيادة وتنسيقات الـQR.',
    primaryKey: 'id (UUID)',
    foreignKeys: [],
    indexes: ['idx_print_templates_code (UNIQUE)'],
    columnsCount: 7,
  },
  {
    tableName: 'archive',
    tableTitleAr: '29. جدول الأرشيف الرقمي المحمي (Archive Vault)',
    category: 'النظام والنشر',
    description: 'مستودع الوثائق والمراسلات والأوامر التاريخية المفهرسة مع مستويات السرية.',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'file_id', referencesTable: 'files', referencesColumn: 'id' }],
    indexes: ['idx_archive_doc_number (UNIQUE)', 'idx_archive_confidentiality'],
    columnsCount: 11,
  },
  {
    tableName: 'audit_logs',
    tableTitleAr: '30. جدول سجل التدقيق والعمليات المحمي (Audit Logs)',
    category: 'النظام والنشر',
    description: 'سجل عمليات النظام غير القابل للتعديل النهائي (BR-11) لتوثيق كل حركة بالمعرف، التوقيت، وIP.',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'user_id', referencesTable: 'users', referencesColumn: 'id' }],
    indexes: ['idx_audit_logs_user_timestamp', 'idx_audit_logs_module'],
    columnsCount: 10,
  },
  {
    tableName: 'devices',
    tableTitleAr: '31. جدول أجهزة المستخدمين والرمز الرقمي (Devices)',
    category: 'المستخدمون والأمن',
    description: 'سجل الأجهزة المحمولة الميدانية المعتمدة وبصمة الحزمة لتأمين الاتصال.',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'user_id', referencesTable: 'users', referencesColumn: 'id' }],
    indexes: ['idx_devices_user_fingerprint (UNIQUE: user_id, device_fingerprint)'],
    columnsCount: 8,
  },
  {
    tableName: 'login_sessions',
    tableTitleAr: '32. جدول جلسات الدخول الفعالة (Login Sessions)',
    category: 'المستخدمون والأمن',
    description: 'إدارة توكن الجلسات المشفرة ومتابعة انقضاء الجلسة لمنع خرق البيانات.',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'user_id', referencesTable: 'users', referencesColumn: 'id' }],
    indexes: ['idx_sessions_token (UNIQUE)', 'idx_sessions_user_expires'],
    columnsCount: 8,
  },
  {
    tableName: 'security_events',
    tableTitleAr: '33. جدول الأحداث والتنبيهات الأمنية (Security Events)',
    category: 'المستخدمون والأمن',
    description: 'رصد محاولات الاختراق، فتاحات المرور الخاطئة، والتجاوزات الأمنية اللحظية.',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'user_id', referencesTable: 'users', referencesColumn: 'id' }],
    indexes: ['idx_sec_events_severity_created'],
    columnsCount: 7,
  },
  {
    tableName: 'settings',
    tableTitleAr: '34. جدول إعدادات المنظومة (System Settings)',
    category: 'النظام والنشر',
    description: 'معدات النظام العسكرية الأساسية (نسبة الجاهزية الحاكمة 75%، مدة نوبة الحراسة، إلخ).',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'updated_by', referencesTable: 'users', referencesColumn: 'id' }],
    indexes: ['idx_settings_key (UNIQUE)'],
    columnsCount: 6,
  },
  {
    tableName: 'files',
    tableTitleAr: '35. جدول إدارة الملفات والمرفقات (Files Storage)',
    category: 'النظام والنشر',
    description: 'سجل مسارات وتخزين الوثائق والمرفقات والصور مع البصمة الشفرية SHA-256.',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'uploaded_by', referencesTable: 'users', referencesColumn: 'id' }],
    indexes: ['idx_files_hash'],
    columnsCount: 9,
  },
  {
    tableName: 'activity_timeline',
    tableTitleAr: '36. جدول الخط الزمني للأنشطة الميدانية (Activity Timeline)',
    category: 'الخدمات والعمليات',
    description: 'خط زمني مرئي مترابط يعرض كافة تحركات الكتيبة والتوكات لحظياً.',
    primaryKey: 'id (UUID)',
    foreignKeys: [{ column: 'user_id', referencesTable: 'users', referencesColumn: 'id' }],
    indexes: ['idx_timeline_entity_type_id'],
    columnsCount: 8,
  },
];

export const POSTGRESQL_FULL_DDL_SCRIPT = `-- ==============================================================================
-- DATABASE DDL SCRIPT: Enterprise Armored and Logistics Unit Management System
-- SYSTEM NAME: منظومة إدارة وحدة المدرعات والدعم الآلي (AUAS-MS)
-- COMPLIANCE: PostgreSQL 15+ Enterprise Standard (3NF, Audit, Partitioning Ready)
-- PRIMARY KEYS: UUID v4 (gen_random_uuid())
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 1. USERS, ROLES & SECURITY SCHEMA
-- ==========================================

-- Table 1: Roles
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_code VARCHAR(50) NOT NULL UNIQUE,
    title_ar VARCHAR(100) NOT NULL,
    title_en VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID
);

-- Table 2: Permissions
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_name VARCHAR(100) NOT NULL,
    action_code VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT idx_permissions_code UNIQUE (module_name, action_code)
);

-- Table 3: Role Permissions Matrix
CREATE TABLE role_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    CONSTRAINT idx_role_perm_unique UNIQUE (role_id, permission_id)
);

-- Table 4: Military Ranks
CREATE TABLE military_ranks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rank_code VARCHAR(30) NOT NULL UNIQUE,
    rank_name_ar VARCHAR(100) NOT NULL,
    rank_level INT NOT NULL,
    priority_order INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 5: Tawkat (Tawkat 1, 2, 3, 4)
CREATE TABLE tawkat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tawka_code VARCHAR(30) NOT NULL UNIQUE,
    name_ar VARCHAR(100) NOT NULL,
    code_name VARCHAR(100) NOT NULL,
    specialization TEXT NOT NULL,
    leader_user_id UUID,
    personnel_count INT NOT NULL DEFAULT 0,
    readiness_percentage NUMERIC(5,2) NOT NULL DEFAULT 100.00 CHECK (readiness_percentage BETWEEN 0 AND 100),
    shift_schedule VARCHAR(200),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 6: Users (Core Personnel Table)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    military_id VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    rank_id UUID NOT NULL REFERENCES military_ranks(id) ON DELETE RESTRICT,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    tawka_id UUID NOT NULL REFERENCES tawkat(id) ON DELETE RESTRICT,
    specialization VARCHAR(150),
    phone VARCHAR(30),
    status VARCHAR(30) NOT NULL DEFAULT 'حاضر' CHECK (status IN ('حاضر', 'في الخدمة', 'إجازة', 'غائب', 'مأمورية')),
    joining_date DATE NOT NULL,
    photo_url TEXT,
    evaluation_score NUMERIC(5,2) DEFAULT 100.00 CHECK (evaluation_score BETWEEN 0 AND 100),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    updated_by UUID
);

-- Add Foreign Key for tawkat leader after users table exists
ALTER TABLE tawkat ADD CONSTRAINT fk_tawkat_leader FOREIGN KEY (leader_user_id) REFERENCES users(id) ON DELETE SET NULL;

-- Table 7: User Permissions Exceptions
CREATE TABLE user_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    is_granted BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    CONSTRAINT idx_user_perm_unique UNIQUE (user_id, permission_id)
);

-- ==========================================
-- 2. ATTENDANCE & LEAVES SCHEMA
-- ==========================================

-- Table 8: Leave Types
CREATE TABLE leave_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code_name VARCHAR(30) NOT NULL UNIQUE,
    name_ar VARCHAR(100) NOT NULL,
    max_days_allowed INT NOT NULL,
    requires_commander_approval BOOLEAN NOT NULL DEFAULT TRUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 9: Leave Requests
CREATE TABLE leave_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    leave_type_id UUID NOT NULL REFERENCES leave_types(id) ON DELETE RESTRICT,
    tawka_id UUID NOT NULL REFERENCES tawkat(id) ON DELETE RESTRICT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days_count INT NOT NULL CHECK (days_count > 0),
    reason TEXT NOT NULL,
    substitute_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'معلقة' CHECK (status IN ('معلقة', 'موافق عليها (المشرف)', 'موافق عليها نهائياً (الآمر)', 'مرفوضة')),
    supervisor_id UUID REFERENCES users(id),
    supervisor_approval_at TIMESTAMPTZ,
    commander_id UUID REFERENCES users(id),
    commander_approval_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_leave_dates CHECK (end_date >= start_date)
);

-- Table 10: Attendance
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tawka_id UUID NOT NULL REFERENCES tawkat(id) ON DELETE RESTRICT,
    date DATE NOT NULL,
    time_in TIME,
    time_out TIME,
    status VARCHAR(40) NOT NULL CHECK (status IN ('حاضر', 'متأخر', 'غائب بعذر', 'غائب بدون عذر', 'مجاز')),
    entry_method VARCHAR(40) NOT NULL DEFAULT 'بصمة' CHECK (entry_method IN ('بصمة', 'بطاقة ذكية', 'تسجيل إداري')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    CONSTRAINT idx_attendance_user_date UNIQUE (user_id, date)
);

-- Table 11: Attendance History Log
CREATE TABLE attendance_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attendance_id UUID NOT NULL REFERENCES attendance(id) ON DELETE CASCADE,
    previous_status VARCHAR(40) NOT NULL,
    new_status VARCHAR(40) NOT NULL,
    change_reason TEXT NOT NULL,
    changed_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 3. DAILY SERVICE & DUTY OFFICER SCHEMA
-- ==========================================

-- Table 12: Daily Service
CREATE TABLE daily_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_date DATE NOT NULL,
    shift_type VARCHAR(30) NOT NULL CHECK (shift_type IN ('صباحية', 'مسائية', 'ليلي كامل')),
    tawka_in_charge_id UUID NOT NULL REFERENCES tawkat(id) ON DELETE RESTRICT,
    duty_officer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status VARCHAR(30) NOT NULL DEFAULT 'نشط',
    is_signed_by_commander BOOLEAN NOT NULL DEFAULT FALSE,
    signed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT idx_daily_service_date UNIQUE (service_date, shift_type)
);

-- Table 13: Daily Service Members (Guard Posts)
CREATE TABLE daily_service_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES daily_services(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    guard_post_name VARCHAR(150) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ملتزم' CHECK (status IN ('ملتزم', 'تبديل', 'ملاحظة')),
    substitute_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 14: Guard Officers Shift Handover Log
CREATE TABLE guard_officers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL UNIQUE REFERENCES daily_services(id) ON DELETE CASCADE,
    officer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    ammunition_check_status VARCHAR(50) NOT NULL DEFAULT 'سليم وتطابق تام',
    vehicles_check_status VARCHAR(50) NOT NULL DEFAULT 'جاهزية 100%',
    officer_log_notes TEXT,
    emergency_alerts_count INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 4. DIRECTIVES, TASKS & FILES SCHEMA
-- ==========================================

-- Table 35: Files (Pre-declared for attachments)
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    original_name VARCHAR(255) NOT NULL,
    storage_path TEXT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    sha256_hash VARCHAR(64) NOT NULL,
    uploaded_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 15: Daily Orders
CREATE TABLE daily_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(100) NOT NULL UNIQUE,
    date DATE NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('توجيهات عسكرية', 'تنقلات وتكليفات', 'تعليمات انضباطية', 'رفع جاهزية')),
    importance VARCHAR(30) NOT NULL DEFAULT 'روتين يومي' CHECK (importance IN ('عاجل وهام', 'روتين يومي', 'سري ومكتوم')),
    issued_by_user_id UUID NOT NULL REFERENCES users(id),
    target_tawka_id UUID REFERENCES tawkat(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 16: Daily Order Readers
CREATE TABLE daily_order_readers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES daily_orders(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    read_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    CONSTRAINT idx_order_readers_unique UNIQUE (order_id, user_id)
);

-- Table 17: Tasks
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(30) NOT NULL DEFAULT 'عادي' CHECK (priority IN ('حرج للغاية', 'عالي', 'عادي')),
    due_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'قيد الانتظار' CHECK (status IN ('قيد الانتظار', 'جاري التنفيذ', 'مكتمل', 'متأخر')),
    completion_percentage INT NOT NULL DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 18: Task Assignments
CREATE TABLE task_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    assigned_to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    assigned_to_tawka_id UUID REFERENCES tawkat(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 19: Task Attachments
CREATE TABLE task_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    file_id UUID NOT NULL REFERENCES files(id) ON DELETE RESTRICT,
    uploaded_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 20: Task Reports
CREATE TABLE task_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    reported_by_user_id UUID NOT NULL REFERENCES users(id),
    report_text TEXT NOT NULL,
    progress_percentage INT NOT NULL CHECK (progress_percentage BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 21: Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    body TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
    target_role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
    target_tawka_id UUID REFERENCES tawkat(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 22: Notification Readers
CREATE TABLE notification_readers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    notification_id UUID NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    read_at TIMESTAMPTZ,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT idx_notif_readers_unique UNIQUE (notification_id, user_id)
);

-- ==========================================
-- 5. REWARDS, PENALTIES & EVALUATION SCHEMA
-- ==========================================

-- Table 23: Rewards
CREATE TABLE rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reward_category VARCHAR(100) NOT NULL CHECK (reward_category IN ('كتاب شكر', 'إجازة تشجيعية', 'مكافأة مالية')),
    reason TEXT NOT NULL,
    issued_by_user_id UUID NOT NULL REFERENCES users(id),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    score_impact INT NOT NULL DEFAULT 5 CHECK (score_impact > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 24: Penalties
CREATE TABLE penalties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    penalty_category VARCHAR(100) NOT NULL CHECK (penalty_category IN ('لفت نظر', 'حجز انضباطي', 'خصم إداري')),
    reason TEXT NOT NULL,
    issued_by_user_id UUID NOT NULL REFERENCES users(id),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    score_impact INT NOT NULL DEFAULT -10 CHECK (score_impact < 0),
    investigation_document_id UUID REFERENCES files(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 25: Cumulative Evaluations
CREATE TABLE evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    evaluation_period VARCHAR(30) NOT NULL, -- e.g. 2026-Q3
    total_score NUMERIC(5,2) NOT NULL CHECK (total_score BETWEEN 0 AND 100),
    status VARCHAR(30) NOT NULL DEFAULT 'معتمد',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT idx_evaluations_user_period UNIQUE (user_id, evaluation_period)
);

-- Table 26: Evaluation Details Breakdown
CREATE TABLE evaluation_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
    metric_name VARCHAR(100) NOT NULL,
    score NUMERIC(5,2) NOT NULL,
    max_score NUMERIC(5,2) NOT NULL DEFAULT 25.00,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 6. AUDIT, LOGINS, SETTINGS & ARCHIVE
-- ==========================================

-- Table 27: Reports
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_type VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    generated_by_user_id UUID NOT NULL REFERENCES users(id),
    parameters_json JSONB,
    file_id UUID REFERENCES files(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 28: Print Templates
CREATE TABLE print_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_code VARCHAR(50) NOT NULL UNIQUE,
    title_ar VARCHAR(100) NOT NULL,
    layout_html TEXT NOT NULL,
    header_logo TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 29: Archive Vault
CREATE TABLE archive (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_number VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    confidentiality_level VARCHAR(50) NOT NULL DEFAULT 'سري',
    file_id UUID NOT NULL REFERENCES files(id),
    metadata_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 30: Audit Logs (Immutable BR-11 Audit Trail)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action_type VARCHAR(50) NOT NULL,
    module_affected VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    description TEXT NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 31: Authorized Devices
CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_fingerprint VARCHAR(255) NOT NULL,
    device_type VARCHAR(50) NOT NULL,
    fcm_token TEXT,
    last_active_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT idx_devices_user_fingerprint UNIQUE (user_id, device_fingerprint)
);

-- Table 32: Login Sessions
CREATE TABLE login_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 33: Security Events
CREATE TABLE security_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100) NOT NULL,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    ip_address VARCHAR(45) NOT NULL,
    details_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 34: System Settings
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_name VARCHAR(100) NOT NULL UNIQUE,
    value_json JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 36: Activity Timeline
CREATE TABLE activity_timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- INDEXES FOR HIGH-PERFORMANCE OPTIMIZATION
-- ==========================================

CREATE INDEX idx_users_military_id ON users(military_id);
CREATE INDEX idx_users_tawka_status ON users(tawka_id, status);
CREATE INDEX idx_attendance_date_status ON attendance(date, status);
CREATE INDEX idx_leave_req_user_status ON leave_requests(user_id, status);
CREATE INDEX idx_leave_req_dates_tawka ON leave_requests(tawka_id, start_date, end_date);
CREATE INDEX idx_audit_logs_user_timestamp ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_logs_module ON audit_logs(module_affected);
CREATE INDEX idx_tasks_status_priority ON tasks(status, priority);
CREATE INDEX idx_daily_orders_date_importance ON daily_orders(date, importance);
CREATE INDEX idx_rewards_user_date ON rewards(user_id, date);
CREATE INDEX idx_penalties_user_date ON penalties(user_id, date);

-- ==========================================
-- AUTOMATIC TIMESTAMPTZ TRIGGER FUNCTION
-- ==========================================

CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER trg_leave_req_updated_at BEFORE UPDATE ON leave_requests FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER trg_attendance_updated_at BEFORE UPDATE ON attendance FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER trg_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
`;
