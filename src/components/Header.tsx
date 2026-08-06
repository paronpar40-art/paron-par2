import React from 'react';
import {
  Shield,
  FileText,
  Monitor,
  Palette,
  Sparkles,
  Printer,
  Moon,
  Sun,
  Smartphone,
  UserCheck,
  ChevronDown,
  Clock,
} from 'lucide-react';
import { UserRole } from '../types/srs';

interface HeaderProps {
  activeView: 'SRS' | 'PROTOTYPE' | 'ATTENDANCE_MODULE' | 'DAILY_SERVICE_MODULE' | 'SOLDIER_APP' | 'DESIGN_SYSTEM';
  setActiveView: (view: 'SRS' | 'PROTOTYPE' | 'ATTENDANCE_MODULE' | 'DAILY_SERVICE_MODULE' | 'SOLDIER_APP' | 'DESIGN_SYSTEM') => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  openAiModal: () => void;
  openPrintModal: (title: string, content: string) => void;
  isDarkTheme: boolean;
  setIsDarkTheme: (isDark: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  currentRole,
  setCurrentRole,
  openAiModal,
  openPrintModal,
  isDarkTheme,
  setIsDarkTheme,
}) => {
  const rolesMap: { role: UserRole; label: string; icon: string }[] = [
    { role: 'COMMANDER', label: 'الآمر (العميد الركن سعود)', icon: '🎖️' },
    { role: 'SUPERVISOR_1', label: 'المشرف الأول (المقدم الركن خالد)', icon: '⭐' },
    { role: 'SUPERVISOR_2', label: 'المشرف الثاني (الرائد طارق - التوكة 2)', icon: '🛡️' },
    { role: 'ELEMENT', label: 'العنصر (رئيس رقباء عبدالله)', icon: '🪖' },
  ];

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors shadow-md ${
      isDarkTheme ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-900 border-amber-900/40 text-amber-50'
    }`}>
      {/* Top Military Banner */}
      <div className="bg-amber-950/80 border-b border-amber-800/40 px-4 py-1.5 text-xs flex justify-between items-center text-amber-200">
        <div className="flex items-center space-x-3 space-x-reverse">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold tracking-wide">جهاز الردع - وحدة المدرعات والدعم الآلي</span>
          <span className="text-amber-400/60">|</span>
          <span>منظومة رقمية مشفرة بالكامل (AES-256)</span>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse font-mono text-[11px]">
          <span className="bg-amber-900/60 px-2 py-0.5 rounded border border-amber-700/50">
            الإصدار: SRS 2.5.0
          </span>
          <span className="hidden sm:inline">سري وخاص للاستخدام الميداني</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Badge */}
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 p-0.5 shadow-lg shadow-amber-900/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-amber-400">
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              منظومة إدارة وحدة المدرعات والدعم الآلي
            </h1>
            <p className="text-xs text-amber-200/70">
              وثيقة التحليل القيادي SRS & المحاكاة التفاعلية بالنظام الميداني
            </p>
          </div>
        </div>

        {/* View Switchers (SRS vs Prototype vs Design System) */}
        <div className="flex items-center bg-slate-950/70 p-1.5 rounded-xl border border-slate-800 shadow-inner flex-wrap gap-1">
          <button
            onClick={() => setActiveView('SRS')}
            className={`flex items-center space-x-2 space-x-reverse px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeView === 'SRS'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>وثيقة مواصفات SRS</span>
          </button>
          <button
            onClick={() => setActiveView('PROTOTYPE')}
            className={`flex items-center space-x-2 space-x-reverse px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeView === 'PROTOTYPE'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>نظام القيادة الإدارية</span>
          </button>
          <button
            onClick={() => setActiveView('ATTENDANCE_MODULE')}
            className={`flex items-center space-x-2 space-x-reverse px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeView === 'ATTENDANCE_MODULE'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 font-bold'
                : 'text-amber-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>وحدة الحضور والغياب</span>
          </button>
          <button
            onClick={() => setActiveView('DAILY_SERVICE_MODULE')}
            className={`flex items-center space-x-2 space-x-reverse px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeView === 'DAILY_SERVICE_MODULE'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 font-bold'
                : 'text-amber-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>إدارة الخدمة اليومية</span>
          </button>
          <button
            onClick={() => setActiveView('SOLDIER_APP')}
            className={`flex items-center space-x-2 space-x-reverse px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeView === 'SOLDIER_APP'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-900/60'
            }`}
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>تطبيق المقاتل (الجوال)</span>
          </button>
          <button
            onClick={() => setActiveView('DESIGN_SYSTEM')}
            className={`flex items-center space-x-2 space-x-reverse px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeView === 'DESIGN_SYSTEM'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>نظام التصميم UI/UX</span>
          </button>
        </div>

        {/* Actions & Role Selector */}
        <div className="flex items-center space-x-3 space-x-reverse flex-wrap justify-end">
          {/* Role selector dropdown */}
          <div className="relative group">
            <div className="flex items-center space-x-2 space-x-reverse bg-slate-800/80 hover:bg-slate-800 border border-amber-700/40 text-amber-100 text-xs px-3 py-1.5 rounded-lg cursor-pointer">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium">
                {rolesMap.find((r) => r.role === currentRole)?.label}
              </span>
              <ChevronDown className="w-3 h-3 text-amber-300/70" />
            </div>
            <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-amber-800/60 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 text-xs">
              <div className="text-[11px] font-bold text-amber-400/80 px-2 py-1 mb-1 border-b border-slate-800">
                اختيار المستخدم لاختبار الصلاحيات:
              </div>
              {rolesMap.map((item) => (
                <button
                  key={item.role}
                  onClick={() => setCurrentRole(item.role)}
                  className={`w-full text-right px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                    currentRole === item.role
                      ? 'bg-amber-600/30 text-amber-200 font-bold border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {currentRole === item.role && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* AI Analyst Assistant Button */}
          <button
            onClick={openAiModal}
            className="flex items-center space-x-1.5 space-x-reverse bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md shadow-emerald-900/30 transition-all border border-emerald-500/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
            <span>مساعد Gemini</span>
          </button>

          {/* Quick Print Button */}
          <button
            onClick={() =>
              openPrintModal(
                'وثيقة النظام الرسمية',
                'نص التقرير والبيان المعين للطباعة العسكرية المعتمدة.'
              )
            }
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="طباعة تقرير معتمد"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title={isDarkTheme ? 'الوضع التكتيكي الفاتح' : 'الوضع التكتيكي الداكن'}
          >
            {isDarkTheme ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>
        </div>
      </div>
    </header>
  );
};
