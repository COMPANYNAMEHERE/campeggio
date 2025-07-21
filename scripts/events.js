

/* =========================================
   Events page – multi‑language support
   Works with the global language selector
   used in header.js (value stored in
   localStorage key "site-lang" and a custom
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

/* ---------------- Google Calendar config ---------------- */
const GOOGLE_CALENDAR_API_KEY = 'REPLACE_WITH_YOUR_KEY';
const CALENDAR_ID            = 'REPLACE_WITH_YOUR_CALENDAR_ID';

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
  const pathMatch = window.location.pathname.match(/^\/(en|nl|it)(?=\/|$)/);
  const lang = (pathMatch && pathMatch[1]) || localStorage.getItem('site-lang') || 'en';
  translateEvents(lang);

  /* Build the FullCalendar instance if the library is present */
  const calendarEl = document.getElementById('calendar');
  if (calendarEl && window.FullCalendar) {
    const localeMap = { en: 'en', nl: 'nl', it: 'it' };
    window.calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [
        dayGridPlugin,
        interactionPlugin,
        (typeof googleCalendarPlugin !== 'undefined' ? googleCalendarPlugin : null)
      ].filter(Boolean),
      locale: localeMap[lang] || 'en',
      initialView: 'dayGridMonth',
      height: 'auto',
      headerToolbar: {
        start: 'title',
        center: '',
        end: 'prev,next today'
      },
      eventSources: [{
        googleCalendarId: CALENDAR_ID,
        apiKey: GOOGLE_CALENDAR_API_KEY
      }],
      eventClick: function (info) {
        info.jsEvent.preventDefault();
        showEventModal(info.event);
      }
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
      localStorage.setItem('site-lang', lang);

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
/* ---------------- Modal helper ---------------- */
function showEventModal(ev) {
  let overlay = document.getElementById('event-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'event-modal-overlay';
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="modal-content">
      <h2>${ev.title}</h2>
      <p><strong>Start:</strong> ${ev.start.toLocaleString('nl-NL')}</p>
      ${ev.end ? `<p><strong>Eind:</strong> ${ev.end.toLocaleString('nl-NL')}</p>` : ''}
      ${ev.extendedProps.location ? `<p><strong>Locatie:</strong> ${ev.extendedProps.location}</p>` : ''}
      ${ev.extendedProps.description ? `<p>${ev.extendedProps.description}</p>` : ''}
      <button class="close-button">Sluiten</button>
    </div>
  `;

  overlay.querySelector('.close-button').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

})();
