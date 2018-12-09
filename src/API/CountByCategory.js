import {API_URL} from '../Config'

const CountByCategory = () => {
  let url = `${API_URL}/category/countbycategory`
  return fetch(url, {
    method: 'GET'
  })
  .then(res => res.json())
}

export default CountByCategory;
