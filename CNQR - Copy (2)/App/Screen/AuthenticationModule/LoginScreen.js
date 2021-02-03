//LoginScreen

import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    BackHandler,
    Dimensions,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { sha512 } from 'js-sha512';
import AsyncStorage from '@react-native-community/async-storage';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';


import { Header, button, String, AppFonts, Colors,TextUtils,ScaleUtils} from '../../Resources/index';
import Utils from '../../Component/Utils';
import ButtonComponent from '../../Component/ButtonComponent';
import ModalProgress from '../../Component/ModalProgress';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';
import { Constants } from '../../RestAPI/Constants';
import { post } from '../../RestAPI/RestAPIHandler';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class LoginScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            email:'',
            emailError:'',
            emailValid:'',
            password:'',
            passwordError:'',
            isLoading:false,
            userInfo: "",
            gettingLoginStatus: true,
            setGettingLoginStatus: true,
        }
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

    componentDidMount() {
        //initial configuration
        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId generated from Firebase console
            webClientId: "960626342502-0340eottuv0dv37eu7gc1psllomldre9.apps.googleusercontent.com",
        });
        //Check if user is already signed in
        this._isSignedIn();
    }


    _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            this._getCurrentUserInfo();
        } else {
            //Alert.alert("Please Login");
            console.log('Please Login');
        }
        this.setState({ setGettingLoginStatus: false })
    };

    async _getCurrentUserInfo() {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log("User Info -->", userInfo);
            this.setState({ userInfo: userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                alert('User has not signed in yet');
                console.log('User has not signed in yet');
            } else {
                alert("Something went wrong. Unable to get user's info");
                console.log("Something went wrong. Unable to get user's info");
            }
        }
    };

    _signIn = async () => {
        //Prompts a modal to let the user sign in into your application.
        try {
            await GoogleSignin.hasPlayServices({
                //Check if device has Google Play Services installed.
                //Always resolves to true on iOS.
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo }, () => { this.doSocialMediaCheck() });

        } catch (error) {
            console.log('Message', error.message);
            console.log('Message', error.code);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
            }
        }
    };

    _signOut = async () => {
        this.setState({ setGettingLoginStatus: true })
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
        this.setState({ setGettingLoginStatus: false })
    };


     async isCheck() {
        var isValid = true;

        if (Utils.isStringNull(this.state.email)) {
            isValid = false;
            this.setState({ emailError: String.validate.usernameError });
        }else if (!Utils.isEmailValid(this.state.email)) {
            isValid = false;
            this.setState({ emailValid: String.validate.validEmail });
        }else {
            this.setState({ emailError: null });
        }

        if (Utils.isStringNull(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.passwordError });
        }  else {
            this.setState({ passwordError: null });
        }

        if(isValid)
        {
                this.doLogin();
        }else{}

     }

    async doSocialMediaCheck() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                social_type: 1,
                social_id:this.state.userInfo.user.id,

            })
            var data = await post(Constants.CHECK_SOCIAL_MEDIA, body);
            console.log("Data==>" + JSON.stringify(data));
            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
                if (data.data.is_exists===1){
                    AsyncStorage.setItem("@user_id", JSON.stringify(data.data.user_id));
                    AsyncStorage.setItem("@full_name", data.data.full_name);
                    AsyncStorage.setItem("@email", data.data.email);
                    AsyncStorage.setItem("@calories", data.data.calories.toString());
                    AsyncStorage.setItem("@carbs", data.data.carbs);
                    AsyncStorage.setItem("@fat", data.data.fat);
                    AsyncStorage.setItem("@protein", data.data.protein.toString());
                    AsyncStorage.setItem("@plan_list_id",JSON.stringify( data.data.plan_id))
                    this.props.navigation.navigate("HomeNavigatorStack",{screen:"BottomNavigator"});
                }else{
                    const isConnected = await Utils.isNetworkAvailable()
                    if (isConnected == true) {
                        this.setState({ isLoading: true });
                        var body = JSON.stringify({
                            full_name: this.state.userInfo.user.name,
                            email: this.state.userInfo.user.email,
                            password: "",
                            email_receive: "1",
                            register_type: "1",
                            apple_id: "",
                            google_id: this.state.userInfo.user.id,
                            device_type: 0,
                            device_token: "df25c845d460bcdad7802d2vf6fc1dfde97283bf75cc993eb6dca835ea2e2f"

                        })
                        var data = await post(Constants.SIGN_UP, body);
                        console.log("Data==>" + JSON.stringify(data));
                        if (data !== null && data.success === "yes" && data.data !== null) {
                            this.setState({ isLoading: false })
                            AsyncStorage.setItem("@user_id", JSON.stringify(data.data.user_id));
                            AsyncStorage.setItem("@full_name", JSON.stringify(data.data.full_name));
                            AsyncStorage.setItem("@email", JSON.stringify(data.data.email));
                            this.props.navigation.navigate("SubscriptionScreen");
                        } else {
                            //Alert.alert(data.message)
                            this.setState({ isLoading: false })
                        }
                    } else {
                        Utils.DialogBox("Alert", "Please check your internet connection.")
                    }
                }
                this._signOut();

            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert", "Please check your internet connection.")
        }
    }


     async doLogin(){
        const isConnected = await Utils.isNetworkAvailable()
        if(isConnected==true){
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                email: this.state.email,
                password: sha512(this.state.password),
                device_type: '0',
                device_token: 'android',
            })
            var data = await post(Constants.LOGIN, body);
            console.log(("Data-->" + JSON.stringify(data)));
            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ email: null, password: null,isLoading:false })
                AsyncStorage.setItem("@user_id", JSON.stringify(data.data.user_id));
                AsyncStorage.setItem("@full_name", data.data.full_name);
                AsyncStorage.setItem("@email", data.data.email);
                AsyncStorage.setItem("@calories", data.data.calories.toString());
                AsyncStorage.setItem("@carbs", data.data.carbs);
                AsyncStorage.setItem("@fat", data.data.fat);
                AsyncStorage.setItem("@protein", data.data.protein.toString());
                AsyncStorage.setItem("@plan_list_id", JSON.stringify(data.data.plan_id))
                this.props.navigation.navigate("HomeNavigatorStack");
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        }else{
            Utils.DialogBox("Alert","Please check your internet connection.")
        }
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <Header title={require("../../Assets/ImageAndIcons/logo.png")} 
                    imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} 
                    isBack={true} screen={"MainScreen"} 
                    navigation={this.props.navigation}>
                </Header>
                <ModalProgress
                isVisible={this.state.isLoading}></ModalProgress>
               <View style={styles.container}>
                    <Text style={styles.textStyle}>{String.authentication.LOGIN_HEADER_TEXT}</Text>
                   <TextInput
                        style={styles.inputStyle}
                        placeholder="Email"
                        keyboardType={"email-address"}
                        placeholderTextColor="#a9a9a9"
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email:text,emailError:null,emailValid:null})}}/>

                    {!!this.state.emailValid && (
                        <Text style={{ color: Colors.ERROR_COLOR}}>{String.validate.validEmail}</Text>
                    )}

                    {!!this.state.emailError && (
                        <Text style={{ color: Colors.ERROR_COLOR}}>{String.validate.usernameError}</Text>
                    )}

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#a9a9a9"
                        value={this.state.password}
                        onChangeText={(text) => { this.setState({ password: text,passwordError:null }) }} />
                    
                    {!!this.state.passwordError && (
                        <Text style={{ color: Colors.ERROR_COLOR}}>{this.state.passwordError}</Text>
                    )}

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("ForgotPasswordScreen") }}
                    style={styles.forgotView}>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                        
                        <Text style={styles.forgotHelp}>Get help signing in</Text>
                        </TouchableOpacity>
                
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("ChangePasswordScreen") }}
                        style={styles.forgotView}>
                        <Text style={styles.forgotText}>Change Password?</Text>
                       
                            <Text style={styles.forgotHelp}>Get help signing in</Text>
                        </TouchableOpacity>
                   
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={()=>{this.isCheck()}}>
                            <ButtonComponent text={"LOGIN"} onClicked={()=>{}} />
                        </TouchableOpacity>
                        {/*<TouchableOpacity style={button.ButtonLoginContainer} onPress={() => { this.isCheck();}}>
                            <Text style={button.mainScreenButtonLoginText}>LOGIN</Text>
                    </TouchableOpacity>*/}
                        <TouchableOpacity style={button.ButtonContainer} onPress={()=>{this._signIn()}}>
                            <Image source={require("../../Assets/ImageAndIcons/google.png")} style={styles.googleImage}/>
                            <Text style={button.ButtonContainerText}>LOGIN WITH GOOGLE</Text>
                        </TouchableOpacity>
                    </View>
               </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
    },
    container:{
        flex:1,
        padding: ScaleUtils.SCREEN_PADDING,
    },
    textStyle:{
        color: Colors.TITLE_FONT_COLOR,
        fontSize: TextUtils.AUTHENTICATION_TITLE,
        alignSelf:"center",
        marginTop: ScaleUtils.AUTHENTICATION_TITLE_MARGIN_TOP,
        fontFamily:AppFonts.text.font2,
    },
    inputStyle:{
        marginTop: ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP,
        borderBottomColor:Colors.DEFAULT_SUB_CONTENT_COLOR,
        borderWidth:1,
        color: Colors.TITLE_FONT_COLOR,
    },
    forgotView:{
        flexDirection:"row",
        marginTop: ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP,
    },
    forgotText:{
        fontSize:TextUtils.BUTTON_TEXT,
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
    },
    forgotHelp:{
        color:Colors.COLOR_PRIMARY,
        fontSize: TextUtils.BUTTON_TEXT,
        marginLeft: getLayoutSize(4),
    },
    buttonView:{
        marginTop: ScaleUtils.AUTHENTICATION_BUTTON_MARGIN_TOP,
    },
    gmailView:{
        flexDirection:"row",
        justifyContent:"center",
    },
    googleImage:{
        height: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        width: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        marginRight: getLayoutSize(10),
       alignSelf:"center",
    },
});