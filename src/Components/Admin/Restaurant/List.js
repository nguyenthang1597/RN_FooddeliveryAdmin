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
          <FlatList
            data={this.props.restaurants}
            style={{height: HEIGHT - 65}}
            horizontal={false}
            numColumns={2}
            renderItem={({item, index}) => <ListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
								<RefreshControl
								refreshing={this.props.refresh}
								onRefresh={() => this.props.makeRefresh(1, 8)}
								/>
							}
            onEndReached={() => this.props.makeLoadmore(this.props.page, 8)}
						onEndReachedThreshold={0.0001}
          />
        {this.props.loadmore && <View style={{position: 'absolute', top: (HEIGHT - 150), left: '50%', backgroundColor: 'reds', zIndex: 100, transform: [{translateX: -18}], width: 40, height: 40, borderRadius: 20, backgroundColor: 'white', elevation: 5, flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'black'}/></View>}
      </View>
    )
  }
}

const ListItem = ({item}) =>
  <TouchableOpacity style={{flex: 1, marginTop: 5, marginLeft: 5 , height: 160, marginBottom: 5}} onPress={() => Actions.push('Detail', {id: item.Id})}>
    <Image source={{uri: `${item.PhotoUrl}`}} style={{width: WIDTH /2 - 10, height: 120}}/>
    <Text numberOfLines={2} style={{width: WIDTH / 2 - 10, fontWeight: '500', marginTop: 2}}>{item.Name}</Text>
  </TouchableOpacity>
