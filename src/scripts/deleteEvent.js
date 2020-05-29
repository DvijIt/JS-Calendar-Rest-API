import { modal } from './storage.js';
import { renderEvents } from './renderEvents.js';
import { getEventsList, deleteEvent } from './eventsGateway.js';
import { getEventId } from './touchEvent.js';

const btnRemoveEvent = document.querySelector('.btn-delete-event');

btnRemoveEvent.addEventListener('click', async () => {
  deleteEvent(getEventId)
    .then(() => getEventsList())
    .then(newTasksList => {
      renderEvents(newTasksList);
      modal.close();
    });
});
