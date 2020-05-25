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

let eventModal = document.querySelector(".event-modal");

let elems = document.querySelectorAll(".dropdown-trigger");
let elemPicker = document.querySelector(".datepicker");
export let modal = M.Modal.init(eventModal);
export let dropdown = M.Dropdown.init(elems);
export let datePicker = M.Datepicker.init(elemPicker, {
  format: "dd mmm yyyy"
});
