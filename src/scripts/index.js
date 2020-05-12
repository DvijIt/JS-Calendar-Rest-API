import {} from "./renderCalendar.js";
import {} from "./events.js";
import {} from "./saveEvent.js";
import {renderEvents} from "./renderEvents.js";
import {} from "./touchEvent.js";
import {} from "./deleteEvent.js";
import {} from "./updateEvent.js";

document.addEventListener("DOMContentLoaded", function () {
  renderEvents()
});

const onStorageChange = e => {
  if (e.key === 'events') {
      renderEvents();
  }
};

window.addEventListener('storage', onStorageChange);