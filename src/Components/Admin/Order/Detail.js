import React from 'react'
import {View, Text, FlatList, ActivityIndicator, Image} from 'react-native'
class OrderDetail extends React.Component {
  state = {
    loading: true,
    data: []
  }

  async componentDidMount(){
    let res = await fetch(`https://fooddeliveryadmin.herokuapp.com/order/detail?id=${this.props.id}`)
    let data = await res.json();
    this.setState({
      loading: false,
      data
    })
  }
  render () {
    console.log(this.state);
    return(
      <View style={{zIndex: 0, flex: 1, width: '100%',height: '100%'}}>
        {this.state.loading && <ActivityIndicator size={'large'} color={'black'}/>}
        {
          !this.state.loading &&
          <FlatList
            data={this.state.data}
            horizontal={false}
            renderItem={({item, index}) => <ListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        }
      </View>
    )
  }
}


const ListItem = ({item}) => (
  <View>
    <Image source={{uri: item.PhotoUrl}} style={{width: 80, height: 80}}/>
    <Text>{item.Name}</Text>
    <Text>{item.Quatity}</Text>
    <Text>{item.Price}</Text>
  </View>
)


export default OrderDetail;
