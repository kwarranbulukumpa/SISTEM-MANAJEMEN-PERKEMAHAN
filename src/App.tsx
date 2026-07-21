/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, Moon, Sun, Monitor, LogIn, Key, Compass, Users, Clock, AlertTriangle, AlertCircle, Sparkles, X, UserCheck, Megaphone, Volume2, XCircle
} from 'lucide-react';

import { Peserta, Kegiatan, Kehadiran, Admin, AuditLog, AppSettings, Pengumuman, PangkalanDetail, DokumenKegiatan, formatIndonesianDate, formatIndonesianTime, formatIndonesianPhoneNumber, getTingkatanFromSekolah } from './types';
import {
  defaultPeserta, defaultKegiatan, defaultKehadiran, defaultAdmins, defaultAuditLogs, defaultSettings, defaultAnnouncements, defaultDokumenKegiatan
} from './data/defaultData';

import AdminPanel from './components/AdminPanel';
import ParticipantDashboard from './components/ParticipantDashboard';
import PublicDashboard from './components/PublicDashboard';
import { speakIndonesianText, initializeTTS } from './lib/tts';
import { getSupabaseInstance, saveToSupabase, deleteFromSupabase } from './lib/supabase';

const initParseToHHMM = (timeStr: any): string => {
  if (!timeStr) return '';
  const str = String(timeStr).trim();
  
  const simpleMatch = str.match(/^(\d{1,2})[:.](\d{2})$/);
  if (simpleMatch) {
    return `${simpleMatch[1].padStart(2, '0')}:${simpleMatch[2]}`;
  }

  const withSecsMatch = str.match(/^(\d{1,2})[:.](\d{2})[:.](\d{2})$/);
  if (withSecsMatch) {
    return `${withSecsMatch[1].padStart(2, '0')}:${withSecsMatch[2]}`;
  }

  if (str.includes('T')) {
    try {
      const date = new Date(str);
      if (!isNaN(date.getTime())) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (date.getFullYear() === 1899) {
          const corrected = new Date(date.getTime() + 343000);
          hours = corrected.getHours();
          minutes = corrected.getMinutes();
        }
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      }
    } catch (e) {
      // fallback
    }
  }

  const regexMatch = str.match(/(\d{1,2})[:.](\d{2})/);
  if (regexMatch) {
    return `${regexMatch[1].padStart(2, '0')}:${regexMatch[2]}`;
  }

  return str;
};

