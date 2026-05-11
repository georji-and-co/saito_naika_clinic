/* ===========================
   さいとう内科クリニック | common.js
   =========================== */

// ===== 診療ステータス判定 =====
function getClinicStatus() {
  const now = new Date();
  const day = now.getDay(); // 0=日,1=月,2=火,3=水,4=木,5=金,6=土
  const t   = now.getHours() * 60 + now.getMinutes();

  const AM_S = 9  * 60;        //  9:00
  const AM_E = 12 * 60 + 30;  // 12:30
  const PM_S = 15 * 60;        // 15:00
  const PM_E = 17 * 60 + 30;  // 17:30

  // 水・日 → 終日休診
  if (day === 0 || day === 3) {
    return { open: false, lunch: false, label: '本日休診' };
  }

  // 土 → 午前のみ
  if (day === 6) {
    if (t >= AM_S && t < AM_E) return { open: true,  lunch: false, label: '診療中（午前）' };
    if (t < AM_S)              return { open: false, lunch: false, label: '本日の受付は 8:50〜' };
    return { open: false, lunch: false, label: '受付終了（土は午前のみ）' };
  }

  // 月火木金
  if (t < AM_S)              return { open: false, lunch: false, label: '本日の受付は 8:50〜' };
  if (t >= AM_S && t < AM_E) return { open: true,  lunch: false, label: '診療中（午前）' };
  if (t >= AM_E && t < PM_S) return { open: false, lunch: true,  label: '昼休み（15:00〜再開）' };
  if (t >= PM_S && t < PM_E) return { open: true,  lunch: false, label: '診療中（午後）' };
  return { open: false, lunch: false, label: '受付終了' };
}

// ===== 昼休憩バーを挿入 =====
(function initStatusBar() {
  const status = getClinicStatus();

  if (status.lunch) {
    const bar = document.createElement('div');
    bar.className = 'lunch-bar';
    bar.innerHTML =
      '<span class="lunch-bar-icon">\uD83D\uDD50</span>' +
      '<p class="lunch-bar-text">' +
      '<strong>\u4F11\u8A3A\u4E2D</strong> \u3067\u3059 &nbsp;\uFF0F&nbsp; \u5348\u5F8C\u306E\u8A3A\u7642\u306F <strong>15:00\uFF5E</strong> \u518D\u958B\u3057\u307E\u3059' +
      '</p>' +
      '<span class="lunch-bar-badge">12:30\u301215:00</span>';
    // demo-banner の直後（body先頭）に挿入
    document.body.insertAdjacentElement('afterbegin', bar);

    requestAnimationFrame(function() {
      var h = bar.offsetHeight;
      document.documentElement.style.setProperty('--lunch-h', h + 'px');
    });
  }

  // .status-chip がある場合は更新
  document.querySelectorAll('.status-chip').forEach(function(el) {
    el.classList.add(status.open ? 'chip-open' : (status.lunch ? 'chip-lunch' : 'chip-closed'));
    el.textContent = status.label;
  });
})();

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var id = a.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    var root    = document.documentElement;
    var demoH   = parseFloat(getComputedStyle(root).getPropertyValue('--demo-h'))   || 0;
    var headerH = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 64;
    var lunchH  = parseFloat(getComputedStyle(root).getPropertyValue('--lunch-h'))  || 0;
    var top = el.getBoundingClientRect().top + window.scrollY - demoH - headerH - lunchH - 8;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});

// ===== STICKY CTA TEL =====
var telBtn = document.querySelector('.sticky-cta-tel');
if (telBtn) {
  telBtn.addEventListener('click', function() {
    window.location.href = 'tel:049-289-8787';
  });
}

// ===== STICKY CTA SCROLL TO SCHEDULE =====
var schedBtn = document.querySelector('.sticky-cta-sched');
if (schedBtn) {
  schedBtn.addEventListener('click', function() {
    var el = document.getElementById('schedule');
    if (!el) return;
    var root    = document.documentElement;
    var demoH   = parseFloat(getComputedStyle(root).getPropertyValue('--demo-h'))   || 0;
    var headerH = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 64;
    var lunchH  = parseFloat(getComputedStyle(root).getPropertyValue('--lunch-h'))  || 0;
    var top = el.getBoundingClientRect().top + window.scrollY - demoH - headerH - lunchH - 8;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
}
