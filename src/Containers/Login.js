import {connect} from 'react-redux';
import authenticate from '../Actions/Authentication'
import LoginPage from '../Components/LoginPage'
const mapStateToProps = ({Authentication: {isAuthenticated, token}}) => ({
  isAuthenticated,
  token
})

const mapDispatchToProps = dispatch => ({
  authenticate: (username, password) => dispatch(authenticate(username, password))
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
