//About

import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class About extends Component {

    render() {
        return (
            <View>

                <View style={{flexDirection:"row",marginTop:30,marginLeft:15}}>

                    <Image source={require("../Assets/name.png")} style={{height:50,width:50}} />
                    <Text style={{fontSize:15,alignSelf:"center",marginLeft:10,}}>Kwiza Kaneria</Text>

                </View>

                <View style={{ flexDirection: "row", marginTop: 30,marginLeft:15 }}>

                    <Image source={require("../Assets/location.png")} style={{ height: 50, width: 50,borderRadius:25 }} />
                    <Text style={{ fontSize: 15, alignSelf: "center", marginLeft: 10,  }}>Rajkot,Gujrat</Text>

                </View>

                <View style={{ flexDirection: "row", marginTop: 30, marginLeft:15 }}>

                    <Image source={require("../Assets/mail.png")} style={{ height: 50, width: 50, borderRadius: 25 }} />
                    <Text style={{ fontSize: 15, alignSelf: "center", marginLeft: 10, color:"red" }}>Abc@gmail.com</Text>

                </View>


            </View>
        );
    }

}