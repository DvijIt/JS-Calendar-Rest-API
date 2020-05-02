import { events, month, modal, generateNumberRange } from "./storage.js";
import { renderEvents } from "./renderEvents.js";

const calendarSector = document.querySelector('.calendar__sector');

const touchEvent = e => {
  const dropDateFrom = document.querySelector("#dateFrom");
  const dropDateTo = document.querySelector("#dateTo");
  const datePicker = document.querySelector('input[name="datepicker"]');
  const inputTimeFrom = document.querySelector('button[data-target="dateFrom"]');
  const inputTimeTo = document.querySelector('button[data-target="dateTo"]');

  const getDay = e.target.parentNode.getAttribute('data-set-day')
  const getMonth = e.target.parentNode.getAttribute('data-set-month')
  const getYear = e.target.parentNode.getAttribute('data-set-year')
  const getTimeFrom = e.target.getAttribute('data-set-hour')
  let getTimeTo = ''
  if (e.target.nextElementSibling !== null) getTimeTo = e.target.nextElementSibling.getAttribute('data-set-hour')
  
  const nowMonth = month[getMonth]
  datePicker.M_Datepicker.date = new Date(getYear, getMonth, getDay);
  let date = `${getDay} ${nowMonth} ${getYear}`;

  let todayWithoutHour = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).getTime();
  //  generete MaxTimeEnd array
  const generateDateTimeRange = (array, from, to) => {
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
calendarSector.addEventListener('click', touchEvent)

// const btnSaveEvent = document.querySelector(".save__event");

// const saveEvent = e => {
//   e.preventDefault();

//   const eventTitle = document.querySelector('input[name="nameEvent"]');
//   const eventDescription = document.querySelector('textarea[name="eventDescription"]');
//   const datePicker = document.querySelector('input[name="datepicker"]');
//   const inputTimeFrom = document.querySelector('button[data-target="dateFrom"]');
//   const inputTimeTo = document.querySelector('button[data-target="dateTo"]');
//   let data = datePicker.M_Datepicker.date;
//   const getYear = new Date(data).getFullYear();
//   const getDay = new Date(data).getDate();
//   const getMonth = month[new Date(data).getMonth()];
//   const getNumberMonth = new Date(data).getMonth();
//   let date = `${getDay} ${getMonth} ${getYear}`;
//   let timeLengthInMinutes = ((+inputTimeTo.innerText.substr(0, 2) - +inputTimeFrom.innerText.substr(0, 2)) * 60 ) + (+inputTimeFrom.innerText.substr(3) + +inputTimeTo.innerText.substr(3));
 
//   events.push({
//     id: new Date().getTime(),
//     title: eventTitle.value,
//     description: eventDescription.value,
//     eventDate: date,
//     day: getDay,
//     month: getNumberMonth,
//     year: getYear,
//     eventTimeFrom: inputTimeFrom.innerText,
//     eventTimeTo: inputTimeTo.innerText,
//     timeLengthInMinutes: timeLengthInMinutes
//   });
//   renderEvents();
//   modal.close();
// };

// btnSaveEvent.addEventListener("click", saveEvent);