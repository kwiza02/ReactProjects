//NutritionDetailScreen

import React, { Component, useState, useEffect } from 'react';

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

import DirectionsTabScreen from './DirectionsTabScreen';
import IngredientsTabScreen from './IngredientsTabScreen';

import { button, AppFonts, TrialHeader, } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';
const Tab = createMaterialTopTabNavigator();

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class NutritionDetailScreen extends Component {

    render(){
        return(
            <View style={styles.mainContainer}>
                <ImageBackground source={require("../../Assets/ImageAndIcons/chicken_wrap.png")} style={styles.imaageBackground}>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.imageShadow} >
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ marginTop: getLayoutSize(10), left: getLayoutSize(20), }} >
                                <Image source={require("../../Assets/ImageAndIcons/back_with_arrow.png")} style={styles.headerImageArrow} />
                            </TouchableOpacity>
                            <Image source={require("../../Assets/ImageAndIcons/video_play.png")} style={styles.headerImagePlay} />
                        </View>
                        <View style={{ padding: getLayoutSize(20), marginTop: getLayoutSize(140) }}>
                            <Text style={styles.content1}>SANDWICHES</Text>
                            <View style={{ marginTop: getLayoutSize(5), }}>
                                <Text style={styles.content2}>CHICKEN{"\n"}WRAP</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: getLayoutSize(10) }}>
                                <Image source={require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt_3x.png")} style={styles.imageTime}></Image>
                                <Text style={styles.content4}>15 mins</Text>
                                <Image source={require("../../Assets/ImageAndIcons/heart.png")} style={styles.imageHeart}></Image>
                                <Text style={styles.heartText}>3,200</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row",padding:getLayoutSize(20) }}>
                           <View style={styles.durationView}>
                               <View style={styles.topLineProteinView}></View>
                               <Text style={styles.boxHeader}>PROTEIN</Text>
                                <View style={styles.topLineProteinView}></View>
                                <Text style={styles.numberText}>50<Text style={{fontSize:13}}>g</Text></Text>
                           </View>
                            <View style={styles.durationView}>
                                <View style={styles.topLineCarbsView}></View>
                                <Text style={styles.boxHeader}>CARBS</Text>
                                <View style={styles.topLineCarbsView}></View>
                                <Text style={styles.numberText}>30<Text style={{ fontSize: 13 }}>g</Text></Text>
                            </View>
                            <View style={styles.durationView}>
                                <View style={styles.topLineFatsView}></View>
                                <Text style={styles.boxHeader}>FATS</Text>
                                <View style={styles.topLineFatsView}></View>
                                <Text style={styles.numberText}>10<Text style={{ fontSize: 13 }}>g</Text></Text>
                            </View>
                        </View>
                    </ImageBackground>
                </ImageBackground>
                <Tab.Navigator tabBarOptions={{
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
                    <Tab.Screen name="INGREDIENTS" component={IngredientsTabScreen} />
                    <Tab.Screen name="DIRECTIONS" component={DirectionsTabScreen} />
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
    headerImageArrow: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        alignItems: "flex-end",
    },
    headerImagePlay: {
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        alignItems: "flex-start",
        right: getLayoutSize(20),
        marginTop: getLayoutSize(10),
        resizeMode: "contain"
    },
    imageShadow: {
        height: getLayoutSize(475),
        width: "100%",
    },
    imaageBackground: {
        height: getLayoutSize(475),
        width: screenWidth,
        justifyContent: "center",
    },
    content1: {
        color: "#ffffff",
        fontFamily: AppFonts.text.font4,
        fontSize: getFontSize(13),
    },
    content2: {
        color: "white",
        fontFamily: AppFonts.text.font2,
        fontSize: getFontSize(35),
    },
    content4: {
        color: "#dedede",
        fontFamily: AppFonts.text.font3,
        fontSize: getFontSize(12),
        marginLeft: getLayoutSize(10),
    },
    imageTime: {
        height: getLayoutSize(15),
        width: getLayoutSize(15),
        tintColor: "#dedede"
    },
    imageHeart: {
        height: getLayoutSize(15),
        width: getLayoutSize(15),
        tintColor: "#dedede",
        marginLeft:getLayoutSize(15)
    },
    heartText: {
        color: "#dedede",
        fontFamily: AppFonts.text.font3,
        fontSize: getFontSize(12),
        marginLeft:getLayoutSize(5),
    },
    durationView: {
        borderWidth: 1,
        borderColor: "#868686",
        height: getLayoutSize(65),
        width: "30%",
        marginLeft: getLayoutSize(10),
        borderTopWidth: 0,
        flexDirection: "row",
    },
    topLineProteinView: {
        borderTopWidth: 0.8,
        borderColor: "#868686",
        width: "19%"
    },
    topLineCarbsView: {
        borderTopWidth: 0.8,
        borderColor: "#868686",
        width: "26%"
    },
    topLineFatsView: {
        borderTopWidth: 0.8,
        borderColor: "#868686",
        width: "32%"
    },
    boxHeader: {
        color:"#dedede",
        marginTop: getLayoutSize(-8),
        marginLeft: getLayoutSize(5),
        marginRight: getLayoutSize(5),
        fontFamily: AppFonts.text.font4,
        fontSize: getFontSize(12),
    },
    numberText:{
        color: "#dedede",
        position:"absolute",
        fontFamily: AppFonts.text.font3,
        fontSize: getFontSize(25),
        alignSelf:"center",
        marginLeft:getLayoutSize(35)
    },
});
