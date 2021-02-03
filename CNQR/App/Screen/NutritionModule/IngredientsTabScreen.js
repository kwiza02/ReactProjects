//IngredientsTabScreen

import React, { Component, useState, useEffect } from 'react';

import {
    Image,
    ImageBackground,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    FlatList,
} from 'react-native';

import { button, AppFonts, TrialHeader, } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class IngredientsTabScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            data:[
                {
                    content:"Avacado Oil Spray",
                },
                {
                    content: "2lb Jumbo Shrimp,Peeled",
                },
                {
                    content: "Avacado Oil Spray",
                },
                {
                    content: "Avacado Oil Spray",
                },
                {
                    content: "Avacado Oil Spray",
                },
                {
                    content: "Avacado Oil Spray",
                },
                {
                    content: "Avacado Oil Spray",
                },
                {
                    content: "Avacado Oil Spray",
                },
                {
                    content: "Avacado Oil Spray",
                },
            ],
        };
    }

    renderItem({item}){
        return(
            <View style={{flexDirection:"row",justifyContent:"flex-start",padding:getLayoutSize(20)}}>
                <View style={styles.dotView}></View>
                <Text style={styles.content}>{item.content}</Text>
            </View>
        );
    }

    renderSeprator(){
        return(
            <View style={{
                marginLeft:getLayoutSize(20),
                borderColor:"#1c1c1c",
                borderWidth:1,
                marginRight: getLayoutSize(20),
            }}></View>
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(index) => index.toString()}
                    renderItem={this.renderItem.bind(this)}
                    horizontal={false} 
                    ItemSeparatorComponent={this.renderSeprator}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "black",
        flex: 1,
    },
    dotView:{
        borderWidth: 1, 
        backgroundColor: "#00f3b9", 
        borderRadius: 4, 
        height: getLayoutSize(8), 
        width: getLayoutSize(8), 
        alignSelf: "center"
    },
    content:{
        color: "#dedede", 
        fontSize: getFontSize(15), 
        alignSelf: "center", 
        fontFamily: AppFonts.text.font3, 
        marginLeft: getLayoutSize(15)
    },
});