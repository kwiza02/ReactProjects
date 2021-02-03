//ChangePasswordScreen

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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { sha512 } from 'js-sha512';

import { Constants } from '../../RestAPI/Constants';
import { post } from '../../RestAPI/RestAPIHandler';
import ButtonComponent from '../../Component/ButtonComponent';
import ModalProgress from '../../Component/ModalProgress';
import Utils from '../../Component/Utils';
import { Header, button, Colors, String, AppFonts,TextUtils,ScaleUtils} from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class ChangePasswordScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentpassword: '',
            currentpasswordError: '',
            newpassword: '',
            newpasswordError: '',
            isLoading:false,
            user_id:"",
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

    isCheck() {
         var isValid = true;

        if (Utils.isStringNull(this.state.currentpassword)) {
            isValid = false;
            this.setState({ currentpasswordError: String.validate.passwordError });
        }else {
            this.setState({ currentpasswordError: null });
        }

        if (Utils.isStringNull(this.state.newpassword)) {
            isValid = false;
            this.setState({ newpasswordError: String.validate.passwordNewError });
        }else {
            this.setState({ newpasswordError: null });
        }

        if (isValid) {
            this.doChangePassword();
        } else {}
    }

    async doChangePassword() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            const user_id = await AsyncStorage.getItem("@user_id");
            var body = JSON.stringify({
                user_id: user_id,
                current_password: sha512(this.state.currentpassword),
                new_password: sha512(this.state.newpassword),
            })
            var data = await post(Constants.Change_Password, body);
            console.log(("Data-->" + JSON.stringify(body)));
            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
                this.props.navigation.navigate("RegisterScreen");
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert","Please check your internet connection.")
        }
    }

    setPassword(password){
        this.setState({ newpassword: password, newpasswordError: null, validNewPass: null });
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <Header title={require("../../Assets/ImageAndIcons/logo.png")} imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} isBack={true} navigation={this.props.navigation} screen={"LoginScreen"}></Header>
                <ModalProgress
                    isVisible={this.state.isLoading}></ModalProgress>
                <View style={styles.container}>
                    <Text style={styles.text}>{String.authentication.CHANGED_PASWORD_HEADER_TEXT}</Text>

                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.currentpassword}
                        placeholder='Current Password'
                        placeholderTextColor={"#a9a9a9"}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ currentpassword: text, currentpasswordError: null,})}
                    />

                    {!!this.state.currentpasswordError && (
                        <Text style={{ color: Colors.ERROR_COLOR}}>{String.validate.passwordError}</Text>
                    )}

                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.newpassword}
                        placeholder='New Password'
                        placeholderTextColor={"#a9a9a9"}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setPassword(text)}
                    />

                    {!!this.state.newpasswordError && (
                        <Text style={{ color: Colors.ERROR_COLOR }}>{String.validate.passwordNewError}</Text>
                    )}

                    <View style={styles.buttonView}>
                        {/*<TouchableOpacity style={button.ButtonLoginContainer} onPress={() => { this.isCheck(); }}>
                            <Text style={button.mainScreenButtonLoginText}>RESET</Text>
                    </TouchableOpacity>*/}
                        <TouchableOpacity onPress={() => { this.isCheck() }}>
                            <ButtonComponent text={"RESET"} />
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
    container: {
        padding: ScaleUtils.SCREEN_PADDING,
        justifyContent: "center",
    },
    text: {
        fontSize: TextUtils.AUTHENTICATION_TITLE,
        color: Colors.TITLE_FONT_COLOR,
        marginTop: ScaleUtils.AUTHENTICATION_TITLE_MARGIN_TOP,
        alignSelf: "center",
        fontFamily: AppFonts.text.font2,
    },
    inputStyle: {
        marginTop:ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP,
        borderBottomColor:Colors.DEFAULT_SUB_CONTENT_COLOR,
        borderWidth: 1,
        color: Colors.TITLE_FONT_COLOR,
        fontFamily: AppFonts.text.font3,
    },
    buttonView: {
        marginTop: ScaleUtils.AUTHENTICATION_BUTTON_MARGIN_TOP,
    },
});
