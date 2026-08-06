import React from 'react';
import { X, Printer, Shield, CheckCircle } from 'lucide-react';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  documentContent: string;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  documentTitle,
  documentContent,
}) => {
  if (!isOpen) return null;

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-800/60 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden text-slate-100 my-8">
        {/* Modal Toolbar */}
        <div className="bg-amber-950/80 border-b border-amber-800/40 p-4 flex justify-between items-center text-amber-200">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">معاينة الطباعة العسكرية الرسمية</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-amber-900/50 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Paper Document Container */}
        <div className="p-8 bg-white text-slate-950 font-sans print-area">
          {/* Formal Military Header */}
          <div className="border-b-2 border-slate-950 pb-4 mb-6 flex justify-between items-center text-xs font-bold text-slate-900">
            <div className="text-right space-y-1">
              <div>المملكة العربية السعودية</div>
              <div>جهاز الردع - قيادة سلاح المدرعات</div>
              <div>وحدة الدعم الآلي وقوة التأمين</div>
            </div>

            <div className="text-center space-y-1">
              <div className="w-14 h-14 mx-auto border-2 border-slate-900 rounded-full flex items-center justify-center font-serif text-lg font-black">
                ⚔️
              </div>
              <div className="text-[10px] tracking-widest uppercase font-mono">CONFIDENTIAL MILITARY DOCUMENT</div>
            </div>

            <div className="text-left space-y-1 font-mono text-[11px]">
              <div>التاريخ: {new Date().toLocaleDateString('ar-SA')}</div>
              <div>الرقم المرجعي: AUAS-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div>التصنيف: سري ومكتوم</div>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center my-6">
            <h1 className="text-xl font-black text-slate-900 underline decoration-amber-600 decoration-2 underline-offset-8">
              {documentTitle}
            </h1>
          </div>

          {/* Document Content */}
          <div className="text-xs leading-relaxed text-slate-800 space-y-4 my-8 min-h-[200px]">
            <p>{documentContent}</p>
            <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-2 text-[11px]">
              <div className="font-bold text-slate-900">بيانات الاعتماد والتصديق:</div>
              <div>• صادر ومعتمد برمجياً من "منظومة إدارة وحدة المدرعات والدعم الآلي".</div>
              <div>• يخضع لجميع شروط وقواعد العمل المعتمدة (BR-01 حتى BR-11).</div>
            </div>
          </div>

          {/* Formal Stamp Seal & Signatures */}
          <div className="pt-8 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-xs font-bold text-center">
            <div className="space-y-6">
              <div>المشرف الأول / أركان حرب الوحدة</div>
              <div className="font-mono text-slate-600 text-[10px]">[توقيع رقمي معتمد]</div>
              <div>المقدم الركن / خالد بن ناصر العتيبي</div>
            </div>

            <div className="space-y-6">
              <div>آمر وحدة المدرعات والدعم الآلي</div>
              <div className="font-mono text-slate-600 text-[10px]">[ختم القيادة والاعتماد النهائي]</div>
              <div>العميد الركن / سعود بن عبد العزيز القحطاني</div>
            </div>
          </div>

          {/* QR Verification Code Placeholder */}
          <div className="mt-8 pt-4 border-t border-slate-300 flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>رمز التحقق المشفر QR: 8F92-AA34-BC11-9021</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              مستند معتمد رسمياً
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            إغلاق المعاينة
          </button>

          <button
            onClick={handleTriggerPrint}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white flex items-center gap-2 shadow-lg shadow-amber-900/40 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة المستند الآن</span>
          </button>
        </div>
      </div>
    </div>
  );
};
