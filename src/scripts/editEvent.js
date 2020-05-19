import { getItem, setItem, modal, month } from "./storage.js";
import { renderEvents } from "./renderEvents.js";
import { eventId } from './updateEvent.js';
import { updateEventData, getEventsList} from './eventsGateway.js'

export const editEvent = () => {
  const eventTitle = document.querySelector('input[name="nameEvent"]');
  const eventDescription = document.querySelector('textarea[name="eventDescription"]');
  const datePicker = document.querySelector('input[name="datepicker"]');
  const inputTimeFrom = document.querySelector('button[data-target="dateFrom"]');
  const inputTimeTo = document.querySelector('button[data-target="dateTo"]');
  
  let data = datePicker.M_Datepicker.date;
  const getYear = new Date(data).getFullYear();
  const getDay = new Date(data).getDate();
  const getNumberMonth = new Date(data).getMonth();

  let timeFromLength = new Date(getYear, getNumberMonth, getDay, +inputTimeFrom.innerText.substr(0, 2), +inputTimeFrom.innerText.substr(3)).getTime()
  let timeToLength = new Date(getYear, getNumberMonth, getDay, +inputTimeTo.innerText.substr(0, 2), +inputTimeTo.innerText.substr(3)).getTime()
  let minutes = (timeToLength - timeFromLength) / 60000;
  // 

  const updatedEventData = {
    title: eventTitle.value,
    description: eventDescription.value,
    eventDate: datePicker.value,
    eventTimeFrom: inputTimeFrom.innerText,
    eventTimeTo: inputTimeTo.innerText,
    eventDate: `${new Date(datePicker.M_Datepicker.date).getDate()} ${month[new Date(datePicker.M_Datepicker.date).getMonth()]} ${new Date(datePicker.M_Datepicker.date).getFullYear()}`,
    day: new Date(datePicker.M_Datepicker.date).getDate(),
    month: new Date(datePicker.M_Datepicker.date).getMonth(),
    year: new Date(datePicker.M_Datepicker.date).getFullYear(),
    timeLengthInMinutes: minutes,
  }
  
  updateEventData(eventId, updatedEventData)
    .then(() => getEventsList())
    .then(newTasksList => {
      setItem('tasksList', newTasksList);
      renderEvents();
      modal.close();
      eventTitle.value = ''
      eventDescription.value = ''
    });

}
