//AllergiesScreen

import React, { Component, useState, useEffect } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../../RestAPI/Constants';
import ButtonComponent from '../../Component/ButtonComponent';
import { post, get } from '../../RestAPI/RestAPIHandler';
import Utils from '../../Component/Utils';
import { button, AppFonts, TrialHeader,Colors,ScaleUtils,TextUtils ,String} from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';
import { array } from 'js-sha512';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class AllergiesScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            query: '',
            films: [],
            message:[],
            array:[],
            isLoading:false,
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        var data = await get(Constants.GET_ALLERGIESTYPE);
        console.log("URL " + JSON.stringify(data.data));
        this.setState({ films: data.data, isLoading: false });
    }

    async doUpdateOtherInfo() {
        this.setState({ isLoading: true });
        var body = JSON.stringify({
            user_id: await AsyncStorage.getItem("@user_id"),
            gender: await AsyncStorage.getItem("@gender"),
            age: await AsyncStorage.getItem("@age"),
            weight: await AsyncStorage.getItem("@weight"),
            weight_type: await AsyncStorage.getItem("@weightType"),
            goal_id: await AsyncStorage.getItem("@goalId"),
            activity_lavel: await AsyncStorage.getItem("@activityId"),
            nutrition_type: await AsyncStorage.getItem("@nutritionId"),
            allergies: await AsyncStorage.getItem("@allergiesId")
        })
        var data = await post(Constants.UPDATE_OTHER_INFO, body);
        console.log(("Data-->" + JSON.stringify(data)));
        if (data !== null && data.success === "yes" && data.data !== null) {
             this.props.navigation.navigate("PlanScreen");
        } else {
            Alert.alert(data.message)
        }
    }

    disableBackButton = () => {
        this.props.navigation.navigate("NutritionScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    findFilm(query) {
        if (query) {
            const { films } = this.state;
            const regex = new RegExp(`${query.trim()}`, 'i');
            return films.filter(film => film.title.search(regex) >= 0); 
        }else {
            return [];
        }
    }

    joinData = (itemname,itemid) => {
        this.state.message.push({ title: itemname})
        for (let i = 1; i<= this.state.message.length; i++) {
            this.state.array.push(
                this.state.films[i].id
            )
        }
            AsyncStorage.setItem("@allergiesId", JSON.stringify(this.state.array))
        //this.setState({ message: [...this.state.films] })
    }

    removeText(item) {
        this.setState({
            message: this.state.message.filter((_item) => _item.title !== item.title)
        });

    }

    renderItem({ item}) {
        return (
            <View>
                <View style={{flex: 1,justifyContent:"space-between",flexDirection:"row",marginTop:getLayoutSize(10),padding:getLayoutSize(10) }}>
                    <Text style={{ fontWeight: 'bold', color: "white",fontSize:getFontSize(15) }}>
                        {item.title}
                    </Text>
                    <TouchableOpacity onPress={() => { this.setState({ query: null }),this.joinData(item.title)}}> 
                        <Image source={require("../../Assets/ImageAndIcons/add.png")} style={styles.addImage}></Image>
                    </TouchableOpacity>
                 </View>
            </View>
        );
    }

    renderItem2({ item}) {
        return (
            <View style={{ justifyContent: "space-between", flexDirection: "row", flex: 1, alignItems: "center", marginTop: getLayoutSize(10), padding: getLayoutSize(10) }}>
                <Text style={{ fontWeight: 'bold', color: "white" ,alignSelf:"center",fontSize:getFontSize(15)}}>
                    {item.title}
                </Text>
                <TouchableOpacity onPress={() => {this.removeText(item)}}>
                    <Image source={require("../../Assets/ImageAndIcons/remove.png")} style={styles.removeImage}></Image>
                </TouchableOpacity>
            </View>
        );
    }

    renderSeprator() {
        return (
            <View style={{
                borderColor: "#1c1c1c",
                borderWidth: 1,
                marginTop:getLayoutSize(10)
            }}></View>
        );
    }

    render() {
        const { query } = this.state;
        const films = this.findFilm(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <View style={styles.mainContainer}>
                <TrialHeader imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} value={7} screen={"NutritionScreen"} navigation={this.props.navigation}></TrialHeader>
                <View style={styles.container}>
                    <ScrollView style={{flexGrow:1}}>
                        <Text style={styles.header}>{String.sevenStep.ALLERGIES_HEADER}</Text>
                        <Text style={styles.header2}>{String.sevenStep.ALLERGIES_HEADER1}</Text>
                        <Text style={styles.headerContent}>{String.sevenStep.ALLERGIES_CONTENT}</Text>
                        <Text style={styles.headerContent2}>{String.sevenStep.ALLERGIES_CONTENT1}</Text>
                    <View style={{marginTop:getLayoutSize(40),}}>
                            {this.state.isLoading === true ?
                                <ActivityIndicator size="small" color="#0000ff" /> : (
                                    this.state.films.length !== 0 ?
                        <Autocomplete
                                autoCapitalize="none"
                                autoCorrect={false}
                                backgroundColor={"#000000"}
                                color={"#ffffff"}
                                containerStyle={styles.autocompleteContainer}
                                data={films.length === 1 && comp(query, films[0].title) ? [] : films}
                                defaultValue={query}
                                onChangeText={text => this.setState({ query: text })}
                                placeholder="Search..."
                                placeholderTextColor={"#868686"}
                                renderItem={this.renderItem.bind(this)}
                                listStyle={styles.mainContainer}
                        />
                                        : <Text>No Records</Text>
                                )}
                    </View>
                        <FlatList
                            style={{ marginTop: 40, flex: 1 }}
                            data={this.state.message}
                            keyExtractor={(item) => item}
                            renderItem={this.renderItem2.bind(this)}
                            ItemSeparatorComponent={this.renderSeprator}
                        />
                    </ScrollView>
                    <View style={styles.registerButtonView}>
                        <TouchableOpacity style={button.ButtonLoginContainer} onPress={() => { this.doUpdateOtherInfo() }}>
                            <ButtonComponent text={"NEXT STEP"} />
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
    container: {
        flex: 1,
        padding: ScaleUtils.SEVEN_STEP_SCREEN_PADDING,
    },
    header: {
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.SEVEN_STEP_TITLE,
        color: Colors.DEFAULT_APP_FONT_COLOR,
        alignSelf: "center",
        marginTop: ScaleUtils.MARGIN_TWENTY,
    },
    header2: {
        fontFamily: AppFonts.text.font2,
        fontSize: TextUtils.SEVEN_STEP_TITLE,
        color: Colors.DEFAULT_APP_FONT_COLOR,
        alignSelf: "center",
    },
    headerContent: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        alignSelf: "center",
        marginTop: ScaleUtils.MARGIN_TWENTY,
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
    },
    headerContent2: {
        color: Colors.DEFAULT_CONTENT_COLOR,
        alignSelf: "center",
        fontSize: TextUtils.BUTTON_TEXT,
        fontFamily: AppFonts.text.font3,
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1,
    },
    addImage:{
        height: ScaleUtils.IMAGE_SIZE_TWENTY,
        width: ScaleUtils.IMAGE_SIZE_TWENTY,
        tintColor:Colors.DEFAULT_APP_FONT_COLOR,
    },
    removeImage: {
        height: ScaleUtils.IMAGE_SIZE_TWENTY,
        width: ScaleUtils.IMAGE_SIZE_TWENTY,
        tintColor: Colors.DEFAULT_APP_FONT_COLOR,
        alignSelf:"center"
    },
    registerButtonView: {
        bottom:ScaleUtils.SEVEN_STEP_BUTTON_BOTTOM,
    },
})