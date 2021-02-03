//AllScreen

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

import { button, AppFonts, TrialHeader, } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class AllScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            data: [
                {
                    content1: "TRAINING",
                    content2: "MONDAY",
                    content3: "MOTIVATION",
                    content4: "Discover how to keep yourself on track",
                    content5: "HEBA ALI",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                    imageProfile: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
                {
                    content1: "TRAINING",
                    content2: "MONDAY",
                    content3: "MOTIVATION",
                    content4: "Discover how to keep yourself on track",
                    content5: "HEBA ALI",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                    imageProfile: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
                {
                    content1: "TRAINING",
                    content2: "MONDAY",
                    content3: "MOTIVATION",
                    content4: "Discover how to keep yourself on track",
                    content5: "HEBA ALI",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                    imageProfile: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
                {
                    content1: "TRAINING",
                    content2: "MONDAY",
                    content3: "MOTIVATION",
                    content4: "Discover how to keep yourself on track",
                    content5: "HEBA ALI",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                    imageProfile: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
            ],
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "column"}}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate("MondayMotivationScreen") }}>
                    <ImageBackground source={item.imageBackground} style={styles.renderImageBackground}>
                        <View style={{padding:getLayoutSize(20),marginTop:getLayoutSize(200)}}>
                            <Text style={styles.content1}>{item.content1}</Text>
                            <View style={{ marginTop: getLayoutSize(5) }}>
                                <Text style={styles.content2}>{item.content2}</Text>
                                <Text style={styles.content2}>{item.content3}</Text>
                            </View>
                            <Text style={styles.content3}>{item.content4}</Text>
                            <View style={{ flexDirection: "row",marginTop:getLayoutSize(20) }}>
                                <View style={styles.imageCircleView1}>
                                    <View style={styles.imageCircleView2}>
                                        <Image source={item.imageProfile} style={styles.renderImage} />
                                    </View>
                                </View>
                                <Text style={styles.content4}>{item.content5}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }


    render(){
        return(
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={{flexDirection:"column"}}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(index) => index.toString()}
                        renderItem={this.renderItem.bind(this)}
                        horizontal={false} />
                    </View>
                    <View style={{marginBottom:getLayoutSize(50)}}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "black",
        flex: 1,
    },
    renderImageBackground: {
        height:getLayoutSize(480),
        width:"100%",
        justifyContent: "center",
    },
    content1: {
        color: "#dedede",
        fontSize: getFontSize(13),
        fontFamily: AppFonts.text.font4,
    },
    content2: {
        color: "#ffffff",
        fontSize: getFontSize(35),
        fontFamily: AppFonts.text.font2,
    },
    content3:{
        color: "#e6e6e6",
        fontSize: getFontSize(15),
        fontFamily: AppFonts.text.font3,
        marginTop:getLayoutSize(10),
    },
    content4: {
        color: "#dedede",
        fontSize: getFontSize(15),
        fontFamily: AppFonts.text.font4,
        alignSelf: "center",
        marginLeft:getLayoutSize(15),
    },
    imageCircleView1:{
        height: getLayoutSize(56),
        width: getLayoutSize(56),
        borderRadius:28,
        borderWidth:1,
        borderColor:"#818181",
        justifyContent:"center",
    },
    imageCircleView2: {
        height: getLayoutSize(50),
        width: getLayoutSize(50),
        borderRadius: 25,
        borderWidth: 0.7,
        borderColor: "#00f3b9",
        justifyContent: "center",
        alignSelf:"center",
    },
    renderImage: {
        height: getLayoutSize(48),
        width: getLayoutSize(48),
        borderRadius:24,
        alignSelf: "center",
    },
});