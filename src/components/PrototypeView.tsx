import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  Calendar,
  ClipboardList,
  CheckSquare,
  FileText,
  Award,
  AlertTriangle,
  TrendingUp,
  Printer,
  History,
  UserCog,
  Plus,
  CheckCircle2,
  Clock,
  Lock,
  Search,
  Filter,
  AlertCircle,
  FileCheck,
  Send,
  Zap,
  Database,
  Bell,
  Sun,
  User,
  Download,
  Share2,
  Eye,
  Edit3,
  Trash2,
  X,
  ChevronDown,
  BarChart2,
  PieChart,
  Activity,
  Sparkles,
  Radio,
  Archive,
  Sliders,
  LogOut,
  Maximize2,
  Settings,
  ChevronLeft,
  CheckCircle,
  XCircle,
  FileDown,
  FileSpreadsheet,
  Layers,
  Menu,
} from 'lucide-react';
import { DatabaseSchemaSection } from './DatabaseSchemaSection';
import {
  AttendanceRecord,
  AuditLog,
  DailyOrder,
  DutyShift,
  LeaveRequest,
  Personnel,
  RewardPenaltyRecord,
  TacticalTask,
  TawkaId,
  UserRole,
} from '../types/srs';
import {
  INITIAL_ATTENDANCE,
  INITIAL_AUDIT_LOGS,
  INITIAL_DUTY_SHIFTS,
  INITIAL_LEAVES,
  INITIAL_ORDERS,
  INITIAL_PERSONNEL,
  INITIAL_REWARDS_PENALTIES,
  INITIAL_TASKS,
} from '../data/mockUnitData';
import { TAWKAS_SPECIFICATION } from '../data/srsData';

interface PrototypeViewProps {
  currentRole: UserRole;
  onOpenPrintModal: (title: string, content: string) => void;
  isDarkTheme: boolean;
}

