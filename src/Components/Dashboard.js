import React, { Component } from 'react'
import {View} from 'react-native'
import TopBar from './TopBar';
import SideNav from './SideNav';
import RestaurantList from './Restaurant/List'
import FormAddRestaurant from './Restaurant/FormAddRestaurant'
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      component: ''
    }
  }
  sideMenu = () => this.setState({open: !this.state.open})

  setComponent = component => this.setState({component: component, open: false})
  render() {
    return (
      // <Detail/>
      <View style={{flex: 1, position: 'relative', zIndex: 0}}>
        <TopBar sideMenu={this.sideMenu}/>
        <SideNav open={this.state.open} setComponent={this.setComponent}/>
        {
          this.state.component === 'Restaurant_List' && <RestaurantList/>
        }
        {
          this.state.component === 'Restaurant_Add' && <FormAddRestaurant/>
        }
      </View>
    )
  }
}
