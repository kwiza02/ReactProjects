//MainScreen

import React, { Component } from "react";

import { 
    Text, 
    View, 
    Image, 
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions,
} from "react-native";

import {getLayoutSize,getFontSize} from '../Component/Responsive';
import {AppFonts} from '../Resources/index';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const numColumns=2;

export default class MainScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            medicineName:"",
            medicineList:[
                {
                    image:require("../Assets/Icons/pill.png"),
                    name:"Ibubrefen",
                    info:"for Fever",
                    price:"$ 4.09",
                },
                {
                    image: require("../Assets/Icons/pills.png"),
                    name: "Absdrf",
                    info: "for Corona",
                    price: "$ 4.09",
                },
                {
                    image: require("../Assets/Icons/capsules.png"),
                    name: "Bitmil",
                    info: "for Head-ache",
                    price: "$ 4.38",
                },
                {
                    image: require("../Assets/Icons/medicine.png"),
                    name: "Corona",
                    info: "for Fever",
                    price: "$ 7.09",
                },
                {
                    image: require("../Assets/Icons/pills.png"),
                    name: "Ibubrefen",
                    info: "for Colera",
                    price: "$ 4.09",
                },
                {
                    image: require("../Assets/Icons/pill.png"),
                    name: "Tetrahydro",
                    info: "for Fever",
                    price: "$ 4.09",
                },
            ],
        };
    }

    componentDidMount(){

    }

    renderItem({item}){
        return(
            <View style={{ marginTop: getLayoutSize(30) }}>
                <TouchableOpacity style={{ height: getLayoutSize(270),width:screenWidth/2 - getLayoutSize(50), backgroundColor: "#dcdcdc" ,borderRadius:getLayoutSize(30),marginHorizontal:getLayoutSize(15)}}
                    onPress={() => { this.props.navigation.navigate("DetailScreen",{name:item.name,info:item.info,price:item.price,image:item.image})}}>
                    <Image source={item.image} style={{ height: getLayoutSize(90), width: getLayoutSize(90), marginTop: getLayoutSize(30), alignSelf: "center" }}></Image>
                    <View style={{ marginTop: getLayoutSize(40) ,marginLeft:getLayoutSize(20)}}>
                        <Text style={{ fontSize: getFontSize(20), fontFamily:AppFonts.text.font1}}>{item.name}</Text>
                        <Text style={{ fontSize: getFontSize(20), color: "#868686" }}>{item.info}</Text>
                        <Text style={{ fontSize: getFontSize(20), fontFamily: AppFonts.text.font3 }}>{item.price}</Text>
                    </View>
                </TouchableOpacity>
           </View>
        )
    }

    render(){
        return(
           <ScrollView>
                <View style={{ padding: getLayoutSize(20), flex: 1 }}>
                    <View style={{ flexDirection: "row", marginTop: getLayoutSize(30) }}>
                        <Image source={require("../Assets/Icons/telegram.png")} style={{ height: getLayoutSize(20), width: getLayoutSize(20), tintColor: "#818181" }}></Image>
                        <Text style={{ fontSize: getFontSize(18), color: "#818181", marginLeft: getLayoutSize(5), fontFamily: AppFonts.text.font3 }}>London</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: getLayoutSize(20),justifyContent:"space-between" }}>
                        <Text style={{ fontSize: getFontSize(33) }}>Hi, <Text style={{ fontFamily:AppFonts.text.font1 }}>Samanta!</Text></Text>
                        <Image source={require("../Assets/Icons/Bitmap_3.png")} style={{ height: getLayoutSize(50), width: getLayoutSize(50), borderRadius: getLayoutSize(25), }}></Image>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: getLayoutSize(30), height: getLayoutSize(40), backgroundColor: "#dcdcdc", borderRadius: getLayoutSize(10) }}>
                        <Image source={require("../Assets/Icons/search.png")}
                            style={{ height: getLayoutSize(20), width: getLayoutSize(20), tintColor: "#868686", marginLeft: getLayoutSize(15), marginTop: getLayoutSize(10) }} />
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={text => this.setState({ medicineName: text })}
                            value={this.state.medicineName}
                            underlineColorAndroid="transparent"
                            placeholder="Search For Medicine">
                        </TextInput>
                    </View>

                    <ImageBackground source={require("../Assets/Icons/doctor.png")}
                        style={{ height: getLayoutSize(270), width:"100%", borderRadius: getLayoutSize(20), marginTop: getLayoutSize(40), opacity: 0.6, justifyContent: "center" }}>
                        <Text style={{ fontSize: getLayoutSize(25),marginLeft: getLayoutSize(30),fontFamily:AppFonts.text.font1 }}>We will deliver {"\n"} you medicines</Text>
                        <TouchableOpacity style={{ height: getLayoutSize(40), width: "30%", borderRadius: getLayoutSize(30), backgroundColor: "#0000ff", marginTop: getLayoutSize(20), marginLeft: getLayoutSize(30), justifyContent: "center" }}>
                            <Text style={{ color: "#ffffff", alignSelf: "center", fontFamily:AppFonts.text.font1}}>Ordering</Text>
                        </TouchableOpacity>
                    </ImageBackground>

                    <View style={{ flexDirection: "row", marginTop: getLayoutSize(30) ,justifyContent:"space-between"}}>
                        <Text style={{ fontSize: getFontSize(30),fontFamily:AppFonts.text.font4 }}>Popular</Text>
                        <Image source={require("../Assets/Icons/Bitmap_3.png")} style={{ height: getLayoutSize(25), width: getLayoutSize(25),marginTop:getLayoutSize(5) }}></Image>
                    </View>

                    <FlatList
                    style={{flex:0,width:screenWidth}}
                        data={this.state.medicineList}
                        keyExtractor={item => item}
                        renderItem={this.renderItem.bind(this)}
                        numColumns={2}
                         />

                </View>
           </ScrollView>
        );
    }
}

const styles=StyleSheet.create({
    textInputStyle:{
        fontSize: getFontSize(15),
        height: getLayoutSize(40),
        marginLeft: getLayoutSize(15),
    },
})