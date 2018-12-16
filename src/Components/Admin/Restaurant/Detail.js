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
  Dimensions,
} from 'react-native'
import UpdateFood from '../../../API/UpdateFood'
import Delete from '../../../API/Delete'
import ImagePicker from "react-native-image-picker";
import Icon from 'react-native-vector-icons/FontAwesome'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'react-native-firebase';
const Blob = RNFetchBlob.polyfill.Blob;
window.Blob = Blob;
import UploadPicture from '../../../API/UploadPicture'
import UpdateRestaurant from '../../../API/UpdateRestaurant'

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window')

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
      foodId: null,
      id: props.navigation.state.params.id,
      modalTop: '20%',
      isAddFood: false,
      showDialogEditFood: false,
      editName : '',
      editPrice : '',
      editPhoToURL : null,
      editPhotoPicked: null,
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

  componentWillMount() {
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

  DialogEditFoodPickImage = () => {
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
          editPhotoPicked: res
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
    if (this.state.foodName === '' || this.state.foodPrice === '') {
      return;
    }

    if (this.state.foodPhotoUrl) {
      this.setState({ isAddFood: true })
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
        if (res.status === 200)
          Alert.alert('Success', "Add success")
        else
          Alert.alert('Fail', "Add fail")
        this.setState({
          visible: false,
          loading: true,
          foodName: '',
          foodPrice: '',
          foodPhotoUrl: '',
          isAddFood: false
        }, () => this.update())
      }).catch(err => {
        Alert.alert('Error', "Add failure")
        this.setState({
          visible: false,
          loading: true,
          foodName: '',
          foodPrice: '',
          foodPhotoUrl: '',
          isAddFood: false
        }, () => this.update())
      })
    }
  }

  DeleteRestaurant = () => {
    Delete(this.state.id, 'restaurant')
    .then(res => {
      if(res.status!==200)
        alert('Đánh dấu xoá không thành công');
      else
        alert('Đánh dấu xoá thành công');
    })
  }

  handleItemFoodClick = (Name, Price, urlImage, id) => {
    this.setState({
      showDialogEditFood: true,
      editName: Name,
      editPrice: Price,
      editPhoToURL: urlImage,
      foodId: id
    }, () => console.log(this.state))
  }

  UpdateInfoFood = () => {
    let foodName = this.state.editName;
    let foodPrice = this.state.editPrice;
    let foodImage;
    let _foodPhotoUrl;
    if (this.state.editPhotoPicked !== null) {
      foodImage = this.state.editPhotoPicked.uri;
    }
    else {
      foodImage = this.state.editPhoToURL;
    }

    if(this.state.editPhotoPicked !== null)
      UploadPicture(foodImage)
      .then(url => {
        return UpdateFood(this.state.foodId, foodName, url, foodPrice)
      }).then(res =>{
        if(res.status !== 200)
          alert('Không thành công');
        else
          alert('Thành công')
      })
    else {
      UpdateFood(this.state.foodId, foodName, foodImage, foodPrice)
      .then(res =>{
        if(res.status !== 200)
          alert('Không thành công');
        else
          alert('Thành công')
      })
    }
  }

  DeleteFood = () => {
    Delete(this.state.foodId, 'food')
    .then(res => {
      if(res.status!==200)
        alert('Đánh dấu xoá không thành công');
      else
        alert('Đánh dấu xoá thành công');
    })
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
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <TouchableOpacity style={{
          width: 120,
          height: 50,
          borderRadius: 20,
          marginLeft: 5,
          marginTop: 10,
          backgroundColor: 'green',
          marginBottom: 10
        }} onPress={() => this.updateInfo()}>
          <Text style={{
            lineHeight: 50,
            textAlign: 'center'
          }}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          width: 120,
          height: 50,
          marginLeft: 5,
          borderRadius: 20,
          marginTop: 10,
          backgroundColor: 'green',
          marginBottom: 10
        }} onPress={() => this.DeleteRestaurant()}>
          <Text style={{
            lineHeight: 50,
            textAlign: 'center'
          }}>Delete</Text>
        </TouchableOpacity>
      </View>

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
        <FlatList horizontal={true} data={this.state.menu} renderItem={({ item }) => <ItemList Name={item.Name} Price={item.Price} PhotoUrl={item.PhotoUrl}  handleItemFoodClick = {() => this.handleItemFoodClick(item.Name, item.Price, item.PhotoUrl, item.Id)}/>} keyExtractor={(i, index) => index.toString()} />
        <Modal transparent={true} visible={this.state.visible} animationType='slide' onRequestClose={() => this.setState({ visible: false })}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: this.state.modalTop,
          }}>
            <View style={{
              backgroundColor: 'white',
              width: WIDTH - 60,
              height: HEIGHT / 2,
              elevation: 5,
              position: 'relative',
              borderStyle: 'solid',
              borderWidth: 1,
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
                <View style={{ flex: 3 }}>
                  <TextInput style={Style.input} placeholder={"Tên món"} placeholderTextColor={'black'} onChangeText={(value) => this.setState({ foodName: value })} />
                  <TextInput style={Style.input} placeholder={"Giá tiền"} placeholderTextColor={'black'} onChangeText={(value) => this.setState({ foodPrice: value })} />
                </View>
                <View style={{ flex: 3, alignItems: 'center', justifyContent: "center" }}>
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.pickImageFoodHandler()} >
                    {(this.state.foodPhotoUrl === null) ? <Icon name='camera' size={35} /> : <Image style={{ width: WIDTH - 65, height: '100%', }} source={{ uri: this.state.foodPhotoUrl.uri }} />}
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  {this.state.isAddFood ? <ActivityIndicator size={"small"} color="black" /> :
                    <TouchableOpacity onPress={() => this.addFood()}>
                      <Text style={{ borderWidth: 1, fontSize: 18, padding: 10, paddingLeft: 40, paddingRight: 40, borderRadius: 50, backgroundColor: 'orange' }}>Add</Text>
                    </TouchableOpacity>}
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {/* Dialog update mon an */}
        <Modal transparent={true} visible={this.state.showDialogEditFood} animationType='slide'>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: this.state.modalTop,
          }}>
            <View style={{
              backgroundColor: 'white',
              width: WIDTH - 60,
              height: HEIGHT / 2,
              elevation: 5,
              position: 'relative',
              borderStyle: 'solid',
              borderWidth: 1,
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
              }} onPress={() => this.setState({ showDialogEditFood: false, editPhotoPicked: null})}>
                <Icon name='times' size={20} color='white' />
              </TouchableOpacity>
              <View style={{ flex: 1, padding: 5, marginTop: 28 }}>
                <View style={{ flex: 3 }}>
                  <TextInput style={Style.input} placeholder={"Tên món"} placeholderTextColor={'black'} onChangeText={(value) => this.setState({ editName: value })} value={this.state.editName}/>
                  <TextInput style={Style.input} placeholder={"Giá tiền"} placeholderTextColor={'black'} onChangeText={(value) => this.setState({ editPrice: value })} value={this.state.editPrice.toString()}/>
                </View>
                <View style={{ flex: 3, alignItems: 'center', justifyContent: "center" }}>
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.DialogEditFoodPickImage()} >
                    {(this.state.editPhotoPicked === null) ? <Image style={{ width: WIDTH - 65, height: 120, }} source={{ uri: this.state.editPhoToURL }} /> : <Image style={{ width: WIDTH - 65, height: 120, }} source={{ uri: this.state.editPhotoPicked.uri }} />}
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.UpdateInfoFood()}>
                      <Text style={{ borderWidth: 1, fontSize: 18, padding: 10, paddingLeft: 40, paddingRight: 40, borderRadius: 50, backgroundColor: 'orange' }}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.DeleteFood()}>
                      <Text style={{ borderWidth: 1, fontSize: 18, padding: 10, paddingLeft: 40, marginLeft: 5, paddingRight: 40, borderRadius: 50, backgroundColor: 'orange' }}>Delete</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    </View>)
  }
}

const ItemList = ({ Name, Price, PhotoUrl, handleItemFoodClick }) => (
  <TouchableOpacity onPress={handleItemFoodClick}>
    <ImageBackground source={{ uri: PhotoUrl }} style={{
      width: 200,
      height: 150,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }} imageStyle={{ width: 150, height: 150, left: 25 }}>
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
    </ImageBackground>
  </TouchableOpacity>)

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
