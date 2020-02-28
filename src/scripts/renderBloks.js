import { renderBlockWeek, month } from "./renderDaysWeek.js";
import { instance } from "./events.js";
const generateNumberRange = (from, to) => {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
};
const sectorDays = document.querySelector(".calendar__sector");
// render Carendar
const renderCalendalBlock = () => {
  // render TimeLine
  const renderTimeLine = () => {
    const hourTimeOfDay = generateNumberRange(1, 23)
      .map(
        el => `
      <li>${el}:00</li>
    `
      )
      .join("");
    const dayFullTime = document.querySelector(".time-of-day");
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
    const sectorColumn = generateNumberRange(1, 7)
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

const targetBlock = e => {
  const form = document.forms.eventForm;
  const currentWeek = [...document.querySelectorAll(".week-day")];
  const column = e.target.parentNode.getAttribute("data-sector-column");
  const line = e.target.getAttribute("data-sector-line");
  let data = `column - ${column} line - ${line}`;

  let day = currentWeek[column].getAttribute("data-week-day");
  let monthCur = month[currentWeek[column].getAttribute("data-week-month")];
  let year = currentWeek[column].getAttribute("data-week-year");
  if (monthCur == month[0] || monthCur == month[9] || monthCur == month[11]) {
    monthCur = monthCur.slice(0, 3);
  } else {
    monthCur = monthCur.slice(0, 4);
  }
  instance.open();
  let myFormData = new FormData(form);
  let inputPicker = form.datepicker;
  inputPicker.value = `${day} ${monthCur} ${year}`;
  console.dir(day);
  console.log(inputPicker.value);
};

sectorDays.addEventListener("click", targetBlock);

export { renderCalendalBlock, generateNumberRange, sectorDays };
