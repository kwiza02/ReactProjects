//Profile

import React, { Component } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
    Text,
    View,
    Image,
    BackHandler,
    StyleSheet,
    TouchableHighlight,
    Alert,
} from 'react-native';

import Post from '../Screens/Post';
import About from '../Screens/About';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();

export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state={
            isFollow:false,
            onMouseTap:false,
            name:props.route.params.name,
        };
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

    updateBlock(flag){
        
        if (!this.state.onMouseTap){
            Alert.alert(
                'Alert',
                'ID successfully blocked.',
                [
                    { text: 'OK', onPress: () => this.setState({ onMouseTap: true }) },
                ],
                { cancelable:true }
            )
        }
        else {
            Alert.alert(
                'Alert',
                'ID successfully unblocked.',
                [
                    { text: 'OK', onPress: () => this.setState({ onMouseTap:false }) },
                ],
                { onMouseTap: true }
            )
        }
       
    }

    render() {
        return (

            <View style={{flex:1,backgroundColor:"white"}}>

                <View style={{ flexDirection: "row", borderBottomColor: "gray", borderWidth: 1, height: 65, }}>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Home") }} style={{ marginTop: 18 }}>

                        <Image source={require("../Assets/leftArrow.png")} style={{ height: 30, width: 30, alignSelf: "center", marginLeft: 20 }} />

                    </TouchableOpacity>

                    <Text style={{ fontWeight: "bold", fontSize: 20, alignSelf: "center", marginLeft: 10, }}>{this.state.name}</Text>

                </View>



                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginBottom: 20, marginLeft: 10 }} >
                            <Image style={{ height: 70, width: 70, borderRadius: 35, marginBottom: 10, marginTop: 20 }} source={require("../Assets/person.png")} />
                            <Text style={{ fontSize: 15, color: "black", fontWeight: "bold" }}>Narendra Modi</Text>
                            <Text style={{ fontSize: 12, marginTop: 8, color: "gray" }}>Prime Minister of India</Text>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 30 }}>
                            <Text style={{ marginRight: 15, fontWeight: "bold", marginLeft: 20 }}>{"\t\t"}2 {"\n\n"}<Text style={{ fontWeight: "normal", fontSize: 15 }}> Posts</Text> </Text>
                            
                            <Text style={{ marginRight: 15, fontWeight: "bold" }}>{"\t\t\t"} 6{"\n\n"}
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Followers")}}>
                                    <Text style={{ fontWeight: "normal", fontSize: 15 }}> Followers</Text>
                                    </TouchableOpacity>
                            </Text>
                            
                            <Text style={{ marginRight: 15, fontWeight: "bold" }}> {"\t\t\t"}8 {"\n\n"}
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Following")}}>
                                    <Text style={{ fontWeight: "normal", fontSize: 15 }}> Following</Text>
                                    </TouchableOpacity>
                            </Text>
                        
                        </View>
                
                    </View>

                    <View style={{flexDirection:"row",marginBottom:20}}>

                        <TouchableHighlight underlayColor='#DFE1E3' onPress={() => this.setState({ isFollow: !this.state.isFollow })} style={{marginLeft:15}} >
                            {this.state.isFollow === true ?
                                <View style={styles.followouter}>
                                    <Text style={{ color: 'black', fontSize: 15 }}>Follow</Text>
                                </View>
                                :
                                <View style={styles.unfollowouter}>
                                    <Text style={{ color: '#36292a', fontSize: 15 }}>Unfollow</Text>
                                </View>
                            }
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor='#DFE1E3' onPress={() => this.props.navigation.navigate("Comment")} style={{ marginLeft: 20 }} >
                        
                            <View style={styles.unfollowouter}>
                                <Text style={{ color: '#36292a', fontSize: 15 }}>Message</Text>
                            </View>
                        
                        </TouchableHighlight>

                    <TouchableHighlight
                     underlayColor='#DFE1E3' 
                        onPress={() => {
                            this.state.onMouseTap == true ? this.updateBlock(true) : this.updateBlock(false);
                        }} style={{ marginLeft:15}} >
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 30,
                            height: 30,
                            borderRadius: 4,
                            borderWidth: 1,
                            marginTop: 10,
                            borderColor: '#999296'}}>   
                            <Image source={require("../Assets/signal.png")} style={{width:20,height:20,tintColor:this.state.onMouseTap===true ? "red" : "gray"}}/>
                        </View>
                    
                    </TouchableHighlight>


                </View>

                 <Tab.Navigator 
               
                tabBarOptions={{
                    indicatorStyle:{
                        backgroundColor:"black"
                    },
                    style:{
                    borderWidth:0.5,
                    borderColor:"gray",
                }
                }}
                >
                    <Tab.Screen name="Post" component={Post} options={{title:"POSTS"}} />
                    <Tab.Screen name="About" component={About} options={{ title: "ABOUT" }}/>

                </Tab.Navigator>

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
        height: 30,
        alignItems: "center",
        borderWidth: 1,
        fontFamily: "Cochin",
        alignSelf: "center",
    },
    followouter: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 160,
        height: 30,
        borderRadius: 4,
        marginTop: 10,
        backgroundColor: 'white',
        borderColor: '#999296',
        borderWidth: 1,
    },
    unfollowouter: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 160,
        height: 30,
        borderRadius: 4,
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#999296',
    },
});

