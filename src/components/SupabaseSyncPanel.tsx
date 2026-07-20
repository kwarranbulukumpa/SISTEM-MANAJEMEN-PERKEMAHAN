import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Database, 
  CheckCircle, 
  XCircle, 
  UploadCloud, 
  Play, 
  Info, 
  Key, 
  Server,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  HelpCircle,
  Clipboard,
  Check
} from 'lucide-react';
import { AppSettings, Peserta, Kegiatan, Kehadiran, Admin, AuditLog, Pengumuman, DokumenKegiatan, PangkalanDetail } from '../types';
import { getSupabaseInstance, uploadLocalToSupabase, isValidSupabaseConfig, resetSupabaseInstance } from '../lib/supabase';

interface SupabaseSyncPanelProps {
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  peserta: Peserta[];
  kegiatan: Kegiatan[];
  kehadiran: Kehadiran[];
  admins: Admin[];
  auditLogs: AuditLog[];
  announcements: Pengumuman[];
  documents: DokumenKegiatan[];
  pangkalanDetails: PangkalanDetail[];
  onAddAuditLog: (aktivitas: string, detail: string) => void;
}

export default function SupabaseSyncPanel({
  settings,
  onUpdateSettings,
  peserta,
  kegiatan,
  kehadiran,
  admins,
  auditLogs,
  announcements,
  documents,
  pangkalanDetails,
  onAddAuditLog
}: SupabaseSyncPanelProps) {
  const [config, setConfig] = useState({
    supabaseUrl: settings.supabaseConfig?.supabaseUrl || '',
    supabaseAnonKey: settings.supabaseConfig?.supabaseAnonKey || ''
  });

  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isMigrating, setIsMigrating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Cek koneksi di awal saat render jika Supabase aktif
  useEffect(() => {
    if (settings.supabaseEnabled) {
      testConnection();
    }
  }, [settings.supabaseEnabled]);

  const testConnection = async (customConfig?: typeof config) => {
    setConnectionStatus('testing');
    setErrorMsg(null);
    setSuccessMsg(null);

    const activeConfig = customConfig || config;
    if (!isValidSupabaseConfig(activeConfig)) {
      setConnectionStatus('disconnected');
      setErrorMsg("Kredensial Supabase belum lengkap. Silakan lengkapi URL dan Anon Key.");
      return false;
    }

    try {
      resetSupabaseInstance();
      const client = getSupabaseInstance(activeConfig);
      
      // Kita coba fetch baris settings untuk mengetes apakah koneksi dan tabel sudah valid
      const { data, error } = await client
        .from('settings')
        .select('*')
        .limit(1);

      if (error) {
        // Jika errornya karena tabel tidak ada, koneksi sebenernya berhasil tapi tabel perlu di-create
        if (error.code === 'PGRST116' || error.message.includes('relation "settings" does not exist')) {
          setConnectionStatus('connected');
          setSuccessMsg("Koneksi berhasil! Namun, tabel database belum dibuat di Supabase Anda. Harap jalankan script SQL di bawah di SQL Editor Supabase Anda.");
          return true;
        }
        throw new Error(error.message);
      }

      setConnectionStatus('connected');
      return true;
    } catch (err: any) {
      setConnectionStatus('disconnected');
      setErrorMsg(err.message || "Gagal menghubungkan ke Supabase. Periksa kembali URL dan Anon Key Anda, serta pastikan tabel 'settings' sudah dibuat.");
      return false;
    }
  };

  const handleInputChange = (field: keyof typeof config, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value.trim()
    }));
  };

  const handleSaveConfig = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!isValidSupabaseConfig(config)) {
      setErrorMsg("Harap isi semua kolom konfigurasi Supabase.");
      return;
    }

    const isConnected = await testConnection(config);
    if (isConnected) {
      onUpdateSettings({
        ...settings,
        supabaseEnabled: true,
        supabaseConfig: config
      });
      onAddAuditLog("Konfigurasi Supabase", "Menyimpan dan mengaktifkan integrasi database cloud Supabase.");
      setSuccessMsg("Konfigurasi berhasil disimpan! Integrasi Supabase kini aktif secara real-time.");
    }
  };

  const handleToggleSupabase = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (settings.supabaseEnabled) {
      // Nonaktifkan
      onUpdateSettings({
        ...settings,
        supabaseEnabled: false
      });
      setConnectionStatus('disconnected');
      onAddAuditLog("Supabase Dinonaktifkan", "Menonaktifkan sinkronisasi database cloud Supabase.");
      setSuccessMsg("Sinkronisasi Supabase berhasil dinonaktifkan. Aplikasi kembali menggunakan database lokal (localStorage).");
    } else {
      // Aktifkan
      if (!isValidSupabaseConfig(config)) {
        setErrorMsg("Tidak dapat mengaktifkan. Konfigurasi Supabase Anda belum lengkap.");
        return;
      }
      const isConnected = await testConnection(config);
      if (isConnected) {
        onUpdateSettings({
          ...settings,
          supabaseEnabled: true,
          supabaseConfig: config
        });
        onAddAuditLog("Supabase Diaktifkan", "Mengaktifkan sinkronisasi database cloud Supabase.");
        setSuccessMsg("Sinkronisasi Supabase berhasil diaktifkan secara real-time!");
      }
    }
  };

  const handleMigrateData = async () => {
    if (!settings.supabaseEnabled) {
      setErrorMsg("Harap aktifkan koneksi Supabase terlebih dahulu sebelum melakukan migrasi data.");
      return;
    }

    const client = getSupabaseInstance(settings.supabaseConfig);
    if (!client) {
      setErrorMsg("Gagal terhubung ke client database Supabase.");
      return;
    }

    const confirmMigrate = window.confirm(
      "Apakah Anda yakin ingin mengunggah semua data lokal saat ini ke cloud Supabase?\n\n" +
      "Tindakan ini akan menimpa data di Supabase dengan data lokal Anda saat ini (Peserta, Kegiatan, Kehadiran, dll).\n\n" +
      "PENTING: Pastikan Anda sudah menjalankan script SQL di bawah ini pada Supabase SQL Editor sebelum memulai migrasi!"
    );

    if (!confirmMigrate) return;

    setIsMigrating(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await uploadLocalToSupabase(client, {
        peserta,
        kegiatan,
        kehadiran,
        admins,
        auditLogs,
        announcements,
        documents,
        pangkalanDetails,
        settings
      });

      onAddAuditLog("Migrasi Supabase", "Berhasil mengunggah dan menyinkronkan seluruh database lokal ke Supabase.");
      setSuccessMsg("MIGRASI BERHASIL! Seluruh data lokal saat ini telah diunggah dan terintegrasi penuh ke database cloud Supabase.");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Gagal mengunggah data ke Supabase: " + (err.message || "Kesalahan tidak diketahui. Periksa apakah tabel di Supabase sudah dibuat dan memiliki izin RLS yang tepat."));
    } finally {
      setIsMigrating(false);
    }
  };

  const sqlScript = `-- SCRIPT SETTING DATABASE PRAMUKA DI SUPABASE SQL EDITOR
-- Jalankan kode SQL di bawah ini sekaligus di SQL Editor Supabase Anda

-- 1. Tabel settings
create table if not exists settings (
  id text primary key,
  data jsonb not null
);

-- 2. Tabel peserta
create table if not exists peserta (
  "idPeserta" text primary key,
  "namaPangkalan" text,
  "jenisKelamin" text,
  "kodeQr" text,
  "tanggalDaftar" text,
  "statusAktif" boolean,
  "tingkatan" text
);

-- 3. Tabel kegiatan
create table if not exists kegiatan (
  "idKegiatan" text primary key,
  "namaKegiatan" text,
  hari text,
  tanggal text,
  "jamMulai" text,
  "jamSelesai" text,
  lokasi text,
  status text,
  urutan numeric,
  tingkatan jsonb
);

-- 4. Tabel kehadiran
create table if not exists kehadiran (
  id text primary key,
  tanggal text,
  jam text,
  "idPeserta" text,
  "namaPangkalan" text,
  "jenisKelamin" text,
  "idKegiatan" text,
  "namaKegiatan" text,
  "statusHadir" text,
  petugas text
);

-- 5. Tabel admins
create table if not exists admins (
  username text primary key,
  password text,
  nama text,
  level text
);

-- 6. Tabel audit_logs
create table if not exists audit_logs (
  id text primary key,
  timestamp text,
  pengguna text,
  aktivitas text,
  detail text
);

-- 7. Tabel announcements
create table if not exists announcements (
  id text primary key,
  judul text,
  konten text,
  tanggal text,
  jam text,
  "tingkatanTarget" text,
  "statusAktif" boolean,
  "dibuatOleh" text
);

-- 8. Tabel documents
create table if not exists documents (
  id text primary key,
  judul text,
  "linkDrive" text,
  tingkatan text,
  "tanggalUpload" text
);

-- 9. Tabel pangkalan_details
create table if not exists pangkalan_details (
  "idPeserta" text primary key,
  "namaPembina" text,
  "hpPembina" text,
  anggota jsonb
);

-- Nonaktifkan RLS demi kemudahan akses instan API (atau sesuaikan kebijakan keamanan Anda)
alter table settings disable row level security;
alter table peserta disable row level security;
alter table kegiatan disable row level security;
alter table kehadiran disable row level security;
alter table admins disable row level security;
alter table audit_logs disable row level security;
alter table announcements disable row level security;
alter table documents disable row level security;
alter table pangkalan_details disable row level security;

-- Aktifkan Realtime Publikasi Supabase untuk Sinkronisasi Instan
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;

alter publication supabase_realtime add table settings;
alter publication supabase_realtime add table peserta;
alter publication supabase_realtime add table kegiatan;
alter publication supabase_realtime add table kehadiran;
alter publication supabase_realtime add table admins;
alter publication supabase_realtime add table audit_logs;
alter publication supabase_realtime add table announcements;
alter publication supabase_realtime add table documents;
alter publication supabase_realtime add table pangkalan_details;`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-fade-in">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase text-emerald-200">
            <Cloud className="w-3.5 h-3.5 animate-bounce" /> Cloud Synchronization
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight">Database Supabase (PostgreSQL)</h2>
          <p className="text-xs text-emerald-200/90 max-w-lg leading-relaxed">
            Ganti integrasi database cloud dari Firebase ke Supabase! Simpan seluruh data peserta, kegiatan, dokumen, dan riwayat absensi secara real-time dan terpusat dengan infrastruktur PostgreSQL yang sangat andal.
          </p>
        </div>
        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl min-w-[200px] text-center shadow-inner">
          <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1">Status Sinkronisasi</span>
          {settings.supabaseEnabled && connectionStatus === 'connected' ? (
            <div className="flex flex-col items-center gap-1.5">
              <span className="inline-flex items-center gap-1 bg-emerald-500/25 text-emerald-400 px-3 py-1 rounded-full text-[11px] font-bold border border-emerald-500/30">
                <CheckCircle className="w-3.5 h-3.5" /> Aktif & Terhubung
              </span>
              <p className="text-[9px] text-zinc-300 mt-1">Sistem sinkronisasi real-time Supabase menyala</p>
            </div>
          ) : settings.supabaseEnabled && connectionStatus === 'testing' ? (
            <div className="flex flex-col items-center gap-1.5">
              <span className="inline-flex items-center gap-1 bg-amber-500/25 text-amber-400 px-3 py-1 rounded-full text-[11px] font-bold border border-amber-500/30">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Menguji Koneksi...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <span className="inline-flex items-center gap-1 bg-zinc-500/25 text-zinc-400 px-3 py-1 rounded-full text-[11px] font-bold border border-zinc-500/30">
                <XCircle className="w-3.5 h-3.5" /> Nonaktif (Lokal)
              </span>
              <p className="text-[9px] text-zinc-300 mt-1">Menggunakan penyimpanan browser</p>
            </div>
          )}
        </div>
      </div>

      {/* FEEDBACK TOASTS */}
      {errorMsg && (
        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 p-4 rounded-2xl flex items-start gap-3 text-rose-700 dark:text-rose-400 text-xs">
          <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Error:</span> {errorMsg}
          </div>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-2xl flex items-start gap-3 text-emerald-700 dark:text-emerald-400 text-xs shadow-xs">
          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Informasi:</span> {successMsg}
          </div>
        </div>
      )}

      {/* CONFIG & INSTRUCTIONS BENTO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1: SETUP INSTRUCTIONS & SQL SCRIPT */}
        <div className="md:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
          <h3 className="font-bold text-xs uppercase text-zinc-800 dark:text-zinc-200 tracking-wider flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <HelpCircle className="w-4 h-4 text-emerald-500" /> Langkah Pengaturan
          </h3>
          <ol className="space-y-3.5 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed list-decimal pl-4">
            <li>
              Buka <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline font-bold">Supabase Console</a> dan buat project baru.
            </li>
            <li>
              Buka menu <strong>SQL Editor</strong> di sidebar kiri Supabase.
            </li>
            <li>
              Klik <strong>New Query</strong>, lalu salin script SQL di bawah ini dan jalankan (klik <strong>Run</strong>) untuk membuat semua tabel.
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={handleCopySql}
                  className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-900 cursor-pointer hover:bg-emerald-100 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Clipboard className="w-3 h-3" />}
                  {copied ? 'Tersalin!' : 'Salin Script SQL'}
                </button>
              </div>
            </li>
            <li>
              Buka menu <strong>Project Settings</strong> (ikon gerigi) &gt; <strong>API</strong>.
            </li>
            <li>
              Salin <strong>Project URL</strong> dan <strong>anon public API Key</strong>, lalu tempel di kolom konfigurasi sebelah kanan.
            </li>
          </ol>
        </div>

        {/* CARD 2: CONFIGURATION FORM */}
        <div className="md:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xs uppercase text-zinc-800 dark:text-zinc-200 tracking-wider flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4">
              <Key className="w-4 h-4 text-emerald-500" /> Kredensial Supabase API
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Supabase URL</label>
                <input
                  type="text"
                  value={config.supabaseUrl}
                  onChange={(e) => handleInputChange('supabaseUrl', e.target.value)}
                  placeholder="https://your-project-id.supabase.co"
                  className="w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 rounded-xl p-3 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono shadow-inner"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Supabase Anon Key (Public Key)</label>
                <textarea
                  value={config.supabaseAnonKey}
                  onChange={(e) => handleInputChange('supabaseAnonKey', e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  rows={4}
                  className="w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 rounded-xl p-3 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono shadow-inner resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-6">
            <button
              onClick={() => testConnection()}
              disabled={connectionStatus === 'testing'}
              className="w-full sm:w-auto bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-300 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-zinc-250 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${connectionStatus === 'testing' ? 'animate-spin' : ''}`} />
              Tes Koneksi
            </button>

            <button
              onClick={handleSaveConfig}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Simpan & Hubungkan Supabase
            </button>
          </div>
        </div>
      </div>

      {/* SEEDING & ACTIONS PANEL */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-3xl shadow-xs space-y-4">
        <h3 className="font-bold text-sm uppercase text-zinc-800 dark:text-zinc-200 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Server className="w-4 h-4 text-emerald-500" /> Sinkronisasi & Migrasi Data Supabase
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Hubungkan / Putus Koneksi Supabase</h4>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed">
              Anda dapat mengaktifkan atau menonaktifkan koneksi Supabase secara instan. Saat dinonaktifkan, aplikasi akan secara aman kembali menggunakan penyimpanan lokal browser Anda (localStorage).
            </p>
            <div className="pt-2">
              <button
                onClick={handleToggleSupabase}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  settings.supabaseEnabled 
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20' 
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
                }`}
              >
                {settings.supabaseEnabled ? (
                  <>
                    <ToggleRight className="w-5 h-5" />
                    Putuskan Sinkronisasi Supabase
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-5 h-5" />
                    Aktifkan Sinkronisasi Supabase
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2 border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-800 pt-4 md:pt-0 md:pl-6">
            <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Migrasikan Database Lokal ke Supabase</h4>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed">
              Setelah menjalankan skrip SQL di Supabase editor, klik tombol di bawah ini untuk mengunggah seluruh data kegiatan, peserta, absensi, dokumen, dan pengumuman lokal Anda ke Cloud Supabase PostgreSQL untuk pertama kalinya.
            </p>
            <div className="pt-2">
              <button
                onClick={handleMigrateData}
                disabled={isMigrating || !settings.supabaseEnabled}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <UploadCloud className={`w-4 h-4 ${isMigrating ? 'animate-bounce' : ''}`} />
                {isMigrating ? 'Sedang Mengunggah...' : 'Unggah Data Lokal ke Supabase'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SQL SCRIPT DISPLAY CARD */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-3xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <h3 className="font-bold text-xs uppercase text-zinc-800 dark:text-zinc-200 tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-500" /> Script SQL Pembuatan Tabel
          </h3>
          <button
            onClick={handleCopySql}
            className="text-xs text-emerald-500 hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
            {copied ? 'Tersalin!' : 'Salin Script'}
          </button>
        </div>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
          Tempel dan jalankan query di bawah ini di menu <strong>SQL Editor</strong> Dashboard Supabase Anda:
        </p>
        <pre className="bg-zinc-50 dark:bg-zinc-850 p-4 rounded-xl text-[10px] text-zinc-600 dark:text-zinc-300 overflow-x-auto font-mono max-h-72 border border-zinc-100 dark:border-zinc-800">
          {sqlScript}
        </pre>
      </div>
    </div>
  );
}
