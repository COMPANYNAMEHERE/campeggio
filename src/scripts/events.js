

/* =========================================
   Events page – multi‑language support
   Works with the global language selector
   used in header.js (value stored in
   localStorage key "lang" and a custom
   'languageChanged' event is dispatched).
   ========================================= */

/* 1. Translation strings for this page only */
const eventsTranslations = {
  en: {
    upcomingEvents: 'Upcoming Events'
  },
  nl: {
    upcomingEvents: 'Komende Evenementen'
  },
  it: {
    upcomingEvents: 'Prossimi Eventi'
  }
};

/* 2. Helper to translate static text + calendar */
function translateEvents(lang) {
  const t = eventsTranslations[lang] || eventsTranslations.en;

  /* Translate the page heading (make sure your
     <h1> element in events.html has:
       data-key="upcomingEvents" ) */
  const heading = document.querySelector('[data-key="upcomingEvents"]');
  if (heading) heading.textContent = t.upcomingEvents;

  /* Change FullCalendar locale if it exists */
  if (window.calendar) {
    const localeMap = { en: 'en', nl: 'nl', it: 'it' };
    window.calendar.setOption('locale', localeMap[lang] || 'en');
  }
}

/* 3. Initial translation + calendar build on DOM ready */
document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'en';
  translateEvents(lang);

  /* Build the FullCalendar instance if the library is present */
  const calendarEl = document.getElementById('calendar');
  if (calendarEl && window.FullCalendar) {
    const localeMap = { en: 'en', nl: 'nl', it: 'it' };
    window.calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid', 'interaction' ],
      locale: localeMap[lang] || 'en',
      initialView: 'dayGridMonth',
      height: 'auto',
      headerToolbar: {
        start: 'title',
        center: '',
        end: 'prev,next today'
      },
      /* TODO: replace with your real events feed */
      events: []
    });
    window.calendar.render();
  }
});

/* 4. React to language changes from header.js */
window.addEventListener('languageChanged', e => {
  if (e?.detail?.lang) translateEvents(e.detail.lang);
});

/* -----------------------------------------------------------
   Fallback language‑switcher binding (events page only)
   If header.js is already loaded it will handle things,
   but in case it isn’t (or loads later via include()),
   this code attaches a listener to the dropdown once it
   appears in the DOM and keeps nav links in sync.
----------------------------------------------------------- */
(function bindLanguageDropdown() {
  const observer = new MutationObserver(() => attach());
  observer.observe(document.body, { childList: true, subtree: true });

  function attach() {
    const select = document.querySelector('#language-select');
    if (!select || select.dataset.bound) return;

    select.dataset.bound = 'true';
    select.addEventListener('change', () => {
      const lang = select.value || 'en';
      localStorage.setItem('lang', lang);

      /* Translate this page immediately */
      translateEvents(lang);

      /* Update nav text if header.js not present */
      translateHeaderLinks(lang);

      /* Notify any other listeners */
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    });
  }

  /* Minimal nav‑link translation (labels only) */
  const headerStrings = {
    en: { home: 'Home', about: 'About', contact: 'Contact', events: 'Events' },
    nl: { home: 'Home', about: 'Over', contact: 'Contact', events: 'Evenementen' },
    it: { home: 'Home', about: 'Chi Siamo', contact: 'Contatto', events: 'Eventi' }
  };
  function translateHeaderLinks(lang) {
    const map = headerStrings[lang] || headerStrings.en;
    document.querySelectorAll('nav a[data-key]').forEach(a => {
      const key = a.dataset.key;
      if (map[key]) a.textContent = map[key];
    });
  }

  /* Initial attempt in case header is already there */
  attach();
})();