//User

import React, { Component } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AsyncStorage from '@react-native-community/async-storage';


import {
    Text,
    View,
    TouchableOpacity,
    Image,
    BackHandler,
    StyleSheet,
    Dimensions,
    Animated,
    Alert,
} from 'react-native';

import Post from '../Screens/Post';
import About from '../Screens/About';

import  Header  from '../Components/Header';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const DRAWER_WIDTH = 280;

const Tab = createMaterialTopTabNavigator();

export default class User extends Component {

    constructor() {
        super();

        this.animatedValue = new Animated.Value(0);
        this.state = { disabled: false, flatlistState: 'setting',}
        this.toggleFlag = 0;
    }

    disableBackButton = () => {
        this.props.navigation.navigate("Home");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    _storeName = async () => {
        try {
            alert(this.state.flatlistState);
            // await AsyncStorage.setItem(
            //   'flatListState',
            //   JSON.stringify(this.state.userName),
            // );
        } catch (error) { }
    };
    _retrieveData = async () => {
        try {
            // const value = await AsyncStorage.getItem('TaskData');
            // if (value !== null) {
            //   const value1 = JSON.parse(value);
            //   this.setState({
            //     TaskData: value1,
            //   });
            // }
        } catch (error) { }
    };
    message = async () => {
        try {
            const flatListState = 'Message';
            await AsyncStorage.setItem('flatListState', flatListState);
            this.props.navigation.navigate('People');
        } catch (error) { }
    };
    setting = async () => {
        try {
            const flatListState = 'setting';
            await AsyncStorage.setItem('flatListState', flatListState);
            this.props.navigation.navigate('People');
        } catch (error) { }
    };


    toggleDrawer = () => {
        if (this.toggleFlag == 0) {
            this.setState({ disabled: true }, () => {
                Animated.timing(
                    this.animatedValue,
                    {
                        toValue: 1,
                        duration: 250
                    }
                ).start(() => {
                    this.setState({ disabled: false });
                    this.toggleFlag = 1;
                });
            });
        }
        else {
            this.setState({ disabled: true }, () => {
                Animated.timing(
                    this.animatedValue,
                    {
                        toValue: 0,
                        duration: 250
                    }
                ).start(() => {
                    this.setState({ disabled: false });
                    this.toggleFlag = 0;
                });
            });
        }
    }

    render() {

        const animatedValue = this.animatedValue.interpolate(
            {
                inputRange: [0, 1],
                outputRange: [DRAWER_WIDTH - 46, 0]
            });

        return (

            <View style={{flex:1,backgroundColor:"white"}}>

               

                <View style={{ flexDirection: "row", borderBottomColor: "gray", borderWidth: 1, padding: 15 }}>

                    <Text style={{ fontWeight: "bold", fontSize: 20, alignSelf: "center", marginLeft: 5, marginRight: 250 }}>My profile</Text>

                </View>

                <View style={{ flexDirection: "row" }}>
                    <View style={{ marginBottom: 30, marginLeft: 15 }} >
                        <Image style={{ height: 70, width: 70, borderRadius: 35, marginBottom: 10, marginTop: 20 }} source={require("../Assets/person.png")} />
                        <Text style={{ fontSize: 15, color: "black", fontWeight: "bold" }}>Narendra Modi</Text>
                        <Text style={{ fontSize: 12, marginTop: 8, color: "gray" }}>Prime Minister of India</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 30 }}>
                        <Text style={{ marginRight: 15, fontWeight: "bold", marginLeft: 20, fontSize: 15 }}>{"\t\t"}2 {"\n\n"}<Text style={{ fontWeight: "normal", fontSize: 15 }}> Posts</Text> </Text>
                        <Text style={{ marginRight: 15, fontWeight: "bold", fontSize: 15 }}>{"\t\t\t"} 6{"\n\n"}
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Followers") }}>
                                <Text style={{ fontWeight: "normal", fontSize: 15 }}> Followers</Text></TouchableOpacity></Text>
                        <Text style={{ marginRight: 15, fontWeight: "bold", fontSize: 15 }}> {"\t\t\t"}8 {"\n\n"}
                            <TouchableOpacity onPress={() => {this.props. navigation.navigate("Following") }}>
                                <Text style={{ fontWeight: "normal", fontSize: 15 }}> Following</Text></TouchableOpacity></Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => { this.props.navigation.navigate("EditProfile"); }}>

