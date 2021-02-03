//AuthenticationNavigator

import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from '../Screen/AuthenticationModule/MainScreen';
import LoginScreen from '../Screen/AuthenticationModule/LoginScreen';
import RegisterScreen from '../Screen/AuthenticationModule/RegisterScreen';
import ForgotPasswordScreen from '../Screen/AuthenticationModule/ForgotPasswordScreen';
import ChangePasswordScreen from '../Screen/AuthenticationModule/ChangePasswordScreen';
import SubscriptionScreen from '../Screen/SubscriptionModule/SubscriptionScreen';
import MaleFemaleScreen from '../Screen/FreeTrialModule/MaleFemaleScreen';
import AgeScreen from '../Screen/FreeTrialModule/AgeScreen';
import WeightScreen from '../Screen/FreeTrialModule/WeightScreen';
import GoalScreen from '../Screen/FreeTrialModule/GoalScreen';
import CurrentActivityScreen from '../Screen/FreeTrialModule/CurrentActivityScreen';
import NutritionScreen from '../Screen/FreeTrialModule/NutritionScreen';
import AllergiesScreen from '../Screen/FreeTrialModule/AllergiesScreen';
import PlanScreen from '../Screen/PlanModule/PlanScreen';
import SelectPlanScreen from '../Screen/PlanModule/SelectPlanScreen';
import VideoPlayScreen from '../Screen/PlanModule/VideoPlayScreen';

const Stack = createStackNavigator();

const AuthenticationNavigatorStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MaleFemaleScreen" component={MaleFemaleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AgeScreen" component={AgeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WeightScreen" component={WeightScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GoalScreen" component={GoalScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CurrentActivityScreen" component={CurrentActivityScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NutritionScreen" component={NutritionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AllergiesScreen" component={AllergiesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PlanScreen" component={PlanScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SelectPlanScreen" component={SelectPlanScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VideoPlayScreen" component={VideoPlayScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export { AuthenticationNavigatorStack };