//MainScreen

import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    StatusBar,
    Dimensions, 
    ImageBackground,
    TouchableOpacity ,
    BackHandler,
    ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';

import {button,AppFonts} from '../../Resources/index';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class MainScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            text:[
                {   
                    logo:require("../../Assets/ImageAndIcons/logo.png"),
                    heading:"DISCOVER",
                    content:"\t\t A training plan from leading,proven \t \n figures of success made for your lifestyle."
                 },
                {
                    logo: require("../../Assets/ImageAndIcons/logo.png"),
                    heading: "HEALTH",
                    content: "\t\t A training plan from leading,proven \t \n figures of success made for your lifestyle."
                },
                {
                    logo: require("../../Assets/ImageAndIcons/logo.png"),
                    heading: "FITNESS",
                    content: "\t\t A training plan from leading,proven \t \n figures of success made for your lifestyle."
                },
                {
                    logo: require("../../Assets/ImageAndIcons/logo.png"),
                    heading: "WALKING",
                    content: "\t\t A training plan from leading,proven \t \n figures of success made for your lifestyle."
                },
            ]
        };
    }

    componentDidMount(){

    }

    disableBackButton = () => {
        BackHandler.exitApp();
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }



    renderItem ({item}) {
        return(
            <View>
                <View style={styles.viewHeader}>
                    <Text style={styles.textHeader}> {item.heading} </Text>
                </View>
                <View style={styles.viewContent}>
                    <Text style={styles.textContent}> {item.content} </Text>
                </View>
            </View>
         );
    }

    render() {
        return (
                <View style={styles.container} >
                    <StatusBar
                        barStyle="light-content"
                        hidden={false}
                        backgroundColor="black"
                        translucent={false}
                        networkActivityIndicatorVisible={true} />
                    <ImageBackground source={require("../../Assets/ImageAndIcons/bg_one.png")} style={styles.backgroundImage}>
                        <Image source={require("../../Assets/ImageAndIcons/Rectangle.png")} style={styles.shadow} />
                        <Swiper dot={<View style={styles.dotStyle}></View>}
                                activeDot={<View style={styles.activeDotOuter}>
                                    <View style={styles.activeDotInner}/>
                                    </View>}>
                            {this.state.text.map((item) => (
                                <View>
                                    <View style={{height:getLayoutSize(400),width:"100%",justifyContent:"center"}}>
                                        <Image source={require("../../Assets/ImageAndIcons/logo.png")} style={styles.logo}></Image>
                                    </View>
                                    <View style={styles.viewHeader}>
                                        <Text style={styles.textHeader}> {item.heading} </Text>
                                    </View>
                                    <View style={styles.viewContent}>
                                        <Text style={styles.textContent}> {item.content} </Text>
                                    </View>
                                </View>
                                )
                            )}
                        </Swiper>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={button.mainScreenButtonContainer} onPress={() => { this.props.navigation.navigate("RegisterScreen") }}>
                            <Text style={button.mainScreenButtonText}>JOIN NOW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={button.mainScreenButtonLoginContainer} onPress={() => { this.props.navigation.navigate("LoginScreen") }}>
                            <Text style={button.mainScreenButtonLoginText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                    </ImageBackground>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        opacity: 0.7,
        justifyContent: "center",
    },
    logo: {
        alignSelf: "center",
        tintColor:"#00f3b9",
        marginTop:getLayoutSize(200),
    },
    viewHeader: {
        marginTop: getLayoutSize(0),
    },
    textHeader: {
        fontSize: getFontSize(18),
        textAlign: 'center',
        color: "white",
        fontFamily:AppFonts.text.font2,
    },
    textContent: {
        fontSize: getFontSize(15),
        textAlign: 'center',
        color: "white",
        fontFamily:AppFonts.text.font3,
    },
    viewContent: {
        marginTop: getLayoutSize(25),
    },
    dotStyle: {
        width: getLayoutSize(6),
        height: getLayoutSize(6),
        borderRadius: 3,
        backgroundColor: "gray",
        margin: getLayoutSize(5),
    },
    activeDotOuter: {
        width: getLayoutSize(18),
        height: getLayoutSize(18),
        borderRadius: 9,
        borderColor: "#00f3b9",
        borderWidth: 1,
        justifyContent: "center",
    },
    activeDotInner: {
        width: getLayoutSize(6),
        height: getLayoutSize(6),
        borderRadius: 3,
        backgroundColor: "#00f3b9",
        alignSelf: "center",
    },
    shadow: {
        width: screenWidth,
        height: screenHeight,
        position: "absolute",
    },
    buttonView:{
        justifyContent:"space-around",
        flexDirection:"row",
        marginBottom: getLayoutSize(25),
    }
});