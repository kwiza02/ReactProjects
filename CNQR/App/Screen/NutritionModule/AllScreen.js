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

import { button, AppFonts, TrialHeader, } from '../../Resources/index';
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
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt_3x.png"),
                    content4:"15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/shakes.png"),
                    content1: "HIGH PROTEIN",
                    content2: "SHAKES",
                    content3: "HOT",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt_3x.png"),
                    content4: "15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/paneer.png"),
                    content1: "MUTTER",
                    content2: "PANEER",
                    content3: "WRAP",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt_3x.png"),
                    content4: "15 mins",
                },
            ],
            data2: [
                {
                    image: require("../../Assets/ImageAndIcons/chicken_wrap.png"),
                    content1: "HIGH PROTEIN",
                    content2: "CHICKEN",
                    content3: "WRAP",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt_3x.png"),
                    content4: "15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/shakes.png"),
                    content1: "HIGH PROTEIN",
                    content2: "SHAKES",
                    content3: "HOT",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt_3x.png"),
                    content4: "15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/paneer.png"),
                    content1: "LOW FAT",
                    content2: "MUTTER",
                    content3: "PANEER",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt_3x.png"),
                    content4: "15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/cauliflower_pizza.png"),
                    content1: "HIGH PROTEIN",
                    content2: "GRILLED FISH",
                    content3: "AU CHIEN",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt_3x.png"),
                    content4: "15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/fish.png"),
                    content1: "LOW FAT",
                    content2: "CAULIFLOWER",
                    content3: "PIZZA",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt_3x.png"),
                    content4: "15 mins",
                },
                {
                    image: require("../../Assets/ImageAndIcons/shakes.png"),
                    content1: "LOW CARBS",
                    content2: "SHAKES",
                    content3: "HOT",
                    imageTime: require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt_3x.png"),
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
                            <View style={{ padding: getLayoutSize(20), marginTop: getLayoutSize(140) }}>
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
                            <View style={{ padding: getLayoutSize(20), marginTop: getLayoutSize(140) }}>
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
        backgroundColor: "black",
        flex: 1,
    },
    headerText: {
        color: "#ffffff",
        fontSize: getFontSize(32),
        fontFamily: AppFonts.text.font2,
        padding:getLayoutSize(20),
    },
    imageShadow:{
        height: getLayoutSize(330),
        width: "100%",
    },
    imaageBackground:{
        height:getLayoutSize(330),
        width:screenWidth,
        justifyContent:"center",
    },
    content1:{
        color:"#ffffff",
        fontFamily:AppFonts.text.font4,
        fontSize:getFontSize(13),
    },
    content2:{
        color: "#ffffff",
        fontFamily: AppFonts.text.font2,
        fontSize: getFontSize(35),
    },
    content4:{
        color: "#dedede",
        fontFamily: AppFonts.text.font3,
        fontSize: getFontSize(14),
        marginLeft: getLayoutSize(10),
    },
    imageTime:{
        height:getLayoutSize(20),
        width:getLayoutSize(20),
        tintColor:"#dedede"
    },
    render2ImageShadow: {
        height: getLayoutSize(300),
        width: "100%",
    },
    render2ImaageBackground: {
        height: getLayoutSize(300),
        width:screenWidth/2,
        justifyContent: "center",
        opacity: 0.9,
    },
    render2Content2: {
        color: "#ffffff",
        fontFamily: AppFonts.text.font2,
        fontSize: getFontSize(16),
    },
    render2Content4: {
        color: "#dedede",
        fontFamily: AppFonts.text.font3,
        fontSize: getFontSize(12),
        marginLeft:getLayoutSize(10),
    },
    render2ImageTime: {
        height: getLayoutSize(15),
        width: getLayoutSize(15),
        tintColor: "#dedede"
    },
    activeText: {
        color: "#ffffff",
        fontFamily: AppFonts.text.font4,
        fontSize: getFontSize(13),
        alignSelf:"center",
    },
    inactiveText: {
        color: "#dedede",
        fontFamily: AppFonts.text.font4,
        fontSize: getFontSize(13),
        alignSelf:"center",
    },
    active:{
        height:getLayoutSize(30),
        width:"25%",
        borderColor:"#00f3b9",
        borderWidth:1,
        borderRadius:20,
        justifyContent:"center",
    },
    inactive:{
        height: getLayoutSize(30),
        width: "25%",
        borderColor: "#00f3b9",
        borderWidth: 0,
        borderRadius: 20,
        justifyContent: "center",
    },
});
