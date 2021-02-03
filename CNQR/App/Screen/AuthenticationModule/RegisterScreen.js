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
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';

import { Header, button, Colors, String,AppFonts } from '../../Resources/index';
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
            confirmpassword:'',
            confirmpasswordError:'',
            passwordmissmatch:'',
            dateofbirth:'',
            dateofbirthError:'',
            check:false,
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

    componentDidMount = async () => {
        await AsyncStorage.setItem('kkk', fullname);
        await AsyncStorage.setItem('ksk@1999', password);
        await AsyncStorage.setItem('ksk@gmail.com', email);
        await AsyncStorage.setItem('ksk@1999', confirmpassword);
        await AsyncStorage.setItem('02/10/1999', dateofbirth);
    }


    isCheck() {
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
        } else if (!Utils.isPassSmall(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.smallError });
        } else if (!Utils.isPassCapital(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.capitalError });
        } else if (!Utils.isPassNumber(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.numberError });
        } else if (!Utils.isPassSpecial(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.specialError });
        } else if (!Utils.ispassLength(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.lengthError });
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

        if (Utils.isStringNull(this.state.confirmpassword)) {
            isValid = false;
            this.setState({ confirmpasswordError: String.validate.confirmPassError });
        } else {
            this.setState({ confirmpasswordError: null });
        }


        if (this.state.password == this.state.confirmpassword){
           
        }else{
            isValid = false;
            this.setState({ passwordmissmatch: String.validate.missmatchError });
        }

        if (Utils.isStringNull(this.state.dateofbirth)) {
            isValid = false;
            this.setState({ dateofbirthError: String.validate.dateofbirthError });
        } else if (Utils.isDateValid(this.state.dateofbirth)){
            isValid = false;
            this.setState({ dateofbirthValid: String.validate.datevalid });
        } else {
            this.setState({ dateofbirthError: null });
        }

        if (isValid === true) {
            this.props.navigation.navigate("SubscriptionScreen");
        }
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <Header title={require("../../Assets/ImageAndIcons/logo.png")} imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} isBack={true} navigation={this.props.navigation} screen={"MainScreen"}></Header>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.textStyle}>START THE CHANGE</Text>
                        <View style={styles.textView}>
                            <Text style={styles.loginText}>{"\t\t"}Take the first step to unlocking your {"\n"}potential. If you've already got a  CNQR{"\n"}
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("LoginScreen")}>
                                    <Text style={styles.loginHelp}><Text style={styles.loginText}>{"\t\t\t\t"}account,</Text>{"\t"}please log in here</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity style={button.ButtonContainer}
                                onPress={() => { this.props.navigation.navigate("ChoosePlanScreen")}}>
                                <Image source={require("../../Assets/ImageAndIcons/gmail_1x.png")} style={styles.image} />
                                <Text style={button.ButtonContainerText}>LOGIN WITH GMAIL</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.signUpText}>OR SIGN UP WITH EMAIL</Text>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Full name"
                            placeholderTextColor="#a9a9a9"
                            value={this.state.firstname}
                            onChangeText={(text) => { this.setState({ fullname: text,fullnameError:null,fullnameValid:null }) }} />

                        {!!this.state.fullnameValid && (
                            <Text style={Colors.first}>{String.validate.fullnameValid}</Text>
                        )}

                        {!!this.state.fullnameError && (
                            <Text style={Colors.first}>{String.validate.fullnameError}</Text>
                        )}

                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Email"
                            keyboardType={'email-address'}
                            placeholderTextColor="#a9a9a9"
                            value={this.state.email}
                            onChangeText={(text) => { this.setState({ email: text,emailError:null,emailValid:null }) }} />

                        {!!this.state.emailValid && (
                            <Text style={Colors.first}>{String.validate.validEmail}</Text>
                        )}

                        {!!this.state.emailError && (
                            <Text style={Colors.first}>{String.validate.emailError}</Text>
                        )}

                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Password"
                            secureTextEntry={true}
                            maxLength={8}
                            placeholderTextColor="#a9a9a9"
                            value={this.state.password}
                            onChangeText={(text) => { this.setState({ password: text, passwordError: null }) }} />

                        {!!this.state.passwordError && (
                            <Text style={Colors.first}>{this.state.passwordError}</Text>
                        )}

                        <TextInput
                            style={styles.inputStyle}
                            placeholder=" Confirm Password"
                            secureTextEntry={true}
                            placeholderTextColor="#a9a9a9"
                            value={this.state.confirmpassword}
                            onChangeText={(text) => { this.setState({ confirmpassword: text, passwordmissmatch:null,confirmpasswordError:null}) }} />

                        {!!this.state.passwordmissmatch && (
                            <Text style={Colors.first}>{String.validate.missmatchError}</Text>
                        )}

                        {!!this.state.confirmpasswordError && (
                            <Text style={Colors.first}>{String.validate.confirmPassError}</Text>
                        )}

                        <DatePicker
                            style={{ width: "100%", marginTop: 30,}}
                            date={this.state.dateofbirth}
                            mode="date" 
                            placeholder="Date of birth"
                            placeholderTextColor="#a9a9a9"
                            format="DD-MM-YYYY"
                            minDate="01-01-1950"
                            maxDate="19-09-2020"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateIcon: {
                                    left: 0,
                                    top: 4,
                                },
                                dateInput: {
                                    borderWidth:0,
                                    marginLeft:getLayoutSize(-260),
                                },
                                dateText:{
                                    color:"#ffffff"
                                },
                            }}
                            onDateChange={(date) => { this.setState({ dateofbirth: date,dateofbirthError:null}) }}
                        />

                        {!!this.state.dateofbirthError && (
                            <Text style={Colors.first}>{String.validate.dateofbirthError}</Text>
                        )}

                        <View style={{borderWidth:1,borderColor:"#a9a9a9",marginTop:getLayoutSize(5),width:"100%"}}></View>

                        <View style={styles.checkboxView}>
                            <CheckBox 
                                tintColors={"#b3b3b3"}
                                disabled={false}
                                value={this.state.check}
                                onChange={(value)=>{this.setState({check:!this.state.check})}}/>
                            <Text style={styles.chechkboxText}>I want to receive emails from CNQR</Text>
                        </View>
                        <View style={styles.registerButtonView}>
                            <TouchableOpacity style={button.ButtonLoginContainer} onPress={() => { this.props.navigation.navigate("SubscriptionScreen")}}>
                                <Text style={button.mainScreenButtonLoginText}>JOIN US</Text>
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
        backgroundColor: "black",
        flex: 1,
    },
    container: {
        flex: 1,
        padding: getLayoutSize(20),
    },
    textStyle: {
        fontFamily: AppFonts.text.font2,
        color: "white",
        fontSize: getFontSize(20),
        alignSelf: "center",
        marginTop: getLayoutSize(50),
    },
    textView:{
        marginTop: getLayoutSize(27),
    },
    loginText:{
        fontSize: getFontSize(15),
        color:"#868686",
        fontFamily: AppFonts.text.font3,
        alignSelf:"center",
    },
    loginHelp: {
        color: "#00f3b9",
        fontSize: getFontSize(15),
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
    },
    image: {
        tintColor: "#f8f8f8",
        height: getLayoutSize(20),
        width: getLayoutSize(20),
        marginRight: getLayoutSize(5),
        alignSelf: "center",
    },
    buttonView:{
        marginTop: getLayoutSize(25),
    },
    signUpText:{
        marginTop: getLayoutSize(45),
        color:"#868686",
        alignSelf:"center",
        fontFamily: AppFonts.text.font4,
    },
    inputStyle: {
        marginTop: getLayoutSize(30),
        borderBottomColor: "#a9a9a9",
        borderWidth: 1,
        color:"white",
        fontFamily:AppFonts.text.font3,
    },
    checkboxView:{
        marginTop: getLayoutSize(45),
        flexDirection:"row",
    },
    chechkboxText: {
        fontSize: getFontSize(14),
        color: "#b3b3b3",
        alignSelf:"center",
        marginLeft: getLayoutSize(10),
        fontFamily: AppFonts.text.font3,
    },
    registerButtonView:{
        marginTop: getLayoutSize(40),
    },
});