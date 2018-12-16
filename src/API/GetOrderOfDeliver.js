import {API_URL} from '../Config'
export default (token) => {
  return fetch(`${API_URL}/order/myorder`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}
