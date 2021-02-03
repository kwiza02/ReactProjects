//HomeNavigator

import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from '../Screens/SplashScreen';
import CategoryListScreen from '../Screens/CategoryModule/CategoryListScreen';
import DisplayScreen from '../Screens/CategoryModule/DisplayScreen';
import VideoPlayerScreen from '../Screens/CategoryModule/VideoPlayerScreen';

const Stack = createStackNavigator();

const HomeNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'SplashScreen'} component={SplashScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'CategoryListScreen'} component={CategoryListScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'DisplayScreen'} component={DisplayScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'VideoPlayerScreen'} component={VideoPlayerScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    );
}

export { HomeNavigator };