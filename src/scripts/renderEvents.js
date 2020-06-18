
const getFilteredEventsList = (eventsList, { days, month, years }) => {
  const filteredEventsListElems = eventsList
    .filter(event => days.includes(event.day)
      && month.includes(event.month)
      && years.includes(event.year));

  return filteredEventsListElems;
};

const createEventContainerElem = (id, timeLengthInMinutes, eventTimeFrom) => {
  const eventContainerElem = document.createElement('div');
  eventContainerElem.classList.add('event');
  eventContainerElem.setAttribute('data-id', id);
  eventContainerElem.setAttribute('data-type', 'event');
  eventContainerElem.setAttribute('style', `height: ${timeLengthInMinutes}px; margin-top: ${eventTimeFrom.substr(3)}px;}`);

  return eventContainerElem;
};

const createEventTitle = title => {
  const eventTitleElem = document.createElement('h3');
  eventTitleElem.classList.add('event-title');
  eventTitleElem.textContent = title;

  return eventTitleElem;
};

const createEventTimeElem = (timeFrom, timeTo) => {
  const eventTimeElem = document.createElement('div');
  eventTimeElem.classList.add('event-time');

  const eventTimeSpanElem = document.createElement('span');
  eventTimeSpanElem.textContent = `${timeFrom} - ${timeTo}`;

  eventTimeElem.append(eventTimeSpanElem);

  return eventTimeElem;
};

const getFilteredEventsElems = filteredArray => {
  const eventElems = filteredArray
    .map(event => {
      const eventContainerElem = createEventContainerElem(event.id, event.timeLengthInMinutes, event.eventTimeFrom);
      const eventTitleElem = createEventTitle(event.title);
      const eventTimeElem = createEventTimeElem(event.eventTimeFrom, event.eventTimeTo);
      eventContainerElem.append(eventTitleElem, eventTimeElem);
      return eventContainerElem;
    });
  return eventElems;
};

export const renderEvents = eventsList => {
  const eventsListElem = eventsList;

  const weekDays = [...document.querySelectorAll('.calendar__sector-column')];
  const weekDaysLine = [...document.querySelectorAll('[data-type="sell"]')];

  const days = weekDays.map(el => +el.dataset.setDay);
  const month = weekDays.map(el => +el.dataset.setMonth);
  const years = weekDays.map(el => +el.dataset.setYear);

  const filteredEventsListElems = getFilteredEventsList(eventsListElem, {
    days,
    month,
    years,
  });

  const filteredEvents = filteredEventsListElems;
  const filteredEventsElems = getFilteredEventsElems(filteredEvents);

  weekDaysLine.forEach(line => line.innerHTML = ''); // eslint-disable-line no-return-assign
  weekDays.forEach(el => {
    filteredEvents.forEach((event, index) => {
      if (event.day === +el.dataset.setDay
        && event.month === +el.dataset.setMonth
        && event.year === +el.dataset.setYear) {
        el.querySelector(`.calendar__sector-line[data-set-hour="${event.eventTimeFrom.substr(0, 3)}00"]`).append(filteredEventsElems[index]);
      }
    });
  });
};
