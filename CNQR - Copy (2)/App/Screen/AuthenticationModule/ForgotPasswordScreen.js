//ForgotPasswordScreen

import React, { Component } from "react";
import {
    Text,
    View,
    StatusBar,
    Dimensions,
    StyleSheet,
    BackHandler,
    TextInput, 
    TouchableOpacity,
    Alert,
} from "react-native";
import { sha512 } from 'js-sha512';

import { Header, button, Colors, String, AppFonts,TextUtils,ScaleUtils } from '../../Resources/index';
import Utils from '../../Component/Utils';
import ModalProgress from '../../Component/ModalProgress';
import ButtonComponent from '../../Component/ButtonComponent';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';
import { Constants } from '../../RestAPI/Constants';
import { post } from '../../RestAPI/RestAPIHandler';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class ForgotPasswordScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            emailValid: '',
            isLoading:false,
        };
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

     async isCheck() {
        var isValid = true;

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
             this.doForgotPassword();
         } else { }
    }

    async doForgotPassword() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                email: this.state.email,
            })
            var data = await post(Constants.FORGOT_PASSWORD, body);
            console.log("Data==>" + JSON.stringify(data));
            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
                this.props.navigation.navigate("LoginScreen");
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
         }else {
            Utils.DialogBox("Alert","Please check your internet connection.")
            }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Header imgSrc={require('../../Assets/ImageAndIcons/back_with_arrow.png')} isBack={true} navigation={this.props.navigation} screen={"LoginScreen"} title={require("../../Assets/ImageAndIcons/logo.png")} />
                    <ModalProgress
                        isVisible={this.state.isLoading}></ModalProgress>
                    <View style={{ justifyContent: "center", padding: ScaleUtils.SCREEN_PADDING }}>
                        <Text style={styles.text}>{String.authentication.FORGOT_PASSWORD_HEADER_TEXT}</Text>

                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Email"
                            keyboardType={"email-address"}
                            placeholderTextColor="#a9a9a9"
                            value={this.state.email}
                            onChangeText={(text) => { this.setState({ email: text, emailError: null, emailValid: null }) }} />

                        {!!this.state.emailValid && (
                            <Text style={{ color: Colors.ERROR_COLOR}}>{String.validate.validEmail}</Text>
                        )}

                        {!!this.state.emailError && (
                            <Text style={{ color: Colors.ERROR_COLOR }}>{String.validate.emailError}</Text>
                        )}

                        <View style={{ marginTop: ScaleUtils.AUTHENTICATION_BUTTON_MARGIN_TOP, }}>
                            {/*<TouchableOpacity style={button.ButtonLoginContainer} onPress={() => { this.isCheck() }}>
                                <Text style={button.mainScreenButtonLoginText}>SUBMIT</Text>
                        </TouchableOpacity>*/}
                            <TouchableOpacity onPress={() => { this.isCheck() }}>
                                <ButtonComponent text={"SUBMIT"}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR,
    },
    text: {
        fontSize: TextUtils.AUTHENTICATION_TITLE,
        color: Colors.TITLE_FONT_COLOR,
        marginTop:ScaleUtils.AUTHENTICATION_TITLE_MARGIN_TOP,
        alignSelf: "center",
        fontFamily:AppFonts.text.font2
    },
    inputStyle: {
        marginTop: ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP,
        borderBottomColor: "#a9a9a9",
        borderWidth: 1,
        color: Colors.TITLE_FONT_COLOR,
    },
    forgot: {
        color: "gray",
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
    },
    gethelp: {
        marginLeft: getLayoutSize(5),
        color: Colors.COLOR_PRIMARY,
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
    },
    gmail: {
        height:ScaleUtils.IMAGE_SIZE_TWENTY,
        width: ScaleUtils.IMAGE_SIZE_TWENTY,
        tintColor: "#868686",
        alignSelf: "center"
    }

});

