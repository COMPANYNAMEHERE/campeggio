document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('calendar');
  if (!container) return;
  const modal = document.getElementById('event-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.querySelector('.close-button');

  const langMatch = window.location.pathname.match(/\/(en|it|nl)(?=\/|$)/);
  const lang = langMatch ? langMatch[1] : 'en';

  const events = [
    {
      date: '2025-07-05',
      titles: {
        en: 'Summer Kickoff BBQ',
        it: 'Grigliata di Inizio Estate',
        nl: 'Zomer BBQ Opening'
      },
      descriptions: {
        en: 'Gather for grilled classics, live music and campfire stories.',
        it: 'Una serata con griglia, musica dal vivo e racconti intorno al fuoco.',
        nl: 'Geniet van gegrilde lekkernijen, live muziek en kampvuurverhalen.'
      }
    },
    {
      date: '2025-08-21',
      titles: {
        en: "Stargazer's Night",
        it: 'Notte delle Stelle',
        nl: 'Sterrenkijkavond'
      },
      descriptions: {
        en: 'Join our astronomy guide for a tour of the Sicilian skies.',
        it: 'Osserviamo il cielo siciliano con la nostra guida astronomica.',
        nl: 'Onze sterrenkundige gids laat je de Siciliaanse hemel ontdekken.'
      }
    },
    {
      date: '2025-10-12',
      titles: {
        en: 'Fall Harvest Festival',
        it: 'Festa del Raccolto',
        nl: 'Oogstfeest'
      },
      descriptions: {
        en: 'Celebrate the olive and grape harvest with local food and craft stalls.',
        it: 'Festeggiamo olive e uva con cibo locale e bancarelle artigiane.',
        nl: 'Vier de olijf- en druivenoogst met lokaal eten en kraampjes.'
      }
    }
  ];

  const listEl = document.getElementById('events-list');

  let current = new Date();
  current.setDate(1);
  const today = new Date();

  function openModal(info) {
    if (!modal) return;
    const d = new Date(info.date);
    modalTitle.textContent = info.title;
    modalDate.textContent = d.toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' });
    modalDesc.textContent = info.desc;
    modal.classList.remove('hidden');
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }
  if (modal) {
    modal.addEventListener('click', ev => {
      if (ev.target === modal) modal.classList.add('hidden');
    });
  }

  function render() {
    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startIndex = (firstDay.getDay() + 6) % 7; // monday start

    let html = '<div class="calendar-header">';
    html += '<button class="nav-button" id="prev-month">\u2039</button>';
    html += `<div class="month-year">${firstDay.toLocaleDateString(lang, { month: 'long', year: 'numeric' })}</div>`;
    html += '<button class="nav-button" id="next-month">\u203A</button>';
    html += '</div>';

    html += '<div class="calendar-grid">';
    for (let i = 0; i < 7; i++) {
      const d = new Date(2021, 0, 4 + i);
      html += `<div class="day-name">${d.toLocaleDateString(lang, { weekday: 'short' })}</div>`;
    }

    for (let i = 0; i < startIndex; i++) {
      html += '<div class="day-cell"></div>';
    }

    let day = 1;
    while (day <= daysInMonth) {
      const cellDate = new Date(year, month, day);
      let classes = 'day-cell';
      if (cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        classes += ' past-day';
      }
      if (
        cellDate.getFullYear() === today.getFullYear() &&
        cellDate.getMonth() === today.getMonth() &&
        cellDate.getDate() === today.getDate()
      ) {
        classes += ' today';
      }
      const iso = cellDate.toISOString().slice(0, 10);
      const dayEvents = events.filter(e => e.date === iso);
      let cellHtml = `<span class="date-number">${day}</span>`;
      dayEvents.forEach(e => {
        cellHtml += `<div class="event" data-date="${e.date}" data-title="${e.titles[lang]}" data-desc="${e.descriptions[lang]}">${e.titles[lang]}</div>`;
      });
      html += `<div class="${classes}">${cellHtml}</div>`;
      day++;
    }
    html += '</div>';
    container.innerHTML = html;

    container.querySelectorAll('.event').forEach(el => {
      el.addEventListener('click', () => {
        openModal({
          date: el.dataset.date,
          title: el.dataset.title,
          desc: el.dataset.desc
        });
      });
    });

    document.getElementById('prev-month').addEventListener('click', () => {
      current.setMonth(current.getMonth() - 1);
      render();
    });
    document.getElementById('next-month').addEventListener('click', () => {
      current.setMonth(current.getMonth() + 1);
      render();
    });
  }

  function renderList() {
    if (!listEl) return;
    const upcoming = events
      .filter(e => new Date(e.date) >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    let html = '';
    upcoming.forEach(e => {
      const d = new Date(e.date);
      const dateStr = d.toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' });
      html += `<article class="event-item" data-date="${e.date}" data-title="${e.titles[lang]}" data-desc="${e.descriptions[lang]}"><h2>${dateStr} – ${e.titles[lang]}</h2><p>${e.descriptions[lang]}</p></article>`;
    });
    listEl.innerHTML = html;
    listEl.querySelectorAll('.event-item').forEach(el => {
      el.addEventListener('click', () => {
        openModal({
          date: el.dataset.date,
          title: el.dataset.title,
          desc: el.dataset.desc
        });
      });
    });
  }

  render();
  renderList();
});
