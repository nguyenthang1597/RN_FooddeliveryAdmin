import {API_URL} from '../Config'
export default (id, name, photourl, price) => {
  return fetch(`${API_URL}/food/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({Name: name, PhotoUrl: photourl, Price: price})
  })
}
