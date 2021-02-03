//NutritionsScreen

import React, { Component} from 'react';

import {
    Image,
    ImageBackground,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    FlatList,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AllScreen from '../NutritionModule/AllScreen';
import ShakesScreen from '../NutritionModule/ShakesScreen';
import SnacksScreen from '../NutritionModule/SnacksScreen';
import BreakfastScreen from '../NutritionModule/BreakfastScreen';
import LunchScreen from '../NutritionModule/LunchScreen';

import { button, AppFonts, TrialHeader, PlanHeader } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const Tab = createMaterialTopTabNavigator();

export default class NutritionScreens extends Component {

    render() {
        return (
            <View style={styles.mainContainer}>
                <PlanHeader title={require("../../Assets/ImageAndIcons/logo.png")}
                    imgSrc={require("../../Assets/ImageAndIcons/ic_settings.png")}
                    isBack={true}
                    screen={"SelectPlanScreen"}
                    navigation={this.props.navigation} />
                <Tab.Navigator tabBarOptions={{
                    scrollEnabled: true,
                    activeTintColor: "white",
                    inactiveTintColor: "#818181",
                    labelStyle: {
                        fontSize: getFontSize(13),
                        fontWeight: "bold",
                        fontFamily: AppFonts.text.font4,
                    },
                    indicatorStyle: {
                        backgroundColor: "#00f3b9",
                        position: "relative",
                        opacity: 0.6,
                    },
                    style: {
                        borderTopWidth: 0.2,
                        borderTopColor: "#282c30",
                        backgroundColor: "black",
                    },
                }}>
                    <Tab.Screen name="ALL" component={AllScreen}/>
                    <Tab.Screen name="SHAKES" component={ShakesScreen} />
                    <Tab.Screen name="SNACKS" component={SnacksScreen} />
                    <Tab.Screen name=" BREAKFAST" component={BreakfastScreen} />
                    <Tab.Screen name=" LUNCH" component={LunchScreen} />
                </Tab.Navigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "black",
        flex: 1,
    },
});