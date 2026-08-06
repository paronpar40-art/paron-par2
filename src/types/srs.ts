export type UserRole = 'COMMANDER' | 'SUPERVISOR_1' | 'SUPERVISOR_2' | 'ELEMENT';

export type TawkaId = 'tawka-1' | 'tawka-2' | 'tawka-3' | 'tawka-4';

export interface TawkaInfo {
  id: TawkaId;
  name: string;
  codeName: string;
  specialization: string;
  leaderName: string;
  leaderRank: string;
  personnelCount: number;
  armorAssets: string[];
  readinessPercentage: number;
  description: string;
  shiftSchedule: string;
}

export interface PermissionItem {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
  print: boolean;
  notes?: string;
}

export interface RolePermissions {
  role: UserRole;
  title: string;
  titleAr: string;
  description: string;
  permissions: PermissionItem[];
}

export interface SystemModuleSpec {
  id: string;
  nameAr: string;
  nameEn: string;
  iconName: string;
  summary: string;
  objective: string;
  keyFeatures: string[];
  inputs: string[];
  outputs: string[];
  userRolesAllowed: UserRole[];
  businessRulesRelated: string[];
}

export interface BusinessRule {
  id: string; // e.g. BR-01
  title: string;
  category: 'حضور وإجازات' | 'خدمات وقوة' | 'أوامر وانضباط' | 'أمن وصلاحيات';
  description: string;
  enforcementLevel: 'صارم (ممتنع)' | 'تحذيري' | 'بموافقة الآمر';
  impact: string;
}

export interface UseCase {
  id: string; // e.g. UC-01
  title: string;
  actor: string;
  description: string;
  preConditions: string[];
  mainFlow: string[];
  alternativeFlows: string[];
  postConditions: string[];
  relatedModule: string;
}

export interface UserFlowScenario {
  id: string;
  title: string;
  description: string;
  steps: {
    stepNumber: number;
    actor: string;
    action: string;
    systemResponse: string;
  }[];
}

export interface SystemRequirement {
  id: string;
  category: 'وظيفية (Functional)' | 'غير وظيفية (Non-Functional)' | 'أمنية (Security)' | 'مستقبلية (Future)';
  title: string;
  description: string;
  priority: 'عالية جداً (Must Have)' | 'عالية (Should Have)' | 'متوسطة (Nice to Have)';
}

// Data models for the prototype application
export interface Personnel {
  id: string;
  militaryId: string;
  name: string;
  rank: string;
  role: UserRole;
  tawkaId: TawkaId;
  specialization: string;
  status: 'حاضر' | 'في الخدمة' | 'إجازة' | 'غائب' | 'مأمورية';
  phone: string;
  joiningDate: string;
  evaluationScore: number; // 0 - 100
  photoUrl?: string;
}

export interface AttendanceRecord {
  id: string;
  personnelId: string;
  personnelName: string;
  rank: string;
  tawkaId: TawkaId;
  date: string;
  timeIn: string;
  timeOut?: string;
  status: 'حاضر' | 'متأخر' | 'غائب بعذر' | 'غائب بدون عذر' | 'مجاز';
  entryMethod: 'بصمة' | 'بطاقة ذكية' | 'تسجيل إداري';
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  personnelId: string;
  personnelName: string;
  rank: string;
  tawkaId: TawkaId;
  leaveType: 'ميدانية' | 'مرضية' | 'طارئة' | 'إدارية';
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: 'معلقة' | 'موافق عليها (المشرف)' | 'موافق عليها نهائياً (الآمر)' | 'مرفوضة';
  supervisorApprovalDate?: string;
  commanderApprovalDate?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface DutyShift {
  id: string;
  date: string;
  dutyOfficerId: string;
  dutyOfficerName: string;
  dutyOfficerRank: string;
  shiftType: 'صباحية' | 'مسائية' | 'ليلي كامل';
  tawkaInCharge: TawkaId;
  guardPosts: {
    postName: string; // e.g. برج الحراسة الشمالي, البوابة الرئيسية, مستودع الذخيرة
    personnelName: string;
    rank: string;
    startTime: string;
    endTime: string;
    status: 'ملتزم' | 'تبديل' | 'ملاحظة';
  }[];
  officerLogNotes: string;
  ammunitionCheckStatus: 'سليم وتطابق تام' | 'ملاحظات خفيفة' | 'بلاغ طارئ';
  vehiclesCheckStatus: 'جاهزية 100%' | 'صيانة دورية' | 'أعطال بسيطة';
  isSignedByCommander: boolean;
}

export interface TacticalTask {
  id: string;
  title: string;
  description: string;
  assignedToTawka: TawkaId;
  assignedByRole: string;
  priority: 'حرج للغاية' | 'عالي' | 'عادي';
  dueDate: string;
  status: 'قيد الانتظار' | 'جاري التنفيذ' | 'مكتمل' | 'متأخر';
  completionPercentage: number;
}

export interface DailyOrder {
  id: string;
  orderNumber: string;
  date: string;
  title: string;
  content: string;
  category: 'توجيهات عسكرية' | 'تنقلات وتكليفات' | 'تعليمات انضباطية' | 'رفع جاهزية';
  issuedByRank: string;
  issuedByName: string;
  targetTawkas: (TawkaId | 'الجميع')[];
  importance: 'عاجل وهام' | 'روتين يومي' | 'سري ومكتوم';
  readConfirmationsCount: number;
  totalPersonnelTargeted: number;
}

export interface RewardPenaltyRecord {
  id: string;
  personnelId: string;
  personnelName: string;
  rank: string;
  tawkaId: TawkaId;
  type: 'مكافأة' | 'جزاء';
  category: 'كتاب شكر' | 'إجازة تشجيعية' | 'مكافأة مالية' | 'لفت نظر' | 'حجز انضباطي' | 'خصم إداري';
  reason: string;
  issuedBy: string;
  date: string;
  impactOnScore: number; // e.g. +5 or -10
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  actionType: 'إضافة' | 'تعديل' | 'حذف' | 'اعتماد' | 'طباعة' | 'تسجيل دخول';
  moduleAffected: string;
  description: string;
  ipAddress: string;
}
