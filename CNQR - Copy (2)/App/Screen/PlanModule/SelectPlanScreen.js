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
import AsyncStorage from '@react-native-community/async-storage';
import HTML from "react-native-render-html";
import { WebView } from 'react-native-webview';

import { Constants } from '../../RestAPI/Constants';
import { post } from '../../RestAPI/RestAPIHandler';
import ModalProgress from '../../Component/ModalProgress';
import Utils from '../../Component/Utils';
import { button, AppFonts, TrialHeader,Colors,TextUtils,ScaleUtils } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';
import { color } from 'react-native-reanimated';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class SelectPlanScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoading:false,
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
            duration:"",
            day_week:"",
            week:"",
            profile:"",
            htmlContent:"",
            htmlContentNeed:"",
            trainer_name:"",
            name:"",
            video:"",
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

    async componentDidMount(){
        this.doRecommendedPlanDetail()
    }

    async doRecommendedPlanDetail() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                plan_id: await AsyncStorage.getItem("@plan_list_id")
            })
            var data = await post(Constants.RECOMMENDED_PLAN_DETAIL, body);
            console.log(("Data-->" + JSON.stringify(data)));

            this.setState({ duration: data.data.duration})
            this.setState({ day_week: data.data.days_week})
            this.setState({ week: data.data.weeks})
            this.setState({ profile: data.data.trainer_thumb })
            this.setState({ trainer_name: data.data.trainer_name})
            this.state.trainer_name = this.state.trainer_name.replace(/['"]+/g, '')
            this.setState({ name: data.data.name})
            this.state.name = this.state.name.replace(/['"]+/g, '')

            this.setState({ video: data.data.video })
        
            this.state.htmlContent=data.data.goal_of_plan
            this.state.htmlContentNeed = data.data.get_need

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
                
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert","Please check your internet connection.")
        }
    }

    async doChoosePlan() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                user_id: await AsyncStorage.getItem("@user_id"),
                plan_id: await AsyncStorage.getItem("@plan_list_id")
            })
            var data = await post(Constants.CHOOSE_PLAN, body);
            console.log(("Data-->" + JSON.stringify(data)));

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
                Utils.DialogBox(data.message)
                this.props.navigation.navigate("HomeNavigatorStack",{screen:"BottomNavigator"});
              
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Please check your internet connection.")
        }
    }


    render(){
        return(
            <View style={styles.mainContainer}>
                <ScrollView>
                    <ModalProgress
                        isVisible={this.state.isLoading}></ModalProgress>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/bg_one.png")} style={styles.backgroundImage}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.shadow}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("PlanScreen") }} style={{ top: getLayoutSize(15), marginLeft: getLayoutSize(10),}}>
                                <Image source={require("../../Assets/ImageAndIcons/back_with_arrow.png")} style={styles.imageArrow} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("VideoPlayScreen",{video:this.state.video}) }} style={{top:getLayoutSize(100)}}>
                                <Image source={require("../../Assets/ImageAndIcons/video_play.png")} style={styles.videoPlayImage}></Image>
                            </TouchableOpacity>
                            <View style={styles.container}>
                                <View style={styles.profileOuter}>
                                    <Image source={{ uri:this.state.profile}} style={styles.profileImage}></Image>
                                </View>
                                <Text style={styles.profileName}>{this.state.trainer_name}</Text>
                                <View style={{marginTop:getLayoutSize(10)}}>
                                    <Text style={styles.summerText}>{this.state.name}</Text>
                                </View>
                                <View style={{flexDirection:"row",marginTop:getLayoutSize(40)}}>
                                    <View style={styles.durationView}>
                                        <View style={styles.topLineView}></View>
                                        <Image source={require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png")} style={styles.durationImage}/>
                                        <View style={styles.topLineView}></View>
                                        <View style={styles.durationContentView}>
                                            <Text style={styles.durationContentText1}>{this.state.duration}</Text>
                                            <Text style={styles.durationContentText2}>Duration</Text>
                                        </View>
                                    </View>
                                    <View style={styles.durationView}>
                                        <View style={styles.topLineView}></View>
                                        <Image source={require("../../Assets/ImageAndIcons/brightness.png")} style={styles.durationImage} />
                                        <View style={styles.topLineView}></View>
                                        <View style={styles.durationContentView}>
                                            <Text style={styles.durationContentText1}>{this.state.day_week}</Text>
                                            <Text style={styles.durationContentText2}>Days/Week</Text>
                                        </View>
                                    </View>
                                    <View style={styles.durationView}>
                                        <View style={styles.topLineView}></View>
                                        <Image source={require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt.png")} style={styles.durationImage} />
                                        <View style={styles.topLineView}></View>
                                        <View style={styles.weekContentView}>
                                            <Text style={styles.durationContentText1}>{this.state.week}</Text>
                                            <Text style={styles.durationContentText2}>Weeks</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                    <View style={{ padding: ScaleUtils.SCREEN_PADDING,}}>
                        <View style={styles.goalView}>
                            <View style={styles.goalTopLineView}></View>
                            <Text style={styles.goalText}>GOAL OF THIS PLAN</Text>
                            <View style={styles.goalTopLineView}></View>
                            <View style={styles.goalContentView}>
                                <HTML html={this.state.htmlContent } baseFontStyle={styles.goalContentText} containerStyle={{alignItems:"center"}} />
                            </View>
                        </View>
                        <View style={styles.needView}>
                            <View style={styles.needTopLineView}></View>
                            <Text style={styles.goalText}>WHAT YOU GET & NEED</Text>
                            <View style={styles.needTopLineView}></View>
                            <View style={styles.goalContentView}>
                                <HTML html={this.state.htmlContentNeed} baseFontStyle={styles.goalContentText} containerStyle={{ alignItems: "center" }} />
                            </View>
                        </View>
                        </View>
                    <View style={styles.registerButtonView}>
                        <TouchableOpacity style={styles.ButtonLoginContainer} onPress={() => { this.doChoosePlan() }}>
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
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
    },
    container: {
        flex: 1,
        padding: ScaleUtils.MARGIN_TOP_FIFTEEN,
        top: getLayoutSize(110),
    },
    backgroundImage: {
        flex: 1,
        height: getLayoutSize(500),
        width:ScaleUtils.IMAGE_WIDTH,
       
    },
    shadow: {
        width: ScaleUtils.IMAGE_WIDTH,
        height: getLayoutSize(500),
        position: "absolute",
    },
    imageArrow: {
        height: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        width: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        tintColor: Colors.DEFAULT_APP_FONT_COLOR, 
    },
    videoPlayImage:{
        height:ScaleUtils.IMAGE_SIZE_HUNDRED,
        width: ScaleUtils.IMAGE_SIZE_HUNDRED,
        alignSelf:"center",
    },
    profileOuter:{
        borderRadius: 25, 
        height: ScaleUtils.IMAGE_SIZE_FIFTY, 
        width: ScaleUtils.IMAGE_SIZE_FIFTY,
        borderColor:Colors.DEFAULT_SUB_CONTENT_COLOR,
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
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily:AppFonts.text.font4,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        marginTop:ScaleUtils.MARGIN_FIVE,
    },
    summerText:{
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily:AppFonts.text.font2,
        fontSize: TextUtils.TEXT_SIZE_FORTY,
    },
    durationView:{
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        height: getLayoutSize(105),
        width:"30%",
        marginLeft: ScaleUtils.MARGIN_TOP_TEN,
        borderTopWidth: 0,
        flexDirection: "row",
    },
    topLineView: {
        borderTopWidth: 0.8,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width:"34.5%"
    },
    durationImage:{
        width:ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        height:ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        tintColor: Colors.DEFAULT_CONTENT_COLOR,
        marginTop:getLayoutSize(-10),
        marginLeft: ScaleUtils.MARGIN_FIVE,
        marginRight: ScaleUtils.MARGIN_FIVE,
    },
    durationContentView: {
        position: "absolute",
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
        marginLeft:ScaleUtils.MARGIN_TOP_FIFTEEN,
        justifyContent:"center"
    },
    durationContentText1:{
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily:AppFonts.text.font2,
        alignSelf:"center",
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
    },
    durationContentText2: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        marginTop:getLayoutSize(8),
    },
    weekContentView: {
        position: "absolute",
        marginTop:ScaleUtils.MARGIN_TOP_THIRTY,
        marginLeft: ScaleUtils.MARGIN_TOP_THIRTY,
    },
    goalView:{
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        height: getLayoutSize(110),
        width: ScaleUtils.IMAGE_WIDTH,
        borderTopWidth: 0,
        marginTop: getLayoutSize(120),
        flexDirection: "row",
        justifyContent:"center"
    },
    goalTopLineView:{
        borderTopWidth: 0.8,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width: "25.4%"
    },
    goalText:{
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        marginLeft: ScaleUtils.MARGIN_TOP_TEN,
        marginRight: ScaleUtils.MARGIN_TOP_TEN,
        marginTop:getLayoutSize(-10),
        fontFamily:AppFonts.text.font2,
    },
    goalContentView: {
        position: "absolute",
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
        justifyContent: "center"
    },
    goalContentText: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        fontSize: getFontSize(14),
        marginLeft: getLayoutSize(35),
        marginTop: ScaleUtils.MARGIN_TOP_TEN,
    },
    needView: {
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        height: getLayoutSize(150),
        width: "100%",
        borderTopWidth: 0,
        marginTop:ScaleUtils.AUTHENTICATION_BUTTON_MARGIN_TOP,
        flexDirection: "row",
        justifyContent:"center"
    },
    needTopLineView: {
        borderTopWidth: 0.8,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width: "22%"
    },
    needContentText: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        fontSize:getFontSize(13),
        marginLeft:getLayoutSize(3),
        marginTop:getLayoutSize(17)
    },
    registerButtonView: {
        marginTop:ScaleUtils.MARGIN_TWENTY,
        padding: ScaleUtils.SCREEN_PADDING,
    },
    ButtonLoginContainer: {
        height: ScaleUtils.IMAGE_SIZE_FIFTY,
        width: ScaleUtils.IMAGE_WIDTH,
        borderRadius: 40,
        borderColor: Colors.COLOR_PRIMARY,
        justifyContent: "center",
        borderWidth: 1,
    },
    mainScreenButtonLoginText: {
        fontFamily: AppFonts.text.font4,
        color: Colors.COLOR_PRIMARY,
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf: "center",
    },
});
