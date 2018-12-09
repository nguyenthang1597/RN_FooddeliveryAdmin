import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Picker,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  Modal,
  ActivityIndicator,
  Alert,
  Keyboard,
  Dimensions
} from 'react-native'
import ImagePicker from "react-native-image-picker";
import Icon from 'react-native-vector-icons/FontAwesome'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'react-native-firebase';
const Blob = RNFetchBlob.polyfill.Blob;
window.Blob = Blob;
import UploadPicture from '../../../API/UploadPicture'
import UpdateRestaurant from '../../../API/UpdateRestaurant'

const {height: HEIGHT} = Dimensions.get('window')

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      PhotoUrl: null,
      districts: [],
      wards: [],
      pickedImage: null,
      menu: [],
      visible: false,
      loading: true,
      foodName: null,
      foodPrice: null,
      foodPhotoUrl: null,
      id: props.navigation.state.params.id,
      modalTop: '20%'
    }
  }

  update = async () => {
    let res = await fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/${this.props.id}`);
    let data = await res.json();
    let resDistrict = await fetch('https://fooddeliveryadmin.herokuapp.com/address/districts');
    let districts = await resDistrict.json();
    let resMenu = await fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/${this.props.id}/menu`)
    let menu = await resMenu.json();
    this.setState({
      restaurant: data.Restaurant,
      districts,
      menu: menu.Menu
    }, async () => {
      let resWard = await fetch(`https://fooddeliveryadmin.herokuapp.com/address/ward?d=${this.state.restaurant.District}`);
      let wards = await resWard.json();
      this.setState({ wards, loading: false })
    })
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  async componentDidMount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    let res = await fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/${this.props.id}`);
    let data = await res.json();
    let resDistrict = await fetch('https://fooddeliveryadmin.herokuapp.com/address/districts');
    let districts = await resDistrict.json();
    let resMenu = await fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/${this.props.id}/menu`)
    let menu = await resMenu.json();
    this.setState({
      restaurant: data.Restaurant,
      districts,
      menu: menu.Menu
    }, async () => {
      let resWard = await fetch(`https://fooddeliveryadmin.herokuapp.com/address/ward?d=${this.state.restaurant.District}`);
      let wards = await resWard.json();
      this.setState({ wards, loading: false })
    })
  }

  keyboardWillShow = () => {
      this.setState({
        modalTop: '10%'
      })
  };

  keyboardWillHide = () => {
    this.setState({
      modalTop: '20%'
    })
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker({
      title: "Pick an Image",
      maxWidth: 800,
      maxHeight: 600
    }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({ pickedImage: res });
      }
    });
  }

  pickImageFoodHandler = () => {
    ImagePicker.showImagePicker({
      title: "Pick an Image",
      maxWidth: 800,
      maxHeight: 600
    }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          foodPhotoUrl: res
        }, () => console.log(this.state));
      }
    });
  }

  handleChange = (text, name) => {
    let res = this.state.restaurant;
    res[name] = text;
    this.setState({ restaurant: res })
  }

  updateInfo = async () => {
    if (this.state.pickedImage) {
      UploadPicture(this.state.pickedImage.uri)
        .then(url => {
          let restaurant = {
            ...this.state.restaurant,
            PhotoUrl: url
          };
          return UpdateRestaurant(restaurant);
        }).then(res => res.json())
        .then(json => {
          Alert.alert('Success', 'Update info success');
        })
        .catch(err => {
          Alert('Cập nhật không thành công');

        })
    }
    else {
      let restaurant = this.state.restaurant;
      UpdateRestaurant(restaurant)
        .then(res => {
          return res.json();
        }).then(json => Alert.aler('Success', 'Update info success')).catch(err => console.log(err))
    }
  }

  addFood = () => {
    if (this.state.foodPhotoUrl) {
      let uploadUri = this.state.foodPhotoUrl.uri;
      const imageRef = firebase.storage().ref('images/food').child(`${(new Date()).getTime()}`);

      return imageRef.put(uploadUri, { contentType: 'application/octet-stream' }).then(() => imageRef.getDownloadURL()).then(url => {
        let food = {
          Name: this.state.foodName,
          Price: Number.parseInt(this.state.foodPrice),
          PhotoUrl: url
        }
        return fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/${this.props.id}/menu`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(food)
        })
      }).then(res => {
        Alert.alert('Success', "Add success")
        this.setState({
          visible: false,
          loading: true,
          foodName: '',
          foodPrice: '',
          foodPhotoUrl: ''
        }, () => this.update())
      }).catch(err => {
        Alert.alert('Error', "Add failure")
        this.setState({
          visible: false,
          loading: true,
          foodName: '',
          foodPrice: '',
          foodPhotoUrl: ''
        }, () => this.update())
      })
    }
  }

  handleDistrictChange = async (value) => {
    let resWard = await fetch(`https://fooddeliveryadmin.herokuapp.com/address/ward?d=${value}`);
    let wards = await resWard.json();
    this.setState({ wards })
  }
  render() {
    const { loading } = this.state;

    if (loading)
      return (<View style={{
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size='large' color='black' />
      </View>)

    return (<View style={Style.container}>
      <TouchableOpacity style={{
        width: '100%',
        height: 200,
        position: 'relative',
        backgroundColor: '#cecece'
      }} onPress={this.pickImageHandler}>
        <Image source={this.state.pickedImage
          ? this.state.pickedImage
          : ({ uri: this.state.restaurant.PhotoUrl })} style={{
            height: 180,
            width: 180,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [
              {
                translateX: -90
              }, {
                translateY: -90
              }
            ],
            borderRadius: 90,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'white'
          }} />
      </TouchableOpacity>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TextInput value={this.state.restaurant.Name} style={{
          fontSize: 16
        }} name='Name' onChangeText={text => this.handleChange(text, 'Name')} placeholder='Restaurant Name' />
        <View style={{
          flexDirection: 'row',
          width: '100%',
          height: 40,
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          borderStyle: 'solid'
        }}>
          <Picker style={{
            width: '48%',
            height: 40,
            marginLeft: '1%',
            marginRight: '1%'
          }} selectedValue={this.state.restaurant.District} onValueChange={(itemValue, index) => {
            this.handleChange(itemValue, 'District');
            this.handleDistrictChange(itemValue)
          }}>
            {this.state.districts.map((item, index) => <Picker.Item key={index} label={item.name} value={item.name} />)}
          </Picker>
          <Picker style={{
            width: '48%',
            height: 40,
            marginLeft: '1%',
            marginRight: '1%',
            borderBottomWidth: 1,
            borderBottomColor: 'black'
          }} onValueChange={(itemValue, index) => this.handleChange(itemValue, 'Ward')} selectedValue={this.state.restaurant.Ward}>
            {this.state.wards.map((item, index) => <Picker.Item key={index} label={item.name} value={item.name} />)}
          </Picker>
        </View>
        <View style={{
          flexDirection: 'row',
          width: '100%',
          height: 40,
          marginBottom: 5
        }}>
          <TextInput style={{
            width: '48%',
            height: 40,
            marginLeft: '1%',
            marginRight: '1%'
          }} value={this.state.restaurant.Street} onChangeText={text => this.handleChange(text, 'Street')} placeholder="Street" />
          <TextInput style={{
            width: '48%',
            height: 40,
            marginLeft: '1%',
            marginRight: '1%'
          }} value={this.state.restaurant.Number} onChangeText={text => this.handleChange(text, 'Number')} placeholder='Number' />
        </View>
        <View style={{
          flexDirection: 'row',
          width: '100%',
          height: 40,
          marginTop: 5,
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          borderStyle: 'solid'
        }}>
          <TextInput style={{
            width: '48%',
            height: 40,
            marginLeft: '1%',
            marginRight: '1%'
          }} value={this.state.restaurant.OpenTime} onChangeText={text => this.handleChange(text, 'OpenTime')} placeholder="Open time" />
          <TextInput style={{
            width: '48%',
            height: 40,
            marginLeft: '1%',
            marginRight: '1%'
          }} value={this.state.restaurant.CloseTime} onChangeText={text => this.handleChange(text, 'CloseTime')} placeholder="Close time" />
        </View>
      </View>
      <TouchableOpacity style={{
        width: 120,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 50,
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: 'green',
        marginBottom: 10
      }} onPress={() => this.updateInfo()}>
        <Text style={{
          lineHeight: 50,
          textAlign: 'center'
        }}>Update</Text>
      </TouchableOpacity>
      <View style={{
        width: '100%'
      }}>
        <View style={{
          width: '100%',
          height: 30,
          backgroundColor: 'orange',
          flexDirection: 'row',
          marginBottom: 10
        }}>
          <Text style={{
            lineHeight: 30,
            fontSize: 18,
            flexGrow: 1
          }}>Menu</Text>
          <TouchableOpacity onPress={() => this.setState({ visible: true })}>
            <Icon name="plus" size={18} style={{
              lineHeight: 30,
              marginRight: 5
            }} />
          </TouchableOpacity>
        </View>
        <FlatList horizontal={true} data={this.state.menu} renderItem={({ item }) => <ItemList Name={item.Name} Price={item.Price} PhotoUrl={item.PhotoUrl} />} keyExtractor={(i, index) => index.toString()} />
        <Modal transparent={true} visible={this.state.visible} animationType='slide' onRequestClose={() => this.setState({ visible: false })}>
          <View style={{
            backgroundColor: 'white',
            width: '80%',
            height: HEIGHT /2,
            top: this.state.modalTop,
            left: '10%',
            elevation: 5,
            position: 'relative',
            borderStyle: 'solid',
            borderWidth: 1
          }}>
            <TouchableOpacity style={{
              width: 24,
              height: 24,
              top: '2%',
              right: '2%',
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center'
            }} onPress={() => this.setState({ visible: false })}>
              <Icon name='times' size={20} color='white' />
            </TouchableOpacity>
            <View style={{ flex: 1, padding: 5, marginTop: 28 }}>
              <View style={{ flex: 3}}>
                <TextInput style={Style.input} placeholder={"Tên món"} placeholderTextColor={'black'}/>
                <TextInput style={Style.input} placeholder={"Giá tiền"} placeholderTextColor={'black'}/>
              </View>
              <View style={{ flex: 3, alignItems: 'center', justifyContent: "center" }}>
                <TouchableOpacity>
                  <Icon name='camera' size={35} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity>
                  <Text style={{borderWidth: 1, fontSize: 18, padding: 10, paddingLeft: 40, paddingRight: 40, borderRadius: 50, backgroundColor: 'orange'}}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>)
  }
}

const ItemList = ({ Name, Price, PhotoUrl }) => (<ImageBackground source={{
  uri: PhotoUrl
}} style={{
  width: 200,
  height: 150,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}} imageStyle={{
  width: 150,
  height: 150,
  left: 25
}}>
  <View style={{
    width: 150
  }}>
    <Text style={{
      fontSize: 20,
      color: 'white',
      textAlign: 'center'
    }}>{Name}</Text>
    <Text style={{
      fontSize: 16,
      color: 'white',
      textAlign: 'center'
    }}>{Price}</Text>
  </View>
</ImageBackground>)

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.4)',
    color: 'black',
    marginTop: 10
  }
})
