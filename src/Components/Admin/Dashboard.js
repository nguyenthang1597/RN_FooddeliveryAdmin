import React from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import CountRestaurant from '../../API/CountRestaurant'
import CountFood from '../../API/CountFood'
import CountByCategory from '../../API/CountByCategory'
import CountOrder from '../../API/CountOrder'
import CountOrderByState from '../../API/CountOrderByState'
class AdmimDashboard extends React.Component {
  state = {
    totalRes: null,
    totalFood: null,
    totalOrder: null,
    totalByCategory: [],
    totalByState: [],
    loading: true
  }
  async componentDidMount() {
    Promise.all([CountRestaurant(), CountFood(), CountByCategory(), CountOrder(), CountOrderByState()]).then(res => this.setState({totalRes: res[0].count, totalFood: res[1].count, totalByCategory: res[2], totalOrder: res[3].count, totalByState: res[4], loading: false}))
  }
  render () {
    console.log(this.state);
    return(
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{alignSelf: 'center'}}>
          <Text style={{fontSize: 30}}>Thống kê</Text>
        </View>
        {
          this.state.loading && <View><ActivityIndicator size='large' /></View>
        }
        {
          !this.state.loading && <View style={{paddingLeft: 20, paddingRight: 20}}>
            <View style={{display: 'flex', flexDirection: 'row', height: 50}}>
              <View style={{width: 180, borderBottomWidth: 1}}><Text style={{fontSize: 24, lineHeight: 50}}>Nhà hàng</Text></View>
              <View style={{flexGrow: 1, alignItems: 'center', borderBottomWidth: 1}}><Text style={{fontSize: 24, lineHeight: 50}}>{this.state.totalRes}</Text></View>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', height: 50}}>
              <View style={{width: 180, borderBottomWidth: 1}}><Text style={{fontSize: 24, lineHeight: 50}}>Số lượng món:</Text></View>
              <View style={{flexGrow: 1, alignItems: 'center', borderBottomWidth: 1}}><Text style={{fontSize: 24, lineHeight: 50}}>{this.state.totalFood}</Text></View>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', paddingLeft: 10}}>
            {
              this.state.totalByCategory.map((i,index )=> <View key={index} style={{display: 'flex', flexDirection: 'row', height:30}}>
                <View style={{width: 180}}><Text style={{fontSize: 16, lineHeight: 30}}>{i.Name}:</Text></View>
                <View style={{flexGrow: 1, alignItems: 'center'}}><Text style={{fontSize: 16, lineHeight: 30}}>{i.Total}</Text></View>
              </View>)
            }
            </View>
            <View style={{display: 'flex', flexDirection: 'row', height: 50}}>
              <View style={{width: 180, borderBottomWidth: 1}}><Text style={{fontSize: 24, lineHeight: 50}}>Đơn hàng:</Text></View>
              <View style={{flexGrow: 1, alignItems: 'center', borderBottomWidth: 1}}><Text style={{fontSize: 24, lineHeight: 50}}>{this.state.totalOrder}</Text></View>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', paddingLeft: 10}}>
            {
              this.state.totalByState.map((i,index )=> <View key={index} style={{display: 'flex', flexDirection: 'row', height:30}}>
                <View style={{width: 180}}><Text style={{fontSize: 16, lineHeight: 30}}>{i.State === 0 ? 'Đang chờ' : i.State === 1 ? 'Đang giao' : 'Đã nhận'}:</Text></View>
                <View style={{flexGrow: 1, alignItems: 'center'}}><Text style={{fontSize: 16, lineHeight: 30}}>{i.Count}</Text></View>
              </View>)
            }
            </View>
          </View>
        }
      </View>
    )
  }
}

export default AdmimDashboard;
