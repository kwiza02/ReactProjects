//DiscoverScreen

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
    ActivityIndicator,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';
import { button, AppFonts,Colors, TrialHeader, PlanHeader,ScaleUtils,TextUtils,String } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

import { setSelectedCategory } from '../../Actions/SetData';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

 class DiscoverScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            flag: false,
            isCheck: false,
            indexChecked: 0,
            article_category: [],
            article_list:[],
            category_id: "",
            page:0,
            total_page:0,
        };
    }

    async componentDidMount(){
        this.setState({ isLoading: true });
        var data = await get(Constants.GET_ARTICLE_CATEGORY);
        console.log("URL " + JSON.stringify(data.data));
        for (let i = 0; i < data.data.length; i++) {
            this.state.article_category.push(
                data.data[i]
            )
        }
        this.setState({ article_category: this.state.article_category })
        this.doArticleList()
        this.props.setSelectedCategory(null);
    }

    async doArticleList() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                category_id: this.state.category_id,
                page: this.state.page
            })
            var data = await post(Constants.ARTICLE_LIST, body);
            console.log(("Data-->" + JSON.stringify(data)));

            this.setState({ article_list: data.data, total_page: data.total_page})

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

    handleMore() {
        if (this.state.total_page > this.state.page) {
            this.setState({ page: this.state.page + 1 })
            this.doArticleList()
        } else { }
    }

    renderItem = ({ item, }) => {
        return (
            <View style={{ flexDirection: "column" }}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("MondayMotivationScreen") ;
                    AsyncStorage.setItem("@article_id", JSON.stringify(item.id)); this.props.setSelectedCategory(item);}}>
                    <ImageBackground source={{ uri: item.article_image}} style={styles.renderImageBackground}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.render2ImageShadow} >
                        <View style={{ padding: ScaleUtils.SCREEN_PADDING, marginTop: getLayoutSize(200) }}>
                            <Text style={styles.content1}>{item.category_name}</Text>
                            <View style={{ marginTop: getLayoutSize(5) }}>
                                <Text style={styles.content2}>{item.article_title}</Text>
                            </View>
                            <Text style={styles.content3}>{item.tag_line}</Text>
                            <View style={{ flexDirection: "row", marginTop: getLayoutSize(20) }}>
                                <View style={styles.imageCircleView1}>
                                    <View style={styles.imageCircleView2}>
                                        <Image source={{ uri: item.trainer_image}} style={styles.renderImage} />
                                    </View>
                                </View>
                                <Text style={styles.content4}>{item.trainer_name}</Text>
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
                        <View style={{ flexDirection: "column" }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ backgroundColor: Colors.BACKGROUND_COLOR, height: getLayoutSize(50), width: screenWidth / 3, }}>
                                    <TouchableOpacity style={{
                                        backgroundColor: Colors.BACKGROUND_COLOR, height: getLayoutSize(50),
                                        justifyContent: "center",
                                        borderTopColor: this.state.flag === false ? "#00f3b9" : "#000000",
                                        borderTopWidth: getLayoutSize(1),
                                    }} onPress={() => {
                                        this.setState({ flag: false, category_id: "" })
                                        ; this.doArticleList()
                                    }}>
                                        <Text style={{
                                            color: this.state.flag === false ? "white" : "#868686", alignSelf: "center",
                                            fontSize: TextUtils.TEXT_SIZE_FIFTEEN, fontFamily: AppFonts.text.font3
                                        }}>All</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.state.article_category.map((item, index) => (
                                    <View>
                                        <View style={{ backgroundColor: Colors.BACKGROUND_COLOR, height: getLayoutSize(50), width: screenWidth / 3, }}>
                                            <TouchableOpacity style={{
                                                backgroundColor: Colors.BACKGROUND_COLOR, height: getLayoutSize(50),
                                                justifyContent: "center",
                                                borderTopColor: index === this.state.indexChecked && this.state.flag === true ? "#00f3b9" : "#000000",
                                                borderTopWidth: getLayoutSize(1),
                                            }} onPress={() => {
                                                this.setState({ indexChecked: index, flag: true, category_id: item.id });
                                                this.doArticleList();
                                            }}>
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
                {this.state.isLoading === true ?
                    <ActivityIndicator size="small" color="#ffffff" /> : (
                        this.state.article_list.length !== 0 ?
                <FlatList
                    data={this.state.article_list}
                    keyExtractor={(index) => index.toString()}
                    renderItem={this.renderItem.bind(this)}
                    horizontal={false}
                    onEndReached={this.handleMore.bind(this)} />
                            : <Text style={{ color: "#868686", alignSelf: "center", marginTop: ScaleUtils.MARGIN_TOP_TEN }}>No Records Found</Text>
                    )}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedCategory: state.getData
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ setSelectedCategory: setSelectedCategory }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(function (props) {
    return <DiscoverScreen {...props} />;
});


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
    },
    renderImageBackground: {
        height: getLayoutSize(480),
        width: ScaleUtils.IMAGE_WIDTH,
        justifyContent: "center",
    },
    render2ImageShadow: {
        height: getLayoutSize(480),
        width: ScaleUtils.IMAGE_WIDTH,
    },
    content1: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font4,
    },
    content2: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_THIRTY,
        fontFamily: AppFonts.text.font2,
    },
    content3: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
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
    imageCircleView1: {
        height: getLayoutSize(56),
        width: getLayoutSize(56),
        borderRadius: 28,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        justifyContent: "center",
    },
    imageCircleView2: {
        height: getLayoutSize(50),
        width: getLayoutSize(50),
        borderRadius: 25,
        borderWidth: 0.7,
        borderColor: Colors.COLOR_PRIMARY,
        justifyContent: "center",
        alignSelf: "center",
    },
    renderImage: {
        height: getLayoutSize(48),
        width: getLayoutSize(48),
        borderRadius: 24,
        alignSelf: "center",
    },
});