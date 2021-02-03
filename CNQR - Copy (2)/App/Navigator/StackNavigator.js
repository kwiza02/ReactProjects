//StackNavigator

import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from '../Screen/SplashScreen';
import { AuthenticationNavigatorStack } from './AuthenticationNavigator';
import { HomeNavigatorStack } from './HomeNavigator';

const Stack = createStackNavigator();

const MyStack = ({ navigation }) => {
    return(
        <Stack.Navigator initialRouteName={"SplashScreen"}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AuthenticationNavigatorStack" component={AuthenticationNavigatorStack} options={{ headerShown: false }} />
            <Stack.Screen name="HomeNavigatorStack" component={HomeNavigatorStack} options={{ headerShown: false }} />    
        </Stack.Navigator>
    );
}

export { MyStack };