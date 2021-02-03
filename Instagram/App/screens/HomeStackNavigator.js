import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from 'react-native-splash-screen';

import { Button, View, Text, TouchableOpacity, Image } from 'react-native';


import Splash from '../screens/Splash';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPass from '../screens/ForgotPass';
import ChangePass from '../screens/ChangePass';
import EditProfile from '../screens/EditProfile';
import HomeTabNavigator from '../screens/HomeTabNavigator';

const Stack = createStackNavigator();


const NavigationDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={require("../Assest/menu.png")}
          style={{ width: 30, height: 30, marginLeft: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const MainStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
    <Stack.Screen name=" LoginScreen " component={ LoginScreen }  options={{headerShown:false}}/>
    <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{
          title: 'HomeScreen',
          headerLeft:()=> <NavigationDrawerStructure navigationProps={navigation} />,
          headerStyle: {
            backgroundColor:"lightsteelblue",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
    <Stack.Screen name="ForgotPass" component={ForgotPass} options={{
          title: 'Forgot Password',
          headerLeft:null,
          headerStyle: {
            backgroundColor:"lightsteelblue",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{
          title: 'SignUpScreen',
          headerLeft:null,
          headerStyle: {
            backgroundColor:"lightsteelblue",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
    <Stack.Screen name="ChangePass" component={ChangePass} options={{
          title: 'Change Password',
          headerLeft:null,
          headerStyle: {
            backgroundColor:"lightsteelblue",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{
              title: 'Change Password',
              headerLeft:null,
              headerStyle: {
                backgroundColor:"lightsteelblue",
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}/>

            <Stack.Screen name="HomeTabNavigator" component={HomeTabNavigator} options={{
          title: 'HomeTabNavigator',
          headerStyle: {
            backgroundColor:"lightsteelblue",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>

            </Stack.Navigator>
  );
}

const ChangePassStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChangePass" component={ChangePass} options={{
            title: 'Change Password',
            headerLeft: () =><NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor:"lightsteelblue",
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
    </Stack.Navigator>
  );
}

const EditProfileStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EditProfile" component={EditProfile} options={{
            title: 'Edit Profile',
            headerLeft: () =><NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor:"lightsteelblue",
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
    </Stack.Navigator>
  );
}

export { MainStackNavigator,ChangePassStackNavigator,EditProfileStackNavigator};
