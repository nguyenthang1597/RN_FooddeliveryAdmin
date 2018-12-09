import React from 'react'
import {View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image} from 'react-native'
class CategoryList extends React.Component {
  state = {
    loading: true,
    categories: []
  }

  async componentDidMount() {
    let res = await fetch(`https://fooddeliveryadmin.herokuapp.com/category/list`);
    let data = await res.json();
    this.setState({categories: data, loading: false})
  }

  render () {
    return (
      <View style={{ position: 'relative', zIndex: 0}}>
        {this.state.loading && <ActivityIndicator size={'large'} color={'black'}/>}
        {
          !this.state.loading && <FlatList
            data={this.state.categories}
            horizontal={false}
            renderItem={({item, index}) => <ListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => <View style={{flex: 1, marginTop: 7, marginLeft: 5, flexDirection: 'row', height: 40}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 24, fontWeight: '600'}}>Id</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 24, fontWeight: '600'}}>Tên</Text>
              </View>
            </View>}
          />
        }
      </View>)
  }
}

const ListItem = ({item}) =>
  <TouchableOpacity style={{flex: 1, marginTop: 7, marginLeft: 5, flexDirection: 'row', height: 40}}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{item.Id}</Text>
    </View>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{item.Name}</Text>
    </View>
  </TouchableOpacity>

export default CategoryList;
