import React, { Component } from 'react'
import {View, FlatList, Text, Image, ActivityIndicator, Dimensions, TouchableOpacity, RefreshControl} from 'react-native'
import {Actions} from 'react-native-router-flux'
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

export default class RestaurantList extends Component {
  componentDidMount(){
    this.props.getRestaurants(1, 10);
  }

  render() {
    return (
      <View style={{marginBottom: 5}}>
        {this.props.loading && <ActivityIndicator size={'large'} color={'black'}/>}
        {
          !this.props.loading &&
          <FlatList
            data={this.props.restaurants}
            style={{height: '100%', height: HEIGHT}}
            horizontal={false}
            numColumns={2}
            renderItem={({item, index}) => <ListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
								<RefreshControl
								refreshing={this.props.refresh}
								onRefresh={() => this.props.makeRefresh(1, 10)}
								/>
							}
            onEndReached={() => this.props.makeLoadmore(this.props.page, 10)}
						onEndReachedThreshold={0.1}
          />
        }
        <View style={{height: 5, width: WIDTH}}></View>
      </View>
    )
  }
}

const ListItem = ({item}) =>
  <TouchableOpacity style={{flex: 1, marginTop: 7, marginLeft: 5 , height: 160}} onPress={() => Actions.push('Detail', {id: item.Id})}>
    <Image source={{uri: `${item.PhotoUrl}`}} style={{width: WIDTH /2 - 10, height: 100}}/>
    <Text numberOfLines={2} style={{width: WIDTH / 2 - 10, fontWeight: '500', marginTop: 2}}>{item.Name}</Text>
  </TouchableOpacity>
