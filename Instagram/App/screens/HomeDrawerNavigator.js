import React from "react";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { Text,
View,
Alert,
Image,
} from 'react-native';


import {MainStackNavigator,ChangePassStackNavigator,EditProfileStackNavigator,} from "../screens/HomeStackNavigator";

function CustomDrawerContent(props) {
  return (

    <DrawerContentScrollView {...props}>

      <View style={{flex:1}}>
          <Image style={{height:80,width:80,borderRadius:40,alignSelf:"center",marginBottom:10,marginTop:30}} source={require("../Assest/image_ten.png")}/>
          <Text style={{alignSelf:"center",marginBottom:30,fontSize:18,color:"black",fontWeight:"bold"}}>Narendra Modi</Text>
      </View>
      <DrawerItemList {...props} />

      <DrawerItem
        label="Logout"
        style={{marginTop:400,alignSelf:"center"}}
        onPress={() => Alert.alert(
          'Logout',
          'Are you sure want to Logout ?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => props.navigation.navigate(" LoginScreen ")},
          ],
          { cancelable: false }
        )}
      />
    </DrawerContentScrollView>

  );
}

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeScreen" component={MainStackNavigator} />
      <Drawer.Screen name="ChangePass" component={ChangePassStackNavigator} />
      <Drawer.Screen name="EditProfile" component={EditProfileStackNavigator} />

    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
