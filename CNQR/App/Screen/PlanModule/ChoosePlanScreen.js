//ChoosePlanScreen

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

import { button, AppFonts, PlanHeader } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
console.disableYellowBox = true;

export default class ChoosePlanScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    content1: "WEIGHT LOSS",
                    content2: "SUMMER",
                    content3: "SHRED",
                    content4: "5 per week",
                    content5: "8 weeks",
                    image1: require("../../Assets/ImageAndIcons/dumbell.png"),
                    image2: require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png"),
                    image3: require("../../Assets/ImageAndIcons/fitness_girl.jpg"),
                },
                {
                    content1: "WEIGHT LOSS",
                    content2: "SUMMER",
                    content3: "SHRED",
                    content4: "5 per week",
                    content5: "8 weeks",
                    image1: require("../../Assets/ImageAndIcons/dumbell.png"),
                    image2: require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png"),
                    image3: require("../../Assets/ImageAndIcons/fitness_girl.jpg"),
                },
                {
                    content1: "WEIGHT LOSS",
                    content2: "SUMMER",
                    content3: "SHRED",
                    content4: "5 per week",
                    content5: "8 weeks",
                    image1: require("../../Assets/ImageAndIcons/dumbell.png"),
                    image2: require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png"),
                    image3: require("../../Assets/ImageAndIcons/fitness_girl.jpg"),
                },
                {
                    content1: "WEIGHT LOSS",
                    content2: "SUMMER",
                    content3: "SHRED",
                    content4: "5 per week",
                    content5: "8 weeks",
                    image1: require("../../Assets/ImageAndIcons/dumbell.png"),
                    image2: require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png"),
                    image3: require("../../Assets/ImageAndIcons/fitness_girl.jpg"),
                },
            ],
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "column" }}>
                <ImageBackground source={item.image3} style={styles.renderImageBackground} imageStyle={styles.renderImageStyle}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("SelectPlanScreen") }}>
                        <View style={styles.renderBoxView}>
                            <Text style={styles.content1}>{item.content1}</Text>
                            <View style={{ marginTop: getLayoutSize(5) }}>
                                <Text style={styles.content2}>{item.content2}</Text>
                                <Text style={styles.content2}>{item.content3}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={item.image1} style={styles.renderImage} />
                                <Text style={styles.content4}>{item.content4}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={item.image2} style={styles.renderImage} />
                                <Text style={styles.content4}>{item.content5}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <PlanHeader title={require("../../Assets/ImageAndIcons/logo.png")}
                    imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")}
                    isBack={true}
                    screen={"SelectPlanScreen"}
                    navigation={this.props.navigation} />
                    <View style={styles.container}>
                    <Text style={styles.header}>CHOOSE YOUR PLAN</Text>
                    <Text style={styles.headerContent}>Start your change with one of the following</Text>
                    <Text style={styles.headerContent2}>selected plans for you created by tge CNQR icons</Text>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: getLayoutSize(70) }}>
                        <Text style={styles.planText}>SELECTED PLANS</Text>
                        <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(index) => index.toString()}
                            renderItem={this.renderItem.bind(this)}
                            horizontal={true} />
                    </View>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "black",
        flex: 1,
    },
    container: {
        flex: 1,
        padding: getLayoutSize(20),
    },
    header: {
        fontFamily: AppFonts.text.font2,
        fontSize: getFontSize(25),
        color: "white",
        alignSelf: "center",
        marginTop: getLayoutSize(20),
    },
    headerContent: {
        color: "#868686",
        alignSelf: "center",
        marginTop: getLayoutSize(20),
        fontSize: getFontSize(13),
        fontFamily: AppFonts.text.font3,
    },
    headerContent2: {
        color: "#868686",
        alignSelf: "center",
        fontSize: getFontSize(13),
        fontFamily: AppFonts.text.font3,
    },
    planText: {
        color: "#dedede",
        fontSize: getFontSize(15),
        marginTop: getLayoutSize(-12),
        fontFamily: AppFonts.text.font4,
    },
    codeImage: {
        tintColor: "#868686",
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        marginTop: getLayoutSize(-15),
        marginRight: getLayoutSize(10),
    },
    renderShadow: {
        width: "100%",
        height: screenHeight,
    },
    renderImageBackground: {
        marginTop: getLayoutSize(30),
        height: getLayoutSize(350),
        width: getLayoutSize(300),
        justifyContent: "center",
        marginRight: getLayoutSize(15),
    },
    renderImageStyle: {
        resizeMode: "cover",
        borderColor: "transparent",
        borderRadius: 10,
        opacity: 0.8
    },
    renderBoxView: {
        height: getLayoutSize(330),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#868686",
        width: "92%",
        alignSelf: "center",
        padding: getLayoutSize(10),
    },
    content1: {
        color: "#dedede",
        fontSize: getFontSize(13),
        fontFamily: AppFonts.text.font4,
        marginTop: getLayoutSize(20)
    },
    content2: {
        color: "#ffffff",
        fontSize: getFontSize(30),
        fontFamily: AppFonts.text.font1,
    },
    content4: {
        color: "#e6e6e6",
        fontSize: getFontSize(13),
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
    },
    renderImage: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        tintColor: "#e6e6e6",
        marginRight: getLayoutSize(10),
        alignSelf: "center",
    },
});