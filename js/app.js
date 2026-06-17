// ====== UNIT CONVERTER ======
function convertUnit(value, from, to) {
  const toMg = { 'g': 1000, 'mg': 1, 'mcg': 0.001, 'IU': 0.001 };
  const fromMg = { 'g': 0.001, 'mg': 1, 'mcg': 1000, 'IU': 1000 };
  return (value * toMg[from] * fromMg[to]).toFixed(4).replace(/\.?0+$/, '');
}

// ====== AUTH — KEYGEN SYSTEM ======
// Secret master key: GANTI string ini menjadi kode rahasia Anda sendiri!
// Harus sama persis dengan SECRET_KEY di keygen.html
const SECRET_KEY = 'ICU-RSUD-2026-#Karthik!';

let savedDrugs = JSON.parse(localStorage.getItem('savedDrugs') || '[]');

// Hash sederhana deterministik (djb2 style, berbasis string)
function simpleHash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0; // tetap unsigned 32-bit
  }
  return hash.toString(36).toUpperCase().padStart(7, '0');
}

// Buat token valid: hash(SECRET_KEY + username + YYYY-MM-DD)
// Jika ada expiry (YYYY-MM-DD), token hanya berlaku pada hari itu
// Jika ada durasi (misal 7 hari), token berlaku selama rentang itu
function generateToken(username, dateStr) {
  return simpleHash(SECRET_KEY + '|' + username.toLowerCase() + '|' + dateStr);
}

// Verifikasi password: cek token hari ini ± toleransi 1 hari (antisipasi beda timezone)
function verifyPassword(username, password) {
  const now = new Date();
  for (let offset = -1; offset <= 1; offset++) {
    const d = new Date(now);
    d.setDate(d.getDate() + offset);
    const dateStr = d.toISOString().slice(0, 10); // YYYY-MM-DD
    const validToken = generateToken(username, dateStr);
    if (password.toUpperCase() === validToken) return true;
  }
  return false;
}

function doLogin() {
  const user = document.getElementById('username').value.trim().toLowerCase();
  const pass = document.getElementById('password').value.trim();
  const err  = document.getElementById('loginError');

  if (!user || !pass) {
    err.textContent = '❌ Isi username dan password!';
    err.style.display = 'block';
    setTimeout(() => err.style.display = 'none', 3000);
    return;
  }

  if (verifyPassword(user, pass)) {
    // Simpan sesi sederhana
    sessionStorage.setItem('icu_user', user);
    sessionStorage.setItem('icu_login_time', Date.now());
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    renderDrugs(drugs);
    setTimeout(checkInstall, 3000);
  } else {
    err.textContent = '❌ Kode akses tidak valid atau sudah kedaluwarsa.';
    err.style.display = 'block';
    setTimeout(() => err.style.display = 'none', 4000);
  }
}

