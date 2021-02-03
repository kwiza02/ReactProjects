//MaleFemaleScreen

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
    Alert,
} from 'react-native';

import { button, AppFonts,TrialHeader,Colors,ScaleUtils,TextUtils,String } from '../../Resources/index';
import Utils from '../../Component/Utils';
import ButtonComponent from '../../Component/ButtonComponent';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import AsyncStorage from '@react-native-community/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class MaleFemaleScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            onMouseTapMale:false,
            onMouseTapFemale:false,
            flag:false,
            gender:false,
        };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("SubscriptionScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }


    updateMale(){
        if(!this.state.onMouseTapMale){
            this.setState({onMouseTapMale:true});
            this.setState({ gender: false });
            this.setState({ onMouseTapFemale: false });
        }else{
            this.setState({ onMouseTapMale: true });
            this.setState({ onMouseTapFemale: false });
        }
    }

    updateFemale() {
        if (this.state.onMouseTapFemale) {
        } else {
            this.setState({ onMouseTapFemale: true });
            this.setState({ gender: true });
            this.setState({ onMouseTapMale: false });
        }
    }
    
    render(){
        return(
            <View style={styles.mainContainer}>
                <TrialHeader imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} value={1} screen={"SubscriptionScreen"} navigation={this.props.navigation} ></TrialHeader>
                    <View style={styles.container}>
                        <ScrollView>
                        <Text style={styles.header}>{String.sevenStep.MALEORFEMALE_HEADER}</Text>
                        <Text style={styles.headerContent}>{String.sevenStep.MALEORFEMALE_CONTENT}</Text>
                        <Text style={styles.headerContent2}>{String.sevenStep.MALEORFEMALE_CONTENT1}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: getLayoutSize(60),}}>
                                <TouchableOpacity style={{width: "50%", height: getLayoutSize(270),
                                    borderColor: this.state.onMouseTapMale === true ? "#00f3b9" : "#868686", borderWidth: 1,}}
                                    onPress={()=>{this.state.onMouseTapMale===true ? this.updateMale(true):this.updateMale(false);this.setState({flag:true})}}>
                                    {this.state.onMouseTapMale===true ? 
                                    <View style={styles.box2}>
                                        <Image source={require("../../Assets/ImageAndIcons/correct.png")} style={ styles.correctActiveImage}></Image>
                                        <Image source={require("../../Assets/ImageAndIcons/man.png")} style={styles.manActiveImage}></Image>
                                    </View>
                                    :
                                    <View style={styles.box2}>
                                        <Image source={require("../../Assets/ImageAndIcons/man.png")} style={ styles.manImage}></Image>
                                    </View>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={{width: "50%", height: getLayoutSize(270),
                                    borderColor: this.state.onMouseTapFemale === true ? "#00f3b9" : "#868686", borderWidth: 1,}}
                                onPress={() => { this.state.onMouseTapFemale === true ? this.updateFemale(true) : this.updateFemale(false); this.setState({ flag:true })}}>
                                    {this.state.onMouseTapFemale === true ?
                                        <View style={styles.box2}>
                                            <Image source={require("../../Assets/ImageAndIcons/correct.png")} style={styles.correctActiveImage}></Image>
                                            <Image source={require("../../Assets/ImageAndIcons/woman.png")} style={styles.womanActiveImage}></Image>
                                        </View>
                                        :
                                        <View style={styles.box2}>
                                            <Image source={require("../../Assets/ImageAndIcons/woman.png")} style={styles.womanImage}></Image>
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View>
                    </ScrollView>
                    <View style={styles.registerButtonView}>
                        <TouchableOpacity style={button.ButtonLoginContainer}
                            onPress={() => { this.state.flag === true ? this.props.navigation.navigate("AgeScreen") : Utils.DialogBox("Alert", "Please select any of above. "); this.setState({ onMouseTapFemale: false, onMouseTapMale: false, flag: false }); AsyncStorage.setItem("@gender", JSON.stringify(this.state.gender)) }}>
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
    container:{
        flex:1,
        padding: ScaleUtils.SEVEN_STEP_SCREEN_PADDING,
    },
    header:{
        fontFamily:AppFonts.text.font2,
        fontSize: TextUtils.SEVEN_STEP_TITLE,
        color: Colors.DEFAULT_APP_FONT_COLOR,
        alignSelf: "center",
        marginTop: ScaleUtils.MARGIN_TWENTY,
    },
    headerContent:{
        color: Colors.DEFAULT_CONTENT_COLOR,
        alignSelf:"center",
        marginTop: ScaleUtils.MARGIN_TWENTY,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily:AppFonts.text.font3,
    },
    headerContent2: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        alignSelf: "center",
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
    },
    box2:{
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        height:getLayoutSize(270),
        justifyContent:"center",
    },
    manImage:{
        height: getLayoutSize(120), 
        width: getLayoutSize(60), 
        alignSelf: "center",
        tintColor: Colors.DEFAULT_CONTENT_COLOR,
        resizeMode:"contain",
    },
    manActiveImage: {
        height: getLayoutSize(120),
        width: getLayoutSize(60),
        alignSelf: "center",
        tintColor:Colors.DEFAULT_APP_FONT_COLOR,
        resizeMode: "contain",
        position:"absolute",
    },
    womanImage: {
        height: getLayoutSize(120),
        width: getLayoutSize(75),
        alignSelf: "center",
        tintColor: Colors.DEFAULT_CONTENT_COLOR,
        resizeMode:"contain",
    },
    womanActiveImage: {
        height: getLayoutSize(120),
        width: getLayoutSize(75),
        alignSelf: "center",
        tintColor:Colors.DEFAULT_APP_FONT_COLOR,
        resizeMode: "contain",
        position:"absolute",
    },
    correctActiveImage: {
        width: getLayoutSize(25),
        height: getLayoutSize(27),
        tintColor: Colors.COLOR_PRIMARY,
        top: getLayoutSize(-110),
        left: getLayoutSize(10),
        resizeMode: "contain",
    },
    registerButtonView: {
       bottom:ScaleUtils.SEVEN_STEP_BUTTON_BOTTOM,
    },
})