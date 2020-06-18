import { generateNumberRange, getRangeOfWeek } from '../storage';
import { nextMonday } from './navigation';

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

function todayDay() {
  const arrDays = [...document.querySelectorAll('.week-day')];
  arrDays.forEach(el => {
    if (
      +el.dataset.weekDay === new Date().getDate()
      && +el.dataset.weekMonth === new Date().getMonth()
      && +el.dataset.weekYear === new Date().getFullYear()
    ) {
      el.firstElementChild.classList.add('day-today');
      el.classList.add('get-today');
      el.innerHTML = `<span class="day-today">${new Date().getDate()}</span>`;
    }
  });
}

// render Week: show name days of week (ПН-ВС)
const renderWeekDaysNames = () => {
  const weekDaysList = document.querySelector('.week__days');
  const daysRange = generateNumberRange(0, 6)
    .map(el => `<li>${weekDays[el]}</li>`).join('');
  weekDaysList.innerHTML = daysRange;
};

// render Week: show day number of month for shown week
const renderWeekDaysNumbers = () => {
  const sectorWeekDays = document.querySelector('.week__days-number');
  const sectorWeek = getRangeOfWeek(nextMonday, 0, 6)
    .map(day => `<li class="week-day" data-week-year="${day.year}" data-week-month="${day.month}" data-week-day="${day.day}"><span>${day.day}</span></li>`)
    .join('');

  sectorWeekDays.innerHTML = sectorWeek;
  todayDay();
};

// eslint-disable-next-line func-names
export default function () {
  renderWeekDaysNames();
  renderWeekDaysNumbers();
}
