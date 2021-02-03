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
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import { post } from '../../RestAPI/RestAPIHandler';
import ModalProgress from '../../Component/ModalProgress';
import Utils from '../../Component/Utils';
import { button, AppFonts, TrialHeader,Colors,TextUtils,ScaleUtils } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

console.disableYellowBox=true;

export default class PlanScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            recommended_plan_list:[],
            isLoading:false,
            calories:"",
            carbs:"",
            protein:"",
            fat:"",
            total_page:0,
            page:0,
        };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("PlanScreen")
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    async componentDidMount(){
        this.setState({
            calories: await AsyncStorage.getItem("@calories"),
            carbs: await AsyncStorage.getItem("@carbs"),
            protein: await AsyncStorage.getItem("@protein"),
            fat: await AsyncStorage.getItem("@fat")})
    
            this.state.protein = this.state.protein.replace(/['"]+/g, '')
        
        this.doRecommendedPlanList() 
    }

    async doRecommendedPlanList() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                trainer_id: "",
                page: this.state.page,
            })
            var data = await post(Constants.RECOMMENDED_PLAN_LIST, body);
            console.log(("Data-->" + JSON.stringify(data)));

            this.setState({ recommended_plan_list: data.data, total_page: data.total_page})
            //console.log("TOTALPAGE-->" +this.state.total_page);

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
                
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert","Please check your internet connection.")
        }
    }

    handleMore(){
        if(this.state.total_page>this.state.page){
            this.setState({page:this.state.page+1})
            this.doRecommendedPlanList()
        }else{}
    }


    renderItem = ({ item}) => {
        return(
            <View style={{flexDirection:"column"}}>
                <ImageBackground source={{uri:item.trainer_picture}} style={styles.renderImageBackground} imageStyle={styles.renderImageStyle}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("SelectPlanScreen", { plan_list_id: item.id });AsyncStorage.setItem("@plan_list_id",JSON.stringify(item.id))}}>   
                   <View style={styles.renderBoxView}>
                            <Text style={styles.content1}>{item.category_name }</Text>
                            <View style={{ marginTop: getLayoutSize(5) }}>
                                <Text style={styles.content2}>{item.name}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../../Assets/ImageAndIcons/dumbell.png")} style={styles.renderImage} />
                                <Text style={styles.content4}>{item.days_week}</Text>
                            </View>
                            <View style={{ flexDirection: "row"}}>
                                <Image source={require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt.png")} style={styles.renderImage} />
                                <Text style={styles.content4}>{item.weeks}</Text>
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
                    <ModalProgress
                        isVisible={this.state.isLoading}></ModalProgress>
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
                                        <Text style={{ color:Colors.COLOR_PRIMARY, fontFamily:AppFonts.text.font3,fontSize:getFontSize(22)}}>{this.state.calories}</Text>
                                        <Text style={styles.textStyle}>Calories</Text>
                                        <View style={{ borderWidth: 1, borderColor:Colors.DEFAULT_CONTENT_COLOR, height: 60, width: "2%", position: "absolute",marginLeft:getLayoutSize(80) }} />
                                    </View>
                                    <View style={styles.carbsView}>
                                        <Text style={styles.numberStyle}>{this.state.carbs}</Text>
                                        <Text style={styles.textStyle}>Carbs</Text>
                                    </View>
                                    <View style={styles.protienView}>
                                        <Text style={styles.numberStyle}>{this.state.protein}</Text>
                                        <Text style={styles.textStyle}>Protien</Text>
                                    </View>
                                    <View style={styles.fatView}>
                                            <Text style={styles.numberStyle}>{this.state.fat}</Text>
                                        <Text style={styles.textStyle}>Fat</Text>
                                    </View>
                            </View>
                        </View>
                        </ImageBackground>
                    </ImageBackground>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingLeft: ScaleUtils.SCREEN_PADDING,}}>
                        <Text style={styles.planText}>YOUR  RECOMMENDED  PLANS</Text>
                        <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        {this.state.isLoading === true ?
                            <ActivityIndicator size="small" color="#ffffff" /> : (
                                this.state.recommended_plan_list.length !== 0 ?
                        <FlatList
                            data={this.state.recommended_plan_list}
                            keyExtractor={(index) => index.toString()}
                            renderItem={this.renderItem.bind(this)}
                            horizontal={true}
                            onEndReached={this.handleMore.bind(this)} />
                                    : <Text style={{color:"white"}}>No Records</Text>
                            )}
                    </View>
                    <View style={{marginBottom:getLayoutSize(10)}}></View>
                </ScrollView>
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
        paddingLeft: ScaleUtils.SCREEN_PADDING,
        top: getLayoutSize(220),
    },
    backgroundImage: {
        flex: 1,
        height:getLayoutSize(570),
        width: ScaleUtils.IMAGE_WIDTH,
    },
    shadow: {
        width: ScaleUtils.IMAGE_WIDTH,
        height: screenHeight,
        position: "absolute",
    },
    headerText:{
        fontSize:TextUtils.TEXT_SIZE_FORTYTWO,
        color:Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily:AppFonts.text.font2,
    },
    headerContent:{
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily:AppFonts.text.font3,
        fontSize: TextUtils.BUTTON_TEXT,
    },
    boxView:{
        borderWidth: 1, 
        borderColor: Colors.DEFAULT_CONTENT_COLOR, 
        height: getLayoutSize(112), 
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY, 
        marginRight: ScaleUtils.MARGIN_TWENTY, 
        borderTopWidth: 0, 
        flexDirection: "row",
    },
    topLineView: { 
        borderTopWidth: 0.8, 
        borderColor: Colors.DEFAULT_CONTENT_COLOR, 
        width:getLayoutSize(screenWidth/3.87)
    },
    breakdownText:{
        color: Colors.DEFAULT_APP_FONT_COLOR, 
        fontSize: TextUtils.BUTTON_TEXT, 
        marginLeft:ScaleUtils.MARGIN_TOP_FIFTEEN, 
        marginRight: ScaleUtils.MARGIN_TOP_FIFTEEN, 
        marginTop: getLayoutSize(-10), 
        fontFamily: AppFonts.text.font4,
    },
    caloriesView:{
        position: "absolute", 
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY, 
        left: ScaleUtils.MARGIN_TOP_THIRTY
    },
    textStyle:{
        color: Colors.DEFAULT_CONTENT_COLOR,
         fontFamily: AppFonts.text.font3, 
        fontSize: TextUtils.BUTTON_TEXT, 
         alignSelf: "center",
    },
    numberStyle:{
        color: Colors.DEFAULT_SUB_CONTENT_COLOR, 
        fontFamily: AppFonts.text.font3, 
        fontSize: TextUtils.TEXT_SIZE_TENTYTWO,
    },
    gText:{
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        color: Colors.DEFAULT_APP_FONT_COLOR,
    },
    carbsView:{
        position: "absolute", 
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY, 
        left: getLayoutSize(130) 
    },
    protienView:{
        position: "absolute", 
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY, 
        left: getLayoutSize(210),
    },
    fatView:{
        position: "absolute", 
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY, 
        left: getLayoutSize(290) ,
    },
    planText:{
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        marginTop: getLayoutSize(-12),
        fontFamily: AppFonts.text.font4,
    },
    codeImage:{
        tintColor: Colors.DEFAULT_CONTENT_COLOR,
        height:ScaleUtils.IMAGE_SIZE_THIRTY,
        width: ScaleUtils.IMAGE_SIZE_THIRTY,
        marginTop: getLayoutSize(-15),
        marginRight: ScaleUtils.MARGIN_TOP_FIFTEEN,
    },
    renderShadow: {
        width:ScaleUtils.IMAGE_WIDTH,
        height: screenHeight,
    },
    renderImageBackground: {
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
        height:getLayoutSize(350),
        width:getLayoutSize(300),
        justifyContent:"center",
        marginLeft: ScaleUtils.MARGIN_TWENTY,
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
        borderColor: Colors.DEFAULT_CONTENT_COLOR, 
        width: "92%",
        alignSelf:"center",
        padding: getLayoutSize(10),
    },
    content1:{
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily:AppFonts.text.font4,
        marginTop:ScaleUtils.MARGIN_TWENTY,
    },
    content2:{
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_THIRTY,
        fontFamily:AppFonts.text.font1,
    },
    content4:{
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily:AppFonts.text.font3,
        alignSelf:"center",
    },
    renderImage:{
        height: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        width:ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        tintColor: Colors.DEFAULT_SUB_CONTENT_COLOR,
        marginRight: ScaleUtils.MARGIN_TOP_TEN,
        alignSelf: "center",
    },
    registerButtonView: {
        marginTop: ScaleUtils.MARGIN_TWENTY,
        padding: ScaleUtils.SCREEN_PADDING,
    },
    ButtonLoginContainer: {
        height: ScaleUtils.IMAGE_SIZE_FIFTY,
        width: ScaleUtils.IMAGE_WIDTH,
        borderRadius: 40,
        borderColor: Colors.COLOR_PRIMARY,
        justifyContent: "center",
        borderWidth: 1,
    },
    mainScreenButtonLoginText: {
        fontFamily:AppFonts.text.font4,
        color: Colors.COLOR_PRIMARY,
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf: "center",
    },
});
