import {API_URL} from '../Config'
export default (id, token) => {
  return fetch(`${API_URL}/order/accept?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}
