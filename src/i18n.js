
window.AurielleI18n = (function () {
  let dict = null;
  let current = 'en';

  async function loadTranslations() {
    const res = await fetch('data/translations.json');
    const all = await res.json();
    return all;
  }

  function setDirAndLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  function applyText(root = document, langDict = {}) {
    // data-i18n (text content)
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (langDict[key]) el.textContent = langDict[key];
    });
    // data-i18n-attr="placeholder:key,aria-label:key"
    root.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const map = el.getAttribute('data-i18n-attr').split(',').map(s => s.trim());
      map.forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (langDict[key]) el.setAttribute(attr, langDict[key]);
      });
    });
    // Title element support
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      const key = titleEl.getAttribute('data-i18n');
      if (langDict[key]) titleEl.textContent = langDict[key];
    }
    // Values list on About
    const vals = root.querySelector('#valuesList');
    if (vals && Array.isArray(langDict.values_list)) {
      vals.innerHTML = langDict.values_list.map(v => `<li>${v}</li>`).join('');
    }
  }

  async function setLanguage(lang) {
    const all = dict || await loadTranslations();
    dict = all;
    current = lang;
    localStorage.setItem('lang', lang);
    const langDict = all[lang] || all.en;
    setDirAndLang(lang);
    applyText(document, langDict);
    // Toggle UI for language dropdown label
    document.querySelector('#langToggle span')?.replaceChildren(document.createTextNode(lang === 'en' ? 'العربية' : 'English'));
    // Dispatch language change event
    document.dispatchEvent(new CustomEvent('aurielle:languageChanged', { detail: { lang } }));
    // Apply font classes via dir (handled in CSS base layer)
  }

  function getLanguage() {
    return localStorage.getItem('lang') || 'en';
  }

  async function init() {
    const lang = getLanguage();
    await setLanguage(lang);
    // Header dropdown
    const toggle = document.getElementById('langToggle');
    const menu = document.getElementById('langMenu');
    toggle?.addEventListener('click', () => {
      const open = menu?.classList.contains('hidden');
      menu?.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!!open));
    });
    menu?.querySelectorAll('[data-lang]')?.forEach(btn => {
      btn.addEventListener('click', async () => {
        await setLanguage(btn.getAttribute('data-lang'));
        menu.classList.add('hidden');
      });
    });
    // Mobile quick set
    document.querySelectorAll('[data-set-lang]').forEach(b => {
      b.addEventListener('click', async () => {
        await setLanguage(b.getAttribute('data-set-lang'));
        document.getElementById('mobileMenu')?.classList.add('hidden');
      });
    });
  }

  return { init, setLanguage, getLanguage, applyText };
})();

document.addEventListener('DOMContentLoaded', () => {
  AurielleI18n.init();
});
