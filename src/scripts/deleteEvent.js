import {
  getItem,
  setItem,
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
  const events = getItem('events') || []
  events.splice(index, 1)
  setItem('events', events)
  renderEvents()
  modal.close()
})