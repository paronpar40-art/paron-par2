import React, { useState, useEffect } from 'react';
import {
  Shield,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  CheckSquare,
  Bell,
  Award,
  AlertTriangle,
  TrendingUp,
  Settings,
  Lock,
  LogOut,
  Smartphone,
  Upload,
  Camera,
  FileCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  ArrowRight,
  MapPin,
  Fingerprint,
  Send,
  Layers,
  Activity,
  Sparkles,
  Radio,
  Check,
  Image,
  File,
  Sun,
  Moon,
  Plus,
  Eye,
  Sliders,
  Maximize2,
  Info,
  Key,
  Globe,
  RefreshCw,
  X,
  Zap,
} from 'lucide-react';

export type SoldierScreenId =
  | 'splash'
  | 'login'
  | 'dashboard'
  | 'attendance'
  | 'checkin'
  | 'checkout'
  | 'attendance_history'
  | 'leaves'
  | 'daily_service'
  | 'tasks'
  | 'task_details'
  | 'upload_report'
  | 'orders'
  | 'notifications'
  | 'rewards'
  | 'penalties'
  | 'evaluation'
  | 'profile'
  | 'change_password'
  | 'settings'
  | 'design_specs';

interface TaskItem {
  id: string;
  title: string;
  description: string;
  priority: 'حرج للغاية' | 'عالي' | 'عادي';
  deadline: string;
  progress: number;
  status: 'قيد الانتظار' | 'جاري التنفيذ' | 'مكتمل';
  attachmentsCount: number;
  tawka: string;
}

