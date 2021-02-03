//GoalScreen

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    Image, 
    Alert,
} from 'react-native';

import { button, AppFonts, TrialHeader } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class GoalScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            indexChecked:0,
            flag:false,
            data:[
                {
                    header:"FAT LOSS",
                    content:"I'd like to lose weight,while preserve",
                    content2: "muscle and athletic performance.",
                    isCheck:1,
                },
                {
                    header: "MUSCLE GAIN",
                    content: "I'd like to lose weight,while preserve",
                    content2: "muscle and athletic performance.",
                    isCheck: 2,
                },
                {
                    header: "MAINTENANCE",
                    content: "I'd like to lose weight,while preserve",
                    content2: "muscle and athletic performance.",
                    isCheck: 3,
                },
            ]
        };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("WeightScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    renderItem({ item }) {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.setState({ indexChecked: item.isCheck, flag: !this.state.flag }) }}>
                    {this.state.indexChecked === item.isCheck ?
                        <View style={styles.goalViewSelected}>
                            <Image source={require("../../Assets/ImageAndIcons/correct.png")} style={styles.correctActiveImage}></Image>
                            <Text style={styles.goalHeader}>{item.header}</Text>
                            <Text style={styles.goalHeaderContent}>{item.content}</Text>
                            <Text style={styles.goalHeaderContent2}>{item.content2}</Text>
                        </View>
                        :
                        <View style={styles.goalView}>
                            <Text style={styles.goalHeader}>{item.header}</Text>
                            <Text style={styles.goalHeaderContent}>{item.content}</Text>
                            <Text style={styles.goalHeaderContent2}>{item.content2}</Text>
                        </View>
                    }
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TrialHeader imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} value={4}  screen={"WeightScreen"} navigation={this.props.navigation}></TrialHeader>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.header}>YOUR GOAL?</Text>
                        <Text style={styles.headerContent}>Choose one of the following for your</Text>
                        <Text style={styles.headerContent2}>personal fitness goals so we can</Text>
                        <Text style={styles.headerContent2}>recommands the right plan for you.</Text>
                        <View style={styles.renderView}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(index) => index.toString()}
                            renderItem={this.renderItem.bind(this)}/>
                        </View>
                        <View style={styles.registerButtonView}>
                            <TouchableOpacity style={button.ButtonLoginContainer} onPress={() => { this.state.flag === true ? this.props.navigation.navigate("CurrentActivityScreen") : Alert.alert("Alert", "Please select any of above goal."); this.setState({ indexChecked: 0,flag:false }) }}>
                                <Text style={button.mainScreenButtonLoginText}>NEXT STEP</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "black",
        flex: 1,
    },
    container: {
        flex: 1,
        padding: getLayoutSize(25),
    },
    header: {
        fontFamily: AppFonts.text.font2,
        fontSize: getFontSize(25),
        color: "white",
        alignSelf: "center",
        marginTop: getLayoutSize(20),
    },
    headerContent: {
        color: "#868686",
        alignSelf: "center",
        marginTop: getLayoutSize(20),
        fontSize: getFontSize(13),
        fontFamily: AppFonts.text.font3,
    },
    headerContent2: {
        color: "#868686",
        alignSelf: "center",
        fontSize: getFontSize(13),
        fontFamily: AppFonts.text.font3,
    },
    goalView:{
        height:getLayoutSize(150),
        width:"100%",
        borderWidth:1,
        borderColor:"#868686",
        borderBottomColor:"#868686",
        borderBottomWidth:1,
    },
    goalViewSelected: {
        height: getLayoutSize(150),
        width: "100%",
        borderWidth: 1,
        borderColor: "#00f3b9",
        borderBottomColor: "#00f3b9",
        borderBottomWidth: 1,
    },
    goalHeader: {
        fontFamily: AppFonts.text.font1,
        fontSize: getFontSize(17),
        color: "white",
        alignSelf: "center",
        marginTop: getLayoutSize(30),
    },
    goalHeaderContent: {
        color: "#868686",
        alignSelf: "center",
        marginTop: getLayoutSize(20),
        fontSize: getFontSize(15),
        fontFamily: AppFonts.text.font3,
    },
    goalHeaderContent2: {
        color: "#868686",
        alignSelf: "center",
        fontSize: getFontSize(15),
        fontFamily: AppFonts.text.font3,
    },
    correctActiveImage: {
        width: getLayoutSize(20),
        height: getLayoutSize(20),
        tintColor: "#00f3b9",
        resizeMode: "contain",
        position:"absolute",
        margin:getLayoutSize(10),
    },
    renderView:{
        borderWidth:1,
        borderColor:"#868686",
        top:getLayoutSize(40),
    },
    registerButtonView: {
        marginTop: getLayoutSize(90),
    },
})