//NutritionScreen

import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    StatusBar,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
    ScrollView,
} from 'react-native';
import { WheelPicker } from "react-native-wheel-picker-android";

import { button, AppFonts, TrialHeader } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const wheelPickerData = [
    "VEGAN",
    "PESCETARIAN",
    "STANDARD",
    "lorem ipsum dolor sit amet,consectetur \n adipisicing elit,sed to eiusmod tempor.",
    "VEGETARIAN",
    "LACTO VEGETARIAN"
];

export default class NutritionScreen extends Component {

    state = {
        selectedItem: 0
    };

    onItemSelected = selectedItem => {
        this.setState({ selectedItem });
    };

    disableBackButton = () => {
        this.props.navigation.navigate("CurrentActivityScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TrialHeader imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} value={6} screen={"CurrentActivityScreen"} navigation={this.props.navigation} ></TrialHeader>
                <View style={styles.container}>
                    <ScrollView>
                    <Text style={styles.header}>WHAT'S YOUR</Text>
                    <Text style={styles.header2}>NUTRITION TYPE?</Text>
                    <Text style={styles.headerContent}>This is so we can understand how much</Text>
                    <Text style={styles.headerContent2}>energy you burn without any exercise.</Text>
                    <View style={styles.picker}>
                        <Image source={require("../../Assets/ImageAndIcons/play.png")} style={styles.playImage}></Image>
                        <WheelPicker
                            selectedItem={this.state.selectedItem}
                            data={wheelPickerData}
                            onItemSelected={this.onItemSelected}
                            selectedItemTextColor={"white"}
                            itemTextColor={"#868686"}
                            selectedItemTextSize={18}
                            selectedItemTextFontFamily={AppFonts.text.font2}
                            itemTextFontFamily={AppFonts.text.font2}
                            itemTextSize={18}
                        />
                    </View>
                    <View style={styles.registerButtonView}>
                        <TouchableOpacity style={button.ButtonLoginContainer} onPress={() => { this.props.navigation.navigate("AllergiesScreen") }}>
                            <Text style={button.mainScreenButtonLoginText}>NEXT STEP</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
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
        padding: getLayoutSize(25),
    },
    header: {
        fontFamily: AppFonts.text.font2,
        fontSize: getFontSize(28),
        color: "white",
        alignSelf: "center",
        marginTop: getLayoutSize(20),
    },
    header2: {
        fontFamily: AppFonts.text.font2,
        fontSize: getFontSize(28),
        color: "white",
        alignSelf: "center",
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
    picker: {
        marginTop: getLayoutSize(50),
        height: getLayoutSize(300),
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
    },
    playImage: {
        height: 20,
        width: 20,
        marginTop: getLayoutSize(60),
        marginRight:getLayoutSize(50),
    },
    registerButtonView: {
        marginTop: getLayoutSize(90),
    },
})