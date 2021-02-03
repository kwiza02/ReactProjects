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
    Alert,
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
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';

import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';
import { button, AppFonts, TrialHeader, Colors,TextUtils,ScaleUtils } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class ProgressScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            Data:[
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
            month:"",
            weight:"",
            isLoading:false,
            calories:"",
            carbs:"",
            protein:"",
            fat:"",
            user_weight_list:[],
            arrayUpdate:[],
            created_at: '',
            labels: [],
            data: [],
            baseline:"",
            baselineWeightType:"",
            graphdata: null,
            current:"",
            currentWeighttype:"",

        };
    }

    async componentDidMount(){
        this.setState({
            calories: await AsyncStorage.getItem("@calories"),
            carbs: await AsyncStorage.getItem("@carbs"),
            protein: await AsyncStorage.getItem("@protein"),
            fat: await AsyncStorage.getItem("@fat")
        })

        this.state.protein = this.state.protein.replace(/['"]+/g, '')

        this.doUserWeightList();
    }

    async doUserWeightList() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                plan_id: await AsyncStorage.getItem("@plan_list_id"), 
                user_id: await AsyncStorage.getItem("@user_id"), 
                month:"", 
                weight: "", 
            })
            var data = await post(Constants.USER_WEIGHT_LIST, body);
            console.log("DATA---->" + JSON.stringify(data));

            this.setState({user_weight_list:data.data})

            this.setState({ baseline: data.data[0].weight, baselineWeightType: data.data[0].weight_type})

             for (let i = this.state.user_weight_list.length-1;i>this.state.user_weight_list.length-8;i--){
                 this.state.arrayUpdate.push(
                    this.state.user_weight_list[i]
                 )
             }

            //   if (this.state.user_weight_list.length < 7) {
            //         for (var i = 0; i < this.state.user_weight_list.length; i++) {
            //             this.state.arrayUpdate.push(
            //                 this.state.user_weight_list[i]
            //             )
            //         }
            //     } else {
            //       for (var i = this.state.user_weight_list.length - 1; i > this.state.user_weight_list.length-8; i--) {
            //             this.state.arrayUpdate.push(
            //                 this.state.user_weight_list[i]
            //             )
            //         }
            //     }

            this.setState({arrayUpdate:this.state.arrayUpdate})

            // if (this.state.user_weight_list.length < 7) {
            //     for (var i = 0; i < this.state.user_weight_list.length; i++) {
            //         this.state.labels.push(
            //             Moment(this.state.arrayUpdate[i].created_at).format('D/MM')
            //         )
            //     }
            // } else {
            //     for (var i = this.state.user_weight_list.length - 1; i > this.state.user_weight_list.length - 8; i--) {
            //         this.state.labels.push(
            //             Moment(this.state.arrayUpdate[i].created_at).format('D/MM')
            //         )
            //     }
            // }
            
             for (var i = this.state.arrayUpdate.length - 1; i > this.state.arrayUpdate.length - 8; i--) {
                 this.state.labels.push(
                     Moment(this.state.arrayUpdate[i].created_at).format('D/MM')
                 )
           }


            // if (this.state.user_weight_list.length < 7) {
            //     for (var i = 0; i < this.state.user_weight_list.length; i++) {
            //         this.state.data.push(
            //             this.state.arrayUpdate[i].weight
            //         )
            //     }
            // } else {
            //     for (var i = this.state.user_weight_list.length - 1; i > this.state.user_weight_list.length - 8; i--) {
            //         this.state.data.push(
            //             this.state.arrayUpdate[i].weight
            //         )
            //     }
            // }

             for (var i = this.state.arrayUpdate.length - 1; i > this.state.arrayUpdate.length - 8; i--) {
                 this.state.data.push(
                     this.state.arrayUpdate[i].weight
                 )
             }


            var data = {
                labels: this.state.labels,
                datasets: [
                    {
                        data: this.state.data,
                    }
                ],
            };
            this.setState({ graphdata: data })
            this.setState({ current: this.state.arrayUpdate[0].weight, currentWeighttype: this.state.arrayUpdate[0].weight_type })

        
            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
                Utils.DialogBox(data.message)
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert", "Please check your internet connection.")
        }
    }

    async doUserUpdatedWeightList() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                plan_id: await AsyncStorage.getItem("@plan_list_id"),
                user_id: await AsyncStorage.getItem("@user_id"),
                month: this.state.month,
                weight: this.state.weight,
            })
            var data = await post(Constants.USER_WEIGHT_LIST, body);
            console.log("DATA---->" + JSON.stringify(data));

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false, user_weight_list: data.data })

                if (this.state.user_weight_list.length < 7) {
                    for (var i = 0; i < this.state.user_weight_list.length; i++) {
                        this.state.arrayUpdate.push(
                            this.state.user_weight_list[i]
                        )
                    }
                } else {
                    for (var i = 0; i < 7; i++) {
                        this.state.arrayUpdate.push(
                            this.state.user_weight_list[i]
                        )
                    }
                }

                for (var i = this.state.arrayUpdate.length - 1; i > this.state.arrayUpdate.length - 8; i--) {
                    this.state.labels.push(
                        Moment(this.state.arrayUpdate[i].created_at).format('D/MM')
                    )
                }


                for (var i = this.state.arrayUpdate.length - 1; i > this.state.arrayUpdate.length - 8; i--) {
                    this.state.data.push(
                        this.state.arrayUpdate[i].weight
                    )
                }

                var data = {
                    labels: this.state.labels,
                    datasets: [
                        {
                            data: this.state.data,
                        }
                    ],
                };
                this.setState({ graphdata: data })
               
            } else {
                this.setState({ isLoading: false, user_weight_list: [], arrayUpdate: [], graphdata: null })
            }

        } else {
            Utils.DialogBox("Please check your internet connection.")
        }
    }


    clickEventListener = (item) => {
        this.setState({ month: item, graphdata: null, labels: [], data: [] }, () => {
            this.doUserUpdatedWeightList();
        });
    }

    clickEventListener1 = (item) => {
        this.setState({ weight: item, graphdata: null, labels: [], data: [] }, () => {
            this.doUserUpdatedWeightList();
        });
    }

    // renderItem({item}){
    //     return(
    //         <View style={{flexDirection:"column"}}>
    //             <View style={{flexDirection:"row"}}>
    //                 <Image source={item.imagePlay} style={{height:10,width:10,tintColor:"#00fb39",marginLeft:15,marginTop:12,transform:[{rotate:"-90deg"}]}}/>
    //                 <Text style={styles.content1Text}>{item.content1}</Text>
    //                 <Text style={styles.content2Text}>{item.content2}</Text>
    //             </View>
    //             <Text style={styles.content3Text}>{item.content3}</Text>
    //         </View>
    //     );
    // }

    renderItem2({ item }) {
        return (
            <View style={{ flexDirection: "row" }}>
                <View style={styles.render2Circle}>
                    <Text style={styles.render2Content1Text}>{item.weight}</Text>
                    {item.weight_type === 0 ?
                        <Text style={styles.render2Content2Text}>kg</Text>
                    :
                        <Text style={styles.render2Content2Text}>lbs</Text>
                    }
                </View>
                <Text style={styles.render2Content3Text}>{Moment(item.created_at).format('dddd, MMMM D, YYYY')}</Text>
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
        const { graphdata } = this.state
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.boxView}>
                            <View style={styles.topLineView} />
                            <Text style={styles.breakdownText}>YOUR BREAKDOWN</Text>
                            <View style={styles.topLineView} />
                            <View style={styles.caloriesView}>
                                <Text style={{ color: "#00f3b9", fontFamily: AppFonts.text.font3, fontSize: getFontSize(22) }}>{this.state.calories}</Text>
                                <Text style={styles.textStyle}>Calories</Text>
                                <View style={{ borderWidth: 1, borderColor: "#868686", height: 60, width: "2%", position: "absolute", marginLeft: getLayoutSize(80) }} />
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
                        <View style={{flexDirection:"row",marginTop:getLayoutSize(15),justifyContent:"center"}}>
                            <Text style={styles.meanText}>What does this mean?</Text>
                            <Text style={styles.understandText}>Understand Macros</Text>
                        </View>
                        <View style={{ flexDirection: "row",justifyContent:"space-between" }}>
                            <View style={styles.viewMonth} >
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
                                    onValueChange={(value) => {this.clickEventListener(value)}}
                                    items={[
                                        { label: 'January', value: '01' },
                                        { label: 'February', value: '02' },
                                        { label: 'March', value: '03' },
                                        { label: 'April', value: '04' },
                                        { label: 'May', value: '05' },
                                        { label: 'June', value: '06' },
                                        { label: 'July', value: '07' },
                                        { label: 'August', value: '08' },
                                        { label: 'September', value: '09' },
                                        { label: 'October', value: '10' },
                                        { label: 'November', value: '11' },
                                        { label: 'December', value: '12' },

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

                                    onValueChange={(value) => { this.clickEventListener1(value) }}
                                    items={[
                                        { label: '1', value: '1' },
                                        { label: '2', value: '2' },
                                        { label: '3', value: '3' },
                                        { label: '4', value: '4' },
                                        { label: '5', value: '5' },
                                        { label: '6', value: '6' },
                                        { label: '7', value: '7' },
                                        { label: '8', value: '8' },
                                        { label: '9', value: '9' },
                                        { label: '10', value: '10' },
                                        { label: '11', value: '11' },
                                        { label: '12', value: '12' },
                                        { label: '13', value: '13' },
                                        { label: '14', value: '14' },
                                        { label: '15', value: '15' },
                                        { label: '16', value: '16' },
                                        { label: '17', value: '17' },
                                        { label: '18', value: '18' },
                                        { label: '19', value: '19' },
                                        { label: '20', value: '20' },
                                        { label: '21', value: '21' },
                                        { label: '22', value: '22' },
                                        { label: '23', value: '23' },
                                        { label: '24', value: '24' },
                                        { label: '25', value: '25' },
                                        { label: '26', value: '26' },
                                        { label: '27', value: '27' },
                                        { label: '28', value: '28' },
                                        { label: '29', value: '29' },
                                        { label: '30', value: '30' },
                                        { label: '31', value: '31' },
                                        { label: '32', value: '32' },
                                        { label: '33', value: '33' },
                                        { label: '34', value: '34' },
                                        { label: '35', value: '35' },
                                        { label: '36', value: '36' },
                                        { label: '37', value: '37' },
                                        { label: '38', value: '38' },
                                        { label: '39', value: '39' },
                                        { label: '40', value: '40' },
                                        { label: '41', value: '41' },
                                        { label: '42', value: '42' },
                                        { label: '43', value: '43' },
                                        { label: '44', value: '44' },
                                        { label: '45', value: '45' },
                                        { label: '46', value: '46' },
                                        { label: '50', value: '50' },
                                        { label: '51', value: '51' },
                                        { label: '52', value: '52' },
                                        { label: '53', value: '53' },
                                        { label: '54', value: '54' },
                                        { label: '55', value: '55' },
                                        { label: '56', value: '56' },
                                        { label: '57', value: '57' },
                                        { label: '58', value: '58' },
                                        { label: '59', value: '59' },
                                        { label: '60', value: '60' },
                                        { label: '61', value: '61' },
                                        { label: '62', value: '62' },
                                        { label: '63', value: '63' },
                                        { label: '64', value: '64' },
                                        { label: '65', value: '65' },
                                        { label: '66', value: '66' },
                                        { label: '67', value: '67' },
                                        { label: '68', value: '68' },
                                        { label: '69', value: '69' },
                                        { label: '70', value: '70' },
                                        { label: '71', value: '71' },
                                        { label: '72', value: '72' },
                                        { label: '73', value: '73' },
                                        { label: '74', value: '74' },
                                        { label: '75', value: '75' },
                                        { label: '76', value: '76' },
                                        { label: '77', value: '77' },
                                        { label: '79', value: '79' },
                                        { label: '80', value: '80' },
                                        { label: '81', value: '81' },
                                        { label: '82', value: '82' },
                                        { label: '83', value: '83' },
                                        { label: '84', value: '84' },
                                        { label: '85', value: '85' },
                                        { label: '86', value: '86' },
                                        { label: '87', value: '87' },
                                        { label: '88', value: '88' },
                                        { label: '89', value: '89' },
                                        { label: '90', value: '90' },
                                        { label: '91', value: '91' },
                                        { label: '92', value: '92' },
                                        { label: '93', value: '93' },
                                        { label: '94', value: '94' },
                                        { label: '95', value: '95' },
                                        { label: '96', value: '96' },
                                        { label: '97', value: '97' },
                                        { label: '98', value: '98' },
                                        { label: '99', value: '99' },
                                        { label: '100', value: '100' },
                                    ]}
                                />
                                <Image source={require("../../Assets/ImageAndIcons/arrow-down-sign-to-navigate.png")}
                                    style={styles.dropdownImage}></Image>
                            </View>
                        </View>
                        <View style={{ marginTop: 25,flexDirection:"row" }}>
                            <View style={{ flexDirection: "column" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.content1Text}>{this.state.baseline}</Text>
                                    {this.state.baselineWeightType === 0 ?
                                        <Text style={styles.content2Text}>kg</Text>
                                    :
                                        <Text style={styles.content2Text}>lbs</Text>
                                    }
                                </View>
                                <Text style={styles.content3Text}>Baseline</Text>
                            </View>
                            {this.renderSeparator()}
                            
                            <View style={{ flexDirection: "column" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.content1Text}>{this.state.current}</Text>
                                    {this.state.currentWeighttype === 0 ?
                                        <Text style={styles.content2Text}>kg</Text>
                                        :
                                        <Text style={styles.content2Text}>lbs</Text>
                                    }
                                </View>
                                <Text style={styles.content3Text}>Current</Text>
                            </View>
                            {this.renderSeparator()}

                            <View style={{ flexDirection: "column" }}>

                                { this.state.currentWeighttype === 0 ?
                                this.state.baseline >this.state.current ? 
                                    <View style={{ flexDirection: "row" }}>
                                        <Image source={require("../../Assets/ImageAndIcons/play.png")} style={{height:8,width:8,tintColor:"#00fb39",marginLeft:15,marginTop:18,transform:[{rotate:"+90deg"}]}}/>
                                        {this.state.currentWeighttype === 0 ?
                                            <Text style={styles.content1TextChange}>- {this.state.baseline-this.state.current}</Text>
                                        :
                                            <Text style={styles.content1TextChange}>- {this.state.baseline - (this.state.current/2)}</Text> 
                                        }
                                        {this.state.baselineWeightType === 0 ?
                                            <Text style={styles.content2Text}>kg</Text>
                                            :
                                            <Text style={styles.content2Text}>lbs</Text>
                                        }
                                    </View>
                                :
                                    <View style={{ flexDirection: "row" }}>
                                        <Image source={require("../../Assets/ImageAndIcons/play.png")} style={{ height: 8, width: 8, tintColor: "#00fb39", marginLeft: 15, marginTop: 18, transform: [{ rotate: "-90deg" }] }} />
                                        {this.state.currentWeighttype === 0 ?
                                            <Text style={styles.content1TextChange}>+ {this.state.current - this.state.baseline}</Text>
                                            :
                                            <Text style={styles.content1TextChange}>+ {(this.state.current / 2) - this.state.baseline
                                            }</Text>
                                        }
                                        {this.state.baselineWeightType === 0 ?
                                            <Text style={styles.content2Text}>kg</Text>
                                            :
                                            <Text style={styles.content2Text}>lbs</Text>
                                        }
                                    </View>
                                    :
                                    this.state.baseline > this.state.current/2 ?
                                        <View style={{ flexDirection: "row" }}>
                                            <Image source={require("../../Assets/ImageAndIcons/play.png")} style={{ height: 8, width: 8, tintColor: "#00fb39", marginLeft: 15, marginTop: 18, transform: [{ rotate: "+90deg" }] }} />
                                            {this.state.currentWeighttype === 0 ?
                                                <Text style={styles.content1TextChange}>- {this.state.baseline - this.state.current}</Text>
                                                :
                                                <Text style={styles.content1TextChange}>- {this.state.baseline - (this.state.current / 2)}</Text>
                                            }
                                            {this.state.baselineWeightType === 0 ?
                                                <Text style={styles.content2Text}>kg</Text>
                                                :
                                                <Text style={styles.content2Text}>lbs</Text>
                                            }
                                        </View>
                                        :
                                        <View style={{ flexDirection: "row" }}>
                                            <Image source={require("../../Assets/ImageAndIcons/play.png")} style={{ height: 8, width: 8, tintColor: "#00fb39", marginLeft: 15, marginTop: 18, transform: [{ rotate: "-90deg" }] }} />
                                            {this.state.currentWeighttype === 0 ?
                                                <Text style={styles.content1TextChange}>+ {this.state.current - this.state.baseline}</Text>
                                                :
                                                <Text style={styles.content1TextChange}>+ {(this.state.current / 2) - this.state.baseline
                                                }</Text>
                                            }
                                            {this.state.baselineWeightType === 0 ?
                                                <Text style={styles.content2Text}>kg</Text>
                                                :
                                                <Text style={styles.content2Text}>lbs</Text>
                                            }
                                        </View>
                                    }
                                <Text style={styles.content3Text}>Change</Text>
                            </View>

                        </View>
                        <View style={{marginTop:getLayoutSize(30),justifyContent:"center",alignItems:"center"}}>
                            {this.state.graphdata !== null ?
                                <LineChart
                                    data={this.state.graphdata}
                                    width={getLayoutSize(400)}
                                    height={250}
                                    yAxisInterval={0.5}
                                    withVerticalLines={false}
                                    chartConfig={{
                                        backgroundColor: '#000000',
                                        backgroundGradientFrom: '#000000',
                                        backgroundGradientTo: '#000000',
                                        decimalPlaces: 1,
                                        color: (opacity = 2) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                        propsForDots: {
                                            backgroundColor: "#00f3b9",
                                            r: "3",
                                            strokeWidth: "4",
                                            stroke: "#00f3b9"
                                        },
                                        propsForBackgroundLines: {
                                            strokeDasharray: '',
                                            color: "white"
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                />
                                :
                                null
                            }
                        </View>
                        <Text style={styles.entryText}>ENTRIES</Text>
                        <View style={{ marginTop: 0 }}>
                            {this.state.arrayUpdate.length !== 0 ?
                                <FlatList
                                    data={this.state.arrayUpdate}
                                    keyExtractor={item => item}
                                    renderItem={this.renderItem2.bind(this)}
                                />
                                :
                                <Text style={{ color: Colors.DEFAULT_APP_FONT_COLOR }}>No Data Found</Text>
                            }
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
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
    },
    container: {
        flex: 1,
        paddingLeft: ScaleUtils.SCREEN_PADDING,
    },
    boxView: {
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        height: getLayoutSize(112),
        marginRight: ScaleUtils.MARGIN_TWENTY,
        borderTopWidth: 0,
        flexDirection: "row",
        marginTop:ScaleUtils.MARGIN_TOP_THIRTY,
    },
    topLineView: {
        borderTopWidth: 0.8,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width: getLayoutSize(screenWidth / 3.87)
    },
    breakdownText: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        marginLeft: ScaleUtils.MARGIN_TOP_FIFTEEN,
        marginRight: ScaleUtils.MARGIN_TOP_FIFTEEN,
        marginTop: getLayoutSize(-10),
        fontFamily: AppFonts.text.font4,
    },
    caloriesView: {
        position: "absolute",
        marginTop:ScaleUtils.MARGIN_TOP_THIRTY,
        left: ScaleUtils.MARGIN_TOP_THIRTY,
    },
    textStyle: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf: "center",
    },
    numberStyle: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        fontSize: TextUtils.TEXT_SIZE_TENTYTWO,
    },
    gText: {
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        color:Colors.DEFAULT_APP_FONT_COLOR,
    },
    carbsView: {
        position: "absolute",
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
        left: getLayoutSize(130)
    },
    protienView: {
        position: "absolute",
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
        left: getLayoutSize(210),
    },
    fatView: {
        position: "absolute",
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
        left: getLayoutSize(290),
    },
    meanText: {
        fontSize: TextUtils.BUTTON_TEXT,
        color:Colors.DEFAULT_CONTENT_COLOR,
        fontFamily:AppFonts.text.font3,
        alignSelf:"center",
    },
    understandText: {
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        color: Colors.COLOR_PRIMARY,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        marginLeft:ScaleUtils.MARGIN_TOP_TEN,
    },
    content1Text:{
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_TENTYFIVE,
        fontFamily:AppFonts.text.font4,
        alignSelf:"center",
        marginLeft: getLayoutSize(35),
    },
    content1TextChange: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_TENTYFIVE,
        fontFamily: AppFonts.text.font4,
        alignSelf: "center",
        marginLeft: getLayoutSize(10),
    },
    content2Text: {
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily: AppFonts.text.font3,
        alignSelf:"center",
        marginTop: ScaleUtils.MARGIN_TOP_TEN,
    },
    content3Text: {
        color:Colors.DEFAULT_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        marginLeft:getLayoutSize(35),
        marginTop: ScaleUtils.MARGIN_FIVE,
    },
    viewWeight: {
        height:ScaleUtils.IMAGE_SIZE_FIFTY, 
        width: getLayoutSize(190), 
        flexDirection: "row",
        backgroundColor: "#1c1c1c", 
        borderRadius: 50, 
        marginTop: ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP,
    },
    viewMonth: {
        height: ScaleUtils.IMAGE_SIZE_FIFTY,
        width: getLayoutSize(180), 
        flexDirection: "row",
        backgroundColor: "#1c1c1c", 
        borderRadius: 50, 
        marginTop: ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP,
    },
    dropdownImage:{
        height: getLayoutSize(12), 
        width: getLayoutSize(12), 
        alignSelf: "center", 
        tintColor: Colors.DEFAULT_APP_FONT_COLOR, 
    },
    entryText:{
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_EIGHTEEN,
        marginTop:ScaleUtils.MARGIN_TWENTY,
        fontFamily: AppFonts.text.font4,
        paddingLeft: ScaleUtils.SCREEN_PADDING,
    },
    render2Circle:{
        borderWidth:1,
        borderRadius:40,
        height:getLayoutSize(80),
        width:getLayoutSize(80),
        borderColor:"#818181",
        justifyContent:"center",
        flexDirection:"row",
        marginTop:ScaleUtils.MARGIN_TOP_FIFTEEN,
        marginLeft: ScaleUtils.MARGIN_TOP_FIFTEEN,
    },
    render2Content1Text: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.AUTHENTICATION_TITLE,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center"
    },
    render2Content2Text: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        marginTop:getLayoutSize(5),
    },
    render2Content3Text: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        marginLeft: getLayoutSize(35),
    },

});

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        height: ScaleUtils.IMAGE_SIZE_FIFTY,
        width: getLayoutSize(150),
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        alignSelf: "center",
        color: Colors.DEFAULT_APP_FONT_COLOR,
        backgroundColor: "transparent",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const pickerSelectStylesWeight = StyleSheet.create({
    inputAndroid: {
        fontSize: 10,
        height: ScaleUtils.IMAGE_SIZE_FIFTY,
        width: getLayoutSize(160),
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        alignSelf: "center",
        color:Colors.DEFAULT_APP_FONT_COLOR,
        backgroundColor: "transparent",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});