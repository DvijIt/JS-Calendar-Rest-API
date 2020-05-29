import { month, modal, generateNumberRange } from './storage.js';

const dropDateFrom = document.querySelector('#dateFrom');
const dropDateTo = document.querySelector('#dateTo');

const datePicker = document.querySelector('input[name="datepicker"]');
const inputTimeFrom = document.querySelector('button[data-target="dateFrom"]');
const inputTimeTo = document.querySelector('button[data-target="dateTo"]');

const popupForm = document.querySelector('.modal');

// Формирование формы попапа исходя из данных!

//  generete MaxTimeEnd array
const generateDateTimeRange = (from, to) => {
  const arr = [];

  let todayWithoutHour = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  ).getTime();
  for (let i = from; i <= to; i++) {
    let hours = new Date(todayWithoutHour).getHours();
    let minutes = new Date(todayWithoutHour).getMinutes();
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 1) minutes = `${minutes}0`;
    arr.push(`${hours}:${minutes}`);
    todayWithoutHour += 60000 * 15;
  }
  return arr;
};

const getDropInputElemData = (getTimeFrom) => {
  const getRangeTimeDay = generateDateTimeRange(0, 96);

  const getRangeTimeDayTo = generateNumberRange(1, 24)
    .map(
      el => `<li>${getRangeTimeDay[getRangeTimeDay.indexOf(getTimeFrom) + el]}</li>`,
    )
    .filter(el => !el.includes('undefined'))
    .join('');

  const getRangeTimeFrom = generateNumberRange(0, 96)
    .map(el => `<li class="date-form-item">${getRangeTimeDay[el]}</li>`)
    .join('');

  dropDateFrom.innerHTML = getRangeTimeFrom;
  dropDateTo.innerHTML = getRangeTimeDayTo;
};

export const getDataEvent = data => {
  const {
    getDay, getMonth, getYear, getTimeFrom, getTimeTo,
  } = data;
  const nowMonth = month[getMonth];
  const date = `${getDay} ${nowMonth} ${getYear}`;

  datePicker.M_Datepicker.date = new Date(getYear, getMonth, getDay);
  datePicker.value = date;
  inputTimeFrom.innerText = getTimeFrom;
  inputTimeTo.innerText = getTimeTo;

  getDropInputElemData(getTimeFrom);
  modal.open();
};

function gegereneArrayTimeTo(currentTime) {
  const getRangeTimeDayTo = [];
  const getRangeTimeDay = generateDateTimeRange(0, 96);

  for (let i = 1; i < getRangeTimeDay.length; i++) {
    if (getRangeTimeDay[getRangeTimeDay.indexOf(currentTime) + i] !== undefined) {
      getRangeTimeDayTo.push(getRangeTimeDay[getRangeTimeDay.indexOf(currentTime) + i]);
    }
  }
  return getRangeTimeDayTo;
}

function selectTimeFrom(e) {
  const currentTarget = e.target;
  const currentTime = currentTarget.innerHTML;
  inputTimeFrom.textContent = currentTime;

  const getRangeTimeDayTo = gegereneArrayTimeTo(currentTime)
    .map(el => `
      <li>${el}</li>
    `)
    .join('');

  inputTimeTo.innerHTML = gegereneArrayTimeTo(currentTime)[0]; // eslint-disable-line prefer-destructuring
  dropDateTo.innerHTML = getRangeTimeDayTo;
}
function selectTimeTo(e) {
  const currentTarget = e.target;
  const currentTime = currentTarget.innerHTML;
  inputTimeTo.textContent = currentTime;
}
const selectTime = e => {
  const $target = e.target;

  if ($target.closest('[data-target="from"]')) {
    selectTimeFrom(e);
    return;
  }

  if ($target.closest('[data-target="to"]')) {
    selectTimeTo(e);
  }
};

popupForm.addEventListener('click', selectTime);
