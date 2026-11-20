const $ = s => document.querySelector(s);
let pw = localStorage.getItem('pw') || '';
let speakOn = false;

async function api(path, body) {
  const r = await fetch(path, {
    method: body ? 'POST' : 'GET',
    headers: { 'content-type': 'application/json', 'x-password': pw },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'خطأ');
  return j;
}

// ---- الدخول ----
async function login() {
  try { await api('/api/login', {}); $('#login').remove(); }
  catch { $('#login').style.display = 'flex'; if (pw) $('#err').textContent = 'كلمة السر غير صحيحة'; }
}
$('#go').onclick = () => { pw = $('#pw').value; localStorage.setItem('pw', pw); login(); };
if (pw) login();

// ---- المحادثة ----
function add(text, cls) {
  const d = document.createElement('div');
  d.className = 'm ' + cls; d.textContent = text;
  $('#log').append(d); $('#log').scrollTop = 1e9; return d;
}
add('أهلاً! اطلب مني أي شيء: محتوى لعميل، بحث عن عملاء جدد، أو صياغة رسالة تواصل.', 'a');

$('#f').onsubmit = async e => {
  e.preventDefault();
  const text = $('#t').value.trim();
  if (!text) return;
  $('#t').value = '';
  add(text, 'u');
  const wait = add('أعمل على الطلب…', 'a t');
  try {
    const { reply } = await api('/api/chat', { message: text });
    wait.textContent = reply; wait.classList.remove('t'); speak(reply);
  } catch (err) { wait.textContent = '⚠️ ' + err.message; }
  $('#log').scrollTop = 1e9;
};
$('#t').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey && matchMedia('(hover:hover)').matches) { e.preventDefault(); $('#f').requestSubmit(); }
});

// ---- الصوت: إدخال ----
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec;
if (!SR) $('#mic').style.display = 'none';
else {
  rec = new SR(); rec.lang = 'ar-SA'; rec.interimResults = true;
  rec.onresult = e => { $('#t').value = [...e.results].map(r => r[0].transcript).join(' '); };
  rec.onend = () => { $('#mic').classList.remove('on'); if ($('#t').value.trim()) $('#f').requestSubmit(); };
  $('#mic').onclick = () => {
    if ($('#mic').classList.contains('on')) return rec.stop();
    speechSynthesis.cancel(); $('#mic').classList.add('on'); rec.start();
  };
}

// ---- الصوت: إخراج ----
$('#speak').onclick = () => {
  speakOn = !speakOn; speechSynthesis.cancel();
  $('#speak').textContent = '🔈 صوت: ' + (speakOn ? 'تشغيل' : 'إيقاف');
};
function speak(t) {
  if (!speakOn || !('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(t); u.lang = 'ar-SA'; speechSynthesis.speak(u);
}

// ---- بياناتي ----
const card = (txt, copy) => {
  const d = document.createElement('div'); d.className = 'card'; d.textContent = txt;
  if (copy) { const b = document.createElement('button'); b.className = 'copy'; b.textContent = 'نسخ';
    b.onclick = () => { navigator.clipboard.writeText(copy); b.textContent = 'تم'; }; d.prepend(b); }
  return d;
};
$('#data').onclick = async () => {
  const d = await api('/api/data'); const pc = $('#pc'); pc.innerHTML = '';
  const sec = (title, items, fn) => {
    const h = document.createElement('h2'); h.textContent = `${title} (${items.length})`; pc.append(h);
    items.forEach(i => pc.append(fn(i)));
  };
  sec('المسودات', d.drafts, x => card(`إلى: ${x.to} (${x.channel || ''})\n${x.subject ? x.subject + '\n' : ''}${x.body}`, x.body));
  sec('العملاء المحتملون', d.leads, x => card(`${x.name} — ${x.business || ''}\n${x.contact || ''}\nالحالة: ${x.status}\n${x.fit || ''}`));
  sec('عملائي', d.clients, x => card(`${x.name} — ${x.business || ''}\n${x.details || ''}`));
  sec('الملاحظات', d.notes, x => card(`${x.text}${x.due ? '\nالموعد: ' + x.due : ''}`));
  $('#panel').classList.add('show');
};
$('#close').onclick = () => $('#panel').classList.remove('show');
$('#reset').onclick = async () => { await api('/api/reset', {}); $('#log').innerHTML = ''; add('بدأنا محادثة جديدة. بياناتك المحفوظة ما زالت موجودة.', 'a'); };

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
