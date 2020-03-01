import { instance, instance2, block, eventBlock } from "./events.js";
import { month } from "./renderDaysWeek.js";

const createEventBtn = document.querySelector(".create__event");
const saveEventBtn = document.querySelector(".save__event");

createEventBtn.addEventListener("click", function() {
  instance.open();
});

const editEvent = e => {
  console.log("aw");
};
const saveEvent = e => {
  e.preventDefault();
  const form = document.forms.eventForm;
  const formdata = [...new FormData(form)].reduce(
    (acc, [field, value]) => ({ ...acc, [field]: value }),
    {}
  );
  let inputTimeFrom = document.querySelector(".dateFrom");
  let inputTimeTo = document.querySelector(".dateTo");
  const event = {
    nameEvent: formdata.nameEvent,
    dateEvent: formdata.hiddenInput,
    startEvent: inputTimeFrom.innerHTML,
    endEvent: inputTimeTo.innerHTML,
    eventDescription: formdata.description
  };
  let day = form.hiddenInput.getAttribute("data-day");
  let month = form.hiddenInput.getAttribute("data-month");
  let year = form.hiddenInput.getAttribute("data-year");
  let hour = event.startEvent.split(":")[0];
  let minutes = event.startEvent.split(":")[1];
  block.closest(".calendar__sector-line").innerHTML = `
    <div class="event-block" data-minutes="${minutes}" data-hour="${hour}" data-day="${day}" data-month="${month}" data-year="${year}" data-desr-event="${event.eventDescription}">
      <h2 class="event-title">${event.nameEvent}</h2>
      <p class="event-text"><span class="event-start">${event.startEvent}</span> - ${event.endEvent}</p>
    </div>`;

  // let start = event.startEvent.split(":")[0];
  // let end = event.endEvent.split(":")[0];
  // console.log(start > end);

  instance.close();
};
const deleteEvent = e => {
  e.preventDefault();
  const year = block.getAttribute("data-year");
  const month = block.getAttribute("data-month");
  const day = block.getAttribute("data-day");
  const hour = block.getAttribute("data-hour");
  const minutes = block.getAttribute("data-minutes");
  const timeNow = new Date().getTime();
  const timeToStartEvent = new Date(year, month, day, hour, minutes).getTime();
  const result = new Date(timeToStartEvent - timeNow).getMinutes();
  if (result <= 15) {
    alert("нельзя удалить событие за 15 минут до начала");
    instance.close();
  } else {
    block.closest(".calendar__sector-line").innerHTML = "";
    instance.close();
  }
};
const btnDeleteEvent = document.querySelector(".btn-delete-event");
btnDeleteEvent.addEventListener("click", deleteEvent);

saveEventBtn.addEventListener("click", saveEvent);