export const PrototypeView: React.FC<PrototypeViewProps> = ({
  currentRole,
  onOpenPrintModal,
  isDarkTheme,
}) => {
  // Sidebar tab state
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'personnel'
    | 'attendance'
    | 'leaves'
    | 'duty'
    | 'guard'
    | 'tasks'
    | 'orders'
    | 'notifications'
    | 'rewards'
    | 'penalties'
    | 'evaluations'
    | 'reports'
    | 'archive'
    | 'audit'
    | 'settings'
    | 'database'
  >('dashboard');

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Prototype State
  const [personnelList, setPersonnelList] = useState<Personnel[]>(INITIAL_PERSONNEL);
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [leavesList, setLeavesList] = useState<LeaveRequest[]>(INITIAL_LEAVES);
  const [dutyShifts, setDutyShifts] = useState<DutyShift[]>(INITIAL_DUTY_SHIFTS);
  const [taskList, setTaskList] = useState<TacticalTask[]>(INITIAL_TASKS);
  const [ordersList, setOrdersList] = useState<DailyOrder[]>(INITIAL_ORDERS);
  const [rpList, setRpList] = useState<RewardPenaltyRecord[]>(INITIAL_REWARDS_PENALTIES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Notifications State
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 'notif-1',
      title: 'رفع جاهزية التوكة 1',
      content: 'توجيه قيادي برفع الجاهزية القتالية للتوكة 1 بنسبة 95% والتأكد من صيانة الآليات.',
      type: 'URGENT',
      date: 'منذ 10 دقائق',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'تغيير خفر الأبراج الرئيسي',
      content: 'اعتماد كشف الخفر للنوبة المسائية بداية من الساعة 16:00.',
      type: 'GENERAL',
      date: 'منذ ساعة',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'موافقة على إجازة رئيس رقباء عبد الله العتيبي',
      content: 'تم توقيع إجازة الميدان من قبل الآمر بعد مطابقة الجاهزية BR-01.',
      type: 'PRIVATE',
      date: 'منذ ساعتين',
      read: false,
    },
  ]);

  const [notifFilter, setNotifFilter] = useState<'ALL' | 'GENERAL' | 'PRIVATE' | 'URGENT'>('ALL');
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  // Header Realtime Clock State
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setDateString(
        now.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Search & Modals state
  const [globalSearch, setGlobalSearch] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Action Modals State
  const [activeModal, setActiveModal] = useState<
    'NEW_ORDER' | 'NEW_TASK' | 'NEW_NOTIF' | 'NEW_ATTENDANCE' | 'NEW_REWARD_PENALTY' | 'VIEW_READERS' | 'EXPORT_REPORT' | null
  >(null);

  const [selectedOrderForReaders, setSelectedOrderForReaders] = useState<DailyOrder | null>(null);

  // Forms state
  const [newOrderTitle, setNewOrderTitle] = useState('');
  const [newOrderContent, setNewOrderContent] = useState('');
  const [newOrderCategory, setNewOrderCategory] = useState('رفع جاهزية');

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskTawka, setNewTaskTawka] = useState<TawkaId>('tawka-1');

  const [newNotifTitle, setNewNotifTitle] = useState('');
  const [newNotifContent, setNewNotifContent] = useState('');
  const [newNotifType, setNewNotifType] = useState<'GENERAL' | 'PRIVATE' | 'URGENT'>('URGENT');

  const [newRpPersonnel, setNewRpPersonnel] = useState('p-06');
  const [newRpType, setNewRpType] = useState<'مكافأة' | 'جزاء'>('مكافأة');
  const [newRpReason, setNewRpReason] = useState('');
  const [newRpScore, setNewRpScore] = useState(5);

  const [selectedTawkaFilter, setSelectedTawkaFilter] = useState<string>('all');
  const [ruleErrorMsg, setRuleErrorMsg] = useState<string | null>(null);
  const [ruleSuccessMsg, setRuleSuccessMsg] = useState<string | null>(null);

  // Add audit log helper
  const addAuditLog = (actionType: 'إضافة' | 'تعديل' | 'اعتماد' | 'حذف', module: string, desc: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('ar-SA'),
      userId: currentRole === 'COMMANDER' ? 'OFF-1001' : 'OFF-1002',
      userName: currentRole === 'COMMANDER' ? 'عميد ركن/ سعود القحطاني' : 'مقدم ركن/ خالد العتيبي',
      userRole: currentRole,
      actionType,
      moduleAffected: module,
      description: desc,
      ipAddress: '10.20.1.15',
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  // Handlers
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderTitle || !newOrderContent) return;

    const newOrd: DailyOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `أمر قيادي رقم (${ordersList.length + 143} / 2026)`,
      date: new Date().toISOString().split('T')[0],
      title: newOrderTitle,
      content: newOrderContent,
      category: newOrderCategory,
      issuedByRank: 'عميد ركن',
      issuedByName: 'سعود بن عبد العزيز القحطاني',
      targetTawkas: ['الجميع'],
      importance: 'عاجل وهام',
      readConfirmationsCount: 1,
      totalPersonnelTargeted: 1240,
    };

    setOrdersList([newOrd, ...ordersList]);
    addAuditLog('إضافة', 'الأوامر اليومية', `إصدار أمر قيادي جديد: ${newOrderTitle}`);
    setNewOrderTitle('');
    setNewOrderContent('');
    setActiveModal(null);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    const newTask: TacticalTask = {
      id: `tsk-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDesc || newTaskTitle,
      assignedToTawka: newTaskTawka,
      assignedByRole: 'الآمر',
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      status: 'جاري التنفيذ',
      priority: 'عالي',
      completionPercentage: 10,
    };

    setTaskList([newTask, ...taskList]);
    addAuditLog('إضافة', 'المهام التكتيكية', `إسناد مهمة جديدة: ${newTaskTitle}`);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setActiveModal(null);
  };

  const handleCreateNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotifTitle || !newNotifContent) return;

    const newNotif = {
      id: `notif-${Date.now()}`,
      title: newNotifTitle,
      content: newNotifContent,
      type: newNotifType,
      date: 'الآن',
      read: false,
    };

    setNotificationsList([newNotif, ...notificationsList]);
    addAuditLog('إضافة', 'التنبيهات والبلاغات', `إرسال بلاغ عاجل: ${newNotifTitle}`);
    setNewNotifTitle('');
    setNewNotifContent('');
    setActiveModal(null);
  };

  const handleCreateRewardPenalty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRpReason) return;

    const targetPerson = personnelList.find((p) => p.id === newRpPersonnel);

    const newRp: RewardPenaltyRecord = {
      id: `rp-${Date.now()}`,
      personnelId: newRpPersonnel,
      personnelName: targetPerson?.name || 'منتسب عسكري',
      rank: targetPerson?.rank || 'رقيب',
      tawkaId: targetPerson?.tawkaId || 'tawka-1',
      type: newRpType,
      category: newRpType === 'مكافأة' ? 'كتاب شكر' : 'حجز انضباطي',
      reason: newRpReason,
      impactOnScore: newRpType === 'مكافأة' ? newRpScore : -newRpScore,
      issuedBy: 'العميد الركن/ سعود القحطاني',
      date: new Date().toISOString().split('T')[0],
    };

    setRpList([newRp, ...rpList]);

    // Update personnel score
    if (targetPerson) {
      setPersonnelList(
        personnelList.map((p) =>
          p.id === newRpPersonnel
            ? {
                ...p,
                evaluationScore: Math.min(
                  100,
                  Math.max(0, p.evaluationScore + (newRpType === 'مكافأة' ? newRpScore : -newRpScore))
                ),
              }
            : p
        )
      );
    }

    addAuditLog(
      'إضافة',
      'الثواب والعقاب',
      `تسجيل ${newRpType} لـ ${targetPerson?.rank} / ${targetPerson?.name}`
    );
    setNewRpReason('');
    setActiveModal(null);
  };

  const handleQuickCheckIn = (personnelId: string) => {
    setAttendanceList(
      attendanceList.map((a) =>
        a.personnelId === personnelId
          ? {
              ...a,
              status: 'حاضر',
              timeIn: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
            }
          : a
      )
    );
    addAuditLog('تعديل', 'الحضور والانصراف', `إثبات حضور البصمة للمنتسب ${personnelId}`);
  };

  const unreadNotifCount = notificationsList.filter((n) => !n.read).length;

  return (
    <div className={`min-h-screen flex flex-col transition-colors font-sans ${
      isDarkTheme ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* GLOBAL TOP COMMANDER HEADER */}
      <header className={`sticky top-0 z-40 border-b shadow-xl transition-all ${
        isDarkTheme ? 'bg-slate-900/95 border-slate-800 text-white backdrop-blur-md' : 'bg-white/95 border-slate-200 text-slate-900 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Commander & Unit Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-amber-400 transition-all"
              title="القائمة الجانبية"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="p-2.5 rounded-2xl bg-amber-600/20 border border-amber-500/40 text-amber-400 shadow-lg shadow-amber-950/40">
              <Shield className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-400">العميد الركن / سعود بن عبد العزيز القحطاني</span>
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-md text-[10px] font-bold">
                  عميد ركن (آمر الوحدة)
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-black text-white tracking-wide">
                منظومة إدارة وحدة المدرعات والدعم الآلي - جهاز الردع
              </h1>
            </div>
          </div>

          {/* Center: Live Weather Widget & Time/Date */}
          <div className="hidden lg:flex items-center gap-4 bg-slate-950/80 px-4 py-2 rounded-2xl border border-slate-800 text-xs font-mono">
            {/* Weather */}
            <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <div>
                <div className="text-amber-300 font-bold">32°م - صافٍ</div>
                <div className="text-[10px] text-slate-400">الرياح: 12 كم/س | الرطوبة: 24%</div>
              </div>
            </div>

            {/* Live Clock & Date */}
            <div className="text-right">
              <div className="text-emerald-400 font-bold tracking-wider">{timeString || '14:47:09'}</div>
              <div className="text-[10px] text-slate-400">{dateString || 'الثلاثاء، 17 صفر 1448 هـ'}</div>
            </div>
          </div>

          {/* Right Controls: Search, Notifications, Profile */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <div className="relative">
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  setShowSearchModal(true);
                }}
                placeholder="البحث الشامل..."
                className={`w-36 sm:w-48 text-xs pr-8 pl-3 py-1.5 rounded-xl border focus:outline-none focus:border-amber-500 font-mono transition-all ${
                  isDarkTheme ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-amber-400 relative transition-all"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 p-3 space-y-3 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-amber-400" />
                      التنبيهات البلاغات العسكرية ({notificationsList.length})
                    </span>
                    <button
                      onClick={() => {
                        setNotificationsList(notificationsList.map((n) => ({ ...n, read: true })));
                      }}
                      className="text-[10px] text-amber-400 hover:underline"
                    >
                      تحديد الكل كمقروء
                    </button>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex gap-1 text-[10px]">
                    {(['ALL', 'URGENT', 'GENERAL', 'PRIVATE'] as const).map((ft) => (
                      <button
                        key={ft}
                        onClick={() => setNotifFilter(ft)}
                        className={`px-2 py-1 rounded-lg font-bold ${
                          notifFilter === ft ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {ft === 'ALL' && 'الكل'}
                        {ft === 'URGENT' && 'عاجلة'}
                        {ft === 'GENERAL' && 'عامة'}
                        {ft === 'PRIVATE' && 'خاصة'}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-none">
                    {notificationsList
                      .filter((n) => notifFilter === 'ALL' || n.type === notifFilter)
                      .map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-xl border space-y-1 ${
                            n.type === 'URGENT'
                              ? 'bg-rose-950/30 border-rose-800/60'
                              : 'bg-slate-950 border-slate-800'
                          }`}
                        >
                          <div className="flex justify-between font-bold">
                            <span className={n.type === 'URGENT' ? 'text-rose-400' : 'text-amber-300'}>
                              {n.title}
                            </span>
                            <span className="text-[9px] text-slate-500 font-mono">{n.date}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-normal">{n.content}</p>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('notifications');
                      setShowNotifMenu(false);
                    }}
                    className="w-full py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 font-bold text-center rounded-xl border border-amber-500/30 text-[11px]"
                  >
                    عرض مركز التنبيهات المكتمل
                  </button>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                  س
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 p-3 space-y-3 text-xs">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-white">العميد الركن / سعود القحطاني</div>
                    <div className="text-[10px] text-amber-400 font-mono">MIL-1001-AU | TOP SECRET</div>
                    <div className="text-[10px] text-slate-400">آمر وحدة المدرعات والدعم الآلي</div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab('settings');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-right p-2 rounded-lg hover:bg-slate-800 text-slate-300 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4 text-amber-400" />
                      <span>إعدادات الحساب والأمان</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('audit');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-right p-2 rounded-lg hover:bg-slate-800 text-slate-300 flex items-center gap-2"
                    >
                      <History className="w-4 h-4 text-emerald-400" />
                      <span>سجل العمليات والتدقيق</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-800 pt-2">
                    <button className="w-full text-right p-2 rounded-lg hover:bg-rose-950/40 text-rose-300 flex items-center gap-2 font-bold">
                      <LogOut className="w-4 h-4" />
                      <span>تسجيل الخروج الأمني</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* MAIN LAYOUT: SIDEBAR + CONTENT AREA */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 flex gap-6">

        {/* COMPREHENSIVE SIDEBAR MENU (16 Full Menu Items) */}
        <aside className={`transition-all duration-300 shrink-0 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } hidden md:block`}>
          <div className={`sticky top-20 rounded-3xl border p-3 space-y-2 shadow-2xl transition-all ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-800">
              {isSidebarOpen && <span className="text-xs font-bold text-amber-400">القائمة القيادية المنظومية</span>}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-slate-400 hover:text-white"
              >
                <ChevronLeft className={`w-4 h-4 transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
              </button>
            </div>

            <nav className="space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-none text-xs font-bold">
              {[
                { id: 'dashboard', label: 'لوحة القيادة (Command Center)', icon: Shield },
                { id: 'personnel', label: 'القوة البشرية (Personnel)', icon: Users },
                { id: 'attendance', label: 'الحضور والغياب (Attendance)', icon: Clock },
                { id: 'leaves', label: 'الإجازات والجاهزية (Leaves)', icon: Calendar },
                { id: 'duty', label: 'الخدمة اليومية (Daily Service)', icon: ClipboardList },
                { id: 'guard', label: 'ضابط الخفر (Guard Officer)', icon: Lock },
                { id: 'tasks', label: 'المهام الميدانية (Tasks)', icon: CheckSquare },
                { id: 'orders', label: 'الأوامر اليومية (Daily Orders)', icon: FileText },
                { id: 'notifications', label: 'التنبيهات والبلاغات (Alerts)', icon: Bell },
                { id: 'rewards', label: 'المكافآت (Rewards)', icon: Award },
                { id: 'penalties', label: 'الجزاءات (Penalties)', icon: AlertTriangle },
                { id: 'evaluations', label: 'التقييمات (Evaluations)', icon: TrendingUp },
                { id: 'reports', label: 'التقارير المعتمدة (Reports)', icon: FileCheck },
                { id: 'archive', label: 'الأرشيف الإلكتروني (Archive)', icon: Archive },
                { id: 'audit', label: 'سجل التدقيق (Audit Trail)', icon: History },
                { id: 'settings', label: 'إعدادات النظام (Settings)', icon: Settings },
                { id: 'database', label: 'قاعدة البيانات (35 Table DDL)', icon: Database },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
                        : isDarkTheme
                        ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {isSidebarOpen && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT VIEWPORT */}
        <div className="flex-1 space-y-6 min-w-0">

          {/* ========================================================= */}
          {/* VIEW 1: COMMANDER DASHBOARD HOME */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">

              {/* TOP QUICK STATS CARDS (11 CORE METRICS) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 text-xs">
                {/* 1. Total Personnel */}
                <div className={`p-3.5 rounded-2xl border space-y-1 ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>إجمالي القوة</span>
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl font-black text-white font-mono">1,240</div>
                  <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>100% نسبة القوة</span>
                  </div>
                </div>

                {/* 2. Present Today */}
                <div className={`p-3.5 rounded-2xl border space-y-1 ${
                  isDarkTheme ? 'bg-slate-900 border-emerald-900/40' : 'bg-white border-emerald-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>الحاضرون اليوم</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xl font-black text-emerald-400 font-mono">1,098</div>
                  <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>88.5% (تجاوز BR-01)</span>
                  </div>
                </div>

                {/* 3. Absent Today */}
                <div className={`p-3.5 rounded-2xl border space-y-1 ${
                  isDarkTheme ? 'bg-slate-900 border-rose-900/40' : 'bg-white border-rose-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>الغياب والانقطاع</span>
                    <XCircle className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-xl font-black text-rose-400 font-mono">3 <span className="text-xs font-normal">أفراد</span></div>
                  <div className="text-[10px] text-rose-400 font-bold">0.2% تحت التحقيق</div>
                </div>

                {/* 4. Late Today */}
                <div className={`p-3.5 rounded-2xl border space-y-1 ${
                  isDarkTheme ? 'bg-slate-900 border-amber-900/40' : 'bg-white border-amber-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>المتأخرون اليوم</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl font-black text-amber-400 font-mono">12 <span className="text-xs font-normal">فرداً</span></div>
                  <div className="text-[10px] text-amber-400 font-bold">0.9% خصم انضباط</div>
                </div>

                {/* 5. On Leave */}
                <div className={`p-3.5 rounded-2xl border space-y-1 ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>في الإجازات</span>
                    <Calendar className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xl font-black text-cyan-400 font-mono">112</div>
                  <div className="text-[10px] text-slate-400 font-bold">9.0% دورية ميدانية</div>
                </div>

                {/* 6. Daily Service Members */}
                <div className={`p-3.5 rounded-2xl border space-y-1 ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>أفراد الخدمة اليومية</span>
                    <Shield className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="text-xl font-black text-teal-400 font-mono">48</div>
                  <div className="text-[10px] text-teal-400 font-bold">12 برج حراسة</div>
                </div>

                {/* 7. Guard Officer */}
                <div className={`p-3.5 rounded-2xl border space-y-1 ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>ضابط الخفر المناوب</span>
                    <Lock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-sm font-bold text-amber-300 truncate">الرائد / طارق العتيبي</div>
                  <div className="text-[10px] text-slate-400 font-mono">التوكة 2 (24 ساعة)</div>
                </div>

                {/* 8. Open Tasks */}
                <div className={`p-3.5 rounded-2xl border space-y-1 ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>المهام القائمة</span>
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xl font-black text-emerald-400 font-mono">14</div>
                  <div className="text-[10px] text-emerald-400 font-bold">85% متوسط الإنجاز</div>
                </div>

                {/* 9. Completed Tasks */}
                <div className={`p-3.5 rounded-2xl border space-y-1 ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>المهام المنجزة</span>
                    <FileCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xl font-black text-blue-400 font-mono">86</div>
                  <div className="text-[10px] text-blue-400 font-bold">98.2% نجاح التنفيذ</div>
                </div>

                {/* 10. Rewards This Month */}
                <div className={`p-3.5 rounded-2xl border space-y-1 ${
                  isDarkTheme ? 'bg-slate-900 border-emerald-900/40' : 'bg-white border-emerald-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>المكافآت هذا الشهر</span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl font-black text-amber-400 font-mono">18 <span className="text-xs font-normal">أنواط</span></div>
                  <div className="text-[10px] text-emerald-400 font-bold">+15% تميز انضباطي</div>
                </div>

                {/* 11. Penalties This Month */}
                <div className={`p-3.5 rounded-2xl border space-y-1 ${
                  isDarkTheme ? 'bg-slate-900 border-rose-900/40' : 'bg-white border-rose-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>الجزاءات هذا الشهر</span>
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-xl font-black text-rose-400 font-mono">4 <span className="text-xs font-normal">جزاءات</span></div>
                  <div className="text-[10px] text-emerald-400 font-bold">-20% انخفاض المخالفات</div>
                </div>
              </div>

              {/* QUICK ACTIONS PANEL (LARGE ACTION BUTTONS) */}
              <div className={`p-5 rounded-3xl border space-y-3 ${
                isDarkTheme ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    لوحة الإجراءات السريعة المباشرة للآمر (Commander Quick Actions)
                  </h3>
                  <span className="text-[10px] text-amber-400 font-mono">صلاحيات قيادية مطلقة</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 text-xs font-bold">
                  <button
                    onClick={() => setActiveModal('NEW_ATTENDANCE')}
                    className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-emerald-400 flex flex-col items-center justify-center gap-1.5 transition-all"
                  >
                    <Clock className="w-5 h-5" />
                    <span>اثبات بصمة</span>
                  </button>

                  <button
                    onClick={() => setActiveModal('NEW_TASK')}
                    className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-400 flex flex-col items-center justify-center gap-1.5 transition-all"
                  >
                    <CheckSquare className="w-5 h-5" />
                    <span>إسناد مهمة</span>
                  </button>

                  <button
                    onClick={() => setActiveModal('NEW_ORDER')}
                    className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-amber-400 flex flex-col items-center justify-center gap-1.5 transition-all"
                  >
                    <FileText className="w-5 h-5" />
                    <span>أمر يومي</span>
                  </button>

                  <button
                    onClick={() => setActiveModal('NEW_NOTIF')}
                    className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-rose-400 flex flex-col items-center justify-center gap-1.5 transition-all"
                  >
                    <Bell className="w-5 h-5" />
                    <span>بلاغ عاجل</span>
                  </button>

                  <button
                    onClick={() => {
                      setNewRpType('مكافأة');
                      setActiveModal('NEW_REWARD_PENALTY');
                    }}
                    className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-amber-300 flex flex-col items-center justify-center gap-1.5 transition-all"
                  >
                    <Award className="w-5 h-5" />
                    <span>منح مكافأة</span>
                  </button>

                  <button
                    onClick={() => {
                      setNewRpType('جزاء');
                      setActiveModal('NEW_REWARD_PENALTY');
                    }}
                    className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-rose-300 flex flex-col items-center justify-center gap-1.5 transition-all"
                  >
                    <AlertTriangle className="w-5 h-5" />
                    <span>تسجيل جزاء</span>
                  </button>

                  <button
                    onClick={() => onOpenPrintModal('تقرير الموقف العملياتي للقيادة', 'بيان شاملوكامل لجميع التوكات أربعة والجاهزية القتالية')}
                    className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-blue-400 flex flex-col items-center justify-center gap-1.5 transition-all"
                  >
                    <Printer className="w-5 h-5" />
                    <span>طباعة التقرير</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('archive')}
                    className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-purple-400 flex flex-col items-center justify-center gap-1.5 transition-all"
                  >
                    <Archive className="w-5 h-5" />
                    <span>الأرشيف</span>
                  </button>
                </div>
              </div>

              {/* COMMAND CENTER: DAILY OPERATIONAL STATUS (الموقف العملياتي اليومي) */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-400" />
                    الموقف العملياتي اليومي والجاهزية القتالية للتوكات (Daily Operational Status)
                  </h3>
                  <span className="text-xs text-emerald-400 font-bold font-mono">
                    BR-01 Condition: Active (75% Min)
                  </span>
                </div>

                {/* Tawka Cards Grid (4 Core Tawkas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  {TAWKAS_SPECIFICATION.map((tawka) => {
                    const presentCount = Math.round(tawka.personnelCount * (tawka.readinessPercentage / 100));
                    const absentCount = tawka.id === 'tawka-1' ? 2 : tawka.id === 'tawka-2' ? 1 : 0;
                    const onDutyCount = tawka.id === 'tawka-1' ? 23 : tawka.id === 'tawka-2' ? 34 : tawka.id === 'tawka-3' ? 70 : 12;
                    const activeTasks = tawka.id === 'tawka-1' ? 4 : tawka.id === 'tawka-2' ? 3 : tawka.id === 'tawka-3' ? 5 : 2;

                    return (
                      <div
                        key={tawka.id}
                        className={`p-5 rounded-3xl border space-y-3 relative overflow-hidden transition-all ${
                          isDarkTheme ? 'bg-slate-900 border-slate-800 hover:border-amber-500/50' : 'bg-white border-slate-200 shadow-md'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold text-[10px]">
                            {tawka.codeName}
                          </span>
                          <span className={`text-sm font-black font-mono ${
                            tawka.readinessPercentage >= 85 ? 'text-emerald-400' : 'text-amber-400'
                          }`}>
                            {tawka.readinessPercentage}%
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-white mb-0.5">{tawka.name}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{tawka.specialization}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              tawka.readinessPercentage >= 85 ? 'bg-gradient-to-r from-amber-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-amber-400'
                            }`}
                            style={{ width: `${tawka.readinessPercentage}%` }}
                          ></div>
                        </div>

                        {/* Tawka Breakdown Metrics */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-slate-800/80">
                          <div className="p-1.5 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block">إجمالي القوة:</span>
                            <span className="font-bold text-white font-mono text-xs">{tawka.personnelCount}</span>
                          </div>
                          <div className="p-1.5 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block">الحاضرون:</span>
                            <span className="font-bold text-emerald-400 font-mono text-xs">{presentCount}</span>
                          </div>
                          <div className="p-1.5 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block">في الخدمة:</span>
                            <span className="font-bold text-cyan-400 font-mono text-xs">{onDutyCount}</span>
                          </div>
                          <div className="p-1.5 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block">المهام القائمة:</span>
                            <span className="font-bold text-amber-400 font-mono text-xs">{activeTasks}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DAILY ORDERS & TASKS DUAL GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
                
                {/* DAILY ORDERS (أحدث الأوامر اليومية والإجراءات) */}
                <div className={`p-5 rounded-3xl border space-y-4 ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      أحدث الأوامر اليومية والنشرات النافذة
                    </h3>
                    <button
                      onClick={() => setActiveModal('NEW_ORDER')}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> إصدار أمر
                    </button>
                  </div>

                  {ordersList[0] && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-amber-300 font-mono">{ordersList[0].orderNumber}</span>
                        <span className="px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 rounded-md text-[10px] font-bold">
                          {ordersList[0].importance}
                        </span>
                      </div>

                      <h4 className="font-bold text-white text-sm">{ordersList[0].title}</h4>
                      <p className="text-slate-300 leading-relaxed text-xs">{ordersList[0].content}</p>

                      <div className="text-[10px] text-slate-400 flex justify-between border-t border-slate-800 pt-2 font-mono">
                        <span>الجهة: {ordersList[0].issuedByRank} / {ordersList[0].issuedByName}</span>
                        <span className="text-emerald-400 font-bold">
                          إقرارات القراءة: {ordersList[0].readConfirmationsCount} / {ordersList[0].totalPersonnelTargeted}
                        </span>
                      </div>

                      {/* Orders Action Bar */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800 text-[10px] font-bold">
                        <button
                          onClick={() => setActiveModal('NEW_ORDER')}
                          className="px-2.5 py-1 bg-amber-600/20 text-amber-300 rounded-lg border border-amber-500/30 hover:bg-amber-600/30"
                        >
                          إنشاء أمر جديد
                        </button>
                        <button
                          onClick={() => onOpenPrintModal(ordersList[0].orderNumber, ordersList[0].content)}
                          className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700"
                        >
                          طباعة الأمر
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrderForReaders(ordersList[0]);
                            setActiveModal('VIEW_READERS');
                          }}
                          className="px-2.5 py-1 bg-cyan-950 text-cyan-300 rounded-lg border border-cyan-800 hover:bg-cyan-900"
                        >
                          عرض سجل القرّاء
                        </button>
                        <button
                          onClick={() => alert('تم نشر الأمر لجميع منتسبي الوحدة بنجاح')}
                          className="px-2.5 py-1 bg-emerald-950 text-emerald-300 rounded-lg border border-emerald-800 hover:bg-emerald-900"
                        >
                          نشر فوري
                        </button>
                        <button
                          onClick={() => alert('تم نقل الأمر اليومي لأرشيف القيادة المشفر')}
                          className="px-2.5 py-1 bg-purple-950 text-purple-300 rounded-lg border border-purple-800 hover:bg-purple-900"
                        >
                          أرشفة
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* TACTICAL TASKS BREAKDOWN */}
                <div className={`p-5 rounded-3xl border space-y-4 ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                      موقف المهام التكتيكية الميدانية
                    </h3>
                    <button
                      onClick={() => setActiveModal('NEW_TASK')}
                      className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> إسناد مهمة
                    </button>
                  </div>

                  {/* Task Status Summary Badges */}
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block">معلقة</span>
                      <span className="text-amber-400 font-mono text-sm">2</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block">قيد التنفيذ</span>
                      <span className="text-cyan-400 font-mono text-sm">8</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block">منجزة</span>
                      <span className="text-emerald-400 font-mono text-sm">86</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block">متأخرة</span>
                      <span className="text-rose-400 font-mono text-sm">1</span>
                    </div>
                  </div>

                  {/* Task List Items */}
                  <div className="space-y-2.5 max-h-52 overflow-y-auto scrollbar-none">
                    {taskList.map((tsk) => (
                      <div key={tsk.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="flex justify-between font-bold">
                          <span className="text-white">{tsk.title}</span>
                          <span className="text-emerald-400 font-mono">{tsk.completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-1.5 rounded-full transition-all"
                            style={{ width: `${tsk.completionPercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>الموعد: {tsk.dueDate}</span>
                          <span>الحالة: {tsk.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* CHARTS & ANALYTICS SECTION */}
              <div className={`p-6 rounded-3xl border space-y-6 ${
                isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-amber-400" />
                    المخططات البيانية والإحصائيات الشهريـة (Analytics Dashboard)
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">تحديث لحظي تلقائي</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
                  {/* Attendance Weekly Chart */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="font-bold text-amber-400 text-center">مؤشر الحضور الأسبوعي</h4>
                    <div className="h-28 flex items-end justify-between gap-1 px-2 pt-4">
                      {[
                        { day: 'سبت', val: 92 },
                        { day: 'أحد', val: 88 },
                        { day: 'إثنين', val: 95 },
                        { day: 'ثلاثاء', val: 90 },
                        { day: 'أربعاء', val: 86 },
                        { day: 'خميس', val: 94 },
                        { day: 'جمعة', val: 89 },
                      ].map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                          <div
                            className="w-full bg-gradient-to-t from-amber-600 to-emerald-500 rounded-t-sm"
                            style={{ height: `${item.val}%` }}
                          ></div>
                          <span className="text-[9px] text-slate-400 font-mono">{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Task Completion per Tawka */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="font-bold text-cyan-400 text-center">إنجاز المهام حسب التوكة</h4>
                    <div className="space-y-2 font-mono pt-2">
                      <div>
                        <div className="flex justify-between text-[10px] mb-0.5">
                          <span>التوكة 1</span>
                          <span className="text-emerald-400">92%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] mb-0.5">
                          <span>التوكة 2</span>
                          <span className="text-emerald-400">88%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] mb-0.5">
                          <span>التوكة 3</span>
                          <span className="text-amber-400">78%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Score Distribution */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="font-bold text-emerald-400 text-center">توزيع درجات التقييم</h4>
                    <div className="space-y-1.5 text-[11px] pt-1">
                      <div className="flex justify-between p-1.5 rounded bg-slate-900">
                        <span>ممتاز (90 - 100):</span>
                        <span className="font-bold text-emerald-400 font-mono">820 فرداً</span>
                      </div>
                      <div className="flex justify-between p-1.5 rounded bg-slate-900">
                        <span>جيد جداً (80 - 89):</span>
                        <span className="font-bold text-amber-300 font-mono">310 أفراد</span>
                      </div>
                      <div className="flex justify-between p-1.5 rounded bg-slate-900">
                        <span>مرضي (70 - 79):</span>
                        <span className="font-bold text-slate-300 font-mono">102 فرداً</span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Stats Summary */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="font-bold text-teal-400 text-center">موقف الشهر الحالي</h4>
                    <div className="space-y-2 text-[11px] font-mono">
                      <div className="flex justify-between">
                        <span>إجمالي البصمات:</span>
                        <span className="text-emerald-400 font-bold">32,940</span>
                      </div>
                      <div className="flex justify-between">
                        <span>طلبات الإجازة:</span>
                        <span className="text-amber-300 font-bold">142 طلباً</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ساعات الخفر:</span>
                        <span className="text-cyan-400 font-bold">8,640 ساعة</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* REPORTS QUICK ACTION BUTTONS */}
              <div className={`p-5 rounded-3xl border space-y-4 ${
                isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    استخراج التقارير القيادية الفورية (Executive Reports Center)
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert('تم تصدير التقرير المجمع بفرص بصيغة PDF المشفرة')}
                      className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <FileDown className="w-3.5 h-3.5" /> Export PDF
                    </button>
                    <button
                      onClick={() => alert('تم تصدير البيان بصيغة Excel')}
                      className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" /> Export Excel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-bold">
                  {[
                    { title: 'تقرير الحضور والغياب', sub: 'Attendance Report' },
                    { title: 'تقرير الخدمة اليومية', sub: 'Daily Service Report' },
                    { title: 'تقرير المهام الميدانية', sub: 'Task Report' },
                    { title: 'تقرير الثواب والمكافآت', sub: 'Rewards Report' },
                    { title: 'تقرير الجزاءات والخصم', sub: 'Penalty Report' },
                    { title: 'تقرير الجاهزية والتقييم', sub: 'Performance Report' },
                  ].map((rep, idx) => (
                    <button
                      key={idx}
                      onClick={() => onOpenPrintModal(rep.title, `بيان ومستخرج كامل لـ ${rep.title}`)}
                      className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-center space-y-1 transition-all"
                    >
                      <Printer className="w-4 h-4 mx-auto text-amber-400" />
                      <div className="text-xs">{rep.title}</div>
                      <div className="text-[9px] text-slate-500 font-mono">{rep.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* RECENT ACTIVITIES TIMELINE (AUDIT LOG STREAM) */}
              <div className={`p-5 rounded-3xl border space-y-4 ${
                isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <History className="w-4 h-4 text-amber-400" />
                    سجل الحركات والتدقيق المباشر (Recent Operational Audit Feed)
                  </h3>
                  <button
                    onClick={() => setActiveTab('audit')}
                    className="text-xs text-amber-400 font-bold hover:underline"
                  >
                    عرض السجل الكامل
                  </button>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  {auditLogs.slice(0, 4).map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span className="font-bold text-white">{log.userName}</span>
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 rounded text-[10px]">
                          {log.actionType}
                        </span>
                        <span className="text-slate-300 font-sans">{log.description}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-3 shrink-0">
                        <span>{log.timestamp}</span>
                        <span>IP: {log.ipAddress}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 2: PERSONNEL MANAGEMENT */}
          {/* ========================================================= */}
          {activeTab === 'personnel' && (
            <div className={`p-5 rounded-3xl border space-y-4 ${
              isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">سجل القوة البشرية والمنتسبين العسكريين</h3>
                <button
                  onClick={() => alert('إضافة منتسب جديد إلى قاعدة البيانات')}
                  className="px-3.5 py-1.5 bg-amber-600 text-white font-bold text-xs rounded-xl flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> إضافة منتسب
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead className="bg-slate-800/60 text-slate-300 border-b border-slate-700">
                    <tr>
                      <th className="p-3">الرقم العسكري</th>
                      <th className="p-3">الرتبة والاسم</th>
                      <th className="p-3">التوكة</th>
                      <th className="p-3">التخصص</th>
                      <th className="p-3">درجة التقييم</th>
                      <th className="p-3">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {personnelList.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/30">
                        <td className="p-3 font-mono text-amber-400">{p.militaryId}</td>
                        <td className="p-3 font-bold text-white">{p.rank} / {p.name}</td>
                        <td className="p-3 text-amber-300">
                          {TAWKAS_SPECIFICATION.find((t) => t.id === p.tawkaId)?.name}
                        </td>
                        <td className="p-3">{p.specialization}</td>
                        <td className="p-3 font-mono font-bold text-emerald-400">{p.evaluationScore} / 100</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 3: ATTENDANCE */}
          {/* ========================================================= */}
          {activeTab === 'attendance' && (
            <div className={`p-5 rounded-3xl border space-y-4 ${
              isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-base font-bold text-white">سجل الحضور والغياب المباشر</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead className="bg-slate-800/60 text-slate-300 border-b border-slate-700">
                    <tr>
                      <th className="p-3">الاسم والرتبة</th>
                      <th className="p-3">التوكة</th>
                      <th className="p-3">وقت البصمة</th>
                      <th className="p-3">الحالة</th>
                      <th className="p-3 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {attendanceList.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-800/30">
                        <td className="p-3 font-bold text-white">{att.rank} / {att.personnelName}</td>
                        <td className="p-3 text-amber-300 font-mono">
                          {TAWKAS_SPECIFICATION.find((t) => t.id === att.tawkaId)?.name}
                        </td>
                        <td className="p-3 font-mono">{att.timeIn}</td>
                        <td className="p-3 font-bold text-emerald-400">{att.status}</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleQuickCheckIn(att.personnelId)}
                            className="bg-emerald-600/30 text-emerald-200 px-2 py-1 rounded text-[10px] font-bold border border-emerald-500/40"
                          >
                            تأكيد بصمة
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 4: LEAVES & READINESS */}
          {/* ========================================================= */}
          {activeTab === 'leaves' && (
            <div className={`p-5 rounded-3xl border space-y-4 ${
              isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-base font-bold text-white">إدارة الإجازات مع اختبار الجاهزية BR-01</h3>
              <div className="space-y-3">
                {leavesList.map((lev) => (
                  <div key={lev.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between font-bold">
                      <span className="text-amber-300">{lev.rank} / {lev.personnelName}</span>
                      <span className="text-emerald-400">{lev.status}</span>
                    </div>
                    <p className="text-slate-300">{lev.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OTHER TABS FALLBACK (DAILY SERVICE, ORDERS, NOTIFICATIONS, REWARDS, REPORTS, ARCHIVE, AUDIT, SETTINGS, DATABASE) */}
          {['duty', 'guard', 'tasks', 'orders', 'notifications', 'rewards', 'penalties', 'evaluations', 'reports', 'archive', 'audit', 'settings'].includes(activeTab) && (
            <div className={`p-6 rounded-3xl border space-y-4 ${
              isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white capitalize">
                  وحدة العمليات: {activeTab}
                </h3>
                <span className="text-xs text-amber-400 font-mono">المنظومة القيادية المعتمدة</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                جميع بيانات هذه الوحدة متكاملة بشكل كلي مع قاعدة البيانات المركزية ذات الـ 35 جدولاً، مع مراعاة الصلاحيات القيادية وسجل التدقيق الرقمي المشفر (AES-256).
              </p>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                [SYSTEM READY] - Module {activeTab.toUpperCase()} active with full state integration.
              </div>
            </div>
          )}

          {/* VIEW DATABASE DDL & SCHEMA */}
          {activeTab === 'database' && (
            <DatabaseSchemaSection isDarkTheme={isDarkTheme} />
          )}

        </div>

      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE MODALS FOR COMMANDER ACTIONS */}
      {/* ========================================================= */}

      {/* 1. CREATE DAILY ORDER MODAL */}
      {activeModal === 'NEW_ORDER' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-amber-800/60 p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                إصدار أمر يومي قيادي جديد (Commander Order)
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان الأمر القيادي:</label>
                <input
                  type="text"
                  value={newOrderTitle}
                  onChange={(e) => setNewOrderTitle(e.target.value)}
                  placeholder="مثال: رفع جاهزية التوكة 1 والمتابعة الميدانية..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">تصنيف الأمر:</label>
                <select
                  value={newOrderCategory}
                  onChange={(e) => setNewOrderCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-amber-300 focus:outline-none"
                >
                  <option value="رفع جاهزية">رفع جاهزية قتالية</option>
                  <option value="تأمين وحراسة">تأمين وحراسة الأبراج</option>
                  <option value="تعليمات انضباطية">تعليمات وتوجيهات انضباطية</option>
                  <option value="صيانة ودعم">صيانة آليات ودعم لوجستي</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">نص التوجيهات القيادية:</label>
                <textarea
                  rows={4}
                  value={newOrderContent}
                  onChange={(e) => setNewOrderContent(e.target.value)}
                  placeholder="نص التوجيهات المعتمدة..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  اعتماد ونشر الأمر
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. CREATE TACTICAL TASK MODAL */}
      {activeModal === 'NEW_TASK' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-800/60 p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-cyan-400" />
                إسناد مهمة تكتيكية ميدانية جديدة
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان المهمة:</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="مثال: فحص جرد الذخيرة بأبراج الحراسة..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">التوكة المكلفة:</label>
                <select
                  value={newTaskTawka}
                  onChange={(e) => setNewTaskTawka(e.target.value as TawkaId)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-cyan-300 focus:outline-none"
                >
                  {TAWKAS_SPECIFICATION.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  إسناد المهمة
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. CREATE URGENT NOTIFICATION MODAL */}
      {activeModal === 'NEW_NOTIF' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-rose-800/60 p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-rose-400" />
                إرسال بلاغ قيادي عاجل لجميع المنتسبين
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotification} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان البلاغ:</label>
                <input
                  type="text"
                  value={newNotifTitle}
                  onChange={(e) => setNewNotifTitle(e.target.value)}
                  placeholder="عنوان البلاغ العاجل..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">نوع البلاغ:</label>
                <select
                  value={newNotifType}
                  onChange={(e) => setNewNotifType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-rose-300 focus:outline-none"
                >
                  <option value="URGENT">بلاغ عاجل وهام</option>
                  <option value="GENERAL">تنبيه عام</option>
                  <option value="PRIVATE">إشعار خاص</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">نص البلاغ:</label>
                <textarea
                  rows={3}
                  value={newNotifContent}
                  onChange={(e) => setNewNotifContent(e.target.value)}
                  placeholder="تفاصيل البلاغ العاجل..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  إرسال فوري للبلاغ
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. REWARD OR PENALTY MODAL */}
      {activeModal === 'NEW_REWARD_PENALTY' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-amber-800/60 p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                تسجيل إجراء ثواب / عقاب قيادي ({newRpType})
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRewardPenalty} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">اختيار المنتسب العسكري:</label>
                <select
                  value={newRpPersonnel}
                  onChange={(e) => setNewRpPersonnel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                >
                  {personnelList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.rank} / {p.name} ({p.militaryId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">السبب والمبرر العسكري:</label>
                <textarea
                  rows={3}
                  value={newRpReason}
                  onChange={(e) => setNewRpReason(e.target.value)}
                  placeholder="سبب منح المكافأة أو تطبيق الجزاء..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">تأثير النقاط على التقييم التراكمي:</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={newRpScore}
                  onChange={(e) => setNewRpScore(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-amber-300 font-mono focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className={`flex-1 py-2.5 font-bold text-white rounded-xl shadow-lg transition-all ${
                    newRpType === 'مكافأة' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-rose-600 hover:bg-rose-500'
                  }`}
                >
                  حفظ وتسجيل في الملف
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. VIEW ORDER READERS MODAL */}
      {activeModal === 'VIEW_READERS' && selectedOrderForReaders && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-sm">سجل إقرارات القراءة والمستلمين للأمر</h3>
                <span className="text-[10px] text-amber-400 font-mono">{selectedOrderForReaders.orderNumber}</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-none font-mono">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-white">عميد ركن / سعود القحطاني</span>
                <span className="text-emerald-400 font-bold">تم الإقرار (المصدر)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-white">مقدم ركن / خالد العتيبي</span>
                <span className="text-emerald-400 font-bold">تم الإقرار (08:12 AM)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-white">رئيس رقباء / عبد الله الشهري</span>
                <span className="text-emerald-400 font-bold">تم الإقرار (08:30 AM)</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* GLOBAL SEARCH RESULTS MODAL */}
      {showSearchModal && globalSearch && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-4 pt-20">
          <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-amber-800/60 p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" />
                نتائج البحث الشامل القيادي عن: "{globalSearch}"
              </h3>
              <button
                onClick={() => {
                  setShowSearchModal(false);
                  setGlobalSearch('');
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-none">
              <div className="font-bold text-amber-400">المنتسبون العسكريون:</div>
              {personnelList
                .filter((p) => p.name.includes(globalSearch) || p.militaryId.includes(globalSearch))
                .map((p) => (
                  <div key={p.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                    <span className="text-white font-bold">{p.rank} / {p.name}</span>
                    <span className="text-amber-400 font-mono">{p.militaryId}</span>
                  </div>
                ))}

              <div className="font-bold text-amber-400 pt-2">الأوامر اليومية:</div>
              {ordersList
                .filter((o) => o.title.includes(globalSearch) || o.content.includes(globalSearch))
                .map((o) => (
                  <div key={o.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-white font-bold">{o.title}</div>
                    <div className="text-[10px] text-slate-400">{o.orderNumber}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
