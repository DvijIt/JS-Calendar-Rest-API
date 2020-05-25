import { generateNumberRange, month, weekDays, getRangeOfWeek } from "./storage.js";
import { renderEvents } from './renderEvents.js'
import { getEventsList } from "./eventsGateway.js";

const dateMonth = document.querySelector(".date__month");
const dayFullTime = document.querySelector(".time-of-day");
const timezone = document.querySelector(".calendar__timezone");
const sectorDays = document.querySelector(".calendar__sector");



// милисекунд в дне
const oneDay = 1000 * 60 * 60 * 24;

const getMonday = () => {
  // милисекунд сейчас
  let now = new Date().getTime();
  // милисекунд от вс до текущего дня недели
  let to = new Date().getDay() * oneDay;

  if (new Date().getDay() !== 0) return new Date(now - to + oneDay);
  
  return new Date(now - oneDay * 6)
};

export let monday = getMonday();

let next = 0;
export let nextMonday = new Date(monday.getTime() + oneDay * next);

// render Week: show name days of week (ПН-ВС)
const renderWeek = () => {
  const weekDaysList = document.querySelector(".week__days");
  const daysRange = generateNumberRange(0, 6)
    .map(el => `<li>${weekDays[el]}</li>`).join("");
  weekDaysList.innerHTML = daysRange;
};

const todayDay = () => {
  const arrDays = [...document.querySelectorAll(".week-day")];
  arrDays.forEach(el => {
    if (
      el.dataset.weekDay == new Date().getDate() &&
      el.dataset.weekMonth == new Date().getMonth() &&
      el.dataset.weekYear == new Date().getFullYear()
    ) {
      el.firstElementChild.classList.add("day-today");
      el.classList.add("get-today");
      el.innerHTML = `<span class="day-today">${new Date().getDate()}</span>`;
    }
  });
};

// render Week: show day number of month for shown week
const renderWeekDays = () => {
  const sectorWeekDays = document.querySelector(".week__days-number");
  const sectorWeek = getRangeOfWeek(nextMonday, 0, 6)
    .map(day =>
      `<li class="week-day" data-week-year="${day.year}" data-week-month="${day.month}" data-week-day="${day.day}"><span>${day.day}</span></li>`
    )
    .join("");

  sectorWeekDays.innerHTML = sectorWeek;
  todayDay();
};

// show month from week shown
const getMonthContent = () => {
  const arrDays = [...document.querySelectorAll(".week-day")];
  const arrMonth = [];

  arrDays.forEach(el => {
    arrMonth.push({
      month: el.dataset.weekMonth,
      year: el.dataset.weekYear
    });
  });
  const newArr = [{
      month: arrMonth[0].month,
      year: arrMonth[0].year
    },
    {
      month: arrMonth[arrMonth.length - 1].month,
      year: arrMonth[arrMonth.length - 1].year
    }
  ];
  const starMonth = newArr[0].month;
  const startYear = newArr[0].year;
  const endMonth = newArr[1].month;
  const endYear = newArr[1].year;

  let correctDate = `${month[starMonth]} ${startYear} - ${month[endMonth]} ${endYear}`;

  if (starMonth === endMonth && startYear === endYear) {
    correctDate = `${month[starMonth]} ${startYear}`;
  } else if (startYear === endYear) {
    correctDate = `${month[starMonth]} - ${month[endMonth]} ${startYear}`;
  }

  dateMonth.textContent = correctDate;
};

// render TimeLine
const renderTimeLine = () => {
  timezone.textContent = new Date()
    .toString()
    .split(" ")[5]
    .slice(0, 6);
  const hourTimeOfDay = generateNumberRange(0, 23)
    .map(el => {
      if (el < 10) el = `0${el}`;
      return `
          <li class="hour-of-time" data-sector-time="${el}" data-time="${el}:00">${el}:00</li>
        `;
    })
    .join("");

  dayFullTime.innerHTML = hourTimeOfDay;
};

// render Calendar Sector days and hours
const renderCalendarSector = () => {
  const time = [...document.querySelectorAll('.hour-of-time')].map(el => el.getAttribute('data-time'));

  const renderDayTime = () =>
    generateNumberRange(0, 23)
    .map(
      line =>
      `<div class="calendar__sector-line" data-type="sell" data-sector-line="${line}" data-set-hour="${time[line]}"></div>`
    )
    .join("");
  // !!!!!!!!!!!!!!!!!!
  const sectorColumn = getRangeOfWeek(nextMonday, 0, 6)
    .map(
      column =>
      `<div class="calendar__sector-column" data-type="column" data-set-year="${column.year}"year data-set-month="${column.month}" data-set-day="${column.day}">${renderDayTime()}</div>`
    )
    .join("");

  sectorDays.innerHTML = sectorColumn;
  let currentColumnDay = null
  if (document.querySelector(`.calendar__sector-column[data-set-year="${new Date().getFullYear()}"][data-set-month="${new Date().getMonth()}"][data-set-day="${new Date().getDate()}"]`)) {
    currentColumnDay = document.querySelector(`.calendar__sector-column[data-set-year="${new Date().getFullYear()}"][data-set-month="${new Date().getMonth()}"][data-set-day="${new Date().getDate()}"]`)
    let divLine = document.createElement('div')
    divLine.classList.add('line-today')
    currentColumnDay.appendChild(divLine)
  }
  let count = new Date().getHours() * 60 + new Date().getMinutes();

  const todayDayEl = document.querySelector(".line-today");
  const showCurrentTime = () => {
    todayDayEl.style.top = `${count}px`;
    const countMinutesOfDay = () => {
      setInterval(() => {
        todayDayEl.style.top = `${count}px`;
        count += 1
      }, 60000);
    };
    countMinutesOfDay();
  };
  if (todayDayEl) {
    showCurrentTime();
  }
};

export const renderEventsElem = async () => {
  const eventsList = await getEventsList();
  renderEvents(eventsList)
}

export const renderDinamicPart = () => {
  renderWeekDays();
  getMonthContent();
  renderCalendarSector();
  renderEventsElem()
}

const btnToday = document.querySelector(".getToday");
const prevWeek = document.querySelector(".arrow-prev");
const nextWeek = document.querySelector(".arrow-next");


// show Current Week
const getToday = () => {
  next = 0;
  nextMonday = new Date(monday.getTime() + oneDay * next);
  renderDinamicPart()
};
// show Prev Week
const pullPrev = () => {
  next -= 7;
  nextMonday = new Date(monday.getTime() + oneDay * next);
  renderDinamicPart()
};
// show Next Week
const pullNext = () => {
  next += 7;
  nextMonday = new Date(monday.getTime() + oneDay * next);
  renderDinamicPart()
};

btnToday.addEventListener("click", getToday);
prevWeek.addEventListener("click", pullPrev);
nextWeek.addEventListener("click", pullNext);

export const renderCalendar = () => {
  renderTimeLine();
  renderWeek();
  renderDinamicPart()
}