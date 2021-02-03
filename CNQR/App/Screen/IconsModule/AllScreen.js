//AllScreen

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

export default class AllScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    content1: "@EVOLVE.NATION",
                    content2: "HEBA",
                    content3: "ALI",
                    content4: "FITNESS CREATOR",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                },
                {
                    content1: "@EVOLVE.NATION",
                    content2: "JOHN",
                    content3: "MILLER",
                    content4: "FITNESS CREATOR",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                },
                {
                    content1: "@EVOLVE.NATION",
                    content2: "LIZA",
                    content3: "SIAL",
                    content4: "FITNESS CREATOR",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                },
                {
                    content1: "@EVOLVE.NATION",
                    content2: "HEBA",
                    content3: "ALI",
                    content4: "FITNESS CREATOR",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                },
            ],
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "column" }}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("IconDetailScreen") }}>
                    <ImageBackground source={item.imageBackground} style={styles.renderImageBackground}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.renderShadow} >
                            <View style={{ padding: getLayoutSize(20),marginTop:getLayoutSize(40)}}>
                                <Text style={styles.content1}>{item.content1}</Text>
                                <View style={{ marginTop: getLayoutSize(10) }}>
                                    <View style={{flexDirection:"row"}}>
                                        <View style={styles.lineView}></View>
                                        <Text style={styles.content2}>{item.content2}</Text>
                                    </View>
                                    <Text style={styles.content2}>{"\t\t"}{item.content3}</Text>
                                </View>
                                <View style={styles.fitnessCreatorView}>
                                    <Text style={styles.content4}>{item.content4}</Text>
                                </View>
                            </View>
                    </ImageBackground>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={{ flexDirection: "column" }}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(index) => index.toString()}
                            renderItem={this.renderItem.bind(this)}
                            horizontal={false} />
                    </View>
                    <View style={{ marginBottom: getLayoutSize(50) }} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "black",
        flex: 1,
    },
    renderShadow: {
        width: "100%",
        height: getLayoutSize(300),
    },
    renderImageBackground: {
        height: getLayoutSize(300),
        width: "100%",
        justifyContent: "center",
    },
    content1: {
        color: "#dedede",
        fontSize: getFontSize(11),
        fontFamily: AppFonts.text.font4,
    },
    lineView: {
        height: getLayoutSize(40),
        width: getLayoutSize(3),
        backgroundColor: "#00f3b9",
        marginRight: getLayoutSize(10),
        alignSelf: "center",
    },
    content2: {
        color: "#ffffff",
        fontSize: getFontSize(37),
        fontFamily: AppFonts.text.font2,
    },
    fitnessCreatorView:{
        height:getLayoutSize(30),
        width:getLayoutSize(150),
        backgroundColor:"#1e1e1e",
        borderRadius:20,
        justifyContent:"center",
        marginTop: getLayoutSize(15)
    },
    content4: {
        color: "#dedede",
        fontSize: getFontSize(12),
        fontFamily: AppFonts.text.font4,
        alignSelf: "center",
    },
});
