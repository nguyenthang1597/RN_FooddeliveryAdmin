import React, { Component } from 'react'
import { View, Text } from 'react-native'
import LoginPage from './src/Components/LoginPage';
import TopBar from './src/Components/TopBar';
import Dashboard from './src/Components/Dashboard';
import firebase from '@firebase/app'
import '@firebase/auth'

var config = {
  apiKey: "AIzaSyCaswdFpvrdHXcsnq2Q7mRqjuWIgiFgyCI",
  authDomain: "fooddeliveryadmin-32946.firebaseapp.com",
  databaseURL: "https://fooddeliveryadmin-32946.firebaseio.com",
  projectId: "fooddeliveryadmin-32946",
  storageBucket: "fooddeliveryadmin-32946.appspot.com",
  messagingSenderId: "413834109009"
};

firebase.initializeApp(config);

export default class App extends Component {
  render() {
    return (
      <Dashboard />
    )
  }
}
