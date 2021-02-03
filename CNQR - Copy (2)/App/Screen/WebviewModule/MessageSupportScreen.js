//MessageSupportScreen

import React, { Component } from "react";
import {
    Text,
    View,
    StatusBar,
    Dimensions,
    StyleSheet,
    BackHandler,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
} from "react-native";
import { WebView } from 'react-native-webview';
import HTML from "react-native-render-html";
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import { button, AppFonts, Colors, PlanHeader, TextUtils, ScaleUtils } from '../../Resources/index';
import Utils from '../../Component/Utils';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class MessageSupportScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        var data = await get(Constants.GET_MESSAGE_SUPPORT);
        console.log("URL " + JSON.stringify(data.data));
        this.setState({ data: data.data.content, isLoading: false });
        console.log("DATA--->" + this.state.data);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <PlanHeader title={require("../../Assets/ImageAndIcons/logo.png")}
                    imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")}
                    isBack={true}
                    screen={"NutritionScreens"}
                    navigation={this.props.navigation} />
                <View style={styles.container}>
                    <HTML html={this.state.data} contentWidth={screenWidth} baseFontStyle={styles.htmlContentText} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
    },
    container:{
        padding:ScaleUtils.SCREEN_PADDING,
        justifyContent:"center"
    },
    htmlContentText: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        lineHeight: 20,
        fontSize: getFontSize(18),
        marginLeft: getLayoutSize(35),
        marginTop: ScaleUtils.MARGIN_TOP_TEN,
    },
})