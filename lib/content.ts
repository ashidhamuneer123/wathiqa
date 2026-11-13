export type Lang = "en" | "ar";

export type CatKey = "mohre" | "immigration" | "police" | "embassy" | "typing";

export type ServiceKey =
  | "passport"
  | "emergency"
  | "mohre"
  | "visa"
  | "typing"
  | "pcc"
  | "translation"
  | "attestation";

const en = {
  nav: { services: "Services", how: "How it works", why: "Why us", contact: "Contact", cta: "WhatsApp us" },
  hero: {
    kicker: "Licensed document clearing · Dubai",
    title1: "Government transactions,",
    title2: "handled for you.",
    sub: "Visas, labour cases, emergency certificates, police reports and typing — we follow up with every authority so you don’t have to queue.",
    cta1: "Start on WhatsApp",
    cta2: "Explore services",
    badges: ["Same-day processing*", "Arabic & English", "Fixed, clear fees"],
  },
  authorities: "We process with",
  explorer: {
    title: "Explore our services",
    sub: "Choose a department to see what we can process for you.",
    ask: "Apply on WhatsApp",
    cats: [
      { key: "mohre", name: "MOHRE / Labour", items: ["Labour Card – New", "Labour Card Renewal", "Labour Cancellation", "Labour Complaints & Claims", "Absconding Removal", "Work Permit", "ILOE Insurance", "Tawjeeh Booking"] },
      { key: "immigration", name: "GDRFA / ICP", items: ["Residence Visa – New", "Visa Renewal", "Visa Cancellation", "Entry Permit", "Exit Permit / Out-pass", "Fine Reduction Request", "Emirates ID", "Status Change"] },
      { key: "police", name: "Dubai Police", items: ["Lost Passport Report (24 hrs)", "Police Clearance Certificate", "Non-registered Case Paper", "Lost Item Certificate"] },
      { key: "embassy", name: "Embassy Services", items: ["Emergency Certificate (White Passport)", "Passport Renewal", "Document Verification", "MOFA Attestation"] },
      { key: "typing", name: "Typing & Translation", items: ["MOL Typing", "Legal Translation", "Health Insurance", "Court Documents Typing"] },
    ],
  },
  services: {
    kicker: "Our services",
    title: "Everything you need, at one counter.",
    ask: "Ask on WhatsApp",
    items: {
      passport: { tag: "Dubai Police", title: "Lost Passport Report", desc: "Lost passport certificate approved by all authorities, issued within 24 hours." },
      emergency: { tag: "Embassy / Consulate", title: "Emergency Certificate", desc: "One-way travel document (white passport) when your passport is lost, expired or unavailable." },
      mohre: { tag: "MOHRE", title: "Labour Complaints & Claims", desc: "Complaint registration, labour cancellation, absconding removal, case cancellation and technical tickets." },
      visa: { tag: "GDRFA / ICP", title: "Visa & Immigration", desc: "Entry permit and residency cancellation, exit permits / out-pass and fine reduction requests." },
      typing: { tag: "Typing centre", title: "Visa & Labour Typing", desc: "Residence visa applications, MOL typing, labour cancellation and Tawjeeh bookings." },
      pcc: { tag: "Police Clearance", title: "PCC & Verification", desc: "Police clearance certificates, non-registered case papers and document verification." },
      translation: { tag: "Legal", title: "Legal Translation", desc: "Certified Arabic ⇄ English legal translation for courts, ministries and embassies." },
      attestation: { tag: "MOFA", title: "Attestation & Insurance", desc: "Certificate attestation, health and ILOE insurance and other supporting documents." },
    } as Record<ServiceKey, { tag: string; title: string; desc: string }>,
  },
  how: {
    kicker: "How it works",
    title: "Three steps. Zero queues.",
    steps: [
      { t: "Send your documents", d: "Share clear copies on WhatsApp or drop by our office." },
      { t: "We submit & follow up", d: "Our PRO team files and tracks your application with the authority." },
      { t: "Approved & delivered", d: "We notify you the moment your document or approval is ready." },
    ],
  },
  stats: [
    { n: 12000, s: "+", l: "Applications processed" },
    { n: 24, s: "h", l: "Typical turnaround" },
    { n: 15, s: "+", l: "Authorities covered" },
    { n: 4.9, s: "★", l: "Customer rating" },
  ],
  statsNote: "Sample figures — replace with your own.",
  why: {
    kicker: "Why choose us",
    title: "Trusted by workers, families and companies.",
    items: [
      { t: "Experienced PRO team", d: "Years of hands-on work with UAE ministries and free zones." },
      { t: "Live WhatsApp updates", d: "Know exactly where your file is at every stage." },
      { t: "Transparent pricing", d: "Government fee and service charge shown separately, upfront." },
      { t: "Confidential & secure", d: "Your documents are handled privately and returned safely." },
    ],
  },
  contact: {
    kicker: "Get in touch",
    title: "Tell us what you need.",
    sub: "Fill in the form — it opens WhatsApp with your request ready to send.",
    name: "Full name",
    phone: "Mobile number",
    service: "Service needed",
    message: "Message (optional)",
    send: "Send on WhatsApp",
    call: "Call us",
    hours: "Working hours",
    visit: "Visit us",
    greeting: "Hello! I would like help with",
  },
  footer: { rights: "All rights reserved.", template: "Website template by Ashidha" },
  waFloat: "Chat with us",
  top: { hours: "Open: Mon – Sat 8:00 am – 9:00 pm", wa: "WhatsApp us", call: "Call anytime", apply: "Apply now" },
};

