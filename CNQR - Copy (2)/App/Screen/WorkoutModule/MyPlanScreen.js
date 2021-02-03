//MyPlanScreen

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
    ActivityIndicator,
    Alert,
    StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';
import { button, AppFonts, TrialHeader,Colors,TextUtils,ScaleUtils,  } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class MyPlanScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            workout_schedule:[],
            isLoading:false,
            name:"",
            weeks:"",
            week:"",
            day:"",
            profile:"",
            trainer_name:"",
            handle:"",
            tips_advise:"",
            status:0,
            workoutScheduleDay:"",
            workoutScheduleDayUpdate:"",
            current_day:0,
            indexChecked:0,
            video:"",
        };
    }

    disableBackButton = () => {
        BackHandler.exitApp();
        return false;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }


    async componentDidMount(){
        this.doRecommendedPlanDetail()
        this.doWorkoutSchedule()
        this.doTipsAdvise()
        this.props.navigation.addListener(
            'focus',
            payload => {

                this.doRecommendedPlanDetail()
                this.doWorkoutSchedule()
            }
        );
       
    }

    async doWorkoutSchedule() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                plan_id: await AsyncStorage.getItem("@plan_list_id"),
                user_id: await AsyncStorage.getItem("@user_id"),
            })
            var data = await post(Constants.WORKOUT_SCHEDULE, body);
            console.log(("Data-->" + JSON.stringify(data)));

            this.setState({workout_schedule:data.data})
            console.log(("WORK_OUT_SCHEDULE-->" + JSON.stringify(this.state.workout_schedule)));
    
            for(let i=0;i<data.data.length;i++){
                this.state.week=data.data[i].week
                this.state.current_day = data.data[i].day
                this.state.status = data.data[i].status
            }
            this.setState({ week: this.state.week, workoutScheduleDay: data.last_completed_day+1, current_day: data.last_completed_day+1,status: this.state.status})
            //Alert.alert(current_day+"-----")
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

    async doRecommendedPlanDetail() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                plan_id: await AsyncStorage.getItem("@plan_list_id"),
            })
            var data = await post(Constants.RECOMMENDED_PLAN_DETAIL, body);
            console.log(("Data-->" + JSON.stringify(data)));
            console.log("BODY--->" + body)
           
            this.setState({ name: data.data.name})
            this.state.name = this.state.name.replace(/['"]+/g, '')
            this.state.name = this.state.name.toUpperCase()
            this.setState({ weeks: data.data.weeks })
            this.setState({ profile: data.data.trainer_thumb })
            this.setState({ trainer_name: data.data.trainer_name })
            this.state.trainer_name = this.state.trainer_name.toUpperCase()
            this.state.trainer_name = this.state.trainer_name.replace(/['"]+/g, '')
            this.setState({ handle: data.data.handle })
            this.state.handle=this.state.handle.toUpperCase()

            this.setState({ video: data.data.video })

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })

            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert", "Please check your internet connection.")
        }
    }

    async doTipsAdvise() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                trainer_id:"0",
                page: 1
            })
            var data = await post(Constants.TIPS_AND_ADVISE, body);

            this.setState({ tips_advise: data.data })
        
            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })

            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert", "Please check your internet connection.")
        }
    }

    async doUpdateWorkoutStatus() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
               user_id:await AsyncStorage.getItem("@user_id"),
               plan_id: await AsyncStorage.getItem("@plan_list_id"), 
               day:this.state.workoutScheduleDay, 
               week:this.state.week,
               status: this.state.status
            })
            var data = await post(Constants.UPDATE_WORKOUT_DAYS_STATUS, body);
            console.log("DATA---->"+JSON.stringify(data));

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
                Utils.DialogBox(data.message)
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert", "Please check your internet connection.")
        }
    }

    tipsAdvice = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "column", marginTop: getLayoutSize(20), }}>
                <ImageBackground source={{ uri: item.image }} style={styles.render2ImageBackground}>
                    <View style={styles.render2BoxView}>
                        <View style={{ paddingLeft: ScaleUtils.SCREEN_PADDING, marginTop: getLayoutSize(50) }}>
                            <View style={{ marginTop: getLayoutSize(5) }}>
                                <Text style={styles.render2Content1}>{item.name}</Text>
                            </View>
                            <Text style={styles.render2Content3}>OBJECTIVES</Text>
                            <Text style={styles.render2Content4}>{item.objectives}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    renderItem({item,index}){
        return(
            <TouchableOpacity style={styles.renderMainView} onPress={() => { this.props.navigation.navigate("WorkoutsScreen",{schedule_id:item.id,week:this.state.week})
            this.setState({indexChecked:index})
            }}>
                <View style={styles.dayView}>
                    <Text style={styles.dayNumberText}>{item.day}</Text>
                </View>
                <View style={styles.renderLineView} />
                <View style={styles.dayView}>
                    <Text style={styles.headerText}>{item.name}</Text>
                    <View style={{flexDirection:"row",}}>
                        <View style={styles.exerciseBoxView}>
                            <Text style={styles.renderBoxText}>{item.no_of_exercise} EXERCISE</Text>
                        </View>
                        <View style={styles.minsBoxView}>
                            <Text style={styles.renderBoxText}>{item.minutes}  MINS</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    
    renderSeparator = () => {
        return (
            <View style={{
                height: 1,
                borderColor: "#282c30",
                borderWidth: 0.2,
                width: "100%",
                marginBottom: getLayoutSize(15)}}>
           </View>
        );
    }  

    renderItem3({item,index}){
        
        return(
            <View>
                
                    {item.day === this.state.workoutScheduleDay ===  true ?

                     <View style={{ marginTop: getLayoutSize(50) }}>
                    <Text style={styles.upperBodyText}>{item.name}</Text>
                    </View>
                    :
                    null
                    }
            </View>
        )
    }

    renderItem2({ item,index }) {
        return (
            /*index === this.state.indexChecked ?
                <View style={{ flexDirection: "row" }} >

                    {this.state.status === 0 ?
                        <View>
                            <View style={styles.circleView} />
                            <Text style={styles.numberText}>{item.day}</Text>
                        </View>
                        :
                        this.state.status === 1 ?
                            <View>
                                <View style={{
                                    borderRadius: 6,
                                    borderWidth: 1,
                                    backgroundColor: Colors.COLOR_PRIMARY,
                                    borderColor: "transparent",
                                    height: getLayoutSize(12),
                                    width: getLayoutSize(12),
                                }} />
                                <Text style={styles.numberText}>{item.day}</Text>
                            </View>
                            :
                            <View>
                                <View style={{
                                    borderRadius: 6,
                                    borderWidth: 1,
                                    backgroundColor: Colors.DEFAULT_APP_FONT_COLOR,
                                    borderColor: "transparent",
                                    height: getLayoutSize(12),
                                    width: getLayoutSize(12),
                                }} />
                                <Text style={styles.numberText}>{item.day}</Text>
                            </View>
                    }

                </View>
                :
                <View>
                    <View style={styles.circleView} />
                    <Text style={styles.numberText}>{item.day}</Text>
                </View>*/

                item.status === 3 ?
                <View style={{flexDirection:'row'}}>
                <View>
                    <View style={{
                        borderRadius: 6,
                        borderWidth: 1,
                        backgroundColor: Colors.COLOR_PRIMARY,
                        borderColor: "transparent",
                        height: getLayoutSize(12),
                        width: getLayoutSize(12),
                        justifyContent:"center"
                    }} 
                    />
                    <Text style={styles.numberText}>{item.day}</Text>
                </View>
                {index != this.state.workout_schedule.length-1?
                    <View style={styles.lineGreenView} />
                    :null
                }
                </View>
                :
                item.day === this.state.workoutScheduleDay  && item.status===3?
                    <View style={{ flexDirection: 'row' }}>
                    <View>
                        <View style={{
                            borderRadius: 6,
                            borderWidth: 1,
                            backgroundColor: Colors.COLOR_PRIMARY,
                            borderColor: "transparent",
                            height: getLayoutSize(12),
                            width: getLayoutSize(12),
                            justifyContent:"center",
                            }} >
                                <Image source={require("../../Assets/ImageAndIcons/tick.png")} style={{ height: 8, width: 8, tintColor: "black", alignSelf: "center" }} />
                            </View>
                        <Text style={styles.numberText}>{item.day}</Text>
                    </View>
                        {index != this.state.workout_schedule.length - 1 ?
                            <View style={styles.lineGreenView} />
                            : null
                        }
                    </View>
                :
                    <View style={{ flexDirection: 'row' }}>
                <View>
                    <View style={{
                        borderRadius: 6,
                        borderWidth: 1,
                        backgroundColor: Colors.DEFAULT_CONTENT_COLOR,
                        borderColor: "transparent",
                        height: getLayoutSize(12),
                        width: getLayoutSize(12),
                    }} />
                    <Text style={styles.numberText}>{item.day}</Text>
                </View>
                        {index != this.state.workout_schedule.length - 1 ?
                            <View style={styles.lineView} />
                            : null
                        }
                </View>

        )
    }

    renderSeparator2=()=>{
        return(
            this.state.status === 3 ?
                <View style={styles.lineGreenView} />
            :
                <View style={styles.lineView} />
        );
    }
    
    render() {
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/bg_one.png")} style={styles.backgroundImage}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.shadow}>
                            <View style={styles.container}>
                                <View style={{ marginTop: getLayoutSize(10) }}>
                                    <Text style={styles.summerText}>{this.state.name}</Text>
                                </View>
                                <View style={styles.weekBoxView}>
                                    <Text style={styles.weekBoxText}>{this.state.weeks} WEEKS</Text>
                                </View>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("VideoPlayScreen", { video: this.state.video }) }} style={{ top: getLayoutSize(25) }}>
                                    <Image source={require("../../Assets/ImageAndIcons/video_play.png")} style={styles.videoPlayImage}></Image>
                                </TouchableOpacity>


                                <FlatList
                                    data={this.state.workout_schedule}
                                    keyExtractor={(index) => index.toString()}
                                    renderItem={this.renderItem3.bind(this)}
                                     />  

                                <Text style={styles.weekText}>WEEK {this.state.week === this.state.weeks && this.state.status === 3 && this.state.workoutScheduleDay === this.state.workout_schedule.length ? this.props.navigation.navigate("ChooseYourPlanScreen") : this.state.week}</Text> 
                                 <View style={{flexDirection:"row",marginTop:getLayoutSize(15)}}>


                                  <FlatList
                                        data={this.state.workout_schedule}
                                        keyExtractor={(index) => index.toString()}
                                        renderItem={this.renderItem2.bind(this)}
                                        horizontal={true}
                                        />  
                                </View>


                                <View style={styles.registerButtonView}>
                                    <TouchableOpacity style={styles.ButtonLoginContainer} onPress={() => {
                                        this.state.status === 2 ? this.props.navigation.navigate("UpdateWeightScreen", { workoutScheduleDay: this.state.workoutScheduleDay, screen:"Workout" }) : null;
                                        this.setState({ status: this.state.status + 1, }); this.doUpdateWorkoutStatus();
                                    }}>
                                        {this.state.status === 0 ?
                                            <Text style={styles.mainScreenButtonLoginText}>START DAY {this.state.workoutScheduleDay > this.state.workout_schedule.length ? this.setState({ workoutScheduleDay: 1 }) : this.state.workoutScheduleDay}</Text>
                                            :
                                            this.state.status === 1 ?
                                                <Text style={styles.mainScreenButtonLoginText}>RESUME DAY {this.state.workoutScheduleDay > this.state.workout_schedule.length ? this.setState({ workoutScheduleDay: 1 }) : this.state.workoutScheduleDay}</Text>
                                                :
                                                <Text style={styles.mainScreenButtonLoginText}>COMPLETED DAY {this.state.workoutScheduleDay > this.state.workout_schedule.length ? this.setState({ workoutScheduleDay: 1 }) : this.state.workoutScheduleDay}</Text>
                                        }
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </ImageBackground>
                    </ImageBackground>
                    <View style={{ padding: ScaleUtils.SCREEN_PADDING,}}>
                        <Text style={styles.weeklyScheduleText}>WEEKLY WORKOUT SCHEDULE</Text>
                        <View style={{marginTop:getLayoutSize(40)}}>
                        <Text style={styles.dayText}>DAY</Text>
                            {this.state.isLoading === true ?
                                <ActivityIndicator size="large" color="white" />
                                :
                                (
                                    this.state.workout_schedule.length !== 0 ?
                        <FlatList
                            data={this.state.workout_schedule}
                            keyExtractor={(index) => index.toString()}
                            renderItem={this.renderItem.bind(this)}
                            ItemSeparatorComponent={this.renderSeparator} />
                                       
                                    :
                                        <Text style={{ color: Colors.DEFAULT_APP_FONT_COLOR }}>No Record Found</Text>
                                )}

                        </View>
                        <View style={{flexDirection:"row",marginTop:getLayoutSize(30)}}>
                            <View style={styles.profileOuter}>
                                <Image source={{uri:this.state.profile}} style={styles.profileImage}></Image>
                            </View>
                            <View style={{justifyContent:"center",marginLeft:getLayoutSize(20)}}>
                                <Text style={styles.profileName}>{this.state.trainer_name}</Text>
                                <Text style={styles.fitnessText}>{this.state.handle}</Text>
                            </View>
                            <View style={styles.profileLineView} />
                            <View style={styles.greaterImageView}>
                                <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt.png")} style={styles.greaterImage}/>
                            </View>
                        </View>
                        <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: getLayoutSize(40),alignItems:"center" }}>
                            <Text style={styles.tipsText}>TIPS AND ADVICE</Text>
                            <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            {this.state.isLoading === true ?
                                <ActivityIndicator size="small" color="#ffffff" /> : (
                                    this.state.tips_advise.length !== 0 ?
                                        <FlatList
                                            data={this.state.tips_advise}
                                            keyExtractor={(index) => index.toString()}
                                            renderItem={this.tipsAdvice.bind(this)}
                                            horizontal={true} />
                                        : <Text style={{ color: "#868686", alignSelf: "center", marginTop: ScaleUtils.MARGIN_TOP_TEN }}>No Records Found</Text>
                                )}
                        </View>
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
        padding: ScaleUtils.SCREEN_PADDING,
    },
    backgroundImage: {
        flex: 1,
        height: ScaleUtils.IMAGE_SIZE_LARGE,
        width: ScaleUtils.IMAGE_WIDTH,

    },
    shadow: {
        width: ScaleUtils.IMAGE_WIDTH,
        height:ScaleUtils.IMAGE_SIZE_LARGE,
        position: "absolute",
    },
    summerText: {
        color:Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.TEXT_SIZE_TENTYTWO,
    },
    weekBoxView:{
        height:ScaleUtils.IMAGE_SIZE_THIRTY,
        width:"25%",
        borderColor:Colors.DEFAULT_CONTENT_COLOR,
        borderWidth:0.5,
        marginTop:ScaleUtils.MARGIN_TOP_FIFTEEN,
        borderRadius:5,
        justifyContent:"center",
    },
    weekBoxText:{
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily:AppFonts.text.font4,
        alignSelf:"center",
    },
    videoPlayImage: {
        height:ScaleUtils.IMAGE_SIZE_HUNDRED,
        width: ScaleUtils.IMAGE_SIZE_HUNDRED,
        alignSelf: "center",
    },
    upperBodyText: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.TEXT_SIZE_THIRTY,
        marginTop:ScaleUtils.MARGIN_TOP_FIFTEEN
    },
    weekText: {
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily: AppFonts.text.font4,
    },
    circleView:{
        borderRadius: 6, 
        borderWidth: 1, 
        backgroundColor: Colors.DEFAULT_CONTENT_COLOR, 
        borderColor: "transparent", 
        height: getLayoutSize(12), 
        width: getLayoutSize(12),
    },
    numberText:{
        fontSize: TextUtils.TEXT_SIZE_TEN, 
        color: Colors.DEFAULT_CONTENT_COLOR, 
        marginTop: ScaleUtils.MARGIN_FIVE,
        fontFamily:AppFonts.text.font4,
    },
    lineView:{
        borderColor: Colors.DEFAULT_CONTENT_COLOR, 
        borderWidth: 1, 
        height: getLayoutSize(1),
        width:ScaleUtils.IMAGE_SIZE_FIFTY, 
        marginTop: ScaleUtils.MARGIN_FIVE, 
        marginLeft: getLayoutSize(-2),
        marginRight:getLayoutSize(-2),
    },
    lineGreenView: {
        borderColor: Colors.COLOR_PRIMARY,
        borderWidth: 1,
        height: getLayoutSize(1),
        width: ScaleUtils.IMAGE_SIZE_FIFTY,
        marginTop: ScaleUtils.MARGIN_FIVE,
        marginLeft: getLayoutSize(-2),
        marginRight: getLayoutSize(-2),
    },
    registerButtonView: {
        marginTop: ScaleUtils.SCREEN_PADDING,
        padding: ScaleUtils.SCREEN_PADDING,
    },
    ButtonLoginContainer: {
        height:ScaleUtils.IMAGE_SIZE_FIFTY,
        width: ScaleUtils.IMAGE_WIDTH,
        borderRadius: 40,
        borderColor: Colors.COLOR_PRIMARY,
        justifyContent: "center",
        borderWidth: 1,
    },
    mainScreenButtonLoginText: {
        fontFamily:AppFonts.text.font2,
        color:Colors.COLOR_PRIMARY,
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf: "center",
    },
    weeklyScheduleText: {
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font4,
        marginTop: ScaleUtils.MARGIN_FIVE,
    },
    renderMainView:{
        flexDirection:"row",
        marginTop:getLayoutSize(-20),
    },
    dayView:{
        justifyContent:"center",
    },
    dayNumberText: {
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily: AppFonts.text.font3,
        color:Colors.DEFAULT_APP_FONT_COLOR,
        alignSelf:"center",
    },
    renderLineView: {
        borderColor: "#282c30",
        borderWidth: 0.5,
        height: getLayoutSize(55),
        width: getLayoutSize(1),
        margin:ScaleUtils.MARGIN_TWENTYFIVE
    },
    headerText:{
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily:AppFonts.text.font3,
        fontSize: TextUtils.TEXT_SIZE_EIGHTEEN,
    },
    exerciseBoxView:{
        height:ScaleUtils.IMAGE_SIZE_THIRTY,
        width: "37%",
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        borderWidth: 0.5,
        marginTop: ScaleUtils.MARGIN_TOP_FIFTEEN,
        marginRight:ScaleUtils.MARGIN_TOP_TEN,
        borderRadius: 5,
        justifyContent: "center",
    },
    minsBoxView: {
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: "30%",
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        borderWidth: 0.5,
        marginTop: ScaleUtils.MARGIN_TOP_FIFTEEN,
        borderRadius: 5,
        justifyContent: "center",
    },
    renderBoxText: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
    },
    dayText:{
        color: Colors.DEFAULT_CONTENT_COLOR,
        fontFamily:AppFonts.text.font4,
        fontSize: TextUtils.BUTTON_TEXT,
        marginBottom:getLayoutSize(-20),
    },
    profileOuter: {
        borderRadius: 45,
        height: getLayoutSize(90),
        width: getLayoutSize(90),
        borderColor: Colors.DEFAULT_SUB_CONTENT_COLOR,
        borderWidth: 1,
        justifyContent: "center"
    },
    profileImage: {
        width: getLayoutSize(80),
        height: getLayoutSize(80),
        borderRadius: 40,
        alignSelf: "center",
    },
    profileName:{
        fontSize: TextUtils.BUTTON_TEXT,
        color:Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily:AppFonts.text.font2,
        alignSelf:"center",
    },
    fitnessText:{
        fontSize: TextUtils.BUTTON_TEXT, 
        color: Colors.DEFAULT_CONTENT_COLOR, 
        fontFamily: AppFonts.text.font4,
        marginTop: ScaleUtils.MARGIN_TOP_FIFTEEN,
    },
    profileLineView: {
        borderColor: "#282c30",
        borderWidth: 0.5,
        height: getLayoutSize(70),
        width: getLayoutSize(1),
        marginLeft: getLayoutSize(100),
        alignSelf:"center",
    },  
    greaterImageView:{
        borderColor: Colors.DEFAULT_CONTENT_COLOR, 
        borderWidth: 1, 
        borderRadius: 15, 
        justifyContent: "center", 
        height:ScaleUtils.IMAGE_SIZE_THIRTY, 
        width: ScaleUtils.IMAGE_SIZE_THIRTY,
        marginLeft:ScaleUtils.MARGIN_TWENTY,
        marginTop: getLayoutSize(-10),
        alignSelf:"center"
    },
    greaterImage:{
        height:ScaleUtils.IMAGE_SIZE_TWENTY,
        width:ScaleUtils.IMAGE_SIZE_TWENTY,
        alignSelf:"center",
        tintColor:Colors.DEFAULT_CONTENT_COLOR,
    },
    tipsText: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        marginTop: getLayoutSize(12),
        fontFamily: AppFonts.text.font4,
        alignSelf:"center",
    },
    codeImage: {
        tintColor: Colors.DEFAULT_CONTENT_COLOR,
        height:ScaleUtils.IMAGE_SIZE_THIRTY,
        width: ScaleUtils.IMAGE_SIZE_THIRTY,
        marginTop: getLayoutSize(9),
        marginRight: getLayoutSize(-5),
        alignSelf: "center",
    },
    render2ImageBackground: {
        height: getLayoutSize(350),
        width: getLayoutSize(300),
        justifyContent: "center",
        marginRight: ScaleUtils.MARGIN_TWENTY,
        padding: getLayoutSize(10)
    },
    render2BoxView: {
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        height: getLayoutSize(320),
        width: ScaleUtils.IMAGE_WIDTH,
    },
    render2Content1: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_TENTYFIVE,
        fontFamily: AppFonts.text.font2,
    },
    render2Content3: {
        color: Colors.COLOR_PRIMARY,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
    },
    render2Content4: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily: AppFonts.text.font3,
        marginTop: ScaleUtils.MARGIN_TOP_TEN,
    },
});