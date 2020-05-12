import {
  getItem,
  setItem,
  modal,
  month
} from "./storage.js";
import {
  renderEvents
} from "./renderEvents.js";
import {
  index
} from './updateEvent.js'

export const editEvent = () => {
  const events = getItem('events') || [];
  const eventTitle = document.querySelector('input[name="nameEvent"]');
  const eventDescription = document.querySelector(
    'textarea[name="eventDescription"]'
  );

  const datePicker = document.querySelector('input[name="datepicker"]');
  const inputTimeFrom = document.querySelector('button[data-target="dateFrom"]');
  const inputTimeTo = document.querySelector('button[data-target="dateTo"]');
  let event = events[index]
  let data = datePicker.M_Datepicker.date;
  const getYear = new Date(data).getFullYear();
  const getDay = new Date(data).getDate();
  const getNumberMonth = new Date(data).getMonth();

  let timeFromLength = new Date(getYear, getNumberMonth, getDay, +inputTimeFrom.innerText.substr(0, 2), +inputTimeFrom.innerText.substr(3)).getTime()
  let timeToLength = new Date(getYear, getNumberMonth, getDay, +inputTimeTo.innerText.substr(0, 2), +inputTimeTo.innerText.substr(3)).getTime()
  let minutes = (timeToLength - timeFromLength) / 60000;
  // 

  events.map(item => {
    if ( item.id === event.id ) {
      event.title = eventTitle.value;
      event.description = eventDescription.value;
      event.eventDate = datePicker.value;
      event.eventTimeFrom = inputTimeFrom.innerText;
      event.eventTimeTo = inputTimeTo.innerText;
      event.eventDate = `${new Date(datePicker.M_Datepicker.date).getDate()} ${month[new Date(datePicker.M_Datepicker.date).getMonth()]} ${new Date(datePicker.M_Datepicker.date).getFullYear()}`
      event.day = new Date(datePicker.M_Datepicker.date).getDate()
      event.month = new Date(datePicker.M_Datepicker.date).getMonth()
      event.year = new Date(datePicker.M_Datepicker.date).getFullYear()
      event.timeLengthInMinutes = minutes
    }
  })

  setItem('events', events)
  renderEvents()
  modal.close()
  // console.log(event)
}