function logout() {
  sessionStorage.removeItem('icu_user');
  sessionStorage.removeItem('icu_login_time');
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

// ====== RENDER ======
function renderDrugs(list) {
  const container = document.getElementById('drugContent');
  // Keep SSC banner
  const banner = container.querySelector('.ssc-banner');
  container.innerHTML = '';
  if (banner) container.appendChild(banner);

  if (list.length === 0) {
    container.innerHTML += '<div style="text-align:center;padding:40px;color:#999;grid-column:1/-1"><div style="font-size:48px">🔍</div><p>Obat tidak ditemukan</p></div>';
    return;
  }

  list.forEach((drug, idx) => {
    const isSaved = savedDrugs.includes(drug.id);
    const hlClass = { yellow:'hl-yellow', green:'hl-green', pink:'hl-pink', blue:'hl-blue', orange:'hl-orange', purple:'hl-purple' }[drug.doseHL] || '';
    
    const badges = drug.badges.map(b => {
      const labels = { 'badge-rsi':'RSI', 'badge-firstline':'Lini Pertama', 'badge-danger':'⚠ Perhatian', 'badge-icu':'ICU' };
      return `<span class="drug-badge ${b}">${labels[b]}</span>`;
    }).join('');

    const warnBox = drug.warning ? `<div class="warning-box">⚠️ ${drug.warning}</div>` : '';
    const noteBox = drug.note ? `<div class="important-box">💡 ${drug.note}</div>` : '';
    const brandBox = drug.brand ? `<div class="brand-box">💊 ${drug.brand}</div>` : '';

    const doseLines = drug.dose.split('\n').map(l => l.trim()).filter(Boolean);
    
    const calcDosesHTML = drug.calcDoses.map(d => 
      `<span class="unit-btn" style="cursor:default">${d}</span>`
    ).join('');

    const calcHTML = drug.hasWeightCalc ? `
      <button class="calc-toggle" onclick="toggleCalc('${drug.id}')">🧮 Kalkulator Dosis per BB</button>
      <div class="calc-panel" id="calc_${drug.id}">
        <h4>Hitung Dosis berdasarkan Berat Badan Pasien</h4>
        <div class="calc-row">
          <label>BB Pasien (kg):</label>
          <input type="number" id="bb_${drug.id}" value="60" min="1" max="200" step="0.5">
          <button class="calc-btn" onclick="calcDose('${drug.id}')">Hitung</button>
        </div>
        <div class="unit-convert">
          <label style="font-size:11px;font-family:var(--ui-font);color:#555;align-self:center">Konversi:</label>
          <input type="number" id="conv_val_${drug.id}" placeholder="nilai" style="width:80px;padding:4px;border:1px solid #ccc;border-radius:4px;font-size:12px">
          <select id="conv_from_${drug.id}" style="padding:4px;border:1px solid #ccc;border-radius:4px;font-size:12px">
            <option>g</option><option selected>mg</option><option>mcg</option><option>IU</option>
          </select>
          <span style="font-size:12px;align-self:center">→</span>
          <select id="conv_to_${drug.id}" style="padding:4px;border:1px solid #ccc;border-radius:4px;font-size:12px">
            <option>g</option><option>mg</option><option selected>mcg</option><option>IU</option>
          </select>
          <button class="unit-btn" onclick="doConvert('${drug.id}')">Konversi</button>
        </div>
        <div class="calc-result" id="res_${drug.id}">Masukkan BB pasien dan klik Hitung...</div>
      </div>
    ` : `
      <button class="calc-toggle" onclick="toggleCalc('${drug.id}')">📋 Panduan Dosis</button>
      <div class="calc-panel" id="calc_${drug.id}">
        <h4>Dosis Referensi</h4>
        <div class="unit-convert">${calcDosesHTML}</div>
        <div class="unit-convert" style="margin-top:8px">
          <label style="font-size:11px;font-family:var(--ui-font);color:#555;align-self:center">Konversi satuan:</label>
          <input type="number" id="conv_val_${drug.id}" placeholder="nilai" style="width:80px;padding:4px;border:1px solid #ccc;border-radius:4px;font-size:12px">
          <select id="conv_from_${drug.id}" style="padding:4px;border:1px solid #ccc;border-radius:4px;font-size:12px">
            <option>g</option><option selected>mg</option><option>mcg</option><option>IU</option>
          </select>
          <span style="font-size:12px;align-self:center">→</span>
          <select id="conv_to_${drug.id}" style="padding:4px;border:1px solid #ccc;border-radius:4px;font-size:12px">
            <option>g</option><option>mg</option><option selected>mcg</option><option>IU</option>
          </select>
          <button class="unit-btn" onclick="doConvert('${drug.id}')">Konversi</button>
        </div>
        <div class="calc-result" id="res_${drug.id}">Masukkan nilai untuk konversi satuan...</div>
      </div>
    `;

    const card = document.createElement('div');
    card.className = 'drug-card';
    card.dataset.cat = drug.category;
    card.dataset.id = drug.id;
    card.dataset.search = (drug.name + drug.indication + drug.dose + drug.section).toLowerCase();
    card.style.borderLeftColor = drug.sectionColor;
    card.style.animationDelay = (idx * 0.05) + 's';

    card.innerHTML = `
      <div class="drug-entry">
        <button class="bookmark-btn ${isSaved ? 'saved' : ''}" onclick="toggleSave('${drug.id}', this)" 
                title="${isSaved ? 'Hapus dari simpanan' : 'Simpan obat ini'}">
          ${isSaved ? '⭐' : '☆'}
        </button>
        <div class="drug-name">${drug.name} ${badges}</div>
        <div class="drug-row">
          <span class="label">💉 DOSIS:</span>
          <span class="${hlClass}">${doseLines[0]}</span>
          ${doseLines.slice(1).map(l => `<br><span style="margin-left:80px">${l}</span>`).join('')}
        </div>
        <div class="drug-row text-green">
          <span class="label">✔ INDIKASI:</span> ${drug.indication}
        </div>
        <div class="drug-row text-red">
          <span class="label">⚠ EFEK SAMPING:</span> ${drug.sideEffect}
        </div>
        ${warnBox}${noteBox}${brandBox}
        ${calcHTML}
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleCalc(id) {
  const panel = document.getElementById('calc_'+id);
  panel.classList.toggle('show');
}

function calcDose(id) {
  const drug = drugs.find(d => d.id === id);
  const w = parseFloat(document.getElementById('bb_'+id).value);
  if (!w || w <= 0) { document.getElementById('res_'+id).textContent = '❌ Masukkan berat badan yang valid!'; return; }
  const result = drug.calcFormula(w);
  document.getElementById('res_'+id).innerHTML = result.replace(/\n/g, '<br>');
}

function doConvert(id) {
  const val = parseFloat(document.getElementById('conv_val_'+id).value);
  const from = document.getElementById('conv_from_'+id).value;
  const to = document.getElementById('conv_to_'+id).value;
  if (isNaN(val)) { document.getElementById('res_'+id).textContent = '❌ Masukkan nilai yang valid!'; return; }
  const result = convertUnit(val, from, to);
  document.getElementById('res_'+id).textContent = `${val} ${from} = ${result} ${to}`;
}

function searchDrugs(q) {
  q = q.toLowerCase().trim();
  const cards = document.querySelectorAll('#drugContent .drug-card:not(.ssc-banner)');
  cards.forEach(card => {
    const match = !q || card.dataset.search.includes(q);
    card.classList.toggle('hidden', !match);
  });
}

function filterCategory(cat, btn) {
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  
  const cards = document.querySelectorAll('#drugContent .drug-card:not(.ssc-banner)');
  if (cat === 'all') {
    cards.forEach(c => c.classList.remove('hidden'));
  } else if (cat === 'saved') {
    cards.forEach(c => {
      c.classList.toggle('hidden', !savedDrugs.includes(c.dataset.id));
    });
  } else {
    cards.forEach(c => {
      c.classList.toggle('hidden', c.dataset.cat !== cat);
    });
  }
}

function toggleSave(id, btn) {
  const idx = savedDrugs.indexOf(id);
  if (idx >= 0) {
    savedDrugs.splice(idx, 1);
    btn.textContent = '☆'; btn.classList.remove('saved');
  } else {
    savedDrugs.push(id);
    btn.textContent = '⭐'; btn.classList.add('saved');
  }
  localStorage.setItem('savedDrugs', JSON.stringify(savedDrugs));
}

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
  
  if (name === 'drugs') {
    document.getElementById('screenDrugs').classList.add('active');
    document.getElementById('navDrugs').classList.add('active');
  } else if (name === 'bookmarks') {
    document.getElementById('screenDrugs').classList.add('active');
    document.getElementById('navBookmarks').classList.add('active');
    filterCategory('saved', document.querySelector('.cat-tab:last-child'));
  } else if (name === 'about') {
    document.getElementById('screenAbout').classList.add('active');
    document.getElementById('navAbout').classList.add('active');
  }
}

// ====== PWA / INSTALL ======
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').style.display = 'block';
  document.getElementById('installPrompt').style.display = 'block';
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
  } else {
    alert('Untuk memasang:\n📱 Android (Chrome): Menu ⋮ → "Tambahkan ke Layar Utama"\n🍎 iPhone (Safari): Bagikan ⬆️ → "Tambah ke Layar Utama"');
  }
  dismissInstall();
}

function dismissInstall() {
  document.getElementById('installPrompt').style.display = 'none';
}

function checkInstall() {
  if (deferredPrompt) {
    document.getElementById('installPrompt').style.display = 'block';
  }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

// ====== MODAL FUNCTIONS ======
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
// Close on overlay click
document.querySelectorAll('.tool-modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) closeModal(this.id);
  });
});

function switchTab(group, tab) {
  let modalId, prefix;
  if (group === 'apache') { modalId = 'modalAPACHE'; prefix = 'apache_tab_'; }
  else if (group === 'vent') { modalId = 'modalVentilator'; prefix = 'vent_tab_'; }
  else if (group === 'sofa') { modalId = 'modalQSOFA'; prefix = 'sofa_tab_'; }
  else return;

  document.querySelectorAll(`[id^="${prefix}"]`).forEach(el => el.classList.remove('active'));
  document.getElementById(prefix + tab).classList.add('active');

  const allTabs = document.querySelectorAll(`#${modalId} .modal-tab`);
  allTabs.forEach(t => t.classList.remove('active'));
  const tabOrders = {
    apache: ['physio','age'],
    vent: ['params','alarm','modes','monitor'],
    sofa: ['score','tabel']
  };
  const idx = (tabOrders[group] || []).indexOf(tab);
  if (allTabs[idx]) allTabs[idx].classList.add('active');
}

// ====== TITRASI KALKULATOR ======
function hitungTitrasi() {
  const drugMg = parseFloat(document.getElementById('tr_drug_mg').value);
  const drugMl = parseFloat(document.getElementById('tr_drug_ml').value);
  const bb = parseFloat(document.getElementById('tr_bb').value);
  const doseVal = parseFloat(document.getElementById('tr_dose_val').value);
  const doseUnit = document.getElementById('tr_dose_unit').value;
  const res = document.getElementById('tr_result');

  if (isNaN(drugMg) || isNaN(drugMl) || isNaN(bb) || isNaN(doseVal) || drugMl <= 0) {
    res.innerHTML = '❌ Isi semua data dengan benar!'; return;
  }
  const concMgPerMl = drugMg / drugMl;

  let mlPerJam;
  if (doseUnit === 'mcg/kg/mnt') {
    mlPerJam = (doseVal * bb * 60) / (concMgPerMl * 1000);
  } else if (doseUnit === 'mcg/kg/jam') {
    mlPerJam = (doseVal * bb) / (concMgPerMl * 1000);
  } else if (doseUnit === 'mg/kg/jam') {
    mlPerJam = (doseVal * bb) / concMgPerMl;
  } else if (doseUnit === 'mcg/mnt') {
    mlPerJam = (doseVal * 60) / (concMgPerMl * 1000);
  } else if (doseUnit === 'mg/jam') {
    mlPerJam = doseVal / concMgPerMl;
  } else if (doseUnit === 'unit/mnt') {
    mlPerJam = (doseVal * 60) / (concMgPerMl * 1000);
  } else if (doseUnit === 'unit/jam') {
    mlPerJam = doseVal / concMgPerMl;
  }

  res.innerHTML = `
    <b>Konsentrasi:</b> ${concMgPerMl.toFixed(4)} mg/mL = ${(concMgPerMl*1000).toFixed(2)} mcg/mL<br>
    <b>Dosis target:</b> ${doseVal} ${doseUnit} (BB ${bb} kg)<br>
    <span style="font-size:28px;color:#1565C0;font-weight:700">⇒ SET PUMP: ${mlPerJam.toFixed(2)} mL/jam</span><br>
    <small style="font-size:13px;color:#555">Durasi habis (${drugMl} mL): ~${(drugMl/mlPerJam).toFixed(1)} jam</small>
  `;
}

function presetTitrasi(name, mg, ml, dose, unit, brand, sediaan) {
  document.getElementById('tr_drug_mg').value = mg;
  document.getElementById('tr_drug_ml').value = ml;
  document.getElementById('tr_dose_val').value = dose;
  const sel = document.getElementById('tr_dose_unit');
  for (let i=0; i<sel.options.length; i++) {
    if (sel.options[i].value === unit) { sel.selectedIndex = i; break; }
  }
  const brandEl = document.getElementById('tr_brand');
  brandEl.style.display = 'block';
  brandEl.innerHTML = `<b>${name}</b> | ${brand} | <i>Sediaan: ${sediaan}</i>`;
  hitungTitrasi();
}

// ====== qSOFA ======
function hitungSOFA() {
  const resp   = parseInt(document.getElementById('sf_resp').value);
  const coag   = parseInt(document.getElementById('sf_coag').value);
  const liver  = parseInt(document.getElementById('sf_liver').value);
  const cardio = parseInt(document.getElementById('sf_cardio').value);
  const neuro  = parseInt(document.getElementById('sf_neuro').value);
  const renal  = parseInt(document.getElementById('sf_renal').value);
  const total  = resp + coag + liver + cardio + neuro + renal;
  const el = document.getElementById('sofa_result');
  el.style.display = 'block';
  let mort='', badge='';
  if(total<=1){mort='Mortalitas ICU <1%';badge='✅ Rendah';}
  else if(total<=3){mort='Mortalitas ICU ~7%';badge='🟡 Ringan';}
  else if(total<=5){mort='Mortalitas ICU ~20%';badge='🟠 Sedang';}
  else if(total<=7){mort='Mortalitas ICU ~21–33%';badge='🔴 Berat';}
  else if(total<=9){mort='Mortalitas ICU ~33–50%';badge='🔴 Sangat Berat';}
  else if(total<=11){mort='Mortalitas ICU ~50%';badge='🔴 Kritis';}
  else{mort='Mortalitas ICU >95%';badge='⚫ Sangat Kritis';}
  const isSepsis = total >= 2;
  const sepsisBadge = isSepsis
    ? '<div style="background:rgba(255,0,0,0.25);padding:4px 10px;border-radius:8px;font-size:13px;margin-top:4px">⚠️ MEMENUHI KRITERIA SEPSIS (SOFA ≥2)</div>'
    : '<div style="background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:8px;font-size:13px;margin-top:4px">✅ Belum memenuhi kriteria Sepsis-3</div>';
  el.innerHTML = `<div class="score-num">${total}<span style="font-size:20px">/24</span></div><div class="score-label">SOFA Score &nbsp;${badge}</div><div class="score-interp">Resp:${resp} Koag:${coag} Hepar:${liver} Kardio:${cardio} Neuro:${neuro} Renal:${renal}<br><span style="font-size:16px;font-weight:700">${mort}</span>${sepsisBadge}</div>`;
}

// ====== APACHE II ======
function hitungAPACHE() {
  const acute = ['ap_temp','ap_map','ap_hr','ap_rr','ap_oxy','ap_ph','ap_na','ap_k','ap_cr','ap_hct','ap_wbc'].reduce((sum, id) => {
    const el = document.getElementById(id);
    return sum + (el ? parseInt(el.value) : 0);
  }, 0);
  const gcsVal = parseInt(document.getElementById('ap_gcs_val').value) || 0;
  const age = parseInt(document.getElementById('ap_age').value) || 0;
  const chronic = parseInt(document.getElementById('ap_chronic').value) || 0;
  const total = acute + gcsVal + age + chronic;

  const el = document.getElementById('apache_result');
  el.style.display = 'block';
  let mort = '', color = '#1565C0';
  if (total <= 4) { mort = '~4% mortalitas'; color='#2E7D32'; }
  else if (total <= 9) { mort = '~8% mortalitas'; color='#558B2F'; }
  else if (total <= 14) { mort = '~15% mortalitas'; color='#F9A825'; }
  else if (total <= 19) { mort = '~25% mortalitas'; color='#E65100'; }
  else if (total <= 24) { mort = '~40% mortalitas'; color='#C62828'; }
  else if (total <= 29) { mort = '~55% mortalitas'; color='#B71C1C'; }
  else if (total <= 34) { mort = '~73% mortalitas'; color='#880E4F'; }
  else { mort = '~85% mortalitas'; color='#4A148C'; }

  el.innerHTML = `<div class="score-num">${total}</div><div class="score-label">APACHE II Score</div><div class="score-interp">Fisiologi Akut: ${acute} | GCS-poin: ${gcsVal} | Usia: ${age} | Kronis: ${chronic}<br><span style="font-size:18px;font-weight:700;background:rgba(255,255,255,0.15);padding:4px 12px;border-radius:8px">${mort}</span></div>`;
}

// ====== ASAM BASA ======
function hitungAcidBase() {
  const pH = parseFloat(document.getElementById('ab_ph').value);
  const pCO2 = parseFloat(document.getElementById('ab_pco2').value);
  const hco3 = parseFloat(document.getElementById('ab_hco3').value);
  const na = parseFloat(document.getElementById('ab_na').value) || 140;
  const cl = parseFloat(document.getElementById('ab_cl').value) || 104;
  const alb = parseFloat(document.getElementById('ab_alb').value) || 4.0;

  if (isNaN(pH)||isNaN(pCO2)||isNaN(hco3)) {
    alert('Isi nilai pH, PaCO₂, dan HCO₃!'); return;
  }

  // Klasifikasi utama
  let disorder = '', primary = '', comp = '', color = '#00695C';
  const pHAcid = pH < 7.35, pHAlk = pH > 7.45;
  const pCO2High = pCO2 > 45, pCO2Low = pCO2 < 35;
  const hco3Low = hco3 < 22, hco3High = hco3 > 26;

  if (!pHAcid && !pHAlk) {
    disorder = '⚖️ pH Normal (7.35–7.45)';
    if (pCO2High && hco3High) disorder += ' — tapi ada kemungkinan gangguan campuran terkompensasi sempurna';
  } else if (pHAcid) {
    if (pCO2High) { disorder = '🔴 Asidosis Respiratorik'; primary = 'CO₂ naik → pH turun'; color='#C62828'; }
    else if (hco3Low) { disorder = '🔴 Asidosis Metabolik'; primary = 'HCO₃ turun → pH turun'; color='#C62828'; }
    else { disorder = '🔴 Asidosis Campuran'; color='#C62828'; }
  } else {
    if (pCO2Low) { disorder = '🔵 Alkalosis Respiratorik'; primary = 'CO₂ turun → pH naik'; color='#1565C0'; }
    else if (hco3High) { disorder = '🔵 Alkalosis Metabolik'; primary = 'HCO₃ naik → pH naik'; color='#1565C0'; }
    else { disorder = '🔵 Alkalosis Campuran'; color='#1565C0'; }
  }

  // Anion Gap
  const ag = na - (cl + hco3);
  const agCorr = alb ? ag + 2.5*(4-alb) : ag;
  const agStatus = agCorr > 12 ? `⬆️ AG TINGGI (${agCorr.toFixed(1)}) → penyebab: MUDPILES (Methanol, Uremia, DKA, Phenformin, Isoniazid, Laktat, Etanol, Salisilat)` : `✅ AG Normal (${agCorr.toFixed(1)}) → penyebab metabolik non-AG (diare, RTA)`;

  // Expected compensation
  let compText = '';
  if (disorder.includes('Asidosis Metabolik')) {
    const expCO2 = (1.5*hco3 + 8);
    const delta = 2;
    compText = `Kompensasi Winters: PaCO₂ diharapkan = ${(expCO2-delta).toFixed(0)}–${(expCO2+delta).toFixed(0)} mmHg`;
    if (pCO2 < expCO2-delta) compText += ' → PaCO₂ TERLALU RENDAH: tambahan Alkalosis Respiratorik!';
    else if (pCO2 > expCO2+delta) compText += ' → PaCO₂ TERLALU TINGGI: tambahan Asidosis Respiratorik!';
    else compText += ' ✅ Kompensasi adekuat';
  } else if (disorder.includes('Alkalosis Metabolik')) {
    const expCO2 = 40 + 0.7*(hco3-24);
    compText = `PaCO₂ diharapkan: ~${expCO2.toFixed(0)} mmHg`;
    if (Math.abs(pCO2 - expCO2) > 5) compText += ' → Ada gangguan campuran!';
    else compText += ' ✅ Kompensasi adekuat';
  } else if (disorder.includes('Asidosis Respiratorik')) {
    const acute = 24 + (pCO2-40)/10;
    const chronic = 24 + 3.5*(pCO2-40)/10;
    compText = `HCO₃ akut diharapkan: ~${acute.toFixed(1)} | HCO₃ kronik: ~${chronic.toFixed(1)}\nHCO₃ aktual: ${hco3}`;
    if (hco3 < acute-2) compText += ' → HCO₃ RENDAH: tambahan Asidosis Metabolik!';
    else if (hco3 > chronic+2) compText += ' → HCO₃ TINGGI: tambahan Alkalosis Metabolik!';
  } else if (disorder.includes('Alkalosis Respiratorik')) {
    const acute = 24 - 2*(40-pCO2)/10;
    const chronic = 24 - 5*(40-pCO2)/10;
    compText = `HCO₃ akut diharapkan: ~${acute.toFixed(1)} | HCO₃ kronik: ~${chronic.toFixed(1)}\nHCO₃ aktual: ${hco3}`;
  }

  document.getElementById('ab_result').style.display = 'block';
  document.getElementById('ab_result_text').innerHTML =
    `<span style="color:${color};font-size:22px;font-weight:700">${disorder}</span><br>` +
    `pH: <b>${pH}</b> | PaCO₂: <b>${pCO2}</b> | HCO₃: <b>${hco3}</b><br>` +
    `${agStatus}<br>` +
    `${primary ? 'Primer: ' + primary : ''}`;
  document.getElementById('ab_compensation_text').innerHTML = compText.replace(/\n/g,'<br>') || 'Tidak tersedia untuk gangguan ini.';
}

// Keyboard shortcut
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.getElementById('loginScreen').style.display !== 'none') {
    doLogin();
  }
  if (e.key === 'Escape') {
    document.querySelectorAll('.tool-modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});
