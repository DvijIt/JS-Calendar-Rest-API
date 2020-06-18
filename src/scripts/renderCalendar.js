import { renderEvents } from './renderEvents.js';
import { getEventsList } from './eventsGateway.js';
import renderHeader from './Header/header';
import renderTimeScale from './TimeScale/renderTimeScale';
import renderCalendarSector from './Calendar/renderCalendar';

export const renderEventsElem = async () => {
  const eventsList = await getEventsList();
  renderEvents(eventsList);
};

export const renderCalendar = () => {
  renderHeader();
  renderTimeScale();
  renderCalendarSector();
  renderEventsElem();
};
