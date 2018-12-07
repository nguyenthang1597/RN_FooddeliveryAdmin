import React, {Component} from 'react';
import {View} from 'react-native';
import Login from './src/Containers/Login';
import Dashboard from './src/Components/Dashboard';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './src/Reducers';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {Router, Stack, Scene, ActionConst} from 'react-native-router-flux';
import {createLogger} from 'redux-logger';
import Detail from './src/Components/Restaurant/Detail'
import firebase from 'react-native-firebase'
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, logger));
import OrderDetail from './src/Components/Order/Detail';
var config = {
  appId: "1:413834109009:android:0146280af0ce712c",
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
    return (<Provider store={store}>
      <Router>
        <Stack key='root' hideNavBar={true}>
          <Scene key='Login' component={Login} initial="initial"/>
          <Scene key='Dashboard' component={Dashboard}/>
          <Scene key='Detail' component={Detail}/>
          <Scene key='OrderDetail' component={OrderDetail} />
        </Stack>
      </Router>
    </Provider>);
  }
}
