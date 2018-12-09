import React, { Component } from 'react'
import {View, AppState} from 'react-native'
import TopBar from '../Containers/TopBar';
import SideNav from './SideNav';
import RestaurantList from '../Containers/Restaurants';
import FormAddRestaurant from './Admin/Restaurant/FormAddRestaurant'
import OrderList from './Admin/Order/List';
import CategoryList from './Admin/Category/List';
import AdmimDashboard from './Admin/Dashboard'
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
          this.state.component === '' && <AdmimDashboard />
        }
        {
          this.state.component === 'Restaurant_List' && <RestaurantList/>
        }
        {
          this.state.component === 'Restaurant_Add' && <FormAddRestaurant/>
        }
        {
          this.state.component === 'Order_List' && <OrderList/>
        }
        {
          this.state.component === 'Category_List' && <CategoryList/>
        }
      </View>
    )
  }
}
