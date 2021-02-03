//WorkoutsScreen

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
    Modal,
} from 'react-native';

import { button, AppFonts, TrialHeader,  } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class WorkoutsScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            Warmup:[
                {
                    image:require("../../Assets/ImageAndIcons/bouncingBall.png"),
                    imagePlay: require("../../Assets/ImageAndIcons/play.png"),
                    header:"Jog in place",
                    number:[
                        {
                            digit:"8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "4",
                        },
                    ],
                    imageDropdown: require("../../Assets/ImageAndIcons/arrow-down-sign-to-navigate.png"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/bouncingBall.png"),
                    imagePlay: require("../../Assets/ImageAndIcons/play.png"),
                    header: "Jog in place",
                    number: [
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "4",
                        },
                    ],
                    imageDropdown: require("../../Assets/ImageAndIcons/arrow-down-sign-to-navigate.png"),
                },
            ],
            Start: [
                {
                    image: require("../../Assets/ImageAndIcons/bouncingBall.png"),
                    imagePlay: require("../../Assets/ImageAndIcons/play.png"),
                    header: "Jog in place",
                    number: [
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "4",
                        },
                    ],
                    imageDropdown: require("../../Assets/ImageAndIcons/arrow-down-sign-to-navigate.png"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/bouncingBall.png"),
                    imagePlay: require("../../Assets/ImageAndIcons/play.png"),
                    header: "Jog in place",
                    number: [
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "4",
                        },
                    ],
                    imageDropdown: require("../../Assets/ImageAndIcons/arrow-down-sign-to-navigate.png"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/bouncingBall.png"),
                    imagePlay: require("../../Assets/ImageAndIcons/play.png"),
                    header: "Jog in place",
                    number: [
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "8",
                            image: require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png"),
                        },
                        {
                            digit: "4",
                        },
                    ],
                    imageDropdown: require("../../Assets/ImageAndIcons/arrow-down-sign-to-navigate.png"),
                },
            ],
            data3: [
                {
                    content: "lorem ipsum dolor sit amet,consectetur adipisicing elit,sed to eiusmod tempor.lorem ipsum dolor sit amet,consectetur adipisicing elit,sed to eiusmod tempor.lorem ipsum dolor sit amet,consectetur adipisicing elit,sed to eiusmod tempor."
                },
            ],
            isOpenPicker: false,
            isOpenPicker2: false,
            userSelected: '',
        };
    }

    clickEventListener = (item) => {
        this.setState({ userSelected: item }, () => {
            this.setModalVisible(true);
        });
    }

    setModalVisible(visible) {
        this.setState({ isOpenPicker: visible });
    }

    clickEventListener2 = (item) => {
        this.setState({ userSelected: item }, () => {
            this.setModalVisible2(true);
        });
    }

    setModalVisible2(visible) {
        this.setState({ isOpenPicker2: visible });
    }

    renderItem({item}){
        return(
            <View style={styles.renderView}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("MultipleVideoPlayerScreen")}}>
                <ImageBackground source={item.image} style={styles.renderImage} imageStyle={styles.renderImageStyle} >
                    <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.renderShadow}>
                            <Image source={item.imagePlay} style={styles.renderImagePlay}></Image>
                    </ImageBackground>
                </ImageBackground>
                </TouchableOpacity>
                <View style={{ flexDirection: "column", }}>
                    <Text style={styles.headerText}>{item.header}</Text>
                    <View style={styles.mapView}>
                    {item.number.map((item)=>(
                        <View style={{ flexDirection: "row",}}>
                            <View style={styles.mapCircleView}>
                                <Text style={styles.mapNumberText}>{item.digit}</Text>
                            </View>
                            <Image source={item.image} style={styles.renderImagePlay} />
                        </View>
                    ))}
                    </View>
                </View>
                <TouchableOpacity onPress={() => { this.clickEventListener(); }} style={styles.dropdownView}>
                    <Image source={item.imageDropdown} style={styles.dropdownImage}/>
                </TouchableOpacity>
            </View>
        );
    }

    renderItem2({ item }) {
        return (
            <View style={styles.renderView}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("MultipleVideoPlayerScreen") }}>
                    <ImageBackground source={item.image} style={styles.renderImage} imageStyle={styles.renderImageStyle} >
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.renderShadow}>
                            <Image source={item.imagePlay} style={styles.renderImagePlay}></Image>
                        </ImageBackground>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={{ flexDirection: "column", }}>
                    <Text style={styles.headerText}>{item.header}</Text>
                    <View style={styles.mapView}>
                        {item.number.map((item) => (
                            <View style={{ flexDirection: "row", }}>
                                <View style={styles.mapCircleView}>
                                    <Text style={styles.mapNumberText}>{item.digit}</Text>
                                </View>
                                <Image source={item.image} style={styles.renderImagePlay} />
                            </View>
                        ))}
                    </View>
                </View>
                <TouchableOpacity onPress={() => { this.clickEventListener2(); }} style={styles.dropdownView}>
                    <Image source={item.imageDropdown} style={styles.dropdownImage} />
                </TouchableOpacity>
            </View>
        );
    }

    renderSeparator = () => {
        return (
            <View style={{
                height: 1,
                borderColor: "#282c30",
                borderWidth: 0.2,
                width: "100%",
            }}>
            </View>
        );
    }  

    render() {
        return (
            <View style={styles.mainContainer}>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/pushups.jpg")} style={styles.backgroundImage}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.shadow}>
                            <View style={styles.container}>
                                <View style={styles.registerButtonView}>
                                    <TouchableOpacity style={styles.ButtonLoginContainer} onPress={() => {}}>
                                        <Text style={styles.mainScreenButtonLoginText}>WEEK  ONE</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.summerText}>DAY 3 {"\n"}BICEP BUILDING</Text>
                                <Text style={styles.tipsText}>TODAYS EXERCISES</Text>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                    <ScrollView>
                        <Text style={styles.warmUpText}>Warm up</Text>
                        <View style={{marginTop:getLayoutSize(20),}}>
                            <FlatList
                                data={this.state.Warmup}
                                keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem.bind(this)}
                                ItemSeparatorComponent={this.renderSeparator} />
                            <View style={{height: 1,borderColor: "#282c30", borderWidth: 0.2, width: "100%",}}></View>
                        </View>
                        <Text style={styles.warmUpText}>Start</Text>
                        <View style={{ marginTop: getLayoutSize(20),marginBottom:getLayoutSize(100) }}>
                            <FlatList
                                data={this.state.Start}
                                keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem2.bind(this)}
                                ItemSeparatorComponent={this.renderSeparator} />
                            <View style={{ height: 1, borderColor: "#282c30", borderWidth: 0.2, width: "100%", }}></View>
                        </View>
                    <Modal
                        transparent={true}
                        animationType={"feed"}
                        visible={this.state.isOpenPicker}>
                        <View style={styles.popupOverlay}>
                            <TouchableOpacity style={{ width: screenWidth, height: screenHeight, position: 'absolute' }}
                                onPress={() => { this.setModalVisible(false) }} />
                            <View style={styles.popup}>
                                {this.state.data3.map((item)=>(
                                    <Text style={{color:"white"}}>{item.content}</Text>
                                ))}
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        transparent={true}
                        animationType={"feed"}
                        visible={this.state.isOpenPicker2}>
                        <View style={styles.popupOverlay}>
                            <TouchableOpacity style={{ width: screenWidth, height: screenHeight, position: 'absolute' }}
                                onPress={() => { this.setModalVisible2(true) }} />
                            <View style={styles.popup2}>
                                <Image source={require("../../Assets/ImageAndIcons/padlock.png")} style={styles.lockImage}></Image>
                                <Text style={styles.unlockText}>Subscribe to unlock these workouts</Text>
                                <TouchableOpacity style={{flexDirection:"row",justifyContent:"center"}}
                                onPress={()=>{this.props.navigation.navigate("SubscriptionScreen")}}>
                                    <Text style={styles.subscribeText}>SUBSCRIBE NOW</Text>
                                    <Image source={require("../../Assets/ImageAndIcons/play.png")} style={styles.subscribePlayImage}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    </ScrollView>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("SelectPlanScreen") }} style={styles.buttonView}>
                        <Text style={styles.buttonText}>START  WORKOUT</Text>
                    </TouchableOpacity>
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
        padding: getLayoutSize(20),
    },
    backgroundImage: {
        height: getLayoutSize(250),
        width: "100%",
    },
    shadow: {
        width: "100%",
        height:getLayoutSize(250),
        position: "absolute",
    },
    registerButtonView: {
        marginTop: getLayoutSize(40),
    },
    ButtonLoginContainer: {
        height: getLayoutSize(35),
        width: "32%",
        borderRadius:30,
        borderColor: "#00f3b9",
        justifyContent: "center",
        borderWidth: 1,
    },
    mainScreenButtonLoginText: {
        color: "#00f3b9",
        fontSize: getFontSize(12),
        alignSelf: "center",
        fontFamily:AppFonts.text.font4
    },
    summerText: {
        color: "#ffffff",
        fontFamily: AppFonts.text.font2,
        fontSize: getFontSize(32),
        marginTop:getLayoutSize(20),
    },
    tipsText: {
        color: "#e6e6e6",
        fontSize: getFontSize(14),
        marginTop: getLayoutSize(15),
        fontFamily: AppFonts.text.font4,
    },
    renderView:{
        flexDirection: "row", 
        height: getLayoutSize(120), 
        width: "100%", 
        justifyContent: "center",
    },
    renderImage:{
        height:getLayoutSize(120),
        width:getLayoutSize(100),
        justifyContent:"center"
    },
    renderImageStyle:{
        resizeMode:"cover"
    },
    renderImagePlay:{
        height:getLayoutSize(20),
        width:getLayoutSize(20),
        tintColor:"#dedede",
        resizeMode:"cover",
        alignSelf:"center",
    },
    renderShadow: {
        width: "100%",
        height:"100%",
        position: "absolute",
        justifyContent:"center"
    },
    headerText: {
        color: "#e6e6e6",
        fontFamily: AppFonts.text.font3,
        fontSize: getFontSize(17),
        marginLeft:getLayoutSize(20),
        marginTop:getLayoutSize(20)
    },
    mapView: { 
        flexDirection: "row", 
        marginTop: getLayoutSize(20), 
        marginLeft: getLayoutSize(13),
    },
    mapCircleView:{
        borderColor: "#868686", 
        borderWidth: 1, 
        borderRadius: 15, 
        height: getLayoutSize(30), 
        width: getLayoutSize(30), 
        justifyContent: "center", 
        flexDirection: "row",
        marginLeft:getLayoutSize(5),
        marginRight:getLayoutSize(5),
    },
    mapNumberText:{
        color:"#dedede",
        fontSize:getFontSize(15),
        fontFamily:AppFonts.text.font4,
        alignSelf:"center",
    },
    dropdownView:{
        backgroundColor: "#171b1e", 
        height: 120, width: "14%", 
        justifyContent: "center", 
        marginLeft: 40
    },
    dropdownImage:{
        height:getLayoutSize(15),
        width:getLayoutSize(15),
        alignSelf:"center",
        tintColor:"#dedede",
        marginRight:getLayoutSize(20)
    },
    warmUpText:{
        color: "#e6e6e6",
        fontSize: getFontSize(17),
        marginTop: getLayoutSize(20),
        fontFamily: AppFonts.text.font3,
        paddingLeft:getLayoutSize(20),
    },
    buttonView: {
        backgroundColor: "#00f3b9",
        width: "90%",
        height: getLayoutSize(45),
        borderRadius: 30,
        justifyContent: "center",
        marginLeft: getLayoutSize(20),
        position: "absolute",
        bottom:getLayoutSize(50),
    },
    buttonText: {
        color: "black",
        fontSize: getFontSize(13),
        alignSelf: "center",
        fontFamily: AppFonts.text.font4,
    },
    popup: {
        backgroundColor: '#000000',
        borderRadius: 7,
        flexDirection: "row",
        height: getLayoutSize(130),
        width: getLayoutSize(350),
        alignSelf:"center",
        alignItems:"center",
        padding:getLayoutSize(15),
    },
    popupOverlay: {
        backgroundColor: "#00000057",
        flex: 1,
        justifyContent: "center"
    },
    popup2: {
        backgroundColor: '#00000057',
        borderRadius: 7,
        flexDirection: "column",
        height: getLayoutSize(200),
        width:screenWidth,
        alignSelf: "center",
        alignItems: "center",
        position: "absolute",
        bottom: getLayoutSize(100),
        padding: getLayoutSize(15),
    },
    lockImage:{
        height: getLayoutSize(40), 
        width: getLayoutSize(40), 
        tintColor: "#ffffff",
    },
    unlockText:{
        color:"#ffffff",
        marginTop:getLayoutSize(25),
        fontSize:getFontSize(15),
        fontFamily:AppFonts.text.font3,
    },
    subscribeText:{
        color: "#00f3b9",
        marginTop: getLayoutSize(15),
        fontSize: getFontSize(11),
        fontFamily: AppFonts.text.font4,
        alignSelf:"center"
    },
    subscribePlayImage:{
        height:getLayoutSize(5),
        width:getLayoutSize(5),
        alignSelf:"center",
        marginTop:getLayoutSize(20),
        marginLeft:getLayoutSize(5),
    },
});