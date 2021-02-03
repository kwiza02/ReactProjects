//Stack

import React, { Component } from 'react';

import {
    View,
    Image,
} from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";

import Splash from '../Screens/Splash';
import Login from '../Screens/Login';
import ForgotPassword from '../Screens/ForgotPassword';
import Signup from '../Screens/Signup';
import ChangePassword from '../Screens/ChangePassword';
import EditProfile from '../Screens/EditProfile';
import Recent from '../Screens/Recent';
import Add from '../Screens/Add';
import Profile from '../Screens/Profile';
import Settings from '../Screens/Settings';
import People from '../Screens/People';
import Followers from '../Screens/Followers';
import Following from '../Screens/Following';
import Message from '../Screens/Message';
import Details from '../Screens/Details';
import LikeScreen from '../Screens/LikeScreen';
import CommentScreen from '../Screens/CommentScreen';
import Map from '../Screens/Map';
import VideoFull from '../Screens/VideoFull';


class ActionBarImage extends Component {

    render() {
         return (
            <View style={{ flexDirection: 'row' }}>

                <Image
                    source={require("../Assets/location.png")}
                    style={{ width: 30, height: 30, borderRadius: 15, marginRight: 15 }} />
                
            </View>

        );
     }
}

function getHeaderTitle(route) {
    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : route.params?.screen || 'Home';

    switch (routeName) {
        case 'Home':
            return "Recent";
        case 'Like':
            return 'Follow';
        case 'Comment':
            return 'Message';
        case 'User':
            return 'My-Profile' ;
    }
}

const Stack = createStackNavigator();

const MyStack = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown:false}}/>
            <Stack.Screen name="Login" component={Login} options={{title:'LOG IN',headerLeft:null,headerTitleStyle:{alignSelf:"center"},headerStyle:{borderBottomColor:"gray",borderBottomWidth:1}}} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title:'Forgot Password',headerTitleStyle:{marginLeft:50} ,headerStyle:{borderBottomColor:"gray",borderWidth:1}}} />
            <Stack.Screen name="Signup" component={Signup} options={{ title: 'Sign up', headerTitleStyle: {marginLeft:90 }, headerStyle: { borderBottomColor: "gray", borderWidth: 1 } }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Edit Profile', headerStyle: { borderBottomColor: "gray", borderWidth: 1,}}} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Change Password',  headerStyle: { borderBottomColor: "gray", borderWidth: 1 } }} />
            <Stack.Screen name="Recent" component={Recent} options={({ route }) => ({
                headerTitle: getHeaderTitle(route),
                headerLeft:null,
                headerShown:false,
            })}/>
            <Stack.Screen name="Add" component={Add} options={{ headerTitle: 'Add', headerStyle: { borderBottomColor: "gray", borderWidth: 1 }, headerLeft: null, headerRight: () => <ActionBarImage />,}}/>
            <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
            <Stack.Screen name="People" component={People} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="Followers" component={Followers}></Stack.Screen>
            <Stack.Screen name="Following" component={Following}></Stack.Screen>
            <Stack.Screen name="Message" component={Message} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="Details" component={Details} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="LikeScreen" component={LikeScreen} options={{title:'Likes'}}></Stack.Screen>
            <Stack.Screen name="CommentScreen" component={CommentScreen} options={{title:'Comments'}}></Stack.Screen>
            <Stack.Screen name="Map" component={Map} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="VideoFull" component={VideoFull} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    );
 }

export { MyStack};