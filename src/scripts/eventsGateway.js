const baseUrl = 'https://5ec377e28ebdcc0016a5a8e4.mockapi.io/api/v1/events';

export const getEventsList = async () => {
  const responce = await fetch(baseUrl);
  const eventsList = await responce.json();

  return eventsList;
};

export const createEvent = async eventData => {
  const createEventData = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventData),
  });

  if (createEventData.ok) {
    return createEventData.json();
  }
  throw new Error('Loading data failed');
};

export const updateEventData = (eventId, updatedEventData) => fetch(`${baseUrl}/${eventId}`, {
  method: 'PUT',
  headers: {
    'Content-type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(updatedEventData),
}).then(response => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Loading data for update failed');
})
  .catch(err => {
    alert(err);
  });

export const deleteEvent = async eventId => {
  const deleteEventData = await fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  });
  if (deleteEventData.status === 200) {
    return await deleteEventData.json();
  }
  throw new Error('Failed to load data');
};
