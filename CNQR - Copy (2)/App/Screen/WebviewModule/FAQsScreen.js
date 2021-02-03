//FAQsScreen

import React, { Component } from "react";
import {
    Text,
    View,
    StatusBar,
    Dimensions,
    StyleSheet,
    BackHandler,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { WebView } from 'react-native-webview';
import HTML from "react-native-render-html";
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import { button, AppFonts, Colors, PlanHeader, TextUtils, ScaleUtils } from '../../Resources/index';
import Utils from '../../Component/Utils';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class FAQsScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            isLoading:false,
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        var data = await get(Constants.GET_FAQS);
        console.log("URL " + JSON.stringify(data.data));
        for(let i=0;i<data.data.length;i++){
            this.state.data.push(
                data.data[i]
            )
        }
        this.setState({ data: this.state.data, isLoading: false });
        console.log("DATA--->" + this.state.data);
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ padding: getLayoutSize(15) }}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("FAQsDetailScreen", { content: item.content }) }}>
                    <Text style={{ color: Colors.DEFAULT_APP_FONT_COLOR, marginTop: getLayoutSize(10), fontSize: getFontSize(20) }}>{item.topic_name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderSeparator = () => (
        <View
            style={{
                borderBottomWidth: 1,
                marginTop: getLayoutSize(10),
                borderColor:"#1c1c1c",

            }}
        />
    );

    render() {
        return (
            <View style={styles.mainContainer}>
                <PlanHeader title={require("../../Assets/ImageAndIcons/logo.png")}
                    imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")}
                    isBack={true}
                    screen={"AccountInfoScreen"}
                    navigation={this.props.navigation} />

                {this.state.isLoading === true ?
                    <ActivityIndicator size="small" color="#ffffff" /> : (
                        this.state.data.length !== 0 ?
                            <FlatList
                                data={this.state.data}
                                keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem.bind(this)}
                                ItemSeparatorComponent={this.renderSeparator} />
                            : <Text style={{ color: "#868686", alignSelf: "center", marginTop: ScaleUtils.MARGIN_TOP_TEN }}>No Records Found</Text>
                    )}
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
    },
    htmlContentText: {
        color:"white",
        fontFamily: AppFonts.text.font3,
        alignSelf: "center",
        fontSize: getFontSize(18),
        marginLeft: getLayoutSize(35),
        marginTop: ScaleUtils.MARGIN_TOP_TEN,
    },
})

/*{this.state.isLoading === true ?
                    <ActivityIndicator size="small" color="#ffffff" /> : (
                        this.state.data.length !== 0 ?
                <FlatList
                data={this.state.data}
                keyExtractor={(index) => index.toString()}
                    renderItem={this.renderItem.bind(this)}/>
                            : <Text style={{ color: "#868686", alignSelf: "center", marginTop: ScaleUtils.MARGIN_TOP_TEN }}>No Records Found</Text>
                    )}*/

                    /* {this.state.isLoading === true ?
                    <ActivityIndicator size="small" color="#ffffff" /> : (
                        this.state.data.length !== 0 ?
                <FlatList
                    data={this.state.data}
                    keyExtractor={(index) => index.toString()}
                                renderItem={this.renderItem.bind(this)}/>
                            : <Text style={{ color: "White" }}>No Records</Text>
                    )} */