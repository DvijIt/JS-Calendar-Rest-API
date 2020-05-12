import {
  getItem,
  modal,
  month
} from "./storage.js";
import {
  renderEvents
} from "./renderEvents.js";


export let index = null
export const updateEvent = (e) => {
  const events = getItem('events') || [];
  if (e.target.closest('.event') !== null) {
    index = e.target.closest('.event').getAttribute('data-index');
  } else {
    return false
  }
  let event = events[index]
  const eventTitle = document.querySelector('input[name="nameEvent"]');
  const eventDescription = document.querySelector(
    'textarea[name="eventDescription"]'
  );

  const datePicker = document.querySelector('input[name="datepicker"]');
  const inputTimeFrom = document.querySelector('button[data-target="dateFrom"]');
  const inputTimeTo = document.querySelector('button[data-target="dateTo"]');
  eventTitle.value = event.title
  eventDescription.value = event.description
  datePicker.value = event.eventDate;
  inputTimeFrom.innerText = event.eventTimeFrom;
  inputTimeTo.innerText = event.eventTimeTo;
  datePicker.M_Datepicker.date = new Date(event.year, event.month, event.day)

  modal.open()
}