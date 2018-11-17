import React, { Component } from 'react'
import {View, Text} from 'react-native'
import LoginPage from './src/Components/LoginPage';
import TopBar from './src/Components/TopBar';
import Dashboard from './src/Components/Dashboard';
export default class App extends Component {
  render() {
    return (
      <Dashboard/>
    )
  }
}
