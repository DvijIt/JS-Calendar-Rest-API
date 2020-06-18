import '../lib/materialize.js';

export const generateNumberRange = (from, to) => {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
};

export const month = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

// render Week Days Number ПН-ВС
export const getRangeOfWeek = (date, from, to) => {
  const day = new Date(date).getDate();
  const arrObj = [];
  for (let i = from; i <= to; i++) {
    arrObj.push({
      year: new Date(new Date(date).setDate(day + i)).getFullYear(),
      month: new Date(new Date(date).setDate(day + i)).getMonth(),
      day: new Date(new Date(date).setDate(day + i)).getDate(),
    });
  }
  return arrObj;
};

const eventModal = document.querySelector('.event-modal');

const elems = document.querySelectorAll('.dropdown-trigger');
const elemPicker = document.querySelector('.datepicker');
// eslint-disable
export const modal = M.Modal.init(eventModal);
export const dropdown = M.Dropdown.init(elems);
export const datePicker = M.Datepicker.init(elemPicker, {
  format: 'dd mmm yyyy',
});
