import { setItem, modal } from "./storage.js";
import { renderEvents } from "./renderEvents.js";
import { eventId } from './updateEvent.js'
import { getEventsList, deleteEvent } from "./eventsGateway.js";

const btnRemoveEvent = document.querySelector(".btn-delete-event");

btnRemoveEvent.addEventListener('click', function () {
  
  deleteEvent(eventId)
    .then(() => getEventsList())
    .then(getEventsList => {
        setItem('tasksList', getEventsList);
        renderEvents();
        modal.close();
    });
  
})