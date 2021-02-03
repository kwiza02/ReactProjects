//AllScreen

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

import { button, AppFonts, TrialHeader,Colors,TextUtils,ScaleUtils } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class AllScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            data: [
                {
                    content1: "TRAINING",
                    content2: "MONDAY",
                    content3: "MOTIVATION",
                    content4: "Discover how to keep yourself on track",
                    content5: "HEBA ALI",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                    imageProfile: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
                {
                    content1: "TRAINING",
                    content2: "MONDAY",
                    content3: "MOTIVATION",
                    content4: "Discover how to keep yourself on track",
                    content5: "HEBA ALI",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                    imageProfile: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
                {
                    content1: "TRAINING",
                    content2: "MONDAY",
                    content3: "MOTIVATION",
                    content4: "Discover how to keep yourself on track",
                    content5: "HEBA ALI",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                    imageProfile: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
                {
                    content1: "TRAINING",
                    content2: "MONDAY",
                    content3: "MOTIVATION",
                    content4: "Discover how to keep yourself on track",
                    content5: "HEBA ALI",
                    imageBackground: require("../../Assets/ImageAndIcons/pushups.jpg"),
                    imageProfile: require("../../Assets/ImageAndIcons/Bitmap_3.png"),
                },
            ],
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "column"}}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate("MondayMotivationScreen") }}>
                    <ImageBackground source={item.imageBackground} style={styles.renderImageBackground}>
                        <View style={{ padding: ScaleUtils.SCREEN_PADDING,marginTop:getLayoutSize(200)}}>
                            <Text style={styles.content1}>{item.content1}</Text>
                            <View style={{ marginTop: getLayoutSize(5) }}>
                                <Text style={styles.content2}>{item.content2}</Text>
                                <Text style={styles.content2}>{item.content3}</Text>
                            </View>
                            <Text style={styles.content3}>{item.content4}</Text>
                            <View style={{ flexDirection: "row",marginTop:getLayoutSize(20) }}>
                                <View style={styles.imageCircleView1}>
                                    <View style={styles.imageCircleView2}>
                                        <Image source={item.imageProfile} style={styles.renderImage} />
                                    </View>
                                </View>
                                <Text style={styles.content4}>{item.content5}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }


    render(){
        return(
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={{flexDirection:"column"}}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(index) => index.toString()}
                        renderItem={this.renderItem.bind(this)}
                        horizontal={false} />
                    </View>
                    <View style={{marginBottom:getLayoutSize(50)}}/>
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
    renderImageBackground: {
        height:getLayoutSize(480),
        width: ScaleUtils.IMAGE_WIDTH,
        justifyContent: "center",
    },
    content1: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize:TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font4,
    },
    content2: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize:TextUtils.TEXT_SIZE_THIRTYFIVE,
        fontFamily: AppFonts.text.font2,
    },
    content3:{
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize:TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily: AppFonts.text.font3,
        marginTop: ScaleUtils.MARGIN_TOP_TEN,
    },
    content4: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily: AppFonts.text.font4,
        alignSelf: "center",
        marginLeft: ScaleUtils.MARGIN_TOP_FIFTEEN,
    },
    imageCircleView1:{
        height: getLayoutSize(56),
        width: getLayoutSize(56),
        borderRadius:28,
        borderWidth:1,
        borderColor:Colors.DEFAULT_CONTENT_COLOR,
        justifyContent:"center",
    },
    imageCircleView2: {
        height: getLayoutSize(50),
        width: getLayoutSize(50),
        borderRadius: 25,
        borderWidth: 0.7,
        borderColor:Colors.COLOR_PRIMARY,
        justifyContent: "center",
        alignSelf:"center",
    },
    renderImage: {
        height: getLayoutSize(48),
        width: getLayoutSize(48),
        borderRadius:24,
        alignSelf: "center",
    },
});