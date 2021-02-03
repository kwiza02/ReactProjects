//MondayMotivationScreen

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
import HTML from "react-native-render-html";

import { button, AppFonts, TrialHeader, } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const htmlContent = `
    <p style=" color:#e9e9e9;fontSize:22;fontFamily:AppFonts.text.font3,">Lorem ipsum dolor sit amet,<br>consectetur adipisicing elit,</p>
    <p style= "color:#545454;fontSize:15;fontFamily:AppFonts.text.font3;line-height:25px ">Lorem ipsum dolor sit amet,consectetur adipisicing elit,Lorem ipsum dolor sit amet,consectetur adipisicing elit,Lorem ipsum dolor sit amet,consectetur adipisicing elit,Lorem ipsum dolor sit amet,consectetur adipisicing elit.Lorem ipsum dolor sit amet,consectetur adipisicing elit,</p>
    <h2 style=" color: #e9e9e9;fontSize: 19; fontFamily:"AktivGroteskEx_XBd";margin-top:40px">THIS IS  A HEADING</h2>
    <p style= "color:#545454;fontSize:15;fontFamily:AppFonts.text.font3;margin-bottom:50px;line-height:25px">Lorem ipsum dolor sit amet,consectetur adipisicing elit,Lorem ipsum dolor sit amet,consectetur adipisicing elit,Lorem ipsum dolor sit amet,consectetur adipisicing elit,Lorem ipsum dolor sit amet,consectetur adipisicing elit.Lorem ipsum dolor sit amet,consectetur adipisicing elit,</p>
    <iframe allowfullscreen="" frameborder="0" height="400" src="https://www.youtube.com/embed/eEupgmLx714" width="400"></iframe>
    <h2 style=" color: #e9e9e9;fontSize: 19; fontFamily:AppFonts.text.font3;margin-top:50px">THIS IS  A HEADING</h2>
    <P style= "color:#545454;fontSize:15;fontFamily:AppFonts.text.font3;line-height:25px">Lorem ipsum dolor sit amet,consectetur adipisicing elit,Lorem ipsum dolor sit amet,consectetur adipisicing elit,Lorem ipsum dolor sit amet,consectetur adipisicing elit,Lorem ipsum dolor sit amet,consectetur adipisicing elit.Lorem ipsum dolor sit amet,consectetur adipisicing elit,</P>`;

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class MondayMotivationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            ],
            data2: [
                {
                    content1: "SUMMER",
                    content2: "RUN",
                    content3: "OBJECTIVES:",
                    content4: "Weight Loss,Toning",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                },
                {
                    content1: "SUMMER",
                    content2: "RUN",
                    content3: "OBJECTIVES:",
                    content4: "Weight Loss,Toning",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                },
                {
                    content1: "SUMMER",
                    content2: "RUN",
                    content3: "OBJECTIVES:",
                    content4: "Weight Loss,Toning",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                },
                {
                    content1: "SUMMER",
                    content2: "RUN",
                    content3: "OBJECTIVES:",
                    content4: "Weight Loss,Toning",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                },
            ],
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <View>
                <ImageBackground source={item.imageBackground} style={styles.renderImageBackground}>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.renderShadow} >
                        <View style={{ flexDirection: "row",justifyContent:"space-between"}}>
                            <TouchableOpacity onPress={() => { this.props.navigation.goBack()}} style={{ marginTop: getLayoutSize(10), left: getLayoutSize(20),}} >
                                <Image source={require("../../Assets/ImageAndIcons/back_with_arrow.png")} style={styles.headerImageArrow} />
                            </TouchableOpacity>
                            <Image source={require("../../Assets/ImageAndIcons/ic_bookmark.png")} style={styles.headerImageBookmark} />
                        </View>
                        <View style={{ padding: getLayoutSize(20),marginTop:getLayoutSize(180) }}>
                            <Text style={styles.content1}>{item.content1}</Text>
                            <View style={{ marginTop: getLayoutSize(5) }}>
                                <Text style={styles.content2}>{item.content2}</Text>
                                <Text style={styles.content2}>{item.content3}</Text>
                            </View>
                            <Text style={styles.content3}>{item.content4}</Text>
                            <View style={{ flexDirection: "row", marginTop: getLayoutSize(20) }}>
                                <View style={styles.imageCircleView1}>
                                    <View style={styles.imageCircleView2}>
                                        <Image source={item.imageProfile} style={styles.renderImage} />
                                    </View>
                                </View>
                                <Text style={styles.content4}>{item.content5}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </ImageBackground>
            </View>
        );
    }

    renderItem2 = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "column", marginTop: getLayoutSize(20)}}>
                    <ImageBackground source={item.imageBackground} style={styles.render2ImageBackground}>
                        <View style={styles.renderBoxView}>
                            <View style={{ paddingLeft: getLayoutSize(20),marginTop:getLayoutSize(50)}}>
                                <View style={{ marginTop: getLayoutSize(5) }}>
                                    <Text style={styles.render2Content1}>{item.content1}</Text>
                                    <Text style={styles.render2Content1}>{item.content2}</Text>
                                </View>
                                <Text style={styles.render2Content3}>{item.content3}</Text>
                                <Text style={styles.render2Content4}>{item.content4}</Text>
                            </View>
                    </View>
                    </ImageBackground>
            </View>
        );
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <ScrollView>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(index) => index.toString()}
                        renderItem={this.renderItem.bind(this)}
                        horizontal={false} />
                    <View style={{ paddingLeft: getLayoutSize(20), paddingRight: getLayoutSize(20),}}>
                        <View style={{flexDirection:"column"}}>
                            <HTML html={htmlContent} contentWidth={screenWidth} />
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: getLayoutSize(50),}}>
                                <Text style={styles.moreFromHebaText}>MORE FROM HEBA</Text>
                                <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                            </View>
                            <FlatList
                                data={this.state.data2}
                                keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem2.bind(this)}
                                horizontal={true} />
                        </View>
                        <View style={{marginBottom:getLayoutSize(20)}}></View>
                    </View>
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
    headerImageArrow: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        alignItems: "flex-end",
    },
    headerImageBookmark: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        alignItems: "flex-start",
        right: getLayoutSize(20),
        marginTop: getLayoutSize(10),
        resizeMode:"contain"
    },
    renderImageBackground: {
        height: getLayoutSize(480),
        width: "100%",
        justifyContent: "center",
    },
    renderShadow: {
        width: "100%",
        height: getLayoutSize(480),
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
    content3: {
        color: "#e6e6e6",
        fontSize: getFontSize(15),
        fontFamily: AppFonts.text.font3,
        marginTop: getLayoutSize(10),
    },
    content4: {
        color: "#dedede",
        fontSize: getFontSize(15),
        fontFamily: AppFonts.text.font4,
        alignSelf: "center",
        marginLeft: getLayoutSize(15),
    },
    imageCircleView1: {
        height: getLayoutSize(56),
        width: getLayoutSize(56),
        borderRadius: 28,
        borderWidth: 1,
        borderColor: "#818181",
        justifyContent: "center",
    },
    imageCircleView2: {
        height: getLayoutSize(50),
        width: getLayoutSize(50),
        borderRadius: 25,
        borderWidth: 0.7,
        borderColor: "#00f3b9",
        justifyContent: "center",
        alignSelf: "center",
    },
    renderImage: {
        height: getLayoutSize(48),
        width: getLayoutSize(48),
        borderRadius: 24,
        alignSelf: "center",
    },
    moreFromHebaText:{
        color:"#dedede",
        fontSize:getFontSize(15),
        fontFamily:AppFonts.text.font4,
        alignSelf:"center",
    },
    codeImage: {
        tintColor: "#868686",
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        marginRight: getLayoutSize(15),
        alignSelf:"center"
    },
    render2ImageBackground: {
        height: getLayoutSize(350),
        width: getLayoutSize(300),
        justifyContent: "center",
        marginRight: getLayoutSize(20),
        padding:getLayoutSize(10)
    },
    renderBoxView:{
        borderWidth:1,
        borderColor:"#818181",
        height:getLayoutSize(320),
        width:"100%",
    },
    render2Content1: {
        color: "#ffffff",
        fontSize: getFontSize(25),
        fontFamily: AppFonts.text.font2,
    },
    render2Content3: {
        color: "#00f3b9",
        fontSize: getFontSize(12),
        fontFamily: AppFonts.text.font3,
        marginTop: getLayoutSize(30),
    },
    render2Content4: {
        color: "#ffffff",
        fontSize: getFontSize(14),
        fontFamily: AppFonts.text.font3,
        marginTop:getLayoutSize(5),
    },
});