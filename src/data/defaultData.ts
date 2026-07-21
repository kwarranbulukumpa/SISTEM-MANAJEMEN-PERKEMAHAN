/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Peserta, Kegiatan, Kehadiran, Admin, AuditLog, AppSettings, Pengumuman, DokumenKegiatan } from '../types';

export const defaultPeserta: Peserta[] = [
  {
    "idPeserta": "73107",
    "namaPangkalan": "SD NEGERI 73 KASESENG",
    "jenisKelamin": "Putri",
    "kodeQr": "73107",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "80471",
    "namaPangkalan": "SD NEGERI 80 BULUKUMPA",
    "jenisKelamin": "Putra",
    "kodeQr": "80471",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "21381",
    "namaPangkalan": "SD NEGERI 213 HULO",
    "jenisKelamin": "Putra",
    "kodeQr": "21381",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "91137",
    "namaPangkalan": "MA DARUL QALAM",
    "jenisKelamin": "Putra",
    "kodeQr": "91137",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "91093",
    "namaPangkalan": "MA SAPOBONTO",
    "jenisKelamin": "Putri",
    "kodeQr": "91093",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "90315",
    "namaPangkalan": "MIS MALLEBBANG",
    "jenisKelamin": "Putra",
    "kodeQr": "90315",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "27852",
    "namaPangkalan": "SD NEGERI 278 PAKOMBONG",
    "jenisKelamin": "Putra",
    "kodeQr": "27852",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "24071",
    "namaPangkalan": "SD NEGERI 240 HARUE",
    "jenisKelamin": "Putra",
    "kodeQr": "24071",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "60942",
    "namaPangkalan": "SD NEGERI 60 TANETE",
    "jenisKelamin": "Putri",
    "kodeQr": "60942",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "20938",
    "namaPangkalan": "SD NEGERI 209 TANETE",
    "jenisKelamin": "Putra",
    "kodeQr": "20938",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "44927",
    "namaPangkalan": "SMP 44 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "44927",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "90291",
    "namaPangkalan": "MIS LONRONG",
    "jenisKelamin": "Putri",
    "kodeQr": "90291",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "27819",
    "namaPangkalan": "SD NEGERI 278 PAKOMBONG",
    "jenisKelamin": "Putri",
    "kodeQr": "27819",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "78937",
    "namaPangkalan": "SD NEGERI 78 BONTOA",
    "jenisKelamin": "Putri",
    "kodeQr": "78937",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "78502",
    "namaPangkalan": "SD NEGERI 78 BONTOA",
    "jenisKelamin": "Putra",
    "kodeQr": "78502",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "24326",
    "namaPangkalan": "SD NEGERI 243 ELLEE",
    "jenisKelamin": "Putra",
    "kodeQr": "24326",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "73962",
    "namaPangkalan": "SD NEGERI 73 KASESENG",
    "jenisKelamin": "Putra",
    "kodeQr": "73962",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "75913",
    "namaPangkalan": "SD NEGERI 75 PETTUNGNGE",
    "jenisKelamin": "Putri",
    "kodeQr": "75913",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "99317",
    "namaPangkalan": "SD NEGERI 99 SALASSAE",
    "jenisKelamin": "Putra",
    "kodeQr": "99317",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "17321",
    "namaPangkalan": "MAN 1 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "17321",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "61892",
    "namaPangkalan": "SD NEGERI 61 BALLEANGING",
    "jenisKelamin": "Putra",
    "kodeQr": "61892",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "62415",
    "namaPangkalan": "SD NEGERI 62 WAEPEJJE",
    "jenisKelamin": "Putra",
    "kodeQr": "62415",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "44061",
    "namaPangkalan": "SMP 44 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "44061",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "90693",
    "namaPangkalan": "MIS PATTIROANG",
    "jenisKelamin": "Putra",
    "kodeQr": "90693",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "79264",
    "namaPangkalan": "SD NEGERI 79 LAJAE",
    "jenisKelamin": "Putra",
    "kodeQr": "79264",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "14195",
    "namaPangkalan": "SMP 14 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "14195",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "90246",
    "namaPangkalan": "MIS LONRONG",
    "jenisKelamin": "Putra",
    "kodeQr": "90246",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "14901",
    "namaPangkalan": "MAN 1 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "14901",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "61034",
    "namaPangkalan": "SD NEGERI 61 BALLEANGING",
    "jenisKelamin": "Putri",
    "kodeQr": "61034",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "67580",
    "namaPangkalan": "SD NEGERI 67 LOISA",
    "jenisKelamin": "Putra",
    "kodeQr": "67580",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "74259",
    "namaPangkalan": "SD NEGERI 74 TAMARELLANG",
    "jenisKelamin": "Putri",
    "kodeQr": "74259",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "64810",
    "namaPangkalan": "SD NEGERI 64 BALANGBESSI",
    "jenisKelamin": "Putri",
    "kodeQr": "64810",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "91380",
    "namaPangkalan": "SD NEGERI 91 MUNTE",
    "jenisKelamin": "Putra",
    "kodeQr": "91380",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "11470",
    "namaPangkalan": "SMK 11 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "11470",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "90537",
    "namaPangkalan": "MIS PAEKA",
    "jenisKelamin": "Putra",
    "kodeQr": "90537",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "59821",
    "namaPangkalan": "SD NEGERI 59 TANETE",
    "jenisKelamin": "Putri",
    "kodeQr": "59821",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "83612",
    "namaPangkalan": "SMK 8 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "83612",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "68914",
    "namaPangkalan": "SD NEGERI 68 TIBONA",
    "jenisKelamin": "Putra",
    "kodeQr": "68914",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "33392",
    "namaPangkalan": "SD NEGERI 333 TIBONA",
    "jenisKelamin": "Putri",
    "kodeQr": "33392",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "11925",
    "namaPangkalan": "SMK 11 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "11925",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "70149",
    "namaPangkalan": "SD NEGERI 70 BULO-BULO",
    "jenisKelamin": "Putri",
    "kodeQr": "70149",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "66149",
    "namaPangkalan": "SD NEGERI 66 BALANGRIRI",
    "jenisKelamin": "Putra",
    "kodeQr": "66149",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "47815",
    "namaPangkalan": "SMP 47 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "47815",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "63903",
    "namaPangkalan": "SD NEGERI 63 CILALLANG",
    "jenisKelamin": "Putra",
    "kodeQr": "63903",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "24029",
    "namaPangkalan": "SD NEGERI 240 HARUE",
    "jenisKelamin": "Putri",
    "kodeQr": "24029",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "21096",
    "namaPangkalan": "SD NEGERI 210 BONTOMINASA",
    "jenisKelamin": "Putri",
    "kodeQr": "21096",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "71391",
    "namaPangkalan": "SD NEGERI 71 BARUGAE",
    "jenisKelamin": "Putra",
    "kodeQr": "71391",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "18915",
    "namaPangkalan": "SD NEGERI 189 BARUGAE",
    "jenisKelamin": "Putri",
    "kodeQr": "18915",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "21052",
    "namaPangkalan": "SD NEGERI 210 BONTOMINASA",
    "jenisKelamin": "Putra",
    "kodeQr": "21052",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "72518",
    "namaPangkalan": "SD NEGERI 72 BAMBAUNGANG",
    "jenisKelamin": "Putra",
    "kodeQr": "72518",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "76721",
    "namaPangkalan": "SD NEGERI 76 BARUGA RIATTANG",
    "jenisKelamin": "Putri",
    "kodeQr": "76721",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "33422",
    "namaPangkalan": "SD NEGERI 334 BINUANG",
    "jenisKelamin": "Putri",
    "kodeQr": "33422",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "16374",
    "namaPangkalan": "SMP 16 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "16374",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "23983",
    "namaPangkalan": "SD NEGERI 239 SARAJOKO",
    "jenisKelamin": "Putri",
    "kodeQr": "23983",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "24435",
    "namaPangkalan": "SD NEGERI 244 SALASSAE",
    "jenisKelamin": "Putri",
    "kodeQr": "24435",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "95067",
    "namaPangkalan": "SD NEGERI 95 BONTOBULAENG",
    "jenisKelamin": "Putri",
    "kodeQr": "95067",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "14932",
    "namaPangkalan": "SMAN 14 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "14932",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "17529",
    "namaPangkalan": "SD NEGERI 175 BULO-BULO",
    "jenisKelamin": "Putra",
    "kodeQr": "17529",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "66853",
    "namaPangkalan": "SD NEGERI 66 BALANGRIRI",
    "jenisKelamin": "Putri",
    "kodeQr": "66853",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "24708",
    "namaPangkalan": "SD NEGERI 247 PATTOENGANG",
    "jenisKelamin": "Putra",
    "kodeQr": "24708",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "18840",
    "namaPangkalan": "SD NEGERI 188 BONTO BULAENG",
    "jenisKelamin": "Putra",
    "kodeQr": "18840",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "33240",
    "namaPangkalan": "SD NEGERI 332 PULONGGO",
    "jenisKelamin": "Putra",
    "kodeQr": "33240",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "90718",
    "namaPangkalan": "MIS SERRE",
    "jenisKelamin": "Putra",
    "kodeQr": "90718",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "79815",
    "namaPangkalan": "SD NEGERI 79 LAJAE",
    "jenisKelamin": "Putri",
    "kodeQr": "79815",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "18451",
    "namaPangkalan": "SMP 18 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "18451",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "69403",
    "namaPangkalan": "SD NEGERI 69 ANNISIA",
    "jenisKelamin": "Putra",
    "kodeQr": "69403",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "96425",
    "namaPangkalan": "SD NEGERI 96 GALUNGBODDONG",
    "jenisKelamin": "Putra",
    "kodeQr": "96425",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "90624",
    "namaPangkalan": "MIS PATTIROANG",
    "jenisKelamin": "Putri",
    "kodeQr": "90624",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "65704",
    "namaPangkalan": "SD NEGERI 65 BALANGRIRI",
    "jenisKelamin": "Putra",
    "kodeQr": "65704",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "33411",
    "namaPangkalan": "SD NEGERI 334 BINUANG",
    "jenisKelamin": "Putra",
    "kodeQr": "33411",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "90581",
    "namaPangkalan": "MIS PAEKA",
    "jenisKelamin": "Putri",
    "kodeQr": "90581",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "23705",
    "namaPangkalan": "SD NEGERI 237 LEMBANG",
    "jenisKelamin": "Putri",
    "kodeQr": "23705",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "23904",
    "namaPangkalan": "SD NEGERI 239 SARAJOKO",
    "jenisKelamin": "Putra",
    "kodeQr": "23904",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "99862",
    "namaPangkalan": "SD NEGERI 99 SALASSAE",
    "jenisKelamin": "Putri",
    "kodeQr": "99862",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "69761",
    "namaPangkalan": "SD NEGERI 69 ANNISIA",
    "jenisKelamin": "Putri",
    "kodeQr": "69761",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "76384",
    "namaPangkalan": "SD NEGERI 76 BARUGA RIATTANG",
    "jenisKelamin": "Putra",
    "kodeQr": "76384",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "71604",
    "namaPangkalan": "SD NEGERI 71 BARUGAE",
    "jenisKelamin": "Putri",
    "kodeQr": "71604",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "33315",
    "namaPangkalan": "SD NEGERI 333 TIBONA",
    "jenisKelamin": "Putra",
    "kodeQr": "33315",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "28084",
    "namaPangkalan": "SD NEGERI 280 BONTOMINASA",
    "jenisKelamin": "Putri",
    "kodeQr": "28084",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "90750",
    "namaPangkalan": "MIS SERRE",
    "jenisKelamin": "Putri",
    "kodeQr": "90750",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "21340",
    "namaPangkalan": "SD NEGERI 213 HULO",
    "jenisKelamin": "Putri",
    "kodeQr": "21340",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "67026",
    "namaPangkalan": "SD NEGERI 67 LOISA",
    "jenisKelamin": "Putri",
    "kodeQr": "67026",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "15309",
    "namaPangkalan": "SMP 15 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "15309",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "14820",
    "namaPangkalan": "SMP 14 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "14820",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "91048",
    "namaPangkalan": "MA SAPOBONTO",
    "jenisKelamin": "Putra",
    "kodeQr": "91048",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "17463",
    "namaPangkalan": "SMP 17 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "17463",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "63158",
    "namaPangkalan": "SD NEGERI 63 CILALLANG",
    "jenisKelamin": "Putri",
    "kodeQr": "63158",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "23749",
    "namaPangkalan": "SD NEGERI 237 LEMBANG",
    "jenisKelamin": "Putra",
    "kodeQr": "23749",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "24491",
    "namaPangkalan": "SD NEGERI 244 SALASSAE",
    "jenisKelamin": "Putra",
    "kodeQr": "24491",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "18961",
    "namaPangkalan": "SD NEGERI 189 BARUGAE",
    "jenisKelamin": "Putra",
    "kodeQr": "18961",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "90946",
    "namaPangkalan": "SMP ISLAM AL QALAM",
    "jenisKelamin": "Putra",
    "kodeQr": "90946",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "91724",
    "namaPangkalan": "SD NEGERI 91 MUNTE",
    "jenisKelamin": "Putri",
    "kodeQr": "91724",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "14508",
    "namaPangkalan": "SMAN 14 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "14508",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "16815",
    "namaPangkalan": "SMP 16 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "16815",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "18269",
    "namaPangkalan": "SMP SATAP 18 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "18269",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "96901",
    "namaPangkalan": "SD NEGERI 96 GALUNGBODDONG",
    "jenisKelamin": "Putri",
    "kodeQr": "96901",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "60517",
    "namaPangkalan": "SD NEGERI 60 TANETE",
    "jenisKelamin": "Putra",
    "kodeQr": "60517",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "72043",
    "namaPangkalan": "SD NEGERI 72 BAMBAUNGANG",
    "jenisKelamin": "Putri",
    "kodeQr": "72043",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "33287",
    "namaPangkalan": "SD NEGERI 332 PULONGGO",
    "jenisKelamin": "Putri",
    "kodeQr": "33287",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "24158",
    "namaPangkalan": "SD NEGERI 241 BARUGAE",
    "jenisKelamin": "Putra",
    "kodeQr": "24158",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "74831",
    "namaPangkalan": "SD NEGERI 74 TAMARELLANG",
    "jenisKelamin": "Putra",
    "kodeQr": "74831",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "30518",
    "namaPangkalan": "SD NEGERI 305 TAGGENTUNG",
    "jenisKelamin": "Putri",
    "kodeQr": "30518",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "30594",
    "namaPangkalan": "SD NEGERI 305 TAGGENTUNG",
    "jenisKelamin": "Putra",
    "kodeQr": "30594",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "68372",
    "namaPangkalan": "SD NEGERI 68 TIBONA",
    "jenisKelamin": "Putri",
    "kodeQr": "68372",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "30461",
    "namaPangkalan": "SD NEGERI 304 BATUHULANG",
    "jenisKelamin": "Putra",
    "kodeQr": "30461",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "90409",
    "namaPangkalan": "MIS MAROANGING",
    "jenisKelamin": "Putri",
    "kodeQr": "90409",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "23817",
    "namaPangkalan": "SD NEGERI 238 MATTOANGING",
    "jenisKelamin": "Putri",
    "kodeQr": "23817",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "90184",
    "namaPangkalan": "MIN BALPES",
    "jenisKelamin": "Putra",
    "kodeQr": "90184",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "90918",
    "namaPangkalan": "SMP ISLAM AL QALAM",
    "jenisKelamin": "Putri",
    "kodeQr": "90918",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "80936",
    "namaPangkalan": "SD NEGERI 80 BULUKUMPA",
    "jenisKelamin": "Putri",
    "kodeQr": "80936",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "59038",
    "namaPangkalan": "SD NEGERI 59 TANETE",
    "jenisKelamin": "Putra",
    "kodeQr": "59038",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "21972",
    "namaPangkalan": "SMAN 2 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "21972",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "20974",
    "namaPangkalan": "SD NEGERI 209 TANETE",
    "jenisKelamin": "Putri",
    "kodeQr": "20974",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "90871",
    "namaPangkalan": "MTsN SAPOBONTO",
    "jenisKelamin": "Putri",
    "kodeQr": "90871",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "28037",
    "namaPangkalan": "SD NEGERI 280 BONTOMINASA",
    "jenisKelamin": "Putra",
    "kodeQr": "28037",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "17902",
    "namaPangkalan": "SMP 17 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "17902",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "30429",
    "namaPangkalan": "SD NEGERI 304 BATUHULANG",
    "jenisKelamin": "Putri",
    "kodeQr": "30429",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "77195",
    "namaPangkalan": "SD NEGERI 77 BONTOBAJU",
    "jenisKelamin": "Putra",
    "kodeQr": "77195",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "90137",
    "namaPangkalan": "MIN BALPES",
    "jenisKelamin": "Putri",
    "kodeQr": "90137",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "65291",
    "namaPangkalan": "SD NEGERI 65 BALANGRIRI",
    "jenisKelamin": "Putri",
    "kodeQr": "65291",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "24190",
    "namaPangkalan": "SD NEGERI 241 BARUGAE",
    "jenisKelamin": "Putri",
    "kodeQr": "24190",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "17584",
    "namaPangkalan": "SD NEGERI 175 BULO-BULO",
    "jenisKelamin": "Putri",
    "kodeQr": "17584",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "18724",
    "namaPangkalan": "SMP SATAP 18 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "18724",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "95813",
    "namaPangkalan": "SD NEGERI 95 BONTOBULAENG",
    "jenisKelamin": "Putra",
    "kodeQr": "95813",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "62780",
    "namaPangkalan": "SD NEGERI 62 WAEPEJJE",
    "jenisKelamin": "Putri",
    "kodeQr": "62780",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "24387",
    "namaPangkalan": "SD NEGERI 243 ELLEE",
    "jenisKelamin": "Putri",
    "kodeQr": "24387",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "15784",
    "namaPangkalan": "SMP 15 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "15784",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "90462",
    "namaPangkalan": "MIS MAROANGING",
    "jenisKelamin": "Putra",
    "kodeQr": "90462",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "23862",
    "namaPangkalan": "SD NEGERI 238 MATTOANGING",
    "jenisKelamin": "Putra",
    "kodeQr": "23862",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "64327",
    "namaPangkalan": "SD NEGERI 64 BALANGBESSI",
    "jenisKelamin": "Putra",
    "kodeQr": "64327",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "77640",
    "namaPangkalan": "SD NEGERI 77 BONTOBAJU",
    "jenisKelamin": "Putri",
    "kodeQr": "77640",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "87142",
    "namaPangkalan": "SMK 8 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "87142",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "18903",
    "namaPangkalan": "SMP 18 BULUKUMBA",
    "jenisKelamin": "Putri",
    "kodeQr": "18903",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "28432",
    "namaPangkalan": "SMAN 2 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "28432",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "90835",
    "namaPangkalan": "MTsN SAPOBONTO",
    "jenisKelamin": "Putra",
    "kodeQr": "90835",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "91182",
    "namaPangkalan": "MA DARUL QALAM",
    "jenisKelamin": "Putri",
    "kodeQr": "91182",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penegak (SMA/MA/SMK)"
  },
  {
    "idPeserta": "18893",
    "namaPangkalan": "SD NEGERI 188 BONTO BULAENG",
    "jenisKelamin": "Putri",
    "kodeQr": "18893",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "75046",
    "namaPangkalan": "SD NEGERI 75 PETTUNGNGE",
    "jenisKelamin": "Putra",
    "kodeQr": "75046",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "58741",
    "namaPangkalan": "SD NEGERI 58 TANETE",
    "jenisKelamin": "Putra",
    "kodeQr": "58741",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "90378",
    "namaPangkalan": "MIS MALLEBBANG",
    "jenisKelamin": "Putri",
    "kodeQr": "90378",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "58193",
    "namaPangkalan": "SD NEGERI 58 TANETE",
    "jenisKelamin": "Putri",
    "kodeQr": "58193",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "47392",
    "namaPangkalan": "SMP 47 BULUKUMBA",
    "jenisKelamin": "Putra",
    "kodeQr": "47392",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SMP (SMP/MTs)"
  },
  {
    "idPeserta": "70825",
    "namaPangkalan": "SD NEGERI 70 BULO-BULO",
    "jenisKelamin": "Putra",
    "kodeQr": "70825",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  },
  {
    "idPeserta": "24763",
    "namaPangkalan": "SD NEGERI 247 PATTOENGANG",
    "jenisKelamin": "Putri",
    "kodeQr": "24763",
    "tanggalDaftar": "2026-07-20",
    "statusAktif": true,
    "tingkatan": "Penggalang SD (SD/MI)"
  }
];

