//SelectPlanScreen

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

import { button, AppFonts, TrialHeader } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class SelectPlanScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            data1:[
                {
                    content:"Lose weight and reduce bodyfat",
                },
                {
                    content: "Improve overall strength of your body",
                },
            ],
            data2: [
                {
                    content: "+ Custom diet approach used by @ 'trainer_name' ",
                },
                {
                    content: "+ Workout plan",
                },
                {
                    content: "+ Cardio plan",
                },
                {
                    content: "+ Recommended supplements",
                },
            ],
        };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("PlanScreen")
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }


    render(){
        return(
            <View style={styles.mainContainer}>
                <ScrollView>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/bg_one.png")} style={styles.backgroundImage}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.shadow}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("PlanScreen") }} style={{ top: getLayoutSize(15), marginLeft: getLayoutSize(10),}}>
                                <Image source={require("../../Assets/ImageAndIcons/back_with_arrow.png")} style={styles.imageArrow} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("VideoPlayScreen") }} style={{top:getLayoutSize(100)}}>
                                <Image source={require("../../Assets/ImageAndIcons/video_play.png")} style={styles.videoPlayImage}></Image>
                            </TouchableOpacity>
                            <View style={styles.container}>
                                <View style={styles.profileOuter}>
                                    <Image source={require("../../Assets/ImageAndIcons/Bitmap_3.png")} style={styles.profileImage}></Image>
                                </View>
                                <Text style={styles.profileName}>@ANLELLASAGRA</Text>
                                <View style={{marginTop:getLayoutSize(10)}}>
                                    <Text style={styles.summerText}>SUMMER {"\n"}SHRED</Text>
                                </View>
                                <View style={{flexDirection:"row",marginTop:getLayoutSize(40)}}>
                                    <View style={styles.durationView}>
                                        <View style={styles.topLineView}></View>
                                        <Image source={require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt_3x.png")} style={styles.durationImage}/>
                                        <View style={styles.topLineView}></View>
                                        <View style={styles.durationContentView}>
                                            <Text style={styles.durationContentText1}>40 Mins</Text>
                                            <Text style={styles.durationContentText2}>Duration</Text>
                                        </View>
                                    </View>
                                    <View style={styles.durationView}>
                                        <View style={styles.topLineView}></View>
                                        <Image source={require("../../Assets/ImageAndIcons/brightness.png")} style={styles.durationImage} />
                                        <View style={styles.topLineView}></View>
                                        <View style={styles.durationContentView}>
                                            <Text style={styles.durationContentText1}>4</Text>
                                            <Text style={styles.durationContentText2}>Days/Week</Text>
                                        </View>
                                    </View>
                                    <View style={styles.durationView}>
                                        <View style={styles.topLineView}></View>
                                        <Image source={require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png")} style={styles.durationImage} />
                                        <View style={styles.topLineView}></View>
                                        <View style={styles.weekContentView}>
                                            <Text style={styles.durationContentText1}>8</Text>
                                            <Text style={styles.durationContentText2}>Weeks</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                    <View style={{padding:getLayoutSize(20)}}>
                        <View style={styles.goalView}>
                            <View style={styles.goalTopLineView}></View>
                            <Text style={styles.goalText}>GOAL OF THIS PLAN</Text>
                            <View style={styles.goalTopLineView}></View>
                            <View style={styles.goalContentView}>
                                {this.state.data1.map((item) => (
                                    <Text style={styles.goalContentText}>{item.content}</Text>
                                )
                                )}
                            </View>
                        </View>
                        <View style={styles.needView}>
                            <View style={styles.needTopLineView}></View>
                            <Text style={styles.goalText}>WHAT YOU GET & NEED</Text>
                            <View style={styles.needTopLineView}></View>
                            <View style={styles.goalContentView}>
                                {this.state.data2.map((item) => (
                                    <Text style={styles.needContentText}>{item.content}</Text>
                                )
                                )}
                            </View>
                        </View>
                        </View>
                    <View style={styles.registerButtonView}>
                        <TouchableOpacity style={styles.ButtonLoginContainer} onPress={() => { this.props.navigation.navigate("BottomTabNavigator") }}>
                            <Text style={styles.mainScreenButtonLoginText}>SELECT THIS PLAN</Text>
                        </TouchableOpacity>
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
    container: {
        flex: 1,
        padding: getLayoutSize(15),
        top: getLayoutSize(110),
    },
    backgroundImage: {
        flex: 1,
        height: getLayoutSize(500),
        width: "100%",
       
    },
    shadow: {
        width: "100%",
        height: getLayoutSize(500),
        position: "absolute",
    },
    imageArrow: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        tintColor: "#ffffff", 
    },
    videoPlayImage:{
        height:getLayoutSize(100),
        width: getLayoutSize(100),
        alignSelf:"center",
    },
    profileOuter:{
        borderRadius: 25, 
        height: getLayoutSize(50), 
        width: getLayoutSize(50),
        borderColor:"#e6e6e6",
        borderWidth:1,
        justifyContent:"center"
    },
    profileImage:{
        width:getLayoutSize(40),
        height:getLayoutSize(40),
        borderRadius:20,
        alignSelf:"center"
    },
    profileName:{
        color:"#e6e6e6",
        fontFamily:AppFonts.text.font4,
        fontSize:getFontSize(14),
        marginTop:getLayoutSize(5),
    },
    summerText:{
        color:"#ffffff",
        fontFamily:AppFonts.text.font2,
        fontSize:getFontSize(40),
    },
    durationView:{
        borderWidth: 1,
        borderColor: "#868686",
        height: getLayoutSize(105),
        width:"30%",
        marginLeft:getLayoutSize(10),
        borderTopWidth: 0,
        flexDirection: "row",
    },
    topLineView: {
        borderTopWidth: 0.8,
        borderColor: "#868686",
        width:"34.5%"
    },
    durationImage:{
        width:getLayoutSize(25),
        height:getLayoutSize(25),
        tintColor:"#868686",
        marginTop:getLayoutSize(-10),
        marginLeft:getLayoutSize(5),
        marginRight:getLayoutSize(5),
    },
    durationContentView: {
        position: "absolute",
        marginTop: getLayoutSize(30),
        marginLeft:getLayoutSize(15),
        justifyContent:"center"
    },
    durationContentText1:{
        color:"#dedede",
        fontFamily:AppFonts.text.font2,
        alignSelf:"center",
        fontSize:getFontSize(14)
    },
    durationContentText2: {
        color:"#868686",
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        fontSize: getFontSize(15),
        marginTop:getLayoutSize(8),
    },
    weekContentView: {
        position: "absolute",
        marginTop: getLayoutSize(30),
        marginLeft: getLayoutSize(30),
    },
    goalView:{
        borderWidth: 1,
        borderColor: "#868686",
        height: getLayoutSize(130),
        width: "100%",
        borderTopWidth: 0,
        marginTop: getLayoutSize(120),
        flexDirection: "row",
    },
    goalTopLineView:{
        borderTopWidth: 0.8,
        borderColor: "#868686",
        width: "23.7%"
    },
    goalText:{
        color:"#dedede",
        fontSize:getFontSize(13),
        marginLeft:getLayoutSize(10),
        marginRight: getLayoutSize(10),
        marginTop:getLayoutSize(-10),
        fontFamily:AppFonts.text.font2,
    },
    goalContentView: {
        position: "absolute",
        marginTop: getLayoutSize(30),
        marginLeft: getLayoutSize(15),
        justifyContent: "center"
    },
    goalContentText: {
        color: "#868686",
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        fontSize: getFontSize(15),
        marginLeft:getLayoutSize(20),
        marginTop: getLayoutSize(10),
    },
    needView: {
        borderWidth: 1,
        borderColor: "#868686",
        height: getLayoutSize(220),
        width: "100%",
        borderTopWidth: 0,
        marginTop: getLayoutSize(50),
        flexDirection: "row",
    },
    needTopLineView: {
        borderTopWidth: 0.8,
        borderColor: "#868686",
        width: "20.2%"
    },
    needContentText: {
        color: "#868686",
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        fontSize: getFontSize(14),
        marginLeft:getLayoutSize(3),
        marginTop:getLayoutSize(17)
    },
    registerButtonView: {
        marginTop: getLayoutSize(20),
        padding: getLayoutSize(20),
    },
    ButtonLoginContainer: {
        height: getLayoutSize(50),
        width: "100%",
        borderRadius: 40,
        borderColor: "#00f3b9",
        justifyContent: "center",
        borderWidth: 1,
    },
    mainScreenButtonLoginText: {
        fontWeight: "bold",
        color: "#00f3b9",
        fontSize: getFontSize(13),
        alignSelf: "center",
    },
});
