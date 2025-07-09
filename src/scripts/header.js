// Header language‑switcher + nav helper
(function () {
  const langSelect = document.getElementById('language-select');
  if (!langSelect) return;

  const strings = {
    en: { home: 'Home',  about: 'About',        contact: 'Contact',  event: 'Event' },
    nl: { home: 'Home',  about: 'Over',         contact: 'Contact',  event: 'Evenement' },
    it: { home: 'Home',  about: 'Chi siamo',    contact: 'Contatto', event: 'Evento' }
  };

  function translateNav(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
      const k = el.dataset.key;
      if (strings[lang] && strings[lang][k]) {
        el.textContent = strings[lang][k];
      }
    });
  }

  // Determine language: URL ?lang= overrides, else localStorage, else browser, else 'en'
  const url = new URL(window.location.href);
  let lang = url.searchParams.get('lang')
           || localStorage.getItem('site-lang')
           || (navigator.language || 'en').slice(0, 2)
           || 'en';
  if (!strings[lang]) lang = 'en';

  // Set selector, apply translations, and update nav links
  langSelect.value = lang;
  translateNav(lang);

  document.querySelectorAll('nav.main-nav a').forEach(link => {
    const linkUrl = new URL(link.getAttribute('href'), window.location.origin);
    linkUrl.searchParams.set('lang', lang);
    link.setAttribute('href', linkUrl.pathname + linkUrl.search);
  });

  // On change: persist choice and reload current page with ?lang=
  langSelect.addEventListener('change', e => {
    const newLang = e.target.value;
    localStorage.setItem('site-lang', newLang);
    url.searchParams.set('lang', newLang);
    window.location.href = url.pathname + '?' + url.searchParams.toString();
  });
})();