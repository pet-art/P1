import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODEL = process.env.MODEL || 'claude-sonnet-5-5';
const PORT = process.env.PORT || 8080;
const PASSWORD = process.env.ACCESS_PASSWORD;
if (!PASSWORD) { console.error('ضع ACCESS_PASSWORD في ملف .env'); process.exit(1); }

const client = new Anthropic(); // يقرأ ANTHROPIC_API_KEY

// ---------- تخزين بسيط في ملف JSON ----------
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
fs.mkdirSync(DATA_DIR, { recursive: true });
const db = fs.existsSync(DB_FILE)
  ? JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))
  : { clients: [], leads: [], notes: [], drafts: [], history: [] };
const save = () => fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
const id = () => crypto.randomUUID().slice(0, 8);

// ---------- الأدوات ----------
const tools = [
  { type: 'web_search_20250305', name: 'web_search', max_uses: 5 },
  {
    name: 'save_client',
    description: 'حفظ أو تحديث عميل حالي (صاحب مشروع تعمل له). استخدمه عند ذكر عميل جديد أو معلومات جديدة عنه.',
    input_schema: { type: 'object', properties: {
      id: { type: 'string', description: 'معرّف موجود للتحديث، أو اتركه فارغاً لإنشاء جديد' },
      name: { type: 'string' }, business: { type: 'string' },
      details: { type: 'string', description: 'الطلب، الميزانية، الجمهور، النبرة، المواعيد…' },
    }, required: ['name'] },
  },
  {
    name: 'list_clients', description: 'عرض العملاء الحاليين المحفوظين.',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'save_lead',
    description: 'حفظ عميل محتمل وجدته في البحث، مع وسيلة التواصل العامة المنشورة ودرجة الملاءمة.',
    input_schema: { type: 'object', properties: {
      name: { type: 'string' }, business: { type: 'string' }, contact: { type: 'string' },
      source_url: { type: 'string' }, fit: { type: 'string', description: 'لماذا هو مناسب' },
      status: { type: 'string', enum: ['new', 'drafted', 'contacted', 'replied', 'won', 'lost'] },
    }, required: ['name'] },
  },
  {
    name: 'list_leads', description: 'عرض العملاء المحتملين المحفوظين.',
    input_schema: { type: 'object', properties: { status: { type: 'string' } } },
  },
  {
    name: 'update_lead_status', description: 'تغيير حالة عميل محتمل.',
    input_schema: { type: 'object', properties: {
      id: { type: 'string' }, status: { type: 'string', enum: ['new', 'drafted', 'contacted', 'replied', 'won', 'lost'] },
    }, required: ['id', 'status'] },
  },
  {
    name: 'save_draft',
    description: 'حفظ مسودة رسالة جاهزة ليرسلها المستخدم بنفسه (لا يمكنك الإرسال). اذكر القناة والمستلم.',
    input_schema: { type: 'object', properties: {
      to: { type: 'string' }, channel: { type: 'string', enum: ['whatsapp', 'telegram', 'email', 'other'] },
      subject: { type: 'string' }, body: { type: 'string' }, lead_id: { type: 'string' },
    }, required: ['to', 'body'] },
  },
  {
    name: 'add_note', description: 'حفظ ملاحظة أو تذكير أو مهمة مع تاريخ اختياري.',
    input_schema: { type: 'object', properties: { text: { type: 'string' }, due: { type: 'string' } }, required: ['text'] },
  },
  {
    name: 'list_notes', description: 'عرض الملاحظات والمهام.',
    input_schema: { type: 'object', properties: {} },
  },
];

function runTool(name, i) {
  switch (name) {
    case 'save_client': {
      let c = i.id && db.clients.find(x => x.id === i.id);
      if (c) Object.assign(c, i); else { c = { ...i, id: id() }; db.clients.push(c); }
      save(); return JSON.stringify(c);
    }
    case 'list_clients': return JSON.stringify(db.clients);
    case 'save_lead': {
      const l = { status: 'new', ...i, id: id(), created: new Date().toISOString() };
      db.leads.push(l); save(); return JSON.stringify(l);
    }
    case 'list_leads': return JSON.stringify(i.status ? db.leads.filter(l => l.status === i.status) : db.leads);
    case 'update_lead_status': {
      const l = db.leads.find(x => x.id === i.id);
      if (!l) return 'لم يتم العثور على العميل المحتمل';
      l.status = i.status; save(); return JSON.stringify(l);
    }
    case 'save_draft': {
      const d = { ...i, id: id(), created: new Date().toISOString() };
      db.drafts.push(d);
      if (i.lead_id) { const l = db.leads.find(x => x.id === i.lead_id); if (l && l.status === 'new') l.status = 'drafted'; }
      save(); return 'تم حفظ المسودة. المستخدم سيراجعها ويرسلها بنفسه.';
    }
    case 'add_note': { const n = { ...i, id: id(), created: new Date().toISOString() }; db.notes.push(n); save(); return JSON.stringify(n); }
    case 'list_notes': return JSON.stringify(db.notes);
    default: return 'أداة غير معروفة';
  }
}

