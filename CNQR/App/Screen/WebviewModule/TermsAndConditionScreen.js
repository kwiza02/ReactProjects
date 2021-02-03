//TermsAndConditionScreen

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
} from "react-native";
import { WebView } from 'react-native-webview';

export default class TermsAndConditionScreen extends Component {

    render() {
        return (
            <WebView
                style={{ flex: 1 }}
                originWhitelist={['*']}
                source={{ uri: "https://reactnative.dev/" }}
                style={{ marginTop: 20 }}
                javaScriptEnabled={true}
                domStorageEnabled={true} />
        );
    }
}