//Subscription

import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    BackHandler,
    ImageBackground,
    Alert,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import ModalProgress from '../../Component/ModalProgress';
import Utils from '../../Component/Utils';
import {AppFonts,Colors,TextUtils,ScaleUtils,String} from '../../Resources/index';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';

import AnnualTab from './AnnualTab';
import MonthlyTab from './Monthlytab';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const Tab = createMaterialTopTabNavigator();
 
export default class SubscriptionScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            flag:false,
            flagAnnual: false,
            planType:false,
            data:[],
            services:[],
            dataId:[],
            indexChecked:0,
            plan_id:1,
            amount:7.99,
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        var data = await get(Constants.GET_ALL_PLANS);
        console.log("URL " + JSON.stringify(data.data));
        this.setState({data:data.data, isLoading: false });
        console.log("DATA-->" + JSON.stringify(this.state.data));
        for (let i = 0; i < data.data.length;i++){
            this.state.services = data.data[i].services.split(',');
        }
        this.setState({ services: this.state.services})
        console.log("SERVICES-->" + JSON.stringify(this.state.services));
    }

    disableBackButton = () => {
        this.props.navigation.navigate("MainScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    async doSubscription() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({

                user_id: await AsyncStorage.getItem("@user_id"),
                plan_id:this.state.plan_id,
                amount: this.state.amount,
                transaction_id: "wa7t3dyhs"

            })
            var data = await post(Constants.SUBSCRIPTION, body);
            console.log(("Data-->" + JSON.stringify(data)));

            AsyncStorage.setItem("@subscription_end_date", JSON.stringify(data.data.subscription_end_date))

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
                this.props.navigation.navigate("MaleFemaleScreen");
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Please check your internet connection.")
        }
       
    }

    getPlan(){
        return(
            <View style={{flexDirection:"row"}}>
                
                {this.state.data.map((item,index) => (
                            
                                <View style={{ backgroundColor: "black", height: 50, width: screenWidth /this.state.data.length, }}>
                                <TouchableOpacity style={{
                                backgroundColor: "black", height: 49, borderTopColor: index === this.state.indexChecked && !this.state.flagAnnual===true ? "#00f3b9" : "#000000", borderWidth: 1,
                                    width: screenWidth / this.state.data.length, justifyContent: "center"
                        }} onPress={() => {
                            this.setState({ plan_id: item.id, amount: item.billed_annually_price});
                                    this.setState({ indexChecked: index, flagAnnual: this.state.flagAnnual });
                                    }}>
                                    <Text style={{
                                    color: index === this.state.indexChecked && !this.state.flagAnnual===true ?"white":"#868686", alignSelf: "center",
                                        fontSize: getFontSize(14), fontFamily: AppFonts.text.font3
                                    }}>{item.plan_name}</Text>
                                </TouchableOpacity>
                            </View>
                ))}
            </View>
        );
    }

    getServices(){
        return(
            <View style={styles.TContainer}>
                <View style={styles.headerView}>
                    <Text style={styles.TheaderText}>MOST POPULAR</Text>
                </View>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.planView}>
                            <Image source={require("../../Assets/ImageAndIcons/money.png")} style={styles.imageMonth}></Image>
                            <Text style={styles.imageMonthText}>6<Text style={{ fontSize: getFontSize(17), color: "#fefefe" }}>.99 <Text style={{ color: "#bbbbbb" }}>per month</Text></Text></Text>
                        </View>
                        <View style={styles.planView}>
                            <Image source={require("../../Assets/ImageAndIcons/money.png")} style={styles.Dimage}></Image>
                            <Text style={styles.DimageText}>79<Text style={{ fontSize: getFontSize(12), color: "#575656" }}>.99 billed annually</Text></Text>
                        </View>
                        {this.state.services.map((item) => (
                            <View style={styles.listView}>
                                <Image source={require("../../Assets/ImageAndIcons/tick.png")} style={styles.listImage}></Image>
                                <Text style={styles.listText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <ModalProgress
                    isVisible={this.state.isLoading}></ModalProgress>
                    <View>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/SubscriptionBG.png")} style={styles.image}>
                            <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.shadow} >
                                <View style={styles.viewHeader}>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("MainScreen") }} style={styles.imageArrow}>
                                        <Image source={require("../../Assets/ImageAndIcons/back_with_arrow.png")} style={styles.imageArrow} />
                                </TouchableOpacity>
                                <Image source={require("../../Assets/ImageAndIcons/info.png")} style={styles.imageInfo} />
                                </View>
                                <View style={styles.container}>
                                <Text style={styles.headerText}>{String.subscription.SUBSCRIPTION_HEADER}{"\n"}{String.subscription.SUBSCRIPTION_HEADER1}</Text>
                                <Text style={styles.headerTextWithBorder}>{String.subscription.SUBSCRIPTION_HEADER2}</Text>
                                </View>
                            </ImageBackground>
                        </ImageBackground>
                    </View>
                <ScrollView>
                    
                   {this.getPlan()}
                   {this.getServices()}
                    
                   <View style={{ padding: getLayoutSize(22), marginTop: getLayoutSize(20),justifyContent:"center"}}>
                        <Text style={{ color: "#b0a6a6", alignSelf: "center", fontSize: getFontSize(11.5), fontFamily: AppFonts.text.font3,}}>
                            {String.subscription.SUBSCRIPTION_ABSTRACT}
                            </Text>
                            <View style={{ borderWidth: 1, borderColor: "#868686", marginTop:getLayoutSize(25), }}></View>
                            <View style={{ marginTop: getLayoutSize(20), justifyContent: "center" }}>
                            <Text style={{ color: "#868686", alignSelf: "center", fontSize: getFontSize(12), fontFamily: AppFonts.text.font3, }} onPress={()=>{this.props.navigation.navigate("TermsAndConditionScreen")}}>
                                {String.subscription.SUBSCRIPTION_SUBSCRIBE_TEXT} 
                                <Text style={{ textDecorationLine: "underline", color: "#00f3b9" }}>{String.subscription.SUBSCRIPTION_SUBSCRIBE_TEXT1} </Text>{String.subscription.SUBSCRIPTION_SUBSCRIBE_TEXT2}
                            </Text>
                            </View>
                            <View style={styles.registerButtonView}>
                                <TouchableOpacity style={styles.ButtonLoginContainer} onPress={()=>{this.doSubscription();}}>
                                    <Text style={styles.mainScreenButtonLoginText}>CHOOSE</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: getLayoutSize(30)}}>
                                <Text style={{ color: "#868686", alignSelf: "center", marginLeft: getLayoutSize(10), }}>Already a member? <Text style={{ color: "#00f3b9", marginRight: getLayoutSize(15), fontFamily: AppFonts.text.font3, }} onPress={() => { this.props.navigation.navigate("LoginScreen") }}>Sign in ></Text></Text>
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
        paddingLeft: ScaleUtils.SCREEN_PADDING,
        marginTop: getLayoutSize(-20),
    },
    viewHeader: {
        flex: 1,
        flexDirection:"row",
        marginTop:ScaleUtils.MARGIN_TOP_FIFTEEN,
    },
    imageArrow: {
        height: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        width: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        marginLeft: ScaleUtils.MARGIN_TOP_TEN,
        tintColor: Colors.DEFAULT_APP_FONT_COLOR,
    },
    imageInfo: {
        height: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        width: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        tintColor: Colors.DEFAULT_APP_FONT_COLOR,
        alignSelf:"flex-start",
        position:"absolute",
        right:ScaleUtils.MARGIN_TWENTY,
    },
    image:{
        height: getLayoutSize(250),
        width:ScaleUtils.IMAGE_WIDTH,
    },
    shadow: {
        width: ScaleUtils.IMAGE_WIDTH,
        height: getLayoutSize(250),
        opacity:0.9,
    },
    headerText:{
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.TEXT_SIZE_THIRTY,
    },
    headerTextWithBorder: {
        color:Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.TEXT_SIZE_TENTYFIVE,
    },
    registerButtonView: {
        marginTop: ScaleUtils.AUTHENTICATION_BUTTON_MARGIN_TOP,
    },
    mainScreenButtonLoginText: {
        fontFamily:AppFonts.text.font4,
        color: "#10fec3",
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf: "center",
    },
    ButtonLoginContainer: {
        height:ScaleUtils.IMAGE_SIZE_FIFTY,
        width: "100%",
        borderRadius: 40,
        borderColor: "#10fec3",
        justifyContent: "center",
        borderWidth: 1,
    },
    TContainer: {
        alignSelf: "center",
        backgroundColor: "#151515",
        width: "90%",
        height: getLayoutSize(410),
        borderRadius: 5,
        marginTop: getLayoutSize(10),
    },
    headerView: {
        backgroundColor: "#0ff5bb",
        width: getLayoutSize(120),
        height: getLayoutSize(30),
        borderRadius: 20,
        justifyContent: "center",
        marginLeft: getLayoutSize(20),
        marginTop: getLayoutSize(-10),
        position: "relative",
    },
    TheaderText: {
        color: "black",
        fontSize: getFontSize(10),
        alignSelf: "center",
        fontFamily: AppFonts.text.font4,
    },
    content: {
        padding: getLayoutSize(20),
    },
    planView: {
        flexDirection: "row",
    },
    imageMonth: {
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        alignSelf: "center",
        tintColor: Colors.DEFAULT_APP_FONT_COLOR,
    },
    imageMonthText: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font3,
        fontSize: getFontSize(32),
        alignSelf: "center"
    },
    Dimage: {
        height: getLayoutSize(20),
        width: getLayoutSize(20),
        alignSelf: "center",
        tintColor: Colors.DEFAULT_CONTENT_COLOR,
    },
    DimageText: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        fontSize: getFontSize(17),
        alignSelf: "center",
        fontFamily: AppFonts.text.font3,
    },
    listView: {
        marginTop: getLayoutSize(20),
        flexDirection: "row",
    },
    listText: {
        alignSelf: "center",
        marginLeft: getLayoutSize(16),
        color: "#e4e4e4",
        fontFamily: AppFonts.text.font3,
        fontSize: getFontSize(14.5),
    },
    listImage: {
        tintColor: "#0dd5a2",
        width: getLayoutSize(25),
        height: getLayoutSize(25),
        alignSelf: "center",
    },
});

