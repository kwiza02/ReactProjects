//HomeNavigator

import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from '../Screens/MainScreen';
import DisplayScreen from '../Screens/DisplayScreen';

const Stack = createStackNavigator();

const HomeNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'MainScreen'} component={MainScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'DisplayScreen'} component={DisplayScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    );
}

export { HomeNavigator };