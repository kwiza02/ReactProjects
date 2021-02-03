//Recent

import React, { Component } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
    BackHandler,
    Image,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';


import Home from '../Screens/Home';
import Like from '../Screens/Like';
import User from '../Screens/User';
import Comment from '../Screens/Comment';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const Tab = createMaterialBottomTabNavigator();

export default class Recent extends Component {

    constructor(props){
        super(props);
        this.state={
            isFocused:false,
        };
    }

    render() {
        return (

        <View style={{flex:1}}>

                <Tab.Navigator barStyle={{ backgroundColor: "white" }} shifting={false} >

                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                       tabBarLabel:null,
                        tabBarIcon: ({ tintColor,focused }) => (
                             <Image source={require("../Assets/home.png")} style={{height:30,width:30,marginRight:20,tintColor: focused ? "red" : "black"}}/> 
                        ),
                    }}
                />

                <Tab.Screen
                    name="Like"
                    component={Like}
                    options={{
                        tabBarLabel:null,
                        tabBarIcon: ({ tintColor,focused }) => (
                            <Image source={require("../Assets/heart.png")} style={{ height: 28, width: 28, marginRight: 60, tintColor: focused ? "red" : "black"}} /> 
                        ),
                    }}
                />

                <Tab.Screen
                    name="Comment"
                    component={Comment}
                    options={{
                        tabBarLabel:null,
                        tabBarIcon: ({ tintColor,focused }) => (
                            <Image source={require("../Assets/comment.png")} style={{ height: 28, width: 28, marginLeft: 60, tintColor: focused ? "red" : "black"}} /> 
                        ),
                    }}
                />

                <Tab.Screen
                    name="User"
                    component={User}
                    options={{
                        tabBarLabel: null,
                        tabBarIcon: ({ tintColor,focused }) => (
                            <Image source={require("../Assets/user.png")} style={{ height: 25, width: 25, marginLeft: 20, tintColor: focused ? "red" : "black" }} /> 
                        ),
                    }}
                />
    
            </Tab.Navigator>

                

                    <View style={{position: 'absolute', height:65, width: 65, borderRadius: 32, 
                        borderColor: "black",borderWidth:1,justifyContent: "center",backgroundColor:"white",
                        marginTop: screenHeight-90 ,alignSelf:'center',alignSelf:"center"}}>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Add"); }}>
                        <Image source={require("../Assets/plus.png")} style={{ height: 40, width:40, alignSelf: "center" }} />
                    </TouchableOpacity>

                    </View>


               

            </View>

        );
    }
}