const ar: typeof en = {
  nav: { services: "خدماتنا", how: "طريقة العمل", why: "لماذا نحن", contact: "تواصل معنا", cta: "واتساب" },
  hero: {
    kicker: "متابعة معاملات مرخّصة · دبي",
    title1: "معاملاتك الحكومية،",
    title2: "ننجزها عنك.",
    sub: "التأشيرات، قضايا العمل، وثائق السفر الطارئة، بلاغات الشرطة والطباعة — نتابع مع جميع الجهات حتى لا تضطر للانتظار.",
    cta1: "ابدأ عبر واتساب",
    cta2: "تصفّح الخدمات",
    badges: ["إنجاز في نفس اليوم*", "عربي وإنجليزي", "رسوم واضحة وثابتة"],
  },
  authorities: "نتعامل مع",
  explorer: {
    title: "تصفّح خدماتنا",
    sub: "اختر الجهة لترى المعاملات التي ننجزها لك.",
    ask: "قدّم عبر واتساب",
    cats: [
      { key: "mohre", name: "الموارد البشرية / العمل", items: ["بطاقة عمل جديدة", "تجديد بطاقة العمل", "إلغاء العمل", "الشكاوى والمطالبات العمالية", "إزالة بلاغ التغيب", "تصريح عمل", "تأمين التعطل عن العمل", "حجز توجيه"] },
      { key: "immigration", name: "الإقامة / الهوية", items: ["تأشيرة إقامة جديدة", "تجديد الإقامة", "إلغاء الإقامة", "إذن دخول", "تصريح خروج", "طلب تخفيض الغرامات", "الهوية الإماراتية", "تعديل الوضع"] },
      { key: "police", name: "شرطة دبي", items: ["بلاغ فقدان جواز (٢٤ ساعة)", "شهادة حسن السيرة والسلوك", "ورقة قضية غير مسجلة", "شهادة فقدان"] },
      { key: "embassy", name: "خدمات السفارات", items: ["وثيقة سفر طارئة", "تجديد جواز السفر", "التحقق من المستندات", "تصديق الخارجية"] },
      { key: "typing", name: "الطباعة والترجمة", items: ["طباعة وزارة العمل", "الترجمة القانونية", "التأمين الصحي", "طباعة مستندات المحاكم"] },
    ],
  },
  services: {
    kicker: "خدماتنا",
    title: "كل ما تحتاجه في مكان واحد.",
    ask: "اسأل عبر واتساب",
    items: {
      passport: { tag: "شرطة دبي", title: "بلاغ فقدان جواز السفر", desc: "شهادة فقدان جواز معتمدة من جميع الجهات خلال ٢٤ ساعة." },
      emergency: { tag: "السفارة / القنصلية", title: "وثيقة سفر طارئة", desc: "وثيقة سفر باتجاه واحد عند فقدان الجواز أو انتهائه أو عدم توفره." },
      mohre: { tag: "وزارة الموارد البشرية", title: "الشكاوى والمطالبات العمالية", desc: "تسجيل الشكاوى، إلغاء العمل، إزالة بلاغ التغيب، إلغاء القضايا والتذاكر الفنية." },
      visa: { tag: "الإقامة / الهوية", title: "التأشيرات والإقامة", desc: "إلغاء أذونات الدخول والإقامة، تصاريح الخروج وطلبات تخفيض الغرامات." },
      typing: { tag: "مركز الطباعة", title: "طباعة التأشيرات والعمل", desc: "طلبات الإقامة، طباعة وزارة العمل، إلغاء العمل ومواعيد توجيه." },
      pcc: { tag: "حسن السيرة", title: "شهادة حسن السيرة والتحقق", desc: "شهادات حسن السيرة والسلوك، أوراق القضايا غير المسجلة والتحقق من المستندات." },
      translation: { tag: "قانوني", title: "الترجمة القانونية", desc: "ترجمة قانونية معتمدة عربي ⇄ إنجليزي للمحاكم والوزارات والسفارات." },
      attestation: { tag: "الخارجية", title: "التصديق والتأمين", desc: "تصديق الشهادات، التأمين الصحي وتأمين التعطل عن العمل وغيرها." },
    },
  },
  how: {
    kicker: "طريقة العمل",
    title: "ثلاث خطوات بلا طوابير.",
    steps: [
      { t: "أرسل مستنداتك", d: "شارك نسخاً واضحة عبر واتساب أو زر مكتبنا." },
      { t: "نقدّم ونتابع", d: "فريقنا يقدّم طلبك ويتابعه مع الجهة المختصة." },
      { t: "الموافقة والتسليم", d: "نبلغك فور جاهزية مستندك أو الموافقة." },
    ],
  },
  stats: [
    { n: 12000, s: "+", l: "معاملة منجزة" },
    { n: 24, s: "س", l: "متوسط مدة الإنجاز" },
    { n: 15, s: "+", l: "جهة حكومية" },
    { n: 4.9, s: "★", l: "تقييم العملاء" },
  ],
  statsNote: "أرقام تجريبية — استبدلها بأرقامك.",
  why: {
    kicker: "لماذا نحن",
    title: "موثوقون لدى العمال والعائلات والشركات.",
    items: [
      { t: "فريق خبير", d: "خبرة عملية طويلة مع الوزارات والمناطق الحرة." },
      { t: "تحديثات فورية", d: "اعرف حالة معاملتك في كل مرحلة عبر واتساب." },
      { t: "أسعار شفافة", d: "الرسوم الحكومية ورسوم الخدمة موضحة مسبقاً." },
      { t: "سرية وأمان", d: "نتعامل مع مستنداتك بخصوصية تامة." },
    ],
  },
  contact: {
    kicker: "تواصل معنا",
    title: "أخبرنا بما تحتاجه.",
    sub: "املأ النموذج وسيفتح واتساب برسالتك جاهزة للإرسال.",
    name: "الاسم الكامل",
    phone: "رقم الجوال",
    service: "الخدمة المطلوبة",
    message: "رسالة (اختياري)",
    send: "أرسل عبر واتساب",
    call: "اتصل بنا",
    hours: "ساعات العمل",
    visit: "زورونا",
    greeting: "مرحباً! أحتاج المساعدة في",
  },
  footer: { rights: "جميع الحقوق محفوظة.", template: "تصميم الموقع: Ashidha" },
  waFloat: "تحدث معنا",
  top: { hours: "مفتوح: الإثنين – السبت ٨ ص – ٩ م", wa: "واتساب", call: "اتصل بنا", apply: "قدّم الآن" },
};

export const dict = { en, ar };
export type Dict = typeof en;
