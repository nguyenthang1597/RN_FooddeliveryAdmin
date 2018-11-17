import React, { Component } from 'react'
import {View} from 'react-native'
import TopBar from './TopBar';
import SideMenu from './SideMenu';
import RestaurantList from './Restaurant/List'
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
      <View style={{flex: 1}}>
        <TopBar sideMenu={this.sideMenu}/>
        <SideMenu open={this.state.open} setComponent={this.setComponent}/>
        {
          this.state.component === 'Restaurant_List' && <RestaurantList/>
        }
      </View>
    )
  }
}
