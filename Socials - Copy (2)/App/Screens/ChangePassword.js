//ChangePassword

import React, { Component } from 'react';

import {
    Text,
    View,
    BackHandler,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';

import { Colors } from '../Styles/Colors';

import { String } from '../Styles/String';

import Utils from '../Components/Utils';

export default class ChangePassword extends Component{

    constructor(props){
        super(props);
        this.state={
            currentpassword:'',
            currentpasswordError:'',
            validCurrentPass:'',
            newpassword:'',
            newpasswordError:'',
            validNewPass:'',
            confirmpassword:'',
            confirmpasswordError:'',
        };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("Recent");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    isCheck(){
        isValid=true;

        if (Utils.isStringNull(this.state.currentpassword)) {
            isValid = false;
            this.setState({ currentpasswordError: String.validate.passwordError });
        } else if (!Utils.isPassValid(this.state.currentpassword)) {
            isValid = false;
            this.setState({ validCurrentPass: String.validate.validPassword });
        } else {
            this.setState({ currentpasswordError: null });
        }

        if (Utils.isStringNull(this.state.newpassword)) {
            isValid = false;
            this.setState({ newpasswordError: String.validate.passwordError });
        } else if (!Utils.isPassValid(this.state.newpassword)) {
            isValid = false;
            this.setState({ validNewPass: String.validate.validPassword });
        } else {
            this.setState({ newpasswordError: null });
        }

        if (Utils.isStringNull(this.state.confirmpassword)) {
            isValid = false;
            this.setState({ confirmpasswordError: String.validate.confirmPassError });
        } else {
            this.setState({ confirmpasswordError: null });
        }

        if (this.state.newpassword == this.state.confirmpassword) {

        } else {
            isValid = false;
            Alert.alert("Password mismatch!!!");
        }


        if(isValid==true){
            this.props.navigation.navigate("Recent");
        }
    }

    render(){
        return(
            <View style={styles.container}>

                <TextInput
                    style={styles.inputStyle}
                    value={this.state.currentpassword}
                    placeholder='Current Password'
                    secureTextEntry={true}
                    maxLength={8}
                    onChangeText={(text) => this.setState({ currentpassword: text,currentpasswordError:null,validCurrentPass:null })}
                />

                {!!this.state.validCurrentPass && (
                    <Text style={Colors.first}>{String.validate.validPassword}</Text>
                )}

                {!!this.state.currentpasswordError && (
                    <Text style={Colors.first}>{String.validate.passwordError}</Text>
                )}

                <TextInput
                    style={styles.inputStyle}
                    value={this.state.newpassword}
                    placeholder='New Password'
                    secureTextEntry={true}
                    maxLength={8}
                    onChangeText={(text) => this.setState({ newpassword: text ,newpasswordError:null,validNewPass:null})}
                />

                {!!this.state.validNewPass && (
                    <Text style={Colors.first}>{String.validate.validPassword}</Text>
                )}

                {!!this.state.newpasswordError && (
                    <Text style={Colors.first}>{String.validate.passwordError}</Text>
                )}

                <TextInput
                    style={styles.inputStyle}
                    value={this.state.confirmpassword}
                    placeholder='Confirm Password'
                    secureTextEntry={true}
                    maxLength={8}
                    onChangeText={(text) => this.setState({ confirmpassword: text ,confirmPasswordError:null})}
                />

                {!!this.state.confirmpasswordError && (
                    <Text style={Colors.first}>{String.validate.passwordError}</Text>
                )}

                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", backgroundColor: "dodgerblue", marginTop: 50, height: 40 }} onPress={()=>{this.isCheck();}}>

                    <Text style={{ fontSize: 20, alignSelf: "center", color: "white" }}>RESET</Text>

                </TouchableOpacity>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: "center",
    },
    inputStyle: {
        fontSize: 20,
        width: "100%",
        marginTop: 20,
        borderColor: "#000000",
        borderBottomWidth: 1,
    },
});

