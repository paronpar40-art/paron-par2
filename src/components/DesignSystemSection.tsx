import React, { useState } from 'react';
import {
  Palette,
  Type,
  Maximize,
  Sliders,
  Smartphone,
  Tablet,
  Monitor,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Clock,
  UserCheck,
  UserX,
  Calendar,
  FileText,
  Award,
  AlertCircle,
  Search,
  Bell,
  Lock,
  QrCode,
  Sparkles,
  ChevronRight,
  Menu,
  ChevronDown,
  Activity,
  Layers,
  Copy,
  Download,
  Filter,
  Check,
  Zap,
  Radio,
  BarChart2,
  List,
  Grid,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Key,
  KeyRound,
  ShieldAlert,
  ArrowRight,
  UserCog,
  History,
  Settings,
  User,
  X,
  FileCheck,
  Eye,
  Plus
} from 'lucide-react';

interface DesignSystemSectionProps {
  isDarkTheme?: boolean;
}

export const DesignSystemSection: React.FC<DesignSystemSectionProps> = ({ isDarkTheme = true }) => {
  const [activeCategory, setActiveCategory] = useState<'FOUNDATION' | 'COMPONENTS' | 'SCREENS' | 'NAVIGATION'>('SCREENS');
  const [deviceFrame, setDeviceFrame] = useState<'MOBILE' | 'TABLET' | 'DESKTOP'>('DESKTOP');
  const [screenView, setScreenView] = useState<
    'COMMANDER' | 'SUPERVISOR' | 'SOLDIER' | 'AUTH' | 'ATTENDANCE' | 'SERVICE' | 'ORDERS' | 'TASKS' | 'REWARDS_EVAL' | 'AUDIT_SETTINGS' | 'STATES'
  >('COMMANDER');
  
  // Interactive UI component states
  const [authStep, setAuthStep] = useState<'SPLASH' | 'LOGIN' | 'FORGOT' | 'CHANGE_PIN'>('LOGIN');
  const [searchVal, setSearchVal] = useState('');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeModalDemo, setActiveModalDemo] = useState<boolean>(false);
  const [buttonLoadingDemo, setButtonLoadingDemo] = useState<boolean>(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className={`p-4 sm:p-8 rounded-3xl border transition-all space-y-8 ${
      isDarkTheme ? 'bg-slate-900/95 border-amber-800/50 shadow-2xl text-slate-100' : 'bg-white border-amber-200 shadow-xl text-slate-900'
    }`}>
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-amber-800/30">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-600/20 border border-amber-500/40 text-amber-400">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-500 tracking-wider uppercase font-mono">
                RTL Enterprise Military Design System v3.5
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                دليل نظام التصميم ومكتبة المكونات الشاملة (جهاز الردع)
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2 max-w-3xl leading-relaxed">
            نظام تصميم متكامل ومصمم بأسلوب عسكري قيادي (Material Design 3) مع دعم كامل للغة العربية من اليمين إلى اليسار (RTL)، والمظهر المظلم، ومتوافق مع شاشات الهاتف (Android / iPhone)، التابلت، وصفحات التحكم القيادية.
          </p>
        </div>

        {/* Device View Selector */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
          <button
            onClick={() => setDeviceFrame('DESKTOP')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              deviceFrame === 'DESKTOP' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">سطح المكتب</span>
          </button>
          <button
            onClick={() => setDeviceFrame('TABLET')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              deviceFrame === 'TABLET' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline">تابلت</span>
          </button>
          <button
            onClick={() => setDeviceFrame('MOBILE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              deviceFrame === 'MOBILE' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">جوال (iOS/Android)</span>
          </button>
        </div>
      </div>

      {/* Primary Design System Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto scrollbar-none text-xs font-bold">
        <button
          onClick={() => setActiveCategory('SCREENS')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeCategory === 'SCREENS'
              ? 'border-amber-500 text-amber-400 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>الشاشات المكتملة بشكل منفصل (Detailed Screens)</span>
        </button>

        <button
          onClick={() => setActiveCategory('COMPONENTS')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeCategory === 'COMPONENTS'
              ? 'border-amber-500 text-amber-400 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>مكتبة المكونات التفاعلية (Component Library)</span>
        </button>

        <button
          onClick={() => setActiveCategory('FOUNDATION')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeCategory === 'FOUNDATION'
              ? 'border-amber-500 text-amber-400 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>الأساسيات والرموز (Design Tokens & Color)</span>
        </button>

        <button
          onClick={() => setActiveCategory('NAVIGATION')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeCategory === 'NAVIGATION'
              ? 'border-amber-500 text-amber-400 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Menu className="w-4 h-4" />
          <span>أنماط التنقل والقوائم (Navigation UX)</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* SECTION 1: DETAILED SEPARATE SCREEN MOCKUPS */}
      {/* =================================================================== */}
      {activeCategory === 'SCREENS' && (
        <div className="space-y-6">
          {/* Sub Switcher for All Screens Requested */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
            {[
              { id: 'COMMANDER', label: 'لوحة القيادة (آمر الكتيبة)', icon: Shield },
              { id: 'SUPERVISOR', label: 'لوحة المشرفين (التوكات)', icon: UserCheck },
              { id: 'SOLDIER', label: 'لوحة المقاتل / العنصر', icon: Radio },
              { id: 'AUTH', label: 'تسجيل الدخول والأمان (Auth)', icon: Lock },
              { id: 'ATTENDANCE', label: 'الحضور والبصمة (Attendance)', icon: QrCode },
              { id: 'SERVICE', label: 'الخدمة اليومية وخفر الأبراج', icon: ShieldAlert },
              { id: 'ORDERS', label: 'الأوامر اليومية والنشرات', icon: FileText },
              { id: 'TASKS', label: 'المهام والتقارير الميدانية', icon: CheckCircle2 },
              { id: 'REWARDS_EVAL', label: 'المكافآت والجزاءات والتقييم', icon: Award },
              { id: 'AUDIT_SETTINGS', label: 'الأرشيف وسجل التدقيق والضبط', icon: History },
              { id: 'STATES', label: 'حالات النظام والتنبيهات', icon: AlertCircle },
            ].map((screen) => {
              const Icon = screen.icon;
              return (
                <button
                  key={screen.id}
                  onClick={() => setScreenView(screen.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                    screenView === screen.id
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{screen.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Responsive Frame Container */}
          <div className={`mx-auto transition-all duration-300 ${
            deviceFrame === 'MOBILE' ? 'max-w-[390px]' : deviceFrame === 'TABLET' ? 'max-w-[768px]' : 'w-full'
          }`}>
            <div className={`rounded-3xl border overflow-hidden shadow-2xl ${
              deviceFrame === 'MOBILE' ? 'border-amber-700/80 ring-8 ring-slate-950' : 'border-slate-800'
            } bg-slate-950`}>

              {/* Device Frame Notch Header */}
              {deviceFrame === 'MOBILE' && (
                <div className="bg-slate-950 text-slate-400 px-6 py-2 border-b border-slate-900 flex justify-between items-center text-[10px] font-mono">
                  <span>08:45 AM</span>
                  <div className="w-16 h-3 bg-slate-900 rounded-full mx-auto"></div>
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <span>🔋 98%</span>
                  </div>
                </div>
              )}

              {/* SCREEN CONTENT VIEWPORT */}
              <div className="p-4 sm:p-6 space-y-6">

                {/* 1. COMMANDER DASHBOARD */}
                {screenView === 'COMMANDER' && (
                  <div className="space-y-6">
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-amber-950/90 via-slate-900 to-emerald-950/40 border border-amber-800/40 p-4 rounded-2xl flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="text-xs font-bold text-amber-400">جهاز الردع - مركز القيادة الميداني</span>
                        </div>
                        <h3 className="text-lg font-black text-white mt-1">العميد الركن / سعود بن عبد العزيز القحطاني</h3>
                        <p className="text-[11px] text-slate-400">آمر وحدة المدرعات والدعم الآلي - كود القيادة: AU-HQ-01</p>
                      </div>

                      <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
                        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-3 py-1 rounded-xl font-bold">
                          الجاهزية الكلية: 88.5%
                        </span>
                      </div>
                    </div>

                    {/* 12 Core Commander Widgets */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-slate-400 text-[11px]">إجمالي القوة البشرية</div>
                        <div className="text-xl font-black text-white font-mono">1,240 <span className="text-xs font-normal text-slate-400">مقابل</span></div>
                        <div className="text-[10px] text-emerald-400">4 توكات قتالية</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-900/40 space-y-1">
                        <div className="text-slate-400 text-[11px]">الحاضرون الآن بالوحدة</div>
                        <div className="text-xl font-black text-emerald-400 font-mono">1,098</div>
                        <div className="text-[10px] text-emerald-400 font-bold">88.5% (تجاوز BR-01)</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-slate-400 text-[11px]">في الإجازات الرسمية</div>
                        <div className="text-xl font-black text-amber-400 font-mono">112</div>
                        <div className="text-[10px] text-slate-400">9% من القوة</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-rose-900/40 space-y-1">
                        <div className="text-slate-400 text-[11px]">الغياب والانقطاع</div>
                        <div className="text-xl font-black text-rose-400 font-mono">3 <span className="text-xs font-normal text-rose-400">أفراد</span></div>
                        <div className="text-[10px] text-rose-400">تحت التحقيق الانضباطي</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-slate-400 text-[11px]">أفراد الخدمة والدرك</div>
                        <div className="text-xl font-black text-cyan-400 font-mono">48</div>
                        <div className="text-[10px] text-slate-400">12 برج حراسة</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-slate-400 text-[11px]">ضابط الخفر المناوب</div>
                        <div className="text-sm font-bold text-amber-300 truncate">الرائد / طارق العتيبي</div>
                        <div className="text-[10px] text-slate-400 font-mono">التوكة 2 (حراسة)</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-slate-400 text-[11px]">المهام الميدانية القائمة</div>
                        <div className="text-xl font-black text-teal-400 font-mono">14</div>
                        <div className="text-[10px] text-teal-400">85% نسبة الإنجاز</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-slate-400 text-[11px]">الأوامر اليومية النافذة</div>
                        <div className="text-xl font-black text-amber-400 font-mono">3 <span className="text-xs font-normal text-slate-400">أوامر</span></div>
                        <div className="text-[10px] text-slate-400">تأكيد القراءة: 94%</div>
                      </div>
                    </div>

                    {/* Chart & Live Activity Timeline */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 lg:col-span-2">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <h4 className="font-bold text-slate-200 flex items-center gap-2">
                            <BarChart2 className="w-4 h-4 text-amber-400" />
                            جاهزية التوكات القتالية الأربع (BR-01 Analytics)
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono">الحد الأدنى: 75%</span>
                        </div>

                        <div className="space-y-3 font-mono">
                          <div>
                            <div className="flex justify-between text-[11px] mb-1">
                              <span>التوكة 1 - الاستطلاع والصدمة</span>
                              <span className="text-emerald-400 font-bold">92%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[11px] mb-1">
                              <span>التوكة 2 - المدفعية والدعم الآلي</span>
                              <span className="text-emerald-400 font-bold">88%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[11px] mb-1">
                              <span>التوكة 3 - الصيانة الفنية والتأهيل</span>
                              <span className="text-amber-400 font-bold">78%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                        <div className="font-bold text-amber-400 text-xs border-b border-slate-800 pb-2 flex items-center justify-between">
                          <span>سجل التحركات المباشر (Audit Stream)</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        </div>

                        <div className="space-y-2 text-[11px]">
                          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-emerald-400 font-bold">اعتماد إجازة:</span>
                            <span className="text-slate-300 block">رئيس رقباء عبد الله العتيبي من الآمر.</span>
                            <span className="text-[9px] text-slate-500 font-mono">منذ 4 دقائق</span>
                          </div>

                          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-amber-400 font-bold">تسليم الخفر:</span>
                            <span className="text-slate-300 block">انتقال الخفر للتوكة 2 مع جرد الذخيرة.</span>
                            <span className="text-[9px] text-slate-500 font-mono">منذ 18 دقيقة</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SUPERVISOR DASHBOARD */}
                {screenView === 'SUPERVISOR' && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-amber-800/40 flex justify-between items-center">
                      <div>
                        <div className="text-xs text-amber-400 font-bold">جهاز الردع - لوحة الإشراف الميداني</div>
                        <h3 className="text-lg font-black text-white">المقدم الركن / خالد بن ناصر العتيبي</h3>
                        <p className="text-[11px] text-slate-400">أركان حرب الكتيبة - مشرف التوكة 1 وتأمين الأبراج</p>
                      </div>
                      <span className="px-3 py-1 bg-amber-600/30 text-amber-300 border border-amber-500/50 text-xs font-bold rounded-xl">
                        تسليم الخفر المعمد: 100%
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                        <h4 className="font-bold text-white border-b border-slate-800 pb-2">مهام الإشراف اليومية</h4>
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                            <span>مراجعة سجل البصمة الصباحي للتوكة 1</span>
                            <span className="text-emerald-400 font-bold">تم الانتهاء</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                            <span>جرد الذخيرة والخدمة بأبراج الحراسة 01 - 06</span>
                            <span className="text-amber-400 font-bold">قيد المراجعة</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                        <h4 className="font-bold text-white border-b border-slate-800 pb-2">طلبات الإجازة المعلقة بالمراجعة</h4>
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                          <div className="flex justify-between font-bold text-amber-300">
                            <span>رقيب / فهد السبيعي</span>
                            <span>إجازة ميدانية (5 أيام)</span>
                          </div>
                          <p className="text-[10px] text-slate-400">نسبة التوكة حالياً 88% - مستوفية للشرط BR-01</p>
                          <div className="flex gap-2 pt-1">
                            <button className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[10px]">رفع للآمر</button>
                            <button className="px-3 py-1 bg-rose-900/60 text-rose-200 font-bold rounded-lg text-[10px]">رفض الطلب</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. SOLDIER DASHBOARD */}
                {screenView === 'SOLDIER' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-800/60 flex justify-between items-center">
                      <div>
                        <div className="text-xs text-emerald-400 font-bold">لوحة المقاتل التكتيكية - جهاز الردع</div>
                        <h3 className="text-base font-black text-white">رئيس رقباء / عبد الله بن سالم العتيبي</h3>
                        <p className="text-[11px] text-slate-400 font-mono">التوكة 1 - الاستطلاع والصدمة | الرقم العسكري: MIL-8821</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-xl">
                        حالة الجاهزية: ممتاز (96%)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-slate-400">الخدمة اليومية القادمة</div>
                        <div className="font-bold text-amber-300">برج الحراسة الرئيسي 02</div>
                        <div className="text-[10px] text-slate-500 font-mono">النوبة المسائية (16:00 - 20:00)</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-slate-400">رصيد الإجازات المتبقي</div>
                        <div className="font-bold text-emerald-400 font-mono text-lg">18 يوماً</div>
                        <div className="text-[10px] text-slate-500">مسموح بالتقديم الان</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-slate-400">الأوامر اليومية المعلقة</div>
                        <div className="font-bold text-cyan-300 font-mono text-lg">1 أمر جديد</div>
                        <div className="text-[10px] text-cyan-400">يتطلب التأكيد والقراءة</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. AUTHENTICATION SCREENS */}
                {screenView === 'AUTH' && (
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="flex justify-center gap-2 mb-4 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
                      {(['SPLASH', 'LOGIN', 'FORGOT', 'CHANGE_PIN'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => setAuthStep(st)}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                            authStep === st ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {st === 'SPLASH' && 'شاشة الترحيب'}
                          {st === 'LOGIN' && 'تسجيل الدخول'}
                          {st === 'FORGOT' && 'استعادة المرور'}
                          {st === 'CHANGE_PIN' && 'تغيير الرمز'}
                        </button>
                      ))}
                    </div>

                    <div className="p-6 rounded-3xl bg-slate-900 border border-amber-800/60 shadow-2xl text-center space-y-6">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-600 to-amber-900 p-0.5 shadow-xl flex items-center justify-center">
                        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400 font-bold text-2xl">
                          ⚔️
                        </div>
                      </div>

                      {authStep === 'SPLASH' && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-black text-white">منظومة جهاز الردع - إدارة وحدة المدرعات</h3>
                          <p className="text-xs text-slate-400">النظام المشفر المعتمد لإدارة القوة الميدانية والجاهزية</p>
                          <button
                            onClick={() => setAuthStep('LOGIN')}
                            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
                          >
                            الدخول للخدمة العسكرية
                          </button>
                        </div>
                      )}

                      {authStep === 'LOGIN' && (
                        <div className="space-y-4 text-right">
                          <div className="text-center space-y-1">
                            <h3 className="text-base font-bold text-white">تسجيل الدخول الآمن (جهاز الردع)</h3>
                            <p className="text-[11px] text-slate-400">أدخل الرقم العسكري والرمز السري الخاص بك</p>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="text-[11px] text-slate-300 font-bold block mb-1">الرقم العسكري الرسمي</label>
                              <input
                                type="text"
                                defaultValue="MIL-2026-9901"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] text-slate-300 font-bold block mb-1">رمز المرور المشفر</label>
                              <input
                                type="password"
                                defaultValue="••••••••••••"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                              />
                            </div>

                            <button className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2">
                              <Key className="w-4 h-4" />
                              <span>دخول المنظومة العسكرية</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {authStep === 'FORGOT' && (
                        <div className="space-y-4 text-right">
                          <div className="text-center space-y-1">
                            <h3 className="text-base font-bold text-white">استعادة كلمة المرور العسكرية</h3>
                            <p className="text-[11px] text-slate-400">إرسال رمز التوثيق OTP للهاتف المعتمد</p>
                          </div>

                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="الرقم العسكري أو الهاتف..."
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100"
                            />
                            <button className="w-full py-3 bg-amber-600 text-white font-bold text-xs rounded-xl shadow-lg">
                              إرسال رمز التوثيق OTP
                            </button>
                          </div>
                        </div>
                      )}

                      {authStep === 'CHANGE_PIN' && (
                        <div className="space-y-4 text-right">
                          <div className="text-center space-y-1">
                            <h3 className="text-base font-bold text-white">تغيير رمز PIN العسكري</h3>
                            <p className="text-[11px] text-slate-400">رمز التأكيد المطلوب للقرارات القيادية</p>
                          </div>

                          <div className="space-y-3">
                            <input
                              type="password"
                              maxLength={4}
                              placeholder="••••"
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-center font-mono text-amber-400"
                            />
                            <button className="w-full py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg">
                              حفظ الرمز السري
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 5. ATTENDANCE & BIOMETRIC CHECK-IN */}
                {screenView === 'ATTENDANCE' && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-white text-sm">تسجيل الحضور والانصراف بالبصمة البيومترية</h3>
                        <p className="text-xs text-slate-400">ربط مباشر بقواعد الجاهزية اللحظية (BR-01)</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold rounded-xl font-mono">
                        Geofence Active 📍
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-3xl bg-slate-900 border border-amber-800/50 text-center space-y-4">
                        <div className="w-24 h-24 mx-auto rounded-full bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center text-amber-400 hover:bg-amber-500/20 transition-all cursor-pointer">
                          <QrCode className="w-10 h-10" />
                        </div>
                        <h4 className="font-bold text-white text-sm">مسح البصمة / بطاقة الذكاء</h4>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg">
                            تسجيل دخول (Check-in)
                          </button>
                          <button className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl border border-slate-700">
                            تسجيل خروج (Check-out)
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                        <div className="font-bold text-amber-400 border-b border-slate-800 pb-2">
                          سجل الحضور اللحظي للتوكة اليوم
                        </div>
                        <div className="space-y-2 font-mono">
                          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                            <span>عريف / محمد الشمري</span>
                            <span className="text-emerald-400 font-bold">06:02 AM حاضر</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                            <span>رقيب / فهد السبيعي</span>
                            <span className="text-amber-400 font-bold">06:14 AM متأخر</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. DAILY SERVICE & GUARD OFFICER */}
                {screenView === 'SERVICE' && (
                  <div className="space-y-6 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-800/40 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-white text-sm">جدول الخدمة اليومية وضابط الخفر المناوب</h3>
                        <p className="text-slate-400">توزيع التوكات على أبراج الحراسة 01 - 12 وقوة التأمين</p>
                      </div>
                      <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold rounded-xl font-mono">
                        Tawka-2 Duty
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="text-slate-400 font-bold">ضابط الخفر المناوب</div>
                        <div className="text-sm font-bold text-amber-300">الرائد / طارق العتيبي</div>
                        <div className="text-[10px] text-slate-500">من 08:00 AM إلى 08:00 AM (24 ساعة)</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="text-slate-400 font-bold">أفراد حراسة الأبراج (12 برج)</div>
                        <div className="text-sm font-bold text-emerald-400">36 فرداً (3 نوبات)</div>
                        <div className="text-[10px] text-emerald-400">مكتملة التغطية بالكامل</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="text-slate-400 font-bold">التسليم والتسلم المعمد</div>
                        <div className="text-sm font-bold text-cyan-400">تم جرد الذخيرة والمستودع</div>
                        <div className="text-[10px] text-slate-500 font-mono">Ref: HND-2026-09</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. DAILY ORDERS */}
                {screenView === 'ORDERS' && (
                  <div className="space-y-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-amber-800/40 flex justify-between items-center">
                      <h3 className="font-bold text-white text-sm">الأوامر اليومية والنشرات العسكرية المعمدة</h3>
                      <button className="px-3 py-1.5 bg-amber-600 text-white font-bold rounded-xl flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> إصدار أمر جديد
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-amber-300 text-sm">أمر يومي رقم (AU-ORD-2026-44) -رفع جاهزية التوكة 2</span>
                          <span className="px-2.5 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 rounded-lg text-[10px] font-bold">سري وعاجل</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          رفع جاهزية التوكة 2 للدرجة القصوى وتجهيز الآليات القتالية للتفتيش المفاجئ من قبل أركان حرب الكتيبة.
                        </p>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
                          <span>صادر من: العميد الركن سعود القحطاني</span>
                          <span>نسبة إقرار الاستلام: 94%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. TASKS & REPORTS */}
                {screenView === 'TASKS' && (
                  <div className="space-y-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <h3 className="font-bold text-white text-sm">المهام الميدانية والتقارير الفنية القائمة</h3>
                      <span className="text-emerald-400 font-bold font-mono">14 مهمة نشطة</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex justify-between font-bold text-white">
                          <span>صيانة مدرعات التوكة 3</span>
                          <span className="text-emerald-400">85% تم الإنجاز</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <p className="text-[11px] text-slate-400">مسؤول المهمة: الرائد طارق الزهراني | الموعد: اليوم 18:00</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. REWARDS, PENALTIES & EVALUATIONS */}
                {screenView === 'REWARDS_EVAL' && (
                  <div className="space-y-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-amber-800/40 flex justify-between items-center">
                      <h3 className="font-bold text-white text-sm">سجل المكافآت، الجزاءات، والتقييم التراكمي</h3>
                      <span className="text-amber-400 font-bold">ربط مباشر بنظام الرتب والرواتب</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-900/40 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold">
                          <Award className="w-4 h-4" />
                          <span>شرف التميز العسكري (مكافأة)</span>
                        </div>
                        <p className="text-slate-300">منح نوط الانضباط لرئيس رقباء عبد الله العتيبي لقيادته المثالية للخدمة.</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900 border border-rose-900/40 space-y-2">
                        <div className="flex items-center gap-2 text-rose-400 font-bold">
                          <AlertTriangle className="w-4 h-4" />
                          <span>حجز انضباطي (جزاء)</span>
                        </div>
                        <p className="text-slate-300">حجز لمدة 24 ساعة لعدم الالتزام بالتوقيت المحدد للبصمة الصباحية.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 10. AUDIT LOGS & SETTINGS */}
                {screenView === 'AUDIT_SETTINGS' && (
                  <div className="space-y-4 text-xs font-mono">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <h3 className="font-bold text-white font-sans text-sm">سجل التدقيق الرقمي المشفر (Immutable Audit Trail)</h3>
                      <span className="text-xs text-amber-400">AES-256 Validated</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-[11px]">
                      <div className="p-2 border-b border-slate-800 flex justify-between">
                        <span className="text-emerald-400">LOG-9921: USER_AUTH_SUCCESS</span>
                        <span className="text-slate-400">MIL-1001 (العميد سعود) | IP: 10.0.4.12</span>
                      </div>
                      <div className="p-2 border-b border-slate-800 flex justify-between">
                        <span className="text-amber-400">LOG-9922: LEAVE_APPROVED_BR01</span>
                        <span className="text-slate-400">Target: MIL-8821 | Status: PASSED</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 11. SYSTEM STATES & ERRORS */}
                {screenView === 'STATES' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                        <Info className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-white">لا توجد تنبيهات عاجلة حالياً</h4>
                      <p className="text-slate-400 text-[11px]">جميع البلاغات والخدمات اليومية تسير بانتظام تام وفق الجداول المعمدة.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-center space-y-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-rose-900/50 flex items-center justify-center text-rose-400">
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-rose-200">رفض الطلب: نسبة الجاهزية دون 75% (BR-01)</h4>
                      <p className="text-rose-300/80 text-[11px]">لا يمكن قبول طلب الإجازة نظراً لانخفاض القوة الفعلية بالتوكة 3 عن الحد الأدنى.</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Mobile Phone Device Bottom Navigation Bar */}
              {deviceFrame === 'MOBILE' && (
                <div className="bg-slate-950 border-t border-slate-800 p-2 grid grid-cols-5 gap-1 text-center text-[10px] text-slate-400 font-medium">
                  <div className="p-1.5 text-amber-400 font-bold flex flex-col items-center">
                    <Shield className="w-4 h-4" />
                    <span>الرئيسية</span>
                  </div>
                  <div className="p-1.5 flex flex-col items-center">
                    <QrCode className="w-4 h-4" />
                    <span>الحضور</span>
                  </div>
                  <div className="p-1.5 flex flex-col items-center">
                    <UserCheck className="w-4 h-4" />
                    <span>الخدمات</span>
                  </div>
                  <div className="p-1.5 flex flex-col items-center">
                    <FileText className="w-4 h-4" />
                    <span>الأوامر</span>
                  </div>
                  <div className="p-1.5 flex flex-col items-center">
                    <Menu className="w-4 h-4" />
                    <span>المزيد</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECTION 2: REUSABLE COMPONENT LIBRARY */}
      {/* =================================================================== */}
      {activeCategory === 'COMPONENTS' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Buttons & Badges */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h4 className="font-bold text-xs text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4" />
                1. الأزرار التكتيكية والأوسمة (Tactical Buttons & Badges)
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-900/40">
                  اعتماد قيادي (Primary Amber)
                </button>
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700">
                  إغلاق الطلب (Secondary Slate)
                </button>
                <button className="px-4 py-2 bg-rose-900/60 hover:bg-rose-800 text-rose-200 font-bold rounded-xl border border-rose-700">
                  حجز انضباطي (Danger Rose)
                </button>
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg">
                  موافق (Success Emerald)
                </button>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  BR-01 PASS: 88.5%
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                  COMMANDER ROLE
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                  ABSENT (3)
                </span>
              </div>
            </div>

            {/* 2. Input Controls */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h4 className="font-bold text-xs text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Search className="w-4 h-4" />
                2. حقول إدخال البيانات والبحث (RTL Form Controls)
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 text-[11px] font-bold block mb-1">حقل البحث بالاسم أو الرقم العسكري</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="ابحث بالاسم أو الرقم العسكري..."
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                    <Search className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-[11px] font-bold block mb-1">رمز PIN التأكيدي المشفر (4 أرقام)</label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="••••"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-amber-400 font-mono text-center focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* 3. Stat Metrics Cards */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 md:col-span-2">
              <h4 className="font-bold text-xs text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <BarChart2 className="w-4 h-4" />
                3. البطاقات الإحصائية القيادية (Stat Metric Cards)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-800/60 space-y-1">
                  <div className="text-slate-400 text-[11px]">نسبة الجاهزية اللحظية بالتوكة</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">92.4%</div>
                  <div className="text-[10px] text-emerald-400">تستوفي الشرط الحاكم BR-01 (أكبر من 75%)</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[11px]">إجمالي الخدمات المسندة اليوم</div>
                  <div className="text-2xl font-black text-white font-mono">48 <span className="text-xs font-normal text-slate-400">فرد</span></div>
                  <div className="text-[10px] text-slate-400">12 برج حراسة على مدار الساعة</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-rose-950 space-y-1">
                  <div className="text-slate-400 text-[11px]">بلاغات الانقطاع المعلقة</div>
                  <div className="text-2xl font-black text-rose-400 font-mono">3 <span className="text-xs font-normal text-rose-400">أفراد</span></div>
                  <div className="text-[10px] text-rose-400 font-bold">تم الرفع للجنة الانضباط العسكري</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECTION 3: DESIGN FOUNDATION & TOKENS */}
      {/* =================================================================== */}
      {activeCategory === 'FOUNDATION' && (
        <div className="space-y-8">
          {/* Palette Tokens */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-400" />
              لوحة الألوان المعتمدة ومواصفات Tokens (Military Enterprise Palette)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs font-mono">
              <div
                onClick={() => copyToClipboard('#1b382b', 'Military Green')}
                className="p-3 rounded-xl bg-[#1b382b] text-emerald-200 border border-emerald-700/50 space-y-1 cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="font-bold">Military Green</div>
                <div className="text-[10px] opacity-80">#1b382b</div>
                <div className="text-[9px] text-emerald-400">Primary Brand</div>
              </div>

              <div
                onClick={() => copyToClipboard('#d97706', 'Gold Accent')}
                className="p-3 rounded-xl bg-[#d97706] text-white border border-amber-600/50 space-y-1 cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="font-bold">Gold Accent</div>
                <div className="text-[10px] opacity-90">#d97706</div>
                <div className="text-[9px] text-amber-200">Commander Rank</div>
              </div>

              <div
                onClick={() => copyToClipboard('#0f172a', 'Dark Slate')}
                className="p-3 rounded-xl bg-[#0f172a] text-slate-200 border border-slate-700 space-y-1 cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="font-bold">Dark Slate</div>
                <div className="text-[10px] text-slate-400">#0f172a</div>
                <div className="text-[9px] text-slate-400">Canvas Background</div>
              </div>

              <div
                onClick={() => copyToClipboard('#065f46', 'Success Green')}
                className="p-3 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 space-y-1 cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="font-bold">Success Green</div>
                <div className="text-[10px]">#065f46</div>
                <div className="text-[9px]">Present / Verified</div>
              </div>

              <div
                onClick={() => copyToClipboard('#881337', 'Danger Red')}
                className="p-3 rounded-xl bg-rose-950 text-rose-300 border border-rose-800 space-y-1 cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="font-bold">Danger Red</div>
                <div className="text-[10px]">#881337</div>
                <div className="text-[9px]">Absent / Security</div>
              </div>

              <div
                onClick={() => copyToClipboard('#083344', 'Info Cyan')}
                className="p-3 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 space-y-1 cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="font-bold">Info Cyan</div>
                <div className="text-[10px]">#083344</div>
                <div className="text-[9px]">Tasks / Directives</div>
              </div>
            </div>

            {copiedToken && (
              <div className="text-xs text-amber-400 font-mono text-center">
                ✓ تم نسخ كود اللون: {copiedToken}
              </div>
            )}
          </div>

          {/* Typography Scale */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Type className="w-4 h-4 text-amber-400" />
              السلم الخطائي والتسلسل الهرمي (Arabic RTL Typography)
            </h3>

            <div className="space-y-3 font-sans">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-xl font-black text-white">العنوان الرئيسي H1 (24px Black)</span>
                <span className="text-xs font-mono text-slate-500">Cairo / Readex Pro 24px</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-base font-bold text-amber-200">عنوان القسم H2 (18px Bold)</span>
                <span className="text-xs font-mono text-slate-500">Cairo 18px Bold</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-300">النص الأساسي Body (14px Medium) - مخصص لبيانات الجداول والتقارير</span>
                <span className="text-xs font-mono text-slate-500">Cairo 14px Medium</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-xs font-mono text-amber-400">الرموز المرجعية والتاريخ (11px Mono) - AUAS-MIL-2026</span>
                <span className="text-xs font-mono text-slate-500">Space Mono / JetBrains</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECTION 4: NAVIGATION UX */}
      {/* =================================================================== */}
      {activeCategory === 'NAVIGATION' && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
          <h3 className="font-bold text-amber-300">أنماط القوائم وشريط التنقل المعتمد</h3>
          <p className="text-slate-400 leading-relaxed">
            يستخدم النظام شريط تنقل سفلي (Bottom Navigation) للأجهزة المحمولة بلمس مريح لا يقل عن 44px، وشريطاً جانبياً مطوياً (Side Drawer) للأجهزة اللوحية والمسطحة لضمان أقصى كفاءة ميدانية.
          </p>
        </div>
      )}
    </div>
  );
};
