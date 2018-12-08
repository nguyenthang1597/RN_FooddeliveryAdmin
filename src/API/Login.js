import {API_URL} from '../Config';

export default (info) => {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info)
  })
}
