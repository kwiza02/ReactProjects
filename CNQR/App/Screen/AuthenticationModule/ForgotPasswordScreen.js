//ForgotPasswordScreen

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
} from "react-native";

import { Header, button, color, String } from '../../Resources/index';
import Utils from '../../Component/Utils';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class ForgotPasswordScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            validateemail: '',
        };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("LoginScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    isCheck() {
        var isValid = true;

        if (Utils.isStringNull(this.state.email)) {
            isValid = false;
            this.setState({ emailError: String.validate.email });
        } else if (!Utils.isEmailValid(this.state.email)) {
            isValid = false;
            this.setState({ emailError: String.validate.validateemail });
        } else {
            this.setState({ emailError: null });
        }

        if (isValid === true) {
            this.props.navigation.navigate("LoginScreen");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, backgroundColor: "black" }}>
                    <Header imgSrc={require('../../Assets/ImageAndIcons/back_with_arrow.png')} isBack={true} navigation={this.props.navigation} screen={"LoginScreen"} title={require("../../Assets/ImageAndIcons/logo.png")} />
                    <View style={{ justifyContent: "center", padding: getLayoutSize(20) }}>
                        <Text style={styles.text}>FORGOT PASSWORD</Text>

                        <TextInput
                            style={styles.TextInput}
                            placeholderTextColor="#a9a9a9"
                            value={this.state.email}
                            keyboardType="email-address"
                            onChangeText={(text) => { this.setState({ email: text, emailError: null, validateemail: null }) }}
                            placeholder={"Email"}
                        />

                        {!!this.state.emailError && (
                            <Text style={color.colors}>{this.state.emailError}</Text>
                        )}
                        {!!this.state.validateemail && (
                            <Text style={color.colors}>{this.state.validateemail}</Text>
                        )}


                        <View style={{ marginTop: getLayoutSize(50) }}>
                            <TouchableOpacity style={button.ButtonLoginContainer} onPress={() => { this.isCheck() }}>
                                <Text style={button.mainScreenButtonLoginText}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    text: {
        fontSize: getFontSize(20),
        color: "white",
        marginTop:getLayoutSize(50),
        alignSelf: "center",
        fontWeight: "bold"
    },
    TextInput: {
        color: "white",
        marginTop: getLayoutSize(40),
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
    forgot: {
        color: "gray",
        marginTop: getLayoutSize(30),
    },
    gethelp: {
        marginLeft: getLayoutSize(5),
        color: "#10fec3",
        marginTop: getLayoutSize(30),
    },
    gmail: {
        height: getLayoutSize(20),
        width: getLayoutSize(20),
        tintColor: "#868686",
        alignSelf: "center"
    }

});

