// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--offset')) || 104;
    const top = el.getBoundingClientRect().top + window.scrollY - offset - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== STICKY CTA TEL =====
const telBtn = document.querySelector('.sticky-cta-tel');
if (telBtn) {
  telBtn.addEventListener('click', () => {
    window.location.href = 'tel:049-289-8787';
  });
}

// ===== STICKY CTA SCROLL TO SCHEDULE =====
const schedBtn = document.querySelector('.sticky-cta-sched');
if (schedBtn) {
  schedBtn.addEventListener('click', () => {
    const el = document.getElementById('schedule');
    if (!el) return;
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--offset')) || 104;
    const top = el.getBoundingClientRect().top + window.scrollY - offset - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}
