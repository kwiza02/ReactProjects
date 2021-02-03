//MyPlanScreen

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

import { button, AppFonts, TrialHeader,  } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class MyPlanScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            data:[
                {
                    dayCount:"01",
                    header:"Lower Body Blast",
                    exercises:"5 EXERCISES",
                    mins:"45 MINS",
                },
                {
                    dayCount: "02",
                    header: "Upper Body I",
                    exercises: "5 EXERCISES",
                    mins: "45 MINS",
                },
                {
                    dayCount: "03",
                    header: "Upper Body II",
                    exercises: "5 EXERCISES",
                    mins: "45 MINS",
                },
            ],
            data2:[
                {
                    image:require("../../Assets/ImageAndIcons/Bitmap_1.png"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/Bitmap_1.png"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/Bitmap_1.png"),
                },
                {
                    image: require("../../Assets/ImageAndIcons/Bitmap_1.png"),
                },
            ],
        };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("SelectPlanScreen")
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    renderItem({item}){
        return(
            <View style={styles.renderMainView}>
                <View style={styles.dayView}>
                    <Text style={styles.dayNumberText}>{item.dayCount}</Text>
                </View>
                <View style={styles.renderLineView} />
                <View style={styles.dayView}>
                    <Text style={styles.headerText}>{item.header}</Text>
                    <View style={{flexDirection:"row",}}>
                        <View style={styles.exerciseBoxView}>
                            <Text style={styles.renderBoxText}>{item.exercises}</Text>
                        </View>
                        <View style={styles.minsBoxView}>
                            <Text style={styles.renderBoxText}>{item.mins}</Text>
                        </View>
                    </View>
                </View>
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
                marginBottom: getLayoutSize(15)}}>
           </View>
        );
    }  
    
    renderItem2({item}){
        return(
                <View style={styles.render2View}>
                    <Image source={item.image} style={styles.render2Image}/>
                </View>
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/bg_one.png")} style={styles.backgroundImage}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.shadow}>
                            <View style={styles.container}>
                                <View style={{ marginTop: getLayoutSize(10) }}>
                                    <Text style={styles.summerText}>SUMMER {"\n"}SHRED</Text>
                                </View>
                                <View style={styles.weekBoxView}>
                                    <Text style={styles.weekBoxText}>6  WEEKS</Text>
                                </View>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("VideoPlayScreen") }} style={{ top: getLayoutSize(25) }}>
                                    <Image source={require("../../Assets/ImageAndIcons/video_play.png")} style={styles.videoPlayImage}></Image>
                                </TouchableOpacity>
                                <View style={{ marginTop: getLayoutSize(40) }}>
                                    <Text style={styles.upperBodyText}>UPPER {"\n"}BODY</Text>
                                </View>
                                <Text style={styles.weekText}>WEEK 1</Text>
                                <View style={{flexDirection:"row",marginTop:getLayoutSize(15)}}>
                                    <View>
                                        <View style={styles.circleView}/>
                                        <Text style={styles.numberText}>01</Text>
                                    </View>
                                    <View style={styles.lineView}/>
                                    <View>
                                        <View style={styles.circleView} />
                                        <Text style={styles.numberText}>02</Text>
                                    </View>
                                    <View style={styles.lineView} />
                                    <View>
                                        <View style={styles.circleView} />
                                        <Text style={styles.numberText}>03</Text>
                                    </View>
                                    <View style={styles.lineView} />
                                    <View>
                                        <View style={styles.circleView} />
                                        <Text style={styles.numberText}>04</Text>
                                    </View>
                                    <View style={styles.lineView} />
                                    <View>
                                        <View style={styles.circleView} />
                                        <Text style={styles.numberText}>05</Text>
                                    </View>
                                    <View style={styles.lineView} />
                                    <View>
                                        <View style={styles.circleView} />
                                        <Text style={styles.numberText}>06</Text>
                                    </View>
                                    <View style={styles.lineView} />
                                    <View>
                                        <View style={styles.circleView} />
                                        <Text style={styles.numberText}>07</Text>
                                    </View>
                                    <View style={styles.lineView} />
                                </View>
                                <View style={styles.registerButtonView}>
                                    <TouchableOpacity style={styles.ButtonLoginContainer} onPress={() => { this.props.navigation.navigate("BottomTabNavigator") }}>
                                        <Text style={styles.mainScreenButtonLoginText}>SELECT THIS PLAN</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                    <View style={{ padding: getLayoutSize(20) }}>
                        <Text style={styles.weeklyScheduleText}>WEEKLY WORKOUT SCHEDULE</Text>
                        <View style={{marginTop:getLayoutSize(40)}}>
                        <Text style={styles.dayText}>DAY</Text>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(index) => index.toString()}
                            renderItem={this.renderItem.bind(this)}
                            ItemSeparatorComponent={this.renderSeparator} />
                        </View>
                        <View style={{flexDirection:"row",marginTop:getLayoutSize(30)}}>
                            <View style={styles.profileOuter}>
                                <Image source={require("../../Assets/ImageAndIcons/Bitmap_3.png")} style={styles.profileImage}></Image>
                            </View>
                            <View style={{justifyContent:"center",marginLeft:getLayoutSize(20)}}>
                                <Text style={styles.profileName}>ANLELLA{"\n"}SAGRA</Text>
                                <Text style={styles.fitnessText}>FITNESS ATHLETE</Text>
                            </View>
                            <View style={styles.profileLineView} />
                            <View style={styles.greaterImageView}>
                                <Image source={require("../../Assets/ImageAndIcons/baseline_chevron_right_black_36pt_3x.png")} style={styles.greaterImage}/>
                            </View>
                        </View>
                        <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: getLayoutSize(40),alignItems:"center" }}>
                            <Text style={styles.tipsText}>TIPS AND ADVICE</Text>
                            <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <FlatList
                                data={this.state.data2}
                                keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem2.bind(this)}
                                horizontal={true}/>
                        </View>
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
        padding: getLayoutSize(20),
    },
    backgroundImage: {
        flex: 1,
        height: getLayoutSize(550),
        width: "100%",

    },
    shadow: {
        width: "100%",
        height: getLayoutSize(550),
        position: "absolute",
    },
    summerText: {
        color: "#ffffff",
        fontFamily: AppFonts.text.font2,
        fontSize: getFontSize(22),
    },
    weekBoxView:{
        height:getLayoutSize(30),
        width:"25%",
        borderColor:"#868686",
        borderWidth:0.5,
        marginTop:getLayoutSize(15),
        borderRadius:5,
        justifyContent:"center",
    },
    weekBoxText:{
        color:"#e6e6e6",
        fontSize:getFontSize(14),
        fontFamily:AppFonts.text.font4,
        alignSelf:"center",
    },
    videoPlayImage: {
        height: getLayoutSize(100),
        width: getLayoutSize(100),
        alignSelf: "center",
    },
    upperBodyText: {
        color: "#ffffff",
        fontFamily: AppFonts.text.font2,
        fontSize: getFontSize(40),
    },
    weekText: {
        color: "#e6e6e6",
        fontSize: getFontSize(14),
        fontFamily: AppFonts.text.font4,
        marginTop:getLayoutSize(20),
    },
    circleView:{
        borderRadius: 6, 
        borderWidth: 1, 
        backgroundColor: "#868686", 
        borderColor: "transparent", 
        height: getLayoutSize(12), 
        width: getLayoutSize(12)
    },
    numberText:{
        fontSize: getFontSize(10), 
        color: "#868686", 
        marginTop: getLayoutSize(5),
        fontFamily:AppFonts.text.font4,
    },
    lineView:{
        borderColor: "#868686", 
        borderWidth: 1, 
        height: getLayoutSize(1),
        width: getLayoutSize(50), 
        marginTop: getLayoutSize(5), 
        marginLeft: getLayoutSize(-2),
        marginRight:getLayoutSize(-2),
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
    weeklyScheduleText: {
        color: "#e6e6e6",
        fontSize: getFontSize(14),
        fontFamily: AppFonts.text.font4,
        marginTop: getLayoutSize(15),
    },
    renderMainView:{
        flexDirection:"row",
        marginTop:getLayoutSize(-20),
    },
    dayView:{
        justifyContent:"center",
    },
    dayNumberText: {
        fontSize: getFontSize(15),
        fontFamily: AppFonts.text.font3,
        color: "#ffffff",
        alignSelf:"center",
    },
    renderLineView: {
        borderColor: "#282c30",
        borderWidth: 0.5,
        height: getLayoutSize(55),
        width: getLayoutSize(1),
        margin:getLayoutSize(25)
    },
    headerText:{
        color:"#e6e6e6",
        fontFamily:AppFonts.text.font3,
        fontSize:getFontSize(17),
    },
    exerciseBoxView:{
        height: getLayoutSize(30),
        width: "37%",
        borderColor: "#818181",
        borderWidth: 0.5,
        marginTop: getLayoutSize(15),
        marginRight:getLayoutSize(10),
        borderRadius: 5,
        justifyContent: "center",
    },
    minsBoxView: {
        height: getLayoutSize(30),
        width: "30%",
        borderColor: "#818181",
        borderWidth: 0.5,
        marginTop: getLayoutSize(15),
        borderRadius: 5,
        justifyContent: "center",
    },
    renderBoxText: {
        color: "#818181",
        fontSize: getFontSize(12),
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
    },
    dayText:{
        color:"#868686",
        fontFamily:AppFonts.text.font4,
        fontSize:getFontSize(13),
        marginBottom:getLayoutSize(-20),
    },
    profileOuter: {
        borderRadius: 45,
        height: getLayoutSize(90),
        width: getLayoutSize(90),
        borderColor: "#e6e6e6",
        borderWidth: 1,
        justifyContent: "center"
    },
    profileImage: {
        width: getLayoutSize(80),
        height: getLayoutSize(80),
        borderRadius: 40,
        alignSelf: "center",
    },
    profileName:{
        fontSize:getFontSize(16),
        color:"#ffffff",
        fontFamily:AppFonts.text.font2,
        alignSelf:"center",
    },
    fitnessText:{
        fontSize: getFontSize(11), 
        color: "#818181", 
        fontFamily: AppFonts.text.font4,
        marginTop:getLayoutSize(15), 
    },
    profileLineView: {
        borderColor: "#282c30",
        borderWidth: 0.5,
        height: getLayoutSize(70),
        width: getLayoutSize(1),
        marginLeft: getLayoutSize(100),
        alignSelf:"center",
    },  
    greaterImageView:{
        borderColor: "#818181", 
        borderWidth: 1, 
        borderRadius: 15, 
        justifyContent: "center", 
        height: getLayoutSize(30), 
        width: getLayoutSize(30),
        marginLeft:getLayoutSize(20),
        marginTop: getLayoutSize(-10),
        alignSelf:"center"
    },
    greaterImage:{
        height:getLayoutSize(20),
        width:getLayoutSize(20),
        alignSelf:"center",
        tintColor:"#818181"
    },
    tipsText: {
        color: "#ffffff",
        fontSize: getFontSize(14),
        marginTop: getLayoutSize(12),
        fontFamily: AppFonts.text.font4,
        alignSelf:"center",
    },
    codeImage: {
        tintColor: "#818181",
        height: getLayoutSize(30),
        width: getLayoutSize(30),
        marginTop: getLayoutSize(9),
        marginRight: getLayoutSize(-5),
        alignSelf: "center",
    },
    render2View:{
        flexDirection: "column", 
        justifyContent: "center", 
        height: getLayoutSize(400), 
        width: getLayoutSize(330),  
    },
    render2Image: {
        height: getLayoutSize(400),
        width:getLayoutSize(330),
        resizeMode:"cover",
        marginTop:getLayoutSize(10),
        alignSelf:"center",
    },
});