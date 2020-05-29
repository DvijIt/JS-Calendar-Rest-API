import { getDataEvent } from './getDataEvent.js';
import { getEventsList } from './eventsGateway.js';

const calendarSector = document.querySelector('.calendar__sector');
const btnSaveEvent = document.querySelector('.save__event');
const btnRemoveEvent = document.querySelector('.btn-delete-event');
const createEventBtn = document.querySelector('.create__event');

const eventTitle = document.querySelector('input[name="nameEvent"]');
const eventDescription = document.querySelector('textarea[name="eventDescription"]');

export let getEventId = 0;

const createNewEvent = e => {
  btnSaveEvent.setAttribute('data-type', 'save');
  btnRemoveEvent.setAttribute('data-type', 'disable');
  const getDay = e.target.parentNode.dataset.setDay;
  const getMonth = e.target.parentNode.dataset.setMonth;
  const getYear = e.target.parentNode.dataset.setYear;
  const getTimeFrom = e.target.dataset.setHour;
  const getTimeTo = e.target.nextElementSibling.dataset.setHour;

  const data = {
    getDay,
    getMonth,
    getYear,
    getTimeFrom,
    getTimeTo,
  };

  getDataEvent(data);

  eventTitle.value = '';
  eventDescription.value = '';
};

const getDataUdateEvent = async e => {
  btnSaveEvent.setAttribute('data-type', 'edit');
  btnRemoveEvent.removeAttribute('data-type', 'disable');

  const $target = e.target.closest('[data-type="event"]');
  const eventId = $target.dataset.id;
  const events = await getEventsList();
  const event = events.find(eventEl => eventEl.id === eventId);

  const getDay = event.day;
  const getMonth = event.month;
  const getYear = event.year;
  const getTimeFrom = event.eventTimeFrom;
  const getTimeTo = event.eventTimeTo;

  const data = {
    getDay,
    getMonth,
    getYear,
    getTimeFrom,
    getTimeTo,
  };
  getDataEvent(data);
  eventTitle.value = event.title;
  eventDescription.value = event.description;

  getEventId = eventId;
};

const getTypeEvent = e => {
  if (e.target.dataset.type === 'sell') {
    createNewEvent(e);
    return;
  }
  if (e.target.closest('[data-type="event"]').dataset.type === 'event') {
    getDataUdateEvent(e);
  }
};

const createDataNewEventFromeHaderButton = () => {
  btnSaveEvent.setAttribute('data-type', 'save');
  btnRemoveEvent.setAttribute('data-type', 'disable');
  const getDay = new Date().getDate();
  const getMonth = new Date().getMonth();
  const getYear = new Date().getFullYear();
  const getTimeFrom = new Date().getHours() < 10
    ? `0${new Date().getHours()}:00`
    : `${new Date().getHours()}:00`;

  const getTimeTo = new Date().getHours() < 10
    ? `0${new Date().getHours() + 1}:00`
    : `${new Date().getHours() + 1}:00`;

  const data = {
    getDay,
    getMonth,
    getYear,
    getTimeFrom,
    getTimeTo,
  };

  getDataEvent(data);
};
calendarSector.addEventListener('click', getTypeEvent);

createEventBtn.addEventListener('click', createDataNewEventFromeHaderButton);
