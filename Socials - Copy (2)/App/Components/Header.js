//Header

import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
} from 'react-native';

 export default class Header extends Component {

    render() {
        return (

            <View >

                <View style={{flexDirection:"row",borderBottomColor:"gray",borderWidth:1,height:60 }}>

                    <Text style={{fontWeight:"bold",fontSize:20,alignSelf:"center",marginLeft:10, marginRight:260}}>{this.props.title}</Text>

                    <Image source={this.props.imgSrc} style={{height:35,width:35,marginTop:5}}/>

                </View>

            </View >
        );
    }
}