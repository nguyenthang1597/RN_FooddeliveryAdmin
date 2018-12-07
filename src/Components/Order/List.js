import React, { Component } from 'react'
import {View, FlatList, Text, Image, ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import moment from 'moment';
export default class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading: true,
      orders: [],
    }
  }

  async componentDidMount(){
    let res = await fetch(`https://fooddeliveryadmin.herokuapp.com/order/getAll`);
    let data = await res.json();
    this.setState({
      loading: false,
      orders: data
    })
  }


  render() {
    return (
      <View style={{ position: 'relative', zIndex: 0}}>
        {this.state.loading && <ActivityIndicator size={'large'} color={'black'}/>}
        {
          !this.state.loading &&
          <FlatList
            data={this.state.orders}
            horizontal={false}
            renderItem={({item, index}) => <ListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        }
      </View>
    )
  }
}

const ListItem = ({item}) =>
  <TouchableOpacity style={{flex: 1, marginTop: 7, marginLeft: 5 ,}} onPress={() => Actions.push('OrderDetail', {id: item.Id})}>
    <Text>{item.Name}</Text>
    <Text>{item.District} - {item.Ward} - {item.Street} - {item.Number}</Text>
    <Text>{moment(item.BookAt).format('hh:mm:ss - DD/MM/YYYY')}</Text>
  </TouchableOpacity>
