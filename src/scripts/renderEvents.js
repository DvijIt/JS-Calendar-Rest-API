import { modal, month, generateNumberRange, events } from "./storage.js";

export const renderEvents = () => {
  // console.log(events);
  const weekDays = [...document.querySelectorAll(".calendar__sector-column")];
  let days = [];
  weekDays.forEach(item => {
    days.push(
      item.getAttribute("data-set-day"))
  });
  const filteredEvents = [];
  weekDays.forEach(el => {
    events.forEach(event => {
      if (event.day == el.getAttribute("data-set-day") && event.month == el.getAttribute("data-set-month") && event.year == el.getAttribute("data-set-year")) {
        filteredEvents.push(event)
        el.querySelector(`.calendar__sector-line[data-set-hour="${event.eventTimeFrom.substr(0, 3)}00"]`).innerHTML = `
        <div style="height: ${event.timeLengthInMinutes}px; margin-top: ${event.eventTimeFrom.substr(3)}px;" class="event" data-id="${event.id}">
          <h3 class="event-title">${event.title}</h3>
          <div class="event-time"><span class="event-timeFrom">${event.eventTimeFrom}</span> - <span class="event-timeTo">${event.eventTimeTo}</span></div>
        </div>
        `
      }
    })
  })
// console.log(filteredEvents)
};
