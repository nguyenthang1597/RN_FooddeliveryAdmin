import {API_URL} from '../Config'

const CountFood = () => {
  let url = `${API_URL}/food/count`
  return fetch(url, {
    method: 'GET'
  })
  .then(res => res.json())
}

export default CountFood;
