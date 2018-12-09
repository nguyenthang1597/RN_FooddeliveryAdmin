import React, { Component } from 'react'
import { View, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
export default class TopBar extends Component {
  SignOut = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn đăng xuất',
      [
        {text: 'Hủy'},
        {text: 'Vâng', onPress: () => {this.props.logout(); Actions.Login({type: "reset"})}},
      ]
    )
  }

  render() {
    return (
      <View style={{ width: '100%', height: 50, backgroundColor: '#6200EE', position: 'relative', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => this.props.sideMenu()}>
          <Icon name='bars' size={35} style={{ marginLeft: 7 }} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.SignOut()}>
          <Icon name='sign-out' size={35} style={{ marginRight: 7 }} color='white' />
        </TouchableOpacity>
      </View>
    )
  }
}
