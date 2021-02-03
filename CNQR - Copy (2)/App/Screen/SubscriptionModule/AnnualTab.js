//AnnualTab

import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';

import {AppFonts,Colors} from '../../Resources/index';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';

export default class AnnualTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    content: "WORKOUT PLANS"
                },
                {
                    content: "FITNESS  ADVICE"
                },
                {
                    content: "MEAL  PLANS"
                },
                {
                    content: "EXCLUSIVE  ARTICLES"
                },
                {
                    content: "PROGRESS  TRACKER"
                },
                {
                    content: "2 DAY FREE TRIAL"
                },
            ],
        };
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.headerView}>
                        <Text style={styles.headerText}>MOST POPULAR</Text>
                    </View>
                    <ScrollView>
                        <View style={styles.content}>
                            <View style={styles.planView}>
                                <Image source={require("../../Assets/ImageAndIcons/money.png")} style={styles.imageMonth}></Image>
                                <Text style={styles.imageMonthText}>6<Text style={{ fontSize: getFontSize(17), color: "#fefefe" }}>.99 <Text style={{ color: "#bbbbbb" }}>per month</Text></Text></Text>
                            </View>
                            <View style={styles.planView}>
                                <Image source={require("../../Assets/ImageAndIcons/money.png")} style={styles.image}></Image>
                                <Text style={styles.imageText}>79<Text style={{ fontSize: getFontSize(12), color: "#575656" }}>.99 billed annually</Text></Text>
                            </View>
                            {this.state.data.map((item) => (
                                <View style={styles.listView}>
                                    <Image source={require("../../Assets/ImageAndIcons/tick.png")} style={styles.listImage}></Image>
                                    <Text style={styles.listText}>{item.content}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
        justifyContent: "center",
    },
    container: {
        alignSelf: "center",
        backgroundColor: "#151515",
        width:"90%",
        height: getLayoutSize(410),
        borderRadius: 5,
        marginTop: getLayoutSize(10),
    },
    headerView: {
        backgroundColor: "#0ff5bb",
        width: getLayoutSize(120),
        height: getLayoutSize(30),
        borderRadius: 20,
        justifyContent: "center",
        marginLeft: getLayoutSize(20),
        marginTop: getLayoutSize(-10),
        position: "relative",
    },
    headerText: {
        color: "black",
        fontSize: getFontSize(10),
        alignSelf: "center",
        fontFamily: AppFonts.text.font4,
    },
    content: {
        padding: getLayoutSize(20),
    },
    planView: {
        flexDirection: "row",
    },
    imageMonth: {
        height: getLayoutSize(40),
        width: getLayoutSize(40),
        alignSelf: "center",
        tintColor: Colors.DEFAULT_APP_FONT_COLOR,
    },
    imageMonthText: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font3,
        fontSize: getFontSize(32),
        alignSelf: "center"
    },
    image: {
        height: getLayoutSize(28),
        width: getLayoutSize(28),
        alignSelf: "center",
        tintColor: Colors.DEFAULT_CONTENT_COLOR,
    },
    imageText: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        fontSize: getFontSize(17),
        alignSelf: "center",
        fontFamily: AppFonts.text.font3,
    },
    listView: {
        marginTop: getLayoutSize(20),
        flexDirection: "row",
    },
    listText: {
        alignSelf: "center",
        marginLeft: getLayoutSize(16),
        color: "#e4e4e4",
        fontFamily: AppFonts.text.font4,
        fontSize: getFontSize(13.5),
    },
    listImage: {
        tintColor: "#0dd5a2",
        width: getLayoutSize(25),
        height: getLayoutSize(25),
        alignSelf: "center",
    },
});
   