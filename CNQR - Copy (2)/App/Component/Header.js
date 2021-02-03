//Header

import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { getFontSize, getLayoutSize } from './Responsive';
import { Constants } from '../RestAPI/Constants';
import { post } from '../RestAPI/RestAPIHandler';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Header extends Component {

    constructor(props){
        super(props);
        this.state={
            user_id:"",
        };
    }

    async componentDidMount() {
        const user_id = await AsyncStorage.getItem("@user_id");
        this.setState({ user_id: user_id})
    }

    async doLogout() {
        this.setState({ isLoading: true });
        var body = JSON.stringify({
           user_id:this.state.user_id,
        })
        var data = await post(Constants.LOGOUT, body);
        console.log(("Data-->" + JSON.stringify(data)));
        if (data !== null && data.success === "yes" && data.data !== null) {
            AsyncStorage.clear()
            this.props.navigation.navigate("AuthenticationNavigatorStack",{screen:"LoginScreen"});
        } else {
            Alert.alert(data.message)
        }
    }

    render() {
        return (
            <View >
                <View style={styles.container}>     
                    { ! this.props.isBack === true && this.props.isBack1 === false ?
                        <View style={styles.viewstyle}>
                            <TouchableOpacity style={styles.image} onPress={()=>{this.props.navigation.goBack()}}>
                                <Image source={this.props.imgSrc} style={styles.image}  />
                            </TouchableOpacity>
                            <Image source={this.props.title} style={styles.logo}></Image>
                            <View style={{flexDirection:"row",position:"absolute",right:getLayoutSize(15),justifyContent:"flex-start"}}>
                                <TouchableOpacity  style={styles.logoutView} onPress={() => Alert.alert(
                                    'Logout',
                                    'Are you sure want to Logout ?',
                                    [
                                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                        { text: 'OK', onPress: () => {this.doLogout()}},
                                    ],
                                    { cancelable: false }
                                )}>
                                    <Text style={styles.logoutText}>LOGOUT</Text>
                                    <Image source={this.props.imgLogout} style={styles.image2} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    :
                        ! this.props.isBack === true ?
                            <Image source={this.props.title} style={styles.logo}></Image> 
                        :
                            <View style={styles.viewstyle}>
                                <TouchableOpacity style={styles.image} onPress={()=>{this.props.navigation.navigate(this.props.screen)}}>
                                    <Image source={this.props.imgSrc} style={styles.image}  />
                                </TouchableOpacity>
                                <Image source={this.props.title} style={styles.logo}></Image>
                            </View>
                        
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        borderBottomColor: "#868686", 
        borderWidth: 0.2, 
        height: getLayoutSize(60),
        justifyContent:"center",
        width:"100%",
    },
    viewstyle: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
    },
    image:{
        height: getLayoutSize(25), 
        width: getLayoutSize(25), 
        tintColor: "white", 
        alignItems:"flex-end",
        position:'absolute',
        left:getLayoutSize(6),
    },
    logo:{
        height:getLayoutSize(25),
        width:getLayoutSize(70),
        alignSelf: "center", 
        position:"absolute",
        tintColor:"#00f3b9",
    },
    logoutView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"flex-start",
        position:"absolute",
        alignSelf:"center",
        right:getLayoutSize(15),
    },
    logoutText: {
        fontWeight: "bold",
        color: "#cbc7c5",
        fontSize: getFontSize(12),
        alignSelf:"center",
    },
    image2: {
        height: getLayoutSize(18),
        width: getLayoutSize(18),
        tintColor: "#cbc7c5",
        alignItems:"flex-start",
        left:getLayoutSize(10),
    },    
});
