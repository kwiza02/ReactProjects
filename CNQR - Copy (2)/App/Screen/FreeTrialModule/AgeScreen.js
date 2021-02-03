//AgeScreen

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
import {WheelPicker} from "react-native-wheel-picker-android";

import { button, AppFonts, TrialHeader,Colors,ScaleUtils,TextUtils,String } from '../../Resources/index';
import Utils from '../../Component/Utils';
import ButtonComponent from '../../Component/ButtonComponent';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';
import AsyncStorage from '@react-native-community/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const wheelPickerData = [
    "1","2","3","4","5","6","7","8","9","10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
    "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
    "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
    "61", "62", "63", "64", "65", "66", "67", "68", "69", "70",
    "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
    "81", "82", "83", "84", "85", "86", "87", "88", "89", "90",
    "91", "92", "93", "94", "95", "96", "97", "98", "99", "100",
];

export default class AgeScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedItem: 0,
        };
    }

     async componentDidMount(){
         console.log("Gender--->" + await AsyncStorage.getItem("@gender"))
    }

    onItemSelected = selectedItem => {
        this.setState({selectedItem});
    };

    disableBackButton = () => {
        this.props.navigation.navigate("MaleFemaleScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <TrialHeader imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} value={2} screen={"MaleFemaleScreen"} navigation={this.props.navigation}></TrialHeader>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.header}>{String.sevenStep.AGE_HEADER}</Text>
                        <Text style={styles.headerContent}>{String.sevenStep.AGE_CONTENT}</Text>
                        <Text style={styles.headerContent2}>{String.sevenStep.AGE_CONTENT1}</Text>
                        <View style={styles.picker}>
                            <Image source={require("../../Assets/ImageAndIcons/play.png")} style={styles.playImage}></Image>
                            <WheelPicker
                                selectedItem={this.state.selectedItem}
                                data={wheelPickerData}
                                onItemSelected={this.onItemSelected}
                                selectedItemTextColor={"white"}
                                itemTextColor={"#868686"}
                                selectedItemTextSize={25}
                                selectedItemTextFontFamily={AppFonts.text.font2}
                                itemTextFontFamily={AppFonts.text.font2}
                                itemTextSize={25}
                                initPosition={1}
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.registerButtonView}>
                        <TouchableOpacity style={button.ButtonLoginContainer} onPress={() => { this.props.navigation.navigate("WeightScreen"); AsyncStorage.setItem("@age", JSON.stringify(this.state.selectedItem + 1)) }}>
                            <ButtonComponent text={"NEXT STEP"} />
                        </TouchableOpacity>
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
        padding: ScaleUtils.SEVEN_STEP_SCREEN_PADDING,
    },
    header: {
        fontFamily: AppFonts.text.font2,
        fontSize:TextUtils.SEVEN_STEP_TITLE,
        color: Colors.DEFAULT_APP_FONT_COLOR,
        alignSelf: "center",
        marginTop: ScaleUtils.MARGIN_TWENTY,
    },
    headerContent: {
        color:Colors.DEFAULT_CONTENT_COLOR,
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
    picker:{
        marginTop: ScaleUtils.AUTHENTICATION_BUTTON_MARGIN_TOP,
        height:getLayoutSize(290),
        width: ScaleUtils.IMAGE_WIDTH,
        justifyContent:"center",
        flexDirection:"row",
    },
    playImage:{
        height: ScaleUtils.IMAGE_SIZE_TWENTY, 
        width: ScaleUtils.IMAGE_SIZE_TWENTY, 
        marginTop: getLayoutSize(85), 
    },
    registerButtonView: {
        bottom: ScaleUtils.SEVEN_STEP_BUTTON_BOTTOM,
    },
})