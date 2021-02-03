//IconDetailScreen

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

export default class IconDetailScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    content1: "WEIGHT LOSS",
                    content2: "SUMMER",
                    content3: "SHRED",
                    content4: "5 per week",
                    content5: "8 weeks",
                    image1: require("../../Assets/ImageAndIcons/dumbell.png"),
                    image2: require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png"),
                    image3: require("../../Assets/ImageAndIcons/fitness_girl.jpg"),
                },
                {
                    content1: "WEIGHT LOSS",
                    content2: "SUMMER",
                    content3: "SHRED",
                    content4: "5 per week",
                    content5: "8 weeks",
                    image1: require("../../Assets/ImageAndIcons/dumbell.png"),
                    image2: require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png"),
                    image3: require("../../Assets/ImageAndIcons/fitness_girl.jpg"),
                },
                {
                    content1: "WEIGHT LOSS",
                    content2: "SUMMER",
                    content3: "SHRED",
                    content4: "5 per week",
                    content5: "8 weeks",
                    image1: require("../../Assets/ImageAndIcons/dumbell.png"),
                    image2: require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png"),
                    image3: require("../../Assets/ImageAndIcons/fitness_girl.jpg"),
                },
                {
                    content1: "WEIGHT LOSS",
                    content2: "SUMMER",
                    content3: "SHRED",
                    content4: "5 per week",
                    content5: "8 weeks",
                    image1: require("../../Assets/ImageAndIcons/dumbell.png"),
                    image2: require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png"),
                    image3: require("../../Assets/ImageAndIcons/fitness_girl.jpg"),
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
            data3:[
                {
                    image: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/pushups.jpg"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/pushups.jpg"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/pushups.jpg"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/pushups.jpg"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
            ],
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "column" }}>
                <ImageBackground source={item.image3} style={styles.renderImageBackground} imageStyle={styles.renderImageStyle}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("SelectPlanScreen") }}>
                        <View style={styles.renderBoxView}>
                            <Text style={styles.content1}>{item.content1}</Text>
                            <View style={{ marginTop: getLayoutSize(5) }}>
                                <Text style={styles.content2}>{item.content2}</Text>
                                <Text style={styles.content2}>{item.content3}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={item.image1} style={styles.renderImage} />
                                <Text style={styles.content4}>{item.content4}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={item.image2} style={styles.renderImage} />
                                <Text style={styles.content4}>{item.content5}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }

    renderItem2 = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "column", marginTop: getLayoutSize(20),}}>
                <ImageBackground source={item.imageBackground} style={styles.render2ImageBackground}>
                    <View style={styles.render2BoxView}>
                        <View style={{ paddingLeft: getLayoutSize(20), marginTop: getLayoutSize(50) }}>
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

    renderItem3({item}){
        return(
            <View>
                <Image source={item.image} style={styles.followImage}></Image>
            </View>
        );
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <ScrollView>
                <ImageBackground source={require("../../Assets/ImageAndIcons/pushups.jpg")} style={styles.imageBackground}>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.shadow} >
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ marginTop: getLayoutSize(10), left: getLayoutSize(20), }} >
                            <Image source={require("../../Assets/ImageAndIcons/back_with_arrow.png")} style={styles.headerImageArrow} />
                        </TouchableOpacity>
                        <View style={styles.container}>
                            <View style={styles.imageCircleView1}>
                                <View style={styles.imageCircleView2}>
                                    <Image source={require("../../Assets/ImageAndIcons/Bitmap_3.png")} style={styles.imageProfile} />
                                    <Image source={require("../../Assets/ImageAndIcons/play.png")} style={styles.imagePlay} />
                                </View>
                            </View>
                            <Text style={styles.content1}>@EVOLVE.NATION</Text>
                            <View style={{ marginTop: getLayoutSize(10) }}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={styles.lineView}></View>
                                    <Text style={styles.content2}>HEBA</Text>
                                </View>
                                <Text style={styles.content2}>{"\t\t"}ALI</Text>
                            </View>
                            <View style={styles.fitnessCreatorView}>
                                <Text style={styles.content4}>FITNESS CREATOR</Text>
                            </View>
                                <View style={{ flexDirection: "row", marginTop: getLayoutSize(40) }}>
                                    <View style={styles.durationView}>
                                        <View style={styles.topLineLocationView}></View>
                                        <Image source={require("../../Assets/ImageAndIcons/outline_room_black_48pt_3x.png")} style={styles.durationImage} />
                                        <View style={styles.topLineLocationView}></View>
                                        <View style={styles.durationContentView}>
                                            <Text style={styles.durationContentText1}>Los Angeles</Text>
                                            <Text style={styles.durationContentText2}>USA</Text>
                                        </View>
                                    </View>
                                    <View style={styles.durationView}>
                                        <View style={styles.topLinePlanView}></View>
                                        <Image source={require("../../Assets/ImageAndIcons/outline_filter_none_black_48pt_3x.png")} style={styles.planImage} />
                                        <View style={styles.topLinePlanView}></View>
                                        <View style={styles.planContentView}>
                                            <Text style={styles.durationContentText1}>02</Text>
                                            <Text style={styles.durationContentText2}>Plans</Text>
                                        </View>
                                    </View>
                                    <View style={styles.durationView}>
                                        <View style={styles.topLineFollowersView}></View>
                                        <Image source={require("../../Assets/ImageAndIcons/user.png")} style={styles.planImage} />
                                        <View style={styles.topLineFollowersView}></View>
                                        <View style={styles.followersContentView}>
                                            <Text style={styles.durationContentText1}>331k</Text>
                                            <Text style={styles.durationContentText2}>Followers</Text>
                                        </View>
                                    </View>
                                </View>
                        </View>
                    </ImageBackground>
                </ImageBackground>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: getLayoutSize(40),padding:getLayoutSize(20) }}>
                        <Text style={styles.moreFromHebaText}>SELECT ONE OF MY PLAN</Text>
                        <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(index) => index.toString()}
                            renderItem={this.renderItem.bind(this)}
                            horizontal={true} />
                    </View>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/all.jpg")} style={styles.quoteImageBackground}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.quoteImageShadow} >
                            <Image source={require("../../Assets/ImageAndIcons/quote.png")} style={styles.renderImage}></Image>
                            <View style={{marginTop:getLayoutSize(30)}}>
                                <Text style={styles.quotedText}>HEBA HELPED ME TAKE IT A STEP {"\n"} FURTHER.I'VE GOT MY BODY AND </Text>
                                <Text style={styles.quotedText}>CONFIDENCE BACK.</Text>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                    <View style={{ padding: getLayoutSize(20) }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: getLayoutSize(40), }}>
                            <Text style={styles.moreFromHebaText}>CLIENT TESTIMONIALS</Text>
                            <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                        </View>
                        <View style={styles.boxView}>
                            <Text style={styles.boxText}>Lorem ipsum dolor sit amet,consectetur adipisicing elit,
                                Lorem ipsum dolor sit amet,consectetur adipisicing elit,
                                Lorem ipsum dolor sit amet,consectetur adipisicing elit,
                            </Text>
                            <View style={{flexDirection:"row",marginTop:getLayoutSize(92)}}>
                                <View style={styles.boxLeftLine}></View>
                                <View style={{flexDirection:"row"}}>
                                    <View style={styles.boxImageCircleView}>
                                        <Image source={require("../../Assets/ImageAndIcons/Bitmap_3.png")} style={styles.boxImageProfile} />
                                    </View>
                                    <View style={{marginTop:getLayoutSize(-10),}}>
                                        <Text style={styles.boxProfileName}>{"\t\t"}JENNY CLIFFE</Text>
                                        <Text style={styles.boxProfileLocation}>LONDON, UK</Text>
                                    </View>
                                </View>
                                <View style={styles.boxRightLine}></View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: getLayoutSize(60), }}>
                            <Text style={styles.moreFromHebaText}>TIPS  &  ADVICE</Text>
                            <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                        </View>
                        <FlatList
                            data={this.state.data2}
                            keyExtractor={(index) => index.toString()}
                            renderItem={this.renderItem2.bind(this)}
                            horizontal={true} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: getLayoutSize(30), }}>
                            <Text style={styles.moreFromHebaText}>FOLLOW ME</Text>
                        </View>
                        <View style={{marginTop:getLayoutSize(20)}}>
                            <FlatList
                                data={this.state.data3}
                                keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem3.bind(this)}
                                numColumns={3} />
                        </View>
                    </View>
                    <View style={{marginBottom:getLayoutSize(10)}}></View>
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
    container: {
        flex: 1,
        padding: getLayoutSize(20),
    },
    headerImageArrow: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        alignItems: "flex-end",
    },
    imageBackground: {
        height: getLayoutSize(500),
        width: "100%",
        justifyContent: "center",
    },
    shadow: {
        width: "100%",
        height: getLayoutSize(500),
    },
    imageCircleView1: {
        height: getLayoutSize(56),
        width: getLayoutSize(56),
        borderRadius: 28,
        borderWidth: 1,
        borderColor: "#818181",
        justifyContent: "center",
        marginTop:getLayoutSize(60),
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
    imageProfile: {
        height: getLayoutSize(48),
        width: getLayoutSize(48),
        borderRadius: 24,
        alignSelf: "center",
    },
    imagePlay: {
        height: getLayoutSize(15),
        width: getLayoutSize(15),
        tintColor: "#dedede",
        resizeMode: "cover",
        alignSelf: "center",
        position:"absolute"
    },
    content1: {
        color: "#dedede",
        fontSize: getFontSize(11),
        fontFamily: AppFonts.text.font4,
        marginTop:getLayoutSize(20),
    },
    lineView: {
        height: getLayoutSize(40),
        width: getLayoutSize(3),
        backgroundColor: "#00f3b9",
        marginRight: getLayoutSize(10),
        alignSelf: "center",
    },
    content2: {
        color: "#ffffff",
        fontSize: getFontSize(37),
        fontFamily: AppFonts.text.font2,
    },
    fitnessCreatorView: {
        height: getLayoutSize(30),
        width: getLayoutSize(150),
        backgroundColor: "#1e1e1e",
        borderRadius: 20,
        justifyContent: "center",
        marginTop: getLayoutSize(15)
    },
    content4: {
        color: "#dedede",
        fontSize: getFontSize(12),
        fontFamily: AppFonts.text.font4,
        alignSelf: "center",
    },
    durationView: {
        borderWidth: 1,
        borderColor: "#868686",
        height: getLayoutSize(95),
        width: "30%",
        marginLeft: getLayoutSize(10),
        borderTopWidth: 0,
        flexDirection: "row",
    },
    topLineLocationView: {
        borderTopWidth: 0.8,
        borderColor: "#868686",
        width: "34.3%"
    },
    topLinePlanView: {
        borderTopWidth: 0.8,
        borderColor: "#868686",
        width: "36%"
    },
    topLineFollowersView: {
        borderTopWidth: 0.8,
        borderColor: "#868686",
        width: "36%"
    },
    durationImage: {
        width: getLayoutSize(25),
        height: getLayoutSize(25),
        tintColor: "#868686",
        marginTop: getLayoutSize(-10),
        marginLeft: getLayoutSize(5),
        marginRight: getLayoutSize(5),
    },
    durationContentView: {
        position: "absolute",
        marginTop: getLayoutSize(30),
        marginLeft:getLayoutSize(10),
        justifyContent: "center"
    },
    durationContentText1: {
        color: "#dedede",
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        fontSize: getFontSize(15)
    },
    durationContentText2: {
        color: "#868686",
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        fontSize: getFontSize(12),
        marginTop: getLayoutSize(8),
    },
    planImage: {
        width: getLayoutSize(20),
        height: getLayoutSize(20),
        tintColor: "#868686",
        marginTop: getLayoutSize(-10),
        marginLeft: getLayoutSize(5),
        marginRight: getLayoutSize(5),
    },
    planContentView: {
        position: "absolute",
        marginTop: getLayoutSize(30),
        marginLeft: getLayoutSize(32),
    },
    followersContentView: {
        position: "absolute",
        marginTop: getLayoutSize(30),
        marginLeft: getLayoutSize(22),
    },
    moreFromHebaText: {
        color: "#dedede",
        fontSize: getFontSize(15),
        fontFamily: AppFonts.text.font4,
        alignSelf: "center",
    },
    codeImage: {
        tintColor: "#868686",
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        marginRight: getLayoutSize(15),
        alignSelf: "center"
    },
    renderShadow: {
        width: "100%",
        height: screenHeight,
    },
    renderImageBackground: {
        marginTop:getLayoutSize(15),
        height: getLayoutSize(350),
        width: getLayoutSize(300),
        justifyContent: "center",
        marginLeft: getLayoutSize(20),
    },
    renderImageStyle: {
        resizeMode: "cover",
        borderColor: "transparent",
        borderRadius: 10,
        opacity: 0.8
    },
    renderBoxView: {
        height: getLayoutSize(330),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#868686",
        width: "92%",
        alignSelf: "center",
        padding: getLayoutSize(10),
    },
    renderContent1: {
        color: "#dedede",
        fontSize: getFontSize(13),
        fontFamily: AppFonts.text.font4,
        marginTop: getLayoutSize(20)
    },
    renderContent2: {
        color: "#ffffff",
        fontSize: getFontSize(30),
        fontFamily: AppFonts.text.font1,
    },
    renderContent4: {
        color: "#e6e6e6",
        fontSize: getFontSize(13),
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
    },
    renderImage: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        tintColor: "#e6e6e6",
        marginRight: getLayoutSize(10),
        alignSelf: "center",
    },
    quoteImageBackground: {
        height: getLayoutSize(250),
        width: "100%",
        justifyContent: "center",
        marginTop:getLayoutSize(40)
    },
    quoteImageShadow: {
        width: "100%",
        height: getLayoutSize(250),
        justifyContent:"center",
    },
    renderImage: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        tintColor: "#e6e6e6",
        marginRight: getLayoutSize(10),
        alignSelf: "center",
    },
    quotedText:{
        color:"#e6e6e6",
        fontFamily:AppFonts.text.font4,
        fontSize:getFontSize(15),
        alignSelf:"center"
    },
    boxView: {
        borderWidth: 1,
        borderColor: "#868686",
        height: getLayoutSize(224),
        borderBottomWidth: 0,
        padding:getLayoutSize(20),
        marginTop:getLayoutSize(20),
    },
    boxText:{
        color:"#818181",
        fontFamily:AppFonts.text.font3,
        fontSize:getFontSize(15),
        lineHeight:20,
    },
    boxLeftLine:{
        borderTopWidth: 1,
        borderColor: "#868686",
        width: "5%",
        marginLeft:getLayoutSize(-21),
    },
    boxRightLine:{
        borderTopWidth: 1,
        borderColor: "#868686",
        width: "50%",
        marginLeft:getLayoutSize(20)
    },
    boxImageCircleView: {
        height: getLayoutSize(50),
        width: getLayoutSize(50),
        borderRadius: 25,
        borderWidth: 0.7,
        borderColor: "#818181",
        justifyContent: "center",
        marginTop: getLayoutSize(-20),
        marginLeft:getLayoutSize(10)
    },
    boxImageProfile: {
        height: getLayoutSize(44),
        width: getLayoutSize(44),
        borderRadius: 22,
        alignSelf: "center",
    },
    boxProfileName: {
        color:"#e6e6e6",
        fontSize:getFontSize(13),
        fontFamily:AppFonts.text.font4,        
        alignSelf: "center",
    },
    boxProfileLocation: {
        color: "#818181",
        fontSize: getFontSize(11),
        fontFamily: AppFonts.text.font4,
        alignSelf: "center",
    },
    render2ImageBackground: {
        height: getLayoutSize(350),
        width: getLayoutSize(300),
        justifyContent: "center",
        marginRight: getLayoutSize(20),
        padding: getLayoutSize(10)
    },
    render2BoxView: {
        borderWidth: 1,
        borderColor: "#818181",
        height: getLayoutSize(320),
        width: "100%",
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
        color: "#e6e6e6",
        fontSize: getFontSize(15),
        fontFamily: AppFonts.text.font3,
        marginTop: getLayoutSize(10),
    },
    followImage:{
        height:getLayoutSize(150),
        width:getLayoutSize(120),
        resizeMode:"cover"
    },
});

