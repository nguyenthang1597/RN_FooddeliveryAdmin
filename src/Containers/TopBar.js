import {connect} from 'react-redux'
import TopBar from '../Components/TopBar'
import {logout} from '../Actions/Authentication'
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(TopBar);
