//MainNavigator

import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from '../Screens/MainScreen';
import DetailScreen from '../Screens/DetailScreen';
import MessageScreen from '../Screens/MessageScreen';
import DoctorListScreen from '../Screens/DoctorListScreen';

const Stack = createStackNavigator();

const MainNavigator = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name={'MainScreen'} component={MainScreen} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name={'DetailScreen'} component={DetailScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'MessageScreen'} component={MessageScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'DoctorListScreen'} component={DoctorListScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    );
}

export {MainNavigator} ;