export const defaultKegiatan: Kegiatan[] = [
  {
    "idKegiatan": "KGT001",
    "namaKegiatan": "Upacara Pembukaan Perkemahan Pramuka",
    "hari": "Selasa",
    "tanggal": "2026-07-21",
    "jamMulai": "08:44",
    "jamSelesai": "10:44",
    "lokasi": "LAPANGAN",
    "status": "Aktif",
    "urutan": 1,
    "tingkatan": []
  }
];

export const defaultKehadiran: Kehadiran[] = [
  {
    "id": "LOG00003",
    "tanggal": "2026-07-21",
    "jam": "08:09",
    "idPeserta": "68914",
    "namaPangkalan": "SD NEGERI 68 TIBONA",
    "jenisKelamin": "Putra",
    "idKegiatan": "KGT001",
    "namaKegiatan": "lOMBA",
    "statusHadir": "Hadir",
    "petugas": "ARI"
  },
  {
    "id": "LOG00002",
    "tanggal": "2026-07-21",
    "jam": "08:09",
    "idPeserta": "63903",
    "namaPangkalan": "SD NEGERI 63 CILALLANG",
    "jenisKelamin": "Putra",
    "idKegiatan": "KGT001",
    "namaKegiatan": "lOMBA",
    "statusHadir": "Hadir",
    "petugas": "ARI"
  },
  {
    "id": "LOG00004",
    "tanggal": "2026-07-21",
    "jam": "08:09",
    "idPeserta": "14820",
    "namaPangkalan": "SMP 14 BULUKUMBA",
    "jenisKelamin": "Putra",
    "idKegiatan": "KGT001",
    "namaKegiatan": "lOMBA",
    "statusHadir": "Hadir",
    "petugas": "ARI"
  },
  {
    "id": "LOG00001",
    "tanggal": "2026-07-21",
    "jam": "08:09",
    "idPeserta": "90315",
    "namaPangkalan": "MIS MALLEBBANG",
    "jenisKelamin": "Putra",
    "idKegiatan": "KGT001",
    "namaKegiatan": "lOMBA",
    "statusHadir": "Hadir",
    "petugas": "ARI"
  }
];

