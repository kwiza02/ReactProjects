//MainScreen

import React ,{Component} from 'react';

import{
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal,
    ScrollView,
    Image,
    PermissionsAndroid,
    Alert,
}from 'react-native';

import {launchCamera,launchImageLibrary } from 'react-native-image-picker';
//import CountryPicker, { getAllCountries ,DARK_THEME} from 'react-native-country-picker-modal';
import { Picker } from '@react-native-picker/picker';
import RadioButtonRN from 'radio-buttons-react-native';
import DatePicker from 'react-native-datepicker';
import PhoneInput from "react-native-phone-number-input";
import SelectMultiple from 'react-native-select-multiple';
import { sha512 } from 'js-sha512';

import {getFontSize,getLayoutSize} from '../Component/Responsive';
import{Colors,AppFonts} from '../Resources/index';
import Input from "../Component/Input";
import {post,get} from '../RestAPI/RestAPIHandler';
import Utils from '../Component/Utils';
import {Constants} from '../RestAPI/Constants';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs camera permission',
                },
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    } else return true;
};

const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'External Storage Write Permission',
                    message: 'App needs write permission',
                },
            );
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            alert('Write permission err', err);
        }
        return false;
    } else return true;
};

export default class MainScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            fname:"",
            mname:"",
            lname:"",
            profile:"",
            email:"",
            password:"",
            hidePassword:true,
            country:"",
            state:"Select",
            city:"Select",
            genderData:[
                {
                    label: 'Male'
                },
                {
                    label: 'Female'
                }
            ],
            gender:"",
            pincode:"",
            address:"",
            birthDate:"26/12/2020",
            phoneNumber:"",
            hobbies:["Cricket","Music","Hockey","Cooking","Reading"],
            selectedHobbies:[],
        };
    }

    componentDidMount(){}

    setPasswordVisibility = () => {
        this.setState({hidePassword:!this.state.hidePassword})
    }

    captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(
                {
                    mediaType: 'photo',
                    includeBase64: true,
                    maxHeight: 200,
                    maxWidth: 200,
                },
                (response) => {
                    // console.log("RESPONSE-->"+JSON.stringify(response));
                    let temp = "data:" + response.type + ";base64," + response.base64
                    // console.log("TEMP-->"+temp);
                    this.setState({ profile:temp });
                },
            )
        }
    };

    async addInformation() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                fName:this.state.fname,
                mName: this.state.mname,
                lName: this.state.lname,
                email:this.state.email,
                password:this.state.password,
                country:this.state.country,
                state:this.state.state,
                city:this.state.city,
                gender:this.state.gender,
                pincode:this.state.pincode,
                address:this.state.address,
                profile:this.state.profile,
                birthDate:this.state.birthDate,
                phoneNumber:this.state.phoneNumber,
                hobbies:this.state.selectedHobbies,
            })
            var data = await post(Constants.POST_API, body);
            console.log(("Data-->" + JSON.stringify(data)));
            if (data !== null && data.success === "yes") {
                this.setState({ isLoading: false })
                this.props.navigation.navigate("DisplayScreen");
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert", "Please check your internet connection.")
        }
    }

    render(){
        return(
           <ScrollView>
                <View style={styles.mainContainer}>
                    <View>
                        <Image source={this.state.profile ? {uri:this.state.profile} : require("../Assets/user.png")}
                            style={styles.uploadProfile} />
                        <TouchableOpacity onPress={() => this.captureImage()}>
                            <Image source={require("../Assets/edit.png")} style={styles.editImage} />
                        </TouchableOpacity>
                    </View>
                    <Input
                        placeholder="First name"
                        placeholderTextColor={Colors.SUB_TITLE_COLOR}
                        style={styles.InputStyle}
                        value={this.state.fname}
                        onChangeText={(text) => { this.setState({ fname: text }) }} />
                    <Input
                        placeholder="Middle name"
                        placeholderTextColor={Colors.SUB_TITLE_COLOR}
                        style={styles.InputStyle}
                        value={this.state.mname}
                        onChangeText={(text) => { this.setState({ mname: text }) }} />
                    <Input
                        placeholder="Last name"
                        placeholderTextColor={Colors.SUB_TITLE_COLOR}
                        style={styles.InputStyle}
                        value={this.state.lname}
                        onChangeText={(text) => { this.setState({ lname: text }) }} />
                    <Input
                        placeholder="Email"
                        placeholderTextColor={Colors.SUB_TITLE_COLOR}
                        style={styles.InputStyle}
                        value={this.state.email}
                        keyboardType={"email-address"}
                        onChangeText={(text) => { this.setState({ email: text }) }} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Input
                            placeholder="Password"
                            placeholderTextColor={Colors.SUB_TITLE_COLOR}
                            style={styles.InputStyle}
                            value={this.state.password}
                            secureTextEntry={this.state.hidePassword}
                            onChangeText={(text) => { this.setState({ password: text }) }} />
                        <TouchableOpacity onPress={() => { this.setPasswordVisibility() }}
                            style={{ position: "absolute", marginLeft: getLayoutSize(320) }}>
                            <Image source={!this.state.hidePassword ? require("../Assets/view.png") : require("../Assets/private.png")} style={styles.eyeImageStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: getLayoutSize(40) }}>
                            <Picker
                                selectedValue={this.state.country}
                                style={styles.pickerStyle}
                                onValueChange={(itemValue) => this.setState({ country: itemValue })}
                                mode={"dropdown"}
                                dropdownIconColor={Colors.TITLE_COLOR}>
                                <Picker.Item label="Select  Country" value="Select  Country" />
                                <Picker.Item label="India" value="India" />
                                <Picker.Item label="US" value="US" />
                                <Picker.Item label="UK" value="UK" />
                            </Picker>
                            <Picker
                            selectedValue={this.state.state}
                            style={styles.pickerStyle}
                            onValueChange={(itemValue) => this.setState({ state: itemValue })}
                            mode={"dropdown"}
                            dropdownIconColor={Colors.TITLE_COLOR}>
                            <Picker.Item label="Select  State" value="Select  State" />
                            <Picker.Item label="Gujarat" value="Gujarat" />
                            <Picker.Item label="Delhi" value="Delhi" />
                        </Picker>
                        <Picker
                            selectedValue={this.state.city}
                            style={styles.pickerStyle}
                            onValueChange={(itemValue) => this.setState({ city: itemValue })}
                            mode={"dropdown"}
                            dropdownIconColor={Colors.TITLE_COLOR}>
                            <Picker.Item label="Select  City" value="Select  City" />
                            <Picker.Item label="Rajkot" value="Rajkot" />
                            <Picker.Item label="Surat" value="Surat" />
                        </Picker>
                        <RadioButtonRN
                            data={this.state.genderData}
                            selectedBtn={(e) => this.setState({ gender: e.label })}
                            boxActiveBgColor={Colors.BACKGROUND_COLOR}
                            boxDeactiveBgColor={Colors.BACKGROUND_COLOR}
                            textColor={Colors.TITLE_COLOR}
                            activeColor={Colors.COLOR_PRIMARY}
                        />
                        <Text style={{ color: Colors.SUB_TITLE_COLOR, fontSize: getFontSize(20), marginTop: getLayoutSize(30) }}>{this.state.gender}</Text>
                        <Input
                            placeholder="Pincode"
                            placeholderTextColor={Colors.SUB_TITLE_COLOR}
                            style={styles.InputStyle}
                            value={this.state.pincode}
                            keyboardType={'numeric'}
                            onChangeText={(text) => { this.setState({ pincode: text }) }} />
                        <Input
                            placeholder="Address"
                            placeholderTextColor={Colors.SUB_TITLE_COLOR}
                            style={styles.InputStyle}
                            value={this.state.address}
                            multiline={true}
                            onChangeText={(text) => { this.setState({ address: text }) }} />
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={this.state.birthDate} // Initial date from state
                            mode="date" // The enum of date, datetime and time
                            placeholder="Select Birthdate"
                            format="DD-MM-YYYY"
                            minDate="01-01-1999"
                            maxDate="01-01-2035"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    //display: 'none',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    borderWidth:0,
                                    borderBottomWidth:1,
                                },
                                dateText:{
                                    color:Colors.TITLE_COLOR,
                                },
                            }}
                            onDateChange={(date) => {this.setState({birthDate:date})}}
                        />
                        <PhoneInput
                            defaultValue={this.state.phoneNumber}
                            defaultCode="DM"
                            layout="first"
                            onChangeText={(text) => {
                                this.setState({phoneNumber:text});
                            }}
                            withDarkTheme
                            containerStyle={{marginTop:getLayoutSize(20),height:getLayoutSize(80),backgroundColor:Colors.SEPRATOR_COLOR}}
                            textContainerStyle={{backgroundColor:Colors.SEPRATOR_COLOR}}
                            textInputProps={styles.phoneInput}
                        />
                        <Text style={{color:Colors.SUB_TITLE_COLOR,fontSize:getFontSize(20),marginTop:getLayoutSize(30)}}>Select  Hobbies:</Text>
                        <SelectMultiple
                            items={this.state.hobbies}
                            selectedItems={this.state.selectedHobbies}
                            onSelectionsChange={(value)=>{this.setState({selectedHobbies:value})}}
                            style={{marginTop:getLayoutSize(20)}}
                            labelStyle={{color:Colors.TITLE_COLOR,fontSize:getFontSize(15)}}
                            rowStyle={{backgroundColor:Colors.BACKGROUND_COLOR,borderBottomWidth:0}}
                            checkboxStyle={{tintColor:Colors.TITLE_COLOR,marginRight:getLayoutSize(20)}} />
                    </View>
                    {/* <TouchableOpacity onPress={() => { this.setState({ isOpenPicker: !this.state.isOpenPicker }) }}
                                style={styles.modalClose}></TouchableOpacity> */}
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => {this.addInformation();this.props.navigation.navigate("DisplayScreen")}}>
                        <Text style={styles.buttonText}>ADD INFORMATION</Text>
                    </TouchableOpacity>
                </View> 
           </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:"center",
        backgroundColor:Colors.BACKGROUND_COLOR,
        padding:getLayoutSize(20)
    },
    buttonText: {
        fontSize: getFontSize(18),
        color: Colors.COLOR_PRIMARY,
        alignSelf: "center"
    },
    buttonContainer: {
        height: getLayoutSize(50),
        width: "90%",
        borderRadius: getLayoutSize(30),
        borderColor: Colors.COLOR_PRIMARY,
        justifyContent: "center",
        borderWidth: 1,
        alignSelf: "center",
        marginTop: getLayoutSize(50),
    },
    uploadProfile:{
        width: getLayoutSize(100),
        height: getLayoutSize(100),
        borderWidth: 1,
        borderColor: Colors.SUB_TITLE_COLOR,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: getLayoutSize(50),
    },
    editImage:{
        height: getLayoutSize(30), 
        width: getLayoutSize(30), 
        alignSelf: "center",
        marginTop:getLayoutSize(-20),
        marginLeft:getLayoutSize(50),
    },
    InputStyle:{
        marginTop:getLayoutSize(20),
        borderBottomColor: Colors.SEPRATOR_COLOR,
        borderWidth: 1,
        width:"100%",
        color: Colors.TITLE_COLOR,
        position:"relative",
    },
    eyeImageStyle:{
        height:getLayoutSize(30),
        width:getLayoutSize(30),
        tintColor:Colors.SUB_TITLE_COLOR,
        marginTop:getLayoutSize(30),
        resizeMode:"contain",
    },
    dropdownImageStyle:{
        height: getLayoutSize(20),
        width: getLayoutSize(20),
        tintColor: Colors.SUB_TITLE_COLOR,
    },
    pickerStyle:{
        height: getLayoutSize(50), 
        width: "100%", 
        color: Colors.TITLE_COLOR,
        marginTop:getLayoutSize(10),
        fontSize:getFontSize(50)
    },
    datePickerStyle: {
        width: "100%",
        marginTop: getLayoutSize(40),
    },
    phoneInput:{
        color:Colors.TITLE_COLOR,
        width:"100%",
        fontSize:getFontSize(15),
    },
});