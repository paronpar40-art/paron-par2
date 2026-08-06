import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Search,
  Filter,
  Printer,
  Download,
  FileSpreadsheet,
  FileText,
  UserCheck,
  UserX,
  User,
  Shield,
  MapPin,
  Smartphone,
  Check,
  X,
  Edit,
  Plus,
  TrendingUp,
  Award,
  AlertTriangle,
  ChevronDown,
  Database,
  Code2,
  Lock,
  Layers,
  BarChart3,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Share2,
  Info,
  CheckSquare,
  Sparkles,
} from 'lucide-react';
import { UserRole } from '../types/srs';

export type AttendanceStatusType =
  | 'PRESENT' // حاضر
  | 'ABSENT' // غائب
  | 'LATE' // متأخر
  | 'EXCUSED' // معذور
  | 'LEAVE' // إجازة
  | 'TRAINING' // تدريب
  | 'MISSION' // مهمة ميدانية
  | 'DAILY_SERVICE'; // خدمة يومية

export interface AttendanceRecord {
  id: string;
  militaryId: string;
  fullName: string;
  rank: string;
  tawkaId: string;
  tawkaName: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  durationMinutes: number | null;
  status: AttendanceStatusType;
  checkInDevice: string;
  checkInLocation: {
    lat: number;
    lng: number;
    locationName: string;
    isInsideGeofence: boolean;
  };
  notes?: string;
  approvedBy?: string;
  delayMinutes?: number;
}

export interface LeaveRequest {
  id: string;
  militaryId: string;
  fullName: string;
  rank: string;
  tawkaName: string;
  leaveType: 'EMERGENCY' | 'ANNUAL' | 'MEDICAL' | 'OFFICIAL';
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  appliedDate: string;
  approvedBy?: string;
  rejectionReason?: string;
}

interface AttendanceManagementModuleProps {
  currentRole: UserRole;
  onOpenPrintModal?: (title: string, content: string) => void;
  isDarkTheme?: boolean;
}

