// ===== DATA OBAT LENGKAP =====
const drugs = [
  // 1. ANTICHOLINERGICS
  {
    id:'atropine', name:'Atropine', category:'antiemetic',
    badges:['badge-rsi'],
    dose:'IV 0.4–1 mg (maks 3 mg)\nBradikardi: 0.5 mg IV tiap 3–5 mnt\nPremed: 10–20 mcg/kg IV/IM',
    doseHL:'yellow', indication:'Bradikardi simtomatis · Antisialagog · Keracunan organofosfat (dosis tinggi)',
    sideEffect:'Takikardi, mulut kering, midriasis, retensi urin, sindrom antikolinergik sentral, hipertermia. Hati-hati glaukoma, BPH.',
    brand:'<b>Nama Dagang:</b> Atropin Sulfat Generik (Kimia Farma, Indofarma), Atropine® · <b>Sediaan:</b> 0.25 mg/mL amp (1 mL), 0.5 mg/mL amp (1 mL), 1 mg/1 mL amp.',
    section:'1. ANTICHOLINERGICS & ANTIEMETICS', sectionColor:'#1565C0',
    warning:'', note:'',
    hasWeightCalc:true,
    calcFormula: (w,dose) => `Dosis titrasi: ${(0.01*w).toFixed(2)} mg – ${(0.02*w).toFixed(2)} mg IV\nPremed anak: ${(0.01*w*1000).toFixed(0)} mcg – ${(0.02*w*1000).toFixed(0)} mcg`,
    calcDoses:['0.4mg IV (bradikardi)', '10-20 mcg/kg premed', 'Maks 3 mg'],
  },
  {
    id:'glycopyrrolate', name:'Glycopyrrolate', category:'antiemetic',
    badges:[],
    dose:'IV 0.2–0.4 mg (4–8 mcg/kg)\nDengan neostigmine: 10 mcg/kg',
    doseHL:'green', indication:'Antisialagog (PILIHAN – TANPA efek SSP) · Bradikardi · Ko-admin dengan neostigmine',
    sideEffect:'Takikardi, mulut kering, retensi urin. TIDAK melewati BBB → tidak menyebabkan delirium. AMAN untuk lansia.',
    brand:'<b>Nama Dagang:</b> Robinul® (Pfizer), Glycopyrronium Generik · <b>Sediaan:</b> 0.2 mg/mL amp (1 mL, 2 mL). Di Indonesia sering diimpor/digunakan di kamar operasi spesialis.',
    section:'1. ANTICHOLINERGICS & ANTIEMETICS', sectionColor:'#1565C0',
    warning:'', note:'Pilihan lebih aman untuk pasien lansia dibanding atropine.',
    hasWeightCalc:true,
    calcFormula: (w) => `Dosis: ${(0.004*w*1000).toFixed(0)} mcg – ${(0.008*w*1000).toFixed(0)} mcg IV\n= ${(0.004*w).toFixed(3)} mg – ${(0.008*w).toFixed(3)} mg IV`,
    calcDoses:['4 mcg/kg', '8 mcg/kg', 'Dengan neostigmine: 10 mcg/kg'],
  },
  {
    id:'ondansetron', name:'Ondansetron', category:'antiemetic',
    badges:[],
    dose:'IV 4–8 mg pelan selama 2–5 mnt\nProfilaksis PONV: di akhir operasi',
    doseHL:'blue', indication:'Profilaksis & terapi PONV · CINV · Hiperemesis',
    sideEffect:'Perpanjangan QT (maks 16 mg IV dosis tunggal – Peringatan FDA!), sakit kepala, konstipasi, sindrom serotonin dengan SSRI.',
    brand:'<b>Nama Dagang:</b> Zofran® (GSK), Ondavell®, Vomceran®, Narfoz®, Ondansetron Generik (Kimia Farma, Sanbe) · <b>Sediaan:</b> 4 mg/2 mL amp, 8 mg/4 mL amp. Tablet 4 mg & 8 mg.',
    section:'1. ANTICHOLINERGICS & ANTIEMETICS', sectionColor:'#1565C0',
    warning:'PERINGATAN FDA: Maks 16 mg IV dosis tunggal → risiko perpanjangan QT!',
    note:'', hasWeightCalc:false,
    calcDoses:['4 mg IV (ringan)', '8 mg IV (berat)'],
  },
  {
    id:'metoclopramide', name:'Metoclopramide', category:'antiemetic',
    badges:['badge-danger'],
    dose:'IV 10 mg pelan selama 1–2 mnt\nProkinetik: 10 mg IV/PO tiap 6–8 jam',
    doseHL:'orange', indication:'PONV (efek lemah) · Gastroparesis · Pengosongan lambung pre-RSI · Migrain',
    sideEffect:'Reaksi ekstrapiramidal, diskinesia tardif (KOTAK HITAM!), perpanjangan QT, sindrom neuroleptik maligna. Hindari pada obstruksi.',
    brand:'<b>Nama Dagang:</b> Primperan® (Sanofi), Gavistal®, Vometa®, Metoclopramide Generik (Kimia Farma) · <b>Sediaan:</b> 5 mg/mL amp (2 mL = 10 mg). Tablet 10 mg.',
    section:'1. ANTICHOLINERGICS & ANTIEMETICS', sectionColor:'#1565C0',
    warning:'KOTAK HITAM: Diskinesia tardif – bisa ireversibel dengan penggunaan lama!',
    note:'', hasWeightCalc:false,
    calcDoses:['10 mg IV standard'],
  },

  // 2. SEDATIVES
  {
    id:'propofol', name:'Propofol', category:'sedative',
    badges:['badge-icu'],
    dose:'Induksi IV 1.5–2.5 mg/kg\n(Kurangi 50% pada syok/lansia!)\nSedasi: 25–75 mcg/kg/mnt\nTIVA: 4–12 mg/kg/jam',
    doseHL:'yellow', indication:'Induksi & rumatan GA · Sedasi ICU · Sedasi prosedur · Antiemetik dosis sub-hipnotik',
    sideEffect:'Hipotensi, apnea, bradikardia, nyeri injeksi, hipertrigliseridemia, PRIS (Propofol Infusion Syndrome: asidosis metabolik, rhabdomiolisis, gagal jantung) jika >4 mg/kg/jam selama >48 jam.',
    brand:'<b>Nama Dagang:</b> Diprivan® (AstraZeneca), Fresofol® (Fresenius), Recofol®, Propofol Generik · <b>Sediaan:</b> 200 mg/20 mL (1%), 500 mg/50 mL (1%). Emulsi lipid – hitung kalori (1.1 kkal/mL).',
    section:'2. SEDATIF-HIPNOTIK & AGEN INDUKSI', sectionColor:'#6A1B9A',
    warning:'PRIS: Hindari >4 mg/kg/jam selama >48 jam! Monitor laktat & trigliserida.',
    note:'Perhatikan alergi telur/kedelai.',
    hasWeightCalc:true,
    calcFormula: (w,dose) => {
      const minDose = 1.5*w, maxDose = 2.5*w;
      const minInfus = 25*w/1000, maxInfus = 75*w/1000;
      const conc = 10; // mg/mL (1%)
      const minRate = (25*w*60)/(1000*conc);
      const maxRate = (75*w*60)/(1000*conc);
      return `Induksi: ${minDose.toFixed(0)} mg – ${maxDose.toFixed(0)} mg IV\nSedasi ICU: ${(minInfus).toFixed(2)} mg/mnt – ${(maxInfus).toFixed(2)} mg/mnt\n= ${minRate.toFixed(1)} mL/jam – ${maxRate.toFixed(1)} mL/jam\n(Propofol 1% = 10 mg/mL)`;
    },
    calcDoses:['1.5 mg/kg (induksi min)', '2.5 mg/kg (induksi maks)', '25 mcg/kg/mnt (sedasi min)', '75 mcg/kg/mnt (sedasi maks)'],
  },
  {
    id:'ketamine', name:'Ketamine', category:'sedative',
    badges:['badge-rsi', 'badge-firstline'],
    dose:'Induksi IV 1–2 mg/kg\nIM 4–10 mg/kg\nAnalgesia: 0.1–0.5 mg/kg IV\nInfus: 0.1–0.5 mg/kg/jam',
    doseHL:'green', indication:'RSI pada syok/asma/gagal RV (DAS 2025) · Analgesia opioid-sparing · Sedasi prosedur',
    sideEffect:'Delirium emergensi, hipertensi, takikardi, peningkatan IOP/ICP (masih diperdebatkan), hipersalivasi, laringospasme.',
    brand:'<b>Nama Dagang:</b> Ketalar® (Pfizer), Ketamine HCl Generik (Kimia Farma) · <b>Sediaan:</b> 10 mg/mL vial (20 mL = 200 mg), 50 mg/mL vial (10 mL = 500 mg), 100 mg/mL vial (10 mL = 1000 mg).',
    section:'2. SEDATIF-HIPNOTIK & AGEN INDUKSI', sectionColor:'#6A1B9A',
    warning:'Hindari pada hipertensi tidak terkontrol, IHD berat.',
    note:'DAS 2025: Pilihan untuk RSI pada syok, asma, dan gagal ventrikel kanan.',
    hasWeightCalc:true,
    calcFormula: (w) => `Induksi IV: ${(1*w).toFixed(0)} mg – ${(2*w).toFixed(0)} mg\nIM: ${(4*w).toFixed(0)} mg – ${(10*w).toFixed(0)} mg\nAnalgesia IV: ${(0.1*w).toFixed(1)} mg – ${(0.5*w).toFixed(1)} mg`,
    calcDoses:['1 mg/kg IV (induksi)', '2 mg/kg IV (max)', '0.1-0.5 mg/kg (analgesia)'],
  },
  {
    id:'midazolam', name:'Midazolam', category:'sedative',
    badges:[],
    dose:'Premed IV 0.02–0.05 mg/kg\nPO 0.5 mg/kg (anak)\nInduksi: 0.1–0.3 mg/kg\nSedasi ICU: 0.02–0.1 mg/kg/jam',
    doseHL:'pink', indication:'Anxiolisis · Premedikasi · Amnesia · Status epileptikus · Sedasi ICU (hindari berkepanjangan)',
    sideEffect:'Depresi napas (sinergis opioid!), hipotensi, agitasi paradoksal (lansia & anak), sedasi berkepanjangan, delirium.',
    brand:'<b>Nama Dagang:</b> Dormicum® (Roche), Miloz® (Kimia Farma), Sedacum® · <b>Sediaan:</b> 15 mg/3 mL amp (5 mg/mL), 5 mg/1 mL amp.',
    section:'2. SEDATIF-HIPNOTIK & AGEN INDUKSI', sectionColor:'#6A1B9A',
    warning:'Hati-hati kombinasi dengan opioid → depresi napas sinergistik!',
    note:'', hasWeightCalc:true,
    calcFormula: (w) => {
      const conc = 15/50; // mg/mL: 15mg dalam 50mL
      const minRate = (0.02*w)/conc;
      const maxRate = (0.1*w)/conc;
      return `Premed IV: ${(0.02*w).toFixed(2)} mg – ${(0.05*w).toFixed(2)} mg\nInduksi: ${(0.1*w).toFixed(1)} mg – ${(0.3*w).toFixed(1)} mg\nSedasi ICU: ${minRate.toFixed(1)} mL/jam – ${maxRate.toFixed(1)} mL/jam\n(Konsentrasi 15mg/50mL = 0.3 mg/mL)`;
    },
    calcDoses:['0.02-0.05 mg/kg premed', '0.1-0.3 mg/kg induksi'],
  },
  {
    id:'dexmedetomidine', name:'Dexmedetomidine', category:'sedative',
    badges:['badge-icu', 'badge-firstline'],
    dose:'Load IV 1 mcg/kg selama 10 mnt\n(sering dihilangkan)\nRumatan: 0.2–1.4 mcg/kg/jam',
    doseHL:'purple', indication:'Sedasi ICU kooperatif · Sedasi prosedur · Intubasi serat optik awake · Pencegahan delirium',
    sideEffect:'Bradikardia, hipotensi (kadang hipertensi dgn bolus), mulut kering. TIDAK menyebabkan depresi napas ✓. Withdrawal jika dihentikan tiba-tiba.',
    brand:'<b>Nama Dagang:</b> Precedex® (Pfizer/Hospira) · <b>Sediaan:</b> 200 mcg/2 mL amp (100 mcg/mL). Biasa: 200 mcg dalam 48 mL NS → 4 mcg/mL.',
    section:'2. SEDATIF-HIPNOTIK & AGEN INDUKSI', sectionColor:'#6A1B9A',
    warning:'', note:'Keunggulan utama: TIDAK menekan pernapasan!',
    hasWeightCalc:true,
    calcFormula: (w) => {
      const conc = 200/50; // mcg/mL: 200mcg dalam 50mL = 4 mcg/mL
      const minRate = (0.2*w)/conc;
      const maxRate = (1.4*w)/conc;
      return `Load: ${(1*w).toFixed(1)} mcg selama 10 mnt\nRumatan min: ${(0.2*w).toFixed(2)} mcg/jam = ${minRate.toFixed(1)} mL/jam\nRumatan maks: ${(1.4*w).toFixed(2)} mcg/jam = ${maxRate.toFixed(1)} mL/jam\n(200mcg/50mL = 4 mcg/mL)`;
    },
    calcDoses:['1 mcg/kg load', '0.2-1.4 mcg/kg/jam rumatan'],
  },

  // 3. OPIOIDS
  {
    id:'morphine', name:'Morphine', category:'opioid',
    badges:[],
    dose:'IV 0.05–0.1 mg/kg (titrasi 1–2 mg/5 mnt)\nPCA: 1 mg bolus, lockout 5–10 mnt\nEpidural: 2–5 mg',
    doseHL:'yellow', indication:'Nyeri sedang–berat · MI · Edema paru akut · Perawatan paliatif',
    sideEffect:'Depresi napas, hipotensi, rilis histamin (hindari asma!), pruritus, mual, konstipasi, retensi urin. Metabolit aktif M6G akumulasi pada gagal ginjal.',
    brand:'<b>Nama Dagang:</b> MST Continus® (tablet SR), Morphine HCl Generik (Kimia Farma, Indofarma) · <b>Sediaan:</b> 10 mg/mL amp (1 mL), 20 mg/mL amp (1 mL). Golongan narkotika – butuh resep khusus.',
    section:'3. OPIOID & ANALGESIK NON-OPIOID', sectionColor:'#C62828',
    warning:'M6G akumulasi pada gagal ginjal → sedasi berkepanjangan!',
    note:'Hindari pada asma karena rilis histamin.', hasWeightCalc:true,
    calcFormula: (w) => `Dosis: ${(0.05*w).toFixed(2)} mg – ${(0.1*w).toFixed(2)} mg IV\nTitrasi: 1–2 mg IV tiap 5 mnt hingga efek`,
    calcDoses:['0.05 mg/kg', '0.1 mg/kg maks'],
  },
  {
    id:'fentanyl', name:'Fentanyl', category:'opioid',
    badges:[],
    dose:'Pre-induksi: 1–3 mcg/kg\nBolus: 25–100 mcg\nInfus: 0.5–3 mcg/kg/jam\nEpidural: 25–100 mcg',
    doseHL:'green', indication:'Analgesia intraoperatif · Adjuvan RSI (tumpulkan respons presor) · Analgesia ICU',
    sideEffect:'Depresi napas, rigiditas dinding dada (bolus cepat dosis tinggi), bradikardia, hipotensi, pemulihan tertunda dengan infus.',
    brand:'<b>Nama Dagang:</b> Fentanyl Generik, Fentanil® · <b>Sediaan:</b> 500 mcg/10 mL amp (50 mcg/mL). Infus ICU: 500 mcg dalam 48 mL NS → 10 mcg/mL.',
    section:'3. OPIOID & ANALGESIK NON-OPIOID', sectionColor:'#C62828',
    warning:'Rigiditas dinding dada jika bolus cepat dosis tinggi → kesulitan ventilasi!',
    note:'', hasWeightCalc:true,
    calcFormula: (w) => {
      const conc = 500/50; // mcg/mL = 10 mcg/mL
      const minRate = (0.5*w)/conc;
      const maxRate = (3*w)/conc;
      return `Pre-induksi: ${(1*w).toFixed(0)} mcg – ${(3*w).toFixed(0)} mcg IV\nInfus min: ${(0.5*w).toFixed(1)} mcg/jam = ${minRate.toFixed(1)} mL/jam\nInfus maks: ${(3*w).toFixed(1)} mcg/jam = ${maxRate.toFixed(1)} mL/jam\n(500mcg/50mL = 10 mcg/mL)`;
    },
    calcDoses:['1-3 mcg/kg pre-induksi', '0.5-3 mcg/kg/jam infus'],
  },
  {
    id:'remifentanil', name:'Remifentanil', category:'opioid',
    badges:['badge-danger'],
    dose:'TCI 2–8 ng/mL\nInfus: 0.05–2 mcg/kg/mnt\nBolus hanya via jalur infus',
    doseHL:'pink', indication:'Komponen TIVA · Intubasi awake · Prosedur stimulasi intense · Analgesia persalinan obstetrik',
    sideEffect:'Bradikardia & hipotensi berat, rigiditas dada, hiperalgesia induksi opioid. TIDAK ADA analgesia residual!',
    brand:'<b>Nama Dagang:</b> Ultiva® (Aspen/GSK) · <b>Sediaan:</b> 1 mg vial lyophilized (reconstitusi dengan 20 mL WFI → 50 mcg/mL), 2 mg vial, 5 mg vial. Sangat mahal – spesifik kamar operasi.',
    section:'3. OPIOID & ANALGESIK NON-OPIOID', sectionColor:'#C62828',
    warning:'TIDAK ADA analgesia residual! Rencanakan bridging analgesia sebelum menghentikan!',
    note:'', hasWeightCalc:true,
    calcFormula: (w) => `Infus min: ${(0.05*w).toFixed(2)} mcg/mnt\nInfus maks: ${(2*w).toFixed(2)} mcg/mnt\n= ${(0.05*w*60).toFixed(1)} mcg/jam – ${(2*w*60).toFixed(1)} mcg/jam`,
    calcDoses:['0.05-2 mcg/kg/mnt infus'],
  },
  {
    id:'paracetamol', name:'Paracetamol (IV)', category:'opioid',
    badges:['badge-firstline'],
    dose:'IV 1 g tiap 6 jam (maks 4 g/hari)\nKurangi pada penyakit hati, BB <50 kg\n(15 mg/kg tiap 6 jam)',
    doseHL:'orange', indication:'Analgesia multimodal · Demam · Analgesik non-opioid lini pertama',
    sideEffect:'Hepatotoksisitas pada overdosis, malnutrisi, penggunaan alkohol. Hipotensi pada infus IV cepat. Jarang ruam, hipersensitivitas.',
    brand:'<b>Nama Dagang:</b> Perfalgan® (Bristol-Myers Squibb), Paracetamol Infus Generik (Dexa Medica, Kimia Farma) · <b>Sediaan:</b> 1000 mg/100 mL infus botol (10 mg/mL). Tablet/sirup tersedia luas.',
    section:'3. OPIOID & ANALGESIK NON-OPIOID', sectionColor:'#C62828',
    warning:'', note:'Aman & efektif → selalu sertakan dalam analgesia multimodal!',
    hasWeightCalc:true,
    calcFormula: (w) => {
      const dose = w < 50 ? 15*w : 1000;
      return `Dosis: ${dose.toFixed(0)} mg IV tiap 6 jam\nMaks per hari: ${w<50 ? (15*w*4).toFixed(0) : 4000} mg`;
    },
    calcDoses:['1 g tiap 6 jam (>50 kg)', '15 mg/kg tiap 6 jam (<50 kg)'],
  },
  {
    id:'ketorolac', name:'Ketorolac', category:'opioid',
    badges:[],
    dose:'IV/IM 30 mg tiap 6 jam (maks 5 hari)\n15 mg jika >65 tahun atau BB <50 kg',
    doseHL:'blue', indication:'Nyeri pascaoperasi · Kolik renal · Analgesia multimodal opioid-sparing',
    sideEffect:'Perdarahan GI, AKI, penghambatan trombosit, bronkospasme (asma sensitif aspirin). Hindari pada gangguan ginjal, risiko perdarahan, trimester akhir kehamilan.',
    brand:'<b>Nama Dagang:</b> Toradol® (Roche), Ketorolac Tromethamine Generik (Dexa Medica, Sanbe, Kimia Farma) · <b>Sediaan:</b> 30 mg/mL amp (1 mL = 30 mg), 10 mg tablet.',
    section:'3. OPIOID & ANALGESIK NON-OPIOID', sectionColor:'#C62828',
    warning:'Hindari pada gangguan ginjal, risiko perdarahan tinggi!',
    note:'Maks hanya 5 hari penggunaan.', hasWeightCalc:false,
    calcDoses:['30 mg tiap 6 jam (standar)', '15 mg tiap 6 jam (lansia/>65 thn)'],
  },

  // 4. NMB
  {
    id:'succinylcholine', name:'Succinylcholine', category:'nmb',
    badges:['badge-danger'],
    dose:'IV 1–1.5 mg/kg (RSI)\nIM 3–4 mg/kg (anak)',
    doseHL:'pink', indication:'RSI bila intubasi cepat diperlukan dan rocuronium/sugammadex tidak tersedia · Rescue laringospasme: 0.1–0.5 mg/kg',
    sideEffect:'HIPERKALEMIA (KI: luka bakar >24 jam, crush >5 hari, denerasi, penyakit NM, hiperK!), PEMICU MALIGNANT HYPERTHERMIA, bradikardia anak, fasikulasi, mialgia, ↑IOP/ICP/tekanan lambung, spasme masseter.',
    brand:'<b>Nama Dagang:</b> Anectine® (GSK), Quelicin®, Succinylcholine Klorida Generik · <b>Sediaan:</b> 20 mg/mL vial (10 mL = 200 mg). Di Indonesia distribusi terbatas – tersedia di RS besar/kamar operasi.',
    section:'4. NEUROMUSCULAR BLOCKERS & REVERSAL', sectionColor:'#00695C',
    warning:'KONTRAINDIKASI HIPERKALEMIA: Luka bakar >24 jam, crush injury >5 hari, denerasi, penyakit neuromuskular! PEMICU MALIGNANT HYPERTHERMIA!',
    note:'Pada anak: selalu berikan atropine terlebih dahulu (bradikardi).', hasWeightCalc:true,
    calcFormula: (w) => `RSI: ${(1*w).toFixed(0)} mg – ${(1.5*w).toFixed(0)} mg IV\nIM anak: ${(3*w).toFixed(0)} mg – ${(4*w).toFixed(0)} mg`,
    calcDoses:['1 mg/kg RSI', '1.5 mg/kg RSI maks'],
  },
  {
    id:'rocuronium', name:'Rocuronium', category:'nmb',
    badges:['badge-rsi', 'badge-firstline'],
    dose:'Intubasi IV 0.6–1.2 mg/kg\nRSI: 1.0–1.2 mg/kg\nRumatan: 0.15 mg/kg bolus atau 5–10 mcg/kg/mnt',
    doseHL:'green', indication:'RSI PILIHAN (DAS 2025 bila sugammadex tersedia) · Intubasi rutin · Paralisis rumatan',
    sideEffect:'Anafilaksis (paling sering terkait NMBA!), paralisis memanjang pada penyakit hati/ginjal, takikardi ringan.',
    brand:'<b>Nama Dagang:</b> Esmeron® (MSD/Organon), Rocuronium Bromide Generik (Dexa Medica, Combiphar) · <b>Sediaan:</b> 10 mg/mL vial (5 mL = 50 mg, 10 mL = 100 mg). Simpan di kulkas 2–8°C.',
    section:'4. NEUROMUSCULAR BLOCKERS & REVERSAL', sectionColor:'#00695C',
    warning:'', note:'DAS 2025: Rocuronium + Sugammadex = pilihan RSI optimal.',
    hasWeightCalc:true,
    calcFormula: (w) => `Intubasi: ${(0.6*w).toFixed(0)} mg – ${(1.2*w).toFixed(0)} mg IV\nRSI: ${(1.0*w).toFixed(0)} mg – ${(1.2*w).toFixed(0)} mg IV\nRumatan: ${(0.15*w).toFixed(1)} mg/dosis`,
    calcDoses:['0.6-1.2 mg/kg intubasi', '1.0-1.2 mg/kg RSI'],
  },
  {
    id:'sugammadex', name:'Sugammadex', category:'nmb',
    badges:['badge-firstline'],
    dose:'TOF ≥2 (blok rutin): IV 2 mg/kg\nBlok dalam: 4 mg/kg\nRescue darurat: 16 mg/kg!',
    doseHL:'blue', indication:'Reversal rocuronium/vecuronium di kedalaman apapun (DAS 2025) · Rescue tidak bisa-intubasi',
    sideEffect:'Anafilaksis (~1:2500), bradikardia, hipotensi, rekurarisasi (jarang dengan dosis adekuat), ↓ efektivitas kontrasepsi hormonal selama 7 hari.',
    brand:'<b>Nama Dagang:</b> Bridion® (MSD/Organon) · <b>Sediaan:</b> 200 mg/2 mL vial (100 mg/mL). Harga mahal – 1 vial 200 mg. Tersedia di RS tersier/kamar operasi besar.',
    section:'4. NEUROMUSCULAR BLOCKERS & REVERSAL', sectionColor:'#00695C',
    warning:'Rescue darurat (tidak bisa intubasi/ventilasi): 16 mg/kg IV segera!',
    note:'Kurangi efektivitas pil KB 7 hari!', hasWeightCalc:true,
    calcFormula: (w) => `Rutin (TOF≥2): ${(2*w).toFixed(0)} mg IV\nBlok dalam (TOF<2): ${(4*w).toFixed(0)} mg IV\nRescue darurat: ${(16*w).toFixed(0)} mg IV SEGERA!`,
    calcDoses:['2 mg/kg blok rutin', '4 mg/kg blok dalam', '16 mg/kg rescue darurat'],
  },

  // 7. VASOPRESSORS
  {
    id:'noradrenaline', name:'Noradrenalin (Norepinephrine)', category:'vaso',
    badges:['badge-firstline'],
    dose:'Central IV 0.05–3 mcg/kg/mnt\n(target MAP ≥65 mmHg)\nPerifer: OK jangka pendek (vena besar)',
    doseHL:'yellow', indication:'LINI PERTAMA syok septik (SSC 2026) · Syok vasodilatori · Hipotensi pasca henti jantung',
    sideEffect:'Nekrosis ekstravasasi (atasi: phentolamine 5–10 mg SC lokal), iskemia digital, aritmia, hipoperfusi splanknik/ginjal dosis tinggi, takikardi.',
    brand:'<b>Nama Dagang:</b> Levophed® (Abbott), Norepinephrine HCl Generik · <b>Sediaan:</b> 4 mg/4 mL amp (1 mg/mL). Biasa dilarutkan 4 mg dalam 46 mL NS → 80 mcg/mL, atau 8 mg dalam 42 mL NS → 160 mcg/mL.',
    section:'7. VASOPRESSOR, INOTROPE & KRONOTROPE', sectionColor:'#E65100',
    warning:'Ekstravasasi → nekrosis jaringan! Gunakan akses sentral idealnya.',
    note:'SSC 2026: LINI PERTAMA pada syok septik.', hasWeightCalc:true,
    calcFormula: (w) => {
      const conc = 8/50; // mg/mL default: 8mg dalam 50mL
      const minRate = (0.05*w*60)/1000/conc;
      const maxRate = (3*w*60)/1000/conc;
      return `Dosis min: ${(0.05*w).toFixed(2)} mcg/mnt = ${minRate.toFixed(1)} mL/jam\nDosis maks: ${(3*w).toFixed(1)} mcg/mnt = ${maxRate.toFixed(1)} mL/jam\n(Konsentrasi 8mg/50mL = 160 mcg/mL)\nTarget MAP ≥65 mmHg`;
    },
    calcDoses:['0.05 mcg/kg/mnt start', 'Titrasi sampai MAP ≥65 mmHg', 'Maks 3 mcg/kg/mnt'],
  },
  {
    id:'adrenaline', name:'Adrenalin (Epinephrine)', category:'vaso',
    badges:['badge-rsi', 'badge-danger'],
    dose:'Henti jantung: 1 mg IV tiap 3–5 mnt (AHA 2025)\nAnafilaksis: 0.5 mg IM (1:1000), ulang 5–15 mnt\nInfus: 0.05–1 mcg/kg/mnt\nCroup neb: 5 mL 1:1000',
    doseHL:'pink', indication:'Henti jantung (SEMUA ritme) · ANAFILAKSIS LINI PERTAMA · Syok septik lini ketiga · Bronkospasme refrakter',
    sideEffect:'Takiaritmia, hipertensi, iskemia miokard, hiperglikemia, hipokalemia, ansietas, asidosis laktat dosis tinggi.',
    brand:'<b>Nama Dagang:</b> Epinefrin HCl Generik, Adrenalin® · <b>Sediaan:</b> 1 mg/1 mL amp (1:1000), 0.1 mg/mL (1:10.000). Infus ICU: 1 mg dalam 49 mL NS → 20 mcg/mL.',
    section:'7. VASOPRESSOR, INOTROPE & KRONOTROPE', sectionColor:'#E65100',
    warning:'Anafilaksis: ADRENALIN IM 0.5 mg adalah LINI PERTAMA – jangan tunda!',
    note:'', hasWeightCalc:true,
    calcFormula: (w) => {
      const conc = 1/50; // mg/mL default: 1mg dalam 50mL
      const minRate = (0.05*w*60)/1000/conc;
      const maxRate = (1*w*60)/1000/conc;
      return `Infus min: ${(0.05*w).toFixed(2)} mcg/mnt = ${minRate.toFixed(1)} mL/jam\nInfus maks: ${(1*w).toFixed(1)} mcg/mnt = ${maxRate.toFixed(1)} mL/jam\n(Konsentrasi 1mg/50mL = 20 mcg/mL)\nHenti jantung: 1 mg IV fix`;
    },
    calcDoses:['1 mg IV tiap 3-5 mnt (henti jantung)', '0.5 mg IM (anafilaksis)'],
  },
  {
    id:'phenylephrine', name:'Phenylephrine', category:'vaso',
    badges:['badge-firstline'],
    dose:'Bolus IV 50–200 mcg\nInfus: 0.1–2 mcg/kg/mnt\nPush-dose: 100 mcg/mL (1 mg dalam 100 mL NS),\nberikan 0.5–2 mL tiap 2–5 mnt',
    doseHL:'orange', indication:'Hipotensi akibat spinal (SC) → LINI PERTAMA untuk SC · Vasopressor bridging · Stenosis aorta, HOCM',
    sideEffect:'Bradikardia refleks, hipertensi, ↓ CO pada jantung gagal, iskemia perifer, hipoperfusi mesenterik/ginjal.',
    brand:'<b>Nama Dagang:</b> Vascon®, Neo-Synephrine® (Pfizer), Phenylephrine HCl Generik · <b>Sediaan:</b> 10 mg/mL amp (1 mL = 10 mg). Diencerkan: 1 mg dalam 100 mL NS → 10 mcg/mL untuk push-dose.',
    section:'7. VASOPRESSOR, INOTROPE & KRONOTROPE', sectionColor:'#E65100',
    warning:'', note:'Lini pertama untuk hipotensi spinal pada SC (obstetrik).',
    hasWeightCalc:true,
    calcFormula: (w) => `Infus min: ${(0.1*w).toFixed(2)} mcg/mnt\nInfus maks: ${(2*w).toFixed(1)} mcg/mnt`,
    calcDoses:['50-200 mcg bolus', '0.1-2 mcg/kg/mnt infus'],
  },
  {
    id:'dobutamine', name:'Dobutamine', category:'vaso',
    badges:[],
    dose:'Infus 2.5–20 mcg/kg/mnt',
    doseHL:'green', indication:'Syok kardiogenik · Low cardiac output state · Sepsis dengan hipoperfusi persisten meski MAP adekuat (SSC 2026)',
    sideEffect:'Takikardia, aritmia, hipotensi (vasodilasi), iskemia miokard, tachyphylaxis setelah 72 jam.',
    brand:'<b>Nama Dagang:</b> Dobuject® (Soho), Inotrop® · <b>Sediaan:</b> 250 mg/20 mL amp. Biasa: 250 mg dalam 30 mL NS → 5 mg/mL, atau 250 mg dalam 250 mL → 1 mg/mL.',
    section:'7. VASOPRESSOR, INOTROPE & KRONOTROPE', sectionColor:'#E65100',
    warning:'', note:'Dopamine TIDAK LAGI first-line pada syok (SSC 2026).',
    hasWeightCalc:true,
    calcFormula: (w) => {
      const conc = 250/50; // mg/mL: 250mg dalam 50mL = 5 mg/mL
      const minRate = (2.5*w*60)/1000/conc;
      const maxRate = (20*w*60)/1000/conc;
      return `Dosis min: ${(2.5*w).toFixed(1)} mcg/mnt = ${minRate.toFixed(1)} mL/jam\nDosis maks: ${(20*w).toFixed(0)} mcg/mnt = ${maxRate.toFixed(1)} mL/jam\n(Konsentrasi 250mg/50mL = 5 mg/mL = 5000 mcg/mL)`;
    },
    calcDoses:['2.5-20 mcg/kg/mnt'],
  },

  // 8. ANTIHYPERTENSIVES
  {
    id:'amiodarone', name:'Amiodarone', category:'antihyp',
    badges:[],
    dose:'VF/VT tanpa nadi (AHA 2025):\n300 mg IV bolus, lalu 150 mg jika persisten\nStabil: 150 mg/10 mnt, lalu 1 mg/mnt x 6 jam,\nlalu 0.5 mg/mnt',
    doseHL:'yellow', indication:'VF/VT refrakter (AHA 2025) · Fibrilasi atrial, SVT, VT · Aritmia pasca henti jantung',
    sideEffect:'Hipotensi (infus cepat), bradikardia, perpanjangan QT, disfungsi tiroid (hiper & hipo), fibrosis paru (kronik), hepatotoksisitas, deposit kornea.',
    brand:'<b>Nama Dagang:</b> Cordarone® (Sanofi), Amiodaron Generik (Dexa Medica, Kimia Farma), Tiaryt® · <b>Sediaan:</b> 50 mg/mL amp (3 mL = 150 mg, 6 mL = 300 mg). Tablet 100 mg & 200 mg.',
    section:'8. ANTIHIPERTENSI & ANTIARITMIA', sectionColor:'#4527A0',
    warning:'', note:'Alternatif: Lignocaine untuk VF/VT refrakter (AHA 2025).',
    hasWeightCalc:false,
    calcDoses:['300 mg IV bolus (henti jantung)', '150 mg/10 mnt (stabil)', '1 mg/mnt x 6 jam rumatan'],
  },
  {
    id:'adenosine', name:'Adenosine', category:'antihyp',
    badges:[],
    dose:'Push cepat IV 6 mg → 12 mg → 12 mg\n(vena besar, proksimal, bilas 20 mL saline!)\n50% dosis via akses sentral',
    doseHL:'blue', indication:'Diagnostik & terapeutik SVT · Diferensiasi takikardi kompleks lebar',
    sideEffect:'Asistol sementara (peringatkan pasien!), flushing, nyeri dada, bronkospasme (hindari asma), blok AV. Hindari pada WPW dengan AF.',
    brand:'<b>Nama Dagang:</b> Adenocor® (Sanofi), Adenosine Generik · <b>Sediaan:</b> 3 mg/mL vial (2 mL = 6 mg, 4 mL = 12 mg). Harus disuntik push sangat cepat + diikuti flush NS 20 mL segera.',
    section:'8. ANTIHIPERTENSI & ANTIARITMIA', sectionColor:'#4527A0',
    warning:'Hindari pada WPW dengan AF! Selalu peringatkan pasien tentang asistol sementara.',
    note:'', hasWeightCalc:false,
    calcDoses:['6 mg IV push cepat pertama', '12 mg kedua', '12 mg ketiga'],
  },
  {
    id:'labetalol', name:'Labetalol', category:'antihyp',
    badges:[],
    dose:'IV 5–20 mg bolus tiap 10 mnt (maks 300 mg)\nInfus: 0.5–2 mg/mnt',
    doseHL:'orange', indication:'Emergensi hipertensi (termasuk preeklampsia – lini pertama) · Diseksi aorta · Krisis feokromositoma (setelah alfa-blokade)',
    sideEffect:'Bradikardia, bronkospasme, blok jantung, hipotensi ortostatik. KI: asma berat, blok jantung, gagal jantung dekompensasi.',
    brand:'<b>Nama Dagang:</b> Trandate® (Aspen), Normodyne®, Labetalol HCl Generik · <b>Sediaan:</b> 5 mg/mL amp (20 mL = 100 mg). Tablet 100 mg, 200 mg. Ketersediaan di Indonesia terbatas – sering diimpor.',
    section:'8. ANTIHIPERTENSI & ANTIARITMIA', sectionColor:'#4527A0',
    warning:'KI: Asma berat, blok jantung, gagal jantung dekompensasi!',
    note:'Lini pertama emergensi hipertensi pada kehamilan/preeklampsia.', hasWeightCalc:false,
    calcDoses:['5-20 mg IV bolus tiap 10 mnt', 'Maks 300 mg total'],
  },

  // 9. FLUIDS
  {
    id:'noradrenaline_vaso', name:'MgSO4 (Magnesium Sulfat)', category:'fluid',
    badges:['badge-firstline'],
    dose:'Eklampsia (Zuspan): 4–6 g IV/15–20 mnt,\nlalu 1–2 g/jam selama 24 jam pasca persalinan\nTorsades: 2 g IV/1–2 mnt\nAsma: 2 g IV/20 mnt',
    doseHL:'yellow', indication:'Eklampsia/pre-eklampsia berat – LINI PERTAMA (Magpie trial) · Torsades de pointes · Asma berat (adjuvan) · Hipomagnesemia · Tetanus',
    sideEffect:'Hipotensi (infus cepat), DEPRESI NAPAS (>12 mEq/L!), hilang refleks patela (8–10 mEq/L – tanda awal!), hipokalsemia, henti jantung (>25 mEq/L). ANTIDOT: kalsium glukonat 1 g IV!',
    brand:'<b>Nama Dagang:</b> MgSO4 Generik (Kimia Farma, Indofarma), Otsu-MgSO4® (Otsuka) · <b>Sediaan:</b> 20% (200 mg/mL) amp 25 mL = 5 g; 40% (400 mg/mL) amp 25 mL = 10 g. Selalu encerkan sebelum IV!',
    section:'9. CAIRAN IV, ELEKTROLIT & KOREKSI', sectionColor:'#00838F',
    warning:'Monitor refleks patela & frekuensi napas! Antidot: Kalsium glukonat 1 g IV segera!',
    note:'', hasWeightCalc:false,
    calcDoses:['4-6 g load (eklampsia)', '1-2 g/jam rumatan', '2 g IV (torsades)'],
  },
  {
    id:'kcl', name:'KCl (Kalium Klorida)', category:'fluid',
    badges:['badge-danger'],
    dose:'Penggantian: 10–20 mmol/jam perifer\nMaks 40 mmol/jam sentral\nKonsentrasi maks: <40 mmol/L perifer',
    doseHL:'pink', indication:'Hipokalemia · DKA · Kehilangan K akibat diuretik',
    sideEffect:'Henti jantung (jika push undiluted!), iritasi lokal, aritmia.',
    brand:'<b>Nama Dagang:</b> KCl Generik (Kimia Farma, Otsuka), Otsu-KCl® · <b>Sediaan:</b> 7.46% (1 mEq/mL) vial 25 mL = 25 mEq; Infus siap pakai KCl dalam NaCl/Dextrose tersedia 10 mEq/500 mL & 20 mEq/500 mL.',
    section:'9. CAIRAN IV, ELEKTROLIT & KOREKSI', sectionColor:'#00838F',
    warning:'JANGAN PERNAH push undiluted/cepat → HENTI JANTUNG!',
    note:'', hasWeightCalc:false,
    calcDoses:['10-20 mmol/jam perifer', 'Maks 40 mmol/jam sentral'],
  },

  // 12. STEROIDS
  {
    id:'hydrocortisone', name:'Hydrocortisone', category:'steroid',
    badges:[],
    dose:'Syok septik: 50 mg IV tiap 6 jam\natau 200 mg/hari infus kontinu (SSC 2026)\nKrisis adrenal: 100 mg IV stat, lalu 50–100 mg/6 jam\nStres: 25–100 mg',
    doseHL:'yellow', indication:'Syok septik pada vasopressor (SSC 2026) · Krisis adrenal · Anafilaksis (setelah adrenalin) · Asma berat',
    sideEffect:'Hiperglikemia, hipokalemia, hipertensi, imunosupresi, perdarahan GI, kelemahan neuromuskular (dengan NMBA), delirium.',
    brand:'<b>Nama Dagang:</b> Solu-Cortef® (Pfizer), Hydrocortisone Na Succinate Generik (Kimia Farma, Dexa) · <b>Sediaan:</b> 100 mg/vial lyophilized (reconstitusi 2 mL), 500 mg/vial, 1000 mg/vial. Tablet 5 mg & 20 mg.',
    section:'12. KORTIKOSTEROID & BRONKODILATOR', sectionColor:'#558B2F',
    warning:'', note:'SSC 2026: Sarankan pemberian pada syok septik di vasopressor.',
    hasWeightCalc:false,
    calcDoses:['50 mg tiap 6 jam', '200 mg/hari infus kontinu'],
  },
  {
    id:'salbutamol', name:'Salbutamol (Albuterol)', category:'steroid',
    badges:[],
    dose:'Neb 2.5–5 mg tiap 20 mnt, lalu tiap 1–4 jam\nMDI 4–10 puff via spacer\nIV 4 mcg/kg/5 mnt, lalu 1–5 mcg/kg/mnt (berat)',
    doseHL:'green', indication:'Asma akut · Eksaserbasi PPOK · Hiperkalemia (mendorong K masuk ke intrasel)',
    sideEffect:'Takikardia, tremor, hipokalemia, asidosis laktat (dosis tinggi), hiperglikemia.',
    brand:'<b>Nama Dagang:</b> Ventolin® (GSK – neb & inhaler), Ventorlin®, Salbutamol Generik (Kimia Farma), Combivent® (kombinasi + ipratropium) · <b>Sediaan:</b> Neb: 2.5 mg/2.5 mL unit dose; MDI 100 mcg/puff; IV: 0.5 mg/mL amp (1 mL).',
    section:'12. KORTIKOSTEROID & BRONKODILATOR', sectionColor:'#558B2F',
    warning:'', note:'Berguna untuk hiperkalemia – mendorong kalium masuk ke dalam sel.',
    hasWeightCalc:true,
    calcFormula: (w) => `IV: ${(4*w).toFixed(0)} mcg selama 5 mnt\nInfus: ${(1*w).toFixed(1)} mcg/mnt – ${(5*w).toFixed(1)} mcg/mnt`,
    calcDoses:['4 mcg/kg IV (loading)', '1-5 mcg/kg/mnt infus'],
  },

  // 15. ANTIDOTES
  {
    id:'nac', name:'N-Asetilsistein (NAC)', category:'antidote',
    badges:['badge-firstline'],
    dose:'OD Paracetamol:\n1. 150 mg/kg dalam 200 mL/1 jam\n2. 50 mg/kg dalam 500 mL/4 jam\n3. 100 mg/kg dalam 1000 mL/16 jam',
    doseHL:'yellow', indication:'Overdosis paracetamol (ANTIDOT) · Mukolotik · Hepatitis akibat acetaminophen · Nefroproteksi kontras',
    sideEffect:'Reaksi anafilaktoid (infus pertama lambat – ruam, bronkospasme), mual, muntah.',
    brand:'<b>Nama Dagang:</b> Acetylcysteine Generik (Kimia Farma), Fluimucil® Antidote (Zambon – IV), Fluimucil® (oral/neb mukolotik), Actein® · <b>Sediaan:</b> 200 mg/mL amp (10 mL = 2 g) untuk IV. Sachet 200 mg oral.',
    section:'15. DUKUNGAN KRITIS & ANTIDOT', sectionColor:'#AD1457',
    warning:'', note:'Efektivitas terbaik bila diberikan <8–10 jam pasca ingesti!',
    hasWeightCalc:true,
    calcFormula: (w) => `Fase 1: ${(150*w).toFixed(0)} mg dalam 200 mL/1 jam\nFase 2: ${(50*w).toFixed(0)} mg dalam 500 mL/4 jam\nFase 3: ${(100*w).toFixed(0)} mg dalam 1000 mL/16 jam\nTotal: ${(300*w).toFixed(0)} mg`,
    calcDoses:['150 mg/kg fase 1', '50 mg/kg fase 2', '100 mg/kg fase 3'],
  },
  {
    id:'naloxone', name:'Naloxone', category:'antidote',
    badges:[],
    dose:'Titrasi: 0.04–0.4 mg IV tiap 2–3 mnt\nOD: 0.4–2 mg IV/IM/IN\nInfus: 2/3 dosis efektif/jam',
    doseHL:'orange', indication:'Overdosis opioid · Reversal depresi napas pasca operasi opioid',
    sideEffect:'Withdrawal akut (nyeri hebat pasien toleran opioid!), edema paru (jarang), takiaritmia, hipertensi.',
    brand:'<b>Nama Dagang:</b> Narcan® (Pfizer/Emergent), Nalokson Generik (Kimia Farma), Naranti® · <b>Sediaan:</b> 0.4 mg/mL amp (1 mL = 0.4 mg), 1 mg/mL amp. Intranasal (IN): 4 mg/0.1 mL device (Narcan Nasal).',
    section:'15. DUKUNGAN KRITIS & ANTIDOT', sectionColor:'#AD1457',
    warning:'Pada pasien ketergantungan opioid: withdrawal akut bisa sangat hebat!',
    note:'', hasWeightCalc:false,
    calcDoses:['0.04-0.4 mg tiap 2-3 mnt (titrasi)', '0.4-2 mg (overdosis)'],
  },
  {
    id:'dantrolene', name:'Dantrolene', category:'antidote',
    badges:['badge-firstline', 'badge-danger'],
    dose:'MH: 2.5 mg/kg IV bolus, ulang tiap 5 mnt\nhingga terkontrol (total 10–20 mg/kg)\nRumatan: 1 mg/kg tiap 4–6 jam IV selama 24–48 jam\n(risiko rekrudesens!)',
    doseHL:'pink', indication:'MALIGNANT HYPERTHERMIA – LINI PERTAMA! · Sindrom neuroleptik maligna · Spastisitas berat',
    sideEffect:'Kelemahan otot, sedasi, hepatotoksisitas (kronik), flebitis (pH tinggi – vena besar), gagal napas, GI upset.',
    brand:'<b>Nama Dagang:</b> Dantrium® (Par Pharmaceutical) – 20 mg/vial lyophilized; Ryanodex® (Eagle Pharma) – 250 mg/vial (reconstitusi lebih cepat!) · Ketersediaan di Indonesia SANGAT TERBATAS – hubungi RS pusat.',
    section:'15. DUKUNGAN KRITIS & ANTIDOT', sectionColor:'#AD1457',
    warning:'MALIGNANT HYPERTHERMIA: Hubungi MHAUS +1-800-644-9737! Setiap vial Dantrium = 20 mg (perlu 60 mL air steril untuk reconstitusi).',
    note:'Ryanodex = 250 mg/vial (reconstitusi lebih cepat!)', hasWeightCalc:true,
    calcFormula: (w) => `Bolus: ${(2.5*w).toFixed(0)} mg IV\nTarget total: ${(10*w).toFixed(0)} mg – ${(20*w).toFixed(0)} mg\nJumlah vial Dantrium (20mg/vial): ${Math.ceil(20*w/20)} vial estimasi\nRumatan: ${(1*w).toFixed(0)} mg IV tiap 4–6 jam`,
    calcDoses:['2.5 mg/kg bolus', 'Total 10-20 mg/kg', '1 mg/kg/4-6 jam rumatan'],
  },
  {
    id:'methylene', name:'Methylene Blue', category:'antidote',
    badges:[],
    dose:'MetHb: 1–2 mg/kg IV selama 5 mnt\nVasoplegi: 1–2 mg/kg selama 30 mnt',
    doseHL:'blue', indication:'Methemoglobinemia · Syok vasoplegik refrakter (pasca CPB) · Ensefalopati ifosfamide',
    sideEffect:'SINDROM SEROTONIN (dengan SSRI!), hemolisis pada defisiensi G6PD, urin biru-hijau, SpO2 palsu rendah.',
    brand:'<b>Nama Dagang:</b> Methylene Blue Generik (Kimia Farma), Provayblue® (US), Urolene Blue® · <b>Sediaan:</b> 10 mg/mL amp (10 mL = 100 mg). Encerkan dalam 50–100 mL NaCl 0.9% sebelum infus.',
    section:'15. DUKUNGAN KRITIS & ANTIDOT', sectionColor:'#AD1457',
    warning:'HINDARI pada pasien dengan defisiensi G6PD (hemolisis) dan pengguna SSRI (sindrom serotonin)!',
    note:'', hasWeightCalc:true,
    calcFormula: (w) => `MetHb: ${(1*w).toFixed(0)} mg – ${(2*w).toFixed(0)} mg IV selama 5 mnt\nVasoplegi: ${(1*w).toFixed(0)} mg – ${(2*w).toFixed(0)} mg selama 30 mnt`,
    calcDoses:['1-2 mg/kg MetHb', '1-2 mg/kg vasoplegi'],
  },
];
