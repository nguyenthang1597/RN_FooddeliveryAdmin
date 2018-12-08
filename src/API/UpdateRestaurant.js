import {API_URL} from '../Config'
export default (restaurant) => {
  return fetch(`${API_URL}/restaurant/${restaurant.Id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(restaurant)
  })
}
