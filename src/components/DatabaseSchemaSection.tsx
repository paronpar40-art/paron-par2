import React, { useState } from 'react';
import { Database, Shield, Server, FileCode, CheckCircle, Copy, Download, Search, Layers, Key, Zap, Lock, Filter } from 'lucide-react';
import { DATABASE_TABLES_LIST, POSTGRESQL_FULL_DDL_SCRIPT } from '../data/dbSchemaSql';

interface DatabaseSchemaSectionProps {
  isDarkTheme?: boolean;
}

export const DatabaseSchemaSection: React.FC<DatabaseSchemaSectionProps> = ({ isDarkTheme = true }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TABLES' | 'DDL' | 'OPTIMIZATION'>('OVERVIEW');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'ALL', name: 'الكل (35 جدولاً)' },
    { id: 'المستخدمون والأمن', name: '1. المستخدمون والأمن' },
    { id: 'الهيكلية والتوكات', name: '2. الهيكلية والتوكات' },
    { id: 'الخدمات والعمليات', name: '3. الخدمات والعمليات' },
    { id: 'المهام والتكامل', name: '4. المهام والتكامل' },
    { id: 'الانضباط والتقييم', name: '5. الانضباط والتقييم' },
    { id: 'النظام والنشر', name: '6. النظام والنشر' },
  ];

  const filteredTables = DATABASE_TABLES_LIST.filter((table) => {
    const matchesCat = selectedCategory === 'ALL' || table.category === selectedCategory;
    const matchesSearch =
      table.tableName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.tableTitleAr.includes(searchQuery) ||
      table.description.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const handleCopyDDL = () => {
    navigator.clipboard.writeText(POSTGRESQL_FULL_DDL_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDDL = () => {
    const element = document.createElement('a');
    const file = new Blob([POSTGRESQL_FULL_DDL_SCRIPT], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'armored_unit_postgresql_schema.sql';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="section-db-erd" className={`p-6 sm:p-8 rounded-3xl border transition-all ${
      isDarkTheme ? 'bg-slate-900/90 border-amber-800/50 shadow-2xl' : 'bg-white border-amber-200 shadow-xl'
    }`}>
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-amber-800/30">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-600/20 border border-amber-500/40 text-amber-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-500 tracking-wider uppercase font-mono">
                PostgreSQL Enterprise Architecture v15+
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                هيكلية قاعدة البيانات المتقدمة (ERD & DDL Schema)
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2 max-w-3xl leading-relaxed">
            تصميم هندسي متكامل ومطابق لمعايير 3NF وUUID Keys للربط بين المستخدمين، التوكات الأربع، الحضور اللحظي، الخفر والخدمات اليومية، الأوامر اليومية، وتوثيق التدقيق BR-11.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={handleCopyDDL}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-600/40 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم النسخ!' : 'نسخ كود SQL'}</span>
          </button>

          <button
            onClick={handleDownloadDDL}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-900/40"
          >
            <Download className="w-4 h-4" />
            <span>تنزيل ملف .sql</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 my-6 gap-2 overflow-x-auto scrollbar-none text-xs font-bold">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'OVERVIEW'
              ? 'border-amber-500 text-amber-400 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>مصفوفة الهيكلية والأبعاد (ERD Overview)</span>
        </button>

        <button
          onClick={() => setActiveTab('TABLES')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'TABLES'
              ? 'border-amber-500 text-amber-400 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>تفاصيل الجداول الـ 35 (Table Specs)</span>
        </button>

        <button
          onClick={() => setActiveTab('DDL')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'DDL'
              ? 'border-amber-500 text-amber-400 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>كود SQL DDL الشامل المعتمد</span>
        </button>

        <button
          onClick={() => setActiveTab('OPTIMIZATION')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'OPTIMIZATION'
              ? 'border-amber-500 text-amber-400 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>توصيات الأداء والتحسين (Optimization)</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <div className="text-2xl font-black text-amber-400 font-mono">35 Table</div>
              <div className="text-xs text-slate-400 font-medium">جداول البيانات النشطة</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <div className="text-2xl font-black text-emerald-400 font-mono">UUID v4</div>
              <div className="text-xs text-slate-400 font-medium">المفاتيح الرئيسية الشفرية</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <div className="text-2xl font-black text-cyan-400 font-mono">3NF Level</div>
              <div className="text-xs text-slate-400 font-medium">مستوى التسوية والمطابقة</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <div className="text-2xl font-black text-teal-400 font-mono">100% Audit</div>
              <div className="text-xs text-slate-400 font-medium">التوافق مع القواعد BR-11</div>
            </div>
          </div>

          {/* Visual ERD Diagram Box */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                المخطط الهيكلي المترابط لقواعد البيانات (ERD Core Topology)
              </h3>
              <span className="text-[11px] font-mono text-slate-500">PostgreSQL Relational Diagram</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Box 1: Security & Personnel */}
              <div className="p-4 rounded-xl bg-slate-900 border border-amber-900/40 space-y-3">
                <div className="font-bold text-amber-400 flex items-center justify-between">
                  <span>1. النواة والأفراد (Users Kernel)</span>
                  <Key className="w-4 h-4" />
                </div>
                <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>users</span>
                    <span className="text-amber-500">PK: id</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>tawkat (1-4)</span>
                    <span className="text-slate-400">1:N with users</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>military_ranks</span>
                    <span className="text-slate-400">1:N with users</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>roles & permissions</span>
                    <span className="text-slate-400">M:N Matrix</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Service & Attendance */}
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-900/40 space-y-3">
                <div className="font-bold text-emerald-400 flex items-center justify-between">
                  <span>2. الخدمة والجاهزية (Service Engine)</span>
                  <Shield className="w-4 h-4" />
                </div>
                <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>attendance</span>
                    <span className="text-emerald-500">FK: user_id</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>leave_requests</span>
                    <span className="text-emerald-500">Dual Approval</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>daily_services</span>
                    <span className="text-slate-400">Shift Duties</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>guard_officers</span>
                    <span className="text-slate-400">1:1 Service Log</span>
                  </div>
                </div>
              </div>

              {/* Box 3: Orders & Discipline */}
              <div className="p-4 rounded-xl bg-slate-900 border border-teal-900/40 space-y-3">
                <div className="font-bold text-teal-400 flex items-center justify-between">
                  <span>3. الأوامر والانضباط (Directives & Audit)</span>
                  <Lock className="w-4 h-4" />
                </div>
                <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>daily_orders</span>
                    <span className="text-teal-500">FK: issued_by</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>daily_order_readers</span>
                    <span className="text-slate-400">Read Receipts</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>rewards & penalties</span>
                    <span className="text-slate-400">Score Impact</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>audit_logs (BR-11)</span>
                    <span className="text-amber-500">Immutable Trail</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TABLES SPECIFICATIONS */}
      {activeTab === 'TABLES' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Filter Category */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث باسم الجدول أو الوصف..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTables.map((tbl) => (
              <div
                key={tbl.tableName}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-600/50 transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-500 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-full">
                      {tbl.category}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1.5">{tbl.tableTitleAr}</h3>
                    <div className="font-mono text-xs text-amber-400/90 font-semibold">{tbl.tableName}</div>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-900 border border-slate-700 text-slate-400 px-2 py-1 rounded-lg">
                    {tbl.columnsCount} أعمدة
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{tbl.description}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>المفتاح الرئيسي (PK):</span>
                    <span className="text-emerald-400 font-bold">{tbl.primaryKey}</span>
                  </div>

                  {tbl.foreignKeys.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-slate-400">المفاتيح الأجنبية (FK):</span>
                      {tbl.foreignKeys.map((fk, idx) => (
                        <div key={idx} className="bg-slate-900 px-2 py-1 rounded text-cyan-300 text-[10px] flex justify-between">
                          <span>{fk.column}</span>
                          <span className="text-slate-500">→ {fk.referencesTable}({fk.referencesColumn})</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-1 pt-1">
                    <span className="text-slate-400">الفهارس المتخصصة (Indexes):</span>
                    <div className="text-[10px] text-amber-300/80 bg-slate-900 p-1.5 rounded">
                      {tbl.indexes.join(' | ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DDL SCRIPT */}
      {activeTab === 'DDL' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-300 font-mono flex items-center gap-2">
              <FileCode className="w-4 h-4 text-amber-400" />
              PostgreSQL Schema Code File: armored_unit_postgresql_schema.sql (100% Production Ready)
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleCopyDDL}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[600px] scrollbar-thin">
            <code>{POSTGRESQL_FULL_DDL_SCRIPT}</code>
          </pre>
        </div>
      )}

      {/* TAB 4: OPTIMIZATION & PRODUCTION SCALING */}
      {activeTab === 'OPTIMIZATION' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
              <Server className="w-5 h-5" />
              <span>1. تجزئة البيانات الضخمة (Table Partitioning)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              تم إعداد جشولي <code className="text-amber-300 font-mono">attendance</code> و <code className="text-amber-300 font-mono">audit_logs</code> للتقسيم الشريحي المباشر Range Partitioning بالاعتماد على حقل التاريخ <code className="text-emerald-400 font-mono">created_at</code> شهرياً وسنوياً، لضمان استعلامات سريعة جداً حتى مع ملايين السجلات.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
              <Zap className="w-5 h-5" />
              <span>2. الفهارس المزدوجة والجريئة (B-Tree & GIN Indexes)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              استخدام فهارس GIN لحقول JSONB في جداول الإعدادات والأرشيف، وفهارس المركبة Composite Indexes على حقول (user_id, status) في جدول الحضور والإجازات لتقليل تكلفة الاستعلام إلى أقل من 2ms.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 font-bold text-cyan-400 text-sm">
              <Lock className="w-5 h-5" />
              <span>3. حماية غير قابلة للتغيير BR-11 (Immutable Audit Triggers)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              تطبيق مشغلات قاعدة البيانات (Triggers) على جدول <code className="text-cyan-300 font-mono">audit_logs</code> تمنع أي عمليات UPDATE أو DELETE برمجياً، لضمان الحفاظ على السجل العسكري التفتيشي الشفاف.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 font-bold text-teal-400 text-sm">
              <CheckCircle className="w-5 h-5" />
              <span>4. بروتوكولات الاتصال والتجمع PgBouncer</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              توصية باستخدام PgBouncer مع Transaction Pooling لربط ما يزيد عن 5000 مستخدم نشط في الوقت نفسه دون إجهاد موصلات PostgreSQL Enterprise.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
