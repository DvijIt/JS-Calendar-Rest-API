import { renderCurrentMonth } from './renderCurrentMonth';
import renderWeek from './renderWeek';
import renderCalendarSector from '../Calendar/renderCalendar';
import { renderEvents } from '../renderEvents.js';
import { getEventsList } from '../eventsGateway.js';

// милисекунд в дне
const oneDay = 1000 * 60 * 60 * 24;
const getMonday = () => {
  // милисекунд сейчас
  const now = new Date().getTime();
  // милисекунд от вс до текущего дня недели
  const to = new Date().getDay() * oneDay;
  if (new Date().getDay() !== 0) return new Date(now - to + oneDay);
  return new Date(now - oneDay * 6);
};
const monday = getMonday();
let next = 0;

export let nextMonday = new Date(monday.getTime() + oneDay * next);

const renderEventsElem = async () => {
  const eventsList = await getEventsList();
  renderEvents(eventsList);
};

const renderDinamicPart = () => {
  renderCurrentMonth();
  renderWeek();
  renderCalendarSector();
  renderEventsElem();
};

function showCurrentWeek() {
  next = 0;
  nextMonday = new Date(monday.getTime() + oneDay * next);
  renderDinamicPart();
}

function showPrevWeek() {
  next -= 7;
  nextMonday = new Date(monday.getTime() + oneDay * next);
  renderDinamicPart();
}

function showNextWeek() {
  next += 7;
  nextMonday = new Date(monday.getTime() + oneDay * next);
  renderDinamicPart();
}

// eslint-disable-next-line consistent-return
const onChangeWeek = event => {
  const $target = event.target.closest('[data-nav]');
  if (!$target) {
    return null;
  }

  const $type = $target.dataset.nav;
  switch ($type) {
    case 'current': {
      showCurrentWeek();
      break;
    }
    case 'prev': {
      showPrevWeek();
      break;
    }
    case 'next': {
      showNextWeek();
      break;
    }
    default:
      return null;
  }
};

const navElem = document.querySelector('.navigation');

export const initNavigation = () => {
  navElem.addEventListener('click', onChangeWeek);
};
