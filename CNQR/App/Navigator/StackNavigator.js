//StackNavigator

import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from '../Screen/SplashScreen';
import MainScreen from '../Screen/AuthenticationModule/MainScreen';
import LoginScreen from '../Screen/AuthenticationModule/LoginScreen';
import RegisterScreen from '../Screen/AuthenticationModule/RegisterScreen';
import SubscriptionScreen from '../Screen/SubscriptionModule/SubscriptionScreen';
import ForgotPasswordScreen from '../Screen/AuthenticationModule/ForgotPasswordScreen';
import UserProfileScreen from '../Screen/ProfileModule/UserProfileScreen';
import AccountInfoScreen from '../Screen/AccountInfoModule/AccountInfoScreen';
import PrivacyPolicyScreen from '../Screen/WebviewModule/PrivacyPolicyScreen';
import FAQsScreen from '../Screen/WebviewModule/FAQsScreen';
import TermsAndConditionScreen from '../Screen/WebviewModule/TermsAndConditionScreen';
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
import ChoosePlanScreen from '../Screen/PlanModule/ChoosePlanScreen';
import MultipleVideoPlayerScreen from '../Screen/WorkoutModule/MultipleVideoPlayerScreen';

const Stack = createStackNavigator();

const MyStack = ({ navigation }) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MainScreen" component={MainScreen}  options={{headerShown:false}}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AccountInfoScreen" component={AccountInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TermsAndConditionScreen" component={TermsAndConditionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FAQsScreen" component={FAQsScreen} options={{ headerShown: false }} />
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
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} options={{ headerShown: false }} />
            <Stack.Screen name="IconsScreen" component={IconsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NutritionScreens" component={NutritionScreens} options={{ headerShown: false }} />
            <Stack.Screen name="MondayMotivationScreen" component={MondayMotivationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="IconDetailScreen" component={IconDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NutritionDetailScreen" component={NutritionDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeYourGoalScreen" component={ChangeYourGoalScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UpdateWeightScreen" component={UpdateWeightScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChoosePlanScreen" component={ChoosePlanScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MultipleVideoPlayerScreen" component={MultipleVideoPlayerScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export { MyStack };