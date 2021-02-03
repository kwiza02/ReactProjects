//Like

import React, { Component } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Favourite from '../Screens/Favourite';
import Followers from '../Screens/Followers';
import Following from '../Screens/Following';

import Header from '../Components/Header';

import {
    Text,
    View,
    TouchableOpacity,
    BackHandler,
} from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default class Like extends Component {

    disableBackButton = () => {
        this.props.navigation.navigate("Home");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    render() {
        return (

                <View style={{flex:1}}>

                    <Header title={"Follow"}></Header>

                    <Tab.Navigator>
                        <Tab.Screen name="Favourite" component={Favourite} />
                        <Tab.Screen name=" Followers" component={Followers} />
                        <Tab.Screen name=" Following" component={Following} />
                    </Tab.Navigator>

            </View>
        );
    }

}