/*
<TouchableOpacity onPress={() => { this.setState({ flag: !this.state.flag,planType:!this.state.planType}) }}>
                        {!this.state.flag === true && !this.state.planType=== true?

                            <View style={{ flexDirection: "row", backgroundColor: "black", height: 50, width: screenWidth / 2, marginTop: 50 }}>
                                <View style={{
                                    backgroundColor: "black", height: 49,
                                    borderTopColor: "#00f3b9",
                                    borderTopWidth: 1,
                                    width: screenWidth / 2, justifyContent: "center"
                                }}>
                                    <Text style={{
                                        color: "white", alignSelf: "center",
                                        fontSize: getFontSize(14), fontFamily: AppFonts.text.font4
                                    }}>ANNUAL</Text>
                                </View>

                                <Text style={{
                                    color: "gray", marginLeft: 60,
                                    fontSize: getFontSize(14), alignSelf: "center", fontFamily: AppFonts.text.font4
                                }}>MONTHLY</Text>
                            </View>
                            :

                            <View style={{
                                flexDirection: "row", backgroundColor: "black",
                                height: 50, width: screenWidth / 2, marginTop: 50
                            }}>
                                <View style={{
                                    backgroundColor: "black", height: 49,
                                    width: screenWidth / 2, justifyContent: "center"
                                }}>

                                    <Text style={{
                                        color: "gray", alignSelf: "center",
                                        fontSize: getFontSize(14), fontFamily: AppFonts.text.font4
                                    }}>ANNUAL</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row", borderTopColor: "#00f3b9", borderTopWidth: 1, backgroundColor: "black",
                                    height: 50, width: screenWidth / 2
                                }}>
                                    <Text style={{
                                        color: "white", marginLeft: 60, fontSize: getFontSize(14),
                                        alignSelf: "center", fontFamily: AppFonts.text.font4
                                    }}>MONTHLY</Text>
                                </View>
                            </View>
                        }
                    </TouchableOpacity>

                    {!this.state.flag === true && !this.state.planType === true ?

                        <View style={styles.TContainer}>
                            <View style={styles.headerView}>
                                <Text style={styles.TheaderText}>MOST POPULAR</Text>
                            </View>
                            <ScrollView>
                                <View style={styles.content}>
                                    <View style={styles.planView}>
                                        <Image source={require("../../Assets/ImageAndIcons/round_euro_black_24pt.png")} style={styles.imageMonth}></Image>
                                        <Text style={styles.imageMonthText}>6<Text style={{ fontSize: getFontSize(17), color: "#fefefe" }}>.99 <Text style={{ color: "#bbbbbb" }}>per month</Text></Text></Text>
                                    </View>
                                    <View style={styles.planView}>
                                        <Image source={require("../../Assets/ImageAndIcons/round_euro_black_24pt.png")} style={styles.Dimage}></Image>
                                        <Text style={styles.DimageText}>79<Text style={{ fontSize: getFontSize(12), color: "#575656" }}>.99 billed annually</Text></Text>
                                    </View>
                                    {this.state.services.map((item) => (
                                        <View style={styles.listView}>
                                            <Image source={require("../../Assets/ImageAndIcons/tick.png")} style={styles.listImage}></Image>
                                            <Text style={styles.listText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    :
                        <View style={styles.TContainer}>
                            <View style={styles.headerView}>
                                <Text style={styles.TheaderText}>MOST POPULAR</Text>
                            </View>
                            <ScrollView>
                                <View style={styles.content}>
                                    <View style={styles.planView}>
                                        <Image source={require("../../Assets/ImageAndIcons/round_euro_black_24pt.png")} style={styles.imageMonth}></Image>
                                        <Text style={styles.imageMonthText}>6<Text style={{ fontSize: getFontSize(17), color: "#fefefe" }}>.99 <Text style={{ color: "#bbbbbb" }}>per month</Text></Text></Text>
                                    </View>
                                    <View style={styles.planView}>
                                        <Image source={require("../../Assets/ImageAndIcons/round_euro_black_24pt.png")} style={styles.Dimage}></Image>
                                        <Text style={styles.DimageText}>79<Text style={{ fontSize: getFontSize(12), color: "#575656" }}>.99 billed annually</Text></Text>
                                    </View>
                                    {this.state.services.map((item) => (
                                        <View style={styles.listView}>
                                            <Image source={require("../../Assets/ImageAndIcons/tick.png")} style={styles.listImage}></Image>
                                            <Text style={styles.listText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                    } */