export const SoldierMobileApp: React.FC = () => {
  // Navigation & Screen State
  const [currentScreen, setCurrentScreen] = useState<SoldierScreenId>('dashboard');
  const [deviceFrame, setDeviceFrame] = useState<'iphone' | 'android' | 'fluid'>('iphone');
  const [isDark, setIsDark] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Authentication State
  const [militaryIdInput, setMilitaryIdInput] = useState('MIL-88421');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [loginError, setLoginError] = useState('');

  // Interactive App State
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [checkInTime, setCheckInTime] = useState('06:45:12 ص');
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [gpsSimulated, setGpsSimulated] = useState({ lat: 24.7136, lng: 46.6753, isInsideUnit: true });
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  // Confirmed Orders State
  const [confirmedOrders, setConfirmedOrders] = useState<string[]>(['ord-101']);
  const [activeOrderTab, setActiveOrderTab] = useState<'latest' | 'archive'>('latest');

  // Task Details & Report Upload State
  const [selectedTask, setSelectedTask] = useState<TaskItem>({
    id: 'tsk-01',
    title: 'صيانة وتفقد ناقلة الجند شاهر-4',
    description: 'إجراء الفحص الدوري الشامل للمحرك ومستوى الزيت ونظام التعليق الهيدروليكي قبل الانطلاق.',
    priority: 'عالي',
    deadline: 'اليوم - 16:00',
    progress: 75,
    status: 'جاري التنفيذ',
    attachmentsCount: 3,
    tawka: 'التوكة 1 - مدرعات الفهد',
  });

  const [reportNote, setReportNote] = useState('');
  const [reportFiles, setReportFiles] = useState<string[]>([
    'صورة_المحرك_شاهر4.jpg',
    'تقرير_الفحص_الفني.pdf',
  ]);
  const [reportSuccessMsg, setReportSuccessMsg] = useState('');

  // Leave Requests State
  const [leaves, setLeaves] = useState([
    {
      id: 'lv-01',
      type: 'إجازة ميدانية',
      startDate: '2026-08-10',
      endDate: '2026-08-15',
      days: 5,
      status: 'موافق عليها (المشرف)',
      reason: 'إجازة دورية مستحقة',
    },
    {
      id: 'lv-02',
      type: 'إجازة طارئة',
      startDate: '2026-06-01',
      endDate: '2026-06-03',
      days: 2,
      status: 'مكتملة',
      reason: 'ظرف عائلي طارئ',
    },
  ]);
  const [newLeaveType, setNewLeaveType] = useState('إجازة ميدانية');
  const [newLeaveStart, setNewLeaveStart] = useState('');
  const [newLeaveDays, setNewLeaveDays] = useState(3);
  const [newLeaveReason, setNewLeaveReason] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // Settings State
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Password Change State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangedMsg, setPasswordChangedMsg] = useState('');

  // Attendance History Data
  const attendanceHistory = [
    { date: 'الثلاثاء 2026-08-04', timeIn: '06:45 ص', timeOut: 'قيد الخدمة', status: 'حاضر', method: 'بصمة حيوية', delay: '0 دقيقة' },
    { date: 'الإثنين 2026-08-03', timeIn: '06:50 ص', timeOut: '17:00 م', status: 'حاضر', method: 'بصمة حيوية', delay: '5 دقائق' },
    { date: 'الأحد 2026-08-02', timeIn: '06:42 ص', timeOut: '17:05 م', status: 'حاضر', method: 'بطاقة ذكية', delay: '0 دقيقة' },
    { date: 'السبت 2026-08-01', timeIn: '07:15 ص', timeOut: '17:00 م', status: 'متأخر', method: 'تسجيل إداري', delay: '30 دقيقة' },
    { date: 'الجمعة 2026-07-31', timeIn: '-', timeOut: '-', status: 'إجازة ميدانية', method: 'إذن رسمي', delay: '-' },
  ];

  // Tasks Data
  const tasksList: TaskItem[] = [
    {
      id: 'tsk-01',
      title: 'صيانة وتفقد ناقلة الجند شاهر-4',
      description: 'إجراء الفحص الدوري الشامل للمحرك ومستوى الزيت ونظام التعليق الهيدروليكي قبل الانطلاق.',
      priority: 'عالي',
      deadline: 'اليوم - 16:00',
      progress: 75,
      status: 'جاري التنفيذ',
      attachmentsCount: 3,
      tawka: 'التوكة 1 - مدرعات الفهد',
    },
    {
      id: 'tsk-02',
      title: 'تأمين البرج الشمالي رقم 3 (نوبة المساء)',
      description: 'استلام موقع الحراسة التكتيكي وتسجيل الملاحظات وحالات المرور في دفتر الخفر الميداني.',
      priority: 'حرج للغاية',
      deadline: 'اليوم - 20:00',
      progress: 20,
      status: 'جاري التنفيذ',
      attachmentsCount: 1,
      tawka: 'التوكة 1 - مدرعات الفهد',
    },
    {
      id: 'tsk-03',
      title: 'تسليم كشف أجهزة الاتصال الميداني',
      description: 'جرد أجهزة اللاسلكي وتأكيد الشحن الكهربائي ومطابقة الأرقام التسلسلية مع العهدة.',
      priority: 'عادي',
      deadline: 'غداً - 10:00',
      progress: 0,
      status: 'قيد الانتظار',
      attachmentsCount: 2,
      tawka: 'التوكة 1 - مدرعات الفهد',
    },
  ];

  // Notifications List
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      type: 'URGENT',
      title: 'بلاغ عاجل: رفع جاهزية التوكة 1',
      content: 'توجيه قيادي برفع الجاهزية القتالية واستكمال تفقد الآليات المدرعة فوراً.',
      time: 'منذ 10 دقائق',
      read: false,
    },
    {
      id: 'n2',
      type: 'PRIVATE',
      title: 'تأكيد الموافقة على الإجازة الميدانية',
      content: 'تم توقيع طلب الإجازة الميدانية من قبل المشرف الأول وتمريرها للآمر.',
      time: 'منذ ساعتين',
      read: false,
    },
    {
      id: 'n3',
      type: 'GENERAL',
      title: 'صدور الأمر اليومي رقم (148 / 2026)',
      content: 'نُشر الأمر اليومي الخاص بتوزيع نوبات خفر الأبراج والتفتيش الدوري.',
      time: 'منذ 4 ساعات',
      read: true,
    },
  ]);

  const [notifTab, setNotifTab] = useState<'ALL' | 'URGENT' | 'PRIVATE' | 'GENERAL'>('ALL');

  // Trigger Biometric Check-in Simulation
  const handleSimulateCheckIn = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setIsCheckedIn(true);
          const nowStr = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          setCheckInTime(nowStr);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleSimulateCheckOut = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setIsCheckedIn(false);
          const nowStr = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          setCheckOutTime(nowStr);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  // Submit Task Report
  const handleSubmitTaskReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccessMsg('تم رفع التقرير الميداني وإشعار المشرف بنجاح.');
    setTimeout(() => {
      setReportSuccessMsg('');
      setCurrentScreen('tasks');
    }, 1500);
  };

  // Confirm Daily Order
  const handleConfirmOrder = (orderId: string) => {
    if (!confirmedOrders.includes(orderId)) {
      setConfirmedOrders([...confirmedOrders, orderId]);
    }
  };

  // Bottom Navigation Handler
  const renderBottomNav = () => {
    if (['splash', 'login'].includes(currentScreen)) return null;

    const navItems = [
      { id: 'dashboard', label: 'الرئيسية', icon: Shield },
      { id: 'attendance', label: 'الحضور', icon: Clock },
      { id: 'tasks', label: 'المهام', icon: CheckSquare },
      { id: 'orders', label: 'الأوامر', icon: FileText },
      { id: 'profile', label: 'ملفي', icon: User },
    ];

    return (
      <div className="sticky bottom-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-emerald-900/40 px-3 py-2 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentScreen === item.id ||
            (item.id === 'attendance' && ['checkin', 'checkout', 'attendance_history', 'leaves'].includes(currentScreen)) ||
            (item.id === 'tasks' && ['task_details', 'upload_report'].includes(currentScreen));

          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id as SoldierScreenId)}
              className={`flex flex-col items-center gap-1 transition-all px-3 py-1 rounded-xl ${
                isActive
                  ? 'text-amber-400 font-bold scale-105 bg-emerald-950/60 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // Top App Bar Header for Mobile
  const renderTopBar = () => {
    if (['splash', 'login'].includes(currentScreen)) return null;

    const titlesMap: Record<string, string> = {
      dashboard: 'تطبيق المقاتل - وحدة المدرعات',
      attendance: 'سجل الحضور والجاهزية',
      checkin: 'إثبات الحضور بالبصمة',
      checkout: 'انصراف الخدمة',
      attendance_history: 'سجل الحضور التفصيلي',
      leaves: 'طلبات الإجازات',
      daily_service: 'جدول الخدمة اليومية',
      tasks: 'المهام الميدانية المسندة',
      task_details: 'تفاصيل المهمة',
      upload_report: 'رفع التقرير الميداني',
      orders: 'الأوامر اليومية المعتمدة',
      notifications: 'مركز التنبيهات البلاغات',
      rewards: 'سجل المكافآت والأنواط',
      penalties: 'سجل الجزاءات الانضباطية',
      evaluation: 'التقييم الشهري الشامل',
      profile: 'الملف العسكري الشخصي',
      change_password: 'تغيير كلمة المرور والرمز',
      settings: 'إعدادات التطبيق',
      design_specs: 'مواصفات نظام التصميم (M3)',
    };

    const isSubScreen = !['dashboard', 'attendance', 'tasks', 'orders', 'profile'].includes(currentScreen);

    return (
      <div className="sticky top-0 z-30 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/60 px-4 py-3 flex justify-between items-center text-white shadow-lg">
        <div className="flex items-center gap-2">
          {isSubScreen ? (
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="p-1.5 rounded-lg bg-emerald-900/60 text-amber-400 border border-emerald-700/60 hover:bg-emerald-800"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
          )}
          <div>
            <h2 className="text-xs font-bold text-amber-300 leading-tight">
              {titlesMap[currentScreen] || 'تطبيق المقاتل'}
            </h2>
            <p className="text-[9px] text-emerald-300 font-mono">رئيس رقباء / عبدالله القحطاني | MIL-88421</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications Trigger */}
          <button
            onClick={() => setCurrentScreen('notifications')}
            className="p-2 rounded-xl bg-emerald-900/60 text-amber-400 border border-emerald-700/60 relative hover:bg-emerald-800"
          >
            <Bell className="w-4 h-4" />
            {notifications.some((n) => !n.read) && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[8px] font-bold flex items-center justify-center animate-pulse">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>

          {/* Device Frame Switcher */}
          <button
            onClick={() => {
              if (deviceFrame === 'iphone') setDeviceFrame('android');
              else if (deviceFrame === 'android') setDeviceFrame('fluid');
              else setDeviceFrame('iphone');
            }}
            className="p-2 rounded-xl bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 text-[10px] font-mono font-bold hover:bg-emerald-800"
            title="تبديل إطار الهاتف"
          >
            {deviceFrame === 'iphone' && 'iPhone'}
            {deviceFrame === 'android' && 'Android'}
            {deviceFrame === 'fluid' && 'شاشة كاملة'}
          </button>
        </div>
      </div>
    );
  };

  // MAIN SCREEN RENDERER (20 COMPLETE SCREENS)
  const renderScreenContent = () => {
    switch (currentScreen) {
      // -----------------------------------------------------------------
      // SCREEN 1: SPLASH SCREEN
      // -----------------------------------------------------------------
      case 'splash':
        return (
          <div className="min-h-[580px] flex flex-col justify-between items-center p-8 bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white text-center">
            <div className="w-full flex justify-end">
              <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-700/40 font-mono">
                تشفير AES-256
              </span>
            </div>

            <div className="space-y-6 flex flex-col items-center my-auto">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500 via-emerald-700 to-emerald-900 p-1 shadow-2xl shadow-amber-500/20 flex items-center justify-center animate-pulse">
                  <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-amber-400">
                    <Shield className="w-12 h-12" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-lg">
                  المقاتل
                </div>
              </div>

              <div>
                <h1 className="text-xl font-black text-white tracking-wide">
                  وحدة المدرعات والدعم الآلي
                </h1>
                <p className="text-xs text-amber-400 font-bold mt-1">تطبيق المقاتل والخدمة الميدانية</p>
                <p className="text-[10px] text-slate-400 mt-2 max-w-xs leading-relaxed">
                  المنظومة المحمولة المعتمدة لضباط الأفراد والصف والجنود لتسجيل الحضور، متابعة المهام، واستلام الأوامر اليومية
                </p>
              </div>
            </div>

            <div className="w-full space-y-3">
              <button
                onClick={() => setCurrentScreen('login')}
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 text-sm transition-all"
              >
                <span>الدخول للنظام العسكري</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <div className="text-[9px] text-slate-500 font-mono">
                جهاز الردع - قيادة وحدة المدرعات © 2026
              </div>
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 2: LOGIN
      // -----------------------------------------------------------------
      case 'login':
        return (
          <div className="p-6 space-y-6 text-white min-h-[580px] flex flex-col justify-center">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-black text-white">تسجيل دخول المقاتل</h2>
              <p className="text-xs text-slate-400">أدخل الرقم العسكري وكلمة المرور للوصول الآمن</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (militaryIdInput && passwordInput) {
                  setIsLoggedIn(true);
                  setCurrentScreen('dashboard');
                } else {
                  setLoginError('يرجى كتابة الرقم العسكري وكلمة المرور بشكل صحيح');
                }
              }}
              className="space-y-4 text-xs"
            >
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold block">الرقم العسكري:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={militaryIdInput}
                    onChange={(e) => setMilitaryIdInput(e.target.value)}
                    placeholder="مثال: MIL-88421"
                    className="w-full py-3 pr-10 pl-3 bg-slate-900 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold block">كلمة المرور / الرمز السرّي:</label>
                <div className="relative">
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full py-3 pr-10 pl-3 bg-slate-900 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <Key className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-[11px] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-2xl shadow-lg shadow-amber-950/50 text-sm transition-all"
              >
                تأكيد الدخول
              </button>

              <div className="relative py-2 flex items-center justify-center">
                <div className="absolute border-t border-slate-800 w-full"></div>
                <span className="relative bg-slate-950 px-3 text-[10px] text-slate-500 font-bold">
                  أو بالبصمة الحيوية
                </span>
              </div>

              <button
                type="button"
                onClick={handleSimulateCheckIn}
                className="w-full py-3 bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all"
              >
                <Fingerprint className="w-5 h-5 text-amber-400" />
                <span>تسجيل الدخول بالبصمة البيومترية</span>
              </button>
            </form>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 3: HOME DASHBOARD
      // -----------------------------------------------------------------
      case 'dashboard':
        return (
          <div className="p-4 space-y-4 text-xs">
            {/* Soldier Welcome Header Card */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 border border-emerald-800/80 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-lg shadow-inner">
                    ر.ر
                  </div>
                  <div>
                    <h3 className="font-black text-white text-sm">رئيس رقباء / عبدالله القحطاني</h3>
                    <span className="text-[10px] text-emerald-300 font-mono">MIL-88421 | التوكة 1 (مدرعات الفهد)</span>
                  </div>
                </div>

                <div className="text-left">
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-[10px] font-bold block">
                    {isCheckedIn ? 'حاضر بالخدمة' : 'خارج الخدمة'}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono block mt-1">{checkInTime}</span>
                </div>
              </div>

              {/* Attendance Quick Strip */}
              <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-emerald-800/60">
                <div className="bg-slate-950/60 p-2 rounded-xl border border-emerald-900/60 flex items-center justify-between">
                  <span className="text-slate-400">حالة اليوم:</span>
                  <span className="font-bold text-emerald-400">حاضر بموعده</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-xl border border-emerald-900/60 flex items-center justify-between">
                  <span className="text-slate-400">الخدمة اليومية:</span>
                  <span className="font-bold text-amber-400">خفر البرج الشمالي</span>
                </div>
              </div>
            </div>

            {/* QUICK BUTTONS GRID (6 CORE SOLDIER ACTIONS) */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> الأزرار السريعة للمقاتل (Quick Actions)
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setCurrentScreen('checkin')}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-emerald-800/80 text-emerald-400 flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <Fingerprint className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-[10px]">إثبات حضور</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('checkout')}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-rose-900/60 text-rose-400 flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <LogOut className="w-5 h-5 text-rose-400" />
                  <span className="font-bold text-[10px]">انصراف</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('orders')}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-amber-800/60 text-amber-400 flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-[10px]">الأوامر اليومية</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('tasks')}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-cyan-800/60 text-cyan-400 flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <CheckSquare className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold text-[10px]">مهامي اليوم</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('notifications')}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-purple-800/60 text-purple-400 flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <Bell className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-[10px]">التنبيهات</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('profile')}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <User className="w-5 h-5 text-slate-300" />
                  <span className="font-bold text-[10px]">ملفي العسكري</span>
                </button>
              </div>
            </div>

            {/* TODAY'S DAILY ORDER CARD */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-400" />
                  الأمر اليومي النافذ اليوم
                </span>
                <span className="px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 rounded-md text-[9px] font-bold">
                  عاجل وهام
                </span>
              </div>
              <h4 className="font-bold text-white text-xs">أمر قيادي رقم (148 / 2026) - رفع جاهزية التوكة 1</h4>
              <p className="text-slate-300 line-clamp-2 text-[11px] leading-relaxed">
                توجيه قيادي برفع الجاهزية القتالية للتوكة 1 بنسبة 95% والتأكد من جاهزية ناقلات الجند والمعدات.
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-[10px]">
                <span className="text-slate-400">صادر عن: العميد الركن / سعود القحطاني</span>
                <button
                  onClick={() => setCurrentScreen('orders')}
                  className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>قراءة وتأكيد الإقرار</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* DAILY SERVICE & GUARD OFFICER SNAPSHOT */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  موقف الخدمة اليومية وضابط الخفر
                </h4>
                <button
                  onClick={() => setCurrentScreen('daily_service')}
                  className="text-emerald-400 text-[10px] font-bold hover:underline"
                >
                  التفاصيل
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[9px]">ضابط الخفر المناوب:</span>
                  <span className="font-bold text-amber-300">الرائد / طارق العتيبي</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[9px]">الفريق الميداني المسند:</span>
                  <span className="font-bold text-white">طاقم التوكة 1 (المجموعة أ)</span>
                </div>
              </div>
            </div>

            {/* SOLDIER EVALUATION & STATS METRICS CARDS */}
            <div className="grid grid-cols-3 gap-2">
              <div
                onClick={() => setCurrentScreen('evaluation')}
                className="p-3 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-amber-500/50 transition-all text-center space-y-1"
              >
                <span className="text-[9px] text-slate-400 block font-bold">التقييم الشهري</span>
                <span className="text-lg font-black text-amber-400 font-mono">94%</span>
                <span className="text-[8px] text-emerald-400 font-bold block">ممتاز (A+)</span>
              </div>

              <div
                onClick={() => setCurrentScreen('rewards')}
                className="p-3 rounded-2xl bg-slate-900 border border-emerald-900/60 cursor-pointer hover:border-emerald-500/50 transition-all text-center space-y-1"
              >
                <span className="text-[9px] text-slate-400 block font-bold">المكافآت والأنواط</span>
                <span className="text-lg font-black text-emerald-400 font-mono">3</span>
                <span className="text-[8px] text-emerald-300 font-bold block">+15 نقطة</span>
              </div>

              <div
                onClick={() => setCurrentScreen('penalties')}
                className="p-3 rounded-2xl bg-slate-900 border border-rose-900/60 cursor-pointer hover:border-rose-500/50 transition-all text-center space-y-1"
              >
                <span className="text-[9px] text-slate-400 block font-bold">الجزاءات الانضباطية</span>
                <span className="text-lg font-black text-rose-400 font-mono">0</span>
                <span className="text-[8px] text-emerald-400 font-bold block">سجل نظيف</span>
              </div>
            </div>

            {/* TODAY'S ASSIGNED TASKS SNAPSHOT */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-cyan-400" />
                  مهامي اليومية القائمة ({tasksList.length})
                </h4>
                <button
                  onClick={() => setCurrentScreen('tasks')}
                  className="text-cyan-400 text-[10px] font-bold hover:underline"
                >
                  عرض الكل
                </button>
              </div>

              {tasksList.map((tsk) => (
                <div
                  key={tsk.id}
                  onClick={() => {
                    setSelectedTask(tsk);
                    setCurrentScreen('task_details');
                  }}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-xs">{tsk.title}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                      tsk.priority === 'حرج للغاية' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {tsk.priority}
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className="bg-cyan-500 h-full rounded-full transition-all"
                      style={{ width: `${tsk.progress}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>الموعد: {tsk.deadline}</span>
                    <span className="text-cyan-400 font-bold">{tsk.progress}% مكتمل</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 4: ATTENDANCE MAIN
      // -----------------------------------------------------------------
      case 'attendance':
        return (
          <div className="p-4 space-y-4 text-xs">
            {/* Today's Status Header Card */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-emerald-800/80 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  حضور الجاهزية اليوم
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold">
                  {isCheckedIn ? 'حاضر (مكتمل البصمة)' : 'لم يتم الإثبات'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-2 gap-3 text-[11px]">
                <div>
                  <span className="text-slate-400 block">وقت الحضور:</span>
                  <span className="font-bold text-emerald-400 font-mono">{checkInTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">طريقة الإثبات:</span>
                  <span className="font-bold text-amber-300">البصمة البيومترية الذكية</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCurrentScreen('checkin')}
                  className="py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-2xl text-center shadow-lg transition-all"
                >
                  إثبات حضور الآن
                </button>
                <button
                  onClick={() => setCurrentScreen('checkout')}
                  className="py-3 bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold rounded-2xl text-center border border-rose-900/60 transition-all"
                >
                  إثبات انصراف
                </button>
              </div>
            </div>

            {/* ATTENDANCE QUICK NAVIGATION TILES */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentScreen('attendance_history')}
                className="p-4 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-right space-y-2 transition-all"
              >
                <Clock className="w-6 h-6 text-amber-400" />
                <h4 className="font-bold text-white text-xs">سجل الحضور التاريخي</h4>
                <p className="text-[10px] text-slate-400">عرض الأيام السابقة وأوقات التأخير</p>
              </button>

              <button
                onClick={() => setCurrentScreen('leaves')}
                className="p-4 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-right space-y-2 transition-all"
              >
                <Calendar className="w-6 h-6 text-cyan-400" />
                <h4 className="font-bold text-white text-xs">طلبات الإجازات</h4>
                <p className="text-[10px] text-slate-400">تقديم ومتابعة الإجازات الميدانية</p>
              </button>
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 5: CHECK-IN
      // -----------------------------------------------------------------
      case 'checkin':
        return (
          <div className="p-5 space-y-5 text-xs text-white">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-black text-white">إثبات الحضور بالبصمة الحيوية والموقع (Geofence)</h3>
              <p className="text-[11px] text-slate-400">يجب التواجد داخل النطاق الجغرافي المعتمد لوحدة المدرعات</p>
            </div>

            {/* GPS Geofence Status Box */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-emerald-800/80 space-y-2 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  حالة النطاق الجغرافي GPS
                </span>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-md font-bold text-[9px]">
                  داخل النطاق المعتمد (وحدة المدرعات)
                </span>
              </div>
              <p className="text-slate-300 font-mono text-[10px]">
                الإحداثيات: {gpsSimulated.lat}, {gpsSimulated.lng} | الدقة: ±2 متر
              </p>
            </div>

            {/* Biometric Scanner Visual Simulation */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
              <div
                onClick={handleSimulateCheckIn}
                className="w-28 h-28 mx-auto rounded-full bg-emerald-950 border-2 border-emerald-500/60 p-4 flex items-center justify-center cursor-pointer shadow-2xl hover:scale-105 transition-all relative overflow-hidden"
              >
                <Fingerprint className={`w-16 h-16 ${isScanning ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`} />
                {isScanning && (
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-emerald-500/30 transition-all duration-300"
                    style={{ height: `${scanProgress}%` }}
                  ></div>
                )}
              </div>

              <div>
                <span className="font-bold text-amber-300 block text-xs">
                  {isScanning ? 'جاري التحقق من البصمة البيومترية...' : 'انقر أعلاه لمسح البصمة الحيوية'}
                </span>
                <span className="text-[10px] text-slate-400">مطابقة البصمة مع سجل القوة البشرية</span>
              </div>
            </div>

            {isCheckedIn && (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400" />
                <h4 className="font-bold text-xs">تم تسجيل الحضور بنجاح!</h4>
                <p className="text-[10px] font-mono">توقيع البصمة: {checkInTime}</p>
              </div>
            )}
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 6: CHECK-OUT
      // -----------------------------------------------------------------
      case 'checkout':
        return (
          <div className="p-5 space-y-5 text-xs text-white">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-black text-white">إثبات انصراف نهاية النوبة / الخدمة</h3>
              <p className="text-[11px] text-slate-400">تأكيد إنهاء المهام والتسليم الميداني قبل الخروج</p>
            </div>

            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="font-bold text-amber-300">ملخص نوبة اليوم:</h4>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span>وقت الحضور المسجل:</span>
                  <span className="font-bold font-mono text-emerald-400">{checkInTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>ساعات الخدمة المكتملة:</span>
                  <span className="font-bold font-mono text-amber-300">10 ساعات و15 دقيقة</span>
                </div>
                <div className="flex justify-between">
                  <span>حالة مهام اليوم:</span>
                  <span className="font-bold text-cyan-400">مكتملة بنسبة 100%</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSimulateCheckOut}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              <span>تأكيد تسجيل الانصراف النهائي</span>
            </button>

            {checkOutTime && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-800 text-emerald-300 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400" />
                <h4 className="font-bold text-xs">تم تسجيل الانصراف بنجاح</h4>
                <p className="text-[10px] font-mono">وقت الانصراف: {checkOutTime}</p>
              </div>
            )}
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 7: MY ATTENDANCE HISTORY
      // -----------------------------------------------------------------
      case 'attendance_history':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-amber-400 text-sm">سجل الحضور والغياب والتأخير</h3>
              <span className="text-[10px] text-slate-400 font-mono">أغسطس 2026</span>
            </div>

            <div className="space-y-2">
              {attendanceHistory.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{item.date}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                      item.status === 'حاضر' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-300 font-mono pt-1 border-t border-slate-800">
                    <div>
                      <span className="text-slate-500 block">دخول:</span>
                      <span className="font-bold text-emerald-400">{item.timeIn}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">خروج:</span>
                      <span className="font-bold text-slate-300">{item.timeOut}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">التأخير:</span>
                      <span className="font-bold text-amber-400">{item.delay}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 8: MY LEAVE REQUESTS
      // -----------------------------------------------------------------
      case 'leaves':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <h3 className="font-bold text-cyan-400 text-sm">تقديم إجازة ميدانية متابعة الطلبات</h3>

            {/* New Leave Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newLeaveStart) return;
                const newL = {
                  id: `lv-${Date.now()}`,
                  type: newLeaveType,
                  startDate: newLeaveStart,
                  endDate: newLeaveStart,
                  days: Number(newLeaveDays),
                  status: 'معلقة (تحت مراجعة المشرف)',
                  reason: newLeaveReason || 'إجازة مستحقة',
                };
                setLeaves([newL, ...leaves]);
                setLeaveSubmitted(true);
                setTimeout(() => setLeaveSubmitted(false), 2000);
              }}
              className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3"
            >
              <h4 className="font-bold text-white text-xs">تقديم طلب إجازة جديد:</h4>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block text-[10px] mb-1">نوع الإجازة:</label>
                  <select
                    value={newLeaveType}
                    onChange={(e) => setNewLeaveType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-bold"
                  >
                    <option value="إجازة ميدانية">إجازة ميدانية</option>
                    <option value="إجازة مرضية">إجازة مرضية</option>
                    <option value="إجازة طارئة">إجازة طارئة</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block text-[10px] mb-1">عدد الأيام:</label>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={newLeaveDays}
                    onChange={(e) => setNewLeaveDays(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block text-[10px] mb-1">تاريخ البدء:</label>
                <input
                  type="date"
                  value={newLeaveStart}
                  onChange={(e) => setNewLeaveStart(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block text-[10px] mb-1">السبب / الملاحظات:</label>
                <textarea
                  rows={2}
                  value={newLeaveReason}
                  onChange={(e) => setNewLeaveReason(e.target.value)}
                  placeholder="اكتب سبب طلب الإجازة..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                />
              </div>

              {leaveSubmitted && (
                <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-center font-bold">
                  تم إرسال طلب الإجازة للمشرف بنجاح!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-2xl shadow-md transition-all"
              >
                إرسال طلب الإجازة
              </button>
            </form>

            {/* Submitted Leaves Track */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-300">سجل الطلبات السابقة:</h4>
              {leaves.map((l) => (
                <div key={l.id} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{l.type} ({l.days} أيام)</span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-950 text-amber-300 border border-amber-800 text-[9px] font-bold">
                      {l.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">السبب: {l.reason}</p>
                  <span className="text-[9px] text-slate-500 font-mono block">التاريخ: {l.startDate}</span>
                </div>
              ))}
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 9: DAILY SERVICE
      // -----------------------------------------------------------------
      case 'daily_service':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <h3 className="font-bold text-teal-400 text-sm">تفاصيل الخدمة اليومية ونوبة الخفر</h3>

            <div className="p-4 rounded-3xl bg-slate-900 border border-teal-800/80 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">موقعي الميداني اليوم</span>
                <span className="px-2.5 py-1 bg-teal-950 text-teal-300 border border-teal-800 rounded-xl font-bold">
                  خفر البرج الشمالي رقم 3
                </span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">ساعات النوبة:</span>
                  <span className="font-bold text-amber-300 font-mono">16:00 - 20:00 م</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">ضابط الخفر المسئول:</span>
                  <span className="font-bold text-white">الرائد / طارق العتيبي</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">الطاقم المناوب معي:</span>
                  <span className="font-bold text-emerald-400">رقيب / خالد الشمري + عريف / بدر الحربي</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1">
                <h5 className="font-bold text-amber-400">التوجيهات والتعليمات الخاصة بالنوبة:</h5>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  التدقيق الكامل في تصاريح الدخول للبوابة الشمالية، مطابقة هويات الزوار، وتأكيد شحن جهاز اللاسلكي الرئيسي على التردد التكتيكي 4.
                </p>
              </div>
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 10: TODAY'S TASKS
      // -----------------------------------------------------------------
      case 'tasks':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-cyan-400 text-sm">قائمة المهام الميدانية اليومية</h3>
              <span className="text-[10px] text-slate-400 font-mono">{tasksList.length} مهام قائمات</span>
            </div>

            <div className="space-y-3">
              {tasksList.map((tsk) => (
                <div
                  key={tsk.id}
                  onClick={() => {
                    setSelectedTask(tsk);
                    setCurrentScreen('task_details');
                  }}
                  className="p-4 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all space-y-2.5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white text-xs">{tsk.title}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{tsk.description}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                      tsk.priority === 'حرج للغاية' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {tsk.priority}
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded-full"
                      style={{ width: `${tsk.progress}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
                    <span>الموعد النهائي: {tsk.deadline}</span>
                    <span className="text-cyan-400 font-bold">التفاصيل والتسليم ←</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 11: TASK DETAILS
      // -----------------------------------------------------------------
      case 'task_details':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-bold text-cyan-400 text-sm">تفاصيل المهمة الميدانية</span>
                <span className="px-2.5 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded-md font-bold text-[10px]">
                  {selectedTask.priority}
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-white">{selectedTask.title}</h3>
                <p className="text-slate-300 leading-relaxed mt-2 text-[11px]">{selectedTask.description}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">التوكة المسندة:</span>
                  <span className="font-bold text-white">{selectedTask.tawka}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">الموعد النهائي لتسليم التقرير:</span>
                  <span className="font-bold text-rose-400 font-mono">{selectedTask.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">حالة الإنجاز الحالية:</span>
                  <span className="font-bold text-cyan-400 font-mono">{selectedTask.progress}%</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen('upload_report')}
                className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>رفع التقرير الميداني والمرفقات</span>
              </button>
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 12: UPLOAD TASK REPORT
      // -----------------------------------------------------------------
      case 'upload_report':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-cyan-400 text-sm">رفع التقرير الميداني والصور والمستندات</h3>

              <form onSubmit={handleSubmitTaskReport} className="space-y-4">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">ملاحظات ونتائج التنفيذ:</label>
                  <textarea
                    rows={4}
                    value={reportNote}
                    onChange={(e) => setReportNote(e.target.value)}
                    placeholder="اكتب التقرير الميداني وتأكيد اكتمال الصيانة أو الفحص..."
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-cyan-500 text-xs"
                  />
                </div>

                {/* Upload Photo Dropzone Simulation */}
                <div className="p-4 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-700 text-center space-y-2">
                  <Camera className="w-8 h-8 text-cyan-400 mx-auto" />
                  <span className="font-bold text-slate-300 block">التقاط أو إرفاق الصور والمستندات</span>
                  <span className="text-[10px] text-slate-500 block">يدعم صور JPG, PNG أو مستندات PDF</span>

                  <button
                    type="button"
                    onClick={() => setReportFiles([...reportFiles, `صورة_ميدانية_${Date.now()}.jpg`])}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl font-bold text-[10px] border border-cyan-800"
                  >
                    + إضافة ملف / صورة جديدة
                  </button>
                </div>

                {/* Attached Files List */}
                <div className="space-y-1.5">
                  <span className="text-slate-400 block text-[10px]">الملفات المرفقة ({reportFiles.length}):</span>
                  {reportFiles.map((file, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center font-mono text-[10px]">
                      <span className="text-emerald-400 truncate">{file}</span>
                      <span className="text-slate-500">تم الإرفاق</span>
                    </div>
                  ))}
                </div>

                {reportSuccessMsg && (
                  <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-center font-bold">
                    {reportSuccessMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-2xl shadow-lg transition-all text-sm"
                >
                  إرسال التقرير النهائي للمشرف
                </button>
              </form>
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 13: DAILY ORDERS
      // -----------------------------------------------------------------
      case 'orders':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-amber-400 text-sm">الأوامر اليومية القيادية المعتمدة</h3>
              <div className="flex gap-1 text-[10px]">
                <button
                  onClick={() => setActiveOrderTab('latest')}
                  className={`px-2.5 py-1 rounded-lg font-bold ${
                    activeOrderTab === 'latest' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  الأمر الحالي
                </button>
                <button
                  onClick={() => setActiveOrderTab('archive')}
                  className={`px-2.5 py-1 rounded-lg font-bold ${
                    activeOrderTab === 'archive' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  الأرشيف
                </button>
              </div>
            </div>

            {activeOrderTab === 'latest' ? (
              <div className="p-5 rounded-3xl bg-slate-900 border border-amber-500/40 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="font-bold text-amber-300 font-mono">أمر يومي رقم (148 / 2026)</span>
                  <span className="px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 rounded-md text-[9px] font-bold">
                    عاجل وهام
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">رفع جاهزية التوكة 1 وتأكيد صيانة المدرعات</h4>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    بناءً على توجيهات قيادة وحدة المدرعات والدعم الآلي، يُكلف جميع أفراد طاقم التوكة 1 بإجراء التفقد الميداني الشامل واستكمال الجاهزية بنسبة لا تقل عن 95%.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-[10px] font-mono">
                  <div>الجهة المصدرة: العميد الركن / سعود بن عبدالعزيز القحطاني</div>
                  <div>تاريخ الإصدار: الثلاثاء 17 صفر 1448 هـ</div>
                </div>

                {confirmedOrders.includes('ord-101') ? (
                  <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-center font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>تم تأكيد إقرار القراءة والاستلام لهذا الأمر</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleConfirmOrder('ord-101')}
                    className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-2xl shadow-lg transition-all text-sm"
                  >
                    تأكيد إقرار القراءة والاستلام القيادي
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">أمر يومي رقم (147 / 2026) - تنظيم الخفر المسائي</span>
                  <span className="text-[10px] text-slate-400 font-mono">تاريخ 2026-08-01 | تم الإقرار</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">أمر يومي رقم (146 / 2026) - تفقد مستودع الذخيرة</span>
                  <span className="text-[10px] text-slate-400 font-mono">تاريخ 2026-07-28 | تم الإقرار</span>
                </div>
              </div>
            )}
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 14: NOTIFICATIONS
      // -----------------------------------------------------------------
      case 'notifications':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-purple-400 text-sm">مركز التنبيهات والبلاغات</h3>
              <div className="flex gap-1 text-[9px]">
                {(['ALL', 'URGENT', 'PRIVATE', 'GENERAL'] as const).map((ft) => (
                  <button
                    key={ft}
                    onClick={() => setNotifTab(ft)}
                    className={`px-2 py-1 rounded-lg font-bold ${
                      notifTab === ft ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {ft === 'ALL' && 'الكل'}
                    {ft === 'URGENT' && 'عاجل'}
                    {ft === 'PRIVATE' && 'خاص'}
                    {ft === 'GENERAL' && 'عام'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {notifications
                .filter((n) => notifTab === 'ALL' || n.type === notifTab)
                .map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setNotifications(
                        notifications.map((item) => (item.id === n.id ? { ...item, read: true } : item))
                      );
                    }}
                    className={`p-3.5 rounded-2xl border space-y-1.5 cursor-pointer transition-all ${
                      n.type === 'URGENT'
                        ? 'bg-rose-950/40 border-rose-800/80'
                        : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span className={n.type === 'URGENT' ? 'text-rose-300' : 'text-amber-300'}>
                        {n.title}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{n.content}</p>
                  </div>
                ))}
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 15: REWARDS
      // -----------------------------------------------------------------
      case 'rewards':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <h3 className="font-bold text-amber-400 text-sm">سجل المكافآت والأنواط والتميز</h3>

            <div className="space-y-3">
              <div className="p-4 rounded-3xl bg-slate-900 border border-emerald-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-400 text-xs">نوط الانضباط والتميز الميداني</span>
                  <span className="text-[10px] text-amber-400 font-mono font-bold">+10 نقاط</span>
                </div>
                <p className="text-slate-300 text-[11px]">التميز في تنفيذ مهام الجاهزية والانضباط التام في المواعيد.</p>
                <span className="text-[9px] text-slate-500 font-mono block">التاريخ: 2026-07-15 | صادر عن الآمر</span>
              </div>

              <div className="p-4 rounded-3xl bg-slate-900 border border-emerald-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-400 text-xs">كتاب شكر وتقدير قيادي</span>
                  <span className="text-[10px] text-amber-400 font-mono font-bold">+5 نقاط</span>
                </div>
                <p className="text-slate-300 text-[11px]">تقدير الجهود المتميزة في صيانة ناقلة الجند وتأمين الموقع.</p>
                <span className="text-[9px] text-slate-500 font-mono block">التاريخ: 2026-06-20 | صادر عن المشرف الأول</span>
              </div>
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 16: PENALTIES
      // -----------------------------------------------------------------
      case 'penalties':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <h3 className="font-bold text-rose-400 text-sm">سجل الجزاءات والانضباط العسكري</h3>

            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-xs">السجل الإنضباطي نظيف تماماً</h4>
              <p className="text-[11px] text-slate-400">لا توجد أي جزاءات أو لفت نظر مسجلة خلال الفترة الحالية</p>
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 17: MONTHLY EVALUATION
      // -----------------------------------------------------------------
      case 'evaluation':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <h3 className="font-bold text-amber-400 text-sm">التقييم الشهري الشامل للمقاتل</h3>

            {/* Overall Score Gauge Box */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 border border-emerald-800 text-center space-y-3 shadow-xl">
              <span className="text-[10px] text-emerald-300 font-bold block">الدرجة النهائية المستحقة:</span>
              <div className="text-3xl font-black text-amber-400 font-mono">94 / 100</div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold text-xs inline-block">
                مستوى التقدير: ممتاز (A+)
              </span>
            </div>

            {/* Score Breakdown List */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-300">تفاصيل توزيع الدرجات:</h4>

              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
                <span>نسبة التزام الحضور والبصمة:</span>
                <span className="font-bold text-emerald-400 font-mono">30 / 30</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
                <span>إنجاز المهام الميدانية:</span>
                <span className="font-bold text-emerald-400 font-mono">28 / 30</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
                <span>الانضباط والسلوك العسكري:</span>
                <span className="font-bold text-emerald-400 font-mono">20 / 20</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
                <span>نقاط المكافآت والأنواط:</span>
                <span className="font-bold text-amber-400 font-mono">+16 / 20</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
                <span>خصم الجزاءات:</span>
                <span className="font-bold text-emerald-400 font-mono">0</span>
              </div>
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 18: PERSONAL PROFILE
      // -----------------------------------------------------------------
      case 'profile':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-500/60 p-1 flex items-center justify-center text-2xl font-black text-amber-400 shadow-xl">
                ر.ر
              </div>

              <div>
                <h3 className="font-black text-white text-sm">رئيس رقباء / عبدالله بن علي القحطاني</h3>
                <span className="text-[10px] text-amber-400 font-mono font-bold block mt-0.5">
                  رقم الملف: MIL-88421
                </span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2.5 text-[11px]">
              <h4 className="font-bold text-slate-300 border-b border-slate-800 pb-2">البيانات الشخصية والعسكرية:</h4>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">الرتبة العسكرية:</span>
                <span className="font-bold text-white">رئيس رقباء</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">التوكة الميدانية المسندة:</span>
                <span className="font-bold text-amber-300">التوكة 1 - مدرعات الفهد</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">التخصص العسكري:</span>
                <span className="font-bold text-white">فني صيانة مدرعات دعم آلي</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">رقم الهاتف المسجل:</span>
                <span className="font-bold text-emerald-400 font-mono">0501234567</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCurrentScreen('change_password')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-2xl border border-amber-500/30 text-center transition-all"
              >
                تغيير كلمة المرور
              </button>
              <button
                onClick={() => setCurrentScreen('settings')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl border border-slate-700 text-center transition-all"
              >
                إعدادات التطبيق
              </button>
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 19: CHANGE PASSWORD
      // -----------------------------------------------------------------
      case 'change_password':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-amber-400 text-sm">تغيير كلمة المرور / الرمز السرّي</h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newPassword || newPassword !== confirmPassword) return;
                  setPasswordChangedMsg('تم تحديث كلمة المرور بنجاح!');
                  setTimeout(() => setPasswordChangedMsg(''), 2000);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="text-slate-400 block text-[10px] mb-1">كلمة المرور الحالية:</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block text-[10px] mb-1">كلمة المرور الجديدة:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block text-[10px] mb-1">تأكيد كلمة المرور الجديدة:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                {passwordChangedMsg && (
                  <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-center font-bold">
                    {passwordChangedMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-2xl shadow-lg transition-all"
                >
                  حفظ كلمة المرور الجديدة
                </button>
              </form>
            </div>
          </div>
        );

      // -----------------------------------------------------------------
      // SCREEN 20: APP SETTINGS
      // -----------------------------------------------------------------
      case 'settings':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <h3 className="font-bold text-amber-400 text-sm">إعدادات وتفضيلات التطبيق المحمول</h3>

            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <div>
                  <span className="font-bold text-white block">الدخول بالبصمة الحيوية (Biometric)</span>
                  <span className="text-[10px] text-slate-400">استخدام بصمة الإصبع أو الوجه للولوج السريع</span>
                </div>
                <input
                  type="checkbox"
                  checked={biometricsEnabled}
                  onChange={(e) => setBiometricsEnabled(e.target.checked)}
                  className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <div>
                  <span className="font-bold text-white block">التنبيهات الفورية للبلاغات</span>
                  <span className="text-[10px] text-slate-400">استلام إشعارات عاجلة بالأوامر القيادية</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <div>
                  <span className="font-bold text-white block">لغة الواجهة (Language)</span>
                  <span className="text-[10px] text-slate-400">العربية / English</span>
                </div>
                <span className="px-3 py-1 bg-slate-950 text-amber-400 border border-slate-700 rounded-xl font-bold font-mono">
                  العربية (RTL)
                </span>
              </div>

              <button
                onClick={() => setCurrentScreen('login')}
                className="w-full py-3 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold rounded-2xl text-center transition-all flex items-center justify-center gap-2 mt-2"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج من الحساب</span>
              </button>
            </div>

            <button
              onClick={() => setCurrentScreen('design_specs')}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold rounded-2xl text-center text-[10px]"
            >
              عرض دليل المكونات وتصميم M3 المطور
            </button>
          </div>
        );

      // -----------------------------------------------------------------
      // EXTRA DEV VIEW: DESIGN SPECS & COMPONENT LIBRARY
      // -----------------------------------------------------------------
      case 'design_specs':
        return (
          <div className="p-4 space-y-4 text-xs text-white">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 text-sm">مواصفات تصميم M3 العسكري المطور (Developer Design Tokens)</h3>
              <div className="space-y-2 text-[11px] text-slate-300">
                <div>• الألوان الرئيسية: الأخضر العسكري (#2D4A27), الرمادي الداكن (#1E293B), الذهبي (#D97706)</div>
                <div>• الخط والمحاذاة: Cairo / Tajawal مع دعم كامل للاتجاه العربي (RTL)</div>
                <div>• الحماية والصلاحيات: تطبيق المقاتل مخصص لعرض البيانات الشخصية فقط بدون أي صلاحيات إدارية</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Device Controls Bar */}
      <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-black text-white text-sm">تطبيق المقاتل للجوال (Military Soldier Mobile App)</h2>
            <p className="text-[11px] text-slate-400">
              واجهة الهواتف الذكية (Android & iPhone) المخصصة للمنتسب العسكري لعرض الموقف الشخصي والحضور والأوامر
            </p>
          </div>
        </div>

        {/* Device Frame Switcher Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 font-bold text-[11px]">
          <button
            onClick={() => setDeviceFrame('iphone')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              deviceFrame === 'iphone' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            iPhone Frame
          </button>
          <button
            onClick={() => setDeviceFrame('android')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              deviceFrame === 'android' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Android Frame
          </button>
          <button
            onClick={() => setDeviceFrame('fluid')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              deviceFrame === 'fluid' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            شاشة كاملة
          </button>
        </div>
      </div>

      {/* MOBILE DEVICE CONTAINER */}
      <div className="flex justify-center my-4">
        <div
          className={`transition-all duration-300 relative ${
            deviceFrame === 'iphone'
              ? 'w-full max-w-[390px] min-h-[780px] rounded-[48px] border-[10px] border-slate-800 bg-slate-950 shadow-2xl overflow-hidden ring-1 ring-slate-700'
              : deviceFrame === 'android'
              ? 'w-full max-w-[400px] min-h-[780px] rounded-[36px] border-[8px] border-slate-800 bg-slate-950 shadow-2xl overflow-hidden ring-1 ring-slate-700'
              : 'w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-950 p-2 shadow-xl'
          }`}
        >
          {/* Top Notch for iPhone/Android */}
          {deviceFrame !== 'fluid' && (
            <div className="w-32 h-4 bg-slate-800 mx-auto rounded-b-2xl mb-1 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-950 rounded-full"></div>
            </div>
          )}

          {/* App Top Navigation Bar */}
          {renderTopBar()}

          {/* Active Screen Viewport */}
          <div className="min-h-[580px] max-h-[680px] overflow-y-auto scrollbar-none">
            {renderScreenContent()}
          </div>

          {/* App Bottom Navigation Bar */}
          {renderBottomNav()}
        </div>
      </div>
    </div>
  );
};
