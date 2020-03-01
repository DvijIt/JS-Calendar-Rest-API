import { renderBlockWeek } from "./renderDaysWeek.js";

const generateNumberRange = (from, to) => {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
};
const sectorDays = document.querySelector(".calendar__sector");
const dayFullTime = document.querySelector(".time-of-day");
// render Carendar
const renderCalendalBlock = () => {
  // render TimeLine
  const renderTimeLine = () => {
    const hourTimeOfDay = generateNumberRange(1, 24)
      .map(el => {
        if (el < 10) el = `0${el}`;
        return `
          <li class="hour-of-time" data-sector-time="${el}" data-time="${el}:00">${el}:00</li>
        `;
      })
      .join("");

    dayFullTime.innerHTML = hourTimeOfDay;
  };

  const renderDayTime = () =>
    generateNumberRange(1, 24)
      .map(
        line =>
          `<div class="calendar__sector-line" data-sector-line="${line}"></div>`
      )
      .join("");

  // Calendar Sector

  const renderCalendarSector = () => {
    const sectorColumn = generateNumberRange(0, 6)
      .map(
        column =>
          `<div class="calendar__sector-column" data-sector-column="${column}">${renderDayTime()}</div>`
      )
      .join("");

    sectorDays.innerHTML = sectorColumn;
  };
  renderBlockWeek();
  renderTimeLine();
  renderCalendarSector();
};

export { renderCalendalBlock, generateNumberRange, sectorDays };
