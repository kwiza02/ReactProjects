//LifeStyleScreen

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

export default class LifeStyleScreen extends Component {

    render() {
        return (
            <View style={styles.mainContainer}></View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "black",
        flex: 1,
    },
});