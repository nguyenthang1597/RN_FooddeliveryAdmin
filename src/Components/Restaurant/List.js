import React, { Component } from 'react'
import {View, FlatList, Text, Image, ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
const {width: WIDTH} = Dimensions.get('window')

export default class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading: true,
      restaurants: [],
      page: 1,
      perpage: 10,
      pages: null,
    }
  }

  async componentDidMount(){
    let res = await fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/list?page=1&perpage=10`)
    let result = await res.json();
    this.setState({
      restaurants: result.Restaurants,
      pages: result.pages,
      loading: false
    })
  }


  render() {
    console.log(this.state)
    return (
      <View style={{ position: 'relative', zIndex: 0}}>
        {this.state.loading && <ActivityIndicator size={'large'} color={'black'}/>}
        {
          !this.state.loading &&
          <FlatList
            data={this.state.restaurants}
            horizontal={false}
            numColumns={2}
            renderItem={({item, index}) => <ListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        }
      </View>
    )
  }
}

const ListItem = ({item}) =>
  <TouchableOpacity style={{flex: 1, marginTop: 7, marginLeft: 5 ,}} onPress={() => Actions.push('Detail', {id: item.Id})}>
    <Image source={{uri: `${item.PhotoUrl}`}} style={{width: WIDTH /2 - 10, height: 100}}/>
    <Text numberOfLines={2} style={{width: WIDTH / 2 - 10, fontWeight: '500', marginTop: 2}}>{item.Name}</Text>
  </TouchableOpacity>
