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
    ActivityIndicator,
} from 'react-native';
import { WheelPicker } from "react-native-wheel-picker-android";
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import Utils from '../../Component/Utils';
import ButtonComponent from '../../Component/ButtonComponent';
import { post, get } from '../../RestAPI/RestAPIHandler';
import { button, AppFonts, TrialHeader,Colors,TextUtils,ScaleUtils,String } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
/*const wheelPickerData = [
    "VEGAN",
    "PESCETARIAN",
    "STANDARD",
    "lorem ipsum dolor sit amet,consectetur \n adipisicing elit,sed to eiusmod tempor.",
    "VEGETARIAN",
    "LACTO VEGETARIAN"
];*/

export default class NutritionScreen extends Component {

   constructor(props){
       super(props);
       this.state = {
           selectedItem: 0,
           data: [],
           pickerTitle:[],
           isLoading: false,
       };
   }

    async componentDidMount() {
        console.log("Id=>" + await AsyncStorage.getItem("@activityId"));
        this.setState({ isLoading: true });
        var data = await get(Constants.GET_NUTRITIONTYPE);
        console.log("URL " + JSON.stringify(data.data));
        this.setState({ isLoading: false });
        for(let i=0;i<data.data.length;i++){
            this.state.pickerTitle.push(
              data.data[i].title
            )
        }
        this.setState({pickerTitle:this.state.pickerTitle,data:data});
        console.log("PickerTitle==>"+JSON.stringify(this.state.pickerTitle));
    }

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
                        <Text style={styles.header}>{String.sevenStep.NUTRITION_HEADER}</Text>
                        <Text style={styles.header2}>{String.sevenStep.NUTRITION_HEADER1}</Text>
                        <Text style={styles.headerContent}>{String.sevenStep.NUTRITION_CONTENT}</Text>
                        <Text style={styles.headerContent2}>{String.sevenStep.NUTRITION_CONTENT1}</Text>
                    <View style={styles.picker}>
                        <Image source={require("../../Assets/ImageAndIcons/play.png")} style={styles.playImage}></Image>
                            {this.state.isLoading === true ?
                                <ActivityIndicator size="small" color="#0000ff" /> : (
                                    this.state.pickerTitle.length !== 0 ?
                        <WheelPicker
                            selectedItem={this.state.selectedItem}
                            data={this.state.pickerTitle}
                            onItemSelected={this.onItemSelected}
                            selectedItemTextColor={"white"}
                            itemTextColor={"#868686"}
                            selectedItemTextSize={18}
                            selectedItemTextFontFamily={AppFonts.text.font2}
                            itemTextFontFamily={AppFonts.text.font2}
                            itemTextSize={18}
                            style={{width:300,height:300}}
                        />
                                        : <Text>No Records</Text>
                                     )}
                    </View>
                    </ScrollView>
                    <View style={styles.registerButtonView}>
                        <TouchableOpacity style={button.ButtonLoginContainer} onPress={() => {
                            this.props.navigation.navigate("AllergiesScreen");
                            AsyncStorage.setItem("@nutritionId", JSON.stringify(this.state.selectedItem + 1));
                            AsyncStorage.setItem("@nutritionType", JSON.stringify(this.state.pickerTitle[this.state.selectedItem]))
                        }}>
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
    picker: {
        marginTop: ScaleUtils.AUTHENTICATION_BUTTON_MARGIN_TOP,
        height: getLayoutSize(300),
        width: ScaleUtils.IMAGE_WIDTH,
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
        bottom: ScaleUtils.SEVEN_STEP_BUTTON_BOTTOM,
    },
})