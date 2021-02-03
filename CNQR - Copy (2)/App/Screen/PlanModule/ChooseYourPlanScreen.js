//ChooseYourPlanScreen

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
    Alert,ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';
import { button, AppFonts, PlanHeader ,Colors,TextUtils,ScaleUtils,String} from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
console.disableYellowBox = true;

export default class ChooseYourPlanScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recommended_plan_list:[],
            isLoading:false,
        };
    }

    async componentDidMount(){
        this.doRecommendedPlanList()
    }

    async doRecommendedPlanList() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                trainer_id: "",
                page: 1,
            })
            var data = await post(Constants.RECOMMENDED_PLAN_LIST, body);
            console.log(("Data-->" + JSON.stringify(data)));

            this.setState({ recommended_plan_list: data.data })

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })

            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert", "Please check your internet connection.")
        }
    }

    renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: "column" }}>
                <ImageBackground source={{ uri: item.trainer_picture }} style={styles.renderImageBackground} imageStyle={styles.renderImageStyle}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("AuthenticationNavigatorStack", { screen: "SelectPlanScreen"}); AsyncStorage.setItem("@plan_list_id", JSON.stringify(item.id))}}>
                        <View style={styles.renderBoxView}>
                            <Text style={styles.content1}>{item.category_name}</Text>
                            <View style={{ marginTop: getLayoutSize(5) }}>
                                <Text style={styles.content2}>{item.name}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../../Assets/ImageAndIcons/dumbell.png")} style={styles.renderImage} />
                                <Text style={styles.content4}>{item.days_week}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt.png")} style={styles.renderImage} />
                                <Text style={styles.content4}>{item.weeks}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <PlanHeader title={require("../../Assets/ImageAndIcons/logo.png")}
                    imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")}
                    isBack={true}
                    screen={"SelectPlanScreen"}
                    navigation={this.props.navigation} />
                <View style={styles.container}>
                    <Text style={styles.header}>{String.choosePlanScreen.CHOOSE_PLAN_FONT}</Text>
                    <Text style={styles.headerContent}>{String.choosePlanScreen.CHOOSE_PLAN_CONTENT}</Text>
                    <Text style={styles.headerContent2}>{String.choosePlanScreen.CHOOSE_PLAN_CONTENT1}</Text>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: getLayoutSize(70) }}>
                        <Text style={styles.planText}>SELECTED PLANS</Text>
                        <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        {this.state.isLoading === true ?
                            <ActivityIndicator size="small" color="#ffffff" /> : (
                                this.state.recommended_plan_list.length !== 0 ?
                        <FlatList
                            data={this.state.recommended_plan_list}
                            keyExtractor={(index) => index.toString()}
                            renderItem={this.renderItem.bind(this)}
                            horizontal={true} />
                                    : <Text style={{ color: "White" }}>No Records</Text>
                            )}
                    </View>
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
    container: {
        flex: 1,
        padding: ScaleUtils.SCREEN_PADDING,
    },
    header: {
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.TEXT_SIZE_TENTYFIVE,
        color: Colors.DEFAULT_APP_FONT_COLOR,
        alignSelf: "center",
        marginTop: ScaleUtils.MARGIN_TWENTY,
    },
    headerContent: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        alignSelf: "center",
        marginTop: ScaleUtils.MARGIN_TWENTY,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
    },
    headerContent2: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        alignSelf: "center",
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
    },
    planText: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        marginTop: getLayoutSize(-12),
        fontFamily: AppFonts.text.font4,
    },
    codeImage: {
        tintColor: Colors.DEFAULT_CONTENT_COLOR,
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: ScaleUtils.IMAGE_SIZE_THIRTY,
        marginTop: getLayoutSize(-15),
        marginRight: ScaleUtils.MARGIN_TOP_TEN,
    },
    renderShadow: {
        width: ScaleUtils.IMAGE_WIDTH,
        height: screenHeight,
    },
    renderImageBackground: {
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
        height: getLayoutSize(350),
        width: getLayoutSize(300),
        justifyContent: "center",
        marginRight: ScaleUtils.MARGIN_TOP_FIFTEEN,
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
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width: "92%",
        alignSelf: "center",
        padding: getLayoutSize(10),
    },
    content1: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font4,
        marginTop: ScaleUtils.MARGIN_TWENTY
    },
    content2: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_THIRTY,
        fontFamily: AppFonts.text.font1,
    },
    content4: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
    },
    renderImage: {
        height: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        width:ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        tintColor: Colors.DEFAULT_SUB_CONTENT_COLOR,
        marginRight: ScaleUtils.MARGIN_TOP_TEN,
        alignSelf: "center",
    },
});