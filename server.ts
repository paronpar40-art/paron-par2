import { GoogleGenAI } from '@google/genai';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side Gemini AI assistant API route
  app.post('/api/gemini/analyze', async (req, res) => {
    try {
      const { prompt, context } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({
          error: 'مفتاح API الخاص بـ Gemini غير مهيأ في البيئة (GEMINI_API_KEY is missing).',
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `أنت محلل نظم عسكري ومستشار تقني لتطوير "منظومة إدارة وحدة المدرعات والدعم الآلي".
قم بالإجابة بدقة واحترافية وبالمصطلحات الفنية والعسكرية العالية باللغة العربية.
تأكد من الالتزام بتوزيع التوكات الأربع (التوكة 1 الاستطلاع والصدمة، التوكة 2 الدعم الآلي الثقيل والمدفعية، التوكة 3 الصيانة واللوجستية، التوكة 4 حرس المقر والأبراج)، وأدوار المستخدمين (الآمر، المشرف الأول، المشرف الثاني، العنصر)، وقواعد الجاهزية الصارمة (مثل الحد الأدنى للجاهزية 75%).`;

      const fullPrompt = `${systemInstruction}\n\nالسياق الحالي للنظام:\n${JSON.stringify(context || {})}\n\nاستفسار/طلب المستخدم:\n${prompt}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
      });

      return res.json({ text: response.text });
    } catch (err: any) {
      console.error('Gemini API error:', err);
      return res.status(500).json({ error: err.message || 'فشل الاتصال بالذكاء الاصطناعي.' });
    }
  });

  // Healthcheck API
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
