import { events, modal, month, generateNumberRange } from "./storage.js";
import { renderEvents } from "./renderEvents.js";

const calendarSector = document.querySelector('.calendar__sector');

const editEvent = e => {
  let id = null
  if (e.target.closest('.event') !== null) {id = e.target.closest('.event').getAttribute('data-id')}
  else {
    return false
  }
  
  let eventArr = events.filter(event => event.id == id)
  let event = eventArr[0]
  const eventTitle = document.querySelector('input[name="nameEvent"]');
  const eventDescription = document.querySelector(
    'textarea[name="eventDescription"]'
  );
  const dropDateFrom = document.querySelector("#dateFrom");
  const dropDateTo = document.querySelector("#dateTo");
  const datePicker = document.querySelector('input[name="datepicker"]');
  const inputTimeFrom = document.querySelector('button[data-target="dateFrom"]');
  const inputTimeTo = document.querySelector('button[data-target="dateTo"]');
  eventTitle.value = event.title
  eventDescription.description = event.description
  datePicker.value = event.eventDate;
  inputTimeFrom.innerText = event.eventTimeFrom;
  inputTimeTo.innerText = event.eventTimeTo;
  datePicker.M_Datepicker.date = new Date(event.year, event.month, event.day)



  modal.open()
}
calendarSector.addEventListener('click', editEvent)