/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Droplet, 
  Sun, 
  Wind, 
  ShieldCheck, 
  Palette, 
  Zap, 
  Hammer, 
  Layers, 
  Disc, 
  Umbrella, 
  Activity, 
  Lightbulb, 
  DoorOpen, 
  Archive, 
  Container, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Send,
  Menu,
  X,
  ChevronLeft,
  Star,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const icons = {
  waterproof: Droplet,
  sun: Sun,
  dust: Wind,
  scratch: ShieldCheck,
  colors: Palette,
  fast: Zap,
};

const services = [
  { id: 1, name: 'دهان الحديد', icon: Hammer, desc: 'حماية فائقة للحديد ضد الصدأ والتآكل.' },
  { id: 2, name: 'دهان الألمنيوم', icon: Layers, desc: 'لمسة نهائية ناعمة وجذابة لجميع قطاعات الألمنيوم.' },
  { id: 3, name: 'دهان الجنوط', icon: Disc, desc: 'تجديد جنوط السيارات بألوان مذهلة ومقاومة عالية.' },
  { id: 4, name: 'دهان المظلات', icon: Umbrella, desc: 'ألوان ثابتة تتحمل أقسى ظروف الحرارة والشمس.' },
  { id: 5, name: 'دهان الستانلس ستيل', icon: Activity, desc: 'تقنيات متقدمة للثبات على الأسطح اللامعة.' },
  { id: 6, name: 'دهان أعمدة الإنارة', icon: Lightbulb, desc: 'تغطية كاملة ومقاومة للعوامل الجوية الخارجية.' },
  { id: 7, name: 'دهان أبواب الطوارئ', icon: DoorOpen, desc: 'دهان حراري بمواصفات أمان عالية ومقاومة للحريق.' },
  { id: 8, name: 'رفوف التخزين', icon: Archive, desc: 'تحمل الأوزان الثقيلة والاحتكاك المستمر.' },
  { id: 9, name: 'جميع أنواع المعادن', icon: Container, desc: 'حلول متكاملة لكافة الصناعات المعدنية.' },
];

const features = [
  { title: 'مقاوم للماء', icon: Droplet, desc: 'حماية كاملة من الرطوبة والصدا.' },
  { title: 'مقاوم للشمس', icon: Sun, desc: 'ثبات الألوان تحت الأشعة فوق البنفسجية.' },
  { title: 'مقاوم للأتربة', icon: Wind, desc: 'سطح ناعم يمنع تراكم الغبار.' },
  { title: 'مقاوم للخدوش', icon: ShieldCheck, desc: 'صلابة عالية تتحمل الصدمات والخدش.' },
  { title: 'أكثر من 1000 لون', icon: Palette, desc: 'خيارات غير محدودة تناسب ذوقك.' },
  { title: 'سرعة في التنفيذ', icon: Zap, desc: 'نلتزم بمواعيد التسليم بدقة واحترافية.' },
];

const testimonials = [
  { name: 'أحمد العتيبي', role: 'مقاول إنشائي', text: 'أفضل ورشة تعاملت معها، الجودة في دهان المظلات كانت مذهلة والألوان ثابتة جداً.' },
  { name: 'سارة خالد', role: 'مهندسة ديكور', text: 'سرعة التنفيذ واحترافية اختيار الألوان جعلت مشروعي يظهر بشكل عالمي.' },
  { name: 'محمد علي', role: 'صاحب مصنع', text: 'دهان أبواب الطوارئ والرفوف كان بمواصفات ممتازة، أنصح بهم بشدة.' },
];

