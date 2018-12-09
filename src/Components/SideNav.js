import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
const SideNav  = ({setComponent, open, logout}) => {
  return (
    <View style={{position: 'absolute', top: 50, left: 0,backgroundColor: '#6200EE', width: open ? '65%' : 0, height: open ? '100%' : 0, zIndex: 99, borderTopWidth: 1, borderTopColor: 'white'}}>
        <Item title='Trang chính' onPress={() => setComponent('')}>

        </Item>
        <Item title='Restaurant'>
            <SubItem title={'List'} onPress={() => setComponent('Restaurant_List')}/>
            <SubItem title={'Add new'} onPress={() => setComponent('Restaurant_Add')}/>
        </Item>
        <Item title='Catagory'>
            <SubItem title={'List'} onPress={() => setComponent('Category_List')}/>
        </Item>
        <Item title='Order'>
          <SubItem title='List' onPress={() => setComponent('Order_List')} />
        </Item>
    </View>
  )
}

export default SideNav;
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false
    }
  }

  onClick = () => this.setState({click: !this.state.click})

  render() {
    const {title} = this.props;
    return (
      <View style={{ position: 'relative', marginTop: 10, marginLeft: 10}}>
        <TouchableOpacity style={{flexDirection: 'row', display: 'flex'}} onPress={() => this.props.children ? this.onClick() : this.props.onPress()}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{title}</Text>
          {
            this.props.children ? this.state.click ? <Icon name='minus' size={20} style={{ left: 10, top: 5 }} color='white'/> : <Icon name='plus' size={20} style={{ left: 10, top: 5 }} color='white'/> : null
          }
        </TouchableOpacity>
        {
          this.state.click && <View style={{marginLeft: 30}}>{this.props.children}</View>
        }
      </View>
    )
  }
}

const SubItem = ({title, onPress}) => {
  return <TouchableOpacity onPress={onPress} style={{marginTop: 5, marginBottom: 5}}><Text style={{fontSize: 18, color: 'white'}}>{title}</Text></TouchableOpacity>
}
