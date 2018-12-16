import React, { Component } from 'react'
import {View, AppState} from 'react-native'
import TopBar from '../Containers/TopBar';
import SideNav from './DeliverSideNav';
import DeliverOderList from './Deliver/Order/List'
import MyOrder from '../Containers/MyOrder'
import SubcribeNewOrder from '../API/SubcribeNewOrder'
import PushNotification from 'react-native-push-notification';
export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      component: ''
    }
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION: ', notification);
      }
    });
  }

  sideMenu = () => this.setState({open: !this.state.open})
  setComponent = component => this.setState({component: component, open: false})

  componentDidMount(){
    SubcribeNewOrder(() => {
      console.log('new');
      PushNotification.localNotification({
        message: 'Có đơn hàng mới'
      });
    })
  }
  render() {
    return (
      <View style={{flex: 1, position: 'relative', zIndex: 0}}>
        <TopBar sideMenu={this.sideMenu}/>
        <SideNav open={this.state.open} setComponent={this.setComponent}/>
        {
          this.state.component === 'Order_List' && <DeliverOderList/>
        }
        {
          this.state.component === 'My_Order_List' && <MyOrder/>
        }

      </View>
    )
  }
}
