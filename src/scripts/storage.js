export const generateNumberRange = (from, to) => {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
};

export const month = [
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

export const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

// render Week Days Number ПН-ВС
export const getRangeOfWeek = (date, from, to) => {
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

export const oneDay = 1000 * 60 * 60 * 24;

const getMonday = () => {
  // милисекунд сейчас
  let now = new Date().getTime();
  // милисекунд от вс до текущего дня недели
  let to = new Date().getDay() * oneDay;
  return new Date(now - to + oneDay);
};

export let monday = getMonday();

let elem = document.querySelector(".event-modal");
let elems = document.querySelectorAll(".dropdown-trigger");
let elemPicker = document.querySelector(".datepicker");

export let modal = M.Modal.init(elem);
export let dropdown = M.Dropdown.init(elems);
export let datePicker = M.Datepicker.init(elemPicker, {
  format: "dd mmm yyyy"
});
export let events = [
  {
    day: 25,
    description: "description",
    eventDate: "25 Март 2020",
    eventTimeFrom: "11:00",
    eventTimeTo: "12:00",
    id: 1585129476672,
    month: 2,
    title: "Title",
    year: 2020,
    timeLengthInMinutes: 60
  },
  {
    day: 15,
    description: "description",
    eventDate: "15 Апрель 2020",
    eventTimeFrom: "11:00",
    eventTimeTo: "12:00",
    id: 1585129618022,
    month: 3,
    title: "Title",
    year: 2020,
    timeLengthInMinutes: 60
  },
  {
    day: 26,
    description: "description",
    eventDate: "26 Март 2020",
    eventTimeFrom: "11:00",
    eventTimeTo: "12:00",
    id: 1585129668567,
    month: 2,
    title: "Title",
    year: 2020,
    timeLengthInMinutes: 60
  },
  {
    day: 23,
    description: "description",
    eventDate: "23 Март 2020",
    eventTimeFrom: "11:00",
    eventTimeTo: "12:00",
    id: 1585129663012,
    month: 2,
    title: "Title",
    year: 2020,
    timeLengthInMinutes: 60
  },
  {
    day: 25,
    description: "",
    eventDate: "25 Март 2020",
    eventTimeFrom: "00:00",
    eventTimeTo: "06:00",
    id: 1585137987764,
    month: 2,
    timeLengthInMinutes: 360,
    title: "Заголовок",
    year: 2020
  }
];
// export {generateNumberRange, month, weekDays, getRangeOfWeek, monday, oneDay};
