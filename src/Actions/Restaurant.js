import GetRestaurant from '../API/GetRestaurant'

export const REQUEST_RESTAURANT = 'REQUEST_RESTAURANT';
export const RECEIVE_RESTAURANT = 'RECEIVE_RESTAURANT';
export const LOADMORE_RESTAURANT = 'LOADMORE_RESTAURANT';
export const REFRESH_RESTAURANT = 'REFRESH_RESTAURANT';
export const REQUEST_LOADMORE = 'REQUEST_LOADMORE';
export const RECEIVE_LOADMORE = 'RECEIVE_LOADMORE';



const requestRestaurant = () => ({type: REQUEST_RESTAURANT});
const receiveRestaurant = data => ({type: RECEIVE_RESTAURANT, data});
const refreshRestaurant = () => ({type: REFRESH_RESTAURANT});
const requestLoadmore = () => ({type: REQUEST_LOADMORE});
const receiveLoadMore = data => ({type: RECEIVE_LOADMORE, data})


export const makeRefresh = (page, perpage) => dispatch => {
  dispatch(refreshRestaurant());
  return GetRestaurant(page, perpage)
  .then(res => res.json())
  .then(data => dispatch(receiveRestaurant(data.Restaurants)))
}

export const getRestaurants = (page, perpage) => dispatch => {
  dispatch(requestRestaurant());
  return GetRestaurant(page, perpage)
  .then(res => res.json())
  .then(data => dispatch(receiveRestaurant(data.Restaurants)
  ))
}

export const makeLoadmore = (page, perpage) =>  dispatch => {
  dispatch(requestLoadmore());
  return GetRestaurant(page, perpage)
  .then(res => res.json())
  .then(data => dispatch(receiveLoadMore(data.Restaurants)))
}
