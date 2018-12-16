import {connect} from 'react-redux';
import MyOrder from '../Components/Deliver/Order/MyOrder'


const mapStateToProps = ({Authentication: {token}}) => ({token})
export default connect(mapStateToProps)(MyOrder);
