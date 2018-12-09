import {API_URL} from '../Config'

const CountOrderByState = () => {
  let url = `${API_URL}/order/countbystate`
  return fetch(url, {
    method: 'GET'
  })
  .then(res => res.json())
}

export default CountOrderByState;
