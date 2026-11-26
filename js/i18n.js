// =========================================================
// KAMUS TERJEMAHAN LANDING PAGE (Indonesia / English / العربية)
// Kiri: teks asli di index.html. Kanan: terjemahannya.
// Teks yang tidak ada di kamus akan tampil apa adanya.
// Catatan: teks yang sudah diubah lewat editor admin disimpan
// per bahasa, jadi tidak memakai kamus ini lagi.
// =========================================================
const KAMUS = {
  // ----- Header & menu -----
  "About": { id: "Tentang", ar: "من نحن" },
  "Vision": { id: "Visi", ar: "الرؤية" },
  "Programs": { id: "Program", ar: "البرامج" },
  "Achievements": { id: "Prestasi", ar: "الإنجازات" },
  "Gallery": { id: "Galeri", ar: "المعرض" },
  "Anggota": { en: "Members", ar: "الأعضاء" },
  "Contact": { id: "Kontak", ar: "اتصل بنا" },
  "Daftar": { en: "Sign up", ar: "التسجيل" },
  "Login": { id: "Masuk", ar: "الدخول" },
  "Portal →": { id: "Portal →", ar: "البوابة ←" },
  "Vision & Mission": { id: "Visi & Misi", ar: "الرؤية والرسالة" },
  "Roadmap": { id: "Peta Jalan", ar: "خارطة الطريق" },
  "📚 Belajar": { en: "📚 Learn", ar: "📚 التعلّم" },
  "📥 Download": { en: "📥 Download", ar: "📥 التنزيلات" },
  "📝 Ujian": { en: "📝 Exams", ar: "📝 الاختبارات" },
  "Daftar gratis": { en: "Sign up free", ar: "سجّل مجانًا" },

  // ----- Hero -----
  "Pondok Modern Tazakka · Batang, Central Java": { id: "Pondok Modern Tazakka · Batang, Jawa Tengah", ar: "معهد تزكية الحديث · باتانج، جاوة الوسطى" },
  "Empowering": { id: "Memberdayakan", ar: "تمكين" },
  "Young Innovators": { id: "Inovator Muda", ar: "المبتكرين الشباب" },
  "for a Sustainable Future": { id: "untuk Masa Depan Berkelanjutan", ar: "من أجل مستقبل مستدام" },
  "Tazakka Science and Technology Club — a STEM community where santri learn through discovery, build solutions with technology, and grow innovation through research.": {
    id: "Tazakka Science and Technology Club — komunitas STEM tempat santri belajar melalui penemuan, membangun solusi dengan teknologi, dan menumbuhkan inovasi melalui riset.",
    ar: "نادي تزكية للعلوم والتكنولوجيا — مجتمع للعلوم والتقنية يتعلّم فيه الطلاب بالاكتشاف، ويبنون الحلول بالتكنولوجيا، وينمّون الابتكار بالبحث العلمي." },
  "Discover TSTC →": { id: "Kenali TSTC →", ar: "تعرّف على النادي ←" },
  "View Gallery": { id: "Lihat Galeri", ar: "شاهد المعرض" },
  "Club members": { id: "Anggota klub", ar: "عضو في النادي" },
  "Awards 2025–2026": { id: "Penghargaan 2025–2026", ar: "جائزة 2025–2026" },
  "Gold medals": { id: "Medali emas", ar: "ميداليات ذهبية" },

  // ----- About -----
  "Gold Medalist": { id: "Peraih Medali Emas", ar: "الحائز على الذهبية" },
  "About TSTC": { id: "Tentang TSTC", ar: "عن النادي" },
  "A home for scientific curiosity": { id: "Rumah bagi rasa ingin tahu ilmiah", ar: "بيتٌ للفضول العلمي" },
  "Tazakka Science and Technology Club (TSTC) is a science and technology development community within Pondok Modern Tazakka, Batang Regency, Central Java, Indonesia. It is a platform for santri to explore scientific knowledge, develop technological competencies, conduct research, and formulate innovative solutions to real-world problems.": {
    id: "Tazakka Science and Technology Club (TSTC) adalah komunitas pengembangan sains dan teknologi di Pondok Modern Tazakka, Kabupaten Batang, Jawa Tengah, Indonesia. TSTC menjadi wadah bagi santri untuk menggali ilmu pengetahuan, mengembangkan kompetensi teknologi, melakukan riset, dan merumuskan solusi inovatif bagi permasalahan nyata.",
    ar: "نادي تزكية للعلوم والتكنولوجيا مجتمعٌ لتطوير العلوم والتقنية في معهد تزكية الحديث بمحافظة باتانج، جاوة الوسطى، إندونيسيا. وهو منصة للطلاب لاستكشاف المعرفة العلمية، وتنمية الكفاءات التقنية، وإجراء البحوث، وصياغة حلول مبتكرة لمشكلات الواقع." },
  "Activities integrate STEM through project-based learning, experimentation, research, and prototype development — building critical thinking, creativity, problem solving, communication, collaboration, and independent learning.": {
    id: "Kegiatan memadukan STEM melalui pembelajaran berbasis proyek, eksperimen, riset, dan pengembangan prototipe — membangun berpikir kritis, kreativitas, pemecahan masalah, komunikasi, kolaborasi, dan belajar mandiri.",
    ar: "تدمج الأنشطة العلوم والتقنية والهندسة والرياضيات من خلال التعلّم القائم على المشاريع والتجارب والبحث وتطوير النماذج الأولية — لبناء التفكير الناقد والإبداع وحلّ المشكلات والتواصل والتعاون والتعلّم الذاتي." },
  "Science is learned through discovery, technology is employed to provide solutions, and innovation is developed through systematic testing and evaluation.": {
    id: "Sains dipelajari melalui penemuan, teknologi digunakan untuk memberi solusi, dan inovasi dikembangkan melalui pengujian serta evaluasi yang sistematis.",
    ar: "العلم يُتعلَّم بالاكتشاف، والتقنية تُوظَّف لتقديم الحلول، والابتكار يُطوَّر بالاختبار والتقويم المنهجي." },
  "Institution": { id: "Lembaga", ar: "المؤسسة" },
  "Location": { id: "Lokasi", ar: "الموقع" },
  "Batang, Central Java": { id: "Batang, Jawa Tengah", ar: "باتانج، جاوة الوسطى" },
  "Field": { id: "Bidang", ar: "المجال" },
  "Approach": { id: "Pendekatan", ar: "المنهج" },
  "Research & Project-Based": { id: "Berbasis Riset & Proyek", ar: "قائم على البحث والمشاريع" },

  // ----- Vision & Mission -----
  "Our Vision": { id: "Visi Kami", ar: "رؤيتنا" },
  "To become a science and technology community that develops a generation of young people who think scientifically, innovate collaboratively, and produce STEM-based solutions that benefit society and the environment.": {
    id: "Menjadi komunitas sains dan teknologi yang mengembangkan generasi muda yang berpikir ilmiah, berinovasi secara kolaboratif, dan mampu menghasilkan solusi berbasis STEM yang bermanfaat bagi masyarakat dan lingkungan.",
    ar: "أن نكون مجتمعًا للعلوم والتكنولوجيا يُنشئ جيلًا من الشباب يفكّر تفكيرًا علميًا، ويبتكر بروح الفريق، ويقدّم حلولًا قائمة على العلوم والتقنية تنفع المجتمع والبيئة." },
  "Our Mission": { id: "Misi Kami", ar: "رسالتنا" },
  "Develop scientific thinking skills through research, experimentation, observation, and data analysis.": { id: "Mengembangkan keterampilan berpikir ilmiah melalui riset, eksperimen, observasi, dan analisis data.", ar: "تنمية مهارات التفكير العلمي بالبحث والتجريب والملاحظة وتحليل البيانات." },
  "Strengthen STEM competencies through practical projects in programming, electronics, IoT, robotics, and other technologies.": { id: "Memperkuat kompetensi STEM melalui proyek praktik pemrograman, elektronika, IoT, robotika, dan teknologi lainnya.", ar: "تعزيز كفاءات العلوم والتقنية بمشاريع عملية في البرمجة والإلكترونيات وإنترنت الأشياء والروبوتات وغيرها." },
  "Foster creativity and innovation in designing solutions to real-world problems.": { id: "Menumbuhkan kreativitas dan inovasi dalam merancang solusi bagi masalah nyata.", ar: "تنمية الإبداع والابتكار في تصميم حلول لمشكلات الواقع." },
  "Establish a systematic, well-documented, and sustainable research culture.": { id: "Membangun budaya riset yang sistematis, terdokumentasi, dan berkelanjutan.", ar: "ترسيخ ثقافة بحثية منهجية وموثّقة ومستدامة." },
  "Develop collaboration and scientific communication through teamwork, presentations, exhibitions, and knowledge sharing.": { id: "Mengembangkan kolaborasi dan komunikasi ilmiah melalui kerja tim, presentasi, pameran, dan berbagi pengetahuan.", ar: "تطوير التعاون والتواصل العلمي بالعمل الجماعي والعروض والمعارض وتبادل المعرفة." },
  "Give santri opportunities to produce works that can be developed, tested, replicated, and utilized.": { id: "Memberi kesempatan santri menghasilkan karya yang dapat dikembangkan, diuji, direplikasi, dan dimanfaatkan.", ar: "إتاحة الفرصة للطلاب لإنتاج أعمال قابلة للتطوير والاختبار والتكرار والانتفاع." },
  "Build networks with schools, universities, science communities, research institutions, and industries.": { id: "Membangun jejaring dengan sekolah, universitas, komunitas sains, lembaga riset, dan industri.", ar: "بناء شبكات مع المدارس والجامعات والمجتمعات العلمية ومؤسسات البحث والصناعة." },
  "Sustain STEM activities through student succession, documentation, module development, and club resources.": { id: "Menjaga keberlanjutan kegiatan STEM melalui regenerasi anggota, dokumentasi, pengembangan modul, dan penguatan sumber daya klub.", ar: "استدامة أنشطة العلوم والتقنية بتعاقب الأجيال والتوثيق وتطوير الوحدات التعليمية وموارد النادي." },
  "Values We Develop": { id: "Nilai yang Kami Kembangkan", ar: "القيم التي ننمّيها" },
  "🔍 Curiosity": { id: "🔍 Rasa Ingin Tahu", ar: "🔍 حب الاستطلاع" },
  "🧪 Scientific Thinking": { id: "🧪 Berpikir Ilmiah", ar: "🧪 التفكير العلمي" },
  "🎨 Creativity": { id: "🎨 Kreativitas", ar: "🎨 الإبداع" },
  "💡 Innovation": { id: "💡 Inovasi", ar: "💡 الابتكار" },
  "🤝 Collaboration": { id: "🤝 Kolaborasi", ar: "🤝 التعاون" },
  "🧩 Problem Solving": { id: "🧩 Pemecahan Masalah", ar: "🧩 حلّ المشكلات" },
  "🔁 Persistence": { id: "🔁 Ketekunan", ar: "🔁 المثابرة" },
  "🛡️ Responsibility": { id: "🛡️ Tanggung Jawab", ar: "🛡️ المسؤولية" },

  // ----- Programs -----
  "Areas of focus": { id: "Bidang fokus", ar: "مجالات التركيز" },
  "Seven fields where santri research, build, and learn together.": { id: "Tujuh bidang tempat santri meneliti, membangun, dan belajar bersama.", ar: "سبعة مجالات يبحث فيها الطلاب ويبنون ويتعلّمون معًا." },
  "Scientific Research": { id: "Riset Ilmiah", ar: "البحث العلمي" },
  "Research and experimentation to understand scientific phenomena and generate reliable data and findings — the heart of every TSTC project.": { id: "Riset dan eksperimen untuk memahami fenomena ilmiah serta menghasilkan data dan temuan yang andal — inti dari setiap proyek TSTC.", ar: "البحث والتجريب لفهم الظواهر العلمية وإنتاج بيانات ونتائج موثوقة — جوهر كل مشروع في النادي." },
  "Internet of Things": { id: "Internet of Things", ar: "إنترنت الأشياء" },
  "Sensors, microcontrollers, and connectivity for monitoring and automation.": { id: "Sensor, mikrokontroler, dan konektivitas untuk pemantauan dan otomasi.", ar: "حساسات ومتحكمات دقيقة واتصال للمراقبة والأتمتة." },
  "Robotics & Automation": { id: "Robotika & Otomasi", ar: "الروبوتات والأتمتة" },
  "Robots and automated systems programmed for specific tasks.": { id: "Robot dan sistem otomatis yang diprogram untuk tugas tertentu.", ar: "روبوتات وأنظمة آلية مبرمجة لمهام محددة." },
  "Artificial Intelligence": { id: "Kecerdasan Buatan", ar: "الذكاء الاصطناعي" },
  "AI in education, robotics, data analysis, and problem solving.": { id: "AI untuk pendidikan, robotika, analisis data, dan pemecahan masalah.", ar: "الذكاء الاصطناعي في التعليم والروبوتات وتحليل البيانات وحلّ المشكلات." },
  "Electronics & Engineering": { id: "Elektronika & Rekayasa", ar: "الإلكترونيات والهندسة" },
  "Circuits, control systems, and engineered prototypes.": { id: "Rangkaian, sistem kendali, dan prototipe rekayasa.", ar: "دوائر وأنظمة تحكّم ونماذج هندسية." },
  "Sustainable Technology": { id: "Teknologi Berkelanjutan", ar: "التقنية المستدامة" },
  "Hydroponics, aquaponics, water and energy management.": { id: "Hidroponik, akuaponik, pengelolaan air dan energi.", ar: "الزراعة المائية والأكوابونيك وإدارة المياه والطاقة." },
  "STEM Education": { id: "Pendidikan STEM", ar: "تعليم العلوم والتقنية" },
  "Experiments and modules that strengthen scientific literacy.": { id: "Eksperimen dan modul untuk memperkuat literasi sains.", ar: "تجارب ووحدات تعليمية تعزّز الثقافة العلمية." },
  "Our Learning Cycle": { id: "Siklus Belajar Kami", ar: "دورة التعلّم لدينا" },
  "Identify": { id: "Identifikasi", ar: "التحديد" },
  "Find real problems to investigate.": { id: "Menemukan masalah nyata untuk diteliti.", ar: "إيجاد مشكلات حقيقية للبحث." },
  "Research": { id: "Riset", ar: "البحث" },
  "Literature, observation, and data.": { id: "Kajian pustaka, observasi, dan data.", ar: "المراجع والملاحظة والبيانات." },
  "Design": { id: "Rancang", ar: "التصميم" },
  "Systems, circuits, or experiments.": { id: "Sistem, rangkaian, atau eksperimen.", ar: "أنظمة أو دوائر أو تجارب." },
  "Build": { id: "Bangun", ar: "البناء" },
  "Prototypes and experimental setups.": { id: "Prototipe dan rangkaian percobaan.", ar: "نماذج أولية وتجهيزات تجريبية." },
  "Test": { id: "Uji", ar: "الاختبار" },
  "Clear procedures to gather data.": { id: "Prosedur jelas untuk mengumpulkan data.", ar: "إجراءات واضحة لجمع البيانات." },
  "Analyze": { id: "Analisis", ar: "التحليل" },
  "Assess performance and effectiveness.": { id: "Menilai kinerja dan efektivitas.", ar: "تقييم الأداء والفاعلية." },
  "Improve": { id: "Perbaiki", ar: "التحسين" },
  "Evaluate and refine the design.": { id: "Mengevaluasi dan menyempurnakan rancangan.", ar: "تقويم التصميم وتحسينه." },
  "Present": { id: "Presentasi", ar: "العرض" },
  "Reports, exhibitions, competitions.": { id: "Laporan, pameran, kompetisi.", ar: "تقارير ومعارض ومسابقات." },
  "Supporting Activities": { id: "Kegiatan Pendukung", ar: "الأنشطة المساندة" },
  "STEM Workshops (IoT, Arduino/ESP32, Robotics, AI)": { id: "Workshop STEM (IoT, Arduino/ESP32, Robotika, AI)", ar: "ورش عمل (إنترنت الأشياء، أردوينو/ESP32، الروبوتات، الذكاء الاصطناعي)" },
  "Science Experiments": { id: "Eksperimen Sains", ar: "التجارب العلمية" },
  "Research Training": { id: "Pelatihan Riset", ar: "التدريب البحثي" },
  "Competitions & Exhibitions": { id: "Kompetisi & Pameran", ar: "المسابقات والمعارض" },
  "Peer Mentoring": { id: "Mentoring Sebaya", ar: "الإرشاد بين الأقران" },

  // ----- Achievements -----
  "Results that speak": { id: "Hasil yang berbicara", ar: "نتائج تتحدث عن نفسها" },
  "Growth of the club and recognition at national and international events.": { id: "Pertumbuhan klub dan pengakuan di ajang nasional maupun internasional.", ar: "نموّ النادي والتقدير في الفعاليات الوطنية والدولية." },
  "Students involved": { id: "Santri terlibat", ar: "طالب مشارك" },
  "Teachers / mentors": { id: "Guru / pembina", ar: "معلم / مشرف" },
  "STEM projects": { id: "Proyek STEM", ar: "مشروع علمي" },
  "Research / prototypes": { id: "Riset / prototipe", ar: "بحث / نموذج أولي" },
  "Competitions & exhibitions": { id: "Kompetisi & pameran", ar: "مسابقة ومعرض" },
  "Awards / certificates": { id: "Penghargaan / sertifikat", ar: "جائزة / شهادة" },
  "Learning modules": { id: "Modul pembelajaran", ar: "وحدة تعليمية" },
  "Honors & Recognition": { id: "Penghargaan & Pengakuan", ar: "الجوائز والتكريم" },
  "Gold Medal": { id: "Medali Emas", ar: "ميدالية ذهبية" },
  "Gold Medal & Semi Grand Award": { id: "Medali Emas & Semi Grand Award", ar: "ميدالية ذهبية وجائزة شبه كبرى" },
  "1st Best Team": { id: "Tim Terbaik 1", ar: "أفضل فريق – المركز الأول" },
  "2nd Best SDGs Project Presentation": { id: "Presentasi Proyek SDGs Terbaik 2", ar: "أفضل عرض لمشروع التنمية المستدامة – المركز الثاني" },
  "3rd Best SDGs Project Video": { id: "Video Proyek SDGs Terbaik 3", ar: "أفضل فيديو لمشروع التنمية المستدامة – المركز الثالث" },
  "Bronze": { id: "Perunggu", ar: "برونزية" },
  "2nd Winner": { id: "Juara 2", ar: "المركز الثاني" },
  "Collaboration & Networking": { id: "Kolaborasi & Jejaring", ar: "التعاون والشراكات" },
  "STEM outreach & community engagement": { id: "Penjangkauan STEM & pelibatan masyarakat", ar: "نشر العلوم والتقنية وخدمة المجتمع" },
  "Research mentorship & advisory": { id: "Pendampingan & konsultasi riset", ar: "الإرشاد والاستشارة البحثية" },
  "Diponegoro University": { id: "Universitas Diponegoro", ar: "جامعة ديبونيغورو" },
  "Gadjah Mada University": { id: "Universitas Gadjah Mada", ar: "جامعة غاجاه مادا" },
  "Universitas Indonesia": { en: "University of Indonesia", ar: "جامعة إندونيسيا" },

  // ----- Area Anggota & harga (teks asli Bahasa Indonesia) -----
  "Area Anggota": { en: "Members Area", ar: "منطقة الأعضاء" },
  "Daftar gratis, belajar tanpa batas": { en: "Sign up free, learn without limits", ar: "سجّل مجانًا وتعلّم بلا حدود" },
  "Siapa pun bisa mendaftar. Menu Download gratis untuk anggota; Belajar & Ujian dengan langganan Premium.": { en: "Anyone can sign up. Downloads are free for members; Learn & Exams come with a Premium subscription.", ar: "يمكن لأي شخص التسجيل. التنزيلات مجانية للأعضاء، أما التعلّم والاختبارات فمع الاشتراك المميز." },
  "⭐ Premium": { en: "⭐ Premium", ar: "⭐ مميز" },
  "Belajar": { en: "Learn", ar: "التعلّم" },
  "Materi dan aplikasi untuk setiap mata pelajaran sains.": { en: "Materials and apps for every science subject.", ar: "مواد وتطبيقات لكل مادة علمية." },
  "Matematika": { en: "Mathematics", ar: "الرياضيات" },
  "Fisika": { en: "Physics", ar: "الفيزياء" },
  "Kimia": { en: "Chemistry", ar: "الكيمياء" },
  "Biologi": { en: "Biology", ar: "الأحياء" },
  "Buka →": { en: "Open →", ar: "افتح ←" },
  "✓ Gratis": { en: "✓ Free", ar: "✓ مجاني" },
  "Download": { en: "Download", ar: "التنزيلات" },
  "Informasi resmi dan dokumen untuk anggota.": { en: "Official information and documents for members.", ar: "معلومات رسمية ووثائق للأعضاء." },
  "Pengumuman": { en: "Announcements", ar: "الإعلانات" },
  "Hasil Ujian": { en: "Exam Results", ar: "نتائج الاختبارات" },
  "Sertifikat": { en: "Certificates", ar: "الشهادات" },
  "Ujian": { en: "Exams", ar: "الاختبارات" },
  "Bahan latihan dan soal ujian dari pembina.": { en: "Practice materials and exam papers from mentors.", ar: "مواد تدريبية وأسئلة اختبارات من المشرفين." },
  "Latihan Soal & Pembahasan": { en: "Practice Questions & Solutions", ar: "تمارين مع الحلول" },
  "Soal Ujian": { en: "Exam Papers", ar: "أسئلة الاختبارات" },
  "Gratis": { en: "Free", ar: "مجاني" },
  "✓ Akun portal TSTC": { en: "✓ TSTC portal account", ar: "✓ حساب في بوابة النادي" },
  "✓ Pengumuman": { en: "✓ Announcements", ar: "✓ الإعلانات" },
  "✓ Hasil ujian & sertifikat": { en: "✓ Exam results & certificates", ar: "✓ نتائج الاختبارات والشهادات" },
  "/bulan": { en: "/month", ar: "/ شهريًا" },
  "✓ Semua fitur Anggota": { en: "✓ All Member features", ar: "✓ جميع مزايا العضوية" },
  "✓ Materi & aplikasi 4 mata pelajaran": { en: "✓ Materials & apps for 4 subjects", ar: "✓ مواد وتطبيقات لأربع مواد" },
  "✓ Latihan soal + pembahasan": { en: "✓ Practice questions + solutions", ar: "✓ تمارين مع الحلول" },
  "✓ Soal ujian": { en: "✓ Exam papers", ar: "✓ أسئلة الاختبارات" },
  "Langganan sekarang": { en: "Subscribe now", ar: "اشترك الآن" },

  // ----- Belajar Online -----
  "Belajar Online": { en: "Online Learning", ar: "التعلّم عبر الإنترنت" },
  "🎓 Belajar Online": { en: "🎓 Online Learning", ar: "🎓 التعلّم عبر الإنترنت" },
  "Kelas online TSTC untuk santri dan umum": { en: "TSTC online classes for students and the public", ar: "دورات النادي عبر الإنترنت للطلاب والجمهور" },
  "Masuk atau daftar, lalu berlangganan Premium Rp25.000 per bulan untuk membuka semua kelas di bawah ini.": { en: "Log in or sign up, then subscribe to Premium for Rp25,000 per month to unlock every class below.", ar: "سجّل الدخول أو أنشئ حسابًا، ثم اشترك في الباقة المميزة بمبلغ 25,000 روبية شهريًا لفتح جميع الدورات أدناه." },
  "Matematika & Science": { en: "Mathematics & Science", ar: "الرياضيات والعلوم" },
  "Materi, aplikasi, latihan soal, dan soal ujian sains.": { en: "Materials, apps, practice questions, and science exam papers.", ar: "مواد وتطبيقات وتمارين وأسئلة اختبارات علمية." },
  "Robotika": { en: "Robotics", ar: "الروبوتات" },
  "Belajar elektronika, sensor, dan membuat robot sendiri.": { en: "Learn electronics, sensors, and build your own robot.", ar: "تعلّم الإلكترونيات والحساسات وابنِ روبوتك بنفسك." },
  "Proyek & Tutorial": { en: "Projects & Tutorials", ar: "مشاريع ودروس" },
  "Materi": { en: "Materials", ar: "المواد" },
  "Aplikasi": { en: "Apps", ar: "التطبيقات" },
  "Kompetisi": { en: "Competitions", ar: "المسابقات" },
  "Persiapan olimpiade, lomba karya ilmiah, dan inovasi.": { en: "Olympiad preparation, scientific paper contests, and innovation.", ar: "الاستعداد للأولمبياد ومسابقات البحث العلمي والابتكار." },
  "Materi Olimpiade": { en: "Olympiad Materials", ar: "مواد الأولمبياد" },
  "Latihan Soal Lomba": { en: "Contest Practice", ar: "تمارين المسابقات" },
  "Karya Ilmiah": { en: "Scientific Papers", ar: "الأبحاث العلمية" },
  "✓ Matematika & Science": { en: "✓ Mathematics & Science", ar: "✓ الرياضيات والعلوم" },
  "✓ Robotika": { en: "✓ Robotics", ar: "✓ الروبوتات" },
  "✓ Kompetisi": { en: "✓ Competitions", ar: "✓ المسابقات" },
  "Siapa pun bisa mendaftar. Menu Download gratis untuk anggota; Belajar Online dengan langganan Premium.": { en: "Anyone can sign up. Downloads are free for members; Online Learning comes with a Premium subscription.", ar: "يمكن لأي شخص التسجيل. التنزيلات مجانية للأعضاء، أما التعلّم عبر الإنترنت فمع الاشتراك المميز." },

  // ----- Roadmap -----
  "Sustainability roadmap 2026–2033": { id: "Peta jalan keberlanjutan 2026–2033", ar: "خارطة طريق الاستدامة 2026–2033" },
  "Foundation": { id: "Fondasi", ar: "التأسيس" },
  "Documentation, project repository, STEM curriculum integration, member training.": { id: "Dokumentasi, repositori proyek, integrasi kurikulum STEM, pelatihan anggota.", ar: "التوثيق، ومستودع المشاريع، ودمج المنهج العلمي، وتدريب الأعضاء." },
  "Expansion": { id: "Perluasan", ar: "التوسّع" },
  "Project portfolio scaling, peer mentorship, workshops, national competitions.": { id: "Perluasan portofolio proyek, mentoring sebaya, workshop, kompetisi nasional.", ar: "توسيع محفظة المشاريع، والإرشاد بين الأقران، وورش العمل، والمسابقات الوطنية." },
  "Collaboration": { id: "Kolaborasi", ar: "التعاون" },
  "University and industry partnerships, inter-school science networks.": { id: "Kemitraan dengan universitas dan industri, jejaring sains antarsekolah.", ar: "شراكات مع الجامعات والصناعة، وشبكات علمية بين المدارس." },
  "Regional Engagement": { id: "Keterlibatan Regional", ar: "الانخراط الإقليمي" },
  "International collaboration and an Asia-Pacific science club network.": { id: "Kolaborasi internasional dan jejaring klub sains Asia-Pasifik.", ar: "تعاون دولي وشبكة أندية علمية في آسيا والمحيط الهادئ." },
  "Institutionalization": { id: "Pelembagaan", ar: "المأسسة" },
  "STEM incubation center, research publishing, STEM certification.": { id: "Pusat inkubasi STEM, publikasi riset, sertifikasi STEM.", ar: "حاضنة للعلوم والتقنية، ونشر البحوث، وشهادات معتمدة." },
  "Global Leadership": { id: "Kepemimpinan Global", ar: "الريادة العالمية" },
  "Student exchange, IP filing, global summits, research fellowships.": { id: "Pertukaran pelajar, pendaftaran HKI, konferensi global, beasiswa riset.", ar: "تبادل طلابي، وتسجيل الملكية الفكرية، وقمم عالمية، ومنح بحثية." },
  "Commercialization": { id: "Komersialisasi", ar: "التسويق التجاري" },
  "Tech transfer, educational advisory, smart campus integration.": { id: "Alih teknologi, layanan konsultasi pendidikan, integrasi kampus cerdas.", ar: "نقل التقنية، والاستشارات التعليمية، ودمج الحرم الذكي." },
  "Sustainable Legacy": { id: "Warisan Berkelanjutan", ar: "إرث مستدام" },
  "Global social impact, STEM advocacy hub, green tech excellence.": { id: "Dampak sosial global, pusat advokasi STEM, keunggulan teknologi hijau.", ar: "أثر اجتماعي عالمي، ومركز للدعوة إلى العلوم والتقنية، وتميّز في التقنية الخضراء." },

  // ----- Gallery -----
  "Moments of discovery": { id: "Momen penemuan", ar: "لحظات الاكتشاف" },
  "All": { id: "Semua", ar: "الكل" },
  "Awards": { id: "Penghargaan", ar: "الجوائز" },
  "Projects": { id: "Proyek", ar: "المشاريع" },
  "Learning": { id: "Pembelajaran", ar: "التعلّم" },

  // ----- Contact & footer -----
  "Let's collaborate": { id: "Mari berkolaborasi", ar: "لنتعاون معًا" },
  "Interested in collaboration, mentoring, or joint research? Send us a message.": { id: "Tertarik berkolaborasi, mentoring, atau riset bersama? Kirimkan pesan kepada kami.", ar: "هل ترغب في التعاون أو الإرشاد أو البحث المشترك؟ أرسل لنا رسالة." },
  "Address": { id: "Alamat", ar: "العنوان" },
  "Pondok Modern Tazakka, Batang Regency, Central Java, Indonesia": { id: "Pondok Modern Tazakka, Kabupaten Batang, Jawa Tengah, Indonesia", ar: "معهد تزكية الحديث، محافظة باتانج، جاوة الوسطى، إندونيسيا" },
  "Club": { id: "Klub", ar: "النادي" },
  "Name": { id: "Nama", ar: "الاسم" },
  "Email": { id: "Email", ar: "البريد الإلكتروني" },
  "Message": { id: "Pesan", ar: "الرسالة" },
  "Send Message": { id: "Kirim Pesan", ar: "أرسل الرسالة" },
  "Your full name": { id: "Nama lengkap Anda", ar: "اسمك الكامل" },
  "name@example.com": { id: "nama@contoh.com", ar: "name@example.com" },
  "Write your message": { id: "Tulis pesan Anda", ar: "اكتب رسالتك" },
  "A science and technology community of Pondok Modern Tazakka, Batang, Central Java, Indonesia.": { id: "Komunitas sains dan teknologi Pondok Modern Tazakka, Batang, Jawa Tengah, Indonesia.", ar: "مجتمع للعلوم والتكنولوجيا في معهد تزكية الحديث، باتانج، جاوة الوسطى، إندونيسيا." },
  "Explore": { id: "Jelajahi", ar: "استكشف" },
  "© 2026 Tazakka Science and Technology Club · Pondok Modern Tazakka": { id: "© 2026 Tazakka Science and Technology Club · Pondok Modern Tazakka", ar: "© 2026 نادي تزكية للعلوم والتكنولوجيا · معهد تزكية الحديث" },

  // ----- Pesan formulir (dipakai main.js) -----
  "Please fill in all fields.": { id: "Mohon isi semua kolom.", ar: "يرجى ملء جميع الحقول." },
  "Please enter a valid email address.": { id: "Mohon masukkan email yang valid.", ar: "يرجى إدخال بريد إلكتروني صحيح." },
  "Your email app is opening.": { id: "Aplikasi email Anda sedang dibuka.", ar: "جارٍ فتح تطبيق البريد." },
  "Thank you": { id: "Terima kasih", ar: "شكرًا" },
};

// Mengambil terjemahan satu teks
function t(teks, bahasa) {
  bahasa = bahasa || window.BAHASA || "en";
  const k = KAMUS[teks];
  if (!k) return teks;
  return k[bahasa] || teks;
}

// Menerjemahkan semua teks di dalam sebuah elemen
function terjemahkan(akar, bahasa) {
  const walker = document.createTreeWalker(akar, NodeFilter.SHOW_TEXT);
  const node = [];
  while (walker.nextNode()) node.push(walker.currentNode);
  node.forEach(function (n) {
    const asli = n.nodeValue;
    const inti = asli.trim().replace(/\s+/g, " ");
    if (!inti || !KAMUS[inti]) return;
    const depan = asli.match(/^\s*/)[0];
    const belakang = asli.match(/\s*$/)[0];
    n.nodeValue = depan + t(inti, bahasa) + belakang;
  });
  akar.querySelectorAll("[placeholder]").forEach(function (el) {
    el.placeholder = t(el.placeholder, bahasa);
  });
}
