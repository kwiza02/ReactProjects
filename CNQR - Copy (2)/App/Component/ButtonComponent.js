//ButtonComponent

import React, { Component } from "react";

import { Header, button, Colors, String, AppFonts, TextUtils, ScaleUtils } from '../Resources/index';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

const ButtonComponent = ({ text }) => {
    return (

        <View style={styles.buttonView}>
            <View style={button.ButtonLoginContainer}>
                <Text style={button.mainScreenButtonLoginText}>{text}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    buttonview: {
        marginTop: ScaleUtils.AUTHENTICATION_BUTTON_MARGIN_TOP
    }

});

export default ButtonComponent


/**
 * 
 * 
 * //ButtonComponent

import React, { Component } from "react";

import { Header, button, Colors, String, AppFonts, TextUtils, ScaleUtils } from '../Resources/index';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

class ButtonComponent extends Component {
    //const ButtonComponent = ({ text }) => {
    render() {
        return (
            <TouchableOpacity onPress={()=>{this.props.onClicked()}} >
            <View style={styles.buttonView}>
                <View style={button.ButtonLoginContainer}>
                    <Text style={button.mainScreenButtonLoginText}>{text}</Text>
                </View>
            </View>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    buttonview: {
        marginTop: ScaleUtils.AUTHENTICATION_BUTTON_MARGIN_TOP
    }

});

export default ButtonComponent
 */