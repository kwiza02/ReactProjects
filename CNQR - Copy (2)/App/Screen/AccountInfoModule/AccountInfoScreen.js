//AccountInfoScreen

import React, { Component } from "react";
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    BackHandler,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    ScrollView,
    Alert,
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

import { Header, button, Colors, String,AppFonts ,ScaleUtils,TextUtils} from '../../Resources/index';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';
import { Constants } from '../../RestAPI/Constants';
import { post } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';

export default class AccountInfoScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
        };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("UserProfileScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    async doDelete() {
        this.setState({ isLoading: true });
        var body = JSON.stringify({
            user_id:await AsyncStorage.getItem("@user_id")
        })
        var data = await post(Constants.DELETE_ACCOUNT, body);
        console.log(("Data-->" + JSON.stringify(data)));
        if (data !== null && data.success === "yes" && data.data !== null) {
            AsyncStorage.clear()
            this.props.navigation.navigate("LoginScreen");
            Utils.DialogBox(data.message)
        } else {
            Alert.alert(data.message)
        }
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <Header imgSrc={require('../../Assets/ImageAndIcons/back_with_arrow.png')}
                    isBack={false} navigation={this.props.navigation}
                    screen={"UserProfileScreen"}
                    title={require("../../Assets/ImageAndIcons/logo.png")}
                    isBack1={false}
                    imgLogout={require("../../Assets/ImageAndIcons/logout.png")}
                    text={"LOGOUT"} />
                    <ScrollView>
                        <Text style={styles.settingText}>Manage Subscriptions</Text>
                        <TouchableOpacity style={{flexDirection:"row",marginTop:getLayoutSize(40),justifyContent:"space-between"}}
                        onPress={() => { this.props.navigation.navigate("MessageSupportScreen") }}>
                            <Text style={styles.measurementText}>Messages and Support</Text>
                            <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt.png")} style={styles.sideMenuMeasurementImage}></Image>
                        </TouchableOpacity>
                        <View style={styles.lineView}></View>
                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => { this.props.navigation.navigate("FAQsScreen") }}>
                            <Text style={styles.measurementText} >FAQS</Text>
                            <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt.png")} style={styles.sideMenuFAQSImage}></Image>
                        </TouchableOpacity>
                        <View style={styles.lineView}></View>
                         <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => { this.props.navigation.navigate("PrivacyPolicyScreen") }}>
                            <Text style={styles.measurementText} >Privacy Policy</Text>
                            <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt.png")} style={styles.sideMenuPolicyImage}></Image>
                        </TouchableOpacity>
                        <View style={styles.lineView}></View>
                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => Alert.alert(
                        'Delete Account',
                                    'Are you sure want to delete this account ?',
                                    [
                                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                        {text: 'OK', onPress: () => {this.doDelete()}},
                                    ],
                                    {cancelable: false }
                                )}>
                            <Text style={styles.deleteText}>!   Delete my account</Text>
                            <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt.png")} style={styles.sideMenuDeleteAccountImage}></Image>
                        </TouchableOpacity>
                        <Text style={{color:"#444444",marginLeft:getLayoutSize(55)}}>This action cannot be undone.</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor:Colors.BACKGROUND_COLOR ,
        flex: 1,
    },
    settingText: {
        color: "#696666",
        fontSize:TextUtils.TEXT_SIZE_FIFTEEN,
        marginTop: getLayoutSize(50),
        marginLeft: getLayoutSize(30),
        fontFamily: AppFonts.text.font3,
    },
    measurementText: {
        color: "#fafafa",
        fontSize: TextUtils.USER_ACCOUNT_INFO_TITLE,
        marginLeft: getLayoutSize(30),
        fontFamily: AppFonts.text.font3,
    },
    sideMenuMeasurementImage: {
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        tintColor: "#5c5b5b",
    },
    sideMenuFAQSImage: {
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        tintColor: "#5c5b5b",
    },
    sideMenuPolicyImage: {
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        tintColor: "#5c5b5b",
    },
    sideMenuDeleteAccountImage: {
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        tintColor: "#5c5b5b",
    },
    deleteText:{
        color: "#fafafa",
        fontSize: TextUtils.USER_ACCOUNT_INFO_TITLE,
        marginLeft: getLayoutSize(45),
    },
    lineView:{
        width: "100%", 
        borderColor: "#1f1f1f", 
        borderWidth: 1, 
        marginTop: getLayoutSize(20), 
        marginBottom: getLayoutSize(20) 
    },
})