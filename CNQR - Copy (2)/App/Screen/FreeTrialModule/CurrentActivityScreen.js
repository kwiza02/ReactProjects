//CurrentActivityScreen

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { button, AppFonts, TrialHeader ,Colors,ScaleUtils,TextUtils,String} from '../../Resources/index';
import ButtonComponent from '../../Component/ButtonComponent';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';
import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class CurrentActivityScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            indexChecked:0,
            flag:false,
            data: [],
            isLoading:false,
        };
    }

    async componentDidMount() {
        console.log("Id=>" + await AsyncStorage.getItem("@goalId"));
        this.setState({ isLoading: true });
        var data = await get(Constants.GET_ACTIVITYLEVEL);
        console.log("URL " + JSON.stringify(data.data));
        this.setState({ data: data.data, isLoading: false });
    }

    disableBackButton = () => {
        this.props.navigation.navigate("GoalScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    renderItem({ item }) {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.setState({ indexChecked: item.id, flag: !this.state.flag }) }}>
                    {this.state.indexChecked === item.id ?
                        <View style={styles.goalViewSelected}>
                            <Image source={require("../../Assets/ImageAndIcons/correct.png")} style={styles.correctActiveImage}></Image>
                            <Text style={styles.goalHeader}>{item.title}</Text>
                            <Text style={styles.goalHeaderContent}>{item.description}</Text>
                        </View>
                        :
                        <View style={styles.goalView}>
                            <Text style={styles.goalHeader}>{item.title}</Text>
                            <Text style={styles.goalHeaderContent}>{item.description}</Text>
                        </View>
                    }
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TrialHeader imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} value={5} screen={"GoalScreen"} navigation={this.props.navigation}></TrialHeader>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.header}>{String.sevenStep.ACTIVITY_HEADER1}</Text>
                        <Text style={styles.header2}>{String.sevenStep.ACTIVITY_HEADER2}</Text>
                        <Text style={styles.header2}>{String.sevenStep.ACTIVITY_HEADER3}</Text>
                        <Text style={styles.headerContent}>{String.sevenStep.ACTIVITY_CONTENT}</Text>
                        <Text style={styles.headerContent2}>{String.sevenStep.ACTIVITY_CONTENT1}</Text>
                        <View style={styles.renderView}>
                            {this.state.isLoading === true ?
                                <ActivityIndicator size="small" color="#0000ff" /> : (
                                    this.state.data.length !== 0 ?
                                        <FlatList
                                            data={this.state.data}
                                            keyExtractor={({ id }, index) => id}
                                            renderItem={this.renderItem.bind(this)}
                                        />
                                        : <Text>No Records</Text>
                                )}
                        </View>
                        <View style={styles.registerButtonView}>
                            <TouchableOpacity style={button.ButtonLoginContainer} onPress={() => {this.state.flag===true ? this.props.navigation.navigate("NutritionScreen"): Utils.DialogBox("Alert","Please select any of above current activtiy level.");
                                this.setState({ indexChecked: 0, flag: false }); AsyncStorage.setItem("@activityId", this.state.indexChecked + "") }}>
                                <ButtonComponent text={"NEXT STEP"} />
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
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
    },
    container: {
        flex: 1,
        padding: ScaleUtils.SEVEN_STEP_SCREEN_PADDING,
    },
    header: {
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.SEVEN_STEP_TITLE,
        color: Colors.DEFAULT_APP_FONT_COLOR,
        alignSelf: "center",
        marginTop: ScaleUtils.MARGIN_TWENTY,
    },
    header2: {
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.SEVEN_STEP_TITLE,
        color: Colors.DEFAULT_APP_FONT_COLOR,
        alignSelf: "center",
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
    goalView: {
        height: getLayoutSize(150),
        width: ScaleUtils.IMAGE_WIDTH,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        borderBottomColor: Colors.DEFAULT_CONTENT_COLOR,
        borderBottomWidth: 1,
    },
    goalViewSelected: {
        height: getLayoutSize(150),
        width: ScaleUtils.IMAGE_WIDTH,
        borderWidth: 1,
        borderColor: Colors.COLOR_PRIMARY,
        borderBottomColor:Colors.COLOR_PRIMARY,
        borderBottomWidth: 1,
    },
    goalHeader: {
        fontFamily: AppFonts.text.font1,
        fontSize: TextUtils.TEXT_SIZE_EIGHTEEN,
        color: Colors.DEFAULT_APP_FONT_COLOR,
        alignSelf: "center",
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
    },
    goalHeaderContent: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        alignSelf: "center",
        marginTop: ScaleUtils.MARGIN_TOP_TEN,
        padding:getLayoutSize(10),
        fontSize:TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily: AppFonts.text.font3,
    },
    correctActiveImage: {
        width: ScaleUtils.IMAGE_SIZE_TWENTY,
        height: ScaleUtils.IMAGE_SIZE_TWENTY,
        tintColor:Colors.COLOR_PRIMARY,
        resizeMode: "contain",
        position: "absolute",
        margin:ScaleUtils.MARGIN_TOP_TEN,
    },
    renderView: {
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        top: ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP,
    },
    registerButtonView: {
        marginTop: getLayoutSize(80),
    },
})