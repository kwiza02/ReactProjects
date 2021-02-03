//ForgotPassword

import React, { Component } from 'react';

import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    BackHandler,
} from 'react-native';

import { Colors } from '../Styles/Colors';

import { String } from '../Styles/String';

import Utils from '../Components/Utils';

export default class ForgotPassword extends Component{

    constructor(props){
        super(props);
        this.state={
            email:'',
            emailError:'',
            validEmail:'',
        };
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

    isCheck(){
        isValid=true;

        if (Utils.isStringNull(this.state.email)) {
            isValid = false;
            this.setState({ emailError: String.validate.emailError });
        } else if (!Utils.isEmailValid(this.state.email)) {
            isValid = false;
            this.setState({ validEmail: String.validate.validEmail });
        } else {
            this.setState({ emailError: null });
        }

        if(isValid==true){
            this.props.navigation.navigate("Login");
        }
    }

    render(){
        return(
           <View style={styles.container}>

                <Text style={{alignSelf:"center",fontSize:40,marginTop:200,marginBottom:50,fontWeight:"bold"}}>SOCIAL</Text>

                <TextInput
                    style={styles.inputStyle}
                    value={this.state.email}
                    placeholder='Email Address'
                    onChangeText={(text) => this.setState({email: text ,emailError:null,validEmail:null})} />

                {!!this.state.validEmail && (
                    <Text style={Colors.first}>{String.validate.validEmail}</Text>
                )}

                {!!this.state.emailError && (
                    <Text style={Colors.first}>{String.validate.emailError}</Text>
                )}
                
                <TouchableOpacity style={{ backgroundColor:"dodgerblue",marginTop:40,height:40,justifyContent:"center"}} onPress={()=>{this.isCheck();}}>

                    <Text style={{color:"white",alignSelf:"center",fontSize:20}}>SUBMIT</Text>

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
        marginTop: 50,
        borderColor: "#000000",
        borderBottomWidth: 1,
    },
});

