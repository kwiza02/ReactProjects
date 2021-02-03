//Awesome SignUpscreen
// LoginScreen
// MainScreen
import React, { Component } from 'react';

import { Text,
StyleSheet,
TextInput,
View,
Alert,
TouchableOpacity,
Image,
ScrollView,
Picker,
PermissionsAndroid,
CheckBox,
BackHandler,
AsyncStorage,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import {Colors} from '../Styles/Colors';

import {String} from '../Styles/String';
import Utils from '../Component/Utils';
//import {Colors ,String} from '../Styles';

export default class SignUpscreen extends Component {

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
	  fname:'',
    fnameError:'',
	  lname:'',
    lnameError:'',
    email:'',
    emailError:'',
    npass:'',
    npassError:'',
    cpass:'',
    cpassError:'',
    contact:'',
    contactError:'',
    avtarSource:null,
    user:'',
    check:false,
    checkError:'',
    validEmail:'',
    validPass:'',
    validFname:'',
    validLname:'',
    validCNPass:'',

    };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
 }

 updateUser = (user) => {
     this.setState({ user: user })
  }

  isCheck(){
    var isValid = true;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const regn = /^[a-zA-Z\s]+$/;

    if(Utils.isStringNull(this.state.fname)){
      isValid= false;
      this.setState({fnameError:String.onboarding.welcome.fnameError});
    }else if (!Utils.isNameValid(this.state.fname)) {
      isValid=false;
      this.setState({validFname:String.onboarding.welcome.validFname});
    }else{
      this.setState({fnameError:null});
    }

    if(Utils.isStringNull(this.state.lname)){
      isValid= false;
      this.setState({lnameError:String.onboarding.welcome.lnameError});
    }else if (!Utils.isNameValid(this.state.lname)) {
      isValid=false;
      this.setState({validLname:String.onboarding.welcome.validLname});
    }else{
      this.setState({lnameError:null});
    }

    if(Utils.isStringNull(this.state.email)){
      isValid= false;
      this.setState({emailError:String.onboarding.welcome.emailError});
    }else if (!Utils.isEmailValid(this.state.email)) {
      isValid=false;
      this.setState({validEmail:String.onboarding.welcome.validEmail});
    }else{
      this.setState({emailError:null});
    }

  if(Utils.isStringNull(this.state.npass)){
      isValid= false;
      this.setState({npassError:String.onboarding.welcome.npassError});
    }
    else if (!Utils.isPassValid(this.state.npass)) {
      isValid=false;
      this.setState({validPass:String.onboarding.welcome.validPass});
    }
    else{
      this.setState({npassError:null});
    }

    if(this.state.cpass === null || this.state.cpass === ''){
        isValid= false;
        this.setState({cpassError:String.onboarding.welcome.cpassError});
      }else{
        this.setState({cpassError:null});
      }

      if(this.state.contact === null || this.state.contact === ''){
          isValid= false;
          this.setState({contactError:String.onboarding.welcome.contactError});
        }else{
          this.setState({contactError:null});
        }

      if(this.state.check === false){
            isValid= false;
            this.setState({checkError:String.onboarding.welcome.checkError});
        }else{
            this.setState({checkError:null});
          }

      if(this.state.npass == this.state.cpass){

        }else{
               isValid=false;
               this.setState({validCNPass:String.onboarding.welcome.validCNPass});
            }

    if(isValid === true){
       this.props.navigation.navigate(" LoginScreen ")
    }
  }


  selectPhotoTapped() {
   ImagePicker.showImagePicker((response) => {
  //console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    console.log("Image --> "+ JSON.stringify(response));
    this.setState({
      avtarSource: response.uri,
    });
  }
});
}

  render() {
    return (
      <ScrollView style={styles.container}>

    	 <View style={styles.container}>

       <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
           <Image source={this.state.avtarSource ? {uri: this.state.avtarSource } : require("../Assest/user.png")} style={styles.uploadAvatar} />
       </TouchableOpacity>

       <Text>First Name</Text>

    		<TextInput
          style={styles.inputStyle}
          placeholder= " Enter your First name"
          value={this.state.fname}
          onChangeText={(val) => this.setState({fname: val,fnameError:null,validFname:null})}
    		/>

        {!! this.state.validFname && (
          <Text style={Colors.first}>{String.onboarding.welcome.validFname}</Text>
        )}

        {!! this.state.fnameError && (
          <Text style={Colors.first}>{String.onboarding.welcome.fnameError}</Text>
        )}


        <Text>Last Name</Text>

    		<TextInput
          style={styles.inputStyle}
          placeholder= " Enter your Last name"
          value={this.state.lname}
          onChangeText={(val) => this.setState({lname: val,lnameError:null,validLname:null})}
    		/>

        {!! this.state.validLname && (
          <Text style={Colors.first}>{String.onboarding.welcome.validLname}</Text>
        )}

        {!! this.state.lnameError && (
          <Text style={Colors.first}>{String.onboarding.welcome.lnameError}</Text>
        )}


        <Text>Email</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder= " Enter your Email address"
          value={this.state.email}
          keyboardType={'email-address'}
          onChangeText={(val) => this.setState({email: val,emailError:null,validEmail:null})}
    		/>

        {!! this.state.validEmail && (
          <Text style={Colors.first}>{String.onboarding.welcome.validEmail}</Text>
        )}

        {!! this.state.emailError && (
          <Text style={Colors.first}>{String.onboarding.welcome.emailError}</Text>
        )}

        <Text>Password</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder= " Enter your new password"
          value={this.state.npass}
          maxLength={8}
          password={true}
          onChangeText={(val) => this.setState({npass: val,npassError:null,validPass:null})}
        />

     {!! this.state.validPass && (
       <Text style={Colors.first}>{String.onboarding.welcome.validPass}</Text>
     )}

        {!! this.state.npassError && (
          <Text style={Colors.first}>{String.onboarding.welcome.npassError}</Text>
        )}

        <Text>Confirmation Password</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder= " Enter your password"
          value={this.state.cpass}
          maxLength={8}

          onChangeText={(val) => this.setState({cpass: val,cpassError:null,validCNPass:null})}
        />

        {!! this.state.validCNPass && (
          <Text style={Colors.first}>{String.onboarding.welcome.validCNPass}</Text>
        )}

        {!! this.state.cpassError && (
          <Text style={Colors.first}>{String.onboarding.welcome.cpassError}</Text>
        )}

        <Text>Contact Number</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder= " Enter your contact number"
          value={this.state.contact}
          maxLength={10}
          keyboardType={'numeric'}
          onChangeText={(val) => this.setState({contact: val,contactError:null})}
        />

        {!! this.state.contactError && (
          <Text style={Colors.first}>{String.onboarding.welcome.contactError}</Text>
        )}

        <View style={styles.pickercontainer}>
            <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser} style={{height:40,width:340}}>
               <Picker.Item label = "Male" value = "Male" />
               <Picker.Item label = "Female" value = "Female" />
            </Picker>
         </View>

         <View style={{flexDirection:"column"}}>
            <View style={{flexDirection:"row",marginTop:20}}>

              <CheckBox
                check={false}
                value={this.state.check}
                onValueChange={()=>this.setState({check: !this.state.check,checkError:null})}/>

              <Text style={{fontSize:15,marginTop:7}}>Accept Terms and Conditions</Text>

            </View>

            {!! this.state.checkError && (
            <Text style={Colors.first}>{this.state.checkError}</Text>
            )}

          </View>

         <TouchableOpacity
           style={{color:"#ffffff",fontSize:18,justifyalign:"center",alignSelf:"center",marginTop:30,alignitem:"center",backgroundColor:"#cccccc",paddingLeft:40,borderRadius:10,paddingRight:40,justifyContent:"center",paddingBottom:5}}
           onPress={()=>{this.isCheck();}}>
          <Text style={{fontSize:20}}>SignUp</Text>
        </TouchableOpacity>

       </View>

    </ScrollView>
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
marginBottom:2,
borderColor:"#000000",
height:40,
borderWidth:1,
fontFamily: "Cochin",
},
uploadAvatar:{
  width: 100,
  height:100,
  borderWidth:1,
  borderColor:"#23202a",
  justifyContent:'center',
  alignSelf:'center',
  borderRadius: 50,
},
pickercontainer:{
  flex: 1,
  borderWidth:1,
  marginTop:20

},
checkboxContainer: {
    flexDirection: "row",
    marginTop:20,
  },

});
