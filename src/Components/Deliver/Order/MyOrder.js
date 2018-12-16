import React, { Component } from 'react'
import moment from 'moment'
import { View, FlatList, Text, ActivityIndicator, Dimensions, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux';
import GetOrderOfDeliver from '../../../API/GetOrderOfDeliver'
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default class MyOrder extends Component {

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
      console.log(this.props);
      GetOrderOfDeliver(this.props.token)
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(data => this.setState({
          loading: false,
          orders: data.Data,
          refreshing: false,
      }))
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
                                onRefresh={() => { this.setState({ refreshing: true }); this.loadData() }}
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
    <TouchableOpacity style={{ flex: 1, flexDirection: "row", marginTop: 7, marginLeft: 5, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.3)', marginBottom: 5 }} onPress={() => Actions.push('MyDeliverOrderDetail', { id: item.Id })}>
        <View style={{ flex: 3 }}>
            <Text style={styles.orderText}>{item.Name}</Text>
            <Text style={styles.orderText}>{item.District} - {item.Ward} - {item.Street} - {item.Number}</Text>
            <Text style={styles.orderText}>{moment(item.BookAt).format('hh:mm:ss - DD/MM/YYYY')}</Text>
        </View>
    </TouchableOpacity>

const styles = StyleSheet.create({
    orderText: {
      fontSize: 16,
      color: 'black'
    }
  })
