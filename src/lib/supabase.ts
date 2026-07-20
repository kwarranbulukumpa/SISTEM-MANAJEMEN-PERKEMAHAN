import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AppSettings, Peserta, Kegiatan, Kehadiran, Admin, AuditLog, Pengumuman, DokumenKegiatan, PangkalanDetail } from '../types';

let supabaseInstance: SupabaseClient | null = null;
let lastUrl: string = "";
let lastKey: string = "";

export function isValidSupabaseConfig(config: any): boolean {
  return !!(config && config.supabaseUrl && config.supabaseAnonKey);
}

export function getSupabaseInstance(config?: any): SupabaseClient {
  const url = config?.supabaseUrl || "";
  const key = config?.supabaseAnonKey || "";

  if (!url || !key) {
    throw new Error("Kredensial Supabase URL dan Anon Key diperlukan.");
  }

  let sanitizedUrl = url.trim();
  while (sanitizedUrl.endsWith('/')) {
    sanitizedUrl = sanitizedUrl.slice(0, -1);
  }
  if (sanitizedUrl.endsWith('/rest/v1')) {
    sanitizedUrl = sanitizedUrl.slice(0, -8);
  }
  while (sanitizedUrl.endsWith('/')) {
    sanitizedUrl = sanitizedUrl.slice(0, -1);
  }

  const sanitizedKey = key.trim();

  if (supabaseInstance && lastUrl === sanitizedUrl && lastKey === sanitizedKey) {
    return supabaseInstance;
  }

  supabaseInstance = createClient(sanitizedUrl, sanitizedKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });
  
  lastUrl = sanitizedUrl;
  lastKey = sanitizedKey;
  return supabaseInstance;
}

export function resetSupabaseInstance() {
  supabaseInstance = null;
}

/**
 * Menyimpan satu baris data ke tabel Supabase
 */
export async function saveToSupabase(
  client: SupabaseClient, 
  table: string, 
  idCol: string, 
  idVal: string | number, 
  data: any
): Promise<void> {
  const payload = { ...data };
  payload[idCol] = idVal;

  const { error } = await client
    .from(table)
    .upsert(payload, { onConflict: idCol });

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Menghapus satu baris data dari tabel Supabase
 */
export async function deleteFromSupabase(
  client: SupabaseClient, 
  table: string, 
  idCol: string, 
  idVal: string | number
): Promise<void> {
  const { error } = await client
    .from(table)
    .delete()
    .eq(idCol, idVal);

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Melakukan migrasi seluruh database lokal ke Supabase
 */
export async function uploadLocalToSupabase(
  client: SupabaseClient, 
  data: {
    peserta: Peserta[];
    kegiatan: Kegiatan[];
    kehadiran: Kehadiran[];
    admins: Admin[];
    auditLogs: AuditLog[];
    announcements: Pengumuman[];
    documents: DokumenKegiatan[];
    pangkalanDetails: PangkalanDetail[];
    settings: AppSettings;
  }
): Promise<void> {
  // 1. Settings (simpan sebagai baris global di tabel settings)
  const { error: settingsErr } = await client
    .from('settings')
    .upsert({ id: 'global', data: data.settings }, { onConflict: 'id' });
  if (settingsErr) {
    throw new Error("Gagal mengunggah Settings ke Supabase: " + settingsErr.message);
  }

  // Helper untuk upload batch per tabel
  const upsertAll = async (table: string, idCol: string, items: any[]) => {
    if (items.length === 0) return;
    
    // Pecah data menjadi chunk kecil (maks 100 data sekali kirim) demi performa
    const chunkSize = 100;
    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);
      const { error } = await client
        .from(table)
        .upsert(chunk, { onConflict: idCol });
        
      if (error) {
        throw new Error(`Gagal mengunggah ke tabel [${table}] (baris ${i} - ${i + chunk.length}): ${error.message}`);
      }
    }
  };

  await upsertAll('peserta', 'idPeserta', data.peserta);
  await upsertAll('kegiatan', 'idKegiatan', data.kegiatan);
  await upsertAll('kehadiran', 'id', data.kehadiran);
  await upsertAll('admins', 'username', data.admins);
  await upsertAll('audit_logs', 'id', data.auditLogs);
  await upsertAll('announcements', 'id', data.announcements);
  await upsertAll('documents', 'id', data.documents);
  await upsertAll('pangkalan_details', 'idPeserta', data.pangkalanDetails);
}
