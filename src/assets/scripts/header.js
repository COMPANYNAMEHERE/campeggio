// Header language‑switcher + nav helper
(function () {
  const langSelect = document.getElementById('language-select');
  if (!langSelect) return;
  langSelect.dataset.bound = 'true';

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

  // Determine language from the URL path (/en/, /it/, /nl/) or stored preference
  const pathMatch = window.location.pathname.match(/^\/(en|nl|it)(?=\/|$)/);
  let lang = pathMatch && pathMatch[1];
  lang = lang || localStorage.getItem('site-lang')
                || (navigator.language || 'en').slice(0, 2)
                || 'en';
  if (!strings[lang]) lang = 'en';

  // Set selector, apply translations, and update nav links
  langSelect.value = lang;
  translateNav(lang);

  document.querySelectorAll('nav.main-nav a').forEach(link => {
    const base = link.getAttribute('href');
    // prefix with /pages so links work after moving files
    link.setAttribute('href', `/pages/${lang}${base}`);
  });

  const logo = document.querySelector('a.logo-link');
  if (logo) logo.setAttribute('href', `/pages/${lang}/`);

  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

  // On change: persist choice and navigate to same page under the new language
  langSelect.addEventListener('change', e => {
    const newLang = e.target.value;
    localStorage.setItem('site-lang', newLang);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: newLang } }));
    const suffix = window.location.pathname.replace(/^\/pages\/(en|nl|it)/, '');
    window.location.href = `/pages/${newLang}${suffix}`;
  });
})();
