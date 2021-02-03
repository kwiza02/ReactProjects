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
FlatList,
Image,
ScrollView,
CheckBox,
Alert,
Modal,
Button,
Dimensions,
DrawerLayoutAndroid,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);


export default class HomeScreen extends Component {

  disableBackButton=()=>{
    //BackHandler.exitApp();
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
      modalVisible:false,
      userSelected:[],
      data:[

        {
          "name": "Miyah Myles",
          "emailid": "miyah.myles@gmail.com",
          "photo":require("../Assest/image_eight.png"),

      },
      {
          "name": "June Cha",
          "emailid": "june.cha@gmail.com",
          "photo":require("../Assest/image_one.png"),

      },
      {
          "name": "Iida Niskanen",
          "emailid": "iida.niskanen@gmail.com",
          "photo": require("../Assest/image_two.jpg"),

      },
      {
          "name": "Renee Sims",
          "emailid": "renee.sims@gmail.com",
          "photo": require("../Assest/image_three.png"),

      },
      {
          "name": "Jonathan Nu\u00f1ez",
          "emailid": "jonathan.nu\u00f1ez@gmail.com",
          "photo": require("../Assest/image_four.png"),

      },
      {
          "name": "Sasha Ho",
          "emailid": "sasha.ho@gmail.com",
          "photo": require("../Assest/image_five.png"),

      },
      {
          "name": "Abdullah Hadley",
          "emailid": "abdullah.hadley@gmail.com",
          "photo": require("../Assest/image_six.png"),

      },
      {
          "name": "Thomas Stock",
          "emailid": "thomas.stock@gmail.com",
          "photo": require("../Assest/image_seven.png"),

      },
      {
          "name": "Veeti Seppanen",
          "emailid": "veeti.seppanen@gmail.com",
          "photo": require("../Assest/image_nine.png"),
        },

      {
          "name": "Bonnie Riley",
          "emailid": "bonnie.riley@gmail.com",
          "photo": require("../Assest/image_ten.png"),

      }
    ]
    };
  }

  async componentDidMount (){
    const value = await AsyncStorage.getItem('@user_name');
    console.log("username ---> "+ value);
  }

  deleteAddress(item) {
    Alert.alert(
      'Delete Address',
      'Are you sure want to delete this address ?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.removeText(item)},
      ],
      { cancelable: true }
    )
  }

  removeText(item){
      this.setState({
         data: this.state.data.filter((_item)=>_item.name !== item.name)
      });

  }

  clickEventListener = (item) => {
  this.setState({userSelected: item}, () =>{
    this.setModalVisible(true);
  });
}

setModalVisible(visible) {
  this.setState({modalVisible: visible});
}




  render() {
    return (

      <ScrollView contentContainerStyle={styles.container}>

     <View style={styles.container}>


        <FlatList
        data={this.state.data}

        renderItem={({ item }) =>   <View style= {styles.inputStyle}>

         <TouchableOpacity style={{flex:1,padding:10,flexDirection:"row"}} onPress={() => {this.clickEventListener(item)}}>

            <Image source={item.photo}  style={{height:60, width:60,borderRadius:30,borderColor: "#20232a",borderWidth:2}} />

          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}onPress={() => {this.props.navigation.navigate("HomeTabNavigator");}}>

            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}  >
              <Text style={{fontWeight:"bold"}}>{item.name}{"\n"}<Text style={{fontWeight:"normal"}}>{item.emailid}</Text></Text>
            </View>

        <TouchableOpacity onPress={()=>{this.deleteAddress(item);}} style={{alignSelf:"flex-end",marginRight:10,marginBottom:20,alignSelf:"center"}}>
             <Image source={require("../Assest/delete.png")}  style={{height:20, width:20,borderRadius:10,borderColor: "#20232a",borderWidth:1,marginTop:20,marginLeft:70}}/>
       </TouchableOpacity>
        </TouchableOpacity>
       </View>}
       keyExtractor={item => item}
     />

       <Modal
         animationType={"slide"}
         transparent={true}
         onRequestClose={() => this.setModalVisible(false)}
         visible={this.state.modalVisible}
         onBackdropPress={() => setModalVisible(false)}>

         <View style={styles.popupOverlay}>
            <TouchableOpacity style={{width:screenWidth,height:screenHeight,position:'absolute'}}
            onPress={()=>{ this.setModalVisible(false)}}/>
           <View style={styles.popup}>
           <View style={{alignSelf:"flex-end",marginRight:-12,marginTop:-10}}>
             <TouchableOpacity onPress={() => {this.setModalVisible(false) }}>
               <Image source={require("../Assest/images.png")}  style={{height:30, width:30,borderRadius:15}}/>
             </TouchableOpacity>
           </View>
             <View style={styles.popupContent}>
               <ScrollView contentContainerStyle={styles.modalInfo}>
               <Image style={styles.image} source={this.state.userSelected.photo}/>
                   <Text style={styles.name}>{this.state.userSelected.name}</Text>
                   <Text style={styles.emailid}>{this.state.userSelected.emailid}</Text>
                    </ScrollView>
             </View>

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
	padding:10,
	borderBottomColor:'#000000',
	backgroundColor:"white",

},
  inputStyle: {
    width:'100%',
    marginBottom:10,
    borderColor:"#20232a",
    height:75,
    borderWidth:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  header:{
    backgroundColor: "#00CED1",
    height:200
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
    flex:1,
  },
  detailContent:{
    top:80,
    height:500,
    width:Dimensions.get('screen').width - 90,
    marginHorizontal:30,
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  userList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
    borderColor:"#23202a",
    borderWidth:1
  },



  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row'
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  about:{
    marginHorizontal:10
  },

  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
 /************ modals ************/
  popup: {
    backgroundColor: 'white',
  //  marginTop: 40,

    borderRadius: 7,
    justifyContent:"center",
    alignItems:"center",
    alignSelf:'center',
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    justifyContent:"center",
  },
  popupContent: {
    //alignItems: 'center',
    margin: 10,
    height:170,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop:15,
    flexDirection: 'row',
    borderColor: "#eee",
    justifyContent:'flex-end',
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose:{
    height:20,
    backgroundColor:'#20b2aa',
    padding:20
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  }
});
