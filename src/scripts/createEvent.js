import { events, month, modal } from "./storage.js";
import { renderEvents } from "./renderEvents.js";

const btnSaveEvent = document.querySelector(".save__event");

const saveEvent = e => {
  e.preventDefault();

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
  let timeLengthInMinutes = ((+inputTimeTo.innerText.substr(0, 2) - +inputTimeFrom.innerText.substr(0, 2)) * 60 ) + (+inputTimeFrom.innerText.substr(3) + +inputTimeTo.innerText.substr(3));
 
  events.push({
    id: new Date().getTime(),
    title: eventTitle.value,
    description: eventDescription.value,
    eventDate: date,
    day: getDay,
    month: getNumberMonth,
    year: getYear,
    eventTimeFrom: inputTimeFrom.innerText,
    eventTimeTo: inputTimeTo.innerText,
    timeLengthInMinutes: timeLengthInMinutes
  });
  renderEvents();
  modal.close();
};

btnSaveEvent.addEventListener("click", saveEvent);
