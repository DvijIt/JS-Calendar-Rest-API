import {
  generateNumberRange,
  month,
  weekDays,
  getRangeOfWeek,
  monday,
  oneDay
} from "./storage.js";
import {renderEvents} from './renderEvents.js'
const dateMonth = document.querySelector(".date__month");
const dayFullTime = document.querySelector(".time-of-day");
const timezone = document.querySelector(".calendar__timezone");
const sectorDays = document.querySelector(".calendar__sector");

const btnToday = document.querySelector(".getToday");
const prevWeek = document.querySelector(".arrow-prev");
const nextWeek = document.querySelector(".arrow-next");
let next = 0;
let nextMonday = new Date(monday.getTime() + oneDay * next);

// render Week: show name days of week (ПН-ВС)
const renderWeek = () => {
  const weekDaysList = document.querySelector(".week__days");
  const daysRange = generateNumberRange(0, 6)
    .map(
      el => `
  <li>${weekDays[el]}</li>
`
    )
    .join("");
  weekDaysList.innerHTML = daysRange;
};

// render Week: show day number of month for shown week
const renderWeekDays = () => {
  const sectorWeekDays = document.querySelector(".week__days-number");
  const sectorWeek = getRangeOfWeek(nextMonday, 0, 6)
    .map(
      day =>
        `<li class="week-day" data-week-year="${day.year}"year data-week-month="${day.month}" data-week-day="${day.day}"><span>${day.day}</span></li>`
    )
    .join("");

  sectorWeekDays.innerHTML = sectorWeek;
  let count = new Date().getHours() * 60 + 105 + new Date().getMinutes();
  const todayDay = () => {
    const arrDays = [...document.querySelectorAll(".week-day")];
    arrDays.forEach(el => {
      if (
        el.getAttribute("data-week-day") == new Date().getDate() &&
        el.getAttribute("data-week-month") == new Date().getMonth() &&
        el.getAttribute("data-week-year") == new Date().getFullYear()
      ) {
        el.firstElementChild.classList.add("day-today");
        el.classList.add("get-today");
        el.innerHTML = `<span class="day-today">${new Date().getDate()}</span><div class="line-today"></div>`;
      }
    });
  };
  todayDay();

  const todayDayEl = document.querySelector(".line-today");
  const showCurrentTime = () => {
    todayDayEl.style.top = `${count}px`;
    const countMinutesOfDay = () => {
      setInterval(() => {
        count += 1;
        todayDayEl.style.top = `${count}px`;
      }, 60000);
    };
    countMinutesOfDay();
  };
  if (todayDayEl) {
    showCurrentTime();
  }
};

// show month from week shown
const getMonthContent = () => {
  const arrDays = [...document.querySelectorAll(".week-day")];
  const arrMonth = [];

  arrDays.forEach(el => {
    arrMonth.push({
      month: el.getAttribute("data-week-month"),
      year: el.getAttribute("data-week-year")
    });
  });
  const newArr = [
    {
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

renderTimeLine();
const time = [...document.querySelectorAll('.hour-of-time')].map(el => el.getAttribute('data-time'));

// console.log(time)

// render Calendar Sector days and hours
const renderCalendarSector = () => {
  const renderDayTime = () =>
    generateNumberRange(0, 23)
      .map(
        line =>
          `<div class="calendar__sector-line" data-sector-line="${line}" data-set-hour="${time[line]}"></div>`
      )
      .join("");
      // !!!!!!!!!!!!!!!!!!
    const sectorColumn = getRangeOfWeek(nextMonday, 0, 6)
    .map(
      column =>
        `<div class="calendar__sector-column" data-set-year="${column.year}"year data-set-month="${column.month}" data-set-day="${column.day}">${renderDayTime()}</div>`
    )
    .join("");
    

  sectorDays.innerHTML = sectorColumn;
};

renderWeek();
renderWeekDays();
getMonthContent();
renderCalendarSector();
renderEvents();

// show Current Week
const getToday = () => {
  next = 0;
  nextMonday = new Date(monday.getTime() + oneDay * next);
  renderWeekDays();
  getMonthContent();
  renderCalendarSector();
  renderEvents();
};
// show Prev Week
const pullPrev = () => {
  next -= 7;
  nextMonday = new Date(monday.getTime() + oneDay * next);
  renderWeekDays();
  getMonthContent();
  renderCalendarSector();
  renderEvents();
};
// show Next Week
const pullNext = () => {
  next += 7;
  nextMonday = new Date(monday.getTime() + oneDay * next);

  renderWeekDays();
  getMonthContent();
  renderCalendarSector();
  renderEvents();
};

btnToday.addEventListener("click", getToday);
prevWeek.addEventListener("click", pullPrev);
nextWeek.addEventListener("click", pullNext);
