//IconsScreen

import React, { Component } from 'react';

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

import AllScreen from '../IconsModule/AllScreen';
import BodyBuildingScreen from '../IconsModule/BodyBuildingScreen';
import FitnessScreen from '../IconsModule/FitnessScreen';
import WeightLossScreen from '../IconsModule/WeightLossScreen';

import { button, AppFonts, Colors, TrialHeader, PlanHeader } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const Tab = createMaterialTopTabNavigator();

export default class IconsScreen extends Component {

    render() {
        return (
            <View style={styles.mainContainer}>
                <PlanHeader title={require("../../Assets/ImageAndIcons/logo.png")}
                    imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")}
                    isBack={true}
                    screen={"SelectPlanScreen"}
                    navigation={this.props.navigation} />
                <Tab.Navigator tabBarOptions={{
                    scrollEnabled: true,
                    activeTintColor:"white",
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
                    <Tab.Screen name="ALL" component={AllScreen} />
                    <Tab.Screen name="FITNESS" component={FitnessScreen} />
                    <Tab.Screen name="BODYBUILDING" component={BodyBuildingScreen} />
                    <Tab.Screen name="WEIGHTLOSS" component={WeightLossScreen} />
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