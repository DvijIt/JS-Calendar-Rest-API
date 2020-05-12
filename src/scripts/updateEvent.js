import {
  getItem,
  modal,
  generateNumberRange
} from "./storage.js";

export let index = null
export const updateEvent = (e) => {
  const events = getItem('events') || [];
  if (e.target.closest('.event') !== null) {
    index = e.target.closest('.event').getAttribute('data-index');
  } else {
    return false
  }
  let event = events[index]
  const eventTitle = document.querySelector('input[name="nameEvent"]');
  const eventDescription = document.querySelector(
    'textarea[name="eventDescription"]'
  );

  const datePicker = document.querySelector('input[name="datepicker"]');
  const inputTimeFrom = document.querySelector('button[data-target="dateFrom"]');
  const inputTimeTo = document.querySelector('button[data-target="dateTo"]');
  const dropDateFrom = document.querySelector("#dateFrom");
  const dropDateTo = document.querySelector("#dateTo");


  eventTitle.value = event.title
  eventDescription.value = event.description
  datePicker.value = event.eventDate;
  inputTimeFrom.innerText = event.eventTimeFrom;
  inputTimeTo.innerText = event.eventTimeTo;
  datePicker.M_Datepicker.date = new Date(event.year, event.month, event.day)

  const getTimeFrom = event.eventTimeFrom
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
  dropDateFrom.innerHTML = getRangeTimeFrom;
  dropDateTo.innerHTML = getRangeTimeDayTo;
  dropDateFrom.addEventListener("click", selectTimeFrom);
  dropDateTo.addEventListener("click", selectTimeTo);

  modal.open()
}