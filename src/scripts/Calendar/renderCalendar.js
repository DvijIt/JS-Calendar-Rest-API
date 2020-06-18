import { generateNumberRange, getRangeOfWeek } from '../storage';
import { nextMonday } from '../Header/navigation';
import showCurrentTime from './showCurrentTime';

const sectorDays = document.querySelector('.calendar__sector');

function renderDaysSells() {
  const time = [...document.querySelectorAll('.hour-of-time')].map(el => el.dataset.time);
  const daysSells = generateNumberRange(0, 23)
    .map(
      line => `<div class="calendar__sector-line" data-type="sell" data-sector-line="${line}" data-set-hour="${time[line]}"></div>`,
    )
    .join('');
  return daysSells;
}

function renderColumns() {
  const sectorColumns = getRangeOfWeek(nextMonday, 0, 6)
    .map(
      column => `<div class="calendar__sector-column"
      data-type="column"
      data-set-year="${column.year}"
      data-set-month="${column.month}"
      data-set-day="${column.day}">${renderDaysSells()}</div>`,
    )
    .join('');
  return sectorColumns;
}

// eslint-disable-next-line func-names
export default function () {
  sectorDays.innerHTML = renderColumns();
  showCurrentTime();
}
