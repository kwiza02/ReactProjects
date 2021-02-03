//WeightScreen

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
import Ruler from 'react-native-animated-ruler';

import { button, AppFonts, TrialHeader,Colors,ScaleUtils,TextUtils,String } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';
import AsyncStorage from '@react-native-community/async-storage';
import ButtonComponent from '../../Component/ButtonComponent';
import Utils from '../../Component/Utils';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class WeightScreen extends Component {
    
    constructor(props){
        super(props);
        this.state={
            flag:false,
            count:0.0,
            count2: 0.0,
            currentValue: 0,
            weightType:false,
           // selectedItem: props.route.params.selectedItem
        };
    }

    async componentDidMount(){
        console.log("Age--->" + await AsyncStorage.getItem("@age"))
    }


    disableBackButton = () => {
        this.props.navigation.navigate("AgeScreen");
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
                <TrialHeader imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} value={3}  screen={"AgeScreen"} navigation={this.props.navigation} ></TrialHeader>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.header}>{String.sevenStep.WEIGHT_HEADER}</Text>
                        <Text style={styles.header2}>{String.sevenStep.WEIGHT_HEADER1}</Text>
                        <TouchableOpacity onPress={() => { this.setState({ flag: !this.state.flag, weightType: !this.state.weightType})}}>
                            {!this.state.flag === true && !this.state.weightType === true ?
                                <View style={{flexDirection:"row",backgroundColor:"#121617",borderRadius:40,height:50,width:220,alignSelf:"center",marginTop:50}}>
                                    <View style={{ backgroundColor:"#00f3b9", borderRadius: 40, height:49, width: 120, justifyContent: "center" }}>
                                        <Text style={{color:"black",alignSelf:"center",fontFamily:AppFonts.text.font1}}>KG</Text>
                                    </View>
                                        <Text style={{color:"#868686",marginLeft:30,alignSelf:"center",fontFamily:AppFonts.text.font1}}>LBS</Text>
                                </View>
                            :
                                <View style={{ flexDirection: "row", backgroundColor: "#121617", borderRadius: 40, height: 50, width: 220, alignSelf: "center", marginTop: 50 }}>
                                    <Text style={{ color: "#868686", alignSelf: "center",marginLeft:45,marginRight:30,fontFamily: AppFonts.text.font1 }}>KG</Text>
                                    <View style={{ backgroundColor: "#00f3b9", borderRadius: 40, height: 49, width: 120, justifyContent: "center", }}>
                                        <Text style={{ color: "#000000", alignSelf: "center",fontFamily: AppFonts.text.font1 }}>LBS</Text>
                                    </View>
                                </View>
                            }
                        </TouchableOpacity>
                        {!this.state.flag === true && !this.state.weightType === true ?
                        <Ruler
                            style={{ borderRadius: 10, elevation: 3,marginTop:getLayoutSize(60) }}
                            width={350}
                            height={170}
                            vertical={false}
                            onChangeValue={value =>this.setState({count:value})}
                            minimum={1.0}
                            maximum={130.0}
                            segmentWidth={2}
                            segmentSpacing={5}
                            indicatorColor='#00f3b9'
                            indicatorWidth={100}
                            indicatorHeight={80}
                            step={10}
                            stepColor='#868686'
                            stepHeight={70}
                            normalColor='#868686'
                            normalHeight={50}
                            backgroundColor='#000000'
                            numberFontFamily={AppFonts.text.font1}
                            numberSize={40}
                            numberColor='#ffffff'
                            unit='KG'
                            unitBottom={20}
                            unitFontFamily={AppFonts.text.font1}
                            unitColor='#ffffff'
                            unitSize={30}
                        />
                        :
                            <Ruler
                                style={{ borderRadius: 10, elevation: 3, marginTop: getLayoutSize(60) }}
                                width={350}
                                height={170}
                                vertical={false}
                                onChangeValue={value =>this.setState({count2:value})}
                                minimum={this.state.count*2}
                                maximum={260}
                                segmentWidth={2}
                                segmentSpacing={5}
                                indicatorColor='#00f3b9'
                                indicatorWidth={100}
                                indicatorHeight={80}
                                step={10}
                                stepColor='#868686'
                                stepHeight={70}
                                normalColor='#868686'
                                normalHeight={50}
                                backgroundColor='#000000'
                                numberFontFamily={AppFonts.text.font1}
                                numberSize={40}
                                numberColor='#ffffff'
                                unit='LBS'
                                unitBottom={20}
                                unitFontFamily={AppFonts.text.font1}
                                unitColor='#ffffff'
                                unitSize={30}
                            >
                            </Ruler>
                        }
                    </ScrollView>
                    <View style={styles.registerButtonView}>
                        <TouchableOpacity style={button.ButtonLoginContainer}
                            onPress={() => {
                                this.props.navigation.navigate("GoalScreen");
                                this.setState({ count: 0.0, count2: 0.0 });
                                this.state.weightType === false ? AsyncStorage.multiSet([["@weight", JSON.stringify(this.state.count)], ["@weightType", JSON.stringify(this.state.weightType)]])
                                    :
                                    AsyncStorage.multiSet([["@weight", JSON.stringify(this.state.count2)], ["@weightType", JSON.stringify(this.state.weightType)]])
                            }}>
                            <ButtonComponent text={"NEXT STEP"}/>
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
        color:Colors.DEFAULT_APP_FONT_COLOR,
        alignSelf: "center",
    },
    registerButtonView: {
       bottom:ScaleUtils.SEVEN_STEP_BUTTON_BOTTOM,
    },
})