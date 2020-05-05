import {
  events,
  modal,
} from "./storage.js";
import {
  renderEvents
} from "./renderEvents.js";
import {
  index
} from './updateEvent.js'
const btnRemoveEvent = document.querySelector(".btn-delete-event");



btnRemoveEvent.addEventListener('click', function () {
  events.splice(index, 1)
  renderEvents()
  modal.close()
})