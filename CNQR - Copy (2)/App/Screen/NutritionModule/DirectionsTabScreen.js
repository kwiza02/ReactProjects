//DirectionsTabScreen

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

import { button, AppFonts, TrialHeader,Colors,TextUtils,ScaleUtils } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class DirectionsTabScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    content: "Avacado Oil Spray",
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

    renderItem({ item }) {
        return (
            <View style={{ flexDirection: "row", justifyContent: "flex-start", padding: ScaleUtils.SCREEN_PADDING,}}>
                <View style={styles.dotView}></View>
                <Text style={styles.content}>{item.content}</Text>
            </View>
        );
    }

    renderSeprator() {
        return (
            <View style={{
                marginLeft: getLayoutSize(20),
                borderColor: "#1c1c1c",
                borderWidth: 1,
                marginRight: getLayoutSize(20),
            }}></View>
        );
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(index) => index.toString()}
                    renderItem={this.renderItem.bind(this)}
                    horizontal={false}
                    ItemSeparatorComponent={this.renderSeprator} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
    },
    dotView: {
        borderWidth: 1,
        backgroundColor:Colors.COLOR_PRIMARY,
        borderRadius: 4,
        height: getLayoutSize(8),
        width: getLayoutSize(8),
        alignSelf: "center"
    },
    content: {
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        alignSelf: "center",
        fontFamily: AppFonts.text.font3,
        marginLeft: getLayoutSize(15)
    },
});