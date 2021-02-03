//ForgotPass

//Awesome Homescreen
// LoginScreen
// MainScreen
import React, { Component } from 'react';

import { Text,
StyleSheet,
TextInput,
View,
TouchableOpacity,
Alert,
BackHandler,
AsyncStorage,
} from 'react-native';

import {Colors} from '../Styles/Colors';

import {String} from '../Styles/String';
import Utils from '../Component/Utils';
//import {Colors ,String} from '../Styles';

export default class ForgotPass extends Component {

  disableBackButton=()=>{
    this.props.navigation.navigate(" LoginScreen ");
    return true;
  }

  UNSAFE_componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress',this.disableBackButton);
  }

  UNSAFE_componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress',this.disableBackButton);
  }

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      emailError:'',
      validEmail:'',
    };
  }

  isCheck(){
    var isValid = true;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(Utils.isStringNull(this.state.email)){
      isValid= false;
      this.setState({emailError:String.onboarding.welcome.emailError});
    }
    else if (!Utils.isEmailValid(this.state.email)) {
      isValid=false;
      this.setState({validEmail:String.onboarding.welcome.validEmail});
    }
     else{
      this.setState({emailError:null});
    }


    if(isValid === true){
      Alert.alert('Email sent');

    }

  }


  render() {
    return (
	 <View style={styles.container}>


      <Text style={{marginTop:20}}>Email</Text>

      <TextInput
    		style={styles.inputStyle}
    		placeholder= " Enter your Email address"
    		value={this.state.email}
        keyboardType={'email-address'}
    		onChangeText={(val) => this.setState({email: val, emailError:null,validEmail:null})}
  		/>

      {!! this.state.validEmail && (
        <Text style={Colors.first}>{String.onboarding.welcome.validEmail}</Text>
      )}


      {!! this.state.emailError && (
        <Text style={Colors.first}>{String.onboarding.welcome.emailError}</Text>
      )}

      <TouchableOpacity
         style={{color:"#ffffff",fontSize:18,justifyalign:"center",alignSelf:"center",marginTop:30,alignitem:"center",backgroundColor:"#cccccc",paddingLeft:40,borderRadius:10,paddingRight:40,justifyContent:"center",paddingBottom:5}}
         onPress={()=>{ this.isCheck();}}>
        <Text style={{fontSize:20}}>Send</Text>
      </TouchableOpacity>


   </View>
    );
  }
}

const styles = StyleSheet.create({
container:{
	flex:1,
	display:"flex",
	flexDirection:"column",
  padding:20,
	borderBottomColor:'#000000',
	backgroundColor:"white",
},
inputStyle: {
width:'100%',
fontSize:15,
borderColor:"#ccc",
height:40,
borderWidth:1,
fontFamily: "Cochin",
marginRight:50,
},

});
