//UserProfileScreen

import React, { Component } from "react";
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    ScrollView,
    BackHandler,
} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';

import { Header, button, color, String, AppFonts } from '../../Resources/index';
import Utils from '../../Component/Utils';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';
var RNFS = require('react-native-fs');

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class UserProfileScreen extends Component{
    
    constructor(props){
        super(props);
        this.state={
            isOpenPicker: false,
            userSelected: '',
        };
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }

    disableBackButton = () => {
        this.props.navigation.navigate("LoginScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    selectPhotoTapped(flag) {

        var path = RNFS.ExternalStorageDirectoryPath  +"Data/"  + '/test.txt';
        console.log("Path " + path)
        // write the file
        RNFS.copyFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            });

        if (flag == 1) {
            ImagePicker.openPicker({
                width: getLayoutSize(300),
                height: getLayoutSize(400),
                cropping: true
            }).then(image => {
                console.log(image);
                this.setState({
                    avtarSource: image.path,
                });
                this.setModalVisible(false);
            });
        } else {
            ImagePicker.openCamera({
                width: getLayoutSize(300),
                height: getLayoutSize(400),
                cropping: true,
            }).then(image => {
                console.log(image);

                RNFS.exists(image.path).then((status) => {
                    if (status) {
                        Alert.alert("Success "+status);
                    } else {
                        Alert.alert("ERrror " + status);
                    }
                })
                this.setState({
                    avtarSource: image.path,
                });
                this.setModalVisible(false);
            });
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


    render(){
        return(
            <View style={styles.mainContainer}>
                <Header imgSrc={require('../../Assets/ImageAndIcons/back_with_arrow.png')} 
                isBack={false} navigation={this.props.navigation} 
                screen={"RegisterScreen"} 
                title={require("../../Assets/ImageAndIcons/logo.png")}
                isBack1={false}
                imgLogout={require("../../Assets/ImageAndIcons/logout.png")}
                text={"LOGOUT"} />
                <ScrollView>
                    <View style={styles.profileView}>
                        <View>
                            <TouchableOpacity onPress={() => { this.clickEventListener(); }}>
                                <View style={styles.profileImageView}>
                                    <Image source={this.state.avtarSource ? { uri: this.state.avtarSource } : require("../../Assets/ImageAndIcons/image_three.png")} style={styles.profileImage}></Image>
                                </View>
                                <View style={styles.pencilView}>
                                    <Image source={require("../../Assets/ImageAndIcons/pen.png")} style={styles.pencilImage}></Image>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.profileText}>Sergio Pliego</Text>
                            <Text style={styles.profileGmailText}>sergio_pliego_23@gmail.com</Text>
                        </View>
                    </View>
                    <Text style={styles.settingText}>SETTINGS</Text>
                    <TouchableOpacity style={{ flexDirection: "row", marginTop: getLayoutSize(40),justifyContent:"space-between" }}
                    onPress={()=>{this.props.navigation.navigate("ChangeYourGoalScreen")}}>
                        <Text style={styles.measurementText}>Unit of Measurement</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.sideMenu}>lbs</Text>
                            <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png")} style={styles.sideMenuMeasurementImage}></Image>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: "100%", borderColor: "#1f1f1f", borderWidth: 1, marginTop: getLayoutSize(30), marginBottom: getLayoutSize(30)}}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.measurementText}>Notifications</Text>
                        <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png")} style={styles.sideMenuNotificationImage}></Image>
                    </View>
                    <Text style={styles.settingText}>ACCOUNT</Text>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("AccountInfoScreen") }}>
                        <View style={{ flexDirection: "row", marginTop: getLayoutSize(40), justifyContent: "space-between" }}>
                            <Text style={styles.measurementText}>Manage subscriptions</Text>
                            <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png")} style={styles.sideMenuSubscriptionImage}></Image>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: "100%", borderColor: "#1f1f1f", borderWidth: 1, marginTop: getLayoutSize(30), marginBottom: getLayoutSize(30) }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.measurementText}>Contact prefrences</Text>
                        <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png")} style={styles.sideMenuContactImage}></Image>
                    </View>
                    <Modal
                        transparent={true}
                        animationType={"feed"}
                        visible={this.state.isOpenPicker}>
                        <View style={styles.popupOverlay}>
                            <TouchableOpacity style={{ width: screenWidth, height: screenHeight, position: 'absolute' }}
                                onPress={() => { this.setModalVisible(false) }} />
                            <View style={styles.popup}>
                                <TouchableOpacity onPress={() => this.selectPhotoTapped(2)}>
                                    <Image source={require("../../Assets/ImageAndIcons/outline_photo_camera_black_36pt_3x.png")} style={{ height: getLayoutSize(50), width: getLayoutSize(50),alignSelf:"center" }} />
                                    <Text style={{ padding: getLayoutSize(5), alignItems: "center", }}>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.selectPhotoTapped(1)}>
                                    <Image source={require("../../Assets/ImageAndIcons/outline_photo_library_black_36pt_3x.png")} style={{ height: getLayoutSize(50), width: getLayoutSize(50),alignSelf:"center" }} />
                                    <Text style={{ padding: getLayoutSize(5), alignItems: "center" }}>Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
    profileView:{
        flexDirection:"row",
        marginLeft: getLayoutSize(30),
        marginTop: getLayoutSize(50),
    },
    profileImageView: {
        borderWidth: 1.5, 
        borderColor: "#868686", 
        borderRadius: 39, 
        height: getLayoutSize(79), 
        width: getLayoutSize(79), 
        justifyContent: "center",
    },
    profileImage:{
        width: getLayoutSize(74),
        height: getLayoutSize(74),
        borderRadius:36,
        alignSelf:"center",
    },
    profileText:{
        color:"#f8f8f8",
        fontSize:getFontSize(19),
        marginLeft: getLayoutSize(15),
        marginTop: getLayoutSize(10),
        fontFamily:AppFonts.text.font3,
    },
    profileGmailText:{
        fontSize: getFontSize(18), 
        color: "#4c4c4c", 
        marginTop: getLayoutSize(5), 
        marginLeft: getLayoutSize(15),
        fontFamily: AppFonts.text.font3,
    },
    pencilView:{
        backgroundColor:"#0ff7bd",
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        borderRadius:15,
        marginLeft: getLayoutSize(49),
        marginTop: getLayoutSize(-30),
        justifyContent:"center",
    },
    pencilImage:{
        width: getLayoutSize(15),
        height: getLayoutSize(15),
        tintColor:"black",
        alignSelf:"center",
    },
    settingText:{
        color: "#696666", 
        fontSize: getFontSize(15), 
        marginTop: getLayoutSize(50), 
        marginLeft: getLayoutSize(30),
        fontFamily: AppFonts.text.font4,
    },
    measurementText:{
        color: "#fafafa", 
        fontSize: getFontSize(16), 
        marginLeft: getLayoutSize(30),
        fontFamily: AppFonts.text.font3,
    },
    sideMenu:{
        color:"#3e3b3b",
        right: getLayoutSize(10),
        fontSize: getFontSize(18),
        fontWeight:"bold",
    },
    sideMenuMeasurementImage:{
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        tintColor:"#5c5b5b",
    },
    sideMenuNotificationImage: {
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        tintColor: "#5c5b5b",
    },
    sideMenuSubscriptionImage: {
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        tintColor: "#5c5b5b",
    },
    sideMenuContactImage: {
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        tintColor: "#5c5b5b",
    },
    popup: {
        backgroundColor: '#0ff7bd',
        borderRadius: 7,
        justifyContent: "space-around",
        alignItems:"center",
        flexDirection:"row",
        alignSelf:"center",
        height: getLayoutSize(200),
        width: getLayoutSize(250),
    },
    popupOverlay: {
        backgroundColor: "#00000057",
        flex: 1,
        justifyContent:"center"
    },
})