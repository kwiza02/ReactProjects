//Splash

import React, { Component } from 'react';

import {
    Text,
    View,
    ScrollView,
    StatusBar,
} from 'react-native';

export default class Splash extends Component{

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate("Login");
        }, 2000);
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: "white" }}>

                <View style={{alignSelf:"center",justifyContent:"center",marginTop:360}} >

                    <StatusBar
                        barStyle="dark-content"
                        hidden={false}
                        backgroundColor="white"
                        translucent={false}
                        networkActivityIndicatorVisible={true} />

                    <Text style={{ fontSize: 50, color: "black", alignSelf: "center", fontFamily: "Arial Rounded MT Bold", fontWeight: "bold"}}>SOCIAL</Text>
                
                </View>
            
            </ScrollView>
        );
    }

}