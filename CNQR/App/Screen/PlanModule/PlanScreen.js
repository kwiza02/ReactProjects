//PlanScreen

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
} from 'react-native';

import { button, AppFonts, TrialHeader } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

console.disableYellowBox=true;

export default class PlanScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            data:[
                {
                    content1:"WEIGHT LOSS",
                    content2: "SUMMER",
                    content3:"SHRED",
                    content4:"5 per week",
                    content5:"8 weeks",
                    image1:require("../../Assets/ImageAndIcons/dumbell.png"),
                    image2: require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png"),
                    image3: require("../../Assets/ImageAndIcons/fitness_girl.jpg"),
                },
                {
                    content1: "WEIGHT LOSS",
                    content2: "SUMMER",
                    content3: "SHRED",
                    content4: "5 per week",
                    content5: "8 weeks",
                    image1: require("../../Assets/ImageAndIcons/dumbell.png"),
                    image2: require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png"),
                    image3: require("../../Assets/ImageAndIcons/fitness_girl.jpg"),
                },
                {
                    content1: "WEIGHT LOSS",
                    content2: "SUMMER",
                    content3: "SHRED",
                    content4: "5 per week",
                    content5: "8 weeks",
                    image1: require("../../Assets/ImageAndIcons/dumbell.png"),
                    image2: require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png"),
                    image3: require("../../Assets/ImageAndIcons/fitness_girl.jpg"),
                },
                {
                    content1: "WEIGHT LOSS",
                    content2: "SUMMER",
                    content3: "SHRED",
                    content4: "5 per week",
                    content5: "8 weeks",
                    image1: require("../../Assets/ImageAndIcons/dumbell.png"),
                    image2: require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt_3x.png"),
                    image3: require("../../Assets/ImageAndIcons/fitness_girl.jpg"),
                },
            ],
        };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("AllergiesScreen")
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    renderItem = ({ item, index }) => {
        return(
            <View style={{flexDirection:"column"}}>
            <ImageBackground source={item.image3} style={styles.renderImageBackground} imageStyle={styles.renderImageStyle}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("SelectPlanScreen") }}>   
                   <View style={styles.renderBoxView}>
                            <Text style={styles.content1}>{item.content1}</Text>
                            <View style={{ marginTop: getLayoutSize(5) }}>
                                <Text style={styles.content2}>{item.content2}</Text>
                                <Text style={styles.content2}>{item.content3}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={item.image1} style={styles.renderImage} />
                                <Text style={styles.content4}>{item.content4}</Text>
                            </View>
                            <View style={{ flexDirection: "row"}}>
                                <Image source={item.image2} style={styles.renderImage} />
                                <Text style={styles.content4}>{item.content5}</Text>
                            </View>
                    </View>
                </TouchableOpacity>
            </ImageBackground> 
            </View>
        );
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <ScrollView>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/Bitmap_3.png")} style={styles.backgroundImage}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.shadow} >
                        <View style={styles.container}>
                            <Text style={styles.headerText}>LET'S</Text>
                            <Text style={styles.headerText}>DO THIS</Text>
                            <View style={{marginTop:getLayoutSize(10)}}>
                                <Text style={styles.headerContent}>Your custom plan is ready and you're one step</Text>
                                <Text style={styles.headerContent}>closer to your fitness and health lifestyle!</Text>
                            </View>
                            <View style={styles.boxView}>
                                    <View style={styles.topLineView}/>
                                    <Text style={styles.breakdownText}>YOUR BREAKDOWN</Text>
                                    <View style={styles.topLineView} />
                                    <View style={styles.caloriesView}>
                                        <Text style={{ color: "#00f3b9", fontFamily:AppFonts.text.font3,fontSize:getFontSize(22)}}>2,144</Text>
                                        <Text style={styles.textStyle}>Calories</Text>
                                        <View style={{ borderWidth: 1, borderColor: "#868686", height: 60, width: "2%", position: "absolute",marginLeft:getLayoutSize(80) }} />
                                    </View>
                                    <View style={styles.carbsView}>
                                        <Text style={styles.numberStyle}>180<Text style={styles.gText}>g</Text></Text>
                                        <Text style={styles.textStyle}>Carbs</Text>
                                    </View>
                                    <View style={styles.protienView}>
                                        <Text style={styles.numberStyle}>130<Text style={styles.gText}>g</Text></Text>
                                        <Text style={styles.textStyle}>Protien</Text>
                                    </View>
                                    <View style={styles.fatView}>
                                            <Text style={styles.numberStyle}>79<Text style={styles.gText}>g</Text></Text>
                                        <Text style={styles.textStyle}>Fat</Text>
                                    </View>
                            </View>
                        </View>
                        </ImageBackground>
                    </ImageBackground>
                    <View style={{ justifyContent: "space-between", flexDirection: "row",paddingLeft:getLayoutSize(20) }}>
                        <Text style={styles.planText}>YOUR  RECOMMENDED  PLANS</Text>
                        <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(index) => index.toString()}
                            renderItem={this.renderItem.bind(this)}
                            horizontal={true} />
                    </View>
                    <View style={styles.registerButtonView}>
                        <TouchableOpacity style={styles.ButtonLoginContainer} onPress={() => {}}>
                            <Text style={styles.mainScreenButtonLoginText}>CONTINUE WITHOUT SELECTING A PLAN</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        paddingLeft: getLayoutSize(20),
        top: getLayoutSize(220),
    },
    backgroundImage: {
        flex: 1,
        height:getLayoutSize(570),
        width:"100%",
    },
    shadow: {
        width: "100%",
        height: screenHeight,
        position: "absolute",
    },
    headerText:{
        fontSize:getFontSize(42),
        color:"#ffffff",
        fontFamily:AppFonts.text.font2,
    },
    headerContent:{
        color:"#e6e6e6",
        fontFamily:AppFonts.text.font3,
        fontSize:getFontSize(13),
    },
    boxView:{
        borderWidth: 1, 
        borderColor: "#868686", 
        height: getLayoutSize(112), 
        marginTop: getLayoutSize(30), 
        marginRight: getLayoutSize(20), 
        borderTopWidth: 0, 
        flexDirection: "row",
    },
    topLineView: { 
        borderTopWidth: 0.8, 
        borderColor: "#868686", 
        width:getLayoutSize(screenWidth/3.87)
    },
    breakdownText:{
        color: "#ffffff", 
        fontSize: getFontSize(12), 
        marginLeft: getLayoutSize(15), 
        marginRight: getLayoutSize(15), 
        marginTop: getLayoutSize(-10), 
        fontFamily: AppFonts.text.font4,
    },
    caloriesView:{
        position: "absolute", 
        marginTop: getLayoutSize(30), 
        left: getLayoutSize(30)
    },
    textStyle:{
        color: "#868686",
         fontFamily: AppFonts.text.font3, 
         fontSize: getFontSize(13), 
         alignSelf: "center",
    },
    numberStyle:{
        color: "#dedede", 
        fontFamily: AppFonts.text.font3, 
        fontSize: getFontSize(22) ,
    },
    gText:{
        fontSize:getFontSize(15),
        color:"white",
    },
    carbsView:{
        position: "absolute", 
        marginTop: getLayoutSize(30), 
        left: getLayoutSize(130) 
    },
    protienView:{
        position: "absolute", 
        marginTop: getLayoutSize(30), 
        left: getLayoutSize(210),
    },
    fatView:{
        position: "absolute", 
        marginTop: getLayoutSize(30), 
        left: getLayoutSize(290) ,
    },
    planText:{
        color: "#ffffff",
        fontSize: getFontSize(16),
        marginTop: getLayoutSize(-12),
        fontFamily: AppFonts.text.font4,
    },
    codeImage:{
        tintColor:"#868686",
        height:getLayoutSize(30),
        width:getLayoutSize(30),
        marginTop: getLayoutSize(-15),
        marginRight:getLayoutSize(15),
    },
    renderShadow: {
        width: "100%",
        height: screenHeight,
    },
    renderImageBackground: {
        marginTop:getLayoutSize(30),
        height:getLayoutSize(350),
        width:getLayoutSize(300),
        justifyContent:"center",
        marginLeft:getLayoutSize(20),
    },
    renderImageStyle: {
       resizeMode:"cover",
       borderColor:"transparent",
       borderRadius:10,
       opacity:0.8
    },
    renderBoxView:{
        height: getLayoutSize(330), 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: "#868686", 
        width: "92%",
        alignSelf:"center",
        padding: getLayoutSize(10),
    },
    content1:{
        color:"#dedede",
        fontSize:getFontSize(13),
        fontFamily:AppFonts.text.font4,
        marginTop:getLayoutSize(20)
    },
    content2:{
        color:"#ffffff",
        fontSize:getFontSize(30),
        fontFamily:AppFonts.text.font1,
    },
    content4:{
        color:"#e6e6e6",
        fontSize:getFontSize(13),
        fontFamily:AppFonts.text.font3,
        alignSelf:"center",
    },
    renderImage:{
        height:getLayoutSize(25),
        width:getLayoutSize(25),
        tintColor:"#e6e6e6",
        marginRight:getLayoutSize(10),
        alignSelf: "center",
    },
    registerButtonView: {
        marginTop: getLayoutSize(20),
        padding: getLayoutSize(20),
    },
    ButtonLoginContainer: {
        height: getLayoutSize(50),
        width: "100%",
        borderRadius: 40,
        borderColor: "#00f3b9",
        justifyContent: "center",
        borderWidth: 1,
    },
    mainScreenButtonLoginText: {
        fontWeight: "bold",
        color: "#00f3b9",
        fontSize: getFontSize(13),
        alignSelf: "center",
    },
});
