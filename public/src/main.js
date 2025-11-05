
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  btn?.addEventListener('click', () => {
    const open = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', String(open));
  });

  // Back to top
  document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Contact copy email
  const copyBtn = document.getElementById('copyEmail');
  copyBtn?.addEventListener('click', async () => {
    const email = copyBtn.dataset.email || 'press@aurielle.co';
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = (localStorage.getItem('lang') || 'en') === 'ar' ? 'تم النسخ' : 'Copied';
      setTimeout(() => {
        // Re-apply translations to restore original label
        fetch('/data/translations.json').then(r=>r.json()).then(all=>{
          const l = localStorage.getItem('lang') || 'en';
          copyBtn.textContent = all[l].copy_email;
        });
      }, 1800);
    } catch {}
  });

  // Subtle parallax in hero
  const hero = document.getElementById('heroParallax');
  if (hero) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.2;
      hero.style.transform = `translateY(${y}px)`;
    });
  }
});
