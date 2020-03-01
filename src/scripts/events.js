import { month } from "./renderDaysWeek.js";
import { generateNumberRange } from "./renderBloks.js";

let elem = document.querySelector(".event-modal");
let elem2 = document.querySelector(".event-modal-edit");
let elems = document.querySelectorAll(".dropdown-trigger");
let instance = M.Modal.init(elem);
let instance2 = M.Modal.init(elem2);
let instances = M.Dropdown.init(elems);


const sectorDays = document.querySelector(".calendar__sector");
let block = null;
let eventBlock = null;
const targetBlock = e => {
  block = e.target;
  const form = document.forms.eventForm;

  // Time
  const currentWeek = [...document.querySelectorAll(".week-day")];
  const column = e.target.closest('.calendar__sector-column').getAttribute("data-sector-column");
  const line = +e.target.getAttribute("data-sector-line");

  let timeFrom = `${line - 1}:00`;
  let timeTo = `${line}:00`;
  if (line <= 10) timeFrom = `0${line - 1}:00`;
  if (line < 10) timeTo = `0${line}:00`;
  if (timeFrom == "23:00") timeTo = "00:00";

  const minutesMisiceconds = 60 * 1000;

  // Date
  let day = currentWeek[column].getAttribute("data-week-day");
  let numberMonth = currentWeek[column].getAttribute("data-week-month");
  let monthCur = month[currentWeek[column].getAttribute("data-week-month")];
  let year = currentWeek[column].getAttribute("data-week-year");
  let targetDate = new Date(year, numberMonth, day).getTime();
  let dateFuture = new Date(targetDate).getTime();

  //  generete MaxTimeEnd array
  const generateDateTimeRange = (array, from, to) => {
    for (let i = from; i <= to; i++) {
      let hours = new Date(dateFuture).getHours();
      let minutes = new Date(dateFuture).getMinutes();
      if (hours < 10) hours = `0${hours}`;
      if (minutes < 1) minutes = `${minutes}0`;
      array.push(`${hours}:${minutes}`);
      dateFuture += minutesMisiceconds * 15;
    }
  };

  const getRangeTimeDay = [];

  generateDateTimeRange(getRangeTimeDay, 0, 96);

  const getRangeTimeDayTo = generateNumberRange(1, 24)
    .map(
      el => `
      <li>${getRangeTimeDay[getRangeTimeDay.indexOf(timeFrom) + el]}</li>
    `
    )
    .filter(el => !el.includes("undefined"))
    .join("");

  const sliceNameOfMonth = () => {
    if (
      monthCur == month[0] ||
      monthCur == month[7] ||
      monthCur == month[9] ||
      monthCur == month[11]
    ) {
      monthCur = monthCur.slice(0, 3);
    } else {
      monthCur = monthCur.slice(0, 4);
    }
  };
  sliceNameOfMonth();

  const elSelFrom = generateNumberRange(0, 96)
    .map(
      el => `
  <li class="date-form-item">${getRangeTimeDay[el]}</li>
  `
    )
    .join("");
  const dropDateFrom = document.querySelector("#dateFrom");
  dropDateFrom.innerHTML = elSelFrom;
  const dropDateTo = document.querySelector("#dateTo");
  dropDateTo.innerHTML = getRangeTimeDayTo;

  let inputPicker = form.datepicker;
  let inputTimeFrom = document.querySelector(".dateFrom");
  let inputTimeTo = document.querySelector(".dateTo");

  instance.open();

  const selectTimeFrom = e => {
    const timeFrom = e.target.innerHTML;
    const timeTo = e.target.nextElementSibling.innerHTML;
    inputTimeFrom.textContent = timeFrom;
    inputTimeTo.textContent = timeTo;
    const getRangeTimeDayTo = generateNumberRange(1, 24)
      .map(
        el => `
      <li>${getRangeTimeDay[getRangeTimeDay.indexOf(timeFrom) + el]}</li>
    `
      )
      .filter(el => !el.includes("undefined"))
      .join("");

    dropDateTo.innerHTML = getRangeTimeDayTo;
  };

  const selectTimeTo = e => {
    const timeTo = e.target.innerHTML;
    inputTimeTo.textContent = timeTo;
  };
  form.hiddenInput.setAttribute('data-day', day)
  form.hiddenInput.setAttribute('data-month', numberMonth)
  form.hiddenInput.setAttribute('data-year', year)
  dropDateFrom.addEventListener("click", selectTimeFrom);
  dropDateTo.addEventListener("click", selectTimeTo);
  eventBlock = e.target.closest('.event-block');
  if(eventBlock === null) {
    form.nameEvent.value = ''
    inputPicker.value = `${day} ${monthCur} ${year}`;
    inputTimeFrom.textContent = `${timeFrom}`;
    inputTimeTo.textContent = `${timeTo}`;
    form.description.value = '';
  } else {
    form.nameEvent.value = eventBlock.querySelector('h2').innerHTML;
    inputTimeTo.description = eventBlock.getAttribute('data-descr');
  }
  
  
};



sectorDays.addEventListener("click", targetBlock);



export { instance, instance2, block, eventBlock };
