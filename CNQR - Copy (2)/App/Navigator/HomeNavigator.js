//HomeNavigator

import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import UserProfileScreen from '../Screen/ProfileModule/UserProfileScreen';
import AccountInfoScreen from '../Screen/AccountInfoModule/AccountInfoScreen';
import PrivacyPolicyScreen from '../Screen/WebviewModule/PrivacyPolicyScreen';
import FAQsScreen from '../Screen/WebviewModule/FAQsScreen';
import TermsAndConditionScreen from '../Screen/WebviewModule/TermsAndConditionScreen';
import BottomTabNavigator from './BottomTabNavigator';
import DiscoverScreen from '../Screen/BottomTabScreenModule/DiscoverScreen';
import WorkoutScreen from '../Screen/BottomTabScreenModule/WorkoutScreen';
import IconsScreen from '../Screen/BottomTabScreenModule/IconsScreen';
import NutritionScreens from '../Screen/BottomTabScreenModule/NutritionScreens';
import MondayMotivationScreen from '../Screen/DiscoverModule/MondayMotivationScreen';
import IconDetailScreen from '../Screen/IconsModule/IconDetailScreen';
import NutritionDetailScreen from '../Screen/NutritionModule/NutritionDetailScreen';
import ChangeYourGoalScreen from '../Screen/UnitOfMeasurementModule/ChangeYourGoalScreen';
import UpdateWeightScreen from '../Screen/UnitOfMeasurementModule/UpdateWeightScreen';
import ChooseYourPlanScreen from '../Screen/PlanModule/ChooseYourPlanScreen';
import MessageSupportScreen from '../Screen/WebviewModule/MessageSupportScreen';
import WorkoutsScreen from '../Screen/WorkoutModule/WorkoutsScreen';
import MyPlanScreen from '../Screen/WorkoutModule/MyPlanScreen';
import FAQsDetailScreen from '../Screen/WebviewModule/FAQsDetailScreen';
import ContactPrefrenceScreen from '../Screen/ProfileModule/ContactPrefrenceScreen';
import AddContactScreen from '../Screen/ProfileModule/AddContactScreen';
import MultipleVideoScreen from '../Screen/WorkoutModule/MultipleVideoScreen';
import VideoPlayScreen from '../Screen/PlanModule/VideoPlayScreen';

const Stack = createStackNavigator();

const HomeNavigatorStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName={"BottomTabNavigator"}>
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ContactPrefrenceScreen" component={ContactPrefrenceScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddContactScreen" component={AddContactScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AccountInfoScreen" component={AccountInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TermsAndConditionScreen" component={TermsAndConditionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FAQsScreen" component={FAQsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FAQsDetailScreen" component={FAQsDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MessageSupportScreen" component={MessageSupportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MultipleVideoScreen" component={MultipleVideoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WorkoutsScreen" component={WorkoutsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MyPlanScreen" component={MyPlanScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VideoPlayScreen" component={VideoPlayScreen} options={{ headerShown: false }} />
            <Stack.Screen name="IconsScreen" component={IconsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NutritionScreens" component={NutritionScreens} options={{ headerShown: false }} />
            <Stack.Screen name="MondayMotivationScreen" component={MondayMotivationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="IconDetailScreen" component={IconDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NutritionDetailScreen" component={NutritionDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeYourGoalScreen" component={ChangeYourGoalScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UpdateWeightScreen" component={UpdateWeightScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChooseYourPlanScreen" component={ChooseYourPlanScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export { HomeNavigatorStack };