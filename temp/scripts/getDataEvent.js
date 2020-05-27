"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataEvent = void 0;

var _storage = require("./storage.js");

var dropDateFrom = document.querySelector("#dateFrom");
var dropDateTo = document.querySelector("#dateTo");
var datePicker = document.querySelector('input[name="datepicker"]');
var inputTimeFrom = document.querySelector('button[data-target="dateFrom"]');
var inputTimeTo = document.querySelector('button[data-target="dateTo"]');
var popupForm = document.querySelector('.modal'); // Формирование формы попапа исходя из данных!
//  generete MaxTimeEnd array

var generateDateTimeRange = function generateDateTimeRange(from, to) {
  var arr = [];
  var todayWithoutHour = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();

  for (var i = from; i <= to; i++) {
    var hours = new Date(todayWithoutHour).getHours();
    var minutes = new Date(todayWithoutHour).getMinutes();
    if (hours < 10) hours = "0".concat(hours);
    if (minutes < 1) minutes = "".concat(minutes, "0");
    arr.push("".concat(hours, ":").concat(minutes));
    todayWithoutHour += 60000 * 15;
  }

  return arr;
};

var getDropInputElemData = function getDropInputElemData(getTimeFrom) {
  var getRangeTimeDay = generateDateTimeRange(0, 96);
  var getRangeTimeDayTo = (0, _storage.generateNumberRange)(1, 24).map(function (el) {
    return "<li>".concat(getRangeTimeDay[getRangeTimeDay.indexOf(getTimeFrom) + el], "</li>");
  }).filter(function (el) {
    return !el.includes("undefined");
  }).join("");
  var getRangeTimeFrom = (0, _storage.generateNumberRange)(0, 96).map(function (el) {
    return "<li class=\"date-form-item\">".concat(getRangeTimeDay[el], "</li>");
  }).join("");
  dropDateFrom.innerHTML = getRangeTimeFrom;
  dropDateTo.innerHTML = getRangeTimeDayTo;
};

var getDataEvent = function getDataEvent(data) {
  var getDay = data.getDay,
      getMonth = data.getMonth,
      getYear = data.getYear,
      getTimeFrom = data.getTimeFrom,
      getTimeTo = data.getTimeTo;
  var nowMonth = _storage.month[getMonth];
  var date = "".concat(getDay, " ").concat(nowMonth, " ").concat(getYear);
  datePicker.M_Datepicker.date = new Date(getYear, getMonth, getDay);
  datePicker.value = date;
  inputTimeFrom.innerText = getTimeFrom;
  inputTimeTo.innerText = getTimeTo;
  getDropInputElemData(getTimeFrom);

  _storage.modal.open();
};

exports.getDataEvent = getDataEvent;

function gegereneArrayTimeTo(currentTime) {
  var getRangeTimeDayTo = [];
  var getRangeTimeDay = generateDateTimeRange(0, 96);

  for (var i = 1; i < getRangeTimeDay.length; i++) {
    if (getRangeTimeDay[getRangeTimeDay.indexOf(currentTime) + i] !== undefined) {
      getRangeTimeDayTo.push(getRangeTimeDay[getRangeTimeDay.indexOf(currentTime) + i]);
    }
  }

  return getRangeTimeDayTo;
}

function selectTimeFrom(e) {
  var currentTarget = e.target;
  var currentTime = currentTarget.innerHTML;
  var timeTo = e.target.nextElementSibling.innerHTML;
  inputTimeFrom.textContent = currentTime;
  var getRangeTimeDayTo = gegereneArrayTimeTo(currentTime).map(function (el) {
    return "\n      <li>".concat(el, "</li>\n    ");
  }).join('');
  inputTimeTo.innerHTML = gegereneArrayTimeTo(currentTime)[0];
  dropDateTo.innerHTML = getRangeTimeDayTo;
}

function selectTimeTo(e) {
  var currentTarget = e.target;
  var currentTime = currentTarget.innerHTML;
  inputTimeTo.textContent = currentTime;
}

;

var selectTime = function selectTime(e) {
  var $target = e.target;

  if ($target.closest('[data-target="from"]')) {
    selectTimeFrom(e);
    return;
  }

  if ($target.closest('[data-target="to"]')) {
    selectTimeTo(e);
    return;
  }
};

popupForm.addEventListener('click', selectTime);