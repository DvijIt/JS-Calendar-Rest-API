"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.find");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventId = void 0;

require("regenerator-runtime/runtime");

var _getDataEvent = require("./getDataEvent.js");

var _eventsGateway = require("./eventsGateway.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var calendarSector = document.querySelector('.calendar__sector');
var btnSaveEvent = document.querySelector(".save__event");
var btnRemoveEvent = document.querySelector(".btn-delete-event");
var createEventBtn = document.querySelector(".create__event");
var eventTitle = document.querySelector('input[name="nameEvent"]');
var eventDescription = document.querySelector('textarea[name="eventDescription"]');
var getEventId = 0;
exports.getEventId = getEventId;

var createNewEvent = function createNewEvent(e) {
  btnSaveEvent.setAttribute('data-type', 'save');
  btnRemoveEvent.setAttribute('data-type', 'disable');
  var getDay = e.target.parentNode.dataset.setDay;
  var getMonth = e.target.parentNode.dataset.setMonth;
  var getYear = e.target.parentNode.dataset.setYear;
  var getTimeFrom = e.target.dataset.setHour;
  var getTimeTo = e.target.nextElementSibling.dataset.setHour;
  var data = {
    getDay: getDay,
    getMonth: getMonth,
    getYear: getYear,
    getTimeFrom: getTimeFrom,
    getTimeTo: getTimeTo
  };
  (0, _getDataEvent.getDataEvent)(data);
  eventTitle.value = '';
  eventDescription.value = '';
};

var getDataUdateEvent = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
    var $target, eventId, events, event, getDay, getMonth, getYear, getTimeFrom, getTimeTo, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            btnSaveEvent.setAttribute('data-type', 'edit');
            btnRemoveEvent.removeAttribute('data-type', 'disable');
            $target = e.target.closest('[data-type="event"]');
            eventId = $target.dataset.id;
            _context.next = 6;
            return (0, _eventsGateway.getEventsList)();

          case 6:
            events = _context.sent;
            event = events.find(function (event) {
              return event.id === eventId;
            });
            getDay = event.day;
            getMonth = event.month;
            getYear = event.year;
            getTimeFrom = event.eventTimeFrom;
            getTimeTo = event.eventTimeTo;
            data = {
              getDay: getDay,
              getMonth: getMonth,
              getYear: getYear,
              getTimeFrom: getTimeFrom,
              getTimeTo: getTimeTo
            };
            (0, _getDataEvent.getDataEvent)(data);
            eventTitle.value = event.title;
            eventDescription.value = event.description;
            exports.getEventId = getEventId = eventId;

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getDataUdateEvent(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getTypeEvent = function getTypeEvent(e) {
  if (e.target.dataset.type === 'sell') {
    createNewEvent(e);
    return;
  }

  if (e.target.closest('[data-type="event"]').dataset.type === 'event') {
    getDataUdateEvent(e);
    return;
  }
};

var createDataNewEventFromeHaderButton = function createDataNewEventFromeHaderButton() {
  btnSaveEvent.setAttribute('data-type', 'save');
  btnRemoveEvent.setAttribute('data-type', 'disable');
  var getDay = new Date().getDate();
  var getMonth = new Date().getMonth();
  var getYear = new Date().getFullYear();
  var getTimeFrom = new Date().getHours() < 10 ? "0".concat(new Date().getHours(), ":00") : "".concat(new Date().getHours(), ":00");
  var getTimeTo = new Date().getHours() < 10 ? "0".concat(new Date().getHours() + 1, ":00") : "".concat(new Date().getHours() + 1, ":00");
  var data = {
    getDay: getDay,
    getMonth: getMonth,
    getYear: getYear,
    getTimeFrom: getTimeFrom,
    getTimeTo: getTimeTo
  };
  (0, _getDataEvent.getDataEvent)(data);
};

calendarSector.addEventListener('click', getTypeEvent);
createEventBtn.addEventListener('click', createDataNewEventFromeHaderButton);