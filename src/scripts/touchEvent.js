import { month, modal, generateNumberRange } from "./storage.js";

import {updateEvent} from './updateEvent.js'

const calendarSector = document.querySelector('.calendar__sector');
const btnSaveEvent = document.querySelector(".save__event");
const btnRemoveEvent = document.querySelector(".btn-delete-event");
const touchEvent = e => {

  const touch = () => {
  const dropDateFrom = document.querySelector("#dateFrom");
  const dropDateTo = document.querySelector("#dateTo");
  const datePicker = document.querySelector('input[name="datepicker"]');
  const inputTimeFrom = document.querySelector('button[data-target="dateFrom"]');
  const inputTimeTo = document.querySelector('button[data-target="dateTo"]');

  const getDay = e.target.parentNode.getAttribute('data-set-day')
  const getMonth = e.target.parentNode.getAttribute('data-set-month')
  const getYear = e.target.parentNode.getAttribute('data-set-year')
  const getTimeFrom = e.target.getAttribute('data-set-hour')
  let getTimeTo = e.target.nextElementSibling.getAttribute('data-set-hour')
  
  const nowMonth = month[getMonth]
  datePicker.M_Datepicker.date = new Date(getYear, getMonth, getDay);
  let date = `${getDay} ${nowMonth} ${getYear}`;


  //  generete MaxTimeEnd array
  const generateDateTimeRange = (array, from, to) => {
    let todayWithoutHour = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).getTime();
    for (let i = from; i <= to; i++) {
      let hours = new Date(todayWithoutHour).getHours();
      let minutes = new Date(todayWithoutHour).getMinutes();
      if (hours < 10) hours = `0${hours}`;
      if (minutes < 1) minutes = `${minutes}0`;
      array.push(`${hours}:${minutes}`);
      todayWithoutHour += 60000 * 15;
    }
  };

  const getRangeTimeDay = [];

  generateDateTimeRange(getRangeTimeDay, 0, 96);

  const getRangeTimeDayTo = generateNumberRange(1, 24)
    .map(
      el => `<li>${getRangeTimeDay[getRangeTimeDay.indexOf(getTimeFrom) + el]}</li>`
    )
    .filter(el => !el.includes("undefined"))
    .join("");

  const getRangeTimeFrom = generateNumberRange(0, 97)
    .map(el => `<li class="date-form-item">${getRangeTimeDay[el]}</li>`)
    .join("");

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
  
  dropDateFrom.addEventListener("click", selectTimeFrom);
  dropDateTo.addEventListener("click", selectTimeTo);
  datePicker.value = date;
  inputTimeFrom.innerText = getTimeFrom;
  inputTimeTo.innerText = getTimeTo;
  dropDateFrom.innerHTML = getRangeTimeFrom;
  dropDateTo.innerHTML = getRangeTimeDayTo;
  modal.open();
  }

  if (e.target.classList.contains('calendar__sector-line')) {
    btnRemoveEvent.classList.add('d-none')
    btnSaveEvent.classList.remove('editBtn');
    // console.log('touchCreate')
    touch()
  }
  else {
    // console.log('edit')
    updateEvent(e)
    btnRemoveEvent.classList.remove('d-none')
    btnSaveEvent.classList.add('editBtn');
  }

}
calendarSector.addEventListener('click', touchEvent)

