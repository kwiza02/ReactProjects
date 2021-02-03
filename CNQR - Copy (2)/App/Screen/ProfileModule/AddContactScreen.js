//AddContactScreen

import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    StatusBar,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    TextInput,
} from 'react-native';
import Ruler from 'react-native-animated-ruler';
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import { post, get } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';
import { button, AppFonts, Colors, PlanHeader, ScaleUtils, TextUtils, String } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';
import ButtonComponent from '../../Component/ButtonComponent';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class AddContactScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contact:"",
            contactError:"",
            contactValid:"",
            isLoading: false,
        };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("ContactPrefrenceScreen")
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    async isCheck() {
        var isValid = true;

        if (Utils.isStringNull(this.state.contact)) {
            isValid = false;
            this.setState({ contactError: String.validate.contactError });
        } else if (!Utils.isContactLength(this.state.contact)) {
            isValid = false;
            this.setState({ contactValid: String.validate.lengthError });
        } else {
            this.setState({ contactError: null });
        }

        if (isValid) {
            this.doContactAdd();
        } else { }
    }

     async doContactAdd(){
         const isConnected = await Utils.isNetworkAvailable()
         if (isConnected == true) {
             this.setState({ isLoading: true });
             var body = JSON.stringify({
                 user_id:await AsyncStorage.getItem("@user_id"),
                 contact:this.state.contact
             })
             var data = await post(Constants.ADD_CONTACT_PREFRENCES, body);

             if (data !== null && data.success === "yes" && data.data !== null) {
                 this.setState({ isLoading: false })
                 Utils.DialogBox(data.message)
                 this.props.navigation.navigate("ContactPrefrenceScreen",{contact:this.state.contact})

             } else {
                 Alert.alert(data.message)
                 this.setState({ isLoading: false })
             }
         } else {
             Utils.DialogBox("Alert", "Please check your internet connection.")
         }
     }


    render() {
        return (
            <View style={styles.mainContainer}>
                <PlanHeader title={require("../../Assets/ImageAndIcons/logo.png")}
                    imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")}
                    screen={"ContactPrefrenceScreen"}
                    navigation={this.props.navigation}/>
                <View style={{ justifyContent: "center", padding: ScaleUtils.SCREEN_PADDING }}>
                    <TextInput
                    style={styles.inputStyle}
                    placeholder="Phone Number"
                    keyboardType={"phone-pad"}
                    placeholderTextColor="#a9a9a9"
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({ contact: text,contactError:null,contactValid:null }) }} />
                    {!!this.state.contactError && (
                        <Text style={{ color: Colors.ERROR_COLOR }}>{String.validate.contactError}</Text>
                    )}
                    {!!this.state.contactValid && (
                        <Text style={{ color: Colors.ERROR_COLOR }}>{String.validate.lengthError}</Text>
                    )}
                    <View style={{marginTop:ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP}}>
                        <TouchableOpacity onPress={() => { this.isCheck() }}>
                            <ButtonComponent text={"ADD"} />
                        </TouchableOpacity>
                    </View>
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
    inputStyle: {
        marginTop: ScaleUtils.AUTHENTICATION_INPUTTEXT_MARGIN_TOP,
        borderBottomColor: "#a9a9a9",
        borderWidth: 1,
        color: Colors.TITLE_FONT_COLOR,
    },
})