                    <View style={{ margin: 20, height: 30, marginTop: 10, alignItems: "center", justifyContent: "center", backgroundColor: "white", borderWidth: 1, borderRadius: 5 }}>

                        <Text style={{ fontSize: 15, alignSelf: "center", color: "Black" }}>Edit Profile</Text>

                    </View>

                </TouchableOpacity>


                <Tab.Navigator tabBarOptions={{
                    indicatorStyle: {
                        backgroundColor: "black"
                    },
                    style: {
                        borderWidth: 0.5,
                        borderColor: "gray",
                    }
                }}>
                    <Tab.Screen name="Post" component={Post} options={{ title: "POSTS" }}/>
                    <Tab.Screen name="About" component={About} options={{ title: "ABOUT" }} />
                </Tab.Navigator>

                

                    <Animated.View style={[styles.drawer, { transform: [{ translateX: animatedValue }] }]}>
                    <TouchableOpacity onPress={this.toggleDrawer} style={{ margin: 8}}>
                            <Image source={require('../Assets/menu.png')} style={{ width: 30, height: 30,marginRight:30,marginTop:7, }} />
                        </TouchableOpacity>
                        <View style={styles.drawerContainer}>
                            <Text style={{fontSize:18,color:"black",marginLeft:15,marginTop:20}}>Kwiza Kaneria</Text>
                            
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Settings") }}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                               
                                <Image source={require("../Assets/gear.png")} style={{width:30,height:30,marginTop:30,marginLeft:10}}></Image>
                                <Text style={{ marginTop: 30, marginLeft: 20, color:"darkslategrey ",fontSize:20}} >Settings</Text>
                               
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.setting(); }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                
                                    <Image source={require("../Assets/people.png")} style={{ width: 30, height: 30, marginTop: 30, marginLeft: 10 }}></Image>
                                    <Text style={{ marginTop: 20, marginLeft: 20, color: "darkslategrey ", fontSize: 20 }} >People</Text>
                                
                            </View>
                        </TouchableOpacity> 

                        <TouchableOpacity style={{marginTop:520}} onPress={() => Alert.alert(
                            'Logout',
                            'Are you sure want to Logout ?',
                            [
                                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                { text: 'OK', onPress: () => this.props.navigation.navigate("Login") ,},
                            ],
                            { cancelable: false }
                        )}>
                            <View style={{ flexDirection: "row", alignItems: "center",}}>

                                <Image source={require("../Assets/logout.png")} style={{ width:25, height: 25, marginTop: 30, marginLeft: 10 }}></Image>
                                <Text style={{ marginTop: 30, marginLeft: 20, color: "darkslategrey ", fontSize: 20 }} >Logout</Text>

                            </View>
                        </TouchableOpacity> 

                        </View>
                    </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        fontSize: 15,
        marginBottom: 20,
        borderColor: "#000000",
        height:30,
        alignItems:"center",
        borderWidth: 1,
        fontFamily: "Cochin",
        alignSelf:"center",
    },
    headerText: {
        fontSize: 25,
        margin: 10,
        color: 'black',
        fontWeight: "bold"
    },
    drawer: {
        position: 'absolute',
        top: (Platform.OS == 'ios') ? 20 : 0,
        right: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        flexDirection: 'row',
    },
    drawerContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderColor:"gray",
        borderWidth:1
    },
    menuLayout: {
        marginBottom: 1,
        backgroundColor: 'white',
        width: '100%',
        fontSize: 25,
        color: 'black',
        padding: 10,
    },


});