export const defaultAdmins: Admin[] = [
  {
    "username": "admin",
    "password": "admin123",
    "nama": "ARI",
    "level": "Super Admin"
  }
];

export const defaultAuditLogs: AuditLog[] = [
  {
    "id": "AUD021",
    "timestamp": "2026-07-20 18:39:46",
    "pengguna": "ARI",
    "aktivitas": "Edit Peserta",
    "detail": "Mengubah biodata peserta 11470"
  },
  {
    "id": "AUD017",
    "timestamp": "2026-07-20 18:25:41",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD033",
    "timestamp": "2026-07-20 19:12:40",
    "pengguna": "ARI",
    "aktivitas": "Putar Suara Pengumuman",
    "detail": "Memutar suara Text-to-Speech pengumuman: \"Persiapan Upacara Bendera\"."
  },
  {
    "id": "AUD060",
    "timestamp": "2026-07-20 20:31:20",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD084",
    "timestamp": "2026-07-21 19:17:22",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD077",
    "timestamp": "2026-07-21 12:30:35",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD022",
    "timestamp": "2026-07-20 18:44:55",
    "pengguna": "ARI",
    "aktivitas": "Logout",
    "detail": "ARI keluar dari sistem."
  },
  {
    "id": "AUD011",
    "timestamp": "2026-07-19 22:56:06",
    "pengguna": "Kak Syarifuddin (Kwarnas Ranting)",
    "aktivitas": "Tambah Kegiatan",
    "detail": "Menambahkan jadwal kegiatan baru: lOMBA"
  },
  {
    "id": "AUD012",
    "timestamp": "2026-07-19 22:57:01",
    "pengguna": "Kak Syarifuddin (Kwarnas Ranting)",
    "aktivitas": "Pembalikan Identitas Event",
    "detail": "Mengubah nama event: \"Perkemahan Hari Pramuka ke 65\", lokasi: \"Bumi Perkemahan Anisia\", pelaksana: \"Kwartir Ranting Bulukumpa\", logo: \"https://cdn.phototourl.com/free/2026-07-17-841eabe5-f9de-4a3c-96a5-7654a896e774.png\", ketua: \"Hendra, S.Pd\", sekretaris: \"Ari Adam, S.Pd\", bendahara: \"Eni Fadliliani, S.Pd\""
  },
  {
    "id": "AUD073",
    "timestamp": "2026-07-21 08:54:30",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD054",
    "timestamp": "2026-07-20 20:12:10",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD019",
    "timestamp": "2026-07-20 18:37:44",
    "pengguna": "ARI",
    "aktivitas": "Import CSV Peserta",
    "detail": "Berhasil mengimpor 144 peserta baru"
  },
  {
    "id": "AUD070",
    "timestamp": "2026-07-21 08:11:03",
    "pengguna": "ARI",
    "aktivitas": "Konfigurasi Supabase",
    "detail": "Menyimpan dan mengaktifkan integrasi database cloud Supabase."
  },
  {
    "id": "AUD037",
    "timestamp": "2026-07-20 19:14:41",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD025",
    "timestamp": "2026-07-20 18:46:04",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD006",
    "timestamp": "2026-07-19 22:51:23",
    "pengguna": "Kak Syarifuddin (Kwarnas Ranting)",
    "aktivitas": "Tambah Peserta",
    "detail": "Menambahkan peserta baru 33411 - SDN 334 BINUANG"
  },
  {
    "id": "AUD038",
    "timestamp": "2026-07-20 19:14:47",
    "pengguna": "ARI",
    "aktivitas": "Mengubah Target Scan",
    "detail": "Admin memilih kegiatan KGT001 (Lomba Pionering) untuk dipindai"
  },
  {
    "id": "AUD007",
    "timestamp": "2026-07-19 22:53:12",
    "pengguna": "Kak Syarifuddin (Kwarnas Ranting)",
    "aktivitas": "Integrasi GAS",
    "detail": "Memperbarui URL Google Apps Script: Terkonfigurasi"
  },
  {
    "id": "AUD026",
    "timestamp": "2026-07-20 18:50:53",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD001",
    "timestamp": "2026-07-19 22:43:53",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin Kak Syarifuddin (Kwarnas Ranting) berhasil masuk ke sistem."
  },
  {
    "id": "AUD049",
    "timestamp": "2026-07-20 20:04:10",
    "pengguna": "Sistem",
    "aktivitas": "Login Peserta",
    "detail": "Peserta 33411 (SD NEGERI 334 BINUANG) berhasil masuk."
  },
  {
    "id": "AUD005",
    "timestamp": "2026-07-19 22:50:47",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin Kak Syarifuddin (Kwarnas Ranting) berhasil masuk ke sistem."
  },
  {
    "id": "AUD013",
    "timestamp": "2026-07-19 23:07:00",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin Kak Syarifuddin (Kwarnas Ranting) berhasil masuk ke sistem."
  },
  {
    "id": "AUD059",
    "timestamp": "2026-07-20 20:22:21",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD024",
    "timestamp": "2026-07-20 18:46:01",
    "pengguna": "SD NEGERI 334 BINUANG",
    "aktivitas": "Logout",
    "detail": "SD NEGERI 334 BINUANG keluar dari sistem."
  },
  {
    "id": "AUD023",
    "timestamp": "2026-07-20 18:45:00",
    "pengguna": "Sistem",
    "aktivitas": "Login Peserta",
    "detail": "Peserta 33411 (SD NEGERI 334 BINUANG) berhasil masuk."
  },
  {
    "id": "AUD032",
    "timestamp": "2026-07-20 19:12:35",
    "pengguna": "ARI",
    "aktivitas": "Tambah Pengumuman",
    "detail": "Membuat pengumuman baru: \"Persiapan Upacara Bendera\""
  },
  {
    "id": "AUD036",
    "timestamp": "2026-07-20 19:14:36",
    "pengguna": "SD NEGERI 334 BINUANG",
    "aktivitas": "Logout",
    "detail": "SD NEGERI 334 BINUANG keluar dari sistem."
  },
  {
    "id": "AUD028",
    "timestamp": "2026-07-20 19:06:40",
    "pengguna": "ARI",
    "aktivitas": "Logout",
    "detail": "ARI keluar dari sistem."
  },
  {
    "id": "AUD076",
    "timestamp": "2026-07-21 10:47:06",
    "pengguna": "Sistem",
    "aktivitas": "Login Peserta",
    "detail": "Peserta 33411 (SD NEGERI 334 BINUANG) berhasil masuk."
  },
  {
    "id": "AUD009",
    "timestamp": "2026-07-19 22:55:14",
    "pengguna": "Kak Syarifuddin (Kwarnas Ranting)",
    "aktivitas": "Edit Peserta",
    "detail": "Mengubah biodata peserta 33411"
  },
  {
    "id": "AUD067",
    "timestamp": "2026-07-21 08:10:32",
    "pengguna": "ARI",
    "aktivitas": "Edit Kegiatan",
    "detail": "Mengubah jadwal kegiatan KGT001"
  },
  {
    "id": "AUD085",
    "timestamp": "2026-07-21 21:54:34",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD010",
    "timestamp": "2026-07-19 22:55:29",
    "pengguna": "Kak Syarifuddin (Kwarnas Ranting)",
    "aktivitas": "Unduh Kartu Absen",
    "detail": "Berhasil mengunduh PDF kartu absen pangkalan: \"SDN 334 BINUANG\" (33411)."
  },
  {
    "id": "AUD050",
    "timestamp": "2026-07-20 20:04:29",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD004",
    "timestamp": "2026-07-19 22:49:16",
    "pengguna": "Kak Syarifuddin (Kwarnas Ranting)",
    "aktivitas": "Integrasi GAS",
    "detail": "Memperbarui URL Google Apps Script: Terkonfigurasi"
  },
  {
    "id": "AUD034",
    "timestamp": "2026-07-20 19:12:58",
    "pengguna": "ARI",
    "aktivitas": "Logout",
    "detail": "ARI keluar dari sistem."
  },
  {
    "id": "AUD008",
    "timestamp": "2026-07-19 22:53:34",
    "pengguna": "Kak Syarifuddin (Kwarnas Ranting)",
    "aktivitas": "Integrasi GAS",
    "detail": "Berhasil melakukan tes koneksi ke Google Apps Script."
  },
  {
    "id": "AUD055",
    "timestamp": "2026-07-20 20:12:54",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD074",
    "timestamp": "2026-07-21 08:55:04",
    "pengguna": "ARI",
    "aktivitas": "Tambah Pengumuman",
    "detail": "Membuat pengumuman baru: \"TES\""
  },
  {
    "id": "AUD014",
    "timestamp": "2026-07-19 23:07:23",
    "pengguna": "Kak Syarifuddin (Kwarnas Ranting)",
    "aktivitas": "Pembalikan Identitas Event",
    "detail": "Mengubah nama event: \"Perkemahan Hari Pramuka ke 65\", lokasi: \"Bumi Perkemahan Anisia\", pelaksana: \"Kwartir Ranting Bulukumpa\", logo: \"https://cdn.phototourl.com/free/2026-07-17-841eabe5-f9de-4a3c-96a5-7654a896e774.png\", ketua: \"Hendra, S.Pd\", sekretaris: \"Ari Adam, S.Pd\", bendahara: \"Eni Fadliliani, S.Pd\""
  },
  {
    "id": "AUD078",
    "timestamp": "2026-07-21 12:31:01",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD068",
    "timestamp": "2026-07-21 08:11:00",
    "pengguna": "ARI",
    "aktivitas": "Konfigurasi Supabase",
    "detail": "Menyimpan dan mengaktifkan integrasi database cloud Supabase."
  },
  {
    "id": "AUD079",
    "timestamp": "2026-07-21 12:31:21",
    "pengguna": "ARI",
    "aktivitas": "Putar Suara Pengumuman",
    "detail": "Memutar suara Text-to-Speech pengumuman: \"TES\"."
  },
  {
    "id": "AUD086",
    "timestamp": "2026-07-21 21:55:03",
    "pengguna": "ARI",
    "aktivitas": "Ubah Pengumuman",
    "detail": "Mengubah pengumuman: \"Pemanggilan Peserta\""
  },
  {
    "id": "AUD051",
    "timestamp": "2026-07-20 20:04:54",
    "pengguna": "ARI",
    "aktivitas": "Mengubah Target Scan",
    "detail": "Admin memilih kegiatan KGT001 (Lomba Pionering) untuk dipindai"
  },
  {
    "id": "AUD075",
    "timestamp": "2026-07-21 08:55:07",
    "pengguna": "ARI",
    "aktivitas": "Logout",
    "detail": "ARI keluar dari sistem."
  },
  {
    "id": "AUD042",
    "timestamp": "2026-07-20 19:16:18",
    "pengguna": "ARI",
    "aktivitas": "Melakukan Absensi",
    "detail": "Petugas ARI merekam kehadiran 63903 di kegiatan Lomba Pionering"
  },
  {
    "id": "AUD018",
    "timestamp": "2026-07-20 18:26:05",
    "pengguna": "ARI",
    "aktivitas": "Edit Kegiatan",
    "detail": "Mengubah jadwal kegiatan KGT001"
  },
  {
    "id": "AUD056",
    "timestamp": "2026-07-20 20:13:24",
    "pengguna": "ARI",
    "aktivitas": "Hapus Peserta",
    "detail": "Menghapus peserta dengan ID 33411"
  },
  {
    "id": "AUD016",
    "timestamp": "2026-07-20 11:21:21",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin Kak Syarifuddin (Kwarnas Ranting) berhasil masuk ke sistem."
  },
  {
    "id": "AUD002",
    "timestamp": "2026-07-19 22:46:22",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin Kak Syarifuddin (Kwarnas Ranting) berhasil masuk ke sistem."
  },
  {
    "id": "AUD080",
    "timestamp": "2026-07-21 12:31:53",
    "pengguna": "ARI",
    "aktivitas": "Tambah Pengumuman",
    "detail": "Membuat pengumuman baru: \"Ka Hendra\""
  },
  {
    "id": "AUD027",
    "timestamp": "2026-07-20 18:56:49",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD069",
    "timestamp": "2026-07-21 08:11:02",
    "pengguna": "ARI",
    "aktivitas": "Konfigurasi Supabase",
    "detail": "Menyimpan dan mengaktifkan integrasi database cloud Supabase."
  },
  {
    "id": "AUD020",
    "timestamp": "2026-07-20 18:38:49",
    "pengguna": "ARI",
    "aktivitas": "Edit Peserta",
    "detail": "Mengubah biodata peserta 33411"
  },
  {
    "id": "AUD087",
    "timestamp": "2026-07-21 21:55:16",
    "pengguna": "ARI",
    "aktivitas": "Ubah Pengumuman",
    "detail": "Mengubah pengumuman: \"Pemanggilan Peserta Perkemahan\""
  },
  {
    "id": "AUD057",
    "timestamp": "2026-07-20 20:13:33",
    "pengguna": "ARI",
    "aktivitas": "Import CSV Peserta",
    "detail": "Berhasil mengimpor 144 peserta baru"
  },
  {
    "id": "AUD043",
    "timestamp": "2026-07-20 19:16:23",
    "pengguna": "ARI",
    "aktivitas": "Melakukan Absensi",
    "detail": "Petugas ARI merekam kehadiran 68914 di kegiatan Lomba Pionering"
  },
  {
    "id": "AUD003",
    "timestamp": "2026-07-19 22:49:05",
    "pengguna": "Kak Syarifuddin (Kwarnas Ranting)",
    "aktivitas": "Integrasi GAS",
    "detail": "Berhasil melakukan tes koneksi ke Google Apps Script."
  },
  {
    "id": "AUD071",
    "timestamp": "2026-07-21 08:11:04",
    "pengguna": "ARI",
    "aktivitas": "Konfigurasi Supabase",
    "detail": "Menyimpan dan mengaktifkan integrasi database cloud Supabase."
  },
  {
    "id": "AUD081",
    "timestamp": "2026-07-21 12:31:58",
    "pengguna": "ARI",
    "aktivitas": "Putar Suara Pengumuman",
    "detail": "Memutar suara Text-to-Speech pengumuman: \"Ka Hendra\"."
  },
  {
    "id": "AUD048",
    "timestamp": "2026-07-20 19:52:50",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD061",
    "timestamp": "2026-07-21 08:07:04",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD031",
    "timestamp": "2026-07-20 19:10:34",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD052",
    "timestamp": "2026-07-20 20:05:04",
    "pengguna": "ARI",
    "aktivitas": "Melakukan Absensi",
    "detail": "Petugas ARI merekam kehadiran 33411 di kegiatan Lomba Pionering"
  },
  {
    "id": "AUD088",
    "timestamp": "2026-07-21 22:00:18",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD066",
    "timestamp": "2026-07-21 08:09:16",
    "pengguna": "ARI",
    "aktivitas": "Melakukan Absensi",
    "detail": "Petugas ARI merekam kehadiran 14820 di kegiatan lOMBA"
  },
  {
    "id": "AUD062",
    "timestamp": "2026-07-21 08:08:47",
    "pengguna": "ARI",
    "aktivitas": "Mengubah Target Scan",
    "detail": "Admin memilih kegiatan KGT001 (lOMBA) untuk dipindai"
  },
  {
    "id": "AUD015",
    "timestamp": "2026-07-20 10:46:43",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin Kak Syarifuddin (Kwarnas Ranting) berhasil masuk ke sistem."
  },
  {
    "id": "AUD053",
    "timestamp": "2026-07-20 20:08:29",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD063",
    "timestamp": "2026-07-21 08:09:00",
    "pengguna": "ARI",
    "aktivitas": "Melakukan Absensi",
    "detail": "Petugas ARI merekam kehadiran 90315 di kegiatan lOMBA"
  },
  {
    "id": "AUD058",
    "timestamp": "2026-07-20 20:21:29",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD082",
    "timestamp": "2026-07-21 12:32:33",
    "pengguna": "ARI",
    "aktivitas": "Logout",
    "detail": "ARI keluar dari sistem."
  },
  {
    "id": "AUD083",
    "timestamp": "2026-07-21 12:32:41",
    "pengguna": "Sistem",
    "aktivitas": "Login Peserta",
    "detail": "Peserta 33411 (SD NEGERI 334 BINUANG) berhasil masuk."
  },
  {
    "id": "AUD064",
    "timestamp": "2026-07-21 08:09:07",
    "pengguna": "ARI",
    "aktivitas": "Melakukan Absensi",
    "detail": "Petugas ARI merekam kehadiran 63903 di kegiatan lOMBA"
  },
  {
    "id": "AUD072",
    "timestamp": "2026-07-21 08:12:49",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD089",
    "timestamp": "2026-07-21 22:01:00",
    "pengguna": "ARI",
    "aktivitas": "Ubah Status Pengumuman",
    "detail": "Mengubah status pengumuman \"Pemanggilan Peserta Perkemahan\" menjadi Nonaktif."
  },
  {
    "id": "AUD091",
    "timestamp": "2026-07-21 22:01:04",
    "pengguna": "ARI",
    "aktivitas": "Ubah Status Pengumuman",
    "detail": "Mengubah status pengumuman \"Pemanggilan Peserta Perkemahan\" menjadi Aktif."
  },
  {
    "id": "AUD092",
    "timestamp": "2026-07-21 22:01:09",
    "pengguna": "ARI",
    "aktivitas": "Ubah Status Pengumuman",
    "detail": "Mengubah status pengumuman \"Pemanggilan Peserta Perkemahan\" menjadi Nonaktif."
  },
  {
    "id": "AUD044",
    "timestamp": "2026-07-20 19:16:28",
    "pengguna": "ARI",
    "aktivitas": "Melakukan Absensi",
    "detail": "Petugas ARI merekam kehadiran 14820 di kegiatan Lomba Pionering"
  },
  {
    "id": "AUD065",
    "timestamp": "2026-07-21 08:09:11",
    "pengguna": "ARI",
    "aktivitas": "Melakukan Absensi",
    "detail": "Petugas ARI merekam kehadiran 68914 di kegiatan lOMBA"
  },
  {
    "id": "AUD035",
    "timestamp": "2026-07-20 19:13:02",
    "pengguna": "Sistem",
    "aktivitas": "Login Peserta",
    "detail": "Peserta 33411 (SD NEGERI 334 BINUANG) berhasil masuk."
  },
  {
    "id": "AUD090",
    "timestamp": "2026-07-21 22:01:01",
    "pengguna": "ARI",
    "aktivitas": "Ubah Status Pengumuman",
    "detail": "Mengubah status pengumuman \"Pemanggilan Peserta Perkemahan\" menjadi Aktif."
  },
  {
    "id": "AUD040",
    "timestamp": "2026-07-20 19:15:38",
    "pengguna": "ARI",
    "aktivitas": "Mengubah Target Scan",
    "detail": "Admin memilih kegiatan KGT001 (Lomba Pionering) untuk dipindai"
  },
  {
    "id": "AUD029",
    "timestamp": "2026-07-20 19:06:45",
    "pengguna": "Sistem",
    "aktivitas": "Login Peserta",
    "detail": "Peserta 33411 (SD NEGERI 334 BINUANG) berhasil masuk."
  },
  {
    "id": "AUD045",
    "timestamp": "2026-07-20 19:17:45",
    "pengguna": "ARI",
    "aktivitas": "Hapus Laporan Terfilter",
    "detail": "Berhasil menghapus 4 data kehadiran sesuai filter."
  },
  {
    "id": "AUD030",
    "timestamp": "2026-07-20 19:10:28",
    "pengguna": "SD NEGERI 334 BINUANG",
    "aktivitas": "Logout",
    "detail": "SD NEGERI 334 BINUANG keluar dari sistem."
  },
  {
    "id": "AUD046",
    "timestamp": "2026-07-20 19:19:09",
    "pengguna": "ARI",
    "aktivitas": "Melakukan Absensi Massal",
    "detail": "Petugas ARI merekam kehadiran 4 peserta secara massal/sinkronisasi offline di kegiatan Lomba Pionering"
  },
  {
    "id": "AUD039",
    "timestamp": "2026-07-20 19:15:31",
    "pengguna": "Sistem",
    "aktivitas": "Login Admin",
    "detail": "Admin ARI berhasil masuk ke sistem."
  },
  {
    "id": "AUD041",
    "timestamp": "2026-07-20 19:16:12",
    "pengguna": "ARI",
    "aktivitas": "Melakukan Absensi",
    "detail": "Petugas ARI merekam kehadiran 90315 di kegiatan Lomba Pionering"
  },
  {
    "id": "AUD047",
    "timestamp": "2026-07-20 19:20:38",
    "pengguna": "ARI",
    "aktivitas": "Unduh Laporan Kehadiran",
    "detail": "Berhasil mengunduh PDF laporan kehadiran."
  }
];

