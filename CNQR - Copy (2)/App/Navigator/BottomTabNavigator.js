//BottomTabNavigator

import React, { Component } from 'react';

import {
    BackHandler,
    Image,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import DiscoverScreen from '../Screen/BottomTabScreenModule/DiscoverScreen';
import WorkoutScreen from '../Screen/BottomTabScreenModule/WorkoutScreen';
import IconsScreen from '../Screen/BottomTabScreenModule/IconsScreen';
import NutritionScreens from '../Screen/BottomTabScreenModule/NutritionScreens';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
        };
    }

    render() {
        return (
            <Tab.Navigator initialRouteName={"Workout"} barStyle={{ backgroundColor: "transparent",
                borderTopWidth:0,
                position:"absolute",
                elevation:0 }} shifting={false} >
                    <Tab.Screen
                        name="Discover"
                        component={DiscoverScreen}
                        options={{
                            tabBarLabel: "Discover",
                            tabBarIcon: ({focused }) => (
                                <Image source={require("../Assets/FooterIcons/Discover.png")} style={{ height: 30, width: 30, tintColor: focused ? "#ffffff" : "#868686" }} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Workout"
                    component={WorkoutScreen}
                        options={{
                            tabBarLabel: "Workout",
                            tabBarIcon: ({ tintColor, focused }) => (
                                <Image source={require("../Assets/FooterIcons/Workout.png")} style={{ height: 28, width: 28, tintColor: focused ? "#ffffff" : "#868686" }} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Icons"
                        component={IconsScreen}
                        options={{
                            tabBarLabel: "Icons",
                            tabBarIcon: ({ tintColor, focused }) => (
                                <Image source={require("../Assets/FooterIcons/Icons.png")} style={{ height: 28, width: 28, tintColor: focused ? "#ffffff" : "#868686" }} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Nutrition"
                        component={NutritionScreens}
                        options={{
                            tabBarLabel: "Nutrition",
                            tabBarIcon: ({ tintColor, focused }) => (
                                <Image source={require("../Assets/FooterIcons/Nutrition.png")} style={{ height: 28, width: 28, tintColor: focused ? "#ffffff" : "#868686" }} />
                            ),
                        }}
                     />
                </Tab.Navigator>
            );
        }
    }
