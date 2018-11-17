import React, { Component } from 'react'
import { View, StyleSheet, Text, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import loginBackground from '../images/loginBackground.png'
export default class LoginPage extends Component {
  render() {
    return (
      <ImageBackground source={loginBackground} style={{ width: '100%', height: '100%' }}>
        <View style={style.loginContainer}>
          <View style={style.form}>
            <Text style={{marginTop: 10, fontSize: 30, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Login</Text>
            <View style={{position: 'relative', marginTop: 50}}>
            <View style={style.Input}>
              <TextInput style={{ paddingLeft: 30, backgroundColor: 'white', height: 40, width: '90%', marginLeft: 'auto', marginRight: 'auto', borderRadius: 20 }} />
              <Icon name="user-tie" size={25} style={{ position: 'absolute', left: 20, top: 5 }} />
            </View>
            <View style={style.Input}>
              <TextInput style={{ paddingLeft: 30, backgroundColor: 'white', height: 40, width: '90%', marginLeft: 'auto', marginRight: 'auto', borderRadius: 20 }} />
              <Icon name="key" size={25} style={{ position: 'absolute', left: 20, top: 5 }} />
            </View>
            </View>
            <TouchableOpacity style={{ position: 'relative', marginTop: 30, width: '40%', height: 30, marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'pink', borderRadius: 15}}>
              <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500'}}>Login</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    )
  }
}


const style = StyleSheet.create({
  loginContainer: {
    flex: 1,
    position: 'relative'
  },
  form: {
    width: 300,
    height: 300,
    backgroundColor: 'rgba(255,255,255, 0.1)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -150 },
      { translateY: -150 }
    ]
  },
  Input: {
    width: '100%',
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative'
  }
})


