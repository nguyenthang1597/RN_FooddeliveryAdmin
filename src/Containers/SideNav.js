import {connect} from 'react-redux'
import SideNav from '../Components/SideNav'
import {logout} from '../Actions/Authentication'
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(SideNav);
