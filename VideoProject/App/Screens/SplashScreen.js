//SplashScreen

import React, { Component } from 'react';

import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

import { getLayoutSize, getFontSize } from '../Component/Responsive';
import {Colors,AppFonts} from '../Resources/index';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connectionStatus:true,
        };
    }

    componentDidMount() {
        NetInfo.fetch().then((state) => {
            if (state.isConnected == true) {
                setTimeout(() => {
                    this.props.navigation.navigate("CategoryListScreen")
                }, 2000);
            } else {
                this.setState({
                    connectionStatus: false,
                });
            }
        });
    }

    componentDidUpdate() {
        setTimeout(() => {
            NetInfo.fetch().then((state) => {
                if (state.isConnected == true) {
                    setTimeout(() => {
                        this.props.navigation.navigate('CategoryListScreen');
                    }, 2000);
                } else {
                    this.setState({
                        connectionStatus: false,
                    });
                }
            });
        }, 5000);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <StatusBar
                    barStyle="light-content"
                    hidden={true}
                    backgroundColor='black'
                    translicent={false}
                    networkActivityIndicatorVisible={true}
                />
                {this.state.connectionStatus == true ? (
                    <Text style={styles.welcomeText}>Welcome</Text>

                ) : (
                        <View style={styles.checkConnectionView}>
                            <Text style={styles.checkConnectionText}>No Internet, Please Connect with Internet</Text>
                        </View>
                    )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:Colors.BACKGROUND_COLOR,
        justifyContent:"center",
    },
    welcomeText:{
        color:Colors.COLOR_PRIMARY,
        fontFamily:AppFonts.text.font2,
        fontSize:getFontSize(30),
        justifyContent:"center",
        alignSelf:"center",
    },
    checkConnectionView:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    checkConnectionText:{
        fontFamily:AppFonts.text.font3,
        color:Colors.TITLE_COLOR,
        fontSize:getFontSize(18)
    },
});
