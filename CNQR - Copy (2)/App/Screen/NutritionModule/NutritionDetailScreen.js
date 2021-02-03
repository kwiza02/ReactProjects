//NutritionDetailScreen

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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-community/async-storage';

import DirectionsTabScreen from './DirectionsTabScreen';
import IngredientsTabScreen from './IngredientsTabScreen';

import { button, AppFonts, TrialHeader,Colors,ScaleUtils,TextUtils } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';
import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';
const Tab = createMaterialTopTabNavigator();

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class NutritionDetailScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            recipe_detail:[],
            category_name:"",
            title:"",
            recipe_picture:"",
            duration:"",
            total_like:"",
            protein:"",
            carbs:"",
            fats:"",
            isLike:"",
            ingredients:[],
            isCheck:false,
            directions:[],
            isLikeCheck:false,
        };
    }

    async componentDidMount(){
        this.doRecipeDetail()
    }

    async doRecipeDetail() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
               recipe_id: await AsyncStorage.getItem("@recipe_id"), 
               user_id:await AsyncStorage.getItem("@user_id")
            })
            var data = await post(Constants.RECIPES_DETAIL, body);
           
            this.setState({ recipe_detail: data.data })

            this.setState({
                category_name: data.data.category_name,
                title: data.data.title,
                recipe_picture: data.data.recipe_picture,
                duration: data.data.duration,
                total_like: data.data.total_like,
                protein: data.data.protein,
                carbs: data.data.carbs,
                fats: data.data.fats,
                isLike: data.data.is_like,
            })

            this.setState({ ingredients: data.data.ingredients })
            console.log("ingredients-->" + this.state.ingredients);

            this.setState({ directions: data.data.directions.split(',') })
            console.log("DIRECTIONS-->" + JSON.stringify(this.state.directions));
    
            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Please check your internet connection.")
        }
    }

    async doLike() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                recipe_id: await AsyncStorage.getItem("@recipe_id"),
                user_id: await AsyncStorage.getItem("@user_id")
            })
            var data = await post(Constants.LIKE_RECIPES, body);

            this.doRecipeDetail();

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Please check your internet connection.")
        }
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <ImageBackground source={{uri:this.state.recipe_picture}} style={styles.imaageBackground}>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.imageShadow} >
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ marginTop: getLayoutSize(10), left: getLayoutSize(20), }} >
                                <Image source={require("../../Assets/ImageAndIcons/back_with_arrow.png")} style={styles.headerImageArrow} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <Image source={require("../../Assets/ImageAndIcons/video_play.png")} style={styles.headerImagePlay} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: ScaleUtils.SCREEN_PADDING, marginTop: getLayoutSize(140) }}>
                            <Text style={styles.content1}>{this.state.category_name}</Text>
                            <View style={{ marginTop: getLayoutSize(5), }}>
                                <Text style={styles.content2}>{this.state.title}</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: getLayoutSize(10) }}>
                                <Image source={require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png")} style={styles.imageTime}></Image>
                                <Text style={styles.content4}>{this.state.duration}</Text>
                                <TouchableOpacity onPress={() => { this.setState({ isLike: this.state.isLike}); this.doLike(); }}>
                                    {this.state.isLike === 1 ?
                                        <Image source={require("../../Assets/ImageAndIcons/heartFill.png")}
                                            style={styles.imageHeartFill} />
                                        :
                                        <Image source={require("../../Assets/ImageAndIcons/heart.png")}
                                            style={styles.imageHeart} />
                                    }
                                </TouchableOpacity>
                                <Text style={styles.heartText}>{this.state.total_like}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", padding: ScaleUtils.SCREEN_PADDING, }}>
                           <View style={styles.durationView}>
                               <View style={styles.topLineProteinView}></View>
                               <Text style={styles.boxHeader}>PROTEIN</Text>
                                <View style={styles.topLineProteinView}></View>
                                <Text style={styles.numberText}>{this.state.protein}</Text>
                           </View>
                            <View style={styles.durationView}>
                                <View style={styles.topLineCarbsView}></View>
                                <Text style={styles.boxHeader}>CARBS</Text>
                                <View style={styles.topLineCarbsView}></View>
                                <Text style={styles.numberText}>{this.state.carbs}</Text>
                            </View>
                            <View style={styles.durationView}>
                                <View style={styles.topLineFatsView}></View>
                                <Text style={styles.boxHeader}>FATS</Text>
                                <View style={styles.topLineFatsView}></View>
                                <Text style={styles.numberText}>{this.state.fats}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </ImageBackground>
                <View style={{ flexDirection: "row", marginBottom: getLayoutSize(30), justifyContent: "space-around",marginBottom: ScaleUtils.MARGIN_TOP_THIRTY }}>
                    <View style={{flexDirection:"column"}}>
                        <TouchableOpacity style={this.state.isCheck === false ? styles.active : styles.inactive}
                            onPress={() => { this.setState({ isCheck: !this.state.isCheck, }); }}>
                            <Text style={this.state.isCheck === false ? styles.activeText : styles.inactiveText}>INGREDIENTS</Text>
                        </TouchableOpacity>
                        
                    </View>
                   <View style={{flexDirection:"column"}}>
                        <TouchableOpacity style={this.state.isCheck === true ? styles.active : styles.inactive}
                            onPress={() => {
                                this.setState({ isCheck: !this.state.isCheck, });
                            }}>
                            <Text style={this.state.isCheck === true ? styles.activeText : styles.inactiveText}>DIRECTIONS</Text>
                        </TouchableOpacity>
                        {this.state.directions.map((item)=>{
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", padding: ScaleUtils.SCREEN_PADDING, }}>
                                <View style={styles.dotView}></View>
                                <Text style={styles.contentIngredients}>{item}</Text>
                            </View>
                        })}
                   </View>
                </View>
                <View style={{ flexDirection: "column" }}>
                    {this.state.isCheck === false ?
                        this.state.ingredients.map((item) => (
                            <View style={{ flexDirection: "column" }}>
                                <View style={{ flexDirection: "row", marginTop: ScaleUtils.MARGIN_TOP_TEN, }}>

                                    <View style={{
                                        height: getLayoutSize(8), marginTop: 8, width: getLayoutSize(8),
                                        borderRadius: 4, backgroundColor: Colors.COLOR_PRIMARY
                                    }}></View>
                                    <Text style={styles.contentIngredients}>{item.ingredients}</Text>
                                </View>
                                <View style={{ height: getLayoutSize(1), marginTop: getLayoutSize(20), width: "100%", backgroundColor: "#1c1c1c" }}></View>
                            </View>

                        ))
                        :
                        this.state.directions.map((item) => (
                            <View style={{ flexDirection: "column" }}>
                                <View style={{ flexDirection: "row", marginTop: ScaleUtils.MARGIN_TOP_TEN, }}>

                                    <View style={{
                                        height: getLayoutSize(8), marginTop: 8, width: getLayoutSize(8),
                                        borderRadius: 4, backgroundColor: Colors.COLOR_PRIMARY
                                    }}></View>
                                    <Text style={styles.contentIngredients}>{item}</Text>
                                </View>
                                <View style={{ height: getLayoutSize(1), marginTop: getLayoutSize(20), width: "100%", backgroundColor:"#1c1c1c" }}></View>
                            </View>

                        ))
                    }

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
    headerImageArrow: {
        height: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        width: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        alignItems: "flex-end",
    },
    headerImagePlay: {
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: ScaleUtils.IMAGE_SIZE_THIRTY,
        alignItems: "flex-start",
        right: ScaleUtils.MARGIN_TWENTY,
        marginTop: ScaleUtils.MARGIN_TOP_TEN,
        resizeMode: "contain"
    },
    imageShadow: {
        height: getLayoutSize(475),
        width: "100%",
    },
    imaageBackground: {
        height: getLayoutSize(475),
        width: screenWidth,
        justifyContent: "center",
    },
    content1: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font4,
        fontSize: TextUtils.BUTTON_TEXT,
    },
    content2: {
        color:Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.TEXT_SIZE_THIRTYFIVE,
    },
    content4: {
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        fontSize: TextUtils.BUTTON_TEXT,
        marginLeft: ScaleUtils.MARGIN_TOP_TEN,
    },
    imageTime: {
        height: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        width: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        tintColor: Colors.DEFAULT_SUB_CONTENT_COLOR,
    },
    imageHeart: {
        height: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        width: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        tintColor: Colors.DEFAULT_SUB_CONTENT_COLOR,
        marginLeft: ScaleUtils.MARGIN_TOP_FIFTEEN
    },
    imageHeartFill: {
        height: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        width: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        marginLeft: ScaleUtils.MARGIN_TOP_FIFTEEN,
        tintColor:"red",
    },
    heartText: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        fontSize: TextUtils.BUTTON_TEXT,
        marginLeft: ScaleUtils.MARGIN_FIVE,
    },
    durationView: {
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        height: getLayoutSize(65),
        width: "30%",
        marginLeft: getLayoutSize(10),
        borderTopWidth: 0,
        flexDirection: "row",
    },
    topLineProteinView: {
        borderTopWidth: 0.8,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width: "19%"
    },
    topLineCarbsView: {
        borderTopWidth: 0.8,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width: "26%"
    },
    topLineFatsView: {
        borderTopWidth: 0.8,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width: "32%"
    },
    boxHeader: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        marginTop: getLayoutSize(-8),
        marginLeft: ScaleUtils.MARGIN_FIVE,
        marginRight: ScaleUtils.MARGIN_FIVE,
        fontFamily: AppFonts.text.font4,
        fontSize: TextUtils.BUTTON_TEXT,
    },
    numberText:{
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        position:"absolute",
        fontFamily: AppFonts.text.font3,
        fontSize: TextUtils.TEXT_SIZE_EIGHTEEN,
        alignSelf:"center",
        marginLeft:getLayoutSize(35)
    },
    activeText: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font4,
        fontSize: getLayoutSize(13),
        alignSelf: "center",
        marginTop:ScaleUtils.MARGIN_TOP_FIFTEEN,
    },
    inactiveText: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        fontFamily: AppFonts.text.font4,
        fontSize: getLayoutSize(13),
        alignSelf: "center",
        marginTop: ScaleUtils.MARGIN_TOP_FIFTEEN,
    },
    active: {
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width:screenWidth/2,
        borderColor: Colors.COLOR_PRIMARY,
        borderTopWidth: 0.7,
        justifyContent: "center",
    },
    inactive: {
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: screenWidth / 2,
        borderColor:"#1c1c1c",
        borderTopWidth: 0.7,
        justifyContent: "center",
    },
    dotView: {
        borderWidth: 1,
        backgroundColor: Colors.COLOR_PRIMARY,
        borderRadius: 4,
        height: getLayoutSize(8),
        width: getLayoutSize(8),
        alignSelf: "center"
    },
    contentIngredients: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        alignSelf: "center",
        fontFamily: AppFonts.text.font3,
        marginLeft: getLayoutSize(15)
    },
});