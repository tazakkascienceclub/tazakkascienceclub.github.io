// =========================================================
// PENGATURAN WEBSITE TSTC  ⚠️ ISI 3 BARIS DI BAWAH INI
// =========================================================

// 1. Dari Supabase: tombol "Connect" di atas dashboard proyek
//    "Project URL", contoh: https://abcdefghijk.supabase.co
const SUPABASE_URL = "https://rxfmwgubbmwlyxeefbdk.supabase.co";

// 2. Dari Supabase: Settings → API Keys → "Publishable key" (sb_publishable_...)
//    Kunci ini memang aman ditaruh di website.
//    ⛔ JANGAN pakai "secret key" (sb_secret_...) atau "service_role".
const SUPABASE_ANON_KEY = "sb_publishable_NY_Xxj-ag2977RnU194btQ_b7dik8Q_";

// 3. Email klub untuk formulir kontak
const CLUB_EMAIL = "tazakkascienceclub@gmail.com";

// =========================================================
// Bagian di bawah ini tidak perlu diubah
// =========================================================
const SUPABASE_SIAP =
  typeof supabase !== "undefined" &&
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_ANON_KEY.length > 20;

const db = SUPABASE_SIAP ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
