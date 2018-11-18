import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Picker, FlatList, Image, TouchableOpacity, Text, ImageBackground, Modal, ActivityIndicator, Alert } from 'react-native'
import ImagePicker from "react-native-image-picker";
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.Blob = Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      districts: [],
      wards: [],
      pickedImage: null,
      menu: [],
      visible: false,
      loading: true,
      foodName: null,
      foodPrice: null,
      foodPhotoUrl: null
    }
  }

  update = async () => {
    let res = await fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/10`);
    let data = await res.json();
    let resDistrict = await fetch('https://fooddeliveryadmin.herokuapp.com/address/districts');
    let districts = await resDistrict.json();
    let resMenu = await fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/10/menu`)
    let menu = await resMenu.json();
    this.setState({
      restaurant: data.Restaurant,
      districts,
      menu: menu.Menu
    }, async () => {
      let resWard = await fetch(`https://fooddeliveryadmin.herokuapp.com/address/ward?d=${this.state.restaurant.District}`);
      let wards = await resWard.json();
      this.setState({
        wards,
        loading: false
      })
    })
  }

  async componentDidMount() {
    let res = await fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/10`);
    let data = await res.json();
    let resDistrict = await fetch('https://fooddeliveryadmin.herokuapp.com/address/districts');
    let districts = await resDistrict.json();
    let resMenu = await fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/10/menu`)
    let menu = await resMenu.json();
    this.setState({
      restaurant: data.Restaurant,
      districts,
      menu: menu.Menu
    }, async () => {
      let resWard = await fetch(`https://fooddeliveryadmin.herokuapp.com/address/ward?d=${this.state.restaurant.District}`);
      let wards = await resWard.json();
      this.setState({
        wards,
        loading: false
      })
    })
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: res
        });
      }
    });
  }

  pickImageFoodHandler = () => {
    ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
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
    if (this.state.pickedImage.uri) {
      const uploadUri = this.state.pickedImage.uri;
      let uploadBlob = null;
      const imageRef = firebase.storage().ref('images/restaurant').child('10');
      return Blob.build(this.state.pickedImage.data, { type: `application/octet-stream;BASE64` })
        .then(blob => {
          uploadBlob = blob;
          console.log(uploadBlob)
          return imageRef.put(uploadBlob, { contentType: 'application/octet-stream' })
        }).then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        }).then(url => {
          let restaurant = { ...this.state.restaurant, PhotoUrl: url };
          console.log(restaurant)
          return fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/10`, {
            method: 'PUT',

            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurant)
          }).then(res => {
            return res.json();
          }).then(json => console.log(json))

        }).catch(err => {
          console.log(err)
        })
    }
    else {
      let restaurant = this.state.restaurant;
      return fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/10`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurant)
          }).then(res => {
            return res.json();
          }).then(json => console.log(json))
          .catch(err => console.log(err))
    }
  }

  addFood = () => {
    if(this.state.foodPhotoUrl){
      console.log(this.state)
      let uploadBlob = null;
      const imageRef = firebase.storage().ref('images/food').child(`${(new Date()).getTime()}`);
      return Blob.build(this.state.foodPhotoUrl.data, { type: `application/octet-stream;BASE64` })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(uploadBlob, { contentType: 'application/octet-stream' })
      }).then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      }).then(async url => {
        let food = {
          Name: this.state.foodName,
          Price: Number.parseInt(this.state.foodPrice),
          PhotoUrl: url
        }
        try {
          let res = await fetch(`https://fooddeliveryadmin.herokuapp.com/restaurant/10/menu`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(food)
          })
          alert('Success');
          this.setState({visible: false, loading: true,foodName: '', foodPrice: '', foodPhotoUrl: ''}, () => this.update())
        } catch (error) {
          alert('Error');
          this.setState({visible: false})
        }
      })
    }
    
  }



  handleDistrictChange = async (value) => {
    let resWard = await fetch(`https://fooddeliveryadmin.herokuapp.com/address/ward?d=${value}`);
    let wards = await resWard.json();
    this.setState({
      wards
    })
  }
  render() {
    const { loading } = this.state;
    if (loading)
      return (
        <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='black' />
        </View>
      )
    return (
      <View style={Style.container}>
          <TouchableOpacity style={{ width: '100%', height: 200, position: 'relative', backgroundColor: '#cecece' }} onPress={this.pickImageHandler}>
            <Image source={this.state.pickedImage ? this.state.pickedImage : ({ uri: this.state.restaurant.PhotoUrl })} style={{ height: 180, width: 180, position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -90 }, { translateY: -90 }], borderRadius: 90, borderWidth: 2, borderStyle: 'solid', borderColor: 'white' }} />
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TextInput value={this.state.restaurant.Name} style={{ fontSize: 16 }} name='Name' onChangeText={text => this.handleChange(text, 'Name')} placeholder='Restaurant Name' />
            <View style={{ flexDirection: 'row', width: '100%', height: 40, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'black', borderStyle: 'solid' }}>
              <Picker style={{ width: '48%', height: 40, marginLeft: '1%', marginRight: '1%', }} selectedValue={this.state.restaurant.District} onValueChange={(itemValue, index) => { this.handleChange(itemValue, 'District'); this.handleDistrictChange(itemValue) }} >
                {
                  this.state.districts.map((item, index) => <Picker.Item key={index} label={item.name} value={item.name} />)
                }
              </Picker>
              <Picker style={{ width: '48%', height: 40, marginLeft: '1%', marginRight: '1%', borderBottomWidth: 1, borderBottomColor: 'black' }} onValueChange={(itemValue, index) => this.handleChange(itemValue, 'Ward')} selectedValue={this.state.restaurant.Ward}>
                {
                  this.state.wards.map((item, index) => <Picker.Item key={index} label={item.name} value={item.name} />)
                }
              </Picker>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, marginBottom: 5 }}>
              <TextInput style={{ width: '48%', height: 40, marginLeft: '1%', marginRight: '1%' }} value={this.state.restaurant.Street} onChangeText={text => this.handleChange(text, 'Street')} placeholder="Street" />
              <TextInput style={{ width: '48%', height: 40, marginLeft: '1%', marginRight: '1%' }} value={this.state.restaurant.Number} onChangeText={text => this.handleChange(text, 'Number')} placeholder='Number' />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'black', borderStyle: 'solid' }}>
              <TextInput style={{ width: '48%', height: 40, marginLeft: '1%', marginRight: '1%' }} value={this.state.restaurant.OpenTime} onChangeText={text => this.handleChange(text, 'OpenTime')} placeholder="Open time" />
              <TextInput style={{ width: '48%', height: 40, marginLeft: '1%', marginRight: '1%' }} value={this.state.restaurant.CloseTime} onChangeText={text => this.handleChange(text, 'CloseTime')} placeholder="Close time" />
            </View>
          </View>
          <TouchableOpacity style={{ width: 120, marginLeft: 'auto', marginRight: 'auto', height: 50, borderRadius: 20, marginTop: 10, backgroundColor: 'green', marginBottom: 10 }} onPress={() => this.updateInfo()}>
            <Text style={{ lineHeight: 50, textAlign: 'center' }}>Update</Text>
          </TouchableOpacity>
          <View style={{ width: '100%' }}>
            <View style={{ width: '100%', height: 30, backgroundColor: 'orange', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ lineHeight: 30, fontSize: 18, flexGrow: 1 }}>Menu</Text>
              <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                <Icon name="plus" size={18} style={{ lineHeight: 30, marginRight: 5 }} />
              </TouchableOpacity>
            </View>
            <FlatList horizontal={true}
              data={this.state.menu}
              renderItem={({ item }) => <ItemList Name={item.Name} Price={item.Price} PhotoUrl={item.PhotoUrl} />}
              keyExtractor={(i, index) => index.toString()}
            />
            <Modal transparent={true} visible={this.state.visible} animationType='slide' onRequestClose={() => this.setState({ visible: false })}>
              <View style={{ backgroundColor: 'white', width: '80%', height: '50%', top: '20%', left: '10%', elevation: 5, position: 'relative', borderStyle: 'solid', borderWidth: 1 }}>
                <TouchableOpacity style={{ width: 24, height: 24, top: '2%', right: '2%', position: 'absolute', backgroundColor: 'red', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ visible: false })}>
                  <Icon name='times' size={20} color='white' />
                </TouchableOpacity>
                <View style={{ position: 'absolute', top: '10%', left: 0, width: '100%', height: '100%' }}>
                  <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%' }}>
                    <View style={{ position: 'absolute', width: '50%', height: '100%' }}>
                      <TextInput placeholder='Name' style={{ position: 'absolute', top: 0, width: '100%', height: 50, padding: 10 }} onChangeText={text => this.setState({foodName: text})} value={this.state.foodName} />
                      <TextInput placeholder='Price' style={{ position: 'absolute', top: 55, width: '100%', height: 50, padding: 10 }} onChangeText={text => this.setState({foodPrice: text})} value={this.state.foodPrice}/>
                    </View>
                    <View style={{ position: 'absolute', width: '50%', height: '100%', left: '50%'}}>
                      {
                        this.state.foodPhotoUrl && <View style={{width: '100%', top: 0 }}>
                          <Image source={{ uri: this.state.foodPhotoUrl.uri }} style={{ width: 120, height: 120 }} />
                        </View>
                      }
                      {
                        !this.state.foodPhotoUrl && <TouchableOpacity style={{ width: 120, height: 50, top: '25%'}} onPress={() => this.pickImageFoodHandler()}>
                          <Text style={{ textAlign: 'center' }}>Picture</Text>
                        </TouchableOpacity>
                      }
                    </View>
                  </View>
                  <TouchableOpacity style={{width: 120, height: 60, top: '55%', left: '50%', transform: [{translateX: -60}]}} onPress={() => this.addFood()}>
                  <Text style={{textAlign: 'center'}}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
      </View>
    )
  }
}

const ItemList = ({ Name, Price, PhotoUrl }) => (

  <ImageBackground source={{ uri: PhotoUrl }} style={{ width: 200, height: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} imageStyle={{ width: 150, height: 150, left: 25 }} >
    <View style={{ width: 150 }}>
      <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>{Name}</Text>
      <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>{Price}</Text>
    </View>
  </ImageBackground>
)





const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  }
})