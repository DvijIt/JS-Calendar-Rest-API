const baseUrl = 'https://5ec377e28ebdcc0016a5a8e4.mockapi.io/api/v1/events'

export const getEventsList = () => {
  return fetch(baseUrl)
    .then(responce => responce.json())
}

export const createEvent = eventData => {
  return fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(eventData)
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Loading data failed')
      }
    })
    .catch(err => {
      alert(err)
    });
}

export const updateEventData = (eventId, updatedEventData) => {
  return fetch(`${baseUrl}/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(updatedEventData)
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Loading data for update failed')
      }
    })
    .catch(err => {
      alert(err)
    });
}

export const deleteEvent = eventId => {
  return fetch(`${baseUrl}/${eventId}`, {
      method: 'DELETE',
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Loading data for delete failed')
      }
    })
    .catch(err => {
      alert(err)
    });
}