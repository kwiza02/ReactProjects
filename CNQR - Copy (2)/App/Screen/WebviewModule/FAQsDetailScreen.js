//FAQsDetailScreen

import React, { Component } from "react";
import {
    View,
    Dimensions,
    StyleSheet,
    BackHandler,
    ScrollView,
    Text,
    Image,
} from "react-native";
import HTML from "react-native-render-html";
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import { button, AppFonts, Colors, PlanHeader, TextUtils, ScaleUtils } from '../../Resources/index';
import Utils from '../../Component/Utils';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class FAQsDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flag1: false,
            isLoading: false,
            flag: false,

            content: props.route.params.content
        };
    }

    //handler
    disableBackButton = () => {
        this.props.navigation.navigate('FAQsScreen')
        //this.props.navigation.goBack();
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }
    //handler

  async componentDidMount() {
        if (this.props.route.params.content != "undefined") {
            this.setState({ content: this.props.route.params.content })
        }
        console.log("content----> " + this.props.route.params.content);
    }

    render() {
        return (
            <View style={styles.container}>

                <PlanHeader
                    imgSrc={require('../../Assets/ImageAndIcons/back_with_arrow.png')}
                    title={require('../../Assets/ImageAndIcons/logo.png')}
                    navigation={this.props.navigation}
                    screen={"FAQsScreen"}
                />
                <ScrollView>
                    <View style={{ padding: getLayoutSize(15) }}>
                        <HTML html={this.state.content}
                            baseFontStyle={{
                                color: Colors.DEFAULT_CONTENT_COLOR,
                                fontSize: TextUtils.TEXT_SIZE_TENTYTWO,
                                lineHeight: getLayoutSize(25),
                            }}
                            containerStyle={{
                                alignSelf: "center",
                                marginTop: ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR,
    },

});

