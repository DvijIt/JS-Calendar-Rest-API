import { generateNumberRange } from "./renderBloks.js";

const timezone = document.querySelector(".calendar__timezone");
const month = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];

const dateMonth = document.querySelector(".date__month");
const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
const oneDay = 1000 * 60 * 60 * 24;
const monthNow = month[new Date().getMonth()];

const getMondey = () => {
  const from = new Date().getTime();
  const to = new Date().getDay() * oneDay;
  return new Date(from - to);
};
const mondey = getMondey();


timezone.textContent = new Date()
  .toString()
  .split(" ")[5]
  .slice(0, 6);

const renderBlockWeek = () => {
  let next = 0;
  let nextMondey = new Date(mondey.getTime() + oneDay * next);

  // render Week ПН-ВС
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

  // render Week Days Number ПН-ВС

  const getWeekRangeMonth = (date, from, to) => {
    const day = new Date(date).getDate();
    const arrObj = [];
    for (let i = from; i <= to; i++) {
      arrObj.push({
        year: new Date(new Date(date).setDate(day + i)).getFullYear(),
        month: new Date(new Date(date).setDate(day + i)).getMonth(),
        day: new Date(new Date(date).setDate(day + i)).getDate()
      });
    }
    return arrObj;
  };

  const renderWeekDays = () => {
    const sectorWeekDays = document.querySelector(".week__days-number");
    const sectorWeek = getWeekRangeMonth(nextMondey, 1, 7)
      .map(
        day =>
          `<li class="week-day" data-week-year="${day.year}"year data-week-month="${day.month}" data-week-day="${day.day}"><span>${day.day}</span></li>`
      )
      .join("");

    sectorWeekDays.innerHTML = sectorWeek;

    const todayDay = () => {
      const arrDays = [...document.querySelectorAll(".week-day")];
      arrDays.forEach(el => {
        if (
          el.getAttribute("data-week-day") == new Date().getDate() &&
          el.getAttribute("data-week-month") == new Date().getMonth() &&
          el.getAttribute("data-week-year") == new Date().getFullYear()
        ) {
          el.firstElementChild.classList.add("day-today");
        }
      });
    };
    todayDay();
  };

  renderWeek();
  renderWeekDays();

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
  getMonthContent();

  const getToday =() => {
    next = 0;
    nextMondey = new Date(mondey.getTime() + oneDay * next);

    renderWeekDays();
    getMonthContent();
  }
  const btnToday = document.querySelector('.getToday');
  const prevWeek = document.querySelector(".arrow-prev");
  const nextWeek = document.querySelector(".arrow-next");

  const pullPrev = () => {
    next -= 7;
    nextMondey = new Date(mondey.getTime() + oneDay * next);
    renderWeekDays();

    getMonthContent();
  };

  const pullNext = () => {
    next += 7;
    nextMondey = new Date(mondey.getTime() + oneDay * next);

    renderWeekDays();
    getMonthContent();
  };
  btnToday.addEventListener('click', getToday);
  prevWeek.addEventListener("click", pullPrev);
  nextWeek.addEventListener("click", pullNext);
};

export { renderBlockWeek, month };
