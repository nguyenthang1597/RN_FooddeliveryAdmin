import {API_URL} from '../Config'

const GetRestaurant = (page, perpage) => {
  let url = `${API_URL}/restaurant/list?page=${page}&perpage=${perpage}`
  console.log(url);
  return fetch(url, {
    method: 'GET'
  })
}

export default GetRestaurant;
