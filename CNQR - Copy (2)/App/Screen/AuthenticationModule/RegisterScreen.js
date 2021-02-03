//RegisterScreen

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
    Alert,
    ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import { sha512 } from 'js-sha512';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';

import {Constants} from '../../RestAPI/Constants';
import { post } from '../../RestAPI/RestAPIHandler';
import ButtonComponent from '../../Component/ButtonComponent';
import ModalProgress from '../../Component/ModalProgress';
import { Header, button, Colors, String,AppFonts,TextUtils,ScaleUtils} from '../../Resources/index';
import Utils from '../../Component/Utils';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class RegisterScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            fullname:'',
            fullnameError:'',
            fullnameValid:'',
            password:'',
            passwordError:'',
            email:'',
            emailError:'',
            emailValid:'',
            check:false,
            isLoading:false,
            userInfo: null,
            gettingLoginStatus: true,
            setGettingLoginStatus:true,
        };
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
            webClientId:"960626342502-0340eottuv0dv37eu7gc1psllomldre9.apps.googleusercontent.com",
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
        this.setState({setGettingLoginStatus:false})
    };

     async _getCurrentUserInfo(){
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log("User Info -->",userInfo);
            this.setState({ userInfo: userInfo});
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
            this.setState({ userInfo: userInfo }, () => { this.doSocialMediaCheck()});
            
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

        if (Utils.isStringNull(this.state.fullname)) {
            isValid = false;
            this.setState({fullnameError: String.validate.fullnameError });
        } else if (!Utils.isNameValid(this.state.fullname)) {
            isValid = false;
            this.setState({ fullnameValid: String.validate.fullnameValid });
        } else {
            this.setState({ fullnameError: null });
        }

        if (Utils.isStringNull(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.passwordError });
        } else {
            this.setState({ passwordError: null });
        }

        if (Utils.isStringNull(this.state.email)) {
            isValid = false;
            this.setState({ emailError: String.validate.emailError });
        } else if (!Utils.isEmailValid(this.state.email)) {
            isValid = false;
            this.setState({ emailValid: String.validate.validEmail });
        } else {
            this.setState({ emailError: null });
        }

         if (isValid) {
             this.doSignUp();
         } else { }
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
                    AsyncStorage.setItem("@user_id", JSON.stringify(data.data.user_id));
                    AsyncStorage.setItem("@full_name", data.data.full_name);
                    AsyncStorage.setItem("@email", data.data.email);
                    AsyncStorage.setItem("@calories", data.data.calories.toString());
                    AsyncStorage.setItem("@carbs", data.data.carbs);
                    AsyncStorage.setItem("@fat", data.data.fat);
                    AsyncStorage.setItem("@protein", data.data.protein.toString());
                    this.props.navigation.navigate("SubscriptionScreen");
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
                            google_id:this.state.userInfo.user.id,
                            device_type: 0,
                            device_token: "df25c845d460bcdad7802d2vf6fc1dfde97283bf75cc993eb6dca835ea2e2f"

                        })
                        var data = await post(Constants.SIGN_UP, body);
                        console.log("Data==>" + JSON.stringify(data));
                        if (data !== null && data.success === "yes" && data.data !== null) {
                            this.setState({ isLoading: false })
                            AsyncStorage.setItem("@user_id", JSON.stringify(data.data.user_id));
                            AsyncStorage.setItem("@full_name",data.data.full_name);
                            AsyncStorage.setItem("@email", JSON.stringify(data.data.email));
                            this.props.navigation.navigate("SubscriptionScreen");
                        } else {
                            //Alert.alert(data.message)
                            this.props.navigation.navigate("LoginScreen")
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

    async doSignUp() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                full_name: this.state.fullname,
                email: this.state.email,
                password: sha512(this.state.password),
                email_receive: "1",
                register_type: "1",
                apple_id: "",
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
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert","Please check your internet connection.")
        }
    }

    handleFacebookLogin() {
        LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled')
                } else {
                    console.log('Login success with permissions: ' + result.grantedPermissions.toString())
                    console.log(JSON.stringify(result));
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error)
            }
        )
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <Header title={require("../../Assets/ImageAndIcons/logo.png")} imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} isBack={true} navigation={this.props.navigation} screen={"MainScreen"}></Header>
                <ScrollView>
                    <ModalProgress
                        isVisible={this.state.isLoading}></ModalProgress>
                    <View style={styles.container}>
                        <Text style={styles.textStyle}>{String.authentication.REGISTER_HEADER_TEXT}</Text>
                        <View style={styles.textView}>
                            <Text style={styles.loginText}>{"\t\t"}{String.authentication.REGISTER_FIRST_PAREGRAPH}{"\n"}{String.authentication.REGISTER_FIRST_PAREGRAPH2}{"\n"}
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("LoginScreen")}>
                                    <Text style={styles.loginHelp}><Text style={styles.loginText}>{"\t\t\t\t"}account,</Text>{"\t"}{String.authentication.REGISTER_FIRST_PAREGRAPH3}</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity style={button.ButtonContainer} onPress={()=>{this._signIn()}}>
                                <Image source={require("../../Assets/ImageAndIcons/google.png")} style={styles.googleImage} />
                                <Text style={button.ButtonContainerText}>REGISTER WITH GOOGLE</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonView}>
                            <TouchableOpacity style={button.ButtonContainer} onPress={() => { this.handleFacebookLogin() }}>
                                <Image source={require("../../Assets/ImageAndIcons/facebook.png")} style={styles.googleImage} />
                                <Text style={button.ButtonContainerText}>REGISTER WITH FACEBOOK</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.signUpText} onPress={() => { this.props.navigation.navigate("SubscriptionScreen") }}>{String.authentication.REGISTER_SIGNUP_EMAIL}</Text>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Full name"
                            placeholderTextColor="#a9a9a9"
                            value={this.state.firstname}
                            onChangeText={(text) => { this.setState({ fullname: text,fullnameError:null,fullnameValid:null }) }} />

                        {!!this.state.fullnameValid && (
                            <Text style={{ color: Colors.ERROR_COLOR}}>{String.validate.fullnameValid}</Text>
                        )}

                        {!!this.state.fullnameError && (
                            <Text style={{ color: Colors.ERROR_COLOR}}>{String.validate.fullnameError}</Text>
                        )}

                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Email"
                            keyboardType={'email-address'}
                            placeholderTextColor="#a9a9a9"
                            value={this.state.email}
                            onChangeText={(text) => { this.setState({ email: text,emailError:null,emailValid:null }) }} />

                        {!!this.state.emailValid && (
                            <Text style={{ color: Colors.ERROR_COLOR}}>{String.validate.validEmail}</Text>
                        )}

                        {!!this.state.emailError && (
                            <Text style={{ color: Colors.ERROR_COLOR}}>{String.validate.emailError}</Text>
                        )}

                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor="#a9a9a9"
                            value={this.state.password}
                            onChangeText={(text) => { this.setState({ password: text, passwordError: null }) }} />

                        {!!this.state.passwordError && (
                            <Text style={{ color: Colors.ERROR_COLOR}}>{this.state.passwordError}</Text>
                        )}

                        <View style={styles.checkboxView}>
                            <CheckBox 
                                tintColors={"#b3b3b3"}
                                disabled={false}
                                value={this.state.check}
                                onChange={(value)=>{this.setState({check:!this.state.check})}}/>
                            <Text style={styles.chechkboxText}>{String.authentication.REGISTER_CHECKBOX_TEXT}</Text>
                        </View>
                        <View style={styles.registerButtonView}>
                            {/*<TouchableOpacity style={button.ButtonLoginContainer} onPress={() => { this.isCheck();}}>
                                <Text style={button.mainScreenButtonLoginText}>JOIN US</Text>
                        </TouchableOpacity>*/}
                        <TouchableOpacity onPress={()=>{this.isCheck()}}>
                            <ButtonComponent text={"JOIN US"}></ButtonComponent>
                        </TouchableOpacity>
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
    textStyle: {
        fontFamily: AppFonts.text.font2,
        color: Colors.TITLE_FONT_COLOR,
        fontSize: TextUtils.AUTHENTICATION_TITLE,
        alignSelf: "center",
        marginTop: ScaleUtils.AUTHENTICATION_TITLE_MARGIN_TOP,
    },
    textView:{
        marginTop: getLayoutSize(27),
    },
    loginText:{
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        color:Colors.DEFAULT_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        alignSelf:"center",
    },
    loginHelp: {
        color: Colors.COLOR_PRIMARY,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
    },
    googleImage: {
        height: getLayoutSize(15),
        width: getLayoutSize(15),
        marginRight: getLayoutSize(10),
        alignSelf: "center",
    },
    buttonView:{
        marginTop: getLayoutSize(25),
    },
    signUpText:{
        marginTop: getLayoutSize(45),
        color:Colors.DEFAULT_CONTENT_COLOR,
        alignSelf:"center",
        fontFamily: AppFonts.text.font4,
    },
    inputStyle: {
        marginTop: ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP,
        borderBottomColor: Colors.DEFAULT_SUB_CONTENT_COLOR,
        borderWidth: 1,
        color: Colors.TITLE_FONT_COLOR,
        fontFamily:AppFonts.text.font3,
    },
    checkboxView:{
        marginTop: getLayoutSize(45),
        flexDirection:"row",
    },
    chechkboxText: {
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        color: "#b3b3b3",
        alignSelf:"center",
        marginLeft: getLayoutSize(10),
        fontFamily: AppFonts.text.font3,
    },
    registerButtonView:{
        marginTop: ScaleUtils.AUTHENTICATION_BUTTON_MARGIN_TOP,
    },
    registerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerImageStyle: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
    },
});