export const defaultSettings: AppSettings = {
  "namaEvent": "Perkemahan Hari Pramuka ke 65",
  "kwartir": "Bulukumpa",
  "darkTheme": true,
  "autoRefreshInterval": 30,
  "soundEnabled": true,
  "speechEnabled": true,
  "batchScanDelay": 2500,
  "lokasiEvent": "Bumi Perkemahan Anisia",
  "pelaksanaEvent": "Kwartir Ranting Bulukumpa",
  "logoUrl": "https://cdn.phototourl.com/free/2026-07-17-841eabe5-f9de-4a3c-96a5-7654a896e774.png",
  "namaKetua": "Hendra, S.Pd",
  "namaSekretaris": "Ari Adam, S.Pd",
  "namaBendahara": "Eni Fadliliani, S.Pd",
  "supabaseEnabled": true,
  "supabaseConfig": {
    "supabaseUrl": "https://kibpfprrjqqwsdqfgoxg.supabase.co",
    "supabaseAnonKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpYnBmcHJyanFxd3NkcWZnb3hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NjQwMjUsImV4cCI6MjEwMDA0MDAyNX0.cTGnzbMbqQdU2Vw_XVis9v3ruPwPBGhFE9Sb1jV5j-Q"
  }
};

export const defaultAnnouncements: Pengumuman[] = [
  {
    "id": "ANN002",
    "judul": "Pemanggilan Peserta Perkemahan",
    "konten": "Kak Hendra Ketua Panitia agar merapat ke tribun panitia",
    "tanggal": "2026-07-21",
    "jam": "12:31",
    "tingkatanTarget": "Semua",
    "statusAktif": false,
    "dibuatOleh": "ARI"
  },
  {
    "id": "ANN001",
    "judul": "TES",
    "konten": "Diharapkan semua peserta berkumpul di Lapangan Upacara",
    "tanggal": "2026-07-21",
    "jam": "08:55",
    "tingkatanTarget": "Semua",
    "statusAktif": true,
    "dibuatOleh": "ARI"
  }
];

export const defaultDokumenKegiatan: DokumenKegiatan[] = [];
