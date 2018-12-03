import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
export default class SideNav extends Component {
  render() {
    return (
      <View style={{position: 'absolute', top: 40, left: 0, backgroundColor: 'red', width: this.props.open ? '50%' : 0, height: this.props.open ? '100%' : 0, zIndex: 99}}>
        <Item title='Restaurant'>
            <SubItem title={'List'} onPress={() => this.props.setComponent('Restaurant_List')}/>
            <SubItem title={'Add new'} onPress={() => this.props.setComponent('Restaurant_Add')}/>
        </Item>
        <Item title='Catagory'>

        </Item>
      </View>
    )
  }
}

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
      <View style={{ position: 'relative', marginTop: 10, marginLeft: 10, position: 'relative' }}>
        <TouchableOpacity style={{flexDirection: 'row', display: 'flex'}} onPress={this.onClick}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
          {
            this.props.children ? this.state.click ? <Icon name='minus' size={20} style={{ left: 10, top: 5 }} /> : <Icon name='plus' size={20} style={{ left: 10, top: 5 }}/> : null
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
  return <TouchableOpacity onPress={onPress} style={{marginTop: 5, marginBottom: 5}}><Text style={{fontSize: 16}}>{title}</Text></TouchableOpacity>
}
