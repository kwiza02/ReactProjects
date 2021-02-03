//PlanHeader

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
import Slider from '@react-native-community/slider';

import { getFontSize, getLayoutSize } from '../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class PlanHeader extends Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.viewstyle}>
                    <TouchableOpacity style={styles.image} onPress={() => { this.props.navigation.navigate(this.props.screen) }}>
                        <Image source={this.props.imgSrc} style={styles.image} />
                    </TouchableOpacity>
                    <Image source={this.props.title} style={styles.logo}></Image>
                    <View style={{flexDirection:"row",position:"absolute",right:getLayoutSize(15),justifyContent:"flex-start"}}>
                        <View style={{ borderWidth: 1, borderColor:"#868686",borderRadius:15,justifyContent:"center",height:getLayoutSize(30),width:getLayoutSize(30)}}>
                            <Text style={{color:"#dedede",alignSelf:"center"}}>JD</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderBottomColor: "#868686",
        borderWidth: 0.1,
        height: getLayoutSize(60),
        justifyContent: "center",
        width: "100%",
    },
    viewstyle: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
    },
    image: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        tintColor: "white",
        alignItems: "flex-end",
        position: 'absolute',
        left: getLayoutSize(6),
    },
    logo: {
        height: getLayoutSize(25),
        width: getLayoutSize(70),
        alignSelf: "center",
        position: "absolute",
        tintColor: "#00f3b9",
    },
});