//change password

//Awesome Homescreen
// LoginScreen
// MainScreen
import React, { Component } from 'react';

import { Text,
StyleSheet,
TextInput,
View,
TouchableOpacity,
BackHandler,
Alert
} from 'react-native';

import {Colors} from '../Styles/Colors';

import {String} from '../Styles/String';
//import {Colors ,String} from '../Styles';
import AsyncStorage from '@react-native-community/async-storage';
import Utils from '../Component/Utils';

export default class ChangePass extends Component {

  disableBackButton=()=>{
    this.props.navigation.navigate("HomeScreen");
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
	  npass:'',
    npassError:'',
	  cpass:'',
    cpassError:'',
    cupass:'',
    cupassError:'',
    validPass:'',
    validCPass:'',

    };
  }

  /*async componentDidMount (){
    const value = await AsyncStorage.getItem('@user_name');
    console.log("username ---> "+ value);
  }*/

  isCheck(){
    var isValid = true;
    const regx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(Utils.isStringNull(this.state.npass)){
        isValid= false;
        this.setState({npassError:String.onboarding.welcome.npassError});
      }else if(!Utils.isPassValid(this.state.npass)){
        isValid= false;
        this.setState({validPass:String.onboarding.welcome.validNPass});
      }
      else{
        this.setState({npassError:null});
      }

      if(this.state.cpass === null || this.state.cpass === ''){
          isValid= false;
          this.setState({cpassError:String.onboarding.welcome.cpassError});
        }else if(!Utils.isPassValid(this.state.cpass)){
          isValid= false;
          this.setState({validCPass:String.onboarding.welcome.validCPass});
        }else{
          this.setState({cpassError:null});
        }

        if(this.state.cupass === null || this.state.cupass === ''){
            isValid= false;
            this.setState({cupassError:String.onboarding.welcome.cupassError});
          }else{
            this.setState({cupassError:null});
          }

          if(this.state.npass == this.state.cpass){

             }else{
               isValid=false;
               Alert.alert("Password mismatch!!!");
             }

    if(isValid === true){
       this.props.navigation.navigate(" LoginScreen ")
    }
  }

  render() {
    return (
	 <View style={styles.containerC}>

   <TextInput
     style={styles.inputStyleC}
     placeholder= " Enter your current password"
     value={this.state.cupass}
     secureTextEntry
     maxLength={8}
     onChangeText={(val) => this.setState({cupass: val,cupassError:null,validCPass:null})}
   />

{!! this.state.validCPass && (
       <Text style={Colors.first}>{String.onboarding.welcome.valiCNPass}</Text>
     )}

   {!! this.state.cupassError && (
     <Text style={Colors.first}>{String.onboarding.welcome.cupassError}</Text>
   )}


   <TextInput
     style={styles.inputStyleC}
     placeholder= " Enter your new password"
     value={this.state.npass}
     maxLength={8}
     secureTextEntry
     onChangeText={(val) => this.setState({npass: val,npassError:null,validPass:null})}
   />

    {!! this.state.validPass && (
       <Text style={Colors.first}>{String.onboarding.welcome.validNPass}</Text>
     )}

   {!! this.state.npassError && (
     <Text style={Colors.first}>{String.onboarding.welcome.npassError}</Text>
   )}


   <TextInput
     style={styles.inputStyleC}
     placeholder= " Enter your confirmation password"
     value={this.state.cpass}
     secureTextEntry
     maxLength={8}
     onChangeText={(val) => this.setState({cpass: val,cpassError:null})}
   />

   {!! this.state.cpassError && (
     <Text style={Colors.first}>{String.onboarding.welcome.cpassError}</Text>
   )}


   <TouchableOpacity
      style={{color:"#ffffff",fontSize:18,justifyalign:"center",alignSelf:"center",marginTop:30,alignitem:"center",backgroundColor:"#cccccc",paddingLeft:40,borderRadius:10,paddingRight:40,justifyContent:"center",paddingBottom:5}}
      onPress={()=>{this.isCheck();}}>
     <Text style={{fontSize:20}}>Submit</Text>
   </TouchableOpacity>

    </View>
    );
  }
}

const styles = StyleSheet.create({
containerC:{
	flex:1,
	display:"flex",
	flexDirection:"column",
	padding:20,
	borderBottomColor:'#000000',
	backgroundColor:"white",
},
inputStyleC: {
width:'100%',
marginTop:25,
fontSize:15,
borderColor:"#000000",
height:40,
borderWidth:1,
fontFamily: "Cochin",
marginRight:50,

}
});
