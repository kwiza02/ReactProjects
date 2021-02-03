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
    Alert,
} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import { post, get, sendPostFormDataRequest } from '../../RestAPI/RestAPIHandler';
import { Header, button, Colors, String, AppFonts,TextUtils,ScaleUtils } from '../../Resources/index';
import Utils from '../../Component/Utils';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class UserProfileScreen extends Component{
    
    constructor(props){
        super(props);
        this.state={
            isOpenPicker: false,
            userSelected: '',
            full_name:"",
            email:"",
            user_id:"",
            current_picture:"",
            current_image:"",
            profile:"",
            isLoading:false,
            filename:"",
            type:"",
        };
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }

    async componentDidMount(){
        const full_name = await AsyncStorage.getItem("@full_name");
        const email = await AsyncStorage.getItem("@email");
        const user_id = await AsyncStorage.getItem("@user_id");
        this.setState({ full_name: full_name, email: email,user_id:user_id ,})

        this.doUserInfo()
        
    }

    disableBackButton = () => {
        this.props.navigation.navigate("BottomTabNavigator");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    async doUserInfo() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                user_id:await AsyncStorage.getItem("@user_id"),
            })
            var data = await post(Constants.USER_INFO, body);
            console.log(("Data-->" + JSON.stringify(data)));

            this.setState({current_picture: data.data.profile_picture,
                current_image: data.data.current_image})

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
                //this.props.navigation.navigate("MaleFemaleScreen");
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Please check your internet connection.")
        }
    }

    async doUpdatePic() {
            this.setState({ isLoading: true });
            const user_id = await AsyncStorage.getItem("@user_id");
            var photo = {
                uri: this.state.profile !== "" && this.state.profile !== null ? this.state.profile:this.state.current_image,
                type: 'image/jpg',
                name:this.state.filename
            }
            console.log("Payload "+JSON.stringify(photo))
            //let profile = { uri: this.state.profile.uri, name: 'image.jpg', type: 'image/jpg' }
            let formdata = new FormData();
            formdata.append("user_id", user_id)
            formdata.append("profile_picture",photo ), 
                   
            formdata.append("current_image", this.state.current_image)

            var data = await sendPostFormDataRequest(Constants.UPDATE_USER_PIC, formdata);
            console.log("Data payload---> " + JSON.stringify(data));
    }


    selectPhotoTapped(flag) {
        if (flag == 1) {
            ImagePicker.openPicker({
                width: getLayoutSize(300),
                height: getLayoutSize(400),
                cropping: true
            }).then(image => {
                console.log(image);
                this.setState({
                    profile: image.path,
                    filename:"image.jpg",
                    type:image.mime
                });
                this.doUpdatePic()
                this.setModalVisible(false);
                console.log("PATHHHHH111--->" +this.state.profile);
                console.log("filename--->" + this.state.filename);
                console.log("type--->" + this.state.type);
            });
        } else {
            ImagePicker.openCamera({
                width: getLayoutSize(300),
                height: getLayoutSize(400),
                cropping: true,
            }).then(image => {
                console.log(image);
                this.setState({
                    profile: image.path,
                    filename: "image.jpg",
                    type:image.mime
                });
                this.doUpdatePic()
                this.setModalVisible(false);
                console.log("PATHHHHH--->" + this.state.profile);
                console.log("filename--->" + this.state.filename);
                console.log("type--->" + this.state.type);
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
                                    <Image source={this.state.profile ? {uri:this.state.profile}:{uri:this.state.current_picture}} style={styles.profileImage}></Image>
                                </View>
                                <View style={styles.pencilView}>
                                    <Image source={require("../../Assets/ImageAndIcons/pen.png")} style={styles.pencilImage}></Image>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.profileText}>{this.state.full_name}</Text>
                            <Text style={styles.profileGmailText}>{this.state.email}</Text>
                        </View>
                    </View>
                    <Text style={styles.settingText}>SETTINGS</Text>
                    <TouchableOpacity style={{ flexDirection: "row", marginTop: getLayoutSize(40),justifyContent:"space-between" }}
                    onPress={()=>{this.props.navigation.navigate("ChangeYourGoalScreen")}}>
                        <Text style={styles.measurementText}>Unit of Measurement</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.sideMenu}>lbs</Text>
                            <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt.png")} style={styles.sideMenuMeasurementImage}></Image>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: "100%", borderColor: "#1f1f1f", borderWidth: 1, marginTop: getLayoutSize(30), marginBottom: getLayoutSize(30)}}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.measurementText}>Notifications</Text>
                        <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt.png")} style={styles.sideMenuNotificationImage}></Image>
                    </View>
                    <Text style={styles.settingText}>ACCOUNT</Text>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("AccountInfoScreen") }}>
                        <View style={{ flexDirection: "row", marginTop: getLayoutSize(40), justifyContent: "space-between" }}>
                            <Text style={styles.measurementText}>Manage subscriptions</Text>
                            <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt.png")} style={styles.sideMenuSubscriptionImage}></Image>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: "100%", borderColor: "#1f1f1f", borderWidth: 1, marginTop: getLayoutSize(30), marginBottom: getLayoutSize(30) }}></View>
                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => {
                        this.props.navigation.navigate("ContactPrefrenceScreen") }}>
                        <Text style={styles.measurementText}>Contact prefrences</Text>
                        <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt.png")} style={styles.sideMenuContactImage}></Image>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        animationType={"feed"}
                        visible={this.state.isOpenPicker}>
                        <View style={styles.popupOverlay}>
                            <TouchableOpacity style={{ width: screenWidth, height: screenHeight, position: 'absolute' }}
                                onPress={() => { this.setModalVisible(false) }} />
                            <View style={styles.popup}>
                                <TouchableOpacity onPress={() => this.selectPhotoTapped(2)}>
                                    <Image source={require("../../Assets/ImageAndIcons/outline_photo_camera_black_36pt.png")} style={{ height: getLayoutSize(50), width: getLayoutSize(50),alignSelf:"center" }} />
                                    <Text style={{ padding: getLayoutSize(5), alignItems: "center", }}>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.selectPhotoTapped(1)}>
                                    <Image source={require("../../Assets/ImageAndIcons/outline_photo_library_black_36pt.png")} style={{ height: getLayoutSize(50), width: getLayoutSize(50),alignSelf:"center" }} />
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
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
    },
    profileView:{
        flexDirection:"row",
        marginLeft:ScaleUtils.MARGIN_TOP_THIRTY,
        marginTop: ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP,
    },
    profileImageView: {
        borderWidth: 1.5, 
        borderColor: Colors.DEFAULT_CONTENT_COLOR, 
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
        fontSize: TextUtils.TEXT_SIZE_EIGHTEEN,
        marginLeft:ScaleUtils.MARGIN_TOP_FIFTEEN,
        marginTop: ScaleUtils.MARGIN_TOP_TEN,
        fontFamily:AppFonts.text.font3,
    },
    profileGmailText:{
        fontSize: TextUtils.TEXT_SIZE_EIGHTEEN, 
        color: "#4c4c4c", 
        marginTop: getLayoutSize(5), 
        marginLeft:ScaleUtils.MARGIN_TOP_FIFTEEN,
        fontFamily: AppFonts.text.font3,
    },
    pencilView:{
        backgroundColor:"#0ff7bd",
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width:ScaleUtils.IMAGE_SIZE_THIRTY,
        borderRadius:15,
        marginLeft: getLayoutSize(49),
        marginTop: getLayoutSize(-30),
        justifyContent:"center",
    },
    pencilImage:{
        width: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        height: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        tintColor:"black",
        alignSelf:"center",
    },
    settingText:{
        color: "#696666", 
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN, 
        marginTop: ScaleUtils.AUTHENTICATION_BUTTON_MARGIN_TOP, 
        marginLeft:ScaleUtils.MARGIN_TOP_THIRTY,
        fontFamily: AppFonts.text.font4,
    },
    measurementText:{
        color: "#fafafa", 
        fontSize: TextUtils.USER_ACCOUNT_INFO_TITLE, 
        marginLeft:ScaleUtils.MARGIN_TOP_THIRTY,
        fontFamily: AppFonts.text.font3,
    },
    sideMenu:{
        color:"#3e3b3b",
        right:ScaleUtils.MARGIN_TOP_TEN,
        fontSize: TextUtils.TEXT_SIZE_EIGHTEEN,
        fontWeight:"bold",
    },
    sideMenuMeasurementImage:{
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: ScaleUtils.IMAGE_SIZE_THIRTY,
        tintColor:"#5c5b5b",
    },
    sideMenuNotificationImage: {
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: ScaleUtils.IMAGE_SIZE_THIRTY,
        tintColor: "#5c5b5b",
    },
    sideMenuSubscriptionImage: {
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: ScaleUtils.IMAGE_SIZE_THIRTY,
        tintColor: "#5c5b5b",
    },
    sideMenuContactImage: {
        height:ScaleUtils.IMAGE_SIZE_THIRTY,
        width: ScaleUtils.IMAGE_SIZE_THIRTY,
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