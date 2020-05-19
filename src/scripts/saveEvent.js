import { getItem, setItem, month, modal } from "./storage.js";
import { renderEvents } from "./renderEvents.js";
import { editEvent } from './editEvent.js';
import { getEventsList, createEvent } from './eventsGateway.js'


const btnSaveEvent = document.querySelector(".save__event");


const saveEvent = e => {
  e.preventDefault();
  
  const events = getItem('tasksList') || []

  if (btnSaveEvent.classList.contains('editBtn')) {
    editEvent()
    return;
  }

  const eventTitle = document.querySelector('input[name="nameEvent"]');
  const eventDescription = document.querySelector(
    'textarea[name="eventDescription"]'
  );
  const datePicker = document.querySelector('input[name="datepicker"]');
  const inputTimeFrom = document.querySelector(
    'button[data-target="dateFrom"]'
  );
  const inputTimeTo = document.querySelector('button[data-target="dateTo"]');
  let data = datePicker.M_Datepicker.date;
  const getYear = new Date(data).getFullYear();
  const getDay = new Date(data).getDate();
  const getMonth = month[new Date(data).getMonth()];
  const getNumberMonth = new Date(data).getMonth();
  let date = `${getDay} ${getMonth} ${getYear}`;

  let timeFromLength = new Date(getYear, getNumberMonth, getDay, +inputTimeFrom.innerText.substr(0, 2), +inputTimeFrom.innerText.substr(3)).getTime()
  let timeToLength = new Date(getYear, getNumberMonth, getDay, +inputTimeTo.innerText.substr(0, 2), +inputTimeTo.innerText.substr(3)).getTime()
  let minutes = (timeToLength - timeFromLength) / 60000;

  const newEvent = {
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


  createEvent(newEvent)
    .then(() => getEventsList())
    .then(newTasksList => {
      setItem('tasksList', newTasksList);
      renderEvents();
      modal.close();
      eventTitle.value = ''
      eventDescription.value = ''
    });
  

};


btnSaveEvent.addEventListener("click", saveEvent);