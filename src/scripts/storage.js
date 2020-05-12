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

  if (new Date().getDay() !== 0) return new Date(now - to + oneDay);
  
  return new Date(now - oneDay * 6)
};

export let monday = getMonday();

let eventModal = document.querySelector(".event-modal");

let elems = document.querySelectorAll(".dropdown-trigger");
let elemPicker = document.querySelector(".datepicker");
export let modal = M.Modal.init(eventModal);
export let dropdown = M.Dropdown.init(elems);
export let datePicker = M.Datepicker.init(elemPicker, {
  format: "dd mmm yyyy"
});
// export let events = [
//   {
//     day: 2,
//     description: "description",
//     eventDate: "2 Май 2020",
//     eventTimeFrom: "10:30",
//     eventTimeTo: "12:00",
//     timeFromMilisec: 1588400035252,
//     timeEndMilisec: 1588410000000,
//     id: 1585129476672,
//     month: 4,
//     title: "Title",
//     year: 2020,
//     timeLengthInMinutes: 90
//   },
//   {
//     day: 15,
//     description: "description",
//     eventDate: "15 Апрель 2020",
//     eventTimeFrom: "11:15",
//     eventTimeTo: "12:45",
//     id: 1585129618022,
//     month: 3,
//     title: "Title",
//     year: 2020,
//     timeLengthInMinutes: 90
//   },

// ];

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = key => JSON.parse(localStorage.getItem(key));


