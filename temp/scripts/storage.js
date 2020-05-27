"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datePicker = exports.dropdown = exports.modal = exports.getRangeOfWeek = exports.weekDays = exports.month = exports.generateNumberRange = void 0;

var generateNumberRange = function generateNumberRange(from, to) {
  var result = [];

  for (var i = from; i <= to; i++) {
    result.push(i);
  }

  return result;
};

exports.generateNumberRange = generateNumberRange;
var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
exports.month = month;
var weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]; // render Week Days Number ПН-ВС

exports.weekDays = weekDays;

var getRangeOfWeek = function getRangeOfWeek(date, from, to) {
  var day = new Date(date).getDate();
  var arrObj = [];

  for (var i = from; i <= to; i++) {
    arrObj.push({
      year: new Date(new Date(date).setDate(day + i)).getFullYear(),
      month: new Date(new Date(date).setDate(day + i)).getMonth(),
      day: new Date(new Date(date).setDate(day + i)).getDate()
    });
  }

  return arrObj;
};

exports.getRangeOfWeek = getRangeOfWeek;
var eventModal = document.querySelector(".event-modal");
var elems = document.querySelectorAll(".dropdown-trigger");
var elemPicker = document.querySelector(".datepicker");
var modal = M.Modal.init(eventModal);
exports.modal = modal;
var dropdown = M.Dropdown.init(elems);
exports.dropdown = dropdown;
var datePicker = M.Datepicker.init(elemPicker, {
  format: "dd mmm yyyy"
});
exports.datePicker = datePicker;