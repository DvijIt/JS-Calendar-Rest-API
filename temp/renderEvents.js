"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderEvents = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var filteredEventsList = function filteredEventsList(eventsList, _ref) {
  var days = _ref.days,
      month = _ref.month,
      years = _ref.years;
  var filteredEventsListElems = eventsList.filter(function (event) {
    return days.includes(event.day) && month.includes(event.month) && years.includes(event.year);
  });
  return filteredEventsListElems;
};

var createEventContainerElem = function createEventContainerElem(id, timeLengthInMinutes, eventTimeFrom) {
  var eventContainerElem = document.createElement('div');
  eventContainerElem.classList.add('event');
  eventContainerElem.setAttribute('data-id', id);
  eventContainerElem.setAttribute('data-type', 'event');
  eventContainerElem.setAttribute('style', "height: ".concat(timeLengthInMinutes, "px; margin-top: ").concat(eventTimeFrom.substr(3), "px;}"));
  return eventContainerElem;
};

var createEventTitle = function createEventTitle(title) {
  var eventTitleElem = document.createElement('h3');
  eventTitleElem.classList.add('event-title');
  eventTitleElem.textContent = title;
  return eventTitleElem;
};

var createEventTimeElem = function createEventTimeElem(timeFrom, timeTo) {
  var eventTimeElem = document.createElement('div');
  eventTimeElem.classList.add('event-time');
  var eventTimeSpanElem = document.createElement('span');
  eventTimeSpanElem.textContent = "".concat(timeFrom, " - ").concat(timeTo);
  eventTimeElem.append(eventTimeSpanElem);
  return eventTimeElem;
};

var renderEvents = function renderEvents(eventsList) {
  var eventsListElem = eventsList;

  var weekDays = _toConsumableArray(document.querySelectorAll(".calendar__sector-column"));

  var weekDaysLine = _toConsumableArray(document.querySelectorAll('[data-type="sell"]'));

  var days = weekDays.map(function (el) {
    return +el.dataset.setDay;
  });
  var month = weekDays.map(function (el) {
    return +el.dataset.setMonth;
  });
  var years = weekDays.map(function (el) {
    return +el.dataset.setYear;
  });
  var filteredEventsListElems = filteredEventsList(eventsListElem, {
    days: days,
    month: month,
    years: years
  });
  weekDaysLine.forEach(function (line) {
    return line.innerHTML = '';
  });
  var filteredEventsElems = filteredEventsListElems.map(function (event) {
    var eventContainerElem = createEventContainerElem(event.id, event.timeLengthInMinutes, event.eventTimeFrom);
    var eventTitleElem = createEventTitle(event.title);
    var eventTimeElem = createEventTimeElem(event.eventTimeFrom, event.eventTimeTo);
    eventContainerElem.append(eventTitleElem, eventTimeElem);
    return eventContainerElem;
  });
  weekDays.forEach(function (el) {
    filteredEventsListElems.forEach(function (event, index) {
      if (event.day === +el.dataset.setDay && event.month === +el.dataset.setMonth && event.year === +el.dataset.setYear) {
        el.querySelectorAll('[data-type="sell"]').forEach(function (sell) {
          var eventHours = event.eventTimeFrom;
          var sellDataHours = sell.dataset.setHour;

          if (sellDataHours === eventHours) {
            sell.append(filteredEventsElems[index]);
          }
        });
      }
    });
  });
}; // Изначальная ф-я рендера
// export const renderEvents = eventsList => {
//   const eventsListElem = eventsList;
//   console.log(eventsListElem);
//   const weekDays = [...document.querySelectorAll(".calendar__sector-column")];
//   const weekDaysLine = [...document.querySelectorAll(".calendar__sector-line")];
//   weekDaysLine.forEach(line => line.innerHTML = '');
//   weekDays.forEach(el => {
//     eventsListElem.forEach(event => {
//       if (event.day == el.getAttribute("data-set-day") &&
//         event.month == el.getAttribute("data-set-month") &&
//         event.year == el.getAttribute("data-set-year")) {
//         el.querySelector(`.calendar__sector-line[data-set-hour="${event.eventTimeFrom.substr(0, 3)}00"]`).innerHTML =
//         `
//         <div style="height: ${event.timeLengthInMinutes}px; margin-top: ${event.eventTimeFrom.substr(3)}px;" class="event" data-id="${event.id}">
//           <h3 class="event-title">${event.title}</h3>
//           <div class="event-time"><span class="event-timeFrom">${event.eventTimeFrom}</span> - <span class="event-timeTo">${event.eventTimeTo}</span></div>
//         </div>
//         `
//       }
//     })
//   })
// };


exports.renderEvents = renderEvents;