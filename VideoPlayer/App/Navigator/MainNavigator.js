//MainNavigator

import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from '../Screens/MainScreen';
import VideoScreen from '../Screens/Video/VideoScreen';
import VideoListScreen from '../Screens/Video/VideoListScreen';
import AudioScreen from '../Screens/Audio/AudioScreen';
import AudioListScreen from '../Screens/Audio/AudioListScreen';

const Stack = createStackNavigator();

const MainNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'MainScreen'} component={MainScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'VideoScreen'} component={VideoScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'VideoListScreen'} component={VideoListScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'AudioScreen'} component={AudioScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'AudioListScreen'} component={AudioListScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    );
}

export { MainNavigator };