
const filteredEventsList = (eventsList, { days, month, years }) => {
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

export const renderEvents = eventsList => {
  const eventsListElem = eventsList;

  const weekDays = [...document.querySelectorAll('.calendar__sector-column')];
  const weekDaysLine = [...document.querySelectorAll('[data-type="sell"]')];

  const days = weekDays.map(el => +el.dataset.setDay);
  const month = weekDays.map(el => +el.dataset.setMonth);
  const years = weekDays.map(el => +el.dataset.setYear);

  const filteredEventsListElems = filteredEventsList(eventsListElem, {
    days,
    month,
    years,
  });

  weekDaysLine.forEach(line => line.innerHTML = ''); // eslint-disable-line no-return-assign


  const filteredEventsElems = filteredEventsListElems
    .map(event => {
      const eventContainerElem = createEventContainerElem(event.id, event.timeLengthInMinutes, event.eventTimeFrom);
      const eventTitleElem = createEventTitle(event.title);
      const eventTimeElem = createEventTimeElem(event.eventTimeFrom, event.eventTimeTo);

      eventContainerElem.append(eventTitleElem, eventTimeElem);

      return eventContainerElem;
    });


  weekDays.forEach(el => {
    filteredEventsListElems.forEach((event, index) => {
      if (event.day === +el.dataset.setDay
          && event.month === +el.dataset.setMonth
          && event.year === +el.dataset.setYear) {
        el.querySelectorAll('[data-type="sell"]')
          .forEach(sell => {
            const eventHours = event.eventTimeFrom;
            const sellDataHours = sell.dataset.setHour;
            if (sellDataHours === eventHours) {
              sell.append(filteredEventsElems[index]);
            }
          });
      }
    });
  });
};

// Изначальная ф-я рендера
// export const renderEvents = eventsList => {
//   const eventsListElem = eventsList;
//   console.log(eventsListElem);

//   const weekDays = [...document.querySelectorAll(".calendar__sector-column")];
//   const weekDaysLine = [...document.querySelectorAll(".calendar__sector-line")];

//   weekDaysLine.forEach(line => line.innerHTML = '');
//   weekDays.forEach(el => {
//     eventsListElem.forEach(event => {
//       if (event.day == el.getAttribute("data-set-day") &&
//         event.month == el.getAttribute("data-set-month") &&
//         event.year == el.getAttribute("data-set-year")) {
//         el.querySelector(`.calendar__sector-line[data-set-hour="${event.eventTimeFrom.substr(0, 3)}00"]`).innerHTML =
//         `
//         <div style="height: ${event.timeLengthInMinutes}px; margin-top: ${event.eventTimeFrom.substr(3)}px;" class="event" data-id="${event.id}">
//           <h3 class="event-title">${event.title}</h3>
//           <div class="event-time"><span class="event-timeFrom">${event.eventTimeFrom}</span> - <span class="event-timeTo">${event.eventTimeTo}</span></div>
//         </div>
//         `
//       }
//     })
//   })

// };
