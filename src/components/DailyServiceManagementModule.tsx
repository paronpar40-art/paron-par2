import React, { useState } from 'react';
import {
  Shield,
  Clock,
  UserCheck,
  Calendar,
  Search,
  Filter,
  Printer,
  FileSpreadsheet,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Users,
  Building,
  UserPlus,
  RefreshCw,
  Plus,
  Edit,
  Eye,
  Lock,
  Database,
  Code2,
  Bell,
  Check,
  X,
  Send,
  FileCheck,
  Download,
  Share2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
  MapPin,
  Sparkles,
  Info,
  SlidersHorizontal,
  FileSignature,
  FileUp,
  Activity,
  History,
} from 'lucide-react';
import { UserRole } from '../types/srs';

export type ServiceStatus = 'SCHEDULED' | 'STARTED' | 'ON_DUTY' | 'COMPLETED' | 'CANCELLED';

export interface GuardOfficer {
  id: string;
  militaryId: string;
  fullName: string;
  rank: string;
  phone: string;
  assignedDate: string;
  shiftType: '24_HOURS' | '12_HOURS_DAY' | '12_HOURS_NIGHT';
  status: 'ACTIVE' | 'REPLACED' | 'COMPLETED';
  notes?: string;
}

export interface ServiceMember {
  id: string;
  militaryId: string;
  fullName: string;
  rank: string;
  tawkaId: string;
  tawkaName: string;
  dutyPosition: string; // e.g. خفر برج 1, حراسة البوابة الشمالية, تفتيش دوري
  checkInStatus: 'CONFIRMED' | 'LATE' | 'ABSENT' | 'PENDING';
  checkInTime?: string;
  notes?: string;
}

export interface DailyServiceShift {
  id: string;
  serviceCode: string;
  date: string;
  guardOfficer: GuardOfficer;
  membersCount: number;
  tawkatIncluded: string[];
  status: ServiceStatus;
  scheduledStart: string;
  scheduledEnd: string;
  actualStart?: string;
  actualEnd?: string;
  locationName: string;
  members: ServiceMember[];
  notes?: string;
}

export interface ShiftHandover {
  id: string;
  serviceId: string;
  outgoingOfficer: string;
  incomingOfficer: string;
  handoverTime: string;
  weaponsAndAmmoStatus: string;
  equipmentStatus: string;
  incidentsReported: string;
  hasAttachments: boolean;
  digitalSignatureHash: string;
  status: 'VERIFIED' | 'PENDING';
}

export interface DailyServiceReport {
  id: string;
  serviceId: string;
  date: string;
  guardOfficerName: string;
  summary: string;
  incidentsCount: number;
  actionsTaken: string;
  recommendations: string;
  attachmentsCount: number;
}

interface DailyServiceManagementModuleProps {
  currentRole: UserRole;
  onOpenPrintModal?: (title: string, content: string) => void;
  isDarkTheme?: boolean;
}

