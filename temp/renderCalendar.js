"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCalendar = exports.renderDinamicPart = exports.renderEventsElem = exports.nextMonday = exports.monday = void 0;

require("regenerator-runtime/runtime");

var _storage = require("./storage.js");

var _renderEvents = require("./renderEvents.js");

var _eventsGateway = require("./eventsGateway.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var dateMonth = document.querySelector(".date__month");
var dayFullTime = document.querySelector(".time-of-day");
var timezone = document.querySelector(".calendar__timezone");
var sectorDays = document.querySelector(".calendar__sector"); // милисекунд в дне

var oneDay = 1000 * 60 * 60 * 24;

var getMonday = function getMonday() {
  // милисекунд сейчас
  var now = new Date().getTime(); // милисекунд от вс до текущего дня недели

  var to = new Date().getDay() * oneDay;
  if (new Date().getDay() !== 0) return new Date(now - to + oneDay);
  return new Date(now - oneDay * 6);
};

var monday = getMonday();
exports.monday = monday;
var next = 0;
var nextMonday = new Date(monday.getTime() + oneDay * next); // render Week: show name days of week (ПН-ВС)

exports.nextMonday = nextMonday;

var renderWeek = function renderWeek() {
  var weekDaysList = document.querySelector(".week__days");
  var daysRange = (0, _storage.generateNumberRange)(0, 6).map(function (el) {
    return "<li>".concat(_storage.weekDays[el], "</li>");
  }).join("");
  weekDaysList.innerHTML = daysRange;
};

var todayDay = function todayDay() {
  var arrDays = _toConsumableArray(document.querySelectorAll(".week-day"));

  arrDays.forEach(function (el) {
    if (el.dataset.weekDay == new Date().getDate() && el.dataset.weekMonth == new Date().getMonth() && el.dataset.weekYear == new Date().getFullYear()) {
      el.firstElementChild.classList.add("day-today");
      el.classList.add("get-today");
      el.innerHTML = "<span class=\"day-today\">".concat(new Date().getDate(), "</span>");
    }
  });
}; // render Week: show day number of month for shown week


var renderWeekDays = function renderWeekDays() {
  var sectorWeekDays = document.querySelector(".week__days-number");
  var sectorWeek = (0, _storage.getRangeOfWeek)(nextMonday, 0, 6).map(function (day) {
    return "<li class=\"week-day\" data-week-year=\"".concat(day.year, "\" data-week-month=\"").concat(day.month, "\" data-week-day=\"").concat(day.day, "\"><span>").concat(day.day, "</span></li>");
  }).join("");
  sectorWeekDays.innerHTML = sectorWeek;
  todayDay();
}; // show month from week shown


var getMonthContent = function getMonthContent() {
  var arrDays = _toConsumableArray(document.querySelectorAll(".week-day"));

  var arrMonth = [];
  arrDays.forEach(function (el) {
    arrMonth.push({
      month: el.dataset.weekMonth,
      year: el.dataset.weekYear
    });
  });
  var newArr = [{
    month: arrMonth[0].month,
    year: arrMonth[0].year
  }, {
    month: arrMonth[arrMonth.length - 1].month,
    year: arrMonth[arrMonth.length - 1].year
  }];
  var starMonth = newArr[0].month;
  var startYear = newArr[0].year;
  var endMonth = newArr[1].month;
  var endYear = newArr[1].year;
  var correctDate = "".concat(_storage.month[starMonth], " ").concat(startYear, " - ").concat(_storage.month[endMonth], " ").concat(endYear);

  if (starMonth === endMonth && startYear === endYear) {
    correctDate = "".concat(_storage.month[starMonth], " ").concat(startYear);
  } else if (startYear === endYear) {
    correctDate = "".concat(_storage.month[starMonth], " - ").concat(_storage.month[endMonth], " ").concat(startYear);
  }

  dateMonth.textContent = correctDate;
}; // render TimeLine


var renderTimeLine = function renderTimeLine() {
  timezone.textContent = new Date().toString().split(" ")[5].slice(0, 6);
  var hourTimeOfDay = (0, _storage.generateNumberRange)(0, 23).map(function (el) {
    if (el < 10) el = "0".concat(el);
    return "\n          <li class=\"hour-of-time\" data-sector-time=\"".concat(el, "\" data-time=\"").concat(el, ":00\">").concat(el, ":00</li>\n        ");
  }).join("");
  dayFullTime.innerHTML = hourTimeOfDay;
}; // render Calendar Sector days and hours


var renderCalendarSector = function renderCalendarSector() {
  var time = _toConsumableArray(document.querySelectorAll('.hour-of-time')).map(function (el) {
    return el.getAttribute('data-time');
  });

  var renderDayTime = function renderDayTime() {
    return (0, _storage.generateNumberRange)(0, 23).map(function (line) {
      return "<div class=\"calendar__sector-line\" data-type=\"sell\" data-sector-line=\"".concat(line, "\" data-set-hour=\"").concat(time[line], "\"></div>");
    }).join("");
  }; // !!!!!!!!!!!!!!!!!!


  var sectorColumn = (0, _storage.getRangeOfWeek)(nextMonday, 0, 6).map(function (column) {
    return "<div class=\"calendar__sector-column\" data-type=\"column\" data-set-year=\"".concat(column.year, "\"year data-set-month=\"").concat(column.month, "\" data-set-day=\"").concat(column.day, "\">").concat(renderDayTime(), "</div>");
  }).join("");
  sectorDays.innerHTML = sectorColumn;
  var currentColumnDay = null;

  if (document.querySelector(".calendar__sector-column[data-set-year=\"".concat(new Date().getFullYear(), "\"][data-set-month=\"").concat(new Date().getMonth(), "\"][data-set-day=\"").concat(new Date().getDate(), "\"]"))) {
    currentColumnDay = document.querySelector(".calendar__sector-column[data-set-year=\"".concat(new Date().getFullYear(), "\"][data-set-month=\"").concat(new Date().getMonth(), "\"][data-set-day=\"").concat(new Date().getDate(), "\"]"));
    var divLine = document.createElement('div');
    divLine.classList.add('line-today');
    currentColumnDay.appendChild(divLine);
  }

  var count = new Date().getHours() * 60 + new Date().getMinutes();
  var todayDayEl = document.querySelector(".line-today");

  var showCurrentTime = function showCurrentTime() {
    todayDayEl.style.top = "".concat(count, "px");

    var countMinutesOfDay = function countMinutesOfDay() {
      setInterval(function () {
        todayDayEl.style.top = "".concat(count, "px");
        count += 1;
      }, 60000);
    };

    countMinutesOfDay();
  };

  if (todayDayEl) {
    showCurrentTime();
  }
};

var renderEventsElem = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var eventsList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _eventsGateway.getEventsList)();

          case 2:
            eventsList = _context.sent;
            (0, _renderEvents.renderEvents)(eventsList);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderEventsElem() {
    return _ref.apply(this, arguments);
  };
}();

