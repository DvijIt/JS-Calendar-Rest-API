import { month, modal } from "./storage.js";
import { renderEvents } from "./renderEvents.js";
import { getEventsList, createEvent, updateEventData } from './eventsGateway.js'
import { getEventId } from './touchEvent.js'

const btnSaveEvent = document.querySelector(".save__event");

const eventTitle = document.querySelector('input[name="nameEvent"]');
const eventDescription = document.querySelector('textarea[name="eventDescription"]');
const datePicker = document.querySelector('input[name="datepicker"]');
const inputTimeFrom = document.querySelector('button[data-target="dateFrom"]');
const inputTimeTo = document.querySelector('button[data-target="dateTo"]');

// Дейтсвия по кнопке "Сохранить"
const getDataEvent = () => {
  const data = datePicker.M_Datepicker.date;
  const getYear = new Date(data).getFullYear();
  const getDay = new Date(data).getDate();
  const getMonth = month[new Date(data).getMonth()];
  const getNumberMonth = new Date(data).getMonth();
  let date = `${getDay} ${getMonth} ${getYear}`;

  let timeFromLength = new Date(getYear, getNumberMonth, getDay, +inputTimeFrom.innerText.substr(0, 2), +inputTimeFrom.innerText.substr(3)).getTime()
  let timeToLength = new Date(getYear, getNumberMonth, getDay, +inputTimeTo.innerText.substr(0, 2), +inputTimeTo.innerText.substr(3)).getTime()
  let minutes = (timeToLength - timeFromLength) / 60000;

  const dataEvent = {
    title: eventTitle.value,
    description: eventDescription.value,
    eventDate: date,
    day: getDay,
    month: getNumberMonth,
    year: getYear,
    eventTimeFrom: inputTimeFrom.innerText,
    eventTimeTo: inputTimeTo.innerText,
    timeLengthInMinutes: minutes
  }
  return dataEvent;
}

const createNewEvent = () => {
  console.log('new');
  const dataEvent = getDataEvent();

  createEvent(dataEvent)
    .then(() => getEventsList())
    .then(newTasksList => {
      renderEvents(newTasksList);
      modal.close();
      eventTitle.value = ''
      eventDescription.value = ''
    });
}

const editEvent = e => {
  console.log('edit');
  const eventId = getEventId;
  const dataEvent = getDataEvent();

  updateEventData(eventId, dataEvent)
    .then(() => getEventsList())
    .then(newTasksList => {
      renderEvents(newTasksList);
      modal.close();
    });
}

const saveEvent = e => {
  e.preventDefault();

  if (e.target.dataset.type === 'edit') {
    editEvent(e)
    return;
  }
  if (e.target.dataset.type === 'save') {
    createNewEvent()
    return;
  }
};

btnSaveEvent.addEventListener("click", saveEvent);