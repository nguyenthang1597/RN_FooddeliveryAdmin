import {API_URL} from '../Config'

const CountRestaurant = () => {
  let url = `${API_URL}/restaurant/count`
  return fetch(url, {
    method: 'GET'
  })
  .then(res => res.json())
}

export default CountRestaurant;
