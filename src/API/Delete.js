import {API_URL} from '../Config'
export default (id, type) => {
  let url = `${API_URL}/${type}/${id}`;
  console.log(url);
  return fetch(url, {
    method: 'DELETE',
  })
}
