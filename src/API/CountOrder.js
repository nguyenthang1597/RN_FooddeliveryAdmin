import {API_URL} from '../Config'

const CountOrder = () => {
  let url = `${API_URL}/order/count`
  return fetch(url, {
    method: 'GET'
  })
  .then(res => res.json())
}

export default CountOrder;
