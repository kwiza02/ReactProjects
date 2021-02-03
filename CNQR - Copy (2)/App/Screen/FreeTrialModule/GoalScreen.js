//GoalScreen

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
    ActivityIndicator,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { button, AppFonts, TrialHeader ,Colors,ScaleUtils,TextUtils,String} from '../../Resources/index';
import ButtonComponent from '../../Component/ButtonComponent';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';
import { Constants } from '../../RestAPI/Constants';
import { post ,get} from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class GoalScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            indexChecked:0,
            flag:false,
            data:[],
            isLoading:false,
        };
    }

    async componentDidMount() {
        console.log("WeightType--->" + await AsyncStorage.getItem("@weightType"))
        console.log("Count--->" + await AsyncStorage.getItem("@kg"))
        console.log("Count2--->" + await AsyncStorage.getItem("@lbs"))
        this.setState({ isLoading: true });
        var data = await get(Constants.GET_GOALS);
        console.log("URL " + JSON.stringify(data.data));
        this.setState({ data: data.data, isLoading: false });
    }

    disableBackButton = () => {
        this.props.navigation.navigate("WeightScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    renderItem({ item}) {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.setState({ indexChecked: item.id, flag: !this.state.flag }); }}>
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
                <TrialHeader imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} value={4}  screen={"WeightScreen"} navigation={this.props.navigation}></TrialHeader>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.header}>{String.sevenStep.GOAL_HEADER}</Text>
                        <Text style={styles.headerContent}>{String.sevenStep.GOAL_CONTENT}</Text>
                        <Text style={styles.headerContent2}>{String.sevenStep.GOAL_CONTENT1}</Text>
                        <Text style={styles.headerContent2}>{String.sevenStep.GOAL_CONTENT2}</Text>
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
                            <TouchableOpacity style={button.ButtonLoginContainer} onPress={() => { this.state.flag === true ? this.props.navigation.navigate("CurrentActivityScreen",) 
                                : 
                                Utils.DialogBox("Alert", "Please select any of above goal.");
                                this.setState({ indexChecked: 0, flag: false }); 
                                AsyncStorage.setItem("@goalId", this.state.indexChecked+"") }}>
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
    goalView:{
        height:getLayoutSize(150),
        width: ScaleUtils.IMAGE_WIDTH,
        borderWidth:1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        borderBottomColor: Colors.DEFAULT_CONTENT_COLOR,
        borderBottomWidth:1,
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
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        padding:getLayoutSize(10),
        fontFamily: AppFonts.text.font3,
    },
    correctActiveImage: {
        width:ScaleUtils.IMAGE_SIZE_TWENTY,
        height: ScaleUtils.IMAGE_SIZE_TWENTY,
        tintColor:Colors.COLOR_PRIMARY,
        resizeMode: "contain",
        position:"absolute",
        margin: ScaleUtils.MARGIN_TOP_TEN,
    },
    renderView:{
        borderWidth:1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        top:getLayoutSize(40),
    },
    registerButtonView: {
        marginTop: getLayoutSize(90),
    },
})