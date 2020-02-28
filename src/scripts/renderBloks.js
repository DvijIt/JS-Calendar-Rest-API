const generateNumberRange = (from, to) => {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
};

const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
const oneDay = 1000 * 60 * 60 * 24;

const getMondey = () => {
  const from = new Date().getTime();
  const to = new Date().getDay() * oneDay;
  return new Date(from - to);
};

const mondey = getMondey();

// render Carendar
const renderCalendalBlock = () => {
  // render TimeLine
  const renderTimeLine = () => {
    for (let i = 0; i <= 24; i++) {
      const dayTime = document.createElement("li");
      dayTime.textContent = i < 10 ? `0${i}:00` : `${i}:00`;
      const dayFullTime = document.querySelector(".time-of-day");
      dayFullTime.append(dayTime);
    }
  };
  // render Week ПН-ВС
  const renderWeek = () => {
    const weekDaysList = document.querySelector(".week__days");
    const daysRange = generateNumberRange(1, 7)
      .map(
        el => `
    <li>${weekDays[el - 1]}</li>
  `
      )
      .join("");
    weekDaysList.innerHTML = daysRange;
  };
  // render Week Days Number ПН-ВС
  const getWeekRange = date => {
    const day = new Date(date).getDate();
    const arr = generateNumberRange(1, 7).map(el =>
      new Date(new Date(date).setDate(day + el)).getDate()
    );
    return arr;
  };

  const renderWeekDays = () => {
    const sectorWeekDays = document.querySelector(".week__days-number");
    const sectorWeek = getWeekRange(mondey)
      .map(
        day =>
          `<li class="week-day" data-week-day="${day}"><span>${day}</span></li>`
      )
      .join("");

    sectorWeekDays.innerHTML = sectorWeek;
  };

  const renderDayTime = () =>
    generateNumberRange(1, 24)
      .map(line => `<div class="sector-line" data-sector-line="${line}"></div>`)
      .join("");

  // Calendar Sector
  const renderCalendarSector = () => {
    const sectorDays = document.querySelector(".sector");
    const sectorColumn = generateNumberRange(1, 7)
      .map(
        column =>
          `<div class="sector-column" data-sector-column="${column}">${renderDayTime()}</div>`
      )
      .join("");

    sectorDays.innerHTML = sectorColumn;
  };

  renderWeekDays();
  renderTimeLine();
  renderWeek();
  renderCalendarSector();
  const todayDay = () => {
    const arrDays = [...document.querySelectorAll(".week-day span")];
    arrDays.forEach(el => {
      if (el.innerHTML == new Date().getDate()) {
        el.classList.add("day-today");
      }
    });
  };
  todayDay();
};

export { renderCalendalBlock};