export default function App() {
  // --- DATABASE PERSISTENT STATE ---
  const [peserta, setPeserta] = useState<Peserta[]>(() => {
    const local = localStorage.getItem('pramuka_peserta');
    return local ? JSON.parse(local) : defaultPeserta;
  });

  const [kegiatan, setKegiatan] = useState<Kegiatan[]>(() => {
    const local = localStorage.getItem('pramuka_kegiatan');
    const rawList: Kegiatan[] = local ? JSON.parse(local) : defaultKegiatan;
    return rawList.map(k => ({
      ...k,
      jamMulai: initParseToHHMM(k.jamMulai),
      jamSelesai: initParseToHHMM(k.jamSelesai)
    }));
  });

  const [kehadiran, setKehadiran] = useState<Kehadiran[]>(() => {
    const local = localStorage.getItem('pramuka_kehadiran');
    return local ? JSON.parse(local) : defaultKehadiran;
  });

  const [admins, setAdmins] = useState<Admin[]>(() => {
    const local = localStorage.getItem('pramuka_admins');
    return local ? JSON.parse(local) : defaultAdmins;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const local = localStorage.getItem('pramuka_audit_logs');
    return local ? JSON.parse(local) : defaultAuditLogs;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const local = localStorage.getItem('pramuka_settings');
    const systemPrefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const parsed: AppSettings = local ? JSON.parse(local) : { ...defaultSettings, darkTheme: systemPrefersDark };
    return parsed;
  });

  const [announcements, setAnnouncements] = useState<Pengumuman[]>(() => {
    const local = localStorage.getItem('pramuka_announcements');
    return local ? JSON.parse(local) : defaultAnnouncements;
  });

  const [documents, setDocuments] = useState<DokumenKegiatan[]>(() => {
    const local = localStorage.getItem('pramuka_documents');
    return local ? JSON.parse(local) : defaultDokumenKegiatan;
  });

  const [pangkalanDetails, setRawPangkalanDetails] = useState<PangkalanDetail[]>(() => {
    const local = localStorage.getItem('pramuka_pangkalan_details');
    const parsed = local ? JSON.parse(local) : [];
    return parsed.map((detail: any) => ({
      ...detail,
      hpPembina: formatIndonesianPhoneNumber(detail.hpPembina)
    }));
  });

  const setPangkalanDetails = (value: React.SetStateAction<PangkalanDetail[]>) => {
    setRawPangkalanDetails(prev => {
      const resolved = typeof value === 'function' ? value(prev) : value;
      return resolved.map((detail: any) => ({
        ...detail,
        hpPembina: formatIndonesianPhoneNumber(detail.hpPembina)
      }));
    });
  };

  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const playAnnouncementVoice = (ann: Pengumuman) => {
    if (playingId === ann.id) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setPlayingId(null);
      return;
    }
    
    const textToSpeak = ann.konten;
    speakIndonesianText(textToSpeak, {
      onStart: () => setPlayingId(ann.id),
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null)
    });
  };

  // Combine real attendance with virtual "Tidak Hadir" logs for finished activities
  const combinedKehadiran = React.useMemo<Kehadiran[]>(() => {
    const list = [...kehadiran];
    const finishedKegiatans = kegiatan.filter(k => k.status === 'Selesai');

    finishedKegiatans.forEach(keg => {
      const eligiblePeserta = peserta.filter(p => {
        if (p.statusAktif === false) return false;
        if (keg.tingkatan && keg.tingkatan.length > 0) {
          return p.tingkatan && keg.tingkatan.includes(p.tingkatan);
        }
        return true;
      });

      eligiblePeserta.forEach(p => {
        const hasCheckedIn = kehadiran.some(h => h.idPeserta === p.idPeserta && h.idKegiatan === keg.idKegiatan);
        if (!hasCheckedIn) {
          list.push({
            id: `virtual_${keg.idKegiatan}_${p.idPeserta}`,
            tanggal: keg.tanggal,
            jam: '--:--',
            idPeserta: p.idPeserta,
            namaPangkalan: p.namaPangkalan,
            jenisKelamin: p.jenisKelamin,
            idKegiatan: keg.idKegiatan,
            namaKegiatan: keg.namaKegiatan,
            statusHadir: 'Tidak Hadir',
            petugas: 'Sistem'
          });
        }
      });
    });

    return list;
  }, [kehadiran, kegiatan, peserta]);

  const handleUpdateKehadiran = (newKehadiran: Kehadiran[]) => {
    const realKehadiran = newKehadiran.filter(h => !h.id.startsWith('virtual_'));
    setKehadiran(realKehadiran);
  };

  // Sync states with localStorage on every change
  useEffect(() => {
    localStorage.setItem('pramuka_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('pramuka_pangkalan_details', JSON.stringify(pangkalanDetails));
  }, [pangkalanDetails]);

  useEffect(() => {
    localStorage.setItem('pramuka_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('pramuka_peserta', JSON.stringify(peserta));
  }, [peserta]);

  useEffect(() => {
    localStorage.setItem('pramuka_kegiatan', JSON.stringify(kegiatan));
  }, [kegiatan]);

  useEffect(() => {
    localStorage.setItem('pramuka_kehadiran', JSON.stringify(kehadiran));
  }, [kehadiran]);

  useEffect(() => {
    localStorage.setItem('pramuka_admins', JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem('pramuka_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('pramuka_settings', JSON.stringify(settings));
    
    // Toggle dark class on html node
    if (settings.darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  // --- SUPABASE REAL-TIME SYNC ENGINE ---
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(false);
  const [supabaseInitializing, setSupabaseInitializing] = useState<boolean>(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  const isFirstPesertaSyncRef = useRef<boolean>(true);
  const isFirstKegiatanSyncRef = useRef<boolean>(true);
  const isFirstKehadiranSyncRef = useRef<boolean>(true);
  const isFirstAdminsSyncRef = useRef<boolean>(true);
  const isFirstAuditLogsSyncRef = useRef<boolean>(true);
  const isFirstAnnouncementsSyncRef = useRef<boolean>(true);
  const isFirstDocumentsSyncRef = useRef<boolean>(true);
  const isFirstPangkalanDetailsSyncRef = useRef<boolean>(true);
  const isFirstSettingsSyncRef = useRef<boolean>(true);

  // Reset first sync flags if disconnected
  useEffect(() => {
    if (!supabaseConnected) {
      isFirstPesertaSyncRef.current = true;
      isFirstKegiatanSyncRef.current = true;
      isFirstKehadiranSyncRef.current = true;
      isFirstAdminsSyncRef.current = true;
      isFirstAuditLogsSyncRef.current = true;
      isFirstAnnouncementsSyncRef.current = true;
      isFirstDocumentsSyncRef.current = true;
      isFirstPangkalanDetailsSyncRef.current = true;
      isFirstSettingsSyncRef.current = true;
    }
  }, [supabaseConnected]);

  useEffect(() => {
    if (!settings.supabaseEnabled || !settings.supabaseConfig) {
      setSupabaseConnected(false);
      return;
    }

    let active = true;
    let channel: any = null;
    let clientInstance: any = null;

    const setupSupabaseSync = async () => {
      try {
        if (active) {
          setSupabaseInitializing(true);
          setSupabaseConnected(false);
          setSupabaseError(null);
        }
        
        const client = getSupabaseInstance(settings.supabaseConfig);
        clientInstance = client;
        
        // 1. Ambil data awal dari Supabase
        const { data: setVal, error: errSettings } = await client
          .from('settings')
          .select('*')
          .eq('id', 'global')
          .maybeSingle();

        if (errSettings) throw new Error("Gagal memuat konfigurasi settings: " + errSettings.message);

        if (active) {
          if (setVal && setVal.data) {
            setSettings(prev => ({
              ...prev,
              ...setVal.data,
              supabaseEnabled: true,
              supabaseConfig: prev.supabaseConfig
            }));
          }

          // Tarik semua koleksi data lainnya secara paralel
          const [
            pResult,
            kResult,
            khResult,
            admResult,
            alResult,
            annResult,
            docResult,
            pdResult
          ] = await Promise.all([
            client.from('peserta').select('*'),
            client.from('kegiatan').select('*'),
            client.from('kehadiran').select('*'),
            client.from('admins').select('*'),
            client.from('audit_logs').select('*'),
            client.from('announcements').select('*'),
            client.from('documents').select('*'),
            client.from('pangkalan_details').select('*')
          ]);

          if (pResult.error) throw new Error(`Gagal memuat data peserta: ${pResult.error.message}`);
          if (kResult.error) throw new Error(`Gagal memuat data kegiatan: ${kResult.error.message}`);
          if (khResult.error) throw new Error(`Gagal memuat data kehadiran: ${khResult.error.message}`);
          if (admResult.error) throw new Error(`Gagal memuat data admins: ${admResult.error.message}`);
          if (alResult.error) throw new Error(`Gagal memuat data log audit: ${alResult.error.message}`);
          if (annResult.error) throw new Error(`Gagal memuat data pengumuman: ${annResult.error.message}`);
          if (docResult.error) throw new Error(`Gagal memuat data dokumen: ${docResult.error.message}`);
          if (pdResult.error) throw new Error(`Gagal memuat data rincian pangkalan: ${pdResult.error.message}`);

          const pList = pResult.data;
          const kList = kResult.data;
          const khList = khResult.data;
          const admList = admResult.data;
          const alList = alResult.data;
          const annList = annResult.data;
          const docList = docResult.data;
          const pdList = pdResult.data;

          if (pList) setPeserta(pList);
          if (kList) setKegiatan(kList);
          if (khList) setKehadiran(khList);
          if (admList) setAdmins(admList);
          if (alList) setAuditLogs(alList);
          if (annList) setAnnouncements(annList);
          if (docList) setDocuments(docList);
          if (pdList) setRawPangkalanDetails(pdList);

          setSupabaseConnected(true);
        }

        if (active) {
          setSupabaseInitializing(false);
        }

        // 2. Langganan perubahan PostgreSQL secara real-time
        const channelName = 'realtime_changes_' + Math.random().toString(36).substring(2, 10);
        channel = client
          .channel(channelName)
          .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, (payload) => {
            if (!active) return;
            const newRow = payload.new as any;
            if (newRow && newRow.id === 'global' && newRow.data) {
              setSettings(prev => ({
                ...prev,
                ...newRow.data,
                supabaseEnabled: true,
                supabaseConfig: prev.supabaseConfig
              }));
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'peserta' }, (payload) => {
            if (!active) return;
            if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
              const newRow = payload.new as Peserta;
              setPeserta(prev => {
                const idx = prev.findIndex(item => item.idPeserta === newRow.idPeserta);
                if (idx >= 0) {
                  const next = [...prev];
                  next[idx] = newRow;
                  return next;
                }
                return [...prev, newRow];
              });
            } else if (payload.eventType === 'DELETE') {
              const oldRow = payload.old;
              if (oldRow && oldRow.idPeserta) {
                setPeserta(prev => prev.filter(item => item.idPeserta !== oldRow.idPeserta));
              }
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'kegiatan' }, (payload) => {
            if (!active) return;
            if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
              const newRow = payload.new as Kegiatan;
              setKegiatan(prev => {
                const idx = prev.findIndex(item => item.idKegiatan === newRow.idKegiatan);
                if (idx >= 0) {
                  const next = [...prev];
                  next[idx] = newRow;
                  return next;
                }
                return [...prev, newRow];
              });
            } else if (payload.eventType === 'DELETE') {
              const oldRow = payload.old;
              if (oldRow && oldRow.idKegiatan) {
                setKegiatan(prev => prev.filter(item => item.idKegiatan !== oldRow.idKegiatan));
              }
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'kehadiran' }, (payload) => {
            if (!active) return;
            if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
              const newRow = payload.new as Kehadiran;
              setKehadiran(prev => {
                const idx = prev.findIndex(item => item.id === newRow.id);
                if (idx >= 0) {
                  const next = [...prev];
                  next[idx] = newRow;
                  return next;
                }
                return [...prev, newRow];
              });
            } else if (payload.eventType === 'DELETE') {
              const oldRow = payload.old;
              if (oldRow && oldRow.id) {
                setKehadiran(prev => prev.filter(item => item.id !== oldRow.id));
              }
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'admins' }, (payload) => {
            if (!active) return;
            if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
              const newRow = payload.new as Admin;
              setAdmins(prev => {
                const idx = prev.findIndex(item => item.username === newRow.username);
                if (idx >= 0) {
                  const next = [...prev];
                  next[idx] = newRow;
                  return next;
                }
                return [...prev, newRow];
              });
            } else if (payload.eventType === 'DELETE') {
              const oldRow = payload.old;
              if (oldRow && oldRow.username) {
                setAdmins(prev => prev.filter(item => item.username !== oldRow.username));
              }
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'audit_logs' }, (payload) => {
            if (!active) return;
            if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
              const newRow = payload.new as AuditLog;
              setAuditLogs(prev => {
                const idx = prev.findIndex(item => item.id === newRow.id);
                if (idx >= 0) {
                  const next = [...prev];
                  next[idx] = newRow;
                  return next;
                }
                return [...prev, newRow];
              });
            } else if (payload.eventType === 'DELETE') {
              const oldRow = payload.old;
              if (oldRow && oldRow.id) {
                setAuditLogs(prev => prev.filter(item => item.id !== oldRow.id));
              }
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, (payload) => {
            if (!active) return;
            if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
              const newRow = payload.new as Pengumuman;
              setAnnouncements(prev => {
                const idx = prev.findIndex(item => item.id === newRow.id);
                if (idx >= 0) {
                  const next = [...prev];
                  next[idx] = newRow;
                  return next;
                }
                return [...prev, newRow];
              });
            } else if (payload.eventType === 'DELETE') {
              const oldRow = payload.old;
              if (oldRow && oldRow.id) {
                setAnnouncements(prev => prev.filter(item => item.id !== oldRow.id));
              }
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'documents' }, (payload) => {
            if (!active) return;
            if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
              const newRow = payload.new as DokumenKegiatan;
              setDocuments(prev => {
                const idx = prev.findIndex(item => item.id === newRow.id);
                if (idx >= 0) {
                  const next = [...prev];
                  next[idx] = newRow;
                  return next;
                }
                return [...prev, newRow];
              });
            } else if (payload.eventType === 'DELETE') {
              const oldRow = payload.old;
              if (oldRow && oldRow.id) {
                setDocuments(prev => prev.filter(item => item.id !== oldRow.id));
              }
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'pangkalan_details' }, (payload) => {
            if (!active) return;
            if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
              const newRow = payload.new as PangkalanDetail;
              setRawPangkalanDetails(prev => {
                const idx = prev.findIndex(item => item.idPeserta === newRow.idPeserta);
                if (idx >= 0) {
                  const next = [...prev];
                  next[idx] = newRow;
                  return next;
                }
                return [...prev, newRow];
              });
            } else if (payload.eventType === 'DELETE') {
              const oldRow = payload.old;
              if (oldRow && oldRow.idPeserta) {
                setRawPangkalanDetails(prev => prev.filter(item => item.idPeserta !== oldRow.idPeserta));
              }
            }
          })
          .subscribe();

      } catch (err: any) {
        console.error("Supabase Sync Error:", err);
        if (active) {
          setSupabaseError("Kesalahan sinkronisasi real-time Supabase: " + (err.message || "Periksa konfigurasi tabel database Anda."));
          setSupabaseInitializing(false);
        }
      }
    };

    setupSupabaseSync();

    return () => {
      active = false;
      if (channel) {
        channel.unsubscribe();
        if (clientInstance && typeof clientInstance.removeChannel === 'function') {
          clientInstance.removeChannel(channel);
        }
      }
    };
  }, [settings.supabaseEnabled, settings.supabaseConfig]);

  // Push Sync Effects to upload local mutations to Cloud (Only sync when Supabase is connected and initialized)
  const prevPesertaRef = useRef<Peserta[]>(peserta);
  useEffect(() => {
    if (settings.supabaseEnabled && supabaseConnected) {
      if (isFirstPesertaSyncRef.current) {
        prevPesertaRef.current = peserta;
        isFirstPesertaSyncRef.current = false;
        return;
      }
      const client = getSupabaseInstance(settings.supabaseConfig);
      if (client) {
        const deleted = prevPesertaRef.current.filter(p => !peserta.some(item => item.idPeserta === p.idPeserta));
        deleted.forEach(p => {
          deleteFromSupabase(client, "peserta", "idPeserta", p.idPeserta).catch(console.error);
        });
        const changed = peserta.filter(p => {
          const prev = prevPesertaRef.current.find(item => item.idPeserta === p.idPeserta);
          return !prev || JSON.stringify(prev) !== JSON.stringify(p);
        });
        changed.forEach(p => {
          saveToSupabase(client, "peserta", "idPeserta", p.idPeserta, p).catch(console.error);
        });
      }
    }
    prevPesertaRef.current = peserta;
  }, [peserta, settings.supabaseEnabled, settings.supabaseConfig, supabaseConnected]);

  const prevKegiatanRef = useRef<Kegiatan[]>(kegiatan);
  useEffect(() => {
    if (settings.supabaseEnabled && supabaseConnected) {
      if (isFirstKegiatanSyncRef.current) {
        prevKegiatanRef.current = kegiatan;
        isFirstKegiatanSyncRef.current = false;
        return;
      }
      const client = getSupabaseInstance(settings.supabaseConfig);
      if (client) {
        const deleted = prevKegiatanRef.current.filter(k => !kegiatan.some(item => item.idKegiatan === k.idKegiatan));
        deleted.forEach(k => {
          deleteFromSupabase(client, "kegiatan", "idKegiatan", k.idKegiatan).catch(console.error);
        });
        const changed = kegiatan.filter(k => {
          const prev = prevKegiatanRef.current.find(item => item.idKegiatan === k.idKegiatan);
          return !prev || JSON.stringify(prev) !== JSON.stringify(k);
        });
        changed.forEach(k => {
          saveToSupabase(client, "kegiatan", "idKegiatan", k.idKegiatan, k).catch(console.error);
        });
      }
    }
    prevKegiatanRef.current = kegiatan;
  }, [kegiatan, settings.supabaseEnabled, settings.supabaseConfig, supabaseConnected]);

  const prevKehadiranRef = useRef<Kehadiran[]>(kehadiran);
  useEffect(() => {
    if (settings.supabaseEnabled && supabaseConnected) {
      if (isFirstKehadiranSyncRef.current) {
        prevKehadiranRef.current = kehadiran;
        isFirstKehadiranSyncRef.current = false;
        return;
      }
      const client = getSupabaseInstance(settings.supabaseConfig);
      if (client) {
        const deleted = prevKehadiranRef.current.filter(kh => !kehadiran.some(item => item.id === kh.id));
        deleted.forEach(kh => {
          deleteFromSupabase(client, "kehadiran", "id", kh.id).catch(console.error);
        });
        const changed = kehadiran.filter(kh => {
          const prev = prevKehadiranRef.current.find(item => item.id === kh.id);
          return !prev || JSON.stringify(prev) !== JSON.stringify(kh);
        });
        changed.forEach(kh => {
          saveToSupabase(client, "kehadiran", "id", kh.id, kh).catch(console.error);
        });
      }
    }
    prevKehadiranRef.current = kehadiran;
  }, [kehadiran, settings.supabaseEnabled, settings.supabaseConfig, supabaseConnected]);

  const prevAdminsRef = useRef<Admin[]>(admins);
  useEffect(() => {
    if (settings.supabaseEnabled && supabaseConnected) {
      if (isFirstAdminsSyncRef.current) {
        prevAdminsRef.current = admins;
        isFirstAdminsSyncRef.current = false;
        return;
      }
      const client = getSupabaseInstance(settings.supabaseConfig);
      if (client) {
        const deleted = prevAdminsRef.current.filter(a => !admins.some(item => item.username === a.username));
        deleted.forEach(a => {
          deleteFromSupabase(client, "admins", "username", a.username).catch(console.error);
        });
        const changed = admins.filter(a => {
          const prev = prevAdminsRef.current.find(item => item.username === a.username);
          return !prev || JSON.stringify(prev) !== JSON.stringify(a);
        });
        changed.forEach(a => {
          saveToSupabase(client, "admins", "username", a.username, a).catch(console.error);
        });
      }
    }
    prevAdminsRef.current = admins;
  }, [admins, settings.supabaseEnabled, settings.supabaseConfig, supabaseConnected]);

  const prevAuditLogsRef = useRef<AuditLog[]>(auditLogs);
  useEffect(() => {
    if (settings.supabaseEnabled && supabaseConnected) {
      if (isFirstAuditLogsSyncRef.current) {
        prevAuditLogsRef.current = auditLogs;
        isFirstAuditLogsSyncRef.current = false;
        return;
      }
      const client = getSupabaseInstance(settings.supabaseConfig);
      if (client) {
        const deleted = prevAuditLogsRef.current.filter(al => !auditLogs.some(item => item.id === al.id));
        deleted.forEach(al => {
          deleteFromSupabase(client, "audit_logs", "id", al.id).catch(console.error);
        });
        const changed = auditLogs.filter(al => {
          const prev = prevAuditLogsRef.current.find(item => item.id === al.id);
          return !prev || JSON.stringify(prev) !== JSON.stringify(al);
        });
        changed.forEach(al => {
          saveToSupabase(client, "audit_logs", "id", al.id, al).catch(console.error);
        });
      }
    }
    prevAuditLogsRef.current = auditLogs;
  }, [auditLogs, settings.supabaseEnabled, settings.supabaseConfig, supabaseConnected]);

  const prevAnnouncementsRef = useRef<Pengumuman[]>(announcements);
  useEffect(() => {
    if (settings.supabaseEnabled && supabaseConnected) {
      if (isFirstAnnouncementsSyncRef.current) {
        prevAnnouncementsRef.current = announcements;
        isFirstAnnouncementsSyncRef.current = false;
        return;
      }
      const client = getSupabaseInstance(settings.supabaseConfig);
      if (client) {
        const deleted = prevAnnouncementsRef.current.filter(an => !announcements.some(item => item.id === an.id));
        deleted.forEach(an => {
          deleteFromSupabase(client, "announcements", "id", an.id).catch(console.error);
        });
        const changed = announcements.filter(an => {
          const prev = prevAnnouncementsRef.current.find(item => item.id === an.id);
          return !prev || JSON.stringify(prev) !== JSON.stringify(an);
        });
        changed.forEach(an => {
          saveToSupabase(client, "announcements", "id", an.id, an).catch(console.error);
        });
      }
    }
    prevAnnouncementsRef.current = announcements;
  }, [announcements, settings.supabaseEnabled, settings.supabaseConfig, supabaseConnected]);

  const prevDocumentsRef = useRef<DokumenKegiatan[]>(documents);
  useEffect(() => {
    if (settings.supabaseEnabled && supabaseConnected) {
      if (isFirstDocumentsSyncRef.current) {
        prevDocumentsRef.current = documents;
        isFirstDocumentsSyncRef.current = false;
        return;
      }
      const client = getSupabaseInstance(settings.supabaseConfig);
      if (client) {
        const deleted = prevDocumentsRef.current.filter(docItem => !documents.some(item => item.id === docItem.id));
        deleted.forEach(docItem => {
          deleteFromSupabase(client, "documents", "id", docItem.id).catch(console.error);
        });
        const changed = documents.filter(docItem => {
          const prev = prevDocumentsRef.current.find(item => item.id === docItem.id);
          return !prev || JSON.stringify(prev) !== JSON.stringify(docItem);
        });
        changed.forEach(docItem => {
          saveToSupabase(client, "documents", "id", docItem.id, docItem).catch(console.error);
        });
      }
    }
    prevDocumentsRef.current = documents;
  }, [documents, settings.supabaseEnabled, settings.supabaseConfig, supabaseConnected]);

  const prevPangkalanDetailsRef = useRef<PangkalanDetail[]>(pangkalanDetails);
  useEffect(() => {
    if (settings.supabaseEnabled && supabaseConnected) {
      if (isFirstPangkalanDetailsSyncRef.current) {
        prevPangkalanDetailsRef.current = pangkalanDetails;
        isFirstPangkalanDetailsSyncRef.current = false;
        return;
      }
      const client = getSupabaseInstance(settings.supabaseConfig);
      if (client) {
        const deleted = prevPangkalanDetailsRef.current.filter(pd => !pangkalanDetails.some(item => item.idPeserta === pd.idPeserta));
        deleted.forEach(pd => {
          deleteFromSupabase(client, "pangkalan_details", "idPeserta", pd.idPeserta).catch(console.error);
        });
        const changed = pangkalanDetails.filter(pd => {
          const prev = prevPangkalanDetailsRef.current.find(item => item.idPeserta === pd.idPeserta);
          return !prev || JSON.stringify(prev) !== JSON.stringify(pd);
        });
        changed.forEach(pd => {
          saveToSupabase(client, "pangkalan_details", "idPeserta", pd.idPeserta, pd).catch(console.error);
        });
      }
    }
    prevPangkalanDetailsRef.current = pangkalanDetails;
  }, [pangkalanDetails, settings.supabaseEnabled, settings.supabaseConfig, supabaseConnected]);

  const prevSettingsRef = useRef<AppSettings>(settings);
  useEffect(() => {
    if (settings.supabaseEnabled && supabaseConnected) {
      if (isFirstSettingsSyncRef.current) {
        prevSettingsRef.current = settings;
        isFirstSettingsSyncRef.current = false;
        return;
      }
      const client = getSupabaseInstance(settings.supabaseConfig);
      if (client) {
        if (JSON.stringify(prevSettingsRef.current) !== JSON.stringify(settings)) {
          (async () => {
            const { error } = await client
              .from('settings')
              .upsert({ id: 'global', data: settings }, { onConflict: 'id' });
            if (error) console.error(error);
          })();
        }
      }
    }
    prevSettingsRef.current = settings;
  }, [settings, settings.supabaseEnabled, settings.supabaseConfig, supabaseConnected]);

  // Auto-correct any participants' levels based on school name
  useEffect(() => {
    if (peserta.length === 0) return;
    let hasChanges = false;
    const updatedPeserta = peserta.map(p => {
      const correctTingkatan = getTingkatanFromSekolah(p.namaPangkalan);
      if (p.tingkatan !== correctTingkatan) {
        hasChanges = true;
        return {
          ...p,
          tingkatan: correctTingkatan
        };
      }
      return p;
    });

    if (hasChanges) {
      setPeserta(updatedPeserta);
    }
  }, [peserta]);

  // Global helper to add audit logs
  const handleAddAuditLog = (aktivitas: string, detail: string) => {
    const now = new Date();
    const maxAudNum = auditLogs.reduce((max, log) => {
      const num = parseInt(log.id.replace('AUD', ''), 10);
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    const newLog: AuditLog = {
      id: `AUD${String(maxAudNum + 1).padStart(3, '0')}`,
      timestamp: `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`,
      pengguna: currentAdmin ? currentAdmin.nama : currentPeserta ? currentPeserta.namaPangkalan : 'Sistem',
      aktivitas,
      detail
    };
    setAuditLogs(prev => [...prev, newLog]);
  };


  // --- CURRENT ACTIVE SESSION VIEWS ---
  // Views: 'login' | 'admin' | 'participant' | 'public'
  const [activeView, setActiveView] = useState<'login' | 'admin' | 'participant' | 'public'>('login');
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [currentPeserta, setCurrentPeserta] = useState<Peserta | null>(null);

  // Initialize Text-to-Speech voices
  useEffect(() => {
    initializeTTS();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        initializeTTS();
      };
    }
  }, []);

  // --- SECURITY: 30 MINUTES IDLE AUTO LOGOUT ---
  const lastActiveRef = useRef<number>(Date.now());

  useEffect(() => {
    if (activeView === 'login' || activeView === 'public') return;

    // Reset idle timer on user actions
    const updateActivity = () => {
      lastActiveRef.current = Date.now();
    };

    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('scroll', updateActivity);
    window.addEventListener('click', updateActivity);

    // Periodic check every 10 seconds
    const interval = setInterval(() => {
      const elapsedMs = Date.now() - lastActiveRef.current;
      const thirtyMinutesMs = 30 * 60 * 1000;
      
      if (elapsedMs >= thirtyMinutesMs) {
        handleLogout("Sesi kedaluwarsa karena tidak ada aktivitas selama 30 menit.");
      }
    }, 10000);

    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('scroll', updateActivity);
      window.removeEventListener('click', updateActivity);
      clearInterval(interval);
    };
  }, [activeView]);


  // --- LOGIN PORTAL STATES ---
  const [loginRole, setLoginRole] = useState<'admin' | 'peserta' | 'public'>('peserta');
  
  // Admin Login credentials
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  
  // Participant Login credential
  const [pesertaId, setPesertaId] = useState('');
  
  // Floating Toast Notification state
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // --- TTS ANNOUNCEMENT PLAY FOR LOGIN PORTAL ---
  const [loginSpeakingId, setLoginSpeakingId] = useState<string | null>(null);

  const handlePlayLoginSpeech = (ann: Pengumuman) => {
    if (loginSpeakingId === ann.id) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setLoginSpeakingId(null);
      return;
    }

    const textToSpeak = ann.konten;
    speakIndonesianText(textToSpeak, {
      onStart: () => setLoginSpeakingId(ann.id),
      onEnd: () => setLoginSpeakingId(null),
      onError: () => setLoginSpeakingId(null)
    });
  };

  const triggerToast = (type: 'success' | 'error' | 'info', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // --- ACTIONS ---
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gabungkan admins dari state dengan defaultAdmins sebagai fallback pengaman
    const adminPool = [...admins];
    defaultAdmins.forEach(defAdmin => {
      if (!adminPool.some(a => a.username.toLowerCase() === defAdmin.username.toLowerCase())) {
        adminPool.push(defAdmin);
      }
    });

    const matched = adminPool.find(a => a.username.toLowerCase() === adminUser.toLowerCase().trim() && a.password === adminPass);
    
    if (matched) {
      setCurrentAdmin(matched);
      setCurrentPeserta(null);
      setActiveView('admin');
      handleAddAuditLog("Login Admin", `Admin ${matched.nama} berhasil masuk ke sistem.`);
      triggerToast('success', `Selamat Datang, ${matched.nama}!`);
      // Reset form
      setAdminUser('');
      setAdminPass('');
    } else {
      triggerToast('error', "Username atau password admin salah!");
    }
  };

  const handlePesertaLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const normalizeId = (id: any): string => {
      let str = String(id || '').trim().replace(/\s+/g, '').toUpperCase();
      if (/^\d+\.0$/.test(str)) {
        str = str.substring(0, str.length - 2);
      }
      return str;
    };

    const cleanInputId = normalizeId(pesertaId);
    
    const matched = peserta.find(p => {
      const cleanDbId = normalizeId(p.idPeserta);
      return cleanDbId === cleanInputId;
    });
    
    if (matched) {
      if (!matched.statusAktif) {
        triggerToast('error', "ID Peserta ini dinonaktifkan oleh panitia!");
        return;
      }
      setCurrentPeserta(matched);
      setCurrentAdmin(null);
      setActiveView('participant');
      handleAddAuditLog("Login Peserta", `Peserta ${matched.idPeserta} (${matched.namaPangkalan}) berhasil masuk.`);
      triggerToast('success', `Berhasil Masuk: ${matched.namaPangkalan}`);
      setPesertaId('');
    } else {
      triggerToast('error', "ID Peserta tidak dikenal!");
    }
  };

  const handleLogout = (customMessage?: string) => {
    handleAddAuditLog("Logout", `${currentAdmin ? currentAdmin.nama : currentPeserta ? currentPeserta.namaPangkalan : 'Pengguna'} keluar dari sistem.`);
    setCurrentAdmin(null);
    setCurrentPeserta(null);
    setActiveView('login');
    if (customMessage && typeof customMessage === 'string') {
      triggerToast('info', customMessage);
    } else {
      triggerToast('success', "Anda berhasil keluar.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-300">
      
      {/* SUPABASE CONNECTION INITIALIZING LOADER */}
      {supabaseInitializing && (
        <div className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl max-w-md w-full space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-emerald-500/10 blur-xl"></div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative flex items-center justify-center">
                <Compass className="w-12 h-12 text-emerald-500 animate-spin" />
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping"></div>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-black text-zinc-900 dark:text-white uppercase tracking-wider">Menghubungkan Awan</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Sinkronisasi data real-time dengan database Supabase sedang berlangsung...
                </p>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 animate-pulse w-full animate-progress" style={{ width: '100%' }}></div>
              </div>
            </div>

            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">Pramuka Bulukumpa Cloud Connector</p>
          </div>
        </div>
      )}
      
      {/* GLOBAL BANNER NAVBAR */}
      <header className="bg-emerald-900 text-white shadow-md border-b border-emerald-950 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('login')}>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-emerald-700">
              <Compass className="w-6 h-6 text-emerald-400 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-sm md:text-base font-black tracking-wider uppercase flex items-center gap-1.5">
                {settings.namaEvent || "Absensi Pramuka Bulukumpa"}
              </h1>
              <p className="text-[10px] text-emerald-300 font-mono tracking-widest leading-none">
                {(settings.pelaksanaEvent || "KWARTIR RANTING BULUKUMPA").toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark theme toggle */}
            <button
              onClick={() => setSettings(prev => ({ ...prev, darkTheme: !prev.darkTheme }))}
              className="p-2 rounded-xl bg-emerald-950/50 hover:bg-emerald-950/80 border border-emerald-800 transition-colors"
              title="Ubah Tema"
            >
              {settings.darkTheme ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-zinc-300" />}
            </button>

            {/* Back to Login if inside Public display */}
            {activeView !== 'login' && (
              <button
                onClick={() => handleLogout()}
                className="bg-emerald-950 hover:bg-black/40 border border-emerald-800 text-xs font-bold py-2 px-3.5 rounded-xl transition-all"
              >
                Kembali ke Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN VIEW CONTROLLER */}
      <main className="flex-1 py-8">
        
        {/* SUPABASE CONNECTION ERROR WARNING BANNER */}
        {settings.supabaseEnabled && supabaseError && (
          <div className="max-w-6xl mx-auto px-4 mb-6 animate-fade-in">
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 py-3.5 px-4 rounded-2xl text-xs font-semibold flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span className="leading-relaxed">{supabaseError}</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                <button
                  onClick={() => {
                    // Force retry connection by resetting supabaseConnected and triggering setupSupabaseSync
                    setSettings(prev => ({ ...prev }));
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-wide transition-colors cursor-pointer w-full sm:w-auto text-center"
                >
                  Coba Lagi
                </button>
                <button
                  onClick={() => {
                    setSettings(prev => ({ ...prev, supabaseEnabled: false }));
                    setSupabaseError(null);
                    triggerToast('info', 'Beralih ke mode penyimpanan lokal (offline).');
                  }}
                  className="bg-zinc-200 dark:bg-zinc-800 text-zinc-750 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 font-bold px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-wide transition-colors cursor-pointer w-full sm:w-auto text-center"
                >
                  Mode Lokal
                </button>
              </div>
            </div>
          </div>
        )}
        

        
        {/* VIEW: LOGIN PORTAL */}
        {activeView === 'login' && (
          <div className="max-w-6xl mx-auto px-4 py-4 animate-slide-in" id="login-portal">
            
            {/* Header Title Banner */}
            <div className="text-center mb-8 relative">
              <div className="absolute -top-3 left-4 text-amber-400 animate-pulse">
                <Sparkles className="w-5 h-5 fill-amber-400" />
              </div>
              <div className="absolute -top-1 right-6 text-indigo-400 animate-bounce">
                <Sparkles className="w-4 h-4 fill-indigo-400" />
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase bg-emerald-100 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-emerald-600 dark:text-emerald-400" />
                Sistem Monitoring Kehadiran & Pengumuman
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight mt-3">
                {settings.namaEvent || "Kwartir Ranting Bulukumpa"}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 px-2">
                Penyelenggara: <span className="font-bold text-zinc-700 dark:text-zinc-300">{settings.pelaksanaEvent || "Kwartir Ranting Gerakan Pramuka Bulukumpa"}</span> &bull; Lokasi: <span className="font-bold text-zinc-700 dark:text-zinc-300">{settings.lokasiEvent || "Bumi Perkemahan Bulukumpa"}</span>
              </p>
            </div>

            {/* Centered Login Interface Container */}
            <div className="max-w-md mx-auto space-y-6">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border-2 border-indigo-100 dark:border-zinc-800 p-6 shadow-[0_20px_50px_rgba(110,68,255,0.12)] space-y-6 relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-indigo-500/5 blur-xl"></div>
                
                <div style={{ backgroundColor: '#000000' }} className="flex border-b border-zinc-100 dark:border-zinc-800 pb-2 p-1.5 rounded-2xl">
                  <button
                    onClick={() => setLoginRole('peserta')}
                    className={`flex-1 text-center py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 ${
                      loginRole === 'peserta'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    Portal Peserta
                  </button>
                  <button
                    onClick={() => setLoginRole('admin')}
                    className={`flex-1 text-center py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 ${
                      loginRole === 'admin'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400'
                    }`}
                  >
                    <Key className="w-3.5 h-3.5" />
                    Login Admin
                  </button>
                </div>

                {/* FORM: ADMIN LOGIN */}
                {loginRole === 'admin' && (
                  <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono font-bold text-zinc-500 mb-1">Username Admin</label>
                      <input
                        type="text"
                        required
                        placeholder="Masukkan username"
                        value={adminUser}
                        onChange={(e) => setAdminUser(e.target.value)}
                        className="w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono font-bold text-zinc-500 mb-1">Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Masukkan password"
                        value={adminPass}
                        onChange={(e) => setAdminPass(e.target.value)}
                        className="w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md"
                      id="btn-admin-login"
                    >
                      <LogIn className="w-4 h-4" />
                      Masuk Sebagai Admin
                    </button>
                  </form>
                )}

                {/* FORM: PESERTA PORTAL LOGIN */}
                {loginRole === 'peserta' && (
                  <form onSubmit={handlePesertaLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono font-bold text-zinc-500 mb-1">ID Peserta Perkemahan</label>
                      <input
                        type="text"
                        required
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        autoComplete="off"
                        placeholder="Contoh: PBK001"
                        value={pesertaId}
                        onChange={(e) => setPesertaId(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                        className="w-full text-xs font-mono bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 rounded-xl p-3 uppercase font-bold text-emerald-850 dark:text-emerald-400 focus:outline-none"
                      />
                      <p className="text-[10px] text-zinc-400 mt-2">
                        ID Anda tercetak di kartu peserta yang dibagikan oleh pimpinan regu atau panitia pendaftaran.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
                      id="btn-peserta-login"
                    >
                      <UserCheck className="w-4 h-4" />
                      Buka Portal Anda
                    </button>
                  </form>
                )}
              </div>

              {/* ACTIVE ANNOUNCEMENTS FOR PUBLIC HOME / LOGIN PAGE */}
              {(() => {
                const activeAnn = announcements.filter(ann => ann.statusAktif);
                if (activeAnn.length === 0) return null;

                return (
                  <div className="space-y-3" id="login-active-announcements">
                    <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 px-1">
                      <Megaphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-bounce" />
                      <span className="font-bold text-xs uppercase tracking-wider">Pengumuman Terkini (Aktif)</span>
                      <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-black font-mono">
                        {activeAnn.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {activeAnn.map((ann, idx) => (
                        <div
                          key={`${ann.id}_${idx}`}
                          className={`border rounded-2xl p-4 transition-all relative overflow-hidden bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-3 ${
                            playingId === ann.id
                              ? 'border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/10 dark:bg-emerald-950/10'
                              : 'border-zinc-200 dark:border-zinc-800/80'
                          }`}
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 uppercase tracking-wide">
                                Tingkat: {ann.tingkatanTarget}
                              </span>
                              <span className="text-[10px] text-zinc-400 font-mono font-medium">
                                {formatIndonesianDate(ann.tanggal)} &bull; {formatIndonesianTime(ann.jam)} WITA
                              </span>
                            </div>
                            <h4 className="text-xs font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tight">
                              {ann.judul}
                            </h4>
                            <p className="text-xs text-zinc-600 dark:text-zinc-350 leading-relaxed font-normal whitespace-pre-line">
                              {ann.konten}
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-850/80 pt-2.5 mt-1">
                            <span className="text-[9px] text-zinc-400 font-mono">
                              Oleh: <span className="font-bold text-zinc-600 dark:text-zinc-350">{ann.dibuatOleh}</span>
                            </span>
                            <button
                              onClick={() => playAnnouncementVoice(ann)}
                              className={`text-[9px] font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-all shadow-xs shrink-0 ${
                                playingId === ann.id
                                  ? 'bg-red-600 hover:bg-red-700 text-white'
                                  : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                              }`}
                            >
                              <Volume2 className={`w-3 h-3 ${playingId === ann.id ? 'animate-pulse' : ''}`} />
                              {playingId === ann.id ? 'Hentikan' : 'Dengarkan'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>
        )}

        {/* VIEW: ADMIN PANEL */}
        {activeView === 'admin' && currentAdmin && (
          <div className="max-w-7xl mx-auto px-4">
            <AdminPanel
              currentAdmin={currentAdmin}
              peserta={peserta}
              kegiatan={kegiatan}
              kehadiran={combinedKehadiran}
              admins={admins}
              auditLogs={auditLogs}
              settings={settings}
              announcements={announcements}
              documents={documents}
              pangkalanDetails={pangkalanDetails}
              onUpdatePangkalanDetails={setPangkalanDetails}
              isOffline={isOffline}
              onToggleOffline={() => setIsOffline(!isOffline)}
              onUpdatePeserta={setPeserta}
              onUpdateKegiatan={setKegiatan}
              onUpdateKehadiran={handleUpdateKehadiran}
              onUpdateAdmins={setAdmins}
              onUpdateSettings={setSettings}
              onUpdateAnnouncements={setAnnouncements}
              onUpdateDocuments={setDocuments}
              onAddAuditLog={handleAddAuditLog}
              onLogout={handleLogout}
            />
          </div>
        )}

        {/* VIEW: PARTICIPANT PORTAL */}
        {activeView === 'participant' && currentPeserta && (
          <ParticipantDashboard
            currentPeserta={currentPeserta}
            kegiatan={kegiatan}
            kehadiran={combinedKehadiran}
            settings={settings}
            announcements={announcements}
            documents={documents}
            pangkalanDetails={pangkalanDetails}
            onUpdatePangkalanDetails={setPangkalanDetails}
            onLogout={handleLogout}
          />
        )}

        {/* VIEW: PUBLIC DASHBOARD PROJECTOR SCREEN */}
        {activeView === 'public' && (
          <div className="max-w-7xl mx-auto px-4">
            <PublicDashboard
              peserta={peserta}
              kegiatan={kegiatan}
              kehadiran={combinedKehadiran}
              settings={settings}
            />
          </div>
        )}

      </main>

      {/* FLOAT SLIDING TOAST NOTIFICATION POPUP */}
      {toast && (
        <div className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-xl border z-50 animate-[slideIn_0.3s_ease] flex items-center gap-3 max-w-sm ${
          toast.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950 dark:border-emerald-900 dark:text-emerald-100'
            : toast.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-900 dark:text-red-100'
            : 'bg-cyan-50 border-cyan-200 text-cyan-900 dark:bg-cyan-950 dark:border-cyan-900 dark:text-cyan-100'
        }`}>
          <div className="shrink-0">
            {toast.type === 'success' ? <Sparkles className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-red-500" />}
          </div>
          <div className="text-xs font-semibold leading-relaxed">
            {toast.message}
          </div>
          <button onClick={() => setToast(null)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SYSTEM MINIMAL FOOTER */}
      <footer className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800/80 py-4 text-center text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4">
          PRASAS (Sistem Monitoring Absensi Perkemahan Bulukumpa) &bull; Koneksi Supabase Real-Time Aktif
        </div>
      </footer>
    </div>
  );
}
