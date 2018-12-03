import React, { Component } from 'react'
import {View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
export default class TopBar extends Component {
  render() {
    return (
      <View style={{width: '100%', height: 40, backgroundColor: '#6200EE', position: 'relative'}}>
        <TouchableOpacity onPress={() => this.props.sideMenu()}>
          <Icon name='bars' size={30} style={{top: 5, left: 5}} color='white'/>
        </TouchableOpacity>
      </View>
    )
  }
}