exports.renderEventsElem = renderEventsElem;

var renderDinamicPart = function renderDinamicPart() {
  renderWeekDays();
  getMonthContent();
  renderCalendarSector();
  renderEventsElem();
};

exports.renderDinamicPart = renderDinamicPart;
var btnToday = document.querySelector(".getToday");
var prevWeek = document.querySelector(".arrow-prev");
var nextWeek = document.querySelector(".arrow-next"); // show Current Week

var getToday = function getToday() {
  next = 0;
  exports.nextMonday = nextMonday = new Date(monday.getTime() + oneDay * next);
  renderDinamicPart();
}; // show Prev Week


var pullPrev = function pullPrev() {
  next -= 7;
  exports.nextMonday = nextMonday = new Date(monday.getTime() + oneDay * next);
  renderDinamicPart();
}; // show Next Week


var pullNext = function pullNext() {
  next += 7;
  exports.nextMonday = nextMonday = new Date(monday.getTime() + oneDay * next);
  renderDinamicPart();
};

btnToday.addEventListener("click", getToday);
prevWeek.addEventListener("click", pullPrev);
nextWeek.addEventListener("click", pullNext);

var renderCalendar = function renderCalendar() {
  renderTimeLine();
  renderWeek();
  renderDinamicPart();
};

exports.renderCalendar = renderCalendar;