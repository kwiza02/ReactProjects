//MondayMotivationScreen

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
    Alert,
} from 'react-native';
import HTML from "react-native-render-html";
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';
import { button, AppFonts,Colors, TrialHeader, TextUtils,ScaleUtils} from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

import { setSelectedCategory, setSelectedSubCategory } from '../../Actions/SetData';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MondayMotivationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            more_article:[],
            category_name:"",
            article_title:"",
            article_picture:"",
            tag_line:"",
            trainer_picture:"",
            trainer_name:"",
            htmlContent:"",
            is_article_bookmark:"",
            isCheck:false,
        };
    }

    async componentDidMount() {
        this.doArticleDetail()
        console.log("Get Data" + JSON.stringify(this.props.selectedData.categoryObject.id));
        Alert.alert("Get Data" + JSON.stringify(this.props.selectedData.categoryObject.article_title))
    }

    async doArticleDetail() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                article_id: await AsyncStorage.getItem("@article_id"),
                user_id: await AsyncStorage.getItem("@user_id")
            })
            var data = await post(Constants.ARTICLE_DETAIL, body);

            this.setState({ article_detail: data.data })

            this.setState({
                category_name: data.data.category_name,
                article_title: data.data.article_title,
                tag_line: data.data.tag_line,
                trainer_picture: data.data.trainer_picture,
                trainer_name: data.data.trainer_name,
                article_picture: data.data.article_picture,
                htmlContent: data.data.article_description,
                is_article_bookmark: data.data.is_article_bookmark,
            })

            this.setState({ more_article: data.data.more_article })
            console.log("ARTICLE-->" + this.state.more_article);


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

    async doBookmark() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                article_id: await AsyncStorage.getItem("@article_id"),
                user_id: await AsyncStorage.getItem("@user_id")
            })
            var data = await post(Constants.BOOKMARK_ARTICLE, body);

           this.doArticleDetail()

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })
                Utils.DialogBox(data.message)
            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Please check your internet connection.")
        }
    }

    renderItem2 = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "column", marginTop: getLayoutSize(20)}}>
                <ImageBackground source={{ uri: item.article_image}} style={styles.render2ImageBackground}>
                        <View style={styles.renderBoxView}>
                        <View style={{ paddingLeft: ScaleUtils.SCREEN_PADDING,marginTop:getLayoutSize(50)}}>
                                <Text style={styles.content1}>{item.category_name}</Text>
                                <View style={{ marginTop: getLayoutSize(5) }}>
                                    <Text style={styles.content2}>{item.article_title}</Text>
                                </View>
                                <Text style={styles.content3}>{item.tag_line}</Text>
                                <View style={{ flexDirection: "row", marginTop: getLayoutSize(20) }}>
                                    <View style={styles.imageCircleView1}>
                                        <View style={styles.imageCircleView2}>
                                            <Image source={{ uri: item.trainer_image }} style={styles.renderImage} />
                                        </View>
                                    </View>
                                    <Text style={styles.content4}>{item.trainer_name}</Text>
                                </View>
                            </View>
                    </View>
                    </ImageBackground>
            </View>
        );
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <ScrollView>
                    <ImageBackground source={{uri:this.state.article_picture}} style={styles.renderImageBackground}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.renderShadow} >
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ marginTop: getLayoutSize(10), left: getLayoutSize(20), }} >
                                    <Image source={require("../../Assets/ImageAndIcons/back_with_arrow.png")} style={styles.headerImageArrow} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.setState({ is_article_bookmark: this.state.is_article_bookmark });
                                this.doBookmark();}} style={{ marginTop: getLayoutSize(10), right: getLayoutSize(20), }}>
                                    {this.state.is_article_bookmark === 1 ?
                                    <Image source={require("../../Assets/ImageAndIcons/ic_bookmark_remove.png")} 
                                style={styles.headerImageBookmark} />
                                :
                                this.state.is_article_bookmark===0?
                                <Image source={require("../../Assets/ImageAndIcons/ic_bookmark.png")}
                                style={styles.headerImageBookmark} />
                                :
                                null
                                 }
                                </TouchableOpacity>
                            </View>
                            <View style={{ padding: ScaleUtils.SCREEN_PADDING, marginTop: getLayoutSize(180) }}>
                                <Text style={styles.content1}>{this.state.category_name}</Text>
                                <View style={{ marginTop: getLayoutSize(5) }}>
                                    <Text style={styles.content2}>{this.state.article_title}</Text>
                                </View>
                                <Text style={styles.content3}>{this.state.tag_line}</Text>
                                <View style={{ flexDirection: "row", marginTop: getLayoutSize(20) }}>
                                    <View style={styles.imageCircleView1}>
                                        <View style={styles.imageCircleView2}>
                                            <Image source={{uri:this.state.trainer_picture}} style={styles.renderImage} />
                                        </View>
                                    </View>
                                    <Text style={styles.content4}>{this.state.trainer_name}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                    <View style={{ paddingLeft: ScaleUtils.SCREEN_PADDING, paddingRight: ScaleUtils.SCREEN_PADDING,}}>
                        <View style={{ flexDirection: "column", marginTop:getLayoutSize(50)}}>
                            <HTML html={this.state.htmlContent} contentWidth={screenWidth} baseFontStyle={styles.htmlContentText}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: getLayoutSize(50),}}>
                                <Text style={styles.moreFromHebaText}>MORE FROM HEBA</Text>
                                <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                            </View>
                            <FlatList
                                data={this.state.more_article}
                                keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem2.bind(this)}
                            horizontal={true} />
                        </View>
                        <View style={{marginBottom:getLayoutSize(20)}}></View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedData: state.getData
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ setSelectedCategory: setSelectedCategory }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(function (props) {
    return <MondayMotivationScreen {...props} />;
});

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
    },
    headerImageArrow: {
        height:ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        width: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        alignItems: "flex-end",
    },
    headerImageBookmark: {
        height: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        width: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        alignItems: "flex-start",
        resizeMode:"contain"
    },
    renderImageBackground: {
        height: getLayoutSize(480),
        width: ScaleUtils.IMAGE_WIDTH,
        justifyContent: "center",
    },
    renderShadow: {
        width: ScaleUtils.IMAGE_WIDTH,
        height: getLayoutSize(480),
    },
    content1: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize:TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font4,
    },
    content2: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_THIRTYFIVE,
        fontFamily: AppFonts.text.font2,
    },
    content3: {
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
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
        height: ScaleUtils.IMAGE_SIZE_FIFTY,
        width: ScaleUtils.IMAGE_SIZE_FIFTY,
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
    moreFromHebaText:{
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily:AppFonts.text.font4,
        alignSelf:"center",
    },
    codeImage: {
        tintColor:Colors.DEFAULT_CONTENT_COLOR,
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: ScaleUtils.IMAGE_SIZE_THIRTY,
        marginRight: ScaleUtils.MARGIN_TOP_FIFTEEN,
        alignSelf:"center"
    },
    render2ImageBackground: {
        height: getLayoutSize(400),
        width: getLayoutSize(350),
        justifyContent: "center",
        marginRight: getLayoutSize(20),
        padding:getLayoutSize(10)
    },
    renderBoxView:{
        borderWidth:1,
        borderColor:Colors.DEFAULT_CONTENT_COLOR,
        height:getLayoutSize(380),
        width:"100%",
    },
    htmlContentText: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        fontSize: getFontSize(14),
        marginLeft: getLayoutSize(35),
        marginTop: ScaleUtils.MARGIN_TOP_TEN,
    },
});
