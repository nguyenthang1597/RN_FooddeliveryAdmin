import {API_URL} from '../Config'
export default (restaurant) => {
  return fetch(`${API_URL}/restaurant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(restaurant)
  })
}
