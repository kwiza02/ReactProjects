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
} from "react-native";

import { Header, button, color, String,AppFonts } from '../../Resources/index';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';

export default class AccountInfoScreen extends Component{

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
                        <View style={{flexDirection:"row",marginTop:getLayoutSize(40),justifyContent:"space-between"}}>
                            <Text style={styles.measurementText}>Messages and Support</Text>
                            <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png")} style={styles.sideMenuMeasurementImage}></Image>
                        </View>
                        <View style={styles.lineView}></View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={styles.measurementText} onPress={()=>{this.props.navigation.navigate("FAQsScreen")}}>FAQS</Text>
                            <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png")} style={styles.sideMenuFAQSImage}></Image>
                        </View>
                        <View style={styles.lineView}></View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.measurementText} onPress={()=>{this.props.navigation.navigate("PrivacyPolicyScreen")}}>Privacy Policy</Text>
                            <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png")} style={styles.sideMenuPolicyImage}></Image>
                        </View>
                        <View style={styles.lineView}></View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.deleteText}>Delete my account</Text>
                            <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png")} style={styles.sideMenuDeleteAccountImage}></Image>
                        </View>
                        <Text style={{color:"#444444",marginLeft:getLayoutSize(55)}}>This action cannot be undone.</Text>
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
    settingText: {
        color: "#696666",
        fontSize: getFontSize(15),
        marginTop: getLayoutSize(50),
        marginLeft: getLayoutSize(30),
        fontFamily: AppFonts.text.font3,
    },
    measurementText: {
        color: "#fafafa",
        fontSize: getFontSize(16),
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
        fontSize: getFontSize(16),
        marginLeft: getLayoutSize(55),
    },
    lineView:{
        width: "100%", 
        borderColor: "#1f1f1f", 
        borderWidth: 1, 
        marginTop: getLayoutSize(20), 
        marginBottom: getLayoutSize(20) 
    },
})