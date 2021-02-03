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
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {AppFonts} from '../../Resources/index';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';

import AnnualTab from './AnnualTab';
import MonthlyTab from './Monthlytab';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const Tab = createMaterialTopTabNavigator();
 
export default class SubscriptionScreen extends Component{

    disableBackButton = () => {
        this.props.navigation.navigate("RegisterScreen");
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
                    <View>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/SubscriptionBG.png")} style={styles.image}>
                            <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.shadow} >
                                <View style={styles.viewHeader}>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("RegisterScreen") }} style={styles.imageArrow}>
                                        <Image source={require("../../Assets/ImageAndIcons/back_with_arrow.png")} style={styles.imageArrow} />
                                </TouchableOpacity>
                                <Image source={require("../../Assets/ImageAndIcons/info.png")} style={styles.imageInfo} />
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.headerText}>140+ PLANS {"\n"}70+ TRAINERS{"\n"}<Text style={styles.headerTextWithBorder}>UNLIMITED ACCESS</Text></Text>
                                </View>
                            </ImageBackground>
                        </ImageBackground>
                    </View>
                <ScrollView>
                    <Tab.Navigator  tabBarOptions={{
                            activeTintColor:"white",
                            inactiveTintColor:"#868686",
                            labelStyle: {
                                fontSize: getFontSize(11),
                                fontWeight:"bold",
                            },
                            indicatorStyle: {
                                backgroundColor: "#10fec3",
                                position:"relative",
                                opacity:0.4,
                            },
                            style: {
                                borderWidth: 0.5,
                                borderColor: "black",
                                backgroundColor:"black",
                                marginBottom:getLayoutSize(10),
                            }
                        }}>
                            <Tab.Screen name="AnnualTab" component={AnnualTab} options={{ title: "ANNUAL",}} />
                            <Tab.Screen name="MonthlyTab" component={MonthlyTab} options={{ title: "MONTHLY" }} />
                        </Tab.Navigator>
                        <View style={{ padding: getLayoutSize(22), marginTop: getLayoutSize(20),justifyContent:"center"}}>
                        <Text style={{ color: "#b0a6a6", alignSelf: "center", fontSize: getFontSize(11.5), fontFamily: AppFonts.text.font3,}}>
                                CNQR will charge the membership fee on a recurring basis until you cancel.Payment will 
                                continue unless you deactivate at least 24 hours prior to the end of the current cycle.
                                Any unused potion of your free trial will be forfeitted upon payment.
                            </Text>
                            <View style={{ borderWidth: 1, borderColor: "#868686", marginTop:getLayoutSize(25), }}></View>
                            <View style={{ marginTop: getLayoutSize(20), justifyContent: "center" }}>
                            <Text style={{ color: "#868686", alignSelf: "center", fontSize: getFontSize(12), fontFamily: AppFonts.text.font3, }} onPress={()=>{this.props.navigation.navigate("TermsAndConditionScreen")}}>
                                    By subscribing you agree to our  <Text style={{textDecorationLine:"underline",color:"#00f3b9"}}> terms of service </Text>,cookie policy & privacy policy
                                and reprent that you are at least 17 years of age.
                                </Text>
                            </View>
                            <View style={styles.registerButtonView}>
                                <TouchableOpacity style={styles.ButtonLoginContainer} onPress={()=>{this.props.navigation.navigate("MaleFemaleScreen")}}>
                                    <Text style={styles.mainScreenButtonLoginText}>START YOUR FREE TRIAL</Text>
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
        backgroundColor: "black",
        flex: 1,
    },
    container: {
        flex: 1,
        paddingLeft: getLayoutSize(20),
        marginTop: getLayoutSize(-20),
    },
    viewHeader: {
        flex: 1,
        flexDirection:"row",
        marginTop: getLayoutSize(15),
    },
    imageArrow: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        marginLeft: getLayoutSize(10),
        tintColor:"#ffffff",
    },
    imageInfo: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        tintColor: "#ffffff",
        alignSelf:"flex-start",
        position:"absolute",
        right:getLayoutSize(20),
    },
    image:{
        height: getLayoutSize(250),
        width:"100%",
    },
    shadow: {
        width:"100%",
        height: getLayoutSize(250),
        opacity:0.9,
    },
    headerText:{
        color:"white",
        fontFamily: AppFonts.text.font2,
        fontSize:getFontSize(30),
    },
    headerTextWithBorder: {
        color:"white",
        fontFamily: AppFonts.text.font2,
        fontSize: getFontSize(30),
    },
    registerButtonView: {
        marginTop: getLayoutSize(50),
    },
    mainScreenButtonLoginText: {
        fontWeight: "bold",
        color: "#10fec3",
        fontSize: getFontSize(12),
        alignSelf: "center",
    },
    ButtonLoginContainer: {
        height: getLayoutSize(50),
        width: "100%",
        borderRadius: 40,
        borderColor: "#10fec3",
        justifyContent: "center",
        borderWidth: 1,
    },
});