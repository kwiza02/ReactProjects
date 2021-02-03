//IconDetailScreen

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
    ActivityIndicator,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import { button, AppFonts, TrialHeader,Colors,ScaleUtils,TextUtils,String } from '../../Resources/index';
import Utils from '../../Component/Utils';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class IconDetailScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            trainer_detail:[],
            recommended_plan_list: [],
            clientTestinomials:[],
            tips_advise:[],
            isLoading:false,
            trainer_name:"",
            profile:"",
            tag:"",
            handle:"",
            trainer_picture:"",
            country:"",
            city:"",
            total_plan:"",
            quote:"",
            quote_image:"",
            quote_image_thumb:"",
            follow_me_one_image:"",
            follow_me_two_image:"",
            follow_me_three_image:"",
            page:0,
            total_page:0,
            pageTips:0,
            total_page_Tips:0,
        };
    }

    async componentDidMount(){
       this.doTrainerDetail()
        this.doRecommendedPlanList()
        this.doClientTestimonials()
        this.doTipsAdvise()
    }

    async doTrainerDetail() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                trainer_id: await AsyncStorage.getItem("@trainer_id"),
            })
            var data = await post(Constants.TRAINER_DETAIL, body);
           //console.log(("TRAINERDETAIL-->" + JSON.stringify(data)));

            this.setState({ trainer_detail: data.data })

            this.setState({ trainer_name: data.data.name, 
                tag: data.data.tag, 
                handle: data.data.handle, 
                profile: data.data.trainer_thumb,
                trainer_picture: data.data.trainer_picture,
                country: data.data.country,
                city:data.data.city,
                total_plan: data.data.total_plan,
                quote_image_thumb: data.data.quote_image_thumb,
                quote_image: data.data.quote_image,
                quote: data.data.quote,
                follow_me_one_image: data.data.follow_me_one_image,
                follow_me_two_image: data.data.follow_me_two_image,
                follow_me_three_image: data.data.follow_me_three_image,
                })

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

    async doRecommendedPlanList() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                trainer_id: await AsyncStorage.getItem("@trainer_id"),
                page: this.state.page,
            })
            var data = await post(Constants.RECOMMENDED_PLAN_LIST, body);
            //console.log(("RECOMMENDEDPLANLIST-->" + JSON.stringify(data.data)));

            this.setState({ recommended_plan_list: data.data })

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })

            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert", "Please check your internet connection.")
        }
    }

    async doClientTestimonials(){
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                trainer_id: await AsyncStorage.getItem("@trainer_id"),
            })
            var data = await post(Constants.CLIENT_TESTIMONIALS, body);
            console.log(("CLIENT-->" + JSON.stringify(data)));

           for(let i=0;i<data.data.length;i++){
                this.state.clientTestinomials.push(
                    data.data[i]
                )
            }
            this.setState({clientTestinomials:this.state.clientTestinomials})
            console.log("CLient--->"+this.state.clientTestinomials);

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })

            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert", "Please check your internet connection.")
        }
    }

    async doTipsAdvise() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                trainer_id: await AsyncStorage.getItem("@trainer_id"), 
                page: this.state.pageTips
            })
            var data = await post(Constants.TIPS_AND_ADVISE, body);
            //console.log(("TIPS-->" + JSON.stringify(data)));

            this.setState({ tips_advise: data.data, total_page_Tips: data.total_page})
            //console.log("tipsadvise-->"+this.state.tips_advise);

            if (data !== null && data.success === "yes" && data.data !== null) {
                this.setState({ isLoading: false })

            } else {
                Alert.alert(data.message)
                this.setState({ isLoading: false })
            }
        } else {
            Utils.DialogBox("Alert", "Please check your internet connection.")
        }
    }

    handleMore() {
        if (this.state.total_page > this.state.page) {
            this.setState({ page: this.state.page + 1 })
            this.doRecommendedPlanList()
        } else { }
    }

    handleMoreTips() {
        if (this.state.total_page_Tips > this.state.pageTips) {
            this.setState({ pageTips: this.state.pageTips + 1 })
            this.doTipsAdvise()
        } else { }
    }

    renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: "column" }}>
                <ImageBackground source={{ uri: item.trainer_picture }} style={styles.renderImageBackground} imageStyle={styles.renderImageStyle}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("SelectPlanScreen"); }}>
                        <View style={styles.renderBoxView}>
                            <Text style={styles.content1}>{item.category_name}</Text>
                            <View style={{ marginTop: getLayoutSize(5) }}>
                                <Text style={styles.content2}>{item.name}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../../Assets/ImageAndIcons/dumbell.png")} style={styles.renderImage} />
                                <Text style={styles.content4}>{item.days_week}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../../Assets/ImageAndIcons/baseline_date_range_black_48pt.png")} style={styles.renderImage} />
                                <Text style={styles.content4}>{item.weeks}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }

    renderItem2 = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "column", marginTop: getLayoutSize(20),}}>
                <ImageBackground source={{ uri: item.image}} style={styles.render2ImageBackground}>
                    <View style={styles.render2BoxView}>
                        <View style={{ paddingLeft: ScaleUtils.SCREEN_PADDING, marginTop: getLayoutSize(50) }}>
                            <View style={{ marginTop: getLayoutSize(5) }}>
                                <Text style={styles.render2Content1}>{item.name}</Text>
                            </View>
                            <Text style={styles.render2Content3}>OBJECTIVES</Text>
                            <Text style={styles.render2Content4}>{item.objectives}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    renderItem3({item}){
        return(
            <View style={{ padding: ScaleUtils.MARGIN_TOP_TEN, marginTop: getLayoutSize(10) }}>
                <View style={styles.clienttestview}>
                    <Text style={styles.clienttesttext}>{item.testimonial}</Text>

                    <View style={{ flexDirection: "row", marginTop: getLayoutSize(92) }}>
                        <View style={{
                            height: getLayoutSize(1),
                            width: getLayoutSize(40),
                            borderWidth: getLayoutSize(0.5),
                            backgroundColor: Colors.DEFAULT_CONTENT_COLOR,
                            borderColor: Colors.DEFAULT_CONTENT_COLOR,
                        }}></View>

                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.clientbottomlineview}>

                                <Image source={{ uri: item.client_image }}
                                    style={styles.clientbottomviewimage}
                                />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.jennycliffe}>{item.client_name}</Text>

                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.london}>{item.city}</Text>
                                    <Text style={styles.country}>{item.country}</Text>
                                </View>

                            </View>
                        </View>
                    </View>

                    <View style={{
                        height: getLayoutSize(0.5), width: getLayoutSize(130),
                        borderWidth: getLayoutSize(0.5), backgroundColor: Colors.DEFAULT_CONTENT_COLOR,
                        borderColor: Colors.DEFAULT_CONTENT_COLOR
                        , marginLeft: getLayoutSize(226),
                        marginTop: getLayoutSize(-30)
                    }}></View>
                </View>
            </View>
        );
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <ScrollView>
                <ImageBackground source={{uri:this.state.trainer_picture}} style={styles.imageBackground}>
                    <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.shadow} >
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ marginTop: getLayoutSize(10), left: getLayoutSize(20), }} >
                            <Image source={require("../../Assets/ImageAndIcons/back_with_arrow.png")} style={styles.headerImageArrow} />
                        </TouchableOpacity>
                        <View style={styles.container}>
                            <View style={styles.imageCircleView1}>
                                <View style={styles.imageCircleView2}>
                                    <Image source={{uri:this.state.profile}} style={styles.imageProfile} />
                                    <Image source={require("../../Assets/ImageAndIcons/play.png")} style={styles.imagePlay} />
                                </View>
                            </View>
                            <Text style={styles.content1}>{this.state.tag}</Text>
                            <View style={{ marginTop: getLayoutSize(10) }}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={styles.lineView}></View>
                                    <Text style={styles.content2}>{this.state.trainer_name}</Text>
                                </View>
                            </View>
                            <View style={styles.fitnessCreatorView}>
                                <Text style={styles.content4}>{this.state.handle}</Text>
                            </View>
                                <View style={{ flexDirection: "row", marginTop: getLayoutSize(40) }}>
                                    <View style={styles.durationView}>
                                        <View style={styles.topLineLocationView}></View>
                                        <Image source={require("../../Assets/ImageAndIcons/outline_room_black_48pt.png")} style={styles.durationImage} />
                                        <View style={styles.topLineLocationView}></View>
                                        <View style={styles.durationContentView}>
                                            <Text style={styles.durationContentText1}>{this.state.city}</Text>
                                            <Text style={styles.durationContentText2}>{this.state.country}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.durationView}>
                                        <View style={styles.topLinePlanView}></View>
                                        <Image source={require("../../Assets/ImageAndIcons/outline_filter_none_black_48pt.png")} style={styles.planImage} />
                                        <View style={styles.topLinePlanView}></View>
                                        <View style={styles.planContentView}>
                                            <Text style={styles.durationContentText1}>{this.state.total_plan}</Text>
                                            <Text style={styles.durationContentText2}>Plans</Text>
                                        </View>
                                    </View>
                                    <View style={styles.durationView}>
                                        <View style={styles.topLineFollowersView}></View>
                                        <Image source={require("../../Assets/ImageAndIcons/user.png")} style={styles.planImage} />
                                        <View style={styles.topLineFollowersView}></View>
                                        <View style={styles.followersContentView}>
                                            <Text style={styles.durationContentText1}>331k</Text>
                                            <Text style={styles.durationContentText2}>Followers</Text>
                                        </View>
                                    </View>
                                </View>
                        </View>
                    </ImageBackground>
                </ImageBackground>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: getLayoutSize(40),padding:getLayoutSize(20) }}>
                        <Text style={styles.moreFromHebaText}>{String.iconDetailsScreen.PLAN_SELECTION}</Text>
                        <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        {this.state.isLoading === true ?
                            <ActivityIndicator size="small" color="#ffffff" /> : (
                                this.state.recommended_plan_list.length !== 0 ?
                        <FlatList
                            data={this.state.recommended_plan_list}
                            keyExtractor={(index) => index.toString()}
                            renderItem={this.renderItem.bind(this)}
                            horizontal={true}
                            onEndReached={this.handleMore.bind(this)} />
                                    : <Text style={{ color: "white" }}>No Records</Text>
                            )}
                    </View>
                    <ImageBackground source={{uri:this.state.quote_image_thumb}} style={styles.quoteImageBackground}>
                        <ImageBackground source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.quoteImageShadow} >
                            <Image source={{uri:this.state.quote_image}} style={styles.renderImage}></Image>
                            <View style={{marginTop:getLayoutSize(30)}}>
                                <Text style={styles.quotedText}>{this.state.quote}</Text>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                    <View style={{ padding: ScaleUtils.SCREEN_PADDING, }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: getLayoutSize(40), }}>
                            <Text style={styles.moreFromHebaText}>{String.iconDetailsScreen.CLIENT_FONT}</Text>
                            <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                        </View>
                        {this.state.isLoading === true ?
                            <ActivityIndicator size="small" color="#ffffff" /> : (
                                this.state.clientTestinomials.length !== 0 ?
                            <FlatList
                                data={this.state.clientTestinomials}
                                keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem3.bind(this)}
                                horizontal={true}/>
                                : <Text style={{ color: "white" }}>No Records</Text>
                            )}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: getLayoutSize(60), }}>
                            <Text style={styles.moreFromHebaText}>{String.iconDetailsScreen.TERMS_CONDITIOIN_TEXT}</Text>
                            <Image source={require("../../Assets/ImageAndIcons/code.png")} style={styles.codeImage}></Image>
                        </View>
                        {this.state.isLoading === true ?
                            <ActivityIndicator size="small" color="#ffffff" /> : (
                                this.state.tips_advise.length !== 0 ?
                        <FlatList
                            data={this.state.tips_advise}
                            keyExtractor={(index) => index.toString()}
                            renderItem={this.renderItem2.bind(this)}
                            horizontal={true} 
                            onEndReached={this.handleMoreTips.bind(this)} />
                                    : <Text style={{ color: "#868686",alignSelf:"center",marginTop:ScaleUtils.MARGIN_TOP_TEN }}>No Records Found</Text>
                            )}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: getLayoutSize(30), }}>
                            <Text style={styles.moreFromHebaText}>{String.iconDetailsScreen.FOLLOW_FONT}</Text>
                        </View>
                        <View style={{marginTop:getLayoutSize(20),flexDirection:"row"}}>
                            <Image source={{ uri: this.state.follow_me_one_image}} style={styles.followImage}></Image>
                            <Image source={{ uri: this.state.follow_me_two_image }} style={styles.followImage}></Image>
                            <Image source={{ uri: this.state.follow_me_three_image }} style={styles.followImage}></Image>
                            {/*<FlatList
                                data={this.state.data3}
                                keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem3.bind(this)}
                            numColumns={3} />*/}
                        </View>
                    </View>
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
    container: {
        flex: 1,
        padding: ScaleUtils.SCREEN_PADDING,
    },
    headerImageArrow: {
        height: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        width: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        alignItems: "flex-end",
    },
    imageBackground: {
        height: getLayoutSize(420),
        width: ScaleUtils.IMAGE_WIDTH,
        justifyContent: "center",
    },
    shadow: {
        width: ScaleUtils.IMAGE_WIDTH,
        height: getLayoutSize(420),
    },
    imageCircleView1: {
        height: getLayoutSize(56),
        width: getLayoutSize(56),
        borderRadius: 28,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        justifyContent: "center",
        marginTop:getLayoutSize(60),
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
    imageProfile: {
        height: getLayoutSize(48),
        width: getLayoutSize(48),
        borderRadius: 24,
        alignSelf: "center",
    },
    imagePlay: {
        height: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        width: ScaleUtils.IMAGE_SIZE_FIFTEEN,
        tintColor:Colors.DEFAULT_SUB_CONTENT_COLOR,
        resizeMode: "cover",
        alignSelf: "center",
        position:"absolute"
    },
    content1: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font4,
        marginTop: ScaleUtils.MARGIN_TWENTY,
    },
    lineView: {
        height: getLayoutSize(40),
        width: getLayoutSize(3),
        backgroundColor: Colors.COLOR_PRIMARY,
        marginRight: getLayoutSize(10),
        alignSelf: "center",
    },
    content2: {
        color:Colors.DEFAULT_APP_FONT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_THIRTYFIVE,
        fontFamily: AppFonts.text.font2,
    },
    fitnessCreatorView: {
        height: getLayoutSize(30),
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
    durationView: {
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        height: getLayoutSize(95),
        width: "30%",
        marginLeft: getLayoutSize(10),
        borderTopWidth: 0,
        flexDirection: "row",
    },
    topLineLocationView: {
        borderTopWidth: 0.8,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width: "34.3%"
    },
    topLinePlanView: {
        borderTopWidth: 0.8,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width: "36%"
    },
    topLineFollowersView: {
        borderTopWidth: 0.8,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width: "36%"
    },
    durationImage: {
        width: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        height: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        tintColor: Colors.DEFAULT_CONTENT_COLOR,
        marginTop: getLayoutSize(-10),
        marginLeft: ScaleUtils.MARGIN_FIVE,
        marginRight: ScaleUtils.MARGIN_FIVE,
    },
    durationContentView: {
        position: "absolute",
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
        marginLeft: ScaleUtils.MARGIN_TOP_TEN,
        justifyContent: "center"
    },
    durationContentText1: {
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
    },
    durationContentText2: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        fontSize: TextUtils.BUTTON_TEXT,
        marginTop: getLayoutSize(8),
    },
    planImage: {
        width: ScaleUtils.IMAGE_SIZE_TWENTY,
        height: ScaleUtils.IMAGE_SIZE_TWENTY,
        tintColor: Colors.DEFAULT_CONTENT_COLOR,
        marginTop: getLayoutSize(-10),
        marginLeft: ScaleUtils.MARGIN_FIVE,
        marginRight: ScaleUtils.MARGIN_FIVE,
    },
    planContentView: {
        position: "absolute",
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
        marginLeft: getLayoutSize(32),
    },
    followersContentView: {
        position: "absolute",
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
        marginLeft: getLayoutSize(22),
    },
    moreFromHebaText: {
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize:TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily: AppFonts.text.font4,
        alignSelf: "center",
    },
    codeImage: {
        tintColor: Colors.DEFAULT_CONTENT_COLOR,
        height: ScaleUtils.IMAGE_SIZE_THIRTY,
        width: ScaleUtils.IMAGE_SIZE_THIRTY,
        marginRight: TextUtils.TEXT_SIZE_FIFTEEN,
        alignSelf: "center"
    },
    renderShadow: {
        width: ScaleUtils.IMAGE_WIDTH,
        height: screenHeight,
    },
    renderImageBackground: {
        marginTop: ScaleUtils.MARGIN_TOP_TEN,
        height: getLayoutSize(350),
        width: getLayoutSize(300),
        justifyContent: "center",
        marginLeft: ScaleUtils.MARGIN_TWENTY,
    },
    renderImageStyle: {
        resizeMode: "cover",
        borderColor: "transparent",
        borderRadius: 10,
        opacity: 0.8
    },
    renderBoxView: {
        height: getLayoutSize(330),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width: "92%",
        alignSelf: "center",
        padding: getLayoutSize(10),
    },
    content1: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font4,
        marginTop: ScaleUtils.MARGIN_TWENTY,
    },
    content2: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_THIRTY,
        fontFamily: AppFonts.text.font1,
    },
    content4: {
        color: Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
    },
    renderImage: {
        height: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        width: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        tintColor: Colors.DEFAULT_SUB_CONTENT_COLOR,
        marginRight: ScaleUtils.MARGIN_TOP_TEN,
        alignSelf: "center",
    },
    quoteImageBackground: {
        height: getLayoutSize(250),
        width: ScaleUtils.IMAGE_WIDTH,
        justifyContent: "center",
        marginTop:getLayoutSize(40)
    },
    quoteImageShadow: {
        width: ScaleUtils.IMAGE_WIDTH,
        height: getLayoutSize(250),
        justifyContent:"center",
    },
    renderImage: {
        height: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        width: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        tintColor: Colors.DEFAULT_SUB_CONTENT_COLOR,
        marginRight: ScaleUtils.MARGIN_TOP_TEN,
        alignSelf: "center",
    },
    quotedText:{
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontFamily:AppFonts.text.font4,
        fontSize:TextUtils.TEXT_SIZE_FIFTEEN,
        alignSelf:"center"
    },
    render2ImageBackground: {
        height: getLayoutSize(350),
        width: getLayoutSize(300),
        justifyContent: "center",
        marginRight: ScaleUtils.MARGIN_TWENTY,
        padding: getLayoutSize(10)
    },
    render2BoxView: {
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        height: getLayoutSize(320),
        width: ScaleUtils.IMAGE_WIDTH,
    },
    render2Content1: {
        color: Colors.DEFAULT_APP_FONT_COLOR,
        fontSize:TextUtils.TEXT_SIZE_TENTYFIVE,
        fontFamily: AppFonts.text.font2,
    },
    render2Content3: {
        color: Colors.COLOR_PRIMARY,
        fontSize:TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
        marginTop: ScaleUtils.MARGIN_TOP_THIRTY,
    },
    render2Content4: {
        color:Colors.DEFAULT_SUB_CONTENT_COLOR,
        fontSize: TextUtils.TEXT_SIZE_FIFTEEN,
        fontFamily: AppFonts.text.font3,
        marginTop: ScaleUtils.MARGIN_TOP_TEN,
    },
    followImage:{
        height:getLayoutSize(130),
        width:getLayoutSize(130),
        resizeMode:"cover"
    },
    clienttestview: {
        marginBottom: ScaleUtils.MARGIN_TWENTY,
        height: getLayoutSize(199),
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        width: screenWidth - 50,
    },
    clienttesttext: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        lineHeight: 20,
        padding: ScaleUtils.SCREEN_PADDING,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
    },
    clientbottomlineview: {
        height: getLayoutSize(70),
        width: getLayoutSize(70),
        borderRadius: 35,
        marginLeft: ScaleUtils.MARGIN_TOP_TEN,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_CONTENT_COLOR,
        marginTop: getLayoutSize(-40),
        justifyContent:"center"
    },
    clientbottomviewimage: {
        height: ScaleUtils.IMAGE_SIZE_FIFTY,
        width: ScaleUtils.IMAGE_SIZE_FIFTY,
        borderRadius: getLayoutSize(25),
        alignSelf: "center"
    },
    jennycliffe: {
        color:Colors.DEFAULT_APP_FONT_COLOR,
        marginTop: getLayoutSize(-20),
        marginLeft: ScaleUtils.MARGIN_TOP_TEN,
    },
    london: {
        color:Colors.DEFAULT_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        marginTop: getLayoutSize(5),
        fontFamily: AppFonts.text.font3,
        marginLeft: ScaleUtils.MARGIN_TOP_TEN,
    },
    country: {
        color:Colors.DEFAULT_CONTENT_COLOR,
        fontSize: TextUtils.BUTTON_TEXT,
        marginTop: getLayoutSize(5),
        fontFamily: AppFonts.text.font3,
        marginLeft: ScaleUtils.MARGIN_TOP_TEN,
        marginLeft: getLayoutSize(10)
    },
});

