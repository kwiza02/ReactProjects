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

import { button, AppFonts, TrialHeader } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class WeightScreen extends Component {
    
    constructor(props){
        super(props);
        this.state={
            flag:false,
            count:0.0,
            currentValue: 0
        };
        this.getCurrentValue = this.getCurrentValue.bind(this);
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

    getCurrentValue(currentValue) {
        this.setState({
            currentValue: currentValue
        })
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TrialHeader imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} value={3}  screen={"AgeScreen"} navigation={this.props.navigation} ></TrialHeader>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.header}>HOW MUCH DO</Text>
                        <Text style={styles.header2}>YOU WEIGHT?</Text>
                        <TouchableOpacity onPress={()=>{this.setState({flag:!this.state.flag})}}>
                            {!this.state.flag===true?
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
                        {!this.state.flag===true ?
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
                                onChangeValue={value =>value}
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
                                <Text style={{color:"white",marginTop:2}}>1</Text>
                            </Ruler>
                        }
                        <View style={styles.registerButtonView}>
                            <TouchableOpacity style={button.ButtonLoginContainer} onPress={() => { this.props.navigation.navigate("GoalScreen") }}>
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
    registerButtonView: {
        marginTop: getLayoutSize(90),
    },
})