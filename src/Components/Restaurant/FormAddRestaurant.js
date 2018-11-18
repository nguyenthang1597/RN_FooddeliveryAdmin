import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Picker } from 'react-native';

class FromAddRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImage: false,
        };
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 5, backgroundColor: '#C5CAE9' }}>
                <View style={styles.box}>
                    <Text style={styles.title}>Tên cửa hàng: </Text>
                    <TextInput style={styles.input} />
                </View>

                <View style={{ flexDirection: "row" }}>
                    <View style={styles.districtStyle}>
                        <Text style={styles.title}>Quận: </Text>
                        <Picker
                            selectedValue={'Java'}
                            style={{ height: 50, }}
                        >
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                    <View style={styles.districtStyle}>
                        <Text style={styles.title}>Phường: </Text>
                        <Picker
                            selectedValue={'Java'}
                            style={{ height: 50, }}
                        >
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>Đường: </Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>Số nhà: </Text>
                    <TextInput style={styles.input} />
                </View>

                <Text style={styles.title}>Hình ảnh: </Text>
                <TouchableOpacity style={{ height: 45, width: 145, backgroundColor: '#5E35B1', borderRadius: 50, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={{color: 'white', fontSize: 16}}>Chọn hình</Text>
                </TouchableOpacity>
                <Image style={{ backgroundColor: 'red', height: 200, borderRadius: 10, marginTop: 10 }} />
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
        marginLeft: 10

    },
    districtStyle: {
        flex: 1,
        padding: 10,
    },
    box: {
        flexDirection: 'row'
    }
});

export default FromAddRestaurant;
