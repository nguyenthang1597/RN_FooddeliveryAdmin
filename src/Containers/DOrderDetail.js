import {connect} from 'react-redux';
import DeliverOrderDetail from '../Components/Deliver/Order/Detail'


const mapStateToProps = ({Authentication: {token}}) => ({token})
export default connect(mapStateToProps)(DeliverOrderDetail);
