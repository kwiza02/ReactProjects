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
Modal,
Dimensions,
} from 'react-native';

//import ImagePicker from 'react-native-image-picker';
//import {Colors} from '../Styles/Colors';
import {Colors ,String} from '../Styles';
//import {String} from '../Styles/String';
import ImagePicker from 'react-native-image-crop-picker';
import Utils from '../Component/Utils';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class EditProfile extends Component {

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
    isOpenPicker:false,
    userSelected:'',
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
       this.props.navigation.navigate("HomeScreen");
    }
  }


  selectPhotoTapped(flag) {
    if(flag==1){
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
    }else{
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
  this.setState({userSelected: item}, () =>{
    this.setModalVisible(true);
  });
}

setModalVisible(visible) {
  this.setState({isOpenPicker: visible});
}


  render() {
    return (
      <ScrollView style={styles.container}>

    	 <View style={styles.container}>

       
           <Image source={this.state.avtarSource ? {uri: this.state.avtarSource } : require("../Assest/user.png")} style={styles.uploadAvatar}/>
  
           <View style={{marginTop:-60,marginLeft:190,marginBottom:20}}>
           <TouchableOpacity onPress={() => {this.clickEventListener();}}>
            <Image source={require("../Assest/edit.png")} style={{width:30,height:30,borderRadius:15}}/>
          </TouchableOpacity>
        </View>
       

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
          <Text style={{fontSize:20}}>Update</Text>
        </TouchableOpacity>

        <Modal 
            transparent={true}
            animationType={"feed"}
            onRequestClose={() => this.setModalVisible(false)}
            visible={this.state.isOpenPicker}>

            <View style={styles.popupOverlay}>
            <TouchableOpacity style={{width:screenWidth,height:screenHeight,position:'absolute'}}
            onPress={()=>{ this.setModalVisible(false)}}/>
              <View style={styles.popup}>   
                <TouchableOpacity onPress={() => this.selectPhotoTapped(2)}>
                <Image source={require("../Assest/camera.png")} style={{height:30,width:30,alignSelf:"center"}}/>
                  <Text style={{padding:5,alignItems:"center"}}>Capture from Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{padding:30}} onPress={() => this.selectPhotoTapped(1)}>
                <Image source={require("../Assest/gallery.png")} style={{height:30,width:30,alignSelf:"center",marginBottom:2}}/>
                  <Text style={{padding:5,alignItems:"center"}}>Choose from gallery</Text>
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
container:{
	display:"flex",
	flexDirection:"column",
	padding:20,
	borderBottomColor:'#000000',
  backgroundColor:"white",
},
popup: {
  backgroundColor: 'white',
   marginTop: 250,
   borderRadius: 7,
  justifyContent:"center",
  alignItems:"center",
  alignSelf:'center',
},
inputStyle: {
width:'100%',
fontSize:15,
marginBottom:10,
borderColor:"#000000",
height:40,
borderWidth:1,
fontFamily: "Cochin",
},
popupOverlay: {
  backgroundColor: "#00000057",
  flex: 1,
  
},
popupContent: {
  //alignItems: 'center',
  margin: 50,
  height:170,
},
uploadAvatar:{
  width: 100,
  height:100,
  borderWidth:1,
  borderColor:"#23202a",
  justifyContent:'center',
  alignSelf:'center',
  borderRadius: 50,
  marginBottom:20,
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
