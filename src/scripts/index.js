import {} from "./renderCalendar.js";
import {} from "./events.js";
import {} from "./saveEvent.js";
import {renderEvents} from "./renderEvents.js";
import {} from "./touchEvent.js";
import {} from "./deleteEvent.js";
import {} from "./updateEvent.js";
import {getEventsList} from "./eventsGateway.js";
import { setItem } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  getEventsList()
    .then(eventsList => {
      setItem('tasksList', eventsList);
      renderEvents();
    })
  
});

const onStorageChange = e => {
  if (e.key === 'tasksList') {
      renderEvents();
  }
};

window.addEventListener('storage', onStorageChange);