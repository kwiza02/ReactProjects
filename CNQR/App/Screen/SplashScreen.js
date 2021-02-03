//SplashScreen

import React, { Component } from 'react';
import {
    Image,
    View,
    ScrollView,
    StatusBar,
} from 'react-native';

export default class SplashScreen extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate("UserProfileScreen");
        }, 2000);
    }

    render() {
        return (
          <View style={{ justifyContent: "center", flex: 1, backgroundColor: "black" }} >
                 <StatusBar
                    hidden={true} />
                <Image source={require("../Assets/ImageAndIcons/logo.png")} style={{alignSelf:"center",justifyContent:"center"}}></Image>
            </View>
        );
    }

}