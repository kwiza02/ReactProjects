//NutritionsScreen

import React, { Component} from 'react';

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
import { post, get } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';
import { button, AppFonts, Colors,TrialHeader, PlanHeader,TextUtils,ScaleUtils,String } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class NutritionScreens extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            isCheck:false,
            indexChecked: 0,
            isLoading: false,
            recipe_category:[],
            filter_by:0,
            recipe_list:[],
            category_id:"",
            page:0,
            total_page:0,
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        var data = await get(Constants.GET_RECIPE_CATEGORY);
        console.log("URL " + JSON.stringify(data.data));
        for (let i = 0; i < data.data.length; i++) {
            this.state.recipe_category.push(
                data.data[i]
            )
        }
        this.setState({ recipe_category: this.state.recipe_category })

        this.doRecipeList()
        
    }

    async doRecipeList() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
            category_id: this.state.category_id,  
            filter_by: this.state.filter_by, 
            page: this.state.page,
            })
            var data = await post(Constants.RECIPES_LIST, body);
            console.log(("Data-->" + JSON.stringify(data)));

            this.setState({ recipe_list: data.data, total_page: data.total_page})
            console.log("IDSSSS--->"+this.state.category_id);

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
            this.doRecipeList()
        } else { }
    }

    renderItem({ item }) {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("NutritionDetailScreen");
            AsyncStorage.setItem("@recipe_id",JSON.stringify(item.id))}}>
                    <ImageBackground source={{uri:item.recipe_picture}} style={styles.imaageBackground}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.imageShadow} >
                            <View style={{ padding: ScaleUtils.SCREEN_PADDING, marginTop: getLayoutSize(140) }}>
                                <Text style={styles.content1}>{item.category_name}</Text>
                                <View style={{ marginTop: getLayoutSize(5), }}>
                                    <Text style={styles.content2}>{item.title}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: getLayoutSize(10) }}>
                                    <Image source={require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png")} style={styles.imageTime}></Image>
                                    <Text style={styles.content4}>{item.duration}</Text>
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
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("NutritionDetailScreen");
                    AsyncStorage.setItem("@recipe_id", JSON.stringify(item.id));
                }}>
                <ImageBackground source={{uri:item.recipe_picture}} style={styles.render2ImaageBackground}>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.render2ImageShadow} >
                        <View style={{ padding: ScaleUtils.SCREEN_PADDING, marginTop: getLayoutSize(140) }}>
                                <Text style={styles.content1}>{item.category_name}</Text>
                            <View style={{ marginTop: getLayoutSize(3), }}>
                                    <Text style={styles.render2Content2}>{item.title}</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: getLayoutSize(10) }}>
                                    <Image source={require("../../Assets/ImageAndIcons/baseline_hourglass_empty_black_48pt.png")} style={styles.render2ImageTime}></Image>
                                    <Text style={styles.render2Content4}>{item.duration}</Text>
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
                    imgSrc={require("../../Assets/ImageAndIcons/ic_settings.png")}
                    isBack={true}
                    screen={"UserProfileScreen"}
                    navigation={this.props.navigation} />

                <View style={styles.container}>

                    <ScrollView horizontal={true}>
                        <View style={{ flexDirection: "column" }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ backgroundColor: Colors.BACKGROUND_COLOR, height: getLayoutSize(50), width: screenWidth / 3, }}>
                                    <TouchableOpacity style={{
                                        backgroundColor: Colors.BACKGROUND_COLOR, height: getLayoutSize(50),
                                        justifyContent: "center",
                                        borderTopColor: this.state.flag === false ? "#00f3b9" : "#000000",
                                        borderTopWidth: getLayoutSize(1),
                                    }} onPress={() => { this.setState({ flag: false, category_id:"" }) 
                                    ;this.doRecipeList()}}>
                                        <Text style={{
                                            color: this.state.flag === false ? "white" : "#868686", alignSelf: "center",
                                            fontSize: TextUtils.TEXT_SIZE_FIFTEEN, fontFamily: AppFonts.text.font3
                                        }}>All</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.state.recipe_category.map((item, index) => (
                                    <View>
                                        <View style={{ backgroundColor: Colors.BACKGROUND_COLOR, height: getLayoutSize(50), width: screenWidth / 3, }}>
                                            <TouchableOpacity style={{
                                                backgroundColor: Colors.BACKGROUND_COLOR, height: getLayoutSize(50),
                                                justifyContent: "center",
                                                borderTopColor: index === this.state.indexChecked && this.state.flag === true ? "#00f3b9" : "#000000",
                                                borderTopWidth: getLayoutSize(1),
                                            }} onPress={() => {
                                                this.setState({ indexChecked: index, flag: true, category_id:item.id}); 
                                                this.doRecipeList();}}>
                                                <Text style={{
                                                    color: index === this.state.indexChecked && this.state.flag === true ? "white" : "#868686", alignSelf: "center",
                                                    fontSize: TextUtils.TEXT_SIZE_FIFTEEN, fontFamily: AppFonts.text.font3
                                                }}>{item.category_name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                ))}
                            </View>
                        </View>
                    </ScrollView>
                    </View>
                <Text style={styles.headerText}>RECIPES</Text>
                <View style={{ flexDirection: "row", marginBottom: getLayoutSize(30), marginLeft: getLayoutSize(15) }}>
                    <TouchableOpacity style={this.state.isCheck === false ? styles.active : styles.inactive}
                        onPress={() => {
                            this.setState({ isCheck: !this.state.isCheck, filter_by: 0 }); this.doRecipeList() 
                        //this.state.category_id !== null ? this.doRecipeList() : this.doAllRecipeList()
                    }}>
                        <Text style={this.state.isCheck === false ? styles.activeText : styles.inactiveText}>POPULAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.state.isCheck === true ? styles.active : styles.inactive}
                        onPress={() => {
                            this.setState({ isCheck: !this.state.isCheck, filter_by: 1, }); this.doRecipeList()
                            //this.state.category_id!==null?this.doRecipeList():this.doAllRecipeList()
                        }}>
                      <Text style={this.state.isCheck === true ? styles.activeText : styles.inactiveText}>NEW</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom:ScaleUtils.MARGIN_TWENTY}}>
                    {this.state.isLoading === true ?
                        <ActivityIndicator size="small" color="#ffffff" /> : (
                            this.state.recipe_list.length !== 0 ?
                                <FlatList
                                    data={this.state.recipe_list}
                                    keyExtractor={(index) => index.toString()}
                                    renderItem={this.renderItem.bind(this)}
                                    horizontal={true} 
                                    onEndReached={this.handleMore.bind(this)}/>
                                : <Text style={{ color: "#868686", alignSelf: "center", marginTop: ScaleUtils.MARGIN_TOP_TEN }}>No Records Found</Text>
                        )}
                                <FlatList
                                    data={this.state.recipe_list}
                                    keyExtractor={(index) => index.toString()}
                                    renderItem={this.renderItem2.bind(this)}
                                    horizontal={false}
                                    numColumns={2} 
                                    onEndReached={this.handleMore.bind(this)}/>

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
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    headerText: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_THIRTYTWO,
        fontFamily: AppFonts.text.font2,
        padding: ScaleUtils.SCREEN_PADDING,
    },
    activeText: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font4,
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf: "center",
    },
    inactiveText: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        fontFamily: AppFonts.text.font4,
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf: "center",
    },
    active: {
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: "25%",
        borderColor: Colors.COLOR_PRIMARY,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
    },
    inactive: {
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: "25%",
        borderColor: Colors.COLOR_PRIMARY,
        borderWidth: 0,
        borderRadius: 20,
        justifyContent: "center",
    },
    imageShadow: {
        height: getLayoutSize(330),
        width: ScaleUtils.IMAGE_WIDTH,
    },
    imaageBackground: {
        height: getLayoutSize(330),
        width: screenWidth,
        justifyContent: "center",
    },
    content1: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font4,
        fontSize: TextUtils.BUTTON_TEXT,
    },
    content2: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.TEXT_SIZE_THIRTYFIVE,
    },
    content4: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        marginLeft: ScaleUtils.MARGIN_TOP_TEN,
    },
    imageTime: {
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
        width: screenWidth / 2,
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
});