const galleryImages = [
  { url: 'input_file_0.png', alt: 'مقارنة احترافية قبل وبعد الدهان الحراري (بودر كوتنج) للجنوط المعدنية والأسوار الصدئة كلياً', title: 'تحول الجنوط والمعادن' },
  { url: 'input_file_1.png', alt: 'معرض شامل لأعمال دهان البودر كوتنج للأسوار والرفوف الصناعية والقطاعات المعدنية بألوان متنوعة', title: 'دقة وتنوع الألوان' },
  { url: 'input_file_0.png', alt: 'خدمة تجديد المعادن القديمة وإزالة الصدأ بالفرن الحراري والدهان الإلكتروستاتيكي', title: 'إعادة إحياء المعادن' },
  { url: 'input_file_1.png', alt: 'تشطيبات نهائية فاخرة ومقاومة للخدش لقطاعات الألمنيوم والستانلس ستيل', title: 'جودة التشطيب' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'مميزاتنا', href: '#features' },
    { name: 'أعمالنا', href: '#gallery' },
    { name: 'آراء العملاء', href: '#testimonials' },
    { name: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black" dir="rtl">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg border-b border-white/10' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center rotate-3">
              <Layers className="text-black" size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">فينيش <span className="text-primary italic">ميتال</span></span>
          </div>

          <div className="hidden md:flex gap-8 items-center font-medium">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-white/80 hover:text-primary transition-colors hover:translate-y-[-2px] inline-block">{link.name}</a>
            ))}
            <a href="https://wa.me/966569297493" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-green-600/20">
              <MessageCircle size={18} fill="currentColor" />
              واتساب
            </a>
            <a href="#contact" className="bg-primary text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/20">طلب خدمة</a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-black border-b border-white/10 py-6 px-6 flex flex-col gap-4 md:hidden shadow-2xl"
            >
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-lg font-semibold py-2 border-b border-white/5" onClick={() => setIsMenuOpen(false)}>{link.name}</a>
              ))}
              <a href="#contact" className="bg-primary text-black text-center py-4 rounded-xl font-bold mt-2" onClick={() => setIsMenuOpen(false)}>طلب خدمة الآن</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-transparent z-10" />
          <img 
            src="input_file_1.png" 
            alt="معرض أعمال دهان حراري وبودر كوتنج احترافي لشركة فينيش ميتال" 
            className="w-full h-full object-cover grayscale opacity-50 scale-105 animate-pulse-slow"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full mb-8">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
              <span className="text-sm font-bold tracking-widest uppercase">الأفضل في الشرق الأوسط</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[1.1] tracking-tight">
              دهان <span className="text-primary italic">بودر كوتنج</span> وفرن حراري متميز
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              نقدم حلولاً احترافية لدهان جميع أنواع المعادن بأعلى معايير الجودة العالمية والفرن الحراري المتطور لضمان المتانة والجمال.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/966569297493" className="flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-5 rounded-2xl font-black text-xl hover:bg-green-700 transition-all hover:scale-105 shadow-2xl shadow-green-600/30">
                <MessageCircle size={24} fill="currentColor" />
                واتساب مباشر
              </a>
              <a href="#services" className="flex items-center justify-center gap-2 bg-white text-black px-8 py-5 rounded-2xl font-black text-xl hover:bg-primary transition-all hover:scale-105">
                اكتشف خدماتنا
                <ChevronLeft size={24} />
              </a>
            </div>
            
            <div className="mt-16 flex gap-8">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-primary">10+</span>
                <span className="text-white/60 font-medium">سنوات خبرة</span>
              </div>
              <div className="w-[1px] h-12 bg-white/20 self-center" />
              <div className="flex flex-col">
                <span className="text-4xl font-black text-primary">5000+</span>
                <span className="text-white/60 font-medium">مشروع منجز</span>
              </div>
              <div className="w-[1px] h-12 bg-white/20 self-center" />
              <div className="flex flex-col">
                <span className="text-4xl font-black text-primary">100%</span>
                <span className="text-white/60 font-medium">رضا العملاء</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-10 md:left-auto md:right-10 animate-bounce">
          <a href="#services" className="p-3 border border-white/20 rounded-full inline-block backdrop-blur-sm">
            <ChevronLeft className="rotate-[-90deg]" />
          </a>
        </div>
      </section>

      {/* Stats / Keyword Banner */}
      <div className="bg-primary py-8 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex gap-12 items-center px-12">
              <span className="text-black text-2xl font-black">بودر كوتنج</span>
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="text-black text-2xl font-black">دهان حراري</span>
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="text-black text-2xl font-black">دهان معادن</span>
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="text-black text-2xl font-black">دهان حديد</span>
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="text-black text-2xl font-black">دهان ألمنيوم</span>
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">لماذا تختار <span className="text-primary italic">فينيش ميتال</span>؟</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
            <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto">نحن نستخدم أحدث التقنيات العالمية في الدهان الحراري لضمان حماية أبدية لمنتجاتك المعدنية.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-black/50 border border-white/5 p-8 rounded-3xl hover:border-primary/50 transition-colors group cursor-default"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <feature.icon className="text-primary group-hover:text-black transition-colors" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black mb-4">خدماتنا <span className="text-primary italic">الشاملة</span></h2>
              <p className="text-white/60 text-lg">نحن متخصصون في دهان جميع الأسطح المعدنية مهما كان حجمها أو شكلها الهندسي.</p>
            </div>
            <a href="#contact" className="text-primary font-bold flex items-center gap-2 group">
              اطلب تسعيرة لخدمتك
              <ChevronLeft size={20} className="group-hover:translate-x-[-5px] transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div 
                key={service.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-all hover:translate-y-[-5px] relative group"
              >
                <div className="absolute top-8 left-8 text-white/5 group-hover:text-primary transition-colors">
                  <service.icon size={60} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-black mb-4 relative z-10">{service.name}</h3>
                <p className="text-white/60 leading-relaxed relative z-10">{service.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 size={16} />
                  ضمان 5 سنوات
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Showcase */}
      <section className="py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8">تحول <span className="text-primary italic">مذهل</span> للمعادن</h2>
              <p className="text-white/60 text-xl leading-relaxed mb-8">
                شاهد الفرق الجذري قبل وبعد عملية الدهان الحراري. نحن نعيد الحياة للقطع المعدنية الصدئة والمتآكلة لنحولها إلى قطع فنية بلمسة نهائية احترافية تدوم لسنوات.
              </p>
              <ul className="space-y-4">
                {[
                  'إزالة الصدأ والتآكل بشكل كامل',
                  'تنظيف الأسطح بأحدث التقنيات',
                  'تغطية شاملة وموحدة بالبودر كوتنج',
                  'فرن حراري لضمان صلابة السطح'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold">
                    <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-black">
                      <CheckCircle2 size={16} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative group"
            >
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
              <img 
                src="input_file_0.png" 
                alt="مقارنة حقيقية قبل وبعد الدهان الحراري للجنوط والمعادن الصدئة - فينيش ميتال" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl border border-white/10"
              />
              <div className="absolute top-6 right-6 z-20 bg-primary text-black px-6 py-2 rounded-full font-black shadow-xl">تحول حقيقي</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">معرض <span className="text-primary italic">الأعمال</span></h2>
          <p className="text-white/60 max-w-xl mx-auto">شاهد نتائج أعمالنا الحقيقية لعملائنا في مختلف التخصصات.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 container mx-auto px-6">
          {galleryImages.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-lg"
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <span className="text-primary font-black text-xl mb-2">{img.title}</span>
                <span className="text-white/80 text-xs leading-relaxed">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-20">ماذا يقول <span className="text-primary italic">عملاؤنا</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900 border border-white/5 p-10 rounded-[3rem] relative"
              >
                <div className="flex text-primary mb-6">
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-xl text-white/80 italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-black text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{t.name}</h4>
                    <span className="text-sm text-white/40">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary text-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight italic">دعنا نبدأ <br /> مشروعك الآن!</h2>
              <p className="text-xl font-medium mb-12 opacity-80">نحن هنا للإجابة على جميع استفساراتك وتقديم أفضل عرض سعر لخدمتك.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 bg-black/5 p-6 rounded-3xl border border-black/10">
                  <div className="w-14 h-14 bg-black text-primary rounded-2xl flex items-center justify-center">
                    <Phone size={28} />
                  </div>
                  <div>
                    <span className="text-sm font-bold opacity-60 block">اتصل بنا</span>
                    <span className="text-2xl font-black">966569297493</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 bg-black/5 p-6 rounded-3xl border border-black/10">
                  <div className="w-14 h-14 bg-black text-primary rounded-2xl flex items-center justify-center">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <span className="text-sm font-bold opacity-60 block">موقعنا</span>
                    <span className="text-2xl font-black">المملكة العربية السعودية</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-10 md:p-14 rounded-[3rem] shadow-3xl">
              <h3 className="text-3xl font-black mb-8">طلب خدمة</h3>
              <form 
                className="space-y-6" 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const phone = formData.get('phone');
                  const service = formData.get('service');
                  const details = formData.get('details');
                  
                  const message = `*طلب خدمة جديد من الموقع*%0A%0A*الاسم:* ${name}%0A*الجوال:* ${phone}%0A*نوع الخدمة:* ${service}%0A*التفاصيل:* ${details}`;
                  window.open(`https://wa.me/966569297493?text=${message}`, '_blank');
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/40 px-2">الاسم بالكامل</label>
                    <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-primary transition-colors outline-none" placeholder="أحمد محمد..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/40 px-2">رقم الجوال</label>
                    <input name="phone" required type="tel" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-primary transition-colors outline-none" placeholder="05xxxxxxxx" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/40 px-2">نوع الخدمة</label>
                  <select name="service" required className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-primary transition-colors outline-none appearance-none">
                    <option value="دهان حديد" className="bg-black">دهان حديد</option>
                    <option value="دهان ألمنيوم" className="bg-black">دهان ألمنيوم</option>
                    <option value="دهان جنوط" className="bg-black">دهان جنوط</option>
                    <option value="أخرى" className="bg-black">أخرى</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/40 px-2">تفاصيل الطلب</label>
                  <textarea name="details" required rows={4} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-primary transition-colors outline-none" placeholder="اكتب تفاصيل طلبك هنا..."></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-black py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/20">
                  إرسال الطلب عبر واتساب
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center rotate-3">
                  <Layers className="text-black" size={18} />
                </div>
                <span className="text-xl font-black tracking-tighter">فينيش <span className="text-primary italic">ميتال</span></span>
              </div>
              <p className="text-white/40 text-lg leading-relaxed max-w-sm">
                الريادة في حلول الدهان الحراري والبودر كوتنج لجميع المعادن. دقة في التنفيذ، سرعة في الإنجاز، وجودة تدوم طويلاً.
              </p>
            </div>
            
            <div>
              <h4 className="font-black text-xl mb-6">روابط سريعة</h4>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.name}><a href={link.href} className="text-white/40 hover:text-primary transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-xl mb-6">اتصل بنا</h4>
              <div className="space-y-4 text-white/40">
                <p>المملكة العربية السعودية</p>
                <p>هاتف: 966569297493</p>
                <p>واتساب: 966569297493</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
            <p className="text-white/20 text-sm">© {new Date().getFullYear()} فينيش ميتال. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6">
              <a href="https://wa.me/966569297493" className="text-white/20 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer"><MessageCircle size={24} /></a>
              <a href="tel:966569297493" className="text-white/20 hover:text-primary transition-colors"><Phone size={24} /></a>
              <a href="#contact" className="text-white/20 hover:text-primary transition-colors"><MapPin size={24} /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        href="https://wa.me/966569297493" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="fixed bottom-8 left-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-[0_10px_25px_-5px_rgba(34,197,94,0.4)] hover:shadow-[0_20px_35px_-5px_rgba(34,197,94,0.5)] transition-all active:scale-90 group flex items-center justify-center overflow-visible"
      >
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
        <MessageCircle size={32} fill="currentColor" className="relative z-10 group-hover:rotate-[12deg] transition-transform duration-300" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-2xl pointer-events-none border border-black/5">
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-t border-black/5" />
          تواصل معنا واتساب مباشر
        </span>
      </motion.a>
    </div>
  );
}
