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

import { button, AppFonts, TrialHeader,Colors ,TextUtils,ScaleUtils} from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class AllScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            isCheck:false,
            data:[
                {
                    image:require("../../Assets/ImageAndIcons/chicken_wrap.png"),
                    content1:"HIGH PROTEIN",
                    content2:"CHICKEN",
                    content3:"WRAP",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png"),
                    content4:"15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/shakes.png"),
                    content1: "HIGH PROTEIN",
                    content2: "SHAKES",
                    content3: "HOT",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png"),
                    content4: "15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/paneer.png"),
                    content1: "MUTTER",
                    content2: "PANEER",
                    content3: "WRAP",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png"),
                    content4: "15 mins",
                },
            ],
            data2: [
                {
                    image: require("../../Assets/ImageAndIcons/chicken_wrap.png"),
                    content1: "HIGH PROTEIN",
                    content2: "CHICKEN",
                    content3: "WRAP",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png"),
                    content4: "15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/shakes.png"),
                    content1: "HIGH PROTEIN",
                    content2: "SHAKES",
                    content3: "HOT",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png"),
                    content4: "15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/paneer.png"),
                    content1: "LOW FAT",
                    content2: "MUTTER",
                    content3: "PANEER",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png"),
                    content4: "15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/cauliflower_pizza.png"),
                    content1: "HIGH PROTEIN",
                    content2: "GRILLED FISH",
                    content3: "AU CHIEN",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png"),
                    content4: "15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/fish.png"),
                    content1: "LOW FAT",
                    content2: "CAULIFLOWER",
                    content3: "PIZZA",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png"),
                    content4: "15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/shakes.png"),
                    content1: "LOW CARBS",
                    content2: "SHAKES",
                    content3: "HOT",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png"),
                    content4: "15 mins",
                },
            ],
        };
    }

    renderItem({item}){
        return(
            <View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("NutritionDetailScreen") }}>
                    <ImageBackground source={item.image} style={styles.imaageBackground}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.imageShadow} >
                            <View style={{ padding: ScaleUtils.SCREEN_PADDING, marginTop: getLayoutSize(140) }}>
                                <Text style={styles.content1}>{item.content1}</Text>
                                <View style={{ marginTop: getLayoutSize(5),}}>
                                    <Text style={styles.content2}>{item.content2}{"\n\t"}{item.content3}</Text>
                                </View>
                                <View style={{flexDirection:"row",marginTop:getLayoutSize(10)}}>
                                    <Image source={item.imageTime} style={styles.imageTime}></Image>
                                    <Text style={styles.content4}>{item.content4}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }

    renderItem2({ item }) {
        return (
            <View>
                    <ImageBackground source={item.image} style={styles.render2ImaageBackground}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.render2ImageShadow} >
                        <View style={{ padding: ScaleUtils.SCREEN_PADDING, marginTop: getLayoutSize(140) }}>
                                <Text style={styles.content1}>{item.content1}</Text>
                                <View style={{ marginTop: getLayoutSize(3), }}>
                                    <Text style={styles.render2Content2}>{item.content2}{"\n"}{item.content3}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: getLayoutSize(10) }}>
                                    <Image source={item.imageTime} style={styles.render2ImageTime}></Image>
                                    <Text style={styles.render2Content4}>{item.content4}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
            </View>
        );
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <ScrollView>
                    <Text style={styles.headerText}>RECIPES</Text>
                    <View style={{ flexDirection: "row", marginBottom: getLayoutSize(30),marginLeft:getLayoutSize(15)}}>
                        <TouchableOpacity style={ this.state.isCheck===false ? styles.active : styles.inactive}
                        onPress={()=>{this.setState({isCheck:this.state.isCheck})}}>
                            <Text style={this.state.isCheck === false ? styles.activeText : styles.inactiveText}>POPULAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.isCheck === true ? styles.active : styles.inactive}
                            onPress={() => { this.setState({ isCheck: !this.state.isCheck }) }}>
                            <Text style={this.state.isCheck === true ? styles.activeText : styles.inactiveText}>NEW</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(index) => index.toString()}
                        renderItem={this.renderItem.bind(this)}
                        horizontal={true} />
                    <FlatList
                        data={this.state.data2}
                        keyExtractor={(index) => index.toString()}
                        renderItem={this.renderItem2.bind(this)}
                        horizontal={false}
                        numColumns={2} />
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
    headerText: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize:TextUtils.TEXT_SIZE_THIRTYTWO,
        fontFamily: AppFonts.text.font2,
        padding:ScaleUtils.SCREEN_PADDING,
    },
    imageShadow:{
        height: getLayoutSize(330),
        width: ScaleUtils.IMAGE_WIDTH,
    },
    imaageBackground:{
        height:getLayoutSize(330),
        width:screenWidth,
        justifyContent:"center",
    },
    content1:{
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily:AppFonts.text.font4,
        fontSize:TextUtils.BUTTON_TEXT,
    },
    content2:{
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.TEXT_SIZE_THIRTYFIVE,
    },
    content4:{
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        marginLeft: ScaleUtils.MARGIN_TOP_TEN,
    },
    imageTime:{
        height: ScaleUtils.IMAGE_SIZE_TWENTY,
        width: ScaleUtils.IMAGE_SIZE_TWENTY,
        tintColor: Colors.DEFAULT_SUB_CONTENT_COLOR
    },
    render2ImageShadow: {
        height: getLayoutSize(300),
        width: ScaleUtils.IMAGE_WIDTH,
    },
    render2ImaageBackground: {
        height: getLayoutSize(300),
        width:screenWidth/2,
        justifyContent: "center",
        opacity: 0.9,
    },
    render2Content2: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
    },
    render2Content4: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        fontSize: TextUtils.BUTTON_TEXT,
        marginLeft: ScaleUtils.MARGIN_TOP_TEN,
    },
    render2ImageTime: {
        height: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        width: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        tintColor: Colors.DEFAULT_SUB_CONTENT_COLOR,
    },
    activeText: {
        color:Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font4,
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf:"center",
    },
    inactiveText: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily: AppFonts.text.font4,
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf:"center",
    },
    active:{
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width:"25%",
        borderColor:Colors.COLOR_PRIMARY,
        borderWidth:1,
        borderRadius:20,
        justifyContent:"center",
    },
    inactive:{
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: "25%",
        borderColor: Colors.COLOR_PRIMARY,
        borderWidth: 0,
        borderRadius: 20,
        justifyContent: "center",
    },
});