export const DailyServiceManagementModule: React.FC<DailyServiceManagementModuleProps> = ({
  currentRole: initialRole,
  onOpenPrintModal,
  isDarkTheme = true,
}) => {
  // Role switcher state
  const [role, setRole] = useState<UserRole>(initialRole);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'SCHEDULE' | 'GUARD_OFFICER' | 'HANDOVER' | 'REPORTS' | 'STATISTICS' | 'DATABASE_API'
  >('SCHEDULE');

  // Daily Services State
  const [services, setServices] = useState<DailyServiceShift[]>([
    {
      id: 'srv-101',
      serviceCode: 'DS-2026-0804-A',
      date: '2026-08-04',
      guardOfficer: {
        id: 'go-1',
        militaryId: 'OFF-1024',
        fullName: 'الرائد / طارق العتيبي',
        rank: 'رائد',
        phone: '0501234567',
        assignedDate: '2026-08-04',
        shiftType: '24_HOURS',
        status: 'ACTIVE',
        notes: 'ضابط خفر المقر الرئيسي وخط الدفاع الأول',
      },
      membersCount: 12,
      tawkatIncluded: ['التوكة 1 - مدرعات الفهد', 'التوكة 3 - الدعم الإمدادي'],
      status: 'ON_DUTY',
      scheduledStart: '06:00 ص',
      scheduledEnd: '06:00 ص (اليوم التالي)',
      actualStart: '05:50 ص',
      locationName: 'مقر القيادة العامة - المشتل الشمالي وبرج الحراسة 1 و 2',
      members: [
        {
          id: 'sm-1',
          militaryId: 'MIL-88421',
          fullName: 'رئيس رقباء / عبدالله القحطاني',
          rank: 'رئيس رقباء',
          tawkaId: 'tawka-1',
          tawkaName: 'التوكة 1 - مدرعات الفهد',
          dutyPosition: 'خفر مشتل البوابة الشمالية',
          checkInStatus: 'CONFIRMED',
          checkInTime: '05:55 ص',
        },
        {
          id: 'sm-2',
          militaryId: 'MIL-88422',
          fullName: 'رقيب أول / فهد الشمري',
          rank: 'رقيب أول',
          tawkaId: 'tawka-1',
          tawkaName: 'التوكة 1 - مدرعات الفهد',
          dutyPosition: 'دورية تفقدية لخط المدرعات',
          checkInStatus: 'CONFIRMED',
          checkInTime: '06:05 ص',
        },
        {
          id: 'sm-3',
          militaryId: 'MIL-88423',
          fullName: 'رقيب / محمد العنزي',
          rank: 'رقيب',
          tawkaId: 'tawka-1',
          tawkaName: 'التوكة 1 - مدرعات الفهد',
          dutyPosition: 'خفر برج الحراسة الشمالي 3',
          checkInStatus: 'CONFIRMED',
          checkInTime: '05:50 ص',
        },
        {
          id: 'sm-4',
          militaryId: 'MIL-88426',
          fullName: 'جندي / بدر الهاجري',
          rank: 'جندي',
          tawkaId: 'tawka-3',
          tawkaName: 'التوكة 3 - الدعم الإمدادي',
          dutyPosition: 'خفر مستودع الذخيرة الآلية',
          checkInStatus: 'ABSENT',
        },
      ],
      notes: 'تم استلام كافة العهد والأسلحة والذخيرة بانتظام',
    },
    {
      id: 'srv-102',
      serviceCode: 'DS-2026-0805-B',
      date: '2026-08-05',
      guardOfficer: {
        id: 'go-2',
        militaryId: 'OFF-1029',
        fullName: 'المقدم الركن / خالد الدوسري',
        rank: 'مقدم ركن',
        phone: '0507654321',
        assignedDate: '2026-08-05',
        shiftType: '24_HOURS',
        status: 'ACTIVE',
        notes: 'مناوب خفر يوم غد جدول معتمد',
      },
      membersCount: 15,
      tawkatIncluded: ['التوكة 2 - طاقم الصيانة الآلية'],
      status: 'SCHEDULED',
      scheduledStart: '06:00 ص',
      scheduledEnd: '06:00 ص (اليوم التالي)',
      locationName: 'ورش الصيانة المركزية ومدرج الآليات',
      members: [],
      notes: 'جدول الخدمة اليومية المجدول لليوم التالي',
    },
  ]);

  // Guard Officer History
  const [officerHistory] = useState<GuardOfficer[]>([
    {
      id: 'go-old-1',
      militaryId: 'OFF-1024',
      fullName: 'الرائد / طارق العتيبي',
      rank: 'رائد',
      phone: '0501234567',
      assignedDate: '2026-08-04',
      shiftType: '24_HOURS',
      status: 'ACTIVE',
    },
    {
      id: 'go-old-2',
      militaryId: 'OFF-1011',
      fullName: 'النقيب / فهد المطيري',
      rank: 'نقيب',
      phone: '0559988776',
      assignedDate: '2026-08-03',
      shiftType: '24_HOURS',
      status: 'COMPLETED',
      notes: 'إنهاء الخدمة اليومية بنجاح وتسليم الخفر دون حوادث',
    },
  ]);

  // Shift Handovers State
  const [handovers, setHandovers] = useState<ShiftHandover[]>([
    {
      id: 'ho-301',
      serviceId: 'srv-101',
      outgoingOfficer: 'النقيب / فهد المطيري',
      incomingOfficer: 'الرائد / طارق العتيبي',
      handoverTime: '2026-08-04 05:50 ص',
      weaponsAndAmmoStatus: 'سليمة بالكامل (عدد 40 بندقية + 2000 طلقة ذخيرة سريعة)',
      equipmentStatus: 'عدد 12 أجهزة لاسلكي سريعة + 4 مناظير ليلية حرارية',
      incidentsReported: 'لا توجد أي خروقات أو بلاغات خلال فترة المناوبة الماضية',
      hasAttachments: true,
      digitalSignatureHash: '0x8F9A3B2C...SECURE_RSA_2048',
      status: 'VERIFIED',
    },
  ]);

  // Service Reports State
  const [reports] = useState<DailyServiceReport[]>([
    {
      id: 'rep-401',
      serviceId: 'srv-101',
      date: '2026-08-04',
      guardOfficerName: 'الرائد / طارق العتيبي',
      summary: 'تمت جولات التفقد الميداني للبوابات والأبراج في تمام الساعة 08:00 ص و 12:00 م. الجاهزية كاملة.',
      incidentsCount: 1,
      actionsTaken: 'تنبيه جندي غائب وتدوين المحضر الميداني وتوجيه خفر بديل من التوكة 1',
      recommendations: 'صيانة كشاف برج الحراسة رقم 2 الشاشة الجانبية',
      attachmentsCount: 2,
    },
  ]);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState<'TODAY' | 'YESTERDAY' | 'WEEK' | 'MONTH' | 'ALL'>('TODAY');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterTawka, setFilterTawka] = useState<string>('ALL');

  // Modals state
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newOfficerName, setNewOfficerName] = useState('الرائد / طارق العتيبي');
  const [newOfficerPhone, setNewOfficerPhone] = useState('0501234567');
  const [newShiftDate, setNewShiftDate] = useState('2026-08-05');
  const [newShiftType, setNewShiftType] = useState<'24_HOURS' | '12_HOURS_DAY' | '12_HOURS_NIGHT'>('24_HOURS');

  // New Handover Modal
  const [isHandoverModalOpen, setIsHandoverModalOpen] = useState(false);
  const [handoverWeapons, setHandoverWeapons] = useState('سليمة بالكامل وتمت المطابقة مع الجدول');
  const [handoverEquipment, setHandoverEquipment] = useState('الأجهزة اللاسلكية والسيارات الميدانية بجاهزية 100%');
  const [handoverIncidents, setHandoverIncidents] = useState('لا يوجد ملاحظات طارئة');

  // Stats calculation
  const totalServices = services.length;
  const onDutyCount = services.filter((s) => s.status === 'ON_DUTY').length;
  const completedCount = services.filter((s) => s.status === 'COMPLETED').length;
  const scheduledCount = services.filter((s) => s.status === 'SCHEDULED').length;

  // Filtered Services list
  const filteredServices = services.filter((srv) => {
    const matchesSearch =
      srv.serviceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.guardOfficer.fullName.includes(searchQuery) ||
      srv.locationName.includes(searchQuery);

    const matchesStatus = filterStatus === 'ALL' || srv.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handle Assign Officer Submit
  const handleAssignOfficerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: DailyServiceShift = {
      id: `srv-${Date.now()}`,
      serviceCode: `DS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: newShiftDate,
      guardOfficer: {
        id: `go-${Date.now()}`,
        militaryId: 'OFF-2090',
        fullName: newOfficerName,
        rank: 'رائد',
        phone: newOfficerPhone,
        assignedDate: newShiftDate,
        shiftType: newShiftType,
        status: 'ACTIVE',
      },
      membersCount: 10,
      tawkatIncluded: ['التوكة 1 - مدرعات الفهد'],
      status: 'SCHEDULED',
      scheduledStart: '06:00 ص',
      scheduledEnd: '06:00 ص (اليوم التالي)',
      locationName: 'مقر القيادة العامة والأبراج',
      members: [],
      notes: 'جدول خدمة جديد معتمد من الآمر',
    };

    setServices([newService, ...services]);
    setIsAssignModalOpen(false);
  };

  // Handle Handover Submit
  const handleCreateHandoverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHo: ShiftHandover = {
      id: `ho-${Date.now()}`,
      serviceId: services[0]?.id || 'srv-101',
      outgoingOfficer: services[0]?.guardOfficer.fullName || 'النقيب فهد',
      incomingOfficer: 'المقدم الركن / خالد الدوسري',
      handoverTime: new Date().toLocaleString('ar-SA'),
      weaponsAndAmmoStatus: handoverWeapons,
      equipmentStatus: handoverEquipment,
      incidentsReported: handoverIncidents,
      hasAttachments: true,
      digitalSignatureHash: '0x99AA1122...MINT_AES_SIG',
      status: 'VERIFIED',
    };

    setHandovers([newHo, ...handovers]);
    setIsHandoverModalOpen(false);
  };

  // Status Badge Helper
  const getServiceStatusBadge = (status: ServiceStatus) => {
    switch (status) {
      case 'ON_DUTY':
        return { label: 'على رأس الخدمة (مباشر)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: Activity };
      case 'SCHEDULED':
        return { label: 'مجدول (قادم)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: Clock };
      case 'COMPLETED':
        return { label: 'مكتمل ومستلم', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40', icon: CheckCircle2 };
      case 'CANCELLED':
        return { label: 'ملغى بقرار قيادي', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40', icon: XCircle };
      default:
        return { label: status, color: 'bg-slate-500/20 text-slate-300 border-slate-500/40', icon: Info };
    }
  };

  return (
    <div dir="rtl" className="space-y-6">
      {/* SECTION HEADER & ROLE CONTEXT */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 border border-amber-800/80 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-2xl shadow-inner">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white tracking-wide">
                  منظومة إدارة الخدمة اليومية وضابط الخفر والخفر الميداني
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                  جدول النوبات المعتمد 2026
                </span>
              </div>
              <p className="text-xs text-amber-200/80 mt-1">
                تعيين ضابط الخفر، جدول نوبات التوكات، استلام وتسليم النوبة الرقمي، والمحاضر الميدانية
              </p>
            </div>
          </div>

          {/* Role Tester Switcher */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-bold px-2 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              اختبار الصلاحية:
            </span>
            <button
              onClick={() => setRole('COMMANDER')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === 'COMMANDER'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              الآمر (العميد سعود)
            </button>
            <button
              onClick={() => setRole('SUPERVISOR_1')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === 'SUPERVISOR_1' || role === 'SUPERVISOR_2'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              المشرف / ضابط الخفر
            </button>
            <button
              onClick={() => setRole('ELEMENT')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === 'ELEMENT'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              المقاتل (فرد الخفر)
            </button>
          </div>
        </div>

        {/* QUICK STATS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-900/60 text-center space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold">ضابط الخفر الحالي</span>
            <span className="text-sm font-black text-amber-400 block">الرائد / طارق العتيبي</span>
            <span className="text-[9px] text-emerald-400 font-mono block">مناوبة 24 ساعة (نشط)</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-900/60 text-center space-y-1">
            <span className="text-[10px] text-emerald-400 block font-bold">الخدمات القائمة (على رأس الخدمة)</span>
            <span className="text-xl font-black text-emerald-400 font-mono">{onDutyCount} خدمة</span>
            <span className="text-[9px] text-emerald-300 block">عدد 12 فرد خفر حاضر</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-800/80 text-center space-y-1">
            <span className="text-[10px] text-amber-400 block font-bold">الخدمات المجدولة (غداً)</span>
            <span className="text-xl font-black text-amber-400 font-mono">{scheduledCount} خدمة</span>
            <span className="text-[9px] text-amber-300 block">التوكة 2 مخصصة</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-blue-800/80 text-center space-y-1">
            <span className="text-[10px] text-blue-400 block font-bold">محاضر التسليم المعتمدة</span>
            <span className="text-xl font-black text-blue-400 font-mono">{handovers.length} محضر</span>
            <span className="text-[9px] text-blue-300 block">موقعة بالتوقيع الرقمي</span>
          </div>
        </div>
      </div>

      {/* MODULE NAVIGATION TABS */}
      <div className="flex items-center bg-slate-900 p-2 rounded-2xl border border-slate-800 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('SCHEDULE')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'SCHEDULE'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>جدول الخدمات اليومية ونوبات الخفر</span>
        </button>

        <button
          onClick={() => setActiveTab('GUARD_OFFICER')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'GUARD_OFFICER'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4 text-amber-400" />
          <span>إدارة ضباط الخفر والمستبدلين</span>
        </button>

        <button
          onClick={() => setActiveTab('HANDOVER')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'HANDOVER'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <FileSignature className="w-4 h-4 text-emerald-400" />
          <span>استلام وتسليم النوبة الرقمي ({handovers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('REPORTS')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'REPORTS'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>محاضر الأحداث والطباعة الرسمية</span>
        </button>

        <button
          onClick={() => setActiveTab('STATISTICS')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'STATISTICS'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <span>إحصائيات الخدمات والتوزيع</span>
        </button>

        <button
          onClick={() => setActiveTab('DATABASE_API')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'DATABASE_API'
              ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-950/50'
              : 'text-emerald-300 hover:bg-slate-800'
          }`}
        >
          <Database className="w-4 h-4 text-amber-400" />
          <span>جداول PostgreSQL و REST API</span>
        </button>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* TAB 1: DAILY SERVICE SCHEDULE & MEMBERS */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'SCHEDULE' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  جدول الخدمات اليومية ونوبات الخفر الميداني
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  عرض الخدمات الجارية، التكليف الفردي وحسب التوكات، ومتابعة الانضباط والدورية
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {role === 'COMMANDER' && (
                  <button
                    onClick={() => setIsAssignModalOpen(true)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إنشاء خدمة يومية جديدة</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    if (onOpenPrintModal) {
                      onOpenPrintModal(
                        'جدول الخدمة اليومية المعتمد - قيادة وحدة المدرعات',
                        'بيان رسمي يتضمن تعيين ضابط الخفر اليومي، أفراد الخفر، ومواقع الأبراج للبوابات.'
                      );
                    }
                  }}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs border border-slate-700 flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4 text-cyan-400" />
                  <span>طباعة جدول الخدمة</span>
                </button>
              </div>
            </div>

            {/* Filter and Search controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                <input
                  type="text"
                  placeholder="ابحث برقم الخدمة، اسم ضابط الخفر، أو الموقع..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-9 pl-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="ALL">جميع الحالات (على رأس الخدمة / مجدول / مكتمل)</option>
                  <option value="ON_DUTY">على رأس الخدمة (مباشر)</option>
                  <option value="SCHEDULED">مجدول</option>
                  <option value="COMPLETED">مكتمل</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterStatus('ALL');
                  }}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  إعادة ضبط
                </button>
              </div>
            </div>

            {/* Services Cards List */}
            <div className="space-y-4">
              {filteredServices.map((service) => {
                const badge = getServiceStatusBadge(service.status);
                const BadgeIcon = badge.icon;

                return (
                  <div
                    key={service.id}
                    className="p-5 rounded-3xl bg-slate-950 border border-slate-800 hover:border-amber-700/50 transition-all space-y-4"
                  >
                    {/* Top Service Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-sm">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{service.serviceCode}</span>
                            <span className={`px-2.5 py-0.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 ${badge.color}`}>
                              <BadgeIcon className="w-3 h-3" />
                              {badge.label}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            التاريخ: {service.date} | الموقع: {service.locationName}
                          </p>
                        </div>
                      </div>

                      <div className="text-left font-mono text-xs text-slate-300 bg-slate-900 p-2 rounded-xl border border-slate-800">
                        <span>توقيت النوبة: {service.scheduledStart} - {service.scheduledEnd}</span>
                      </div>
                    </div>

                    {/* Guard Officer Info Box */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400 text-[11px] block">ضابط الخفر المكلف:</span>
                        <span className="font-bold text-amber-300 text-sm">{service.guardOfficer.fullName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">رقم التواصل الميداني:</span>
                        <span className="font-bold text-white font-mono">{service.guardOfficer.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">التوكات المشاركة:</span>
                        <span className="font-bold text-emerald-400">{service.tawkatIncluded.join(' ، ')}</span>
                      </div>
                    </div>

                    {/* Service Members Table */}
                    {service.members.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-bold text-slate-300 text-xs flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-amber-400" />
                          أفراد الخفر المسجلين في النوبة ({service.members.length} مقاتل):
                        </h4>

                        <div className="overflow-x-auto">
                          <table className="w-full text-right text-xs">
                            <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                              <tr>
                                <th className="p-2.5">الرقم العسكري</th>
                                <th className="p-2.5">الاسم والحمد</th>
                                <th className="p-2.5">التوكة</th>
                                <th className="p-2.5">موقع الخفر المكلف</th>
                                <th className="p-2.5">حالة الحضور والنوبة</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-slate-200">
                              {service.members.map((member) => (
                                <tr key={member.id} className="hover:bg-slate-900/60">
                                  <td className="p-2.5 font-mono text-amber-400 font-bold">{member.militaryId}</td>
                                  <td className="p-2.5 font-bold">{member.fullName}</td>
                                  <td className="p-2.5 text-slate-400">{member.tawkaName}</td>
                                  <td className="p-2.5 text-emerald-300 font-bold">{member.dutyPosition}</td>
                                  <td className="p-2.5">
                                    {member.checkInStatus === 'CONFIRMED' ? (
                                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-[10px] font-bold">
                                        تأكيد الحضور ({member.checkInTime})
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded text-[10px] font-bold">
                                        لم يحضر / غائب
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 2: GUARD OFFICER MANAGEMENT */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'GUARD_OFFICER' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-400" />
                إدارة ضابط الخفر الميداني وسجل الاستبدال
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                تعيين ضابط الخفر، التبديل الطارئ، واستعراض سجل الضباط المناوبين
              </p>
            </div>

            {role === 'COMMANDER' && (
              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>تعيين / استبدال ضابط خفر</span>
              </button>
            )}
          </div>

          {/* Current Active Guard Officer Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-amber-950/40 to-slate-950 border border-amber-800/80 space-y-4">
            <div className="flex justify-between items-center border-b border-amber-800/60 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xl">
                  🎖️
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 font-bold block">ضابط الخفر القائم بالخدمة حالياً:</span>
                  <h4 className="text-base font-black text-white">الرائد / طارق العتيبي | MIL-OFF-1024</h4>
                </div>
              </div>

              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold animate-pulse">
                مناوب مباشر (24 ساعة)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px] block">تاريخ الاستلام:</span>
                <span className="font-bold text-white font-mono">2026-08-04 - 06:00 ص</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px] block">هاتف الاتصال اللاسلكي:</span>
                <span className="font-bold text-amber-300 font-mono">0501234567 (قناة الخفر 1)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px] block">الآمر المعتمد للتعيين:</span>
                <span className="font-bold text-emerald-400">العميد الركن / سعود القحطاني</span>
              </div>
            </div>
          </div>

          {/* Guard Officer History Table */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs flex items-center gap-2">
              <History className="w-4 h-4 text-cyan-400" />
              سجل أرشيف ضباط الخفر السابقين والمناوبين:
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">الرقم العسكري</th>
                    <th className="p-3">اسم الضابط والرتبة</th>
                    <th className="p-3">نوع المناوبة</th>
                    <th className="p-3">تاريخ التعيين</th>
                    <th className="p-3">الحالة</th>
                    <th className="p-3">ملاحظات والتسليم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {officerHistory.map((officer) => (
                    <tr key={officer.id} className="hover:bg-slate-900/50">
                      <td className="p-3 font-mono text-amber-400 font-bold">{officer.militaryId}</td>
                      <td className="p-3 font-bold">{officer.fullName}</td>
                      <td className="p-3 text-slate-300">مناوبة 24 ساعة</td>
                      <td className="p-3 text-slate-400 font-mono">{officer.assignedDate}</td>
                      <td className="p-3">
                        {officer.status === 'ACTIVE' ? (
                          <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                            نشط حالياً
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-bold">
                            مكتمل ومسلم
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-400 text-[11px]">{officer.notes || 'تسليم عادي بانتظام'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 3: SHIFT HANDOVER DIGITAL SIGNATURE */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'HANDOVER' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <FileSignature className="w-5 h-5 text-emerald-400" />
                محاضر استلام وتسليم النوبة الميدانية الموثقة رقمياً
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                تأكيد سلامة العهد والأسلحة، الذخيرة، والأجهزة بين طاقم الخفر المغادر والقادم
              </p>
            </div>

            <button
              onClick={() => setIsHandoverModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء محضر استلام وتسليم جديد</span>
            </button>
          </div>

          <div className="space-y-4">
            {handovers.map((ho) => (
              <div
                key={ho.id}
                className="p-5 rounded-3xl bg-slate-950 border border-slate-800 hover:border-emerald-700/50 transition-all space-y-4"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold block">رقم المحضر الرقمي: {ho.id}</span>
                    <h4 className="font-bold text-white text-sm">
                      محضر تسليم الخدمة بين {ho.outgoingOfficer} ⬅ {ho.incomingOfficer}
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 p-2 rounded-xl border border-slate-800">
                    التاريخ والتوقيت: {ho.handoverTime}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] block">حالة الأسلحة والذخيرة:</span>
                    <span className="font-bold text-emerald-400">{ho.weaponsAndAmmoStatus}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] block">حالة الأجهزة والمعدات:</span>
                    <span className="font-bold text-white">{ho.equipmentStatus}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] block">التوقيع الرقمي المشفر:</span>
                    <span className="font-bold text-amber-400 font-mono text-[10px] block truncate">
                      {ho.digitalSignatureHash}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-amber-300 block mb-1">الملاحظات والحوادث المسجلة:</span>
                  <p>{ho.incidentsReported}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 4: REPORTS & OFFICIAL PRINTING */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'REPORTS' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Printer className="w-5 h-5 text-cyan-400" />
                مركز التقارير الميدانية والمحاضر المعتمدة للخدمة اليومية
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                تصدير واستخراج التقرير اليومي، الأسبوعي، تقرير ضابط الخفر، والتصادق القيادي
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-xs">تقرير الخدمة اليومية الشامل (Daily Service Form)</h4>
              <p className="text-[11px] text-slate-400">يتضمن أسماء الخفر، ضابط الخفر، الملاحظات، والختم القيادي.</p>
              <button
                onClick={() => {
                  if (onOpenPrintModal) {
                    onOpenPrintModal('تقرير الخدمة اليومية الشامل', 'نموذج الخدمة المعتمد لليوم 2026-08-04.');
                  }
                }}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                طباعة النموذج الرسمي
              </button>
            </div>

            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <FileSignature className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-xs">محضر تسليم واستلام الخفر (Shift Handover Form)</h4>
              <p className="text-[11px] text-slate-400">نموذج الاستلام والتسليم مع حالة الأسلحة والأجهزة وتوقيع الضباط.</p>
              <button
                onClick={() => {
                  if (onOpenPrintModal) {
                    onOpenPrintModal('محضر استلام وتسليم النوبة', 'نموذج التسليم الرقمي المعتمد لضباط الخفر.');
                  }
                }}
                className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                طباعة محضر التسليم
              </button>
            </div>

            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-xs">تصدير بيانات الخدمة (Excel / PDF)</h4>
              <p className="text-[11px] text-slate-400">تصدير كافة السجلات التاريخية للخدمات إلى ملفات إكسل بصيغة رسمية.</p>
              <button
                onClick={() => alert('جاري تصدير التقرير بصيغة Excel...')}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                تصدير ملف Excel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 5: STATISTICS & PERFORMANCE */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'STATISTICS' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                إحصائيات نوبات الخفر وتوزيع الخدمة اليومية حسب التوكات
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                مؤشرات أداء الانضباط العسكري، عدد ساعات الخفر، وعدالة توزيع التكليفات
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <h4 className="font-bold text-amber-400 text-xs">توزيع نوبات الخفر الميداني حسب التوكة:</h4>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1 font-bold">
                    <span className="text-white">التوكة 1 - مدرعات الفهد</span>
                    <span className="text-emerald-400">45% من ساعات الخفر</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-bold">
                    <span className="text-white">التوكة 2 - طاقم الصيانة الآلية</span>
                    <span className="text-amber-400">35% من ساعات الخفر</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-bold">
                    <span className="text-white">التوكة 3 - الدعم الإمدادي</span>
                    <span className="text-cyan-400">20% من ساعات الخفر</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <h4 className="font-bold text-indigo-400 text-xs">مؤشرات الانضباط والالتزام بمواعيد الاستلام:</h4>
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block mb-1">معدل الانضباط</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">98.4%</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block mb-1">متوسط وقت التسليم</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">4.2 دقيقة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 6: POSTGRESQL SCHEMA & REST API VIEW */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'DATABASE_API' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 font-mono">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 font-sans">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                مخطط قواعد البيانات PostgreSQL ومصادر REST API للخدمة اليومية
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                الجداول الميدانية، العلاقات الخارجية، الفهارس المشفرة، ونقاط الاتصال API
              </p>
            </div>
          </div>

          {/* SQL Tables Code Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 space-y-4 overflow-x-auto">
            <h4 className="font-bold text-amber-400 font-sans text-xs">1. SQL Database Tables Definition:</h4>
            <pre className="text-[11px] leading-relaxed">
{`-- Table: daily_services (نوبات الخدمة اليومية)
CREATE TABLE daily_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_code VARCHAR(32) NOT NULL UNIQUE,
    service_date DATE NOT NULL,
    guard_officer_id UUID NOT NULL REFERENCES guard_officers(id),
    status VARCHAR(20) NOT NULL CHECK (status IN ('SCHEDULED', 'STARTED', 'ON_DUTY', 'COMPLETED', 'CANCELLED')),
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
    actual_start TIMESTAMP WITH TIME ZONE,
    actual_end TIMESTAMP WITH TIME ZONE,
    location_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: guard_officers (ضباط الخفر المناوبين)
CREATE TABLE guard_officers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    military_id VARCHAR(32) NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    rank VARCHAR(32) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    assigned_date DATE NOT NULL,
    shift_type VARCHAR(32) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

-- Table: shift_handovers (محاضر التسليم والاستلام الرقمية)
CREATE TABLE shift_handovers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES daily_services(id),
    outgoing_officer_id UUID NOT NULL,
    incoming_officer_id UUID NOT NULL,
    handover_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    weapons_status TEXT NOT NULL,
    equipment_status TEXT NOT NULL,
    digital_signature_hash VARCHAR(256) NOT NULL,
    status VARCHAR(20) DEFAULT 'VERIFIED'
);`}
            </pre>
          </div>

          {/* REST API Endpoints View */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-amber-200 space-y-3 font-sans">
            <h4 className="font-bold text-cyan-400 text-xs">2. REST API Specification Endpoints:</h4>
            <div className="space-y-2 font-mono text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-emerald-400 font-bold">GET /api/v1/daily-services</span>
                <span className="text-slate-400">استرجاع جدول الخدمات اليومية مع خيارات الفرز حسب التوكة والتاريخ</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-amber-400 font-bold">POST /api/v1/daily-services/assign</span>
                <span className="text-slate-400">تعيين خدمة جديدة وتكليف ضابط الخفر والأفراد الميدانيين</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-indigo-400 font-bold">POST /api/v1/shift-handover/submit</span>
                <span className="text-slate-400">إرسال محضر الاستلام والتسليم وتوثيق التوقيع الرقمي المشفر</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* MODAL 1: ASSIGN / REPLACE GUARD OFFICER */}
      {/* ----------------------------------------------------------------- */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-800/80 rounded-3xl w-full max-w-lg p-6 space-y-5 text-right shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-400" />
                تعيين خدمة يومية جديدة وتعيين ضابط الخفر
              </h3>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignOfficerSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">اسم ضابط الخفر والرتبة:</label>
                <input
                  type="text"
                  required
                  value={newOfficerName}
                  onChange={(e) => setNewOfficerName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">هاتف الاتصال اللاسلكي:</label>
                <input
                  type="text"
                  required
                  value={newOfficerPhone}
                  onChange={(e) => setNewOfficerPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">تاريخ النوبة:</label>
                  <input
                    type="date"
                    required
                    value={newShiftDate}
                    onChange={(e) => setNewShiftDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">مدة المناوبة:</label>
                  <select
                    value={newShiftType}
                    onChange={(e) => setNewShiftType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="24_HOURS">24 ساعة كاملة</option>
                    <option value="12_HOURS_DAY">12 ساعة (نهاري)</option>
                    <option value="12_HOURS_NIGHT">12 ساعة (ليلي)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg"
                >
                  حفظ وتأكيد التعيين
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* MODAL 2: SHIFT HANDOVER FORM */}
      {/* ----------------------------------------------------------------- */}
      {isHandoverModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-800/80 rounded-3xl w-full max-w-lg p-6 space-y-5 text-right shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <FileSignature className="w-5 h-5 text-emerald-400" />
                تأكيد وتوثيق محضر استلام وتسليم النوبة
              </h3>
              <button
                onClick={() => setIsHandoverModalOpen(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHandoverSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">حالة الأسلحة والذخيرة المقبولة:</label>
                <textarea
                  rows={2}
                  value={handoverWeapons}
                  onChange={(e) => setHandoverWeapons(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">حالة الأجهزة والمعدات الميدانية:</label>
                <textarea
                  rows={2}
                  value={handoverEquipment}
                  onChange={(e) => setHandoverEquipment(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">ملاحظات الحوادث الميدانية والتفقد:</label>
                <input
                  type="text"
                  value={handoverIncidents}
                  onChange={(e) => setHandoverIncidents(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsHandoverModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg"
                >
                  اعتماد التوقيع الرقمي والتسليم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
