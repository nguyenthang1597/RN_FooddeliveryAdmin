import {connect} from 'react-redux';
import RestaurantList from '../Components/Admin/Restaurant/List';
import {getRestaurants, makeRefresh, makeLoadmore} from '../Actions/Restaurant'

const mapStateToProps = ({Restaurants: {restaurants, loading, loadmore, refresh, page}}) => ({
  restaurants,
  loading,
  loadmore,
  refresh,
  page
})

const mapDispatchToProps = dispatch => ({
  getRestaurants: (page, perpage) => dispatch(getRestaurants(page, perpage)),
  makeRefresh: (page, perpage) => dispatch(makeRefresh(page, perpage)),
  makeLoadmore: (page, perpage) => dispatch(makeLoadmore(page, perpage))
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
