import {API_URL} from '../Config'
export default (id) => {
  return fetch(`${API_URL}/order/received?id=${id}`, {
    method: 'GET'
  })
}
