//SplashScreen

import React, { Component } from "react";
import { Text, View, Image, StatusBar, } from "react-native";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

import MainScreen from '../Screen/AuthenticationModule/MainScreen';

export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connectionStatus: true,
        };
    }

   async componentDidMount() {
       const user_id = await AsyncStorage.getItem("@user_id");
        NetInfo.fetch().then((state) => {
            if (state.isConnected == true) {
                setTimeout(() => {
                    if (user_id !== null) {
                        this.props.navigation.navigate("HomeNavigatorStack")
                    }
                    else {
                        this.props.navigation.navigate("AuthenticationNavigatorStack")
                    }
                }, 2000);
            } else {
                this.setState({
                    connectionStatus: false,
                });
            }
        });
        
    }
    componentDidUpdate() {
        setTimeout(() => {
            NetInfo.fetch().then((state) => {
                console.log('Connection type', state.type);
                console.log('Is connected?', state.isConnected);
                if (state.isConnected == true) {
                    setTimeout(() => {
                        this.props.navigation.navigate('MainScreen');
                    }, 2000);
                } else {
                    this.setState({
                        connectionStatus: false,
                    });
                }
            });
        }, 5000);
    }
    render() {
        return (
            <View style={{ backgroundColor: "black", flex: 1, justifyContent: 'center' }}>
                <StatusBar
                    barStyle="light-content"
                    hidden={true}
                    backgroundColor='black'
                    translicent={false}
                    networkActivityIndicatorVisible={true}
                />

                {this.state.connectionStatus == true ? (
                    <Image source={require('../Assets/ImageAndIcons/logo.png')}
                        style={{ justifyContent: "center", alignSelf: "center" }} />

                ) : (
                        <View
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "black" }}>
                            <Text style={{ color: "white" }}>No Internet, Please Connect with Internet</Text>
                        </View>
                    )}



            </View>
        );
    }
}