const SYSTEM = `أنت المساعد الشخصي لصاحب عمل مستقل يقدّم خدمات تسويق ومبيعات لعملائه (ويملك أيضاً نشاط دهان بودر كوتنج اسمه "فينيش ميتال").
تتحدث العربية بوضوح وإيجاز، لأن المستخدم يخاطبك غالباً من الجوال وبالصوت.

مهامك:
1) تنفيذ طلبات عملاء المستخدم التسويقية: منشورات، إعلانات، خطط محتوى، عروض أسعار، نصوص مبيعات، أفكار حملات. اسأل سؤالاً واحداً قصيراً فقط إذا نقصتك معلومة جوهرية، وإلا ابدأ بنسخة جيدة.
2) البحث عن عملاء جدد باستخدام web_search، ثم احفظ النتائج الجيدة بـ save_lead. استعمل فقط وسائل التواصل المنشورة علناً لنشاط تجاري، ولا تخمّن أرقاماً أو بريداً.
3) صياغة رسائل التواصل مع العملاء المحتملين وحفظها بـ save_draft. لا تستطيع الإرسال؛ المستخدم يراجع ويرسل بنفسه. اجعل الرسالة شخصية ومحددة وقصيرة وصادقة، بلا مبالغات أو وعود كاذبة، وبلا رسائل جماعية متطابقة.
4) تذكّر العملاء والمشاريع والمهام عبر أدوات الحفظ، وارجع إليها قبل أن تسأل المستخدم عن معلومة سبق حفظها.

اجعل الردود قصيرة قدر الإمكان لأنها قد تُقرأ صوتياً: بلا جداول ولا رموز زخرفية. عند عرض مسودة أرسلها كنص جاهز للنسخ.
تاريخ اليوم: ${new Date().toISOString().slice(0, 10)}.`;

// آخر ~40 رسالة، بشرط أن تبدأ برسالة مستخدم نصية حتى لا تنفصل أزواج الأدوات
function windowed() {
  let h = db.history.slice(-40);
  const i = h.findIndex(m => m.role === 'user' && typeof m.content === 'string');
  return i === -1 ? db.history.slice(-1) : h.slice(i);
}

// ---------- الخادم ----------
const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const auth = (req, res, next) => {
  const a = Buffer.from(req.get('x-password') || '');
  const b = Buffer.from(PASSWORD);
  if (a.length === b.length && crypto.timingSafeEqual(a, b)) return next();
  res.status(401).json({ error: 'كلمة السر غير صحيحة' });
};

app.post('/api/login', auth, (_req, res) => res.json({ ok: true }));
app.get('/api/data', auth, (_req, res) =>
  res.json({ clients: db.clients, leads: db.leads, notes: db.notes, drafts: db.drafts }));
app.post('/api/reset', auth, (_req, res) => { db.history = []; save(); res.json({ ok: true }); });

app.post('/api/chat', auth, async (req, res) => {
  const text = String(req.body.message || '').trim();
  if (!text) return res.status(400).json({ error: 'رسالة فارغة' });
  const snapshot = db.history.length;
  db.history.push({ role: 'user', content: text });
  try {
    let reply = '';
    for (let turn = 0; turn < 12; turn++) {
      const msg = await client.messages.create({
        model: MODEL, max_tokens: 4096, system: SYSTEM, tools,
        messages: windowed(),
      });
      db.history.push({ role: 'assistant', content: msg.content });
      if (msg.stop_reason === 'tool_use') {
        const results = msg.content.filter(b => b.type === 'tool_use').map(b => ({
          type: 'tool_result', tool_use_id: b.id, content: runTool(b.name, b.input),
        }));
        db.history.push({ role: 'user', content: results });
        continue;
      }
      reply = msg.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
      if (msg.stop_reason === 'pause_turn') continue;
      break;
    }
    save();
    res.json({ reply: reply || 'تم.' });
  } catch (e) {
    db.history.length = snapshot; // لا نترك محادثة معطوبة
    console.error(e);
    res.status(500).json({ error: e.message || 'خطأ غير متوقع' });
  }
});

app.listen(PORT, () => console.log(`المساعد يعمل على http://localhost:${PORT}`));
