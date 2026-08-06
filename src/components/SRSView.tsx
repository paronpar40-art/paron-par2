import React, { useState } from 'react';
import {
  Shield,
  FileText,
  Search,
  CheckCircle2,
  Users,
  Lock,
  Layers,
  Sparkles,
  Printer,
  ChevronRight,
  ArrowLeftRight,
  Activity,
  AlertCircle,
  Clock,
  BookOpen,
  Award,
  AlertTriangle,
  FileCheck,
  Zap,
} from 'lucide-react';
import {
  BUSINESS_RULES_LIST,
  PROJECT_OVERVIEW,
  ROLE_PERMISSIONS_MATRIX,
  SYSTEM_METADATA,
  SYSTEM_MODULES_SPECS,
  SYSTEM_REQUIREMENTS,
  TAWKAS_SPECIFICATION,
  USE_CASES_LIST,
  USER_FLOW_SCENARIOS,
} from '../data/srsData';
import { DatabaseSchemaSection } from './DatabaseSchemaSection';

interface SRSViewProps {
  onOpenPrintModal: (title: string, content: string) => void;
  onOpenAiModal: () => void;
  isDarkTheme: boolean;
}

export const SRSView: React.FC<SRSViewProps> = ({
  onOpenPrintModal,
  onOpenAiModal,
  isDarkTheme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('overview');

  const filteredModules = SYSTEM_MODULES_SPECS.filter(
    (mod) =>
      mod.nameAr.includes(searchQuery) ||
      mod.summary.includes(searchQuery) ||
      mod.objective.includes(searchQuery)
  );

  const filteredRules = BUSINESS_RULES_LIST.filter(
    (rule) =>
      rule.title.includes(searchQuery) ||
      rule.description.includes(searchQuery) ||
      rule.id.includes(searchQuery)
  );

  const sectionsList = [
    { id: 'overview', title: '1. وصف المشروع والنطاق' },
    { id: 'roles', title: '2. المستخدمون والصلاحيات' },
    { id: 'tawkas', title: '3. تقسيم التوكات 1-4' },
    { id: 'modules', title: '4. شرح وحدات النظام الـ 17' },
    { id: 'rules', title: '5. قواعد العمل Business Rules' },
    { id: 'usecases', title: '6. حالات الاستخدام Use Cases' },
    { id: 'flows', title: '7. سيناريوهات المستخدم User Flows' },
    { id: 'requirements', title: '8. المتطلبات الأمنية والتقنية' },
    { id: 'database', title: '9. هيكلية قاعدة البيانات Enterprise ERD' },
  ];

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors ${
      isDarkTheme ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sticky Table of Contents Sidebar */}
        <aside className="lg:col-span-3">
          <div className={`sticky top-24 rounded-2xl p-4 border shadow-sm ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                فهرس وثيقة SRS
              </span>
              <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-mono font-bold">
                8 أقسام رئيسية
              </span>
            </div>

            {/* Quick Search inside SRS */}
            <div className="relative mb-4">
              <Search className="w-3.5 h-3.5 absolute right-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في المواصفات والقواعد..."
                className={`w-full pr-8 pl-3 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                  isDarkTheme
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-slate-100 border-slate-300 text-slate-800 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Navigation Menu Links */}
            <nav className="space-y-1">
              {sectionsList.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setActiveSection(sec.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeSection === sec.id
                      ? 'bg-amber-600/20 text-amber-400 font-bold border-r-2 border-amber-500 pr-2.5'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <span>{sec.title}</span>
                  <ChevronRight className="w-3 h-3 opacity-40 rotate-180" />
                </a>
              ))}
            </nav>

            {/* AI Assistant Quick Callout */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={onOpenAiModal}
                className="w-full bg-gradient-to-r from-emerald-950 to-teal-950 hover:from-emerald-900 hover:to-teal-900 border border-emerald-800/60 text-emerald-200 p-3 rounded-xl text-xs font-medium text-right flex items-center gap-2 group transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-800/50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <div className="font-bold text-white text-[11px]">هل لديك استفسار في الوثيقة؟</div>
                  <div className="text-[10px] text-emerald-300/80">اسأل مستشار Gemini التحليلي</div>
                </div>
              </button>
            </div>
          </div>
        </aside>

        {/* Main SRS Document Content */}
        <main className="lg:col-span-9 space-y-10">
          {/* Document Header Banner */}
          <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden ${
            isDarkTheme
              ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border-amber-900/30'
              : 'bg-gradient-to-br from-amber-950 via-slate-900 to-amber-900 text-white border-amber-800/40'
          }`}>
            <div className="absolute left-0 top-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-amber-800/30">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                  <FileText className="w-6 h-6" />
                </span>
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                    DOCUMENT CLASS: CONFIDENTIAL MILITARY SRS
                  </span>
                  <h2 className="text-2xl font-black tracking-tight text-white mt-0.5">
                    {SYSTEM_METADATA.systemTitleAr}
                  </h2>
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenPrintModal(
                    SYSTEM_METADATA.documentType,
                    `تقرير تحليل متطلبات المنظومة - النسخة المعتمدة ${SYSTEM_METADATA.version}`
                  )
                }
                className="bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الوثيقة الرسمية</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-xs">
              <div className="bg-slate-900/60 backdrop-blur p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px]">نوع الوثيقة</div>
                <div className="font-bold text-amber-300 mt-0.5">{SYSTEM_METADATA.documentType}</div>
              </div>
              <div className="bg-slate-900/60 backdrop-blur p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px]">إعداد محلل النظم</div>
                <div className="font-bold text-amber-300 mt-0.5">{SYSTEM_METADATA.analystRole}</div>
              </div>
              <div className="bg-slate-900/60 backdrop-blur p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px]">إصدار النظام</div>
                <div className="font-bold text-amber-300 mt-0.5 font-mono">{SYSTEM_METADATA.version}</div>
              </div>
              <div className="bg-slate-900/60 backdrop-blur p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px]">التصنيف الأمني</div>
                <div className="font-bold text-amber-300 mt-0.5">{SYSTEM_METADATA.classification}</div>
              </div>
            </div>
          </div>

          {/* Section 1: Overview & Scope */}
          <section id="overview" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-800">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Shield className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold tracking-tight">1. وصف المشروع والنطاق العملياتي</h3>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h4 className="text-sm font-bold text-amber-400 mb-2">وصف المنظومة العامة:</h4>
              <p className="text-xs leading-relaxed text-slate-300 mb-6">
                {PROJECT_OVERVIEW.description}
              </p>

              <h4 className="text-sm font-bold text-amber-400 mb-3">الأهداف الاستراتيجية والتكتيكية:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {PROJECT_OVERVIEW.strategicObjectives.map((obj, i) => (
                  <div key={i} className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                    isDarkTheme ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    داخل نطاق المشروع (In-Scope):
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {PROJECT_OVERVIEW.scopeIn.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    خارج نطاق المشروع (Out-of-Scope):
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-400">
                    {PROJECT_OVERVIEW.scopeOut.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Roles & Permissions Matrix */}
          <section id="roles" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-800">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Users className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold tracking-tight">2. مستخدمو المنظومة ومصفوفة الصلاحيات التفصيلية</h3>
            </div>

            <p className="text-xs text-slate-400">
              يعتمد النظام على نموذج إدارة الوصول المعتمد على الأدوار (Role-Based Access Control - RBAC) مقسماً على 4 مستويات قيادية وميدانية:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ROLE_PERMISSIONS_MATRIX.map((roleObj) => (
                <div key={roleObj.role} className={`p-5 rounded-2xl border transition-all ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-amber-400">{roleObj.titleAr}</span>
                    <span className="font-mono text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-bold">
                      {roleObj.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{roleObj.description}</p>

                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <div className="text-[11px] font-bold text-slate-400">أبرز الصلاحيات والقيود:</div>
                    {roleObj.permissions.slice(0, 3).map((perm, idx) => (
                      <div key={idx} className="text-xs flex items-center justify-between bg-slate-800/40 p-2 rounded-lg">
                        <span className="font-medium text-slate-200">{perm.module}</span>
                        <span className="text-[10px] text-amber-300 font-mono">{perm.notes}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Comprehensive Matrix Table */}
            <div className={`rounded-2xl border overflow-hidden ${
              isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex justify-between items-center">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  جدول الصلاحيات العام (Master Matrix)
                </span>
                <span className="text-[10px] text-slate-400">
                  (استعراض | إضافة | تعديل | حذف | اعتماد | طباعة)
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead className="bg-slate-800/50 text-slate-300 border-b border-slate-700">
                    <tr>
                      <th className="p-3">وحدة النظام</th>
                      <th className="p-3 text-center">الآمر (Commander)</th>
                      <th className="p-3 text-center">المشرف الأول (XO)</th>
                      <th className="p-3 text-center">المشرف الثاني (Duty Officer)</th>
                      <th className="p-3 text-center">العنصر (Personnel)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {SYSTEM_MODULES_SPECS.map((mod) => (
                      <tr key={mod.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3 font-semibold text-amber-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          <span>{mod.nameAr}</span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px]">
                            شامل + اعتماد
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded text-[10px]">
                            تنفيذي + إعداد
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded text-[10px]">
                            ميداني للتوكة
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                            اطلاع فردي
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 3: Tawkas 1-4 Division */}
          <section id="tawkas" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-800">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Layers className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold tracking-tight">3. تقسيم التوكات الأربع (التوكة 1 إلى التوكة 4)</h3>
            </div>

            <p className="text-xs text-slate-400">
              تُقسم الكتيبة قتالياً وإدارياً إلى أربع توكات رئيسية متخصصة تضمن الجاهزية والاستجابة المستمرة على مدار 24 ساعة:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TAWKAS_SPECIFICATION.map((tawka) => (
                <div key={tawka.id} className={`p-6 rounded-2xl border relative overflow-hidden transition-all ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded">
                        {tawka.codeName}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">{tawka.name}</h4>
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-emerald-400">{tawka.readinessPercentage}%</div>
                      <div className="text-[10px] text-slate-400">نسبة الجاهزية</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{tawka.description}</p>

                  <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">القائد:</span>
                      <span className="font-bold text-amber-300">{tawka.leaderName} ({tawka.leaderRank})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">قوام القوة البشرية:</span>
                      <span className="font-mono text-slate-200">{tawka.personnelCount} مقاتلاً</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">جدول المناوبة:</span>
                      <span className="text-slate-300">{tawka.shiftSchedule}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-800/60">
                      <span className="text-[10px] text-slate-400 block mb-1">الآليات العسكرية والمدرعات:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {tawka.armorAssets.map((asset, i) => (
                          <span key={i} className="text-[10px] bg-slate-800 text-amber-200 px-2 py-0.5 rounded border border-slate-700">
                            {asset}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: 17 System Modules Detailed Specs */}
          <section id="modules" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-800">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Activity className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold tracking-tight">4. شرح جميع وحدات النظام الـ 17 بالتفصيل</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredModules.map((mod) => (
                <div key={mod.id} className={`p-5 rounded-2xl border flex flex-col justify-between ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        {mod.id.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{mod.nameEn}</span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">{mod.nameAr}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{mod.summary}</p>

                    <div className="space-y-3 mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 block mb-1">الهدف التشغيلي:</span>
                        <div className="text-xs text-slate-300 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                          {mod.objective}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-amber-400 block mb-1">أبرز الوظائف البرمجية:</span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {mod.keyFeatures.map((feat, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] flex justify-between items-center text-slate-400">
                    <span>قواعد العمل المترابطة:</span>
                    <span className="font-mono text-amber-300 font-bold">
                      {mod.businessRulesRelated.join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Business Rules BR-01..BR-11 */}
          <section id="rules" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-800">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <AlertCircle className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold tracking-tight">5. قواعد العمل والقيود الانضباطية (Business Rules)</h3>
            </div>

            <div className="space-y-4">
              {filteredRules.map((rule) => (
                <div key={rule.id} className={`p-5 rounded-2xl border ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-amber-600 text-white px-2 py-0.5 rounded shadow-sm">
                        {rule.id}
                      </span>
                      <h4 className="text-sm font-bold text-white">{rule.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        {rule.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        rule.enforcementLevel.includes('صارم')
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        تطبيق: {rule.enforcementLevel}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{rule.description}</p>

                  <div className="text-[11px] bg-slate-800/40 p-2.5 rounded-xl border border-slate-800 text-slate-300 flex items-center gap-2">
                    <span className="font-bold text-amber-400">الأثر العسكري للأنظمة:</span>
                    <span>{rule.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Use Cases UC-01..UC-03 */}
          <section id="usecases" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-800">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <FileCheck className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold tracking-tight">6. حالات الاستخدام القياسية (Use Cases)</h3>
            </div>

            <div className="space-y-6">
              {USE_CASES_LIST.map((uc) => (
                <div key={uc.id} className={`p-6 rounded-2xl border ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded">
                        {uc.id}
                      </span>
                      <h4 className="text-base font-bold text-white">{uc.title}</h4>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">الجهة المنفذة: {uc.actor}</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-4">{uc.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
                    <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                      <span className="font-bold text-amber-400 block mb-1">الشروط المسبقة (Pre-conditions):</span>
                      <ul className="space-y-1 text-slate-300">
                        {uc.preConditions.map((cond, i) => (
                          <li key={i}>• {cond}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                      <span className="font-bold text-emerald-400 block mb-1">النتائج النهائية (Post-conditions):</span>
                      <ul className="space-y-1 text-slate-300">
                        {uc.postConditions.map((cond, i) => (
                          <li key={i}>• {cond}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-amber-400 block mb-2">خطوات المسار الرئيسي (Main Flow):</span>
                    <ol className="space-y-1.5 text-xs text-slate-300 list-decimal list-inside bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                      {uc.mainFlow.map((step, i) => (
                        <li key={i} className="leading-relaxed">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: User Flow Scenarios */}
          <section id="flows" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-800">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <ArrowLeftRight className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold tracking-tight">7. سيناريوهات ومسارات الاستخدام الميداني (User Flows)</h3>
            </div>

            <div className="space-y-6">
              {USER_FLOW_SCENARIOS.map((flow) => (
                <div key={flow.id} className={`p-6 rounded-2xl border ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <h4 className="text-base font-bold text-white mb-2">{flow.title}</h4>
                  <p className="text-xs text-slate-400 mb-6">{flow.description}</p>

                  <div className="space-y-3">
                    {flow.steps.map((st) => (
                      <div key={st.stepNumber} className="flex items-start gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs">
                        <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold font-mono flex items-center justify-center shrink-0">
                          {st.stepNumber}
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="font-bold text-amber-300 flex justify-between">
                            <span>المنفذ: {st.actor}</span>
                            <span className="text-slate-400 font-mono">خطوة #{st.stepNumber}</span>
                          </div>
                          <div className="text-slate-200 font-medium">{st.action}</div>
                          <div className="text-emerald-400 bg-slate-900 p-2 rounded border border-slate-800 mt-1">
                            استجابة المنظومة: {st.systemResponse}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Requirements */}
          <section id="requirements" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-800">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Zap className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold tracking-tight">8. المتطلبات التقنية والأمنية والمستقبلية</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SYSTEM_REQUIREMENTS.map((req) => (
                <div key={req.id} className={`p-5 rounded-2xl border ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded">
                      {req.id}
                    </span>
                    <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {req.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2">{req.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{req.description}</p>

                  <div className="text-[10px] text-amber-300 font-bold">
                    الأولوية: {req.priority}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 9: Database Architecture (PostgreSQL ERD & DDL) */}
          <section id="database" className="scroll-mt-24">
            <DatabaseSchemaSection isDarkTheme={isDarkTheme} />
          </section>
        </main>
      </div>
    </div>
  );
};
