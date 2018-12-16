import React from 'react'
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native'

class OrderDetail extends React.Component {
  state = {
    loading: true,
    data: []
  }

  async componentDidMount() {
    let res = await fetch(`https://fooddeliveryadmin.herokuapp.com/order/detail?id=${this.props.id}`)
    let data = await res.json();
    this.setState({
      loading: false,
      data
    })
  }
  render() {
    console.log(this.state);
    let tongHoaDon = 0;
    if(this.state.data.length != 0) {
      for(let i =0 ;i< this.state.data.length ;i++) {
        tongHoaDon += parseInt(this.state.data[i].Price);
      }
    }

    return (
      <View style={{ zIndex: 0, flex: 1, width: '100%', height: '100%' }}>
        {this.state.loading && <ActivityIndicator size={'large'} color={'black'} />}
        {
          !this.state.loading &&
          <FlatList
            data={this.state.data}
            horizontal={false}
            renderItem={({ item, index }) => <ListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        }
        <View style = {{flexDirection: "row", justifyContent: "space-between", padding: 10}}>
            <Text style={styles.hoadon}>
              Tổng hóa đơn: 
            </Text>
            <Text style={styles.hoadon}>
              {tongHoaDon} VND
            </Text>
        </View>
      </View>
    )
  }
}


const ListItem = ({ item }) => (
  <View style={{ flexDirection: "row" , margin: 5, padding: 2}}>
    <View>
      <Image source={{ uri: item.PhotoUrl }} style={{ width: 80, height: 80 }} />
    </View>
    <View style={{marginLeft: 5, width: '100%', justifyContent: 'space-between'}}>
      <Text style={styles.detailText}>{item.Name}</Text>
      <Text style={styles.detailText}>Số lượng: {item.Quatity}</Text>
      <Text style={styles.detailText}>Tổng tiền: {item.Price} VND</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  detailText: {
    fontSize: 16,
    color: 'black'
  },
  hoadon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  }

})

export default OrderDetail;