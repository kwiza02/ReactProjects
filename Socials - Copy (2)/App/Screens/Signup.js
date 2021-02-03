//SignUp

import React, { Component } from 'react';

import { Colors } from '../Styles/Colors';

import { String } from '../Styles/String';

import Utils from '../Components/Utils';

import {
    Text,
    View,
    ScrollView,
    BackHandler,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    Modal,
    Alert,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class SignUp extends Component{

    constructor(props){
        super(props);
        this.state={
            fullname:'',
            fullnameError:'',
            validFullname:'',
            username:'',
            usernameError:'',
            validUsername:'',
            email:'',
            emailError:'',
            validEmail:'',
            city:'',
            cityError:'',
            validCity:'',
            country:'',
            countryError:'',
            validCountry:'',
            password:'',
            passwordError:'',
            validPassword:'',
            confirmpassword:'',
            confirmpasswordError:'',
            mismatchError:'',
            tagline:'',
            taglineError:'',
            isOpenPicker: false,
            userSelected: '',
            isSelected:false,
            isCheck:false,
            checkError:'',
        };
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }

    disableBackButton = () => {
        this.props.navigation.navigate("Login");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    selectPhotoTapped(flag) {
        if (flag == 1) {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
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
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                console.log(image);
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

    isCheck() {
        var isValid = true;

        if (Utils.isStringNull(this.state.fullname)) {
            isValid = false;
            this.setState({ fullnameError: String.validate.fullnameError });
        } else if (!Utils.isNameValid(this.state.fullname)) {
            isValid = false;
            this.setState({ validFullname: String.validate.validUser });
        } else {
            this.setState({ fullnameError: null });
        }

        if (Utils.isStringNull(this.state.username)) {
            isValid = false;
            this.setState({ usernameError: String.validate.usernameError });
        } else if (!Utils.isNameValid(this.state.username)) {
            isValid = false;
            this.setState({ validUsername: String.validate.validUser });
        } else {
            this.setState({ usernameError: null });
        }

        if (Utils.isStringNull(this.state.email)) {
            isValid = false;
            this.setState({ emailError: String.validate.emailError });
        } else if (!Utils.isEmailValid(this.state.email)) {
            isValid = false;
            this.setState({ validEmail: String.validate.validEmail });
        } else {
            this.setState({ emailError: null });
        }
        
        if (Utils.isStringNull(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.passwordError });
        } else if (!Utils.isPassValid(this.state.password)) {
            isValid = false;
            this.setState({ validPassword: String.validate.validPassword });
        } else {
            this.setState({ passwordError: null });
        }

        if (Utils.isStringNull(this.state.confirmpassword)) {
            isValid = false;
            this.setState({ confirmpasswordError: String.validate.confirmPassError });
        } else {
            this.setState({ confirmpasswordError: null });
        }

        if (Utils.isStringNull(this.state.city)) {
            isValid = false;
            this.setState({ cityError: String.validate.cityError });
        } else if (!Utils.isNameValid(this.state.city)) {
            isValid = false;
            this.setState({ validCity: String.validate.validUser });
        } else {
            this.setState({ cityError: null });
        }

        if (Utils.isStringNull(this.state.country)) {
            isValid = false;
            this.setState({ countryError: String.validate.countryError });
        } else if (!Utils.isNameValid(this.state.city)) {
            isValid = false;
            this.setState({ validCountry: String.validate.validUser });
        } else {
            this.setState({ countryError: null });
        }

        if (Utils.isStringNull(this.state.tagline)) {
            isValid = false;
            this.setState({ taglineError: String.validate.tagError });
        }else {
            this.setState({taglineError: null });
        }

        if (this.state.password == this.state.confirmpassword) {

        } else {
            isValid = false;
            this.setState({ mismatchError: String.validate.missmatchError });
        }

        if(this.state.isCheck === false){
            isValid = false;
            Alert.alert("Please accept terms and conditions.");
        } else {
            this.setState({ checkError: null });
        }

        if (isValid === true) {
            this.props.navigation.navigate("Login");
        }
    }

    render(){
        return(
            <ScrollView>

                <View style={styles.container}>

                    <View style={{height:250,backgroundColor:"black"}}>

                        <Image source={this.state.avtarSource ? { uri: this.state.avtarSource } : require("../Assets/person.png")}  style={{width:120,height:120,borderRadius:60,alignSelf:"center",marginTop:62}}/>
                        
                        <View style={{marginTop:-110,marginLeft:240}} >

                            <TouchableOpacity onPress={()=>{this.clickEventListener();}}>

                                <Image source={require("../Assets/edit.png")} style={{width:35,height:35,borderRadius:17}}/>
                            
                            </TouchableOpacity>
                        
                        </View>
                   
                    </View>

                    <View style={{padding:20}}>

                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.fullname}
                            placeholder='Full Name'
                            onChangeText={(text) => this.setState({ fullname: text,fullnameError:null,validFullname:null })}
                        />

                        {!!this.state.validFullname && (
                            <Text style={Colors.first}>{String.validate.validUser}</Text>
                        )}

                        {!!this.state.fullnameError && (
                            <Text style={Colors.first}>{String.validate.fullnameError}</Text>
                        )}

                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.username}
                            placeholder='User Name'
                            onChangeText={(text) => this.setState({ username: text,usernameError:null,validUsername:null })}
                        />

                        {!!this.state.validUsername && (
                            <Text style={Colors.first}>{String.validate.validUser}</Text>
                        )}

                        {!!this.state.usernameError && (
                            <Text style={Colors.first}>{String.validate.usernameError}</Text>
                        )}

                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.email}
                            placeholder='Email'
                            keyboardType={'email-address'}
                            onChangeText={(text) => this.setState({ email: text,emailError:null,validEmail:null })}
                        />

                        {!!this.state.validEmail && (
                            <Text style={Colors.first}>{String.validate.validEmail}</Text>
                        )}

                        {!!this.state.emailError && (
                            <Text style={Colors.first}>{String.validate.emailError}</Text>
                        )}

                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.city}
                            placeholder='City'
                            onChangeText={(text) => this.setState({ city: text ,cityError:null,validCity:null})}
                        />

                        {!!this.state.validCity && (
                            <Text style={Colors.first}>{String.validate.validUser}</Text>
                        )}

                        {!!this.state.cityError && (
                            <Text style={Colors.first}>{String.validate.cityError}</Text>
                        )}

                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.country}
                            placeholder='Country'
                            onChangeText={(text) => this.setState({ country: text,countryError:null,validCountry:null })}
                        />

                        {!!this.state.validCountry && (
                            <Text style={Colors.first}>{String.validate.validUser}</Text>
                        )}

                        {!!this.state.countryError && (
                            <Text style={Colors.first}>{String.validate.countryError}</Text>
                        )}

                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.password}
                            placeholder='Password'
                            secureTextEntry={true}
                            maxLength={8}
                            onChangeText={(text) => this.setState({ password: text,passwordError:null,validPassword:null })}
                        />

                        {!!this.state.validPassword && (
                            <Text style={Colors.first}>{String.validate.validPassword}</Text>
                        )}

                        {!!this.state.passwordError && (
                            <Text style={Colors.first}>{String.validate.passwordError}</Text>
                        )}

                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.confirmpassword}
                            placeholder='Confirm Password'
                            secureTextEntry={true}
                            maxLength={8}
                            onChangeText={(text) => this.setState({ confirmpassword: text,confirmpasswordError:null,mismatchError:null })}
                        />

                        {!!this.state.mismatchError && (
                            <Text style={Colors.first}>{String.validate.missmatchError}</Text>
                        )}

                        {!!this.state.confirmpasswordError && (
                            <Text style={Colors.first}>{String.validate.confirmPassError}</Text>
                        )}

                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.tagline}
                            placeholder='Tagline(Max 60 Character)'
                            maxLength={60}
                            onChangeText={(text) => this.setState({ tagline: text,taglineError:null })}
                        />

                        {!!this.state.taglineError && (
                            <Text style={Colors.first}>{String.validate.tagError}</Text>
                        )}

                        <View style={{flexDirection:"row"}}>

                            <TouchableOpacity onPress={()=> this.setState({isCheck: !this.state.isCheck})}> 
                        
                                <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: this.state.isCheck === true ? "orange" : "gray",marginTop:40}}/>
                             
                            </TouchableOpacity>
                        
                            <Text style={{marginTop:40,marginLeft:15}}>I agree to the Terms and Conditions defined by Social application.</Text>
                        
                        </View>

                        <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", backgroundColor: "dodgerblue", marginTop: 40, height: 50 }} onPress={() => { this.isCheck();}}>

                            <Text style={{ fontSize: 20, alignSelf: "center", color: "white" }}>SIGN UP</Text>

                        </TouchableOpacity>

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
                                    
                                    <Image source={require("../Assets/camera.png")} style={{ height: 30, width: 30, alignSelf: "center" }} />
                                    
                                    <Text style={{ padding: 5, alignItems: "center" }}>Capture from Camera</Text>
                                
                                </TouchableOpacity>

                                <TouchableOpacity style={{ padding: 30 }} onPress={() => this.selectPhotoTapped(1)}>
                                    
                                    <Image source={require("../Assets/gallery.png")} style={{ height: 30, width: 30, alignSelf: "center", marginBottom: 2 }} />
                                    
                                    <Text style={{ padding: 5, alignItems: "center" }}>Choose from gallery</Text>
                                
                                </TouchableOpacity>
                            
                            </View>

                        </View>
                    </Modal>

                 </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
    },
    inputStyle: {
        fontSize: 18,
        width: "100%",
        marginTop:25,
        borderColor: "#000000",
        borderBottomWidth: 1,
    },
    popup: {
        backgroundColor: 'white',
        marginTop: 250,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
    },
    popupOverlay: {
        backgroundColor: "#00000057",
        flex: 1,
    },
});

