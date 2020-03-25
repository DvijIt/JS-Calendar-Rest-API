import { modal, month, generateNumberRange, events } from "./storage.js";
const createEventBtn = document.querySelector(".create__event");

createEventBtn.addEventListener("click", function() {
  const datePicker = document.querySelector('input[name="datepicker"]');
  const inputTimeFrom = document.querySelector(
    'button[data-target="dateFrom"]'
  );
  const inputTimeTo = document.querySelector('button[data-target="dateTo"]');
  const dropDateFrom = document.querySelector("#dateFrom");
  const dropDateTo = document.querySelector("#dateTo");
  datePicker.M_Datepicker.date = new Date();
  let nowHour =
    new Date().getHours() < 10
      ? `0${new Date().getHours()}:00`
      : `${new Date().getHours()}:00`;
  let nowDay = new Date().getDate();
  let nowMonth = month[new Date().getMonth()];
  let nowYear = new Date().getFullYear();
  let date = `${nowDay} ${nowMonth} ${nowYear}`;
  let hourTo =
    new Date().getHours() < 10
      ? `0${new Date().getHours() + 1}:00`
      : `${new Date().getHours() + 1}:00`;
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
      el => `<li>${getRangeTimeDay[getRangeTimeDay.indexOf(nowHour) + el]}</li>`
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
  inputTimeFrom.innerText = nowHour;
  inputTimeTo.innerText = hourTo;
  dropDateFrom.innerHTML = getRangeTimeFrom;
  dropDateTo.innerHTML = getRangeTimeDayTo;

  modal.open();
});
