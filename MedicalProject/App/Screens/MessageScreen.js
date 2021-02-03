//MessageScreen

import React, { Component } from "react";

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Dimensions,

} from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { getLayoutSize, getFontSize } from "../Component/Responsive";
import { AppFonts } from "../Resources/index";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class MessageScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                    <Image source={require("../Assets/Icons/back_with_arrow.png")}
                        style={{ height: getLayoutSize(23), width: getLayoutSize(23), tintColor: "#000000", marginLeft: getLayoutSize(20), marginTop: getLayoutSize(20) }} />
                </TouchableOpacity>
                <View style={styles.container}>
                    <MapView style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0,
                            longitudeDelta: 0.0,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: 37.78825,
                                longitude: -122.4324
                            }}
                        />
                    </MapView>
                </View>
                <View style={{padding:getLayoutSize(20)}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require("../Assets/Icons/Bitmap_3.png")} style={{ height: getLayoutSize(60), width: getLayoutSize(60), borderRadius: getLayoutSize(30), }}></Image>
                            <Text style={{ fontSize: getFontSize(20), color: "#a9a9a9", marginLeft: getLayoutSize(10) }}>Courier {"\n"}<Text style={{ color: "#000000" }}>David Johns</Text></Text>
                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("DoctorListScreen")}}>
                            <Image source={require("../Assets/Icons/phone.png")} style={{ height: getLayoutSize(32), width: getLayoutSize(32), marginTop: getLayoutSize(10) }}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: getLayoutSize(30), height: getLayoutSize(40), backgroundColor: "#dcdcdc", borderRadius: getLayoutSize(10) }}>
                        <Image source={require("../Assets/Icons/message.png")}
                            style={{ height: getLayoutSize(20), width: getLayoutSize(20), tintColor: "#868686", marginLeft: getLayoutSize(15), marginTop: getLayoutSize(10) }} />
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={text => this.setState({ medicineName: text })}
                            value={this.state.medicineName}
                            underlineColorAndroid="transparent"
                            multiline
                            placeholder="Message to the courier">
                        </TextInput>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    textInputStyle: {
        fontSize: getFontSize(15),
        height: getLayoutSize(40),
        marginLeft: getLayoutSize(15),
    },
});