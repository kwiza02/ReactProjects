//IconsScreen

import React, { Component } from 'react';

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
    Alert,
    ActivityIndicator,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-community/async-storage';


import { Constants } from '../../RestAPI/Constants';
import { post,get } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';
import { button, AppFonts,Colors, TrialHeader, PlanHeader,TextUtils,ScaleUtils,String } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const Tab = createMaterialTopTabNavigator();

export default class IconsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            indexChecked: 0,
            trainer_category: [],
            trainer_list:[],
            isLoading:false,
            total_page: 0,
            page: 0,
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        var data = await get(Constants.TRAINER_CATEGORY);
        console.log("URL " + JSON.stringify(data.data));
        for (let i = 0; i < data.data.length; i++) {
            this.state.trainer_category.push(
                data.data[i]
            )
        }
        this.setState({ trainer_category: this.state.trainer_category })
        console.log("SERVICES-->" + JSON.stringify(this.state.trainer_category));

        this.doTrainerList()
    }

    async doTrainerList() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                category_id: this.state.category_id,
                page: this.state.page, 

            })
            var data = await post(Constants.TRAINER_LIST, body);
            console.log(("Data-->" + JSON.stringify(data)));

            this.setState({ trainer_list: data.data, total_page: data.total_page})
            
            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
                //this.props.navigation.navigate("MaleFemaleScreen");
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Please check your internet connection.")
        }
    }

    handleMore() {
        if (this.state.total_page > this.state.page) {
            this.setState({ page: this.state.page + 1 })
            this.doTrainerList()
        } else { }
    }


    renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "column" }}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("IconDetailScreen"); AsyncStorage.setItem("@trainer_id" , JSON.stringify(item.id));}}>
                    <ImageBackground source={{uri:item.trainer_picture}} style={styles.renderImageBackground}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.renderShadow} >
                            <View style={{ padding: ScaleUtils.SCREEN_PADDING, marginTop: getLayoutSize(40) }}>
                                <Text style={styles.content1}>{item.tag}</Text>
                                <View style={{ marginTop: getLayoutSize(10) }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={styles.lineView}></View>
                                        <Text style={styles.content2}>{item.name}</Text>
                                    </View>
                                </View>
                                <View style={styles.fitnessCreatorView}>
                                    <Text style={styles.content4}>{item.handle}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }


    render() {
        return (
            <View style={styles.mainContainer}>
                <PlanHeader title={require("../../Assets/ImageAndIcons/logo.png")}
                    isBack={true}
                    screen={"SelectPlanScreen"}
                    navigation={this.props.navigation} />

                <View style={styles.container}>

                    <ScrollView horizontal={true}>
                        <View style={{flexDirection:"column"}}>
                        <View style={{ flexDirection: "row" }}>
                                <View style={{ backgroundColor: Colors.BACKGROUND_COLOR, height: getLayoutSize(50), width: screenWidth / 3, }}>
                                    <TouchableOpacity style={{
                                        backgroundColor: Colors.BACKGROUND_COLOR, height: getLayoutSize(50),
                                        justifyContent: "center",
                                        borderTopColor:this.state.flag===false ?"#00f3b9":"#000000" ,
                                        borderTopWidth: getLayoutSize(1),
                                    }} onPress={() => { this.setState({ flag: false, category_id: "" }); this.doTrainerList();}}>
                                        <Text style={{
                                            color: this.state.flag === false ? "white" :"#868686", alignSelf: "center",
                                            fontSize: TextUtils.TEXT_SIZE_FIFTEEN, fontFamily: AppFonts.text.font3
                                        }}>All</Text>
                                    </TouchableOpacity>
                                </View>
                            {this.state.trainer_category.map((item, index) => (
                                <View>
                                    <View style={{ backgroundColor: Colors.BACKGROUND_COLOR,height:getLayoutSize(50), width: screenWidth / 3, }}>
                                        <TouchableOpacity style={{
                                            backgroundColor: Colors.BACKGROUND_COLOR, height:getLayoutSize(50),
                                            justifyContent: "center",
                                            borderTopColor: index === this.state.indexChecked && this.state.flag===true ? "#00f3b9" : "#000000",
                                            borderTopWidth: getLayoutSize(1),
                                        }} onPress={() => {
                                            this.setState({ indexChecked: index, flag: true, category_id:item.id});
                                             this.doTrainerList();}}>
                                            <Text style={{
                                                color: index === this.state.indexChecked && this.state.flag === true  ? "white" : "#868686", alignSelf: "center",
                                                fontSize: TextUtils.TEXT_SIZE_FIFTEEN, fontFamily: AppFonts.text.font3
                                            }}>{item.category_name}</Text>
                                        </TouchableOpacity>
                                    </View>
                               </View>
                            
                            ))}
                        </View>
                        </View>
                    </ScrollView>
                    {this.state.isLoading === true ?
                        <ActivityIndicator size="small" color="#ffffff" /> : (
                            this.state.trainer_list.length !== 0 ?
                                <FlatList
                                    data={this.state.trainer_list}
                                    keyExtractor={(index) => index.toString()}
                                    renderItem={this.renderItem.bind(this)}
                                    onEndReached={this.handleMore.bind(this)} />
                                : <Text style={{ color: "#868686", alignSelf: "center", marginTop: ScaleUtils.MARGIN_TOP_TEN }}>No Records Found</Text>
                        )}
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
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    renderShadow: {
        width: ScaleUtils.IMAGE_WIDTH,
        height: getLayoutSize(300),
    },
    renderImageBackground: {
        height: getLayoutSize(300),
        width: ScaleUtils.IMAGE_WIDTH,
        justifyContent: "center",
    },
    content1: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font4,
    },
    lineView: {
        height: getLayoutSize(40),
        width: getLayoutSize(3),
        backgroundColor: Colors.COLOR_PRIMARY,
        marginRight: getLayoutSize(10),
        alignSelf: "center",
    },
    content2: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize: getFontSize(37),
        fontFamily: AppFonts.text.font2,
    },
    fitnessCreatorView: {
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: getLayoutSize(150),
        backgroundColor: "#1e1e1e",
        borderRadius: 20,
        justifyContent: "center",
        marginTop: ScaleUtils.MARGIN_TOP_FIFTEEN
    },
    content4: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font4,
        alignSelf: "center",
    },
});


/* <Tab.Navigator tabBarOptions={{
                    scrollEnabled: true,
                    activeTintColor: Colors.DEFAULT_APP_FONT_COLOR,
                    inactiveTintColor: "#818181",
                    labelStyle: {
                        fontSize: getFontSize(13),
                        fontWeight: "bold",
                        fontFamily: AppFonts.text.font4,
                    },
                    indicatorStyle: {
                        backgroundColor: Colors.COLOR_PRIMARY,
                        position: "relative",
                        opacity: 0.6,
                    },
                    style: {
                        borderTopWidth: 0.2,
                        borderTopColor: "#282c30",
                        backgroundColor: "black",
                    },
                }}>
                    <Tab.Screen name="ALL" component={AllScreen} />
                    <Tab.Screen name="FITNESS" component={FitnessScreen} />
                    <Tab.Screen name="BODYBUILDING" component={BodyBuildingScreen} />
                    <Tab.Screen name="WEIGHTLOSS" component={WeightLossScreen} />
                </Tab.Navigator>*/