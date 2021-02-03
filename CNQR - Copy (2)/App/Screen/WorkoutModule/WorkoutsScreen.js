//WorkoutsScreen

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
    Modal,
    ActivityIndicator,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';
import { button, AppFonts, TrialHeader, Colors,TextUtils,ScaleUtils } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class WorkoutsScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            isOpenPicker: false,
            isOpenPicker2: false,
            userSelected: '',
            schedule_id:"",
            isLoading:false,
            GET_WORKOUT_DAYS:[],
            sets:[],
            discription:[],
            dayname:"",
            day:"",
            week:"",
            video: [  
                // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
                // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            ],
            currentdate:"",
        };
    }

    disableBackButton = () => {
        this.props.navigation.goBack();
        return false;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return (
            this.state.currentdate = year + '-' + month + '-' + date
        );
    }


    async componentDidMount() {
        const subscription_end_date = await AsyncStorage.getItem("@subscription_end_date")
        console.log("ENDDATE-----> " + subscription_end_date);

        this.getCurrentDate();

        console.log("CURRENTDATE-----> " + this.state.currentdate)

        if (this.state.currentdate === subscription_end_date) {
            { this.clickEventListener1(); }
        }

    }

    async GET_WORKOUT_DAYS() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                schedule_id: this.state.schedule_id,
            })
            var data = await post(Constants.WORKOUT_DAYS, body);
            console.log(("Data-->" + JSON.stringify(data)));
            this.setState({ isLoading: false });
            this.setState({ GET_WORKOUT_DAYS: data.data })
            console.log("GET_WORKOUT_DAYS--->" + JSON.stringify(this.state.GET_WORKOUT_DAYS));

            for (var i = 0; i < data.data.length; i++) {
                this.state.sets = data.data[i].sets.split(",")
            }
            console.log("SETS------->" + JSON.stringify(this.state.sets));

            for (var i = 0; i < data.data.length; i++) {
                this.state.discription = data.data[i].description.split(",")
            }
            console.log("DISCRIPTION------->" + this.state.discription);

            for(let i=0;i<data.data.length;i++){
                this.state.day=data.data[i].day
                this.state.dayname = data.data[i].dayname
            }

            this.setState({ week: this.props.route.params.week})

            for (let i = 0; i < data.data.length; i++) {
                this.state.video.push(
                     data.data[i].video
                 )
             }
            console.log("VIDEO--->"+this.state.video);
        
            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Please check your internet connection.")
        }
    }

    clickEventListener = (item) => {
        this.setState({ userSelected: item }, () => {
            this.setModalVisible(true);
        });
    }

    setModalVisible(visible) {
        this.setState({ isOpenPicker: visible });
    }

    clickEventListener2 = (item) => {
        this.setState({ userSelected: item }, () => {
            this.setModalVisible2(true);
        });
    }

    setModalVisible2(visible) {
        this.setState({ isOpenPicker2: visible });
    }

    mapnumber({ item }) {
        return (

            <ScrollView
                horizontal={true}
            >
                <View style={{ flexDirection: "row",}}>
                    <View style={styles.mapCircleView}>
                        <Text style={styles.mapNumberText}>{item}</Text>
                    </View>
                    <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt.png")} style={styles.renderImagePlay} />
                </View>
            </ScrollView>

        );
    }

    renderItem({item,index}){
        return(
            <View style={styles.renderView}>
                <TouchableOpacity style={styles.renderImage}
                onPress={() => { this.props.navigation.navigate("MultipleVideoScreen",{video:this.state.video,id:item.id})}}>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/bouncingBall.png")} style={styles.renderImage} imageStyle={styles.renderImageStyle} >
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.renderShadow}>
                            <Image source={require("../../Assets/ImageAndIcons/play.png")} style={styles.renderImagePlay}></Image>
                        </ImageBackground>
                    </ImageBackground>
               </TouchableOpacity>
                <View style={{ flexDirection: "column",marginLeft:getLayoutSize(120) }}>
                    <Text style={styles.headerText}>{item.name}</Text>
                    <View style={styles.mapView}>
                        {this.state.isLoading === true ?
                            <ActivityIndicator size="large" color="white" />
                            :
                            (
                                this.state.sets.length !== 0 ?
                                        <FlatList
                                        data={this.state.sets}
                                        keyExtractor={(index) => index.toString()}
                                        renderItem={this.mapnumber.bind(this)}
                                        horizontal={true}
                                    />
                                    :
                                    <Text style={{ color: Colors.DEFAULT_APP_FONT_COLOR }}>No Record Found</Text>
                            )}
                    </View>
                </View>
                <View style={{marginLeft:getLayoutSize(40)}}></View>
                <TouchableOpacity onPress={() => { this.clickEventListener(); }} style={styles.dropdownView}>
                    <Image source={require("../../Assets/ImageAndIcons/arrow-down-sign-to-navigate.png")} style={styles.dropdownImage}/>
                </TouchableOpacity>
            </View>
        );
    }

   renderItem2({ item }) {
        return (
            <View style={styles.renderView}>
                <TouchableOpacity style={styles.renderImage}
                    onPress={() => { this.props.navigation.navigate("MultipleVideoScreen",{video:this.state.video,id:item.id})}}>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/bouncingBall.png")} style={styles.renderImage} imageStyle={styles.renderImageStyle} >
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.renderShadow}>
                            <Image source={require("../../Assets/ImageAndIcons/play.png")} style={styles.renderImagePlay}></Image>
                        </ImageBackground>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={{ flexDirection: "column",marginLeft:getLayoutSize(120) }}>
                    <Text style={styles.headerText}>{item.name}</Text>
                    <View style={styles.mapView}>
                        {this.state.isLoading === true ?
                            <ActivityIndicator size="large" color="white" />
                            :
                            (
                                this.state.sets.length !== 0 ?
                                    <FlatList
                                        data={this.state.sets}
                                        keyExtractor={(index) => index.toString()}
                                        renderItem={this.mapnumber.bind(this)}
                                        horizontal={true}
                                    />
                                    :
                                    <Text style={{ color: Colors.DEFAULT_APP_FONT_COLOR }}>No Record Found</Text>
                            )}
                    </View>
                </View>
                <View style={{ marginLeft: getLayoutSize(40) }}></View>
                <TouchableOpacity onPress={() => { this.clickEventListener2(); }} style={styles.dropdownView}>
                    <Image source={require("../../Assets/ImageAndIcons/arrow-down-sign-to-navigate.png")} style={styles.dropdownImage} />
                </TouchableOpacity>
            </View>
        );
    }

    renderSeparator = () => {
        return (
            <View style={{
                height: 1,
                borderColor: "#282c30",
                borderWidth: 0.2,
                width: "100%",
            }}>
            </View>
        );
    }  

    render() {
        this.props.navigation.addListener(
            'focus',
            payload => {
                console.log("Payload is called ....................." + JSON.stringify(payload))
                //Alert.alert("att"+JSON.stringify(payload));
                if (this.props.route.params.schedule_id != "undefined") {
                    this.setState({ schedule_id: this.props.route.params.schedule_id })
                }
                console.log("SCHEDULE_ID-->" + this.props.route.params.schedule_id);

                this.GET_WORKOUT_DAYS()
            }
        );
        return (
            <View style={styles.mainContainer}>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/pushups.jpg")} style={styles.backgroundImage}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.shadow}>
                            <View style={styles.container}>
                                <View style={styles.registerButtonView}>
                                    <TouchableOpacity style={styles.ButtonLoginContainer} onPress={() => {}}>
                                        <Text style={styles.mainScreenButtonLoginText}>WEEK {this.state.week}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.summerText}>DAY {this.state.day}{"\n"}{this.state.dayname}</Text>
                                <Text style={styles.tipsText}>TODAYS EXERCISES</Text>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                    <ScrollView>
                        <Text style={styles.warmUpText}>Warm up</Text>
                        <View style={{marginTop:getLayoutSize(20),}}>
                        {this.state.isLoading === true ?
                            <ActivityIndicator size="large" color="white" />
                            :
                            (
                                this.state.GET_WORKOUT_DAYS.length !== 0 ?
                            <FlatList
                                data={this.state.GET_WORKOUT_DAYS}
                                keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem.bind(this)}
                                ItemSeparatorComponent={this.renderSeparator} />
                                    :
                                    <Text style={{ color: Colors.DEFAULT_CONTENT_COLOR }}>No Record Found</Text>
                            )}

                            <View style={{height: 1,borderColor: "#282c30", borderWidth: 0.2, width: "100%",}}></View>
                        </View>
                        <Text style={styles.warmUpText}>Start</Text>
                        <View style={{ marginTop: getLayoutSize(20),marginBottom:getLayoutSize(100) }}>
                        {this.state.isLoading === true ?
                            <ActivityIndicator size="large" color="white" />
                            :
                            (
                                this.state.GET_WORKOUT_DAYS.length !== 0 ?
                                    <FlatList
                                        data={this.state.GET_WORKOUT_DAYS}
                                        keyExtractor={(index) => index.toString()}
                                        renderItem={this.renderItem2.bind(this)}
                                        ItemSeparatorComponent={this.renderSeparator} />
                                    :
                                    <Text style={{ color: Colors.DEFAULT_CONTENT_COLOR }}>No Record Found</Text>
                            )}

                            <View style={{ height: 1, borderColor: "#282c30", borderWidth: 0.2, width: "100%", }}></View>
                        </View>
                    <Modal
                        transparent={true}
                        animationType={"feed"}
                        visible={this.state.isOpenPicker}>
                        <View style={styles.popupOverlay}>
                            <TouchableOpacity style={{ width: screenWidth, height: screenHeight, position: 'absolute' }}
                                onPress={() => { this.setModalVisible(false) }} />
                            <View style={styles.popup}>
                                {this.state.discription.map((item)=>(
                                    <Text style={{color:"white"}}>{item}</Text>
                                ))}
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        transparent={true}
                        animationType={"feed"}
                        visible={this.state.isOpenPicker2}>
                        <View style={styles.popupOverlay}>
                            <TouchableOpacity style={{ width: screenWidth, height: screenHeight, position: 'absolute' }}
                                onPress={() => { this.setModalVisible2(false) }} />
                            <View style={styles.popup2}>
                                <Image source={require("../../Assets/ImageAndIcons/padlock.png")} style={styles.lockImage}></Image>
                                <Text style={styles.unlockText}>Subscribe to unlock these workouts</Text>
                                <TouchableOpacity style={{flexDirection:"row",justifyContent:"center"}}
                                onPress={()=>{this.props.navigation.navigate("AuthenticationNavigatorStack",{screen:"SubscriptionScreen"})}}>
                                    <Text style={styles.subscribeText}>SUBSCRIBE NOW</Text>
                                    <Image source={require("../../Assets/ImageAndIcons/play.png")} style={styles.subscribePlayImage}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    </ScrollView>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("SelectPlanScreen") }} style={styles.buttonView}>
                        <Text style={styles.buttonText}>START  WORKOUT</Text>
                    </TouchableOpacity>
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
        padding: ScaleUtils.SCREEN_PADDING,
    },
    backgroundImage: {
        height: getLayoutSize(250),
        width: "100%",
    },
    shadow: {
        width: "100%",
        height:getLayoutSize(250),
        position: "absolute",
    },
    registerButtonView: {
        marginTop:ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP,
    },
    ButtonLoginContainer: {
        height: getLayoutSize(35),
        width: "32%",
        borderRadius:30,
        borderColor:Colors.COLOR_PRIMARY,
        justifyContent: "center",
        borderWidth: 1,
    },
    mainScreenButtonLoginText: {
        color:Colors.COLOR_PRIMARY,
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf: "center",
        fontFamily:AppFonts.text.font4
    },
    summerText: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.TEXT_SIZE_THIRTY,
        marginTop:ScaleUtils.MARGIN_TWENTY,
    },
    tipsText: {
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT+2,
        marginTop:ScaleUtils.MARGIN_TOP_THIRTY,
        fontFamily: AppFonts.text.font4,
    },
    renderView:{
        flexDirection: "row", 
        height: getLayoutSize(120), 
        width:ScaleUtils.IMAGE_WIDTH, 
        justifyContent: "center",
        left:0
    },
    renderImage:{
        height: getLayoutSize(110),
        width: getLayoutSize(110),
        justifyContent: ScaleUtils.DEFAULT_ALIGN_VIEW,
        left: 0,
        position: "absolute",

    },
    renderImageStyle:{
        resizeMode:"cover"
    },
    renderImagePlay:{
        height:ScaleUtils.IMAGE_SIZE_TWENTY,
        width: ScaleUtils.IMAGE_SIZE_TWENTY,
        tintColor:Colors.DEFAULT_SUB_CONTENT_COLOR,
        resizeMode:"cover",
        alignSelf:"center"
    },
    renderShadow: {
        width: ScaleUtils.IMAGE_WIDTH,
        height: ScaleUtils.IMAGE_WIDTH,
        position: "absolute",
        justifyContent:"center"
    },
    headerText: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN+1,
        marginLeft: ScaleUtils.MARGIN_TWENTY,
        marginTop: ScaleUtils.MARGIN_TWENTY,
    },
    mapView: { 
        flexDirection: "row", 
        marginTop: ScaleUtils.MARGIN_TWENTY, 
        marginLeft: getLayoutSize(13),
    },
    mapCircleView:{
        borderColor: Colors.DEFAULT_CONTENT_COLOR, 
        borderWidth: 1, 
        borderRadius: 15, 
        height:ScaleUtils.IMAGE_SIZE_TWENTY, 
        width: ScaleUtils.IMAGE_SIZE_TWENTY, 
        justifyContent: "center", 
        flexDirection: "row",
        marginLeft:getLayoutSize(5),
        marginRight:getLayoutSize(5),
    },
    mapNumberText:{
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily:AppFonts.text.font4,
        alignSelf:"center",
    },
    dropdownView:{
        backgroundColor: "#171b1e", 
        height: 120,
        width: "8%", 
        justifyContent: "center", 
        right:0,
        position:"absolute"
    },
    dropdownImage:{
        height:ScaleUtils.IMAGE_SIZE_FIFTEEN,
        width: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        alignSelf:"center",
        tintColor:"#dedede",
    },
    warmUpText:{
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_EIGHTEEN,
        marginTop:ScaleUtils.MARGIN_TWENTY,
        fontFamily: AppFonts.text.font3,
        paddingLeft:ScaleUtils.SCREEN_PADDING,
    },
    buttonView: {
        backgroundColor: Colors.COLOR_PRIMARY,
        width: "90%",
        height: getLayoutSize(45),
        borderRadius: 30,
        justifyContent: "center",
        marginLeft:ScaleUtils.MARGIN_TWENTY,
        position: "absolute",
        bottom:getLayoutSize(0),
        marginBottom:ScaleUtils.AUTHENTICATION_BUTTON_MARGIN_TOP
    },
    buttonText: {
        color: "black",
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf: "center",
        fontFamily: AppFonts.text.font4,
    },
    popup: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        borderRadius: 7,
        height: getLayoutSize(250),
        alignSelf: "center",
        alignItems:"center",
        padding: ScaleUtils.SCREEN_PADDING,
        width: "90%",
        justifyContent:"center",
    },
    popupOverlay: {
        backgroundColor: "#00000057",
        flex: 1,
        justifyContent: "center"
    },
    popup2: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        borderRadius: 7,
        flexDirection: "column",
        height: getLayoutSize(200),
        width: "100%",
        alignSelf: "center",
        alignItems: "center",
        position: "absolute",
        bottom: getLayoutSize(100),
        padding: ScaleUtils.MARGIN_TOP_FIFTEEN,
    },
    lockImage:{
        height: getLayoutSize(40), 
        width: getLayoutSize(40), 
        tintColor:Colors.DEFAULT_APP_FONT_COLOR,
    },
    unlockText:{
        color: Colors.DEFAULT_APP_FONT_COLOR,
        marginTop:ScaleUtils.MARGIN_TWENTYFIVE,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily:AppFonts.text.font3,
    },
    subscribeText:{
        color: Colors.COLOR_PRIMARY,
        marginTop: ScaleUtils.MARGIN_TOP_FIFTEEN,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font4,
        alignSelf:"center"
    },
    subscribePlayImage:{
        height:ScaleUtils.IMAGE_SIZE_SIX,
        width:ScaleUtils.IMAGE_SIZE_SIX,
        alignSelf:"center",
        marginTop:ScaleUtils.MARGIN_TWENTY,
        marginLeft:getLayoutSize(5),
    },
});