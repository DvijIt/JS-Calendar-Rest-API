"use strict";

require("core-js/modules/es.array.concat");

var _storage = require("./storage.js");

var _renderEvents = require("./renderEvents.js");

var _eventsGateway = require("./eventsGateway.js");

var _touchEvent = require("./touchEvent.js");

var btnSaveEvent = document.querySelector(".save__event");
var eventTitle = document.querySelector('input[name="nameEvent"]');
var eventDescription = document.querySelector('textarea[name="eventDescription"]');
var datePicker = document.querySelector('input[name="datepicker"]');
var inputTimeFrom = document.querySelector('button[data-target="dateFrom"]');
var inputTimeTo = document.querySelector('button[data-target="dateTo"]'); // Дейтсвия по кнопке "Сохранить"

var getDataEvent = function getDataEvent() {
  var data = datePicker.M_Datepicker.date;
  var getYear = new Date(data).getFullYear();
  var getDay = new Date(data).getDate();

  var getMonth = _storage.month[new Date(data).getMonth()];

  var getNumberMonth = new Date(data).getMonth();
  var date = "".concat(getDay, " ").concat(getMonth, " ").concat(getYear);
  var timeFromLength = new Date(getYear, getNumberMonth, getDay, +inputTimeFrom.innerText.substr(0, 2), +inputTimeFrom.innerText.substr(3)).getTime();
  var timeToLength = new Date(getYear, getNumberMonth, getDay, +inputTimeTo.innerText.substr(0, 2), +inputTimeTo.innerText.substr(3)).getTime();
  var minutes = (timeToLength - timeFromLength) / 60000;
  var dataEvent = {
    title: eventTitle.value,
    description: eventDescription.value,
    eventDate: date,
    day: getDay,
    month: getNumberMonth,
    year: getYear,
    eventTimeFrom: inputTimeFrom.innerText,
    eventTimeTo: inputTimeTo.innerText,
    timeLengthInMinutes: minutes
  };
  return dataEvent;
};

var createNewEvent = function createNewEvent() {
  console.log('new');
  var dataEvent = getDataEvent();
  (0, _eventsGateway.createEvent)(dataEvent).then(function () {
    return (0, _eventsGateway.getEventsList)();
  }).then(function (newTasksList) {
    (0, _renderEvents.renderEvents)(newTasksList);

    _storage.modal.close();

    eventTitle.value = '';
    eventDescription.value = '';
  });
};

var editEvent = function editEvent(e) {
  console.log('edit');
  var eventId = _touchEvent.getEventId;
  var dataEvent = getDataEvent();
  (0, _eventsGateway.updateEventData)(eventId, dataEvent).then(function () {
    return (0, _eventsGateway.getEventsList)();
  }).then(function (newTasksList) {
    (0, _renderEvents.renderEvents)(newTasksList);

    _storage.modal.close();
  });
};

var saveEvent = function saveEvent(e) {
  e.preventDefault();

  if (e.target.dataset.type === 'edit') {
    editEvent(e);
    return;
  }

  if (e.target.dataset.type === 'save') {
    createNewEvent();
    return;
  }
};

btnSaveEvent.addEventListener("click", saveEvent);