export const AttendanceManagementModule: React.FC<AttendanceManagementModuleProps> = ({
  currentRole: initialRole,
  onOpenPrintModal,
  isDarkTheme = true,
}) => {
  // Role override state for easy testing
  const [role, setRole] = useState<UserRole>(initialRole);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'DASHBOARD' | 'LIVE_CHECKIN' | 'REGISTER' | 'LEAVES' | 'REPORTS' | 'STATISTICS' | 'DATABASE_API'
  >('DASHBOARD');

  // Attendance Records State
  const [records, setRecords] = useState<AttendanceRecord[]>([
    {
      id: 'att-101',
      militaryId: 'MIL-88421',
      fullName: 'رئيس رقباء / عبدالله القحطاني',
      rank: 'رئيس رقباء',
      tawkaId: 'tawka-1',
      tawkaName: 'التوكة 1 - مدرعات الفهد',
      date: '2026-08-04',
      checkInTime: '06:45:12 ص',
      checkOutTime: null,
      durationMinutes: null,
      status: 'PRESENT',
      checkInDevice: 'جهاز المقاتل الذكي (Samsung Rugged Tab)',
      checkInLocation: {
        lat: 24.7136,
        lng: 46.6753,
        locationName: 'بوابة المشتل - البوابة الشمالية (وحدة المدرعات)',
        isInsideGeofence: true,
      },
      notes: 'حضور مبكر بالبصمة الحيوية',
      approvedBy: 'الرائد / طارق العتيبي',
      delayMinutes: 0,
    },
    {
      id: 'att-102',
      militaryId: 'MIL-88422',
      fullName: 'رقيب أول / فهد الشمري',
      rank: 'رقيب أول',
      tawkaId: 'tawka-1',
      tawkaName: 'التوكة 1 - مدرعات الفهد',
      date: '2026-08-04',
      checkInTime: '07:15:30 ص',
      checkOutTime: null,
      durationMinutes: null,
      status: 'LATE',
      checkInDevice: 'جهاز المقاتل الذكي (iPhone 15 Pro M3)',
      checkInLocation: {
        lat: 24.7138,
        lng: 46.6755,
        locationName: 'البوابة الرئيسية - المقر الإداري',
        isInsideGeofence: true,
      },
      notes: 'عطل طارئ في وسيلة النقل الميدانية',
      approvedBy: 'المقدم الركن / خالد الدوسري',
      delayMinutes: 30,
    },
    {
      id: 'att-103',
      militaryId: 'MIL-88423',
      fullName: 'رقيب / محمد العنزي',
      rank: 'رقيب',
      tawkaId: 'tawka-1',
      tawkaName: 'التوكة 1 - مدرعات الفهد',
      date: '2026-08-04',
      checkInTime: '06:30:00 ص',
      checkOutTime: null,
      durationMinutes: null,
      status: 'DAILY_SERVICE',
      checkInDevice: 'محطة الخفر الرئيسية',
      checkInLocation: {
        lat: 24.712,
        lng: 46.674,
        locationName: 'برج الحراسة الشمالي رقم 3',
        isInsideGeofence: true,
      },
      notes: 'مناوب خفر خافر الممر الشمالي',
      approvedBy: 'الرائد / طارق العتيبي',
      delayMinutes: 0,
    },
    {
      id: 'att-104',
      militaryId: 'MIL-88424',
      fullName: 'عريف / ياسر المطيري',
      rank: 'عريف',
      tawkaId: 'tawka-2',
      tawkaName: 'التوكة 2 - طاقم الصيانة الآلية',
      date: '2026-08-04',
      checkInTime: null,
      checkOutTime: null,
      durationMinutes: null,
      status: 'LEAVE',
      checkInDevice: '-',
      checkInLocation: {
        lat: 0,
        lng: 0,
        locationName: 'إجازة ميدانية رسمية',
        isInsideGeofence: false,
      },
      notes: 'إجازة ميدانية لمدة 5 أيام معتمدة',
      approvedBy: 'العميد الركن / سعود القحطاني',
      delayMinutes: 0,
    },
    {
      id: 'att-105',
      militaryId: 'MIL-88425',
      fullName: 'جندي أول / سلطان المالكي',
      rank: 'جندي أول',
      tawkaId: 'tawka-2',
      tawkaName: 'التوكة 2 - طاقم الصيانة الآلية',
      date: '2026-08-04',
      checkInTime: '06:55:00 ص',
      checkOutTime: null,
      durationMinutes: null,
      status: 'MISSION',
      checkInDevice: 'جهاز اللاسلكي الميداني',
      checkInLocation: {
        lat: 24.73,
        lng: 46.69,
        locationName: 'موقع التدريبات الخارجية - القاعدة الشرقية',
        isInsideGeofence: true,
      },
      notes: 'مهمة نجدة وإسناد آلي لموقع المشتل',
      approvedBy: 'العميد الركن / سعود القحطاني',
      delayMinutes: 0,
    },
    {
      id: 'att-106',
      militaryId: 'MIL-88426',
      fullName: 'جندي / بدر الهاجري',
      rank: 'جندي',
      tawkaId: 'tawka-3',
      tawkaName: 'التوكة 3 - الدعم الإمدادي',
      date: '2026-08-04',
      checkInTime: null,
      checkOutTime: null,
      durationMinutes: null,
      status: 'ABSENT',
      checkInDevice: '-',
      checkInLocation: {
        lat: 0,
        lng: 0,
        locationName: 'غير مسجل حضور',
        isInsideGeofence: false,
      },
      notes: 'لم يحضر للطابور الصباحي - جاري التحقيق',
      approvedBy: 'المقدم الركن / خالد الدوسري',
      delayMinutes: 0,
    },
  ]);

  // Leave Requests State
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 'lv-201',
      militaryId: 'MIL-88421',
      fullName: 'رئيس رقباء / عبدالله القحطاني',
      rank: 'رئيس رقباء',
      tawkaName: 'التوكة 1 - مدرعات الفهد',
      leaveType: 'ANNUAL',
      startDate: '2026-08-10',
      endDate: '2026-08-15',
      daysCount: 5,
      reason: 'إجازة ميدانية دورية مستحقة معتمدة من خطة الإجازات',
      status: 'PENDING',
      appliedDate: '2026-08-03',
    },
    {
      id: 'lv-202',
      militaryId: 'MIL-88422',
      fullName: 'رقيب أول / فهد الشمري',
      rank: 'رقيب أول',
      tawkaName: 'التوكة 1 - مدرعات الفهد',
      leaveType: 'EMERGENCY',
      startDate: '2026-08-05',
      endDate: '2026-08-07',
      daysCount: 2,
      reason: 'ظرف عائلي طارئ يتطلب التواجد الإجباري',
      status: 'PENDING',
      appliedDate: '2026-08-04',
    },
    {
      id: 'lv-203',
      militaryId: 'MIL-88424',
      fullName: 'عريف / ياسر المطيري',
      rank: 'عريف',
      tawkaName: 'التوكة 2 - طاقم الصيانة الآلية',
      leaveType: 'ANNUAL',
      startDate: '2026-08-01',
      endDate: '2026-08-05',
      daysCount: 5,
      reason: 'إجازة سنوية منتظمة',
      status: 'APPROVED',
      appliedDate: '2026-07-28',
      approvedBy: 'العميد الركن / سعود القحطاني',
    },
  ]);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDatePreset, setFilterDatePreset] = useState<'TODAY' | 'YESTERDAY' | 'WEEK' | 'MONTH' | 'CUSTOM'>('TODAY');
  const [filterTawka, setFilterTawka] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterRank, setFilterRank] = useState<string>('ALL');

  // Edit Record Modal
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);

  // New Leave Modal State
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [newLeaveType, setNewLeaveType] = useState<'EMERGENCY' | 'ANNUAL' | 'MEDICAL' | 'OFFICIAL'>('ANNUAL');
  const [newLeaveStart, setNewLeaveStart] = useState('2026-08-12');
  const [newLeaveEnd, setNewLeaveEnd] = useState('2026-08-15');
  const [newLeaveReason, setNewLeaveReason] = useState('');

  // Selected Report Type
  const [selectedReportType, setSelectedReportType] = useState<
    'DAILY' | 'WEEKLY' | 'MONTHLY' | 'LATE' | 'ABSENT' | 'LEAVE' | 'TAWKA' | 'INDIVIDUAL'
  >('DAILY');

  // Check In / Out Interactive State
  const [userCheckedIn, setUserCheckedIn] = useState(true);
  const [simulatedTime, setSimulatedTime] = useState('06:45:12 ص');
  const [simulatedDevice] = useState('جهاز المقاتل الذكي (Mil-Tab Pro 2026)');
  const [simulatedGeofence, setSimulatedGeofence] = useState(true);
  const [checkInNote, setCheckInNote] = useState('حضور انضباطي مبكر للطابور');

  // Helper Stats Calculation
  const totalCount = records.length;
  const presentCount = records.filter((r) => r.status === 'PRESENT' || r.status === 'DAILY_SERVICE' || r.status === 'TRAINING').length;
  const lateCount = records.filter((r) => r.status === 'LATE').length;
  const absentCount = records.filter((r) => r.status === 'ABSENT').length;
  const leaveCount = records.filter((r) => r.status === 'LEAVE').length;
  const missionCount = records.filter((r) => r.status === 'MISSION').length;
  const attendanceRate = totalCount > 0 ? Math.round(((presentCount + missionCount) / totalCount) * 100) : 0;

  // Status Badge Styling Helper
  const getStatusBadge = (status: AttendanceStatusType) => {
    switch (status) {
      case 'PRESENT':
        return { label: 'حاضر', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: CheckCircle2 };
      case 'ABSENT':
        return { label: 'غائب', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40', icon: XCircle };
      case 'LATE':
        return { label: 'متأخر', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: AlertTriangle };
      case 'EXCUSED':
        return { label: 'معذور', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40', icon: Info };
      case 'LEAVE':
        return { label: 'إجازة', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40', icon: Calendar };
      case 'TRAINING':
        return { label: 'تدريب', color: 'bg-teal-500/20 text-teal-300 border-teal-500/40', icon: Award };
      case 'MISSION':
        return { label: 'مهمة ميدانية', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', icon: Shield };
      case 'DAILY_SERVICE':
        return { label: 'خدمة يومية (خفر)', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40', icon: Clock };
      default:
        return { label: status, color: 'bg-slate-500/20 text-slate-300 border-slate-500/40', icon: Info };
    }
  };

  // Filter Records Function
  const filteredRecords = records.filter((rec) => {
    // Search query
    const matchesSearch =
      rec.fullName.includes(searchQuery) ||
      rec.militaryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.rank.includes(searchQuery) ||
      rec.tawkaName.includes(searchQuery);

    // Tawka Filter
    const matchesTawka = filterTawka === 'ALL' || rec.tawkaId === filterTawka;

    // Status Filter
    const matchesStatus = filterStatus === 'ALL' || rec.status === filterStatus;

    // Rank Filter
    const matchesRank = filterRank === 'ALL' || rec.rank === filterRank;

    return matchesSearch && matchesTawka && matchesStatus && matchesRank;
  });

  // Handle Approve Leave
  const handleApproveLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'APPROVED', approvedBy: 'العميد الركن / سعود القحطاني' } : l))
    );
  };

  // Handle Reject Leave
  const handleRejectLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: 'REJECTED', rejectionReason: 'مقتضيات الجاهزية القتالية الميدانية للتوكة' } : l
      )
    );
  };

  // Handle Save Edited Record
  const handleSaveEditedRecord = () => {
    if (!editingRecord) return;
    setRecords((prev) => prev.map((r) => (r.id === editingRecord.id ? editingRecord : r)));
    setEditingRecord(null);
  };

  // Handle Add New Leave Request
  const handleCreateLeaveRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: LeaveRequest = {
      id: `lv-${Date.now()}`,
      militaryId: 'MIL-88421',
      fullName: 'رئيس رقباء / عبدالله القحطاني',
      rank: 'رئيس رقباء',
      tawkaName: 'التوكة 1 - مدرعات الفهد',
      leaveType: newLeaveType,
      startDate: newLeaveStart,
      endDate: newLeaveEnd,
      daysCount: 4,
      reason: newLeaveReason || 'طلب إجازة جديدة',
      status: 'PENDING',
      appliedDate: '2026-08-04',
    };
    setLeaveRequests([newReq, ...leaveRequests]);
    setIsLeaveModalOpen(false);
    setNewLeaveReason('');
  };

  return (
    <div dir="rtl" className="space-y-6">
      {/* SECTION HEADER & ROLE CONTEXT */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 border border-emerald-800/80 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-emerald-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-2xl shadow-inner">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white tracking-wide">
                  وحدة إدارة الحضور والغياب والجاهزية الميدانية
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                  نظام التتبع الآلي v3.2
                </span>
              </div>
              <p className="text-xs text-amber-200/80 mt-1">
                منظومة تتبع الانضباط العسكري، البصمة الحيوية، النطاق الجغرافي (Geofencing)، وإدارة الإجازات الرسمية
              </p>
            </div>
          </div>

          {/* Quick Role Tester Switcher */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-bold px-2 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              منظور العرض:
            </span>
            <button
              onClick={() => setRole('COMMANDER')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === 'COMMANDER'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              آمر الوحدة
            </button>
            <button
              onClick={() => setRole('SUPERVISOR_1')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === 'SUPERVISOR_1' || role === 'SUPERVISOR_2'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              المشرف
            </button>
            <button
              onClick={() => setRole('ELEMENT')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === 'ELEMENT'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              المقاتل (الفرد)
            </button>
          </div>
        </div>

        {/* STATS STRIP OVERVIEW */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-emerald-900/60 text-center space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold">إجمالي القوة البشرية</span>
            <span className="text-xl font-black text-white font-mono">{totalCount}</span>
            <span className="text-[9px] text-emerald-400 font-mono block">100% مسجلين</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/80 border border-emerald-800/80 text-center space-y-1">
            <span className="text-[10px] text-emerald-400 block font-bold">حاضر / بالخدمة</span>
            <span className="text-xl font-black text-emerald-400 font-mono">{presentCount}</span>
            <span className="text-[9px] text-emerald-300 font-mono block">{attendanceRate}% جاهزية</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-800/80 text-center space-y-1">
            <span className="text-[10px] text-amber-400 block font-bold">حالات التأخير</span>
            <span className="text-xl font-black text-amber-400 font-mono">{lateCount}</span>
            <span className="text-[9px] text-amber-300 font-mono block">مجموع 30 دقيقة</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/80 border border-rose-800/80 text-center space-y-1">
            <span className="text-[10px] text-rose-400 block font-bold">حالات الغياب</span>
            <span className="text-xl font-black text-rose-400 font-mono">{absentCount}</span>
            <span className="text-[9px] text-rose-300 font-mono block">تحت التحقيق</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/80 border border-purple-800/80 text-center space-y-1">
            <span className="text-[10px] text-purple-400 block font-bold">في إجازات</span>
            <span className="text-xl font-black text-purple-400 font-mono">{leaveCount}</span>
            <span className="text-[9px] text-purple-300 font-mono block">ميدانية / طارئة</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/80 border border-cyan-800/80 text-center space-y-1">
            <span className="text-[10px] text-cyan-400 block font-bold">مهام خارجية</span>
            <span className="text-xl font-black text-cyan-400 font-mono">{missionCount}</span>
            <span className="text-[9px] text-cyan-300 font-mono block">نجدة وإسناد</span>
          </div>
        </div>
      </div>

      {/* MODULE MAIN NAVIGATION TABS */}
      <div className="flex items-center bg-slate-900 p-2 rounded-2xl border border-slate-800 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('DASHBOARD')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'DASHBOARD'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>لوحة القيادة والمؤشرات</span>
        </button>

        <button
          onClick={() => setActiveTab('LIVE_CHECKIN')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'LIVE_CHECKIN'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>إثبات الحضور والانصراف الحي</span>
        </button>

        <button
          onClick={() => setActiveTab('REGISTER')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'REGISTER'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>سجل الحضور الشامل والتعديلات</span>
        </button>

        <button
          onClick={() => setActiveTab('LEAVES')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'LEAVES'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4 text-purple-400" />
          <span>إدارة طلبات الإجازات ({leaveRequests.filter((l) => l.status === 'PENDING').length})</span>
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
          <span>مركز التقارير والطباعة والتصدير</span>
        </button>

        <button
          onClick={() => setActiveTab('STATISTICS')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'STATISTICS'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>الإحصائيات والأثر الانضباطي</span>
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
          <span>مخطط قواعد البيانات و REST APIs</span>
        </button>
      </div>

      {/* TAB CONTENT AREA */}
      {/* ----------------------------------------------------------------- */}
      {/* TAB 1: DASHBOARD VIEW (COMMANDER / SUPERVISOR / SOLDIER) */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'DASHBOARD' && (
        <div className="space-y-6">
          {/* Commander / Supervisor Specific Banner */}
          {role === 'COMMANDER' || role === 'SUPERVISOR_1' || role === 'SUPERVISOR_2' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Attendance Breakdown Chart / Visual Progress */}
              <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-400" />
                    موقف الجاهزية القتالية اليومي وحالة الحضور والخدمات
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">تاريخ اليوم: 2026-08-04</span>
                </div>

                {/* Progress Visual Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-emerald-400">نسبة الحضور والخدمة الفعالة: {attendanceRate}%</span>
                    <span className="text-amber-400">الحد الأدنى المطلوب: 90%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-4 p-0.5 border border-slate-800 flex overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-r-full" style={{ width: `${(presentCount / totalCount) * 100}%` }}></div>
                    <div className="bg-cyan-500 h-full" style={{ width: `${(missionCount / totalCount) * 100}%` }}></div>
                    <div className="bg-amber-500 h-full" style={{ width: `${(lateCount / totalCount) * 100}%` }}></div>
                    <div className="bg-purple-500 h-full" style={{ width: `${(leaveCount / totalCount) * 100}%` }}></div>
                    <div className="bg-rose-500 h-full rounded-l-full" style={{ width: `${(absentCount / totalCount) * 100}%` }}></div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> حاضر ({presentCount})</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> مهمة ({missionCount})</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> متأخر ({lateCount})</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> إجازة ({leaveCount})</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> غائب ({absentCount})</span>
                  </div>
                </div>

                {/* Tawka Breakdown List */}
                <div className="pt-2 space-y-3">
                  <h4 className="font-bold text-amber-300 text-xs">توزيع الحضور حسب التوكات والتكليفات الميدانية:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-white">التوكة 1 - مدرعات الفهد</span>
                        <span className="text-emerald-400">92% حضور</span>
                      </div>
                      <p className="text-[11px] text-slate-400">المقيدين: 35 مقاتل | حاضر: 32 | متأخر: 1 | إجازة: 2</p>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-white">التوكة 2 - طاقم الصيانة الآلية</span>
                        <span className="text-emerald-400">88% حضور</span>
                      </div>
                      <p className="text-[11px] text-slate-400">المقيدين: 25 مقاتل | حاضر: 22 | غائب: 1 | إجازة: 2</p>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Approvals Side Box */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    طلبات الإجازات بانتظار الاعتماد ({leaveRequests.filter((l) => l.status === 'PENDING').length})
                  </h3>
                  <button
                    onClick={() => setActiveTab('LEAVES')}
                    className="text-[11px] text-amber-400 hover:underline font-bold"
                  >
                    عرض الكل
                  </button>
                </div>

                <div className="space-y-3">
                  {leaveRequests
                    .filter((l) => l.status === 'PENDING')
                    .map((leave) => (
                      <div key={leave.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-white block">{leave.fullName}</span>
                            <span className="text-[10px] text-amber-300">{leave.rank} | {leave.tawkaName}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[9px] font-bold">
                            {leave.leaveType === 'ANNUAL' ? 'سنوية / ميدانية' : 'طارئة'}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-300 line-clamp-2 bg-slate-900 p-2 rounded-xl">
                          {leave.reason}
                        </p>

                        <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                          <span>المدة: {leave.daysCount} أيام ({leave.startDate})</span>
                          {role === 'COMMANDER' && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleApproveLeave(leave.id)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all"
                              >
                                اعتماد
                              </button>
                              <button
                                onClick={() => handleRejectLeave(leave.id)}
                                className="px-2.5 py-1 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold rounded-lg transition-all"
                              >
                                رفض
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            /* SOLDIER DASHBOARD CARD */
            <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-800/80 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xl">
                    🪖
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">رئيس رقباء / عبدالله القحطاني | MIL-88421</h3>
                    <p className="text-xs text-amber-300">التوكة 1 - مدرعات الفهد | موقف الحضور الشخصي اليوم</p>
                  </div>
                </div>

                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold">
                  حاضر بالخدمة الميدانية
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px] block">وقت تسجيل الدخول:</span>
                  <span className="font-bold text-emerald-400 text-sm font-mono">06:45:12 ص</span>
                  <span className="text-[10px] text-slate-500 block">البصمة الحيوية + موقع البوابة الشمالية</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px] block">تأكيدات ضابط الخفر:</span>
                  <span className="font-bold text-amber-300 text-sm">مكتمل بالكامل (الرائد طارق)</span>
                  <span className="text-[10px] text-slate-500 block">مناوبة خفر البرج الشمالي رقم 3</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px] block">رصيد الإجازات المتبقي:</span>
                  <span className="font-bold text-purple-400 text-sm font-mono">18 يوم ميداني</span>
                  <button
                    onClick={() => setIsLeaveModalOpen(true)}
                    className="text-[10px] text-amber-400 hover:underline font-bold block pt-1"
                  >
                    + تقديم طلب إجازة جديد
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setActiveTab('LIVE_CHECKIN')}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-right space-y-2 transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-xs">إثبات الحضور بالبصمة الحيوية</h4>
              <p className="text-[11px] text-slate-400">محاكاة عملية تسجيل الحضور والانصراف مع التحقق الجغرافي GPS</p>
            </button>

            <button
              onClick={() => setActiveTab('REGISTER')}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-right space-y-2 transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-xs">سجل الحضور والبحث والتعديل</h4>
              <p className="text-[11px] text-slate-400">جدول تفاعلي لإدارة الحالات، تعديل السجلات، والبحث حسب الرقم العسكري</p>
            </button>

            <button
              onClick={() => setActiveTab('REPORTS')}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-right space-y-2 transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Printer className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-xs">مركز الطباعة والتقارير المعتمدة</h4>
              <p className="text-[11px] text-slate-400">طباعة التقرير اليومي، الأسبوعي، والشهري بصيغة رسمية مع ختم القيادة</p>
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 2: LIVE CHECK-IN / CHECK-OUT MODULE */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'LIVE_CHECKIN' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                محاكي إثبات الحضور والانصراف الميداني (Check In / Check Out)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                نظام التحقق المزدوج عبر البصمة الحيوية والموقع الجغرافي المعتمد للوحدة (GPS Geofencing)
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-xs font-bold">
              متصل بالخادم الآلي
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Check In / Out Simulation Panel */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
              <h4 className="font-bold text-amber-400 text-xs flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                واجهة تسجيل الحضور على جهاز المقاتل
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">الرقم العسكري:</span>
                  <span className="font-bold text-white font-mono">MIL-88421</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">الاسم والحمد:</span>
                  <span className="font-bold text-amber-300">رئيس رقباء / عبدالله القحطاني</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">جهاز الإثبات:</span>
                  <span className="font-bold text-slate-300">{simulatedDevice}</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">الموقع الجغرافي (GPS):</span>
                  <span className={`font-bold flex items-center gap-1 ${simulatedGeofence ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <MapPin className="w-3.5 h-3.5" />
                    {simulatedGeofence ? 'داخل النطاق المعتمد (وحدة المدرعات)' : 'خارج النطاق الجغرافي'}
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block text-[11px]">ملاحظة الحضور / الخدمة:</label>
                  <input
                    type="text"
                    value={checkInNote}
                    onChange={(e) => setCheckInNote(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setUserCheckedIn(true);
                    const nowStr = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    setSimulatedTime(nowStr);
                  }}
                  className="py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تسجيل دخول (Check In)</span>
                </button>

                <button
                  onClick={() => {
                    setUserCheckedIn(false);
                  }}
                  className="py-3 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <XCircle className="w-4 h-4" />
                  <span>تسجيل خروج (Check Out)</span>
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-[11px] flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                <span>الملاحظة: جميع عمليات التسجيل تُحفظ مباشرة في قاعدة البيانات المشفرة مع إرسال إشعار لضابط الخفر.</span>
              </div>
            </div>

            {/* Simulated Live Log Stream */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <h4 className="font-bold text-cyan-400 text-xs flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                السجل الحي لعمليات الحضور والانصراف (Live Event Log Stream)
              </h4>

              <div className="space-y-2 font-mono text-[11px]">
                <div className="p-3 rounded-xl bg-slate-900 border border-emerald-900/60 text-emerald-300 flex justify-between items-start">
                  <div>
                    <span className="font-bold block">[SUCCESS] CHECK-IN INGESTED</span>
                    <span>المقاتل: MIL-88421 | رئيس رقباء عبدالله القحطاني</span>
                    <span className="block text-[10px] text-slate-400">GPS: 24.7136, 46.6753 (Geofence OK)</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{simulatedTime}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 flex justify-between items-start">
                  <div>
                    <span className="font-bold block">[SUCCESS] LATE CHECK-IN APPROVED</span>
                    <span>المقاتل: MIL-88422 | رقيب أول فهد الشمري</span>
                    <span className="block text-[10px] text-slate-400">تأخير: +30 دقيقة (ملاحظة: عطل المركبة)</span>
                  </div>
                  <span className="text-[10px] text-slate-400">07:15:30 ص</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-indigo-300 flex justify-between items-start">
                  <div>
                    <span className="font-bold block">[INFO] SERVICE ASSIGNMENT VERIFIED</span>
                    <span>المقاتل: MIL-88423 | رقيب محمد العنزي</span>
                    <span className="block text-[10px] text-slate-400">خفر البرج الشمالي رقم 3</span>
                  </div>
                  <span className="text-[10px] text-slate-400">06:30:00 ص</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 3: REGISTER & SEARCH / EDIT */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'REGISTER' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-400" />
                سجل الحضور الشامل وقاعدة البحث الميدانية
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                استعراض كامل القوة، البحث بالرقم العسكري، الفرز وتعديل حالات الحضور للآمر والمشرف
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterTawka('ALL');
                  setFilterStatus('ALL');
                  setFilterRank('ALL');
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 flex items-center gap-1 font-bold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                إعادة ضبط الفلاتر
              </button>
            </div>
          </div>

          {/* SEARCH & FILTERS BAR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input
                type="text"
                placeholder="ابحث بالاسم، الرقم العسكري (MIL-xxx)، أو الرتبة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-9 pl-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Filter by Tawka */}
            <div>
              <select
                value={filterTawka}
                onChange={(e) => setFilterTawka(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">جميع التوكات التكتيكية</option>
                <option value="tawka-1">التوكة 1 - مدرعات الفهد</option>
                <option value="tawka-2">التوكة 2 - طاقم الصيانة الآلية</option>
                <option value="tawka-3">التوكة 3 - الدعم الإمدادي</option>
              </select>
            </div>

            {/* Filter by Status */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">جميع حالات الحضور</option>
                <option value="PRESENT">حاضر (Present)</option>
                <option value="LATE">متأخر (Late)</option>
                <option value="ABSENT">غائب (Absent)</option>
                <option value="LEAVE">إجازة (Leave)</option>
                <option value="MISSION">مهمة ميدانية (Mission)</option>
                <option value="DAILY_SERVICE">خدمة يومية (Daily Service)</option>
              </select>
            </div>

            {/* Filter by Rank */}
            <div>
              <select
                value={filterRank}
                onChange={(e) => setFilterRank(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">جميع الرتب العسكرية</option>
                <option value="رئيس رقباء">رئيس رقباء</option>
                <option value="رقيب أول">رقيب أول</option>
                <option value="رقيب">رقيب</option>
                <option value="عريف">عريف</option>
                <option value="جندي أول">جندي أول</option>
                <option value="جندي">جندي</option>
              </select>
            </div>
          </div>

          {/* TABLE OF ATTENDANCE RECORDS */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-950 text-amber-300 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">الرقم العسكري</th>
                  <th className="p-3">الاسم والحمد</th>
                  <th className="p-3">الرتبة والتكليف</th>
                  <th className="p-3">وقت الحضور</th>
                  <th className="p-3">الحالة الانضباطية</th>
                  <th className="p-3">طريقة الإثبات والموقع</th>
                  <th className="p-3">الملاحظات</th>
                  <th className="p-3 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
                {filteredRecords.map((rec) => {
                  const badge = getStatusBadge(rec.status);
                  const Icon = badge.icon;

                  return (
                    <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-emerald-400">{rec.militaryId}</td>
                      <td className="p-3 font-bold text-white">{rec.fullName}</td>
                      <td className="p-3 text-slate-300">
                        <span className="block font-bold text-amber-300">{rec.rank}</span>
                        <span className="text-[10px] text-slate-400">{rec.tawkaName}</span>
                      </td>
                      <td className="p-3 font-mono">
                        <span className="block font-bold text-white">{rec.checkInTime || '-'}</span>
                        {rec.delayMinutes ? (
                          <span className="text-[10px] text-amber-400 font-bold">تأخير: +{rec.delayMinutes} دقيقة</span>
                        ) : null}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold border ${badge.color}`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{badge.label}</span>
                        </span>
                      </td>
                      <td className="p-3 text-slate-300 text-[11px]">
                        <span className="block font-bold text-slate-200">{rec.checkInDevice}</span>
                        <span className="text-[10px] text-slate-400 line-clamp-1">{rec.checkInLocation.locationName}</span>
                      </td>
                      <td className="p-3 text-slate-300 text-[11px] max-w-xs">{rec.notes || '-'}</td>
                      <td className="p-3 text-center">
                        {(role === 'COMMANDER' || role === 'SUPERVISOR_1') && (
                          <button
                            onClick={() => setEditingRecord(rec)}
                            className="p-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/40 transition-colors"
                            title="تعديل الحالة الإدارية"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 4: LEAVE REQUESTS MANAGEMENT */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'LEAVES' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                نظام إدارة طلبات الإجازات الميدانية والطارئة
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                تقديم طلبات الإجازة للفرد، الاعتماد المالي والإداري من الآمر والمشرف
              </p>
            </div>

            <button
              onClick={() => setIsLeaveModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black rounded-2xl shadow-lg flex items-center gap-2 text-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>تقديم طلب إجازة جديد</span>
            </button>
          </div>

          {/* LEAVE REQUESTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaveRequests.map((req) => (
              <div key={req.id} className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                  <div>
                    <h4 className="font-bold text-white text-xs">{req.fullName}</h4>
                    <span className="text-[10px] text-amber-300 font-mono">{req.rank} | {req.militaryId}</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${
                      req.status === 'APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : req.status === 'REJECTED'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {req.status === 'APPROVED' ? 'معتمدة' : req.status === 'REJECTED' ? 'مرفوضة' : 'بانتظار الاعتماد'}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">نوع الإجازة:</span>
                    <span className="font-bold text-purple-300">
                      {req.leaveType === 'ANNUAL'
                        ? 'إجازة ميدانية / سنوية'
                        : req.leaveType === 'EMERGENCY'
                        ? 'إجازة طارئة'
                        : req.leaveType === 'MEDICAL'
                        ? 'إجازة مرضية'
                        : 'إجازة رسمية'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">تاريخ البدء والانتهاء:</span>
                    <span className="font-bold text-white font-mono">
                      {req.startDate} إلى {req.endDate}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">عدد الأيام المطلوبة:</span>
                    <span className="font-bold text-amber-400 font-mono">{req.daysCount} أيام</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                  <span className="text-slate-500 font-bold block text-[10px]">مبررات الطلب:</span>
                  {req.reason}
                </div>

                {/* Approver Actions */}
                {req.status === 'PENDING' && (role === 'COMMANDER' || role === 'SUPERVISOR_1') && (
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                    <button
                      onClick={() => handleApproveLeave(req.id)}
                      className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all text-center"
                    >
                      موافقة
                    </button>
                    <button
                      onClick={() => handleRejectLeave(req.id)}
                      className="py-2 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold rounded-xl transition-all text-center"
                    >
                      رفض
                    </button>
                  </div>
                )}

                {req.approvedBy && (
                  <div className="text-[10px] text-emerald-400 font-mono pt-1">
                    المعتمد: {req.approvedBy}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 5: REPORTS & PRINTING CENTRE */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'REPORTS' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Printer className="w-5 h-5 text-cyan-400" />
                مركز إصدار التقارير العسكرية والطباعة والتصدير
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                توليد كشوفات الحضور اليومية والأسبوعية بختم وحدة المدرعات الرسمي
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Report Types Selector */}
            <div className="space-y-2 bg-slate-950 p-4 rounded-3xl border border-slate-800 text-xs">
              <h4 className="font-bold text-amber-400 border-b border-slate-800 pb-2">اختر نوع التقرير المطلوب:</h4>

              <button
                onClick={() => setSelectedReportType('DAILY')}
                className={`w-full p-3 rounded-2xl text-right font-bold transition-all ${
                  selectedReportType === 'DAILY'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                1. التقرير اليومي العام للحضور
              </button>

              <button
                onClick={() => setSelectedReportType('WEEKLY')}
                className={`w-full p-3 rounded-2xl text-right font-bold transition-all ${
                  selectedReportType === 'WEEKLY'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                2. الكشف الأسبوعي للجاهزية
              </button>

              <button
                onClick={() => setSelectedReportType('MONTHLY')}
                className={`w-full p-3 rounded-2xl text-right font-bold transition-all ${
                  selectedReportType === 'MONTHLY'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                3. البيان الشهري الشامل
              </button>

              <button
                onClick={() => setSelectedReportType('LATE')}
                className={`w-full p-3 rounded-2xl text-right font-bold transition-all ${
                  selectedReportType === 'LATE'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                4. كشف التأخيرات والانضباط
              </button>

              <button
                onClick={() => setSelectedReportType('ABSENT')}
                className={`w-full p-3 rounded-2xl text-right font-bold transition-all ${
                  selectedReportType === 'ABSENT'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                5. بيان الغياب والمخالفات
              </button>

              <button
                onClick={() => setSelectedReportType('LEAVE')}
                className={`w-full p-3 rounded-2xl text-right font-bold transition-all ${
                  selectedReportType === 'LEAVE'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                6. كشف الإجازات الميدانية
              </button>
            </div>

            {/* Official Report Preview Box */}
            <div className="md:col-span-3 p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="font-bold text-amber-300 text-xs flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  المعاينة الرسمية للتقرير المعتمد (Official Military Report Preview)
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (onOpenPrintModal) {
                        onOpenPrintModal('تقرير الحضور والانضباط الرسمي', 'التقرير الميداني الصادر من قيادة وحدة المدرعات.');
                      } else {
                        window.print();
                      }
                    }}
                    className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>طباعة التقرير</span>
                  </button>

                  <button
                    onClick={() => alert('جاري تصدير التقرير بصيغة PDF المشفرة...')}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تصدير PDF</span>
                  </button>

                  <button
                    onClick={() => alert('جاري تصدير البيان بصيغة Excel/CSV...')}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>تصدير Excel</span>
                  </button>
                </div>
              </div>

              {/* Official Military Document Layout */}
              <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 space-y-6 text-xs text-white">
                {/* Header Header Seals */}
                <div className="flex justify-between items-center border-b-2 border-amber-500/40 pb-4 text-[11px]">
                  <div className="text-right space-y-0.5">
                    <p className="font-bold text-amber-300">المملكة العربية السعودية</p>
                    <p className="font-bold">قيادة وحدة المدرعات والدعم الآلي</p>
                    <p className="text-slate-400">شعبة القوة البشرية والانضباط العسكري</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-lg mb-1">
                      🛡️
                    </div>
                    <span className="font-mono text-[9px] text-amber-400 block font-bold">سري وخاص</span>
                  </div>

                  <div className="text-left font-mono space-y-0.5 text-slate-300">
                    <p>رقم البيان: REP-2026-0804</p>
                    <p>التاريخ: 1448/02/21 هـ</p>
                    <p>الموافق: 2026/08/04 م</p>
                  </div>
                </div>

                {/* Report Title */}
                <div className="text-center space-y-1">
                  <h3 className="text-sm font-black text-amber-400 underline underline-offset-8">
                    {selectedReportType === 'DAILY' && 'التقرير اليومي الموحد لموقف الحضور والجاهزية القتالية'}
                    {selectedReportType === 'WEEKLY' && 'الكشف الأسبوعي لمستوى الانضباط والخدمات الميدانية'}
                    {selectedReportType === 'MONTHLY' && 'التقرير الشهري التراكمي للحضور والإجازات'}
                    {selectedReportType === 'LATE' && 'بيان حالات التأخير اليومي وتأثيرها على التقييم'}
                    {selectedReportType === 'ABSENT' && 'كشف حالات الغياب غير المبرر والإجراءات الانضباطية'}
                    {selectedReportType === 'LEAVE' && 'بيان الإجازات الميدانية والسنوية المعتمدة'}
                  </h3>
                </div>

                {/* Report Data Summary */}
                <div className="grid grid-cols-4 gap-3 text-center bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px]">القوة المسجلة:</span>
                    <span className="font-bold text-white font-mono">{totalCount} مقاتل</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">نسبة الحضور:</span>
                    <span className="font-bold text-emerald-400 font-mono">{attendanceRate}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">الموجود بالخدمة:</span>
                    <span className="font-bold text-amber-300 font-mono">{presentCount} فرد</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">الإجازات والمهام:</span>
                    <span className="font-bold text-purple-300 font-mono">{leaveCount + missionCount} فرد</span>
                  </div>
                </div>

                {/* Report Sample Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-right text-[11px]">
                    <thead className="bg-slate-950 text-amber-300 font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-2">م</th>
                        <th className="p-2">الرقم العسكري</th>
                        <th className="p-2">الاسم</th>
                        <th className="p-2">الرتبة</th>
                        <th className="p-2">التوكة</th>
                        <th className="p-2">وقت الحضور</th>
                        <th className="p-2">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {records.slice(0, 5).map((r, i) => (
                        <tr key={r.id}>
                          <td className="p-2 font-mono">{i + 1}</td>
                          <td className="p-2 font-mono font-bold text-emerald-400">{r.militaryId}</td>
                          <td className="p-2 font-bold text-white">{r.fullName}</td>
                          <td className="p-2">{r.rank}</td>
                          <td className="p-2">{r.tawkaName}</td>
                          <td className="p-2 font-mono">{r.checkInTime || '-'}</td>
                          <td className="p-2 font-bold text-amber-300">{r.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Signature Block */}
                <div className="pt-6 grid grid-cols-2 text-center text-[11px]">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-400">ضابط خفر القوة البشرية:</p>
                    <p className="font-bold text-white">الرائد / طارق العتيبي</p>
                    <p className="text-[9px] text-slate-500 font-mono">[توقيع إلكتروني مشفر]</p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-amber-400">يعتمد / آمر وحدة المدرعات والدعم الآلي:</p>
                    <p className="font-bold text-white">العميد الركن / سعود القحطاني</p>
                    <p className="text-[9px] text-amber-500/80 font-mono">[ختم القيادة المعتمد - AES-256]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 6: STATISTICS & PERFORMANCE IMPACT */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'STATISTICS' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                تحليل المؤشرات الانضباطية والأثر على التقييم الميداني
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                تأثير معدلات الحضور والتأخير والغياب على نُقاط المنسوبين والأنواط والتقييم الشهري
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-amber-400">جدول احتساب الأثر على النقاط:</h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span>حضور كامل للشهر بدون تأخير:</span>
                  <span className="font-bold text-emerald-400">+10 نقاط تميز</span>
                </li>
                <li className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span>تأخير أقل من 15 دقيقة:</span>
                  <span className="font-bold text-amber-400">-1 نقطة / كل مرة</span>
                </li>
                <li className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span>تأخير أكثر من 30 دقيقة:</span>
                  <span className="font-bold text-rose-400">-3 نقاط / حجز إداري</span>
                </li>
                <li className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span>غياب غير مبرر:</span>
                  <span className="font-bold text-rose-500 font-mono">-10 نقاط + جزاء رسمي</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
              <h4 className="font-bold text-cyan-400">أعلى المقاتلين انضباطاً خلال الشهر الحالي:</h4>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-slate-900 border border-emerald-900/60 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center font-mono">
                      1
                    </span>
                    <div>
                      <span className="font-bold text-white block">رئيس رقباء / عبدالله القحطاني</span>
                      <span className="text-[10px] text-slate-400 font-mono">MIL-88421 | التوكة 1</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="font-black text-emerald-400 text-sm block font-mono">100%</span>
                    <span className="text-[9px] text-amber-400 font-bold">نوط الانضباط المستحق</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center font-mono">
                      2
                    </span>
                    <div>
                      <span className="font-bold text-white block">رقيب / محمد العنزي</span>
                      <span className="text-[10px] text-slate-400 font-mono">MIL-88423 | التوكة 1</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="font-black text-emerald-400 text-sm block font-mono">98%</span>
                    <span className="text-[9px] text-slate-400 font-bold">خفر ممتاز</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 7: DATABASE SCHEMA & REST API SPECIFICATIONS */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'DATABASE_API' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-xs text-white">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                مخطط قواعد البيانات وتوثيق REST APIs للربط مع المنظومات
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                جداول SQL الكاملة والعلاقات البرمجية ونقاط النهاية (REST Endpoints) للربط مع الأنظمة الخارجية
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Database SQL DDL Schema */}
            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Database className="w-4 h-4" />
                  جداول قاعدة البيانات (SQL DDL Schema):
                </h4>
                <button
                  onClick={() => alert('تم نسخ سكريبت SQL لقافظة الجهاز')}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 text-[10px] font-bold rounded-lg"
                >
                  نسخ SQL Script
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-[10px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
{`-- SQL Schema for Armored Unit Attendance System
CREATE TABLE tawkas (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    commander_id VARCHAR(50)
);

CREATE TABLE soldiers (
    military_id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    rank VARCHAR(50) NOT NULL,
    tawka_id VARCHAR(50) REFERENCES tawkas(id),
    phone VARCHAR(30)
);

CREATE TABLE attendance_records (
    id VARCHAR(50) PRIMARY KEY,
    military_id VARCHAR(50) REFERENCES soldiers(military_id),
    date DATE NOT NULL,
    check_in_time TIMESTAMP,
    check_out_time TIMESTAMP,
    status VARCHAR(30) NOT NULL, -- PRESENT, ABSENT, LATE, LEAVE, etc.
    device_id VARCHAR(100),
    latitude NUMERIC(10,8),
    longitude NUMERIC(11,8),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leave_requests (
    id VARCHAR(50) PRIMARY KEY,
    military_id VARCHAR(50) REFERENCES soldiers(military_id),
    leave_type VARCHAR(30) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days_count INT NOT NULL,
    reason TEXT,
    status VARCHAR(30) DEFAULT 'PENDING',
    approved_by VARCHAR(50)
);`}
              </pre>
            </div>

            {/* REST API Endpoints Specs */}
            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="font-bold text-amber-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <Code2 className="w-4 h-4" />
                تحديد نقاط REST API للأنظمة الرقمية:
              </h4>

              <div className="space-y-2 text-[11px] font-mono">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-[9px]">
                      POST
                    </span>
                    <span className="font-bold text-white">/api/v1/attendance/check-in</span>
                  </div>
                  <p className="text-slate-400 text-[10px] font-sans">
                    تسجيل الحضور بالبصمة البيومترية والموقع الجغرافي (GPS payload).
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold border border-cyan-800 text-[9px]">
                      GET
                    </span>
                    <span className="font-bold text-white">/api/v1/attendance/records</span>
                  </div>
                  <p className="text-slate-400 text-[10px] font-sans">
                    استعلام كامل السجلات مع يدعم التصفية حسب التاريخ، التوكة، والرقم العسكري.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-400 font-bold border border-purple-800 text-[9px]">
                      POST
                    </span>
                    <span className="font-bold text-white">/api/v1/leaves/request</span>
                  </div>
                  <p className="text-slate-400 text-[10px] font-sans">
                    إنشاء طلب إجازة ميدانية جديد من تطبيق الجوال.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-bold border border-amber-800 text-[9px]">
                      PATCH
                    </span>
                    <span className="font-bold text-white">/api/v1/leaves/:id/approve</span>
                  </div>
                  <p className="text-slate-400 text-[10px] font-sans">
                    توقيع واعتماد طلب الإجازة إدارياً من قبل الآمر.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* MODAL: EDIT ATTENDANCE RECORD (COMMANDER/SUPERVISOR) */}
      {/* ----------------------------------------------------------------- */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl p-6 space-y-5 text-xs text-white shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                <Edit className="w-4 h-4" />
                تعديل حالة الحضور الإدارية للمقاتل
              </h3>
              <button
                onClick={() => setEditingRecord(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-slate-400 block text-[10px]">المقاتل:</span>
                <span className="font-bold text-white text-sm">{editingRecord.fullName}</span>
                <span className="text-[10px] text-amber-300 font-mono block">{editingRecord.militaryId}</span>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">حالة الحضور المطلوبة:</label>
                <select
                  value={editingRecord.status}
                  onChange={(e) =>
                    setEditingRecord({
                      ...editingRecord,
                      status: e.target.value as AttendanceStatusType,
                    })
                  }
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="PRESENT">حاضر (PRESENT)</option>
                  <option value="LATE">متأخر (LATE)</option>
                  <option value="EXCUSED">معذور (EXCUSED)</option>
                  <option value="ABSENT">غائب (ABSENT)</option>
                  <option value="LEAVE">إجازة (LEAVE)</option>
                  <option value="MISSION">مهمة ميدانية (MISSION)</option>
                  <option value="DAILY_SERVICE">خدمة يومية / خفر (DAILY_SERVICE)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">ملاحظات التعديل والسبب القيادي:</label>
                <textarea
                  rows={3}
                  value={editingRecord.notes || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord, notes: e.target.value })}
                  placeholder="أدخل مبررات التعديل العسكري..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSaveEditedRecord}
                className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-2xl shadow-lg transition-all"
              >
                حفظ التغييرات المعتمدة
              </button>
              <button
                onClick={() => setEditingRecord(null)}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl border border-slate-700"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* MODAL: CREATE NEW LEAVE REQUEST */}
      {/* ----------------------------------------------------------------- */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateLeaveRequest}
            className="w-full max-w-lg bg-slate-900 border border-purple-500/40 rounded-3xl p-6 space-y-5 text-xs text-white shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-purple-400 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                تقديم طلب إجازة ميدانية جديد
              </h3>
              <button
                type="button"
                onClick={() => setIsLeaveModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">نوع الإجازة المطلوبة:</label>
                <select
                  value={newLeaveType}
                  onChange={(e) => setNewLeaveType(e.target.value as any)}
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="ANNUAL">إجازة ميدانية / سنوية</option>
                  <option value="EMERGENCY">إجازة طارئة</option>
                  <option value="MEDICAL">إجازة مرضية</option>
                  <option value="OFFICIAL">إجازة رسمية / تدريبية</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">تاريخ البدء:</label>
                  <input
                    type="date"
                    value={newLeaveStart}
                    onChange={(e) => setNewLeaveStart(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">تاريخ العودة:</label>
                  <input
                    type="date"
                    value={newLeaveEnd}
                    onChange={(e) => setNewLeaveEnd(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">مبررات وسَبب طلب الإجازة:</label>
                <textarea
                  rows={3}
                  required
                  value={newLeaveReason}
                  onChange={(e) => setNewLeaveReason(e.target.value)}
                  placeholder="اكتب أسباب الإجازة والمكان المقصود أثناء الإجازة..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-purple-500"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl shadow-lg transition-all"
              >
                إرسال الطلب للمشرف وآمر الوحدة
              </button>
              <button
                type="button"
                onClick={() => setIsLeaveModalOpen(false)}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl border border-slate-700"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
