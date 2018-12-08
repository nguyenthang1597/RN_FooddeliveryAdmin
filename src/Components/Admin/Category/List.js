import React from 'react'
import {View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image} from 'react-native'
class CategoryList extends React.Component {
  state = {
    loading: true,
    categories: []
  }

  async componentDidMount() {
    let res = await fetch(`https://fooddeliveryadmin.herokuapp.com/category/getAll`);
    let data = await res.json();
    this.setState({categories: data, loading: false})
  }

  render () {
    return (
      <View style={{ position: 'relative', zIndex: 0}}>
        {this.state.loading && <ActivityIndicator size={'large'} color={'black'}/>}
        {
          !this.state.loading &&
          <FlatList
            data={this.state.categories}
            horizontal={false}
            renderItem={({item, index}) => <ListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        }
      </View>)
  }
}

const ListItem = ({item}) =>
  <TouchableOpacity style={{flex: 1, marginTop: 7, marginLeft: 5 ,}}>
    <Text>{item.Name}</Text>
    <Image source={{uri: item.PhotoUrl}} style={{width: 100, height: 100}}/>
  </TouchableOpacity>

export default CategoryList;
