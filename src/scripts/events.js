document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('calendar');
  if (!container) return;

  let current = new Date();
  current.setDate(1);
  const today = new Date();

  function render() {
    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startIndex = (firstDay.getDay() + 6) % 7; // monday start

    let html = '<div class="calendar-header">';
    html += '<button class="nav-button" id="prev-month">\u2039</button>';
    html += `<div class="month-year">${firstDay.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</div>`;
    html += '<button class="nav-button" id="next-month">\u203A</button>';
    html += '</div>';

    html += '<table class="calendar-table"><thead><tr>';
    for (let i = 0; i < 7; i++) {
      const d = new Date(2021, 0, 4 + i); // Monday based labels
      html += `<th>${d.toLocaleDateString(undefined, { weekday: 'short' })}</th>`;
    }
    html += '</tr></thead><tbody>';

    let day = 1;
    const rows = Math.ceil((startIndex + daysInMonth) / 7);
    for (let r = 0; r < rows; r++) {
      html += '<tr>';
      for (let c = 0; c < 7; c++) {
        const cell = r * 7 + c;
        if (cell < startIndex || day > daysInMonth) {
          html += '<td></td>';
        } else {
          const cellDate = new Date(year, month, day);
          let classes = 'calendar-cell';
          if (cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            classes += ' past-day';
          }
          if (cellDate.getFullYear() === today.getFullYear() &&
              cellDate.getMonth() === today.getMonth() &&
              cellDate.getDate() === today.getDate()) {
            classes += ' today';
          }
          html += `<td class="${classes}"><span class="date-number">${day}</span></td>`;
          day++;
        }
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    container.innerHTML = html;

    document.getElementById('prev-month').addEventListener('click', () => {
      current.setMonth(current.getMonth() - 1);
      render();
    });
    document.getElementById('next-month').addEventListener('click', () => {
      current.setMonth(current.getMonth() + 1);
      render();
    });
  }

  render();
});
