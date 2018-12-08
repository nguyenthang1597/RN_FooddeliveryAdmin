import {REQUEST_RESTAURANT,RECEIVE_RESTAURANT,LOADMORE_RESTAURANT,REFRESH_RESTAURANT, REQUEST_LOADMORE, RECEIVE_LOADMORE} from '../Actions/Restaurant'

const initState = {
  restaurants: [],
  loading: true,
  refresh: false,
  loadmore: false,
  page: 1
}

export default (state = initState, action) => {
  switch(action.type){
    case REQUEST_RESTAURANT:
      return {...state, loading: true}
    case RECEIVE_RESTAURANT:
      return {...state, loading: false, restaurants: action.data, refresh: false, page: state.page + 1}
    case LOADMORE_RESTAURANT:
      return {...state, loadmore: true}
    case REFRESH_RESTAURANT:
      return {...state, refresh: true}
    case REQUEST_LOADMORE:
      return {...state, loadmore: true}
    case RECEIVE_LOADMORE:
      if(action.data.length)
        return {...state, restaurants: [...state.restaurants, ...action.data], page: state.page + 1}
      else
        return state;
    default:
      return state;
  }
}
