//Awesome Loginscreen
// MainScreen
import React, { Component } from 'react';

import { Text,
StyleSheet,
TextInput,
View,
TouchableOpacity,
StatusBar,
BackHandler,
} from 'react-native';

//import {Colors ,String} from '../Styles';
import {Colors} from '../Styles/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import {String} from '../Styles/String';

import Utils from '../Component/Utils';


export default class LoginScreen extends Component {

  disableBackButton=()=>{
    BackHandler.exitApp();
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
      name:"Username",
      pass:"Password",
      uname:'',
      unameError:'',
      upass:'',
      upassError:'',
      validUser:'',
      validUPass:'',
    };
  }

  async componentDidMount(){

  }

  async isCheck(){
    var isValid = true;
    const regx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const regn = /^[a-zA-Z\s]+$/;

    if(Utils.isStringNull(this.state.uname)){
      isValid= false;
      this.setState({unameError:String.onboarding.welcome.unameError});
    }else if (!Utils.isNameValid(this.state.uname)) {
      isValid=false;
      this.setState({validUser:String.onboarding.welcome.validUser});
    }else{
      this.setState({unameError:null});
    }

    if(Utils.isStringNull(this.state.upass)){
      isValid= false;
      this.setState({upassError:String.onboarding.welcome.upassError});
    }else if (!Utils.isPassValid(this.state.upass)) {
      isValid=false;
      this.setState({validUPass:String.onboarding.welcome.validUPass});
    }else{
      this.setState({upassError:null});
    }


    if(isValid === true){
       await AsyncStorage.setItem('@user_name', this.state.uname);
       this.props.navigation.navigate("HomeScreen");

    }
  }


  render() {
    return (



	 <View style={styles.container}>

   <StatusBar

      barStyle="dark-content"
      hidden={false}
      backgroundColor="lightgray"
      translucent={false}
      networkActivityIndicatorVisible={true}/>

       <Text style={{fontSize:40,color:"black",alignSelf:"center",marginBottom:50}}>Login</Text>


      <Text style={{color:"black",fontSize:16}}>{this.state.name}</Text>

      <TextInput
    		style={styles.inputStyle}
    		placeholder= " Enter your name"
    		value={this.state.uname}
    		onChangeText={(text) => this.setState({uname: text, unameError:null,validUser:null})}
	  	/>

      {!! this.state.validUser && (
        <Text style={Colors.first}>{String.onboarding.welcome.validUser}</Text>
      )}

      {!! this.state.unameError && (
        <Text style={Colors.first}>{String.onboarding.welcome.unameError}</Text>
      )}


      <Text style={{color:"black",fontSize:16,marginTop:20}}>{this.state.pass}</Text>

      <TextInput
    		style={styles.inputStyle}
    		placeholder= " Enter your password"
    		value={this.state.upass}
        secureTextEntry
        maxLength={8}
    		onChangeText={(val) => this.setState({upass: val,upassError:null,validUPass:null})}
	  	/>

      {!! this.state.validUPass && (
        <Text style={Colors.first}>{String.onboarding.welcome.validUPass}</Text>
      )}

      {!! this.state.upassError && (
        <Text style={Colors.first}>{this.state.upassError}</Text>
      )}

      <TouchableOpacity onPress={()=>{ this.props.navigation.navigate("ForgotPass"); }}>
          <Text style={{color:"#2f2f2f",alignSelf:"flex-end",marginTop:20}}> Forgot Password? </Text>
      </TouchableOpacity>


      <TouchableOpacity
         style={{color:"#ffffff",fontSize:18,justifyalign:"center",alignSelf:"center",marginTop:20,alignitem:"center",backgroundColor:"#cccccc",paddingLeft:40,borderRadius:10,paddingRight:40,justifyContent:"center",paddingBottom:5}}
         onPress={()=>{ this.isCheck();}}>
        <Text style={{fontSize:20}}>Login</Text>
      </TouchableOpacity>

      <View style={{flexDirection:"row",alignitem:"center",justifyContent:"center"}}>
        <Text style={{color:"#2f2f2f",alignSelf:"center",marginTop:20}}> You don't have an account? </Text>

        <TouchableOpacity onPress={()=>{  this.props.navigation.navigate("SignUpScreen");   }}>
        <Text style={{color:"red",marginTop:20}} onPress={this.signup}>SignUp </Text>
        </TouchableOpacity>
      </View>
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
	backgroundColor:"lavender",
  justifyContent:"center",
},
inputStyle: {
width:'100%',
fontSize:15,
marginBottom:1,
borderColor:"#000000",
height:40,
borderWidth:1,
fontFamily: "Cochin",
},
});
