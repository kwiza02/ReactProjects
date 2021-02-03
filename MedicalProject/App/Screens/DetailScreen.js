//DetailScreen

import React, { Component } from "react";

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Dimensions,
    Modal,
} from "react-native";
// import { NavigationEvents } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import RBSheet from "react-native-raw-bottom-sheet";

import { getLayoutSize,getFontSize } from "../Component/Responsive";
import { AppFonts } from "../Resources/index";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class DetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:this.props.route.params.name,
            info: this.props.route.params.info,
            price: this.props.route.params.price,
            image: this.props.route.params.image,
            isLike:false,
            isOpenPicker:false,
        };
    }

    componentDidMount() {
        this.setState({isOpenPicker:!this.state.isOpenPicker})
        this.RBSheet.open();
    }

    render() {
        this.props.navigation.addListener(
            'focus',
            payload => {
                console.log("Payload is called ....................." + JSON.stringify(payload))
                this.RBSheet.open();
            }
        );
        return (
            <ScrollView style={{flex:1}}>
                
                <View style={{ height: getLayoutSize(screenHeight), width: "100%", backgroundColor:"#e6e6fa",}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Image source={require("../Assets/Icons/back_with_arrow.png")}
                            style={{ height: getLayoutSize(23), width: getLayoutSize(23), tintColor: "#000000", marginLeft: getLayoutSize(20), marginTop: getLayoutSize(20) }} />
                    </TouchableOpacity>
                    <Image source={this.state.image} style={{ height: getLayoutSize(180), width: getLayoutSize(180),alignSelf:"center",marginTop:getLayoutSize(60)}}/>
                    <TouchableOpacity onPress={()=>{this.RBSheet.open()}}
                    style={{ height: getLayoutSize(20), width: getLayoutSize(60), backgroundColor: "#818181", bottom: getLayoutSize(50), position: "absolute", alignSelf: "center", borderRadius: getLayoutSize(10) }}></TouchableOpacity>
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={getLayoutSize(500)}
                        duration={250}
                    >
                        <View style={{ flexDirection: "row", padding: getLayoutSize(20), justifyContent: "space-between", }}>
                            <View>
                                <Text style={{ fontSize: getFontSize(30), fontFamily: AppFonts.text.font4 }}>{this.state.name}</Text>
                                <Text style={{ fontSize: getFontSize(23), fontFamily: AppFonts.text.font3, color: "#a9a9a9" }}>{this.state.info}</Text>
                            </View>
                            <TouchableOpacity onPress={() => { this.setState({ isLike: !this.state.isLike }) }}>
                                {this.state.isLike === true ?
                                    <Image source={require("../Assets/Icons/heartFill.png")} style={{ height: getLayoutSize(25), width: getLayoutSize(25), marginTop: getLayoutSize(10) }} />
                                    :
                                    <Image source={require("../Assets/Icons/heart.png")} style={{ height: getLayoutSize(25), width: getLayoutSize(25), marginTop: getLayoutSize(10) }} />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", padding: getLayoutSize(20) }}>
                            <Text style={{ fontSize: getFontSize(30), fontFamily: AppFonts.text.font3 }}>{this.state.price}</Text>
                            <View style={{ marginLeft: getLayoutSize(20) }}>
                                <Text style={{ color: "#818181", alignSelf: "center" }}>Ten out of</Text>
                                <Slider
                                    maximumValue={7}
                                    minimumValue={2}
                                    step={2}
                                    minimumTrackTintColor="#00ff7f"
                                    maximumTrackTintColor="#818181"
                                    style={{ width: getLayoutSize(200) }}
                                    onValueChange={(sliderValue) => this.setState({ sliderValue })}
                                    thumbTintColor={"transparent"}
                                />
                            </View>
                        </View>
                        <View style={{ padding: getLayoutSize(20), flexDirection: "row", justifyContent: "space-between" }}>
                            <View>
                                <Text style={{ fontSize: getFontSize(23), fontFamily: AppFonts.text.font4, color: "#a9a9a9" }}>Category</Text>
                                <Text style={{ fontSize: getFontSize(20), fontFamily: AppFonts.text.font3 }}>Pills</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: getFontSize(23), fontFamily: AppFonts.text.font4, color: "#a9a9a9" }}>Active    Hours</Text>
                                <Text style={{ fontSize: getFontSize(20), fontFamily: AppFonts.text.font3 }}>Full day</Text>
                            </View>
                        </View>
                        <View style={{ padding: getLayoutSize(20), flexDirection: "row", justifyContent: "space-between" }}>
                            <View>
                                <Text style={{ fontSize: getFontSize(23), fontFamily: AppFonts.text.font4, color: "#a9a9a9" }}>Content</Text>
                                <Text style={{ fontSize: getFontSize(20), fontFamily: AppFonts.text.font3 }}>90gm</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: getFontSize(23), fontFamily: AppFonts.text.font4, color: "#a9a9a9" }}>Manufrecturer</Text>
                                <Text style={{ fontSize: getFontSize(20), fontFamily: AppFonts.text.font3 }}>Canada</Text>
                            </View>
                        </View>
                        <View style={{ padding: getLayoutSize(20) }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("MessageScreen"), this.RBSheet.close()}}
                                style={{ height: getLayoutSize(50), width: "100%", justifyContent: "center", backgroundColor: "#4169e1", borderRadius: getLayoutSize(15) }}>
                                <Text style={{ alignSelf: "center", color: "#ffffff", fontSize: getFontSize(20) }}>Add to cart</Text>
                            </TouchableOpacity>
                        </View>
                    </RBSheet>
                </View>
            </ScrollView>
        );
    }
}

