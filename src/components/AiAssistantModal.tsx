import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Loader2, Shield } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'أهلاً بك. أنا مستشار تحليل النظم والعمليات العسكرية الذكي الخاص بـ "منظومة إدارة وحدة المدرعات والدعم الآلي". كيف يمكنني مساعدتك اليوم في مواصفات SRS أو استصدار الأوامر القيادية وقواعد الجاهزية؟',
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  if (!isOpen) return null;

  const quickPrompts = [
    'قم بتحليل قاعدة الحد الأدنى للجاهزية (75%) وكيف تمنع الثغرات الميدانية.',
    'صغ نص أمر يومي عسكري برفع الجاهزية للتوكة 1 والتوكة 2.',
    'كيف تتم معالجة بدلاء خدمات الحراسة بالأبراج في التوكة 4؟',
    'تلخيص مصفوفة الصلاحيات بين الآمر والمشرف الأول والمشرف الثاني.',
  ];

  const handleSendPrompt = async (textToSend?: string) => {
    const messageText = textToSend || prompt;
    if (!messageText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: messageText,
          context: {
            system: 'منظومة إدارة وحدة المدرعات والدعم الآلي (SRS v2.5.0)',
            tawkas: ['التوكة 1 الاستطلاع', 'التوكة 2 الدعم الآلي والمدفعية', 'التوكة 3 الصيانة', 'التوكة 4 حرس المقر والأبراج'],
            rules: ['BR-01 الجاهزية 75%', 'BR-03 الاعتماد الثنائي', 'BR-11 سجل التدقيق المحمي'],
          },
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const aiMsg: ChatMessage = {
        sender: 'ai',
        text: data.text || 'لم يتم استلام رد مناسب من المحلل الذكي.',
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        sender: 'ai',
        text: `عذراً، حدث خطأ أثناء التواصل مع محرك Gemini: ${err.message || 'يرجى التحقق من مفتاح API.'}`,
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-800/60 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col h-[650px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-emerald-800/50 p-4 flex justify-between items-center text-emerald-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                مستشار الذكاء الاصطناعي Gemini التحليلي
              </h3>
              <p className="text-[10px] text-emerald-300/80">
                مستشار برجمي ومحلل نظم عسكري معتمد لوحدة المدرعات والدعم الآلي
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-emerald-900/40 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex gap-2 overflow-x-auto scrollbar-none text-[11px]">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(qp)}
              disabled={isLoading}
              className="bg-slate-800/80 hover:bg-emerald-900/40 border border-slate-700 hover:border-emerald-600/50 text-slate-300 hover:text-emerald-200 px-3 py-1 rounded-full whitespace-nowrap transition-all shrink-0"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white'
                    : 'bg-emerald-800 text-emerald-200 border border-emerald-600/50'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white rounded-tr-none'
                    : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[9px] text-right ${
                    msg.sender === 'user' ? 'text-amber-200/80' : 'text-slate-400'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-slate-400 text-xs p-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              <span>جاري التحليل واستخلاص الإجابة من المستشار الذكي...</span>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
            placeholder="اكتب استفسارك التحليلي أو اطلب كتابة قرار عسكري..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-500"
          />
          <button
            onClick={() => handleSendPrompt()}
            disabled={isLoading || !prompt.trim()}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition-all font-bold flex items-center justify-center"
          >
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
