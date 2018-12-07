import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Picker, Alert } from 'react-native';
import ImagePicker from "react-native-image-picker";
class FormAddRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImage: false,
            Name: '',
            District: 'Quận 1',
            Ward: 'Phường Tân Định',
            Street: '',
            Number: '',
            PhotoUrl: '',
            Districts: [],
            Wards: [],
            pickedImage: null
        };
    }

    async componentDidMount() {
      let resDistricts = await fetch('https://fooddeliveryadmin.herokuapp.com/address/districts');
      let resWards = await fetch(`https://fooddeliveryadmin.herokuapp.com/address/ward?d=Quận 1`);
      let districts = await resDistricts.json();
      let wards = await resWards.json();
      console.log(districts)
      console.log(wards)
      this.setState({
        Districts: districts,
        Wards: wards
      })
    }

    checkInfo = () => {
      const {Name, District, Ward, Street, Number, pickedImage} = this.state;
      if(Name === '' || Name.trim() === '' || Name.length === 0)
        return false;
      if(District === '' || District.trim() === '' || District.length === 0)
        return false;
      if(Ward === '' || Ward.trim() === '' || Ward.length === 0)
        return false;
      if(Street === '' || Street.trim() === '' || Street.length === 0)
        return false;
      if(!pickedImage)
        return false;
      return true;
    }

    handleSubmit = () => {
      let valid = this.checkInfo();

      if(!valid)
        Alert.alert('Error', 'Vui long nhap day du thong tin')

    }




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
          this.setState({pickedImage: res});
        }
      });
    }


    handleDistrictChange = async (val) => {
      let resWards = await fetch(`https://fooddeliveryadmin.herokuapp.com/address/ward?d=${val}`);
      let wards = await resWards.json();
      this.setState({
        District: val,
        Wards: wards
      })
    }

    handleTextChange = (name, val) => {
      let state = {...this.state};
      state[name] = val;
      this.setState(state);

    }

    render() {
        return (
            <View style={{ flex: 1, padding: 5, backgroundColor: '#C5CAE9' }}>
                <View style={styles.box}>
                    <Text style={styles.title}>Tên cửa hàng: </Text>
                    <TextInput style={styles.input} onChangeText={text => this.handleTextChange('Name', text)}/>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <View style={styles.districtStyle}>
                        <Text style={styles.title}>Quận: </Text>
                        <Picker
                            selectedValue={'Java'}
                            style={{ height: 50, }}
                            selectedValue={this.state.District}
                            onValueChange={(val, index) => this.handleDistrictChange(val)}
                        >
                            {
                              this.state.Districts.map((i,index) => <Picker.Item label={i.name} value={i.name} key={index}/>)
                            }
                        </Picker>
                    </View>
                    <View style={styles.districtStyle}>
                        <Text style={styles.title}>Phường: </Text>
                        <Picker
                            selectedValue={'Java'}
                            style={{ height: 50, }}
                            selectedValue={this.state.Ward}
                            onValueChange={(val, index) => this.setState({Ward: val})}
                        >
                        {
                          this.state.Wards.map((i, index) => <Picker.Item label={i.name} value={i.name} key={index}/>)
                        }
                        </Picker>
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>Đường: </Text>
                    <TextInput style={styles.input} onChangeText={text => this.handleTextChange('Street', text)}/>
                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>Số nhà: </Text>
                    <TextInput style={styles.input} onChangeText={text => this.handleTextChange('Number', text)}/>
                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>Giờ mở cửa: </Text>
                    <TextInput style={styles.input} onChangeText={text => this.handleTextChange('Opentime', text)}/>
                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>Giờ đóng cửa: </Text>
                    <TextInput style={styles.input} onChangeText={text => this.handleTextChange('CloseTime', text)}/>
                </View>

                <Text style={styles.title}>Hình ảnh: </Text>
                <TouchableOpacity style={{ height: 45, width: 145, backgroundColor: '#5E35B1', borderRadius: 50, justifyContent: 'center', alignItems: "center", marginLeft: 'auto', marginRight: 'auto' }} onPress={() => this.pickImageHandler()}>
                    <Text style={{color: 'white', fontSize: 16}}>Chọn hình</Text>
                </TouchableOpacity>
                {
                  this.state.pickedImage && <Image style={{height: 200, borderRadius: 10, marginTop: 10 }} source={{uri: this.state.pickedImage.uri}}/>
                }
                <TouchableOpacity style={{ height: 45, width: 146, backgroundColor: '#5E35B1', borderRadius: 50, justifyContent: 'center', alignItems: "center", marginLeft: 'auto', marginRight: 'auto', bottom: 5, position: 'absolute', left: '50%', transform: [{translateX: -73}] }} onPress={() => this.handleSubmit()}>
                    <Text style={{color: 'white', fontSize: 16}}>Thêm mới</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 16,
        marginTop: 10,
    },
    input: {
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        marginLeft: 10,
        height: 50
    },
    districtStyle: {
        flex: 1,
        padding: 10,
    },
    box: {
        flexDirection: 'row'
    }
});

export default FormAddRestaurant;
