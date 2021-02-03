//PrivacyPolicyScreen

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

const PolicyHTML = require('../../Assets/Webview/PrivacyPolicyScreen.html');


export default class PrivacyPolicyScreen extends Component {

    render() {
        return (
            <View>
                <View style={{ width: '100%', height: '100%' }}>
                    <WebView 
                        originWhitelist={['*']}
                        source={{ html: PolicyHTML }} />
                </View>
            </View>
        );
    }
}