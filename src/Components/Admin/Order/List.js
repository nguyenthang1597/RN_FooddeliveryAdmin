import React, { Component } from 'react'
import { View, FlatList, Text, ActivityIndicator, StyleSheet, TouchableOpacity,RefreshControl } from 'react-native'
import { Actions } from 'react-native-router-flux'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'
export default class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orders: [],
      refreshing: false,
    }
  }

  async componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    let res = await fetch(`https://fooddeliveryadmin.herokuapp.com/order/list`);
    let data = await res.json();
    this.setState({
      loading: false,
      orders: data.data,
      refreshing: false,
    })
  }


  render() {
    return (
      <View style={{ position: 'relative', zIndex: 0 }}>
        {this.state.loading && <ActivityIndicator size={'large'} color={'black'} />}
        {
          !this.state.loading &&
          <FlatList
            data={this.state.orders}
            horizontal={false}
            refreshControl={
								<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={() => {this.setState({refreshing: true});this.loadData()}}
								/>
							}
            renderItem={({ item, index }) => <ListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        }
      </View>
    )
  }
}

const ListItem = ({ item }) =>
  <TouchableOpacity style={{ flex: 1, flexDirection: "row", marginTop: 7, marginLeft: 5, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.3)', marginBottom: 5 }} onPress={() => Actions.push('OrderDetail', { id: item.Id })}>
    <View style={{flex: 3 }}>
      <Text style={styles.orderText}>{item.Name}</Text>
      <Text style={styles.orderText}>{item.District} - {item.Ward} - {item.Street} - {item.Number}</Text>
      <Text style={styles.orderText}>{moment(item.BookAt).format('hh:mm:ss - DD/MM/YYYY')}</Text>
    </View>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name='truck' size={30}  color= {item.State === 0 ? 'red' : item.State === 1 ? 'yellow' : 'green'}/>
      <Text style= {[styles.orderText, {marginTop: 5}]}>{item.State === 0 ? 'Đang chờ' : item.State === 1 ? 'Đang giao' : 'Đã nhận'}</Text>
    </View>


  </TouchableOpacity>

const styles = StyleSheet.create({
  orderText: {
    fontSize: 16,
    color: 'black'
  }
})
