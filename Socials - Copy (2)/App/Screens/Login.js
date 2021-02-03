//Login

import React, { Component } from 'react';

import {
    Text,
    View,
    ScrollView,
    BackHandler,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

import Utils from '../Components/Utils';

import { Colors } from '../Styles/Colors';

import { String } from '../Styles/String';

import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            usernameError:'',
            password:'',
            passwordError:'',
            validUser:'',
            validPassword:'',
            smallError:'',
            capitalError:'',
            numberError:'',
            lengthError:'',
            specialError:'',
        };
    }

    componentDidMount = async () =>{
        await AsyncStorage.setItem('kkk', username);
        await AsyncStorage.setItem('ksk@1999',password );
    }

    disableBackButton = () => {
        BackHandler.exitApp();
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
    
        if (Utils.isStringNull(this.state.username)) {
            isValid = false;
            this.setState({ usernameError: String.validate.usernameError });
        } else if (!Utils.isNameValid(this.state.username)) {
            isValid = false;
            this.setState({ validUser: String.validate.validUser });
        } else {
            this.setState({ usernameError: null });
        }

        if (Utils.isStringNull(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.passwordError});
        }else if (! Utils.isPassSmall(this.state.password)) {
            isValid = false;
            this.setState({ passwordError:String.validate.smallError});
        } else if (! Utils.isPassCapital(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.capitalError });
        } else if (!Utils.isPassNumber(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.numberError});
        } else if (!Utils.isPassSpecial(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.specialError });
        } else if (!Utils.ispassLength(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.lengthError});
        }else {
            this.setState({ passwordError: null });
        }


        if (isValid === true) {
            this.props.navigation.navigate("Recent");

        }
    }

    isCheck2 = async () => {
        await AsyncStorage.setItem('kk','username');
        await AsyncStorage.setItem('ksk@1999','password');
    }

    componentDidMount = async () =>{
        if(this.state.username==null||this.state.password==null){
            this.props.navigation.navigate("Login");
        }else{
            this.props.navigation.navigate("Recent");
        }
    }

    render() {
        return (
            <ScrollView>

                <View style={styles.container}>

                    <StatusBar
                        barStyle="light-content"
                        hidden={false}
                        backgroundColor="black"
                        translucent={false}
                        networkActivityIndicatorVisible={true} />

                    <Text style={{ marginTop: 90, fontSize: 40, alignSelf: "center", marginBottom: 30, fontWeight: "bold"}}>SOCIAL</Text>

                    <TextInput 
                        style={styles.inputStyle}
                        placeholder="Username"
                        value={this.state.username}
                        onChangeText={(text) => this.setState({username:text,usernameError:null,validUser:null})}
                    />

                    {!!this.state.validUser && (
                        <Text style={Colors.first}>{String.validate.validUser}</Text>
                    )}

                    {!!this.state.usernameError && (
                        <Text style={Colors.first}>{String.validate.usernameError}</Text>
                    )}

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Password"
                        value={this.state.password}
                        maxLength={8}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text,passwordError:null })}
                         />

                    {!!this.state.passwordError && (
                        <Text style={Colors.first}>{this.state.passwordError}</Text>
                    )}

                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", backgroundColor: "dodgerblue", marginTop: 50, height: 50 }} onPress={() => { this.state.username=="kk" ? this.isCheck2() :this.isCheck() }}>

                        <Text style={{fontSize:20,alignSelf:"center",color:"white"}}>SIGN IN</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center",  marginTop: 20, height: 40 }} onPress={()=>{this.props.navigation.navigate("ForgotPassword");}}>

                        <Text style={{ fontSize: 16, alignSelf: "center",color:"black" }}>FORGOT PASSWORD ?</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", marginTop: 120, height: 40 }} onPress={()=>{this.props.navigation.navigate("Signup");}}>

                        <Text style={{ fontSize: 18, alignSelf: "center", color: "red" }}>Sign up</Text>

                    </TouchableOpacity>

                </View>

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        padding:40,
        justifyContent: "center",
    },
    inputStyle: {
        fontSize: 20,
        width:"100%",
        marginTop:50,
        borderColor: "#000000",
        borderBottomWidth:1,
    },
});

