//ContactPrefrenceScreen

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
    FlatList,
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

export default class ContactPrefrenceScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            contact:[],
            isLoading:false
        };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("UserProfileScreen")
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    async componentDidMount(){
        /*if (this.props.route.params.contact != "undefined") {
            this.setState({ contact: this.props.route.params.contact})
        }
        console.log("contact-->" + this.state.contact);
        this.joinData()*/
        this.doContactGet()
    }

    async doContactGet() {
        const isConnected = await Utils.isNetworkAvailable()
        if (isConnected == true) {
            this.setState({ isLoading: true });
            var body = JSON.stringify({
                user_id: await AsyncStorage.getItem("@user_id"),
            })
            var data = await post(Constants.GET_CONTACT_PREFRENCES, body);

            this.setState({contact:data.data})

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



    /*joinData = () => {

        if (this.state.contact !== '') {
            this.state.contactArray.push({ content: this.state.contact });
            this.setState({ updateContact: [...this.state.contactArray] })
        } else {

        }
    }*/

    renderItem({item}){
        return(
            <Text style={{ color: Colors.DEFAULT_APP_FONT_COLOR }}>{item.contact}</Text>
        );
    }

    renderSeparator = () => {
        return (
            <View style={{
                height: 1,
                borderColor: "#282c30",
                borderWidth: 0.2,
                width: "100%",
                marginTop: getLayoutSize(15),
                marginBottom: getLayoutSize(15)
            }}>
            </View>
        );
    }  

    render(){
        return(
            <View style={styles.mainContainer}>
                {/*<PlanHeader title={require("../../Assets/ImageAndIcons/logo.png")}
                    imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")}/>*/}
                <View style={styles.container}>
                    <View style={styles.viewstyle}>
                        <TouchableOpacity style={styles.imageArrrow} onPress={() => { this.props.navigation.navigate("UserProfileScreen") }}>
                            <Image source={require("../../Assets/ImageAndIcons/back_with_arrow.png")} style={styles.imageArrrow} />
                        </TouchableOpacity>
                        <Image source={require("../../Assets/ImageAndIcons/logo.png")} style={styles.logo}></Image>
                        <TouchableOpacity style={{ flexDirection: "row", position: "absolute", right: getLayoutSize(15), justifyContent: "flex-start" }}
                            onPress={() => { this.props.navigation.navigate("AddContactScreen") }}>
                            <Image source={require("../../Assets/ImageAndIcons/plus.png")} style={styles.imagePlus} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{padding:ScaleUtils.SCREEN_PADDING}}>
                    <FlatList
                        data={this.state.contact}
                        keyExtractor={(index) => index.toString()}
                        renderItem={this.renderItem.bind(this)}
                        horizontal={false}
                        ItemSeparatorComponent={this.renderSeparator} />
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
    container: {
        flexDirection: "row",
        borderBottomColor: "#868686",
        borderWidth: 0.1,
        height: getLayoutSize(60),
        justifyContent: "center",
        width: "100%",
    },
    viewstyle: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
    },
    imageArrrow: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        tintColor: "white",
        alignItems:"flex-end",
        position:"absolute",
        left:6
    },
    logo: {
        height: getLayoutSize(25),
        width: getLayoutSize(70),
        alignSelf: "center",
        position: "absolute",
        tintColor: "#00f3b9",
    },
    imagePlus: {
        height: getLayoutSize(20),
        width: getLayoutSize(20),
        tintColor: "white",
    },
});