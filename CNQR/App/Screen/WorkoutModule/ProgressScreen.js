//ProgressScreen

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
import RNPickerSelect from 'react-native-picker-select';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';

import { button, AppFonts, TrialHeader,  } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class ProgressScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            data:[
                {
                    content1:"80.0",
                    content2:"kg",
                    content3:"Baseline",
                },
                {
                    content1: "82.2",
                    content2: "kg",
                    content3: "Current",
                },
                {
                    content1: "+1.2",
                    content2: "kg",
                    content3: "Change",
                    imagePlay: require("../../Assets/ImageAndIcons/play.png"),
                },
            ],
            data2:[
                {
                    content1: "82.3",
                    content2: "kg",
                    content3: "Saturday,June 15,2020",
                },
                {
                    content1: "82.3",
                    content2: "kg",
                    content3: "Saturday,June 15,2020",
                },
                {
                    content1: "82.3",
                    content2: "kg",
                    content3: "Saturday,June 15,2020",
                },
                {
                    content1: "82.3",
                    content2: "kg",
                    content3: "Saturday,June 15,2020",
                },
            ],
        };
    }

    renderItem({item}){
        return(
            <View style={{flexDirection:"column"}}>
                <View style={{flexDirection:"row"}}>
                    <Image source={item.imagePlay} style={{height:10,width:10,tintColor:"#00fb39",marginLeft:15,marginTop:12,transform:[{rotate:"-90deg"}]}}/>
                    <Text style={styles.content1Text}>{item.content1}</Text>
                    <Text style={styles.content2Text}>{item.content2}</Text>
                </View>
                <Text style={styles.content3Text}>{item.content3}</Text>
            </View>
        );
    }

    renderItem2({ item }) {
        return (
            <View style={{ flexDirection: "row" }}>
                <View style={styles.render2Circle}>
                    <Text style={styles.render2Content1Text}>{item.content1}</Text>
                    <Text style={styles.render2Content2Text}>{item.content2}</Text>
                </View>
                <Text style={styles.render2Content3Text}>{item.content3}</Text>
            </View>
        );
    }

    renderSeparator = () => {
        return (
            <View style={{
                height: 55,
                borderColor: "#282c30",
                borderWidth: 1,
                width: 1,
                marginLeft:20,
                marginRight:5,
            }}>
            </View>
        );
    }  

    render() {
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.boxView}>
                            <View style={styles.topLineView} />
                            <Text style={styles.breakdownText}>YOUR BREAKDOWN</Text>
                            <View style={styles.topLineView} />
                            <View style={styles.caloriesView}>
                                <Text style={{ color: "#00f3b9", fontFamily: AppFonts.text.font3, fontSize: getFontSize(22) }}>2,144</Text>
                                <Text style={styles.textStyle}>Calories</Text>
                                <View style={{ borderWidth: 1, borderColor: "#868686", height: 60, width: "2%", position: "absolute", marginLeft: getLayoutSize(80) }} />
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
                        <View style={{flexDirection:"row",marginTop:getLayoutSize(15),justifyContent:"center"}}>
                            <Text style={styles.meanText}>What does this mean?</Text>
                            <Text style={styles.understandText}>Understand Macros</Text>
                        </View>
                        <View style={{ flexDirection: "row",justifyContent:"space-between" }}>
                            <View style={styles.viewMonth}>
                                <RNPickerSelect
                                    placeholder={{
                                        label: 'MONTHS',
                                        value: null,
                                        color: 'black',
                                    }}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                            top: 20,
                                            right: 10,
                                        }
                                    }}
                                    onValueChange={(value) => console.log(value)}
                                    items={[
                                        { label: 'January', value: 'January' },
                                        { label: 'February', value: 'February' },
                                        { label: 'March', value: 'March' },
                                        { label: 'April', value: 'April' },
                                        { label: 'May', value: 'May' },
                                        { label: 'June', value: 'June' },
                                        { label: 'July', value: 'July' },
                                        { label: 'Augst', value: 'Augst' },
                                        { label: 'Sepetember', value: 'Sepetember' },
                                        { label: 'October', value: 'October' },
                                        { label: 'November', value: 'November' },
                                        { label: 'December', value: 'December' },

                                    ]}
                                />
                                <Image source={require("../../Assets/ImageAndIcons/arrow-down-sign-to-navigate.png")}
                                style={styles.dropdownImage}></Image>
                            </View>
                            <View style={styles.viewWeight}>
                                <RNPickerSelect
                                    placeholder={{
                                        label: 'MY WEIGHT',
                                        value: 'MY WEIGHT',
                                        color: 'black',
                                    }}
                                    style={{
                                        ...pickerSelectStylesWeight,
                                        iconContainer: {
                                            top: 20,
                                            right: 10,
                                        }
                                    }}

                                    onValueChange={(value) => console.log(value)}
                                    items={[
                                        { label: '1', value: '1' },
                                        { label: '2', value: '2' },
                                        { label: '3', value: '3' },
                                    ]}
                                />
                                <Image source={require("../../Assets/ImageAndIcons/arrow-down-sign-to-navigate.png")}
                                    style={styles.dropdownImage}></Image>
                            </View>
                        </View>
                        <View style={{ marginTop: 25 }}>
                            <FlatList
                                data={this.state.data}
                                keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem.bind(this)}
                                horizontal={true}
                                ItemSeparatorComponent={this.renderSeparator}
                            />
                        </View>
                        <View style={{marginTop:getLayoutSize(30),justifyContent:"center"}}>
                            <LineChart
                                data={{
                                    labels: [
                                        '15/6',
                                        '16/6',
                                        '17/6',
                                        '18/6',
                                        '19/6',
                                        '20/6',
                                        '21/6',
                                        '22/6',
                                        '23/6',
                                    ],
                                    datasets: [
                                        {
                                            data: [20, 45, 28, 80, 99, 43,45,66,33,38],
                                            strokeWidth: 1,
                                        },
                                    ],
                                }}
                                width={350}
                                height={220}
                                withVerticalLines={false}
                                chartConfig={{
                                    backgroundGradientFrom: '#000000',
                                    backgroundGradientTo: '#000000',
                                    decimalPlaces: 1,
                                    fontSize: getFontSize(10),
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                    propsForDots: {
                                        backgroundColor: "#00f3b9",
                                        r: "2",
                                        strokeWidth: "8",
                                        stroke: "#00f3b9",
                                        strokeOpacity:1,
                                    },
                                    propsForBackgroundLines: {
                                        strokeDasharray: '',
                                        color: "#1c1c1c" // solid background lines with no dashes
                                    },
                                }}
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                }}
                            />
                        </View>
                        <Text style={styles.entryText}>ENTRIES</Text>
                        <View style={{ marginTop: 0 }}>
                            <FlatList
                                data={this.state.data2}
                                keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem2.bind(this)}
                            />
                        </View>
                        <View style={{marginBottom:getLayoutSize(50)}}></View>
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
    },
    boxView: {
        borderWidth: 1,
        borderColor: "#868686",
        height: getLayoutSize(112),
        marginRight: getLayoutSize(20),
        borderTopWidth: 0,
        flexDirection: "row",
        marginTop:getLayoutSize(30),
    },
    topLineView: {
        borderTopWidth: 0.8,
        borderColor: "#868686",
        width: getLayoutSize(screenWidth / 3.87)
    },
    breakdownText: {
        color: "#ffffff",
        fontSize: getFontSize(12),
        marginLeft: getLayoutSize(15),
        marginRight: getLayoutSize(15),
        marginTop: getLayoutSize(-10),
        fontFamily: AppFonts.text.font4,
    },
    caloriesView: {
        position: "absolute",
        marginTop: getLayoutSize(30),
        left: getLayoutSize(30)
    },
    textStyle: {
        color: "#868686",
        fontFamily: AppFonts.text.font3,
        fontSize: getFontSize(13),
        alignSelf: "center",
    },
    numberStyle: {
        color: "#dedede",
        fontFamily: AppFonts.text.font3,
        fontSize: getFontSize(22),
    },
    gText: {
        fontSize: getFontSize(15),
        color: "white",
    },
    carbsView: {
        position: "absolute",
        marginTop: getLayoutSize(30),
        left: getLayoutSize(130)
    },
    protienView: {
        position: "absolute",
        marginTop: getLayoutSize(30),
        left: getLayoutSize(210),
    },
    fatView: {
        position: "absolute",
        marginTop: getLayoutSize(30),
        left: getLayoutSize(290),
    },
    meanText: {
        fontSize: getFontSize(13),
        color: "#818181",
        fontFamily:AppFonts.text.font3,
        alignSelf:"center",
    },
    understandText: {
        fontSize: getFontSize(14),
        color: "#00f3b9",
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        marginLeft:getLayoutSize(10)
    },
    content1Text:{
        color:"#dedede",
        fontSize:getFontSize(25),
        fontFamily:AppFonts.text.font4,
        alignSelf:"center"
    },
    content2Text: {
        color: "#dedede",
        fontSize: getFontSize(15),
        fontFamily: AppFonts.text.font3,
        alignSelf:"center",
        marginTop:getLayoutSize(10),
    },
    content3Text: {
        color: "#818181",
        fontSize: getFontSize(13),
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        marginLeft:getLayoutSize(35),
    },
    viewWeight: {
        height: getLayoutSize(50), 
        width: getLayoutSize(190), 
        flexDirection: "row",
        backgroundColor: "#1c1c1c", 
        borderRadius: 50, 
        marginTop: getLayoutSize(40),
    },
    viewMonth: {
        height: getLayoutSize(50),
         width: getLayoutSize(180), 
         flexDirection: "row",
        backgroundColor: "#1c1c1c", 
        borderRadius: 50, 
        marginTop: getLayoutSize(40),
    },
    dropdownImage:{
        height: getLayoutSize(12), 
        width: getLayoutSize(12), 
        alignSelf: "center", 
        tintColor: "#ffffff" 
    },
    entryText:{
        color: "#e6e6e6",
        fontSize: getFontSize(17),
        marginTop: getLayoutSize(20),
        fontFamily: AppFonts.text.font4,
        paddingLeft: getLayoutSize(20),
    },
    render2Circle:{
        borderWidth:1,
        borderRadius:40,
        height:getLayoutSize(80),
        width:getLayoutSize(80),
        borderColor:"#818181",
        justifyContent:"center",
        flexDirection:"row",
        marginTop:getLayoutSize(15),
        marginLeft:getLayoutSize(15),
    },
    render2Content1Text: {
        color: "#dedede",
        fontSize: getFontSize(20),
        fontFamily: AppFonts.text.font3,
        alignSelf: "center"
    },
    render2Content2Text: {
        color: "#dedede",
        fontSize: getFontSize(13),
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        marginTop:getLayoutSize(5),
    },
    render2Content3Text: {
        color: "#dedede",
        fontSize: getFontSize(15),
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        marginLeft: getLayoutSize(35),
    },

});

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        height: getLayoutSize(50),
        width: getLayoutSize(150),
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        alignSelf: "center",
        color: 'white',
        backgroundColor: "transparent",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const pickerSelectStylesWeight = StyleSheet.create({
    inputAndroid: {
        fontSize: 10,
        height: getLayoutSize(50),
        width: getLayoutSize(160),
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        alignSelf: "center",
        color: 'white',
        backgroundColor: "transparent",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});