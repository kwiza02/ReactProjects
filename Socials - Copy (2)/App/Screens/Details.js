//Details

import React, { Component } from 'react';

import {
    Text,
    View,
    BackHandler,
    TouchableOpacity,
    Image,
    Alert,
    StyleSheet,
    ScrollView,
    TextInput
} from 'react-native';

import RBSheet from "react-native-raw-bottom-sheet";

export default class Details extends Component{

    constructor(props){
        super(props);
        this.state={
            onMouseTapLike:false,
            onMouseTapHeart: false,
            onMouseTapFlag: false,
            textInput_Holder:'',
            counterLike:"0",
            counterHeart:"0",
            onMouseTapStar:false,
            defaultRating:0,
            maxRating:5,
            name:props.route.params.name,
            star: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png',
            starFilled: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png',
        };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("Home");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    UpdateRating(key) {
        this.setState({ defaultRating: key });
    }

    updateFlag(flag) {
        if (!this.state.onMouseTapFlag) {
            Alert.alert(
                '',
                'Post flaged successfully.',
                [
                    { text: 'OK', onPress: () => this.setState({ onMouseTapFlag: true }) },
                ],
                { cancelable: true }
            )
        }
        else {
            Alert.alert(
                '',
                'You have already flag this post.',
                [
                    { text: 'OK', onPress: () => this.setState({ onMouseTapFlag: true }) },
                ],
                { onMouseTap: true }
            )
        }
    }

    updateLike(flag) {
        if (!this.state.onMouseTapLike) {
            this.setState({ onMouseTapLike:true})
            this.state.counterLike++;
        }
        else {
            this.setState({ onMouseTapLike:false})
            this.state.counterLike--;
        }
    }


    updateHeart(flag){
        if (!this.state.onMouseTapHeart) {
            Alert.alert(
                '',
                'Post successfully added to your favourite.',
                [
                    { text: 'OK', onPress: () => this.setState({ onMouseTapHeart: true }) },
                ],
                { cancelable: true }
            )
            this.state.counterHeart++;
        }
        else {
            this.setState({onMouseTapHeart:false})
            this.state.counterHeart--;
        }
    }

    render(){

        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.maxRating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.defaultRating
                                ? { uri:(this.state.star) }
                                : { uri: (this.state.starFilled) }
                        }
                    />
                </TouchableOpacity>
            );
        }

        return(
            <View style={{flex:1}}>
                <View style={{ flexDirection: "row", borderBottomColor: "gray", borderWidth: 1, height: 65, }}>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Home") }} style={{ marginTop: 18 }}>

                        <Image source={require("../Assets/leftArrow.png")} style={{ height: 25, width: 25, alignSelf: "center", marginLeft: 15 }} />

                    </TouchableOpacity>

                    <Image source={require("../Assets/person.png")} style={{ height: 40, width: 40, alignSelf: "center", marginLeft: 15 }} />

                    <Text style={{  fontSize: 18, alignSelf: "center", marginLeft: 10, }}>{this.state.name}</Text>

                    <TouchableOpacity onPress={() => { this.state.onMouseTapFlag == true ? this.updateFlag(true) : this.updateFlag(false);}} style={{marginTop:20}}>

                        <Image source={require("../Assets/flag.png")} style={{ height: 25, width: 25, alignSelf: "center", marginLeft: 90, tintColor: this.state.onMouseTapFlag === true ? "red" : "black" }} />
                    
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => { this.RBSheet.open();}} style={{marginTop:15}}>
                        <Image source={require("../Assets/dot.png")} style={{ height: 30, width: 30, alignSelf: "center", marginLeft: 15 }} />
                    </TouchableOpacity>

                </View>

                <ScrollView>
                    
                    <Image source={require("../Assets/nature_two.png")} style={{height:255,width:"100%",}}/>

                    <View style={{flexDirection:"row",marginTop:10,alignItems:"center"}}>

                        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                        
                        <TouchableOpacity onPress={()=>{this.updateLike()}}>
                            <Image source={require("../Assets/like_black.png")} style={{ height: 32, width: 32, marginLeft: 145, tintColor: this.state.onMouseTapLike===true ? "blue" : "black" }} />
                        </TouchableOpacity>
                       
                         <Text style={{marginLeft:5,color:"black"}}>{this.state.counterLike}</Text>

                        <TouchableOpacity onPress={()=>{this.updateHeart()}}>
                            <Image source={require("../Assets/heart.png")} style={{ height: 34, width: 34, marginLeft: 10, tintColor: this.state.onMouseTapHeart===true ? "red":"black" }} />
                        </TouchableOpacity>
                        
                        <Text style={{marginLeft:5,color:"black"}}>{this.state.counterHeart}</Text>

                    </View>

                    <View style={{marginLeft:12}}>
                        <Text style={{fontWeight:"bold",fontSize:16,marginTop:15}}>This picture is beautiful.</Text>
                        <Text style={{padding:2}}>This picture is drawn by me.</Text>
                        <Text style={{ padding: 2,fontWeight:"bold" }}>#sell</Text>
                        <Text style={{ padding: 2, fontWeight: "bold",marginTop:9,fontSize:17 }}>Likes</Text>

                        <View style={{flexDirection:"row",marginTop:7,}}>
                            <Image source={require("../Assets/image_two.jpg")} style={{ width: 60, height: 60, borderRadius: 30, borderColor: "black", borderWidth: 0.5,}} />
                            <Image source={require("../Assets/image_four.png")} style={{ width: 60, height: 60, borderRadius: 30, borderColor: "black", borderWidth: 0.5, marginLeft: 12 }} />
                            <Image source={require("../Assets/image_eight.png")} style={{ width: 60, height: 60, borderRadius: 30, borderColor: "black", borderWidth: 0.5, marginLeft: 12 }} />

                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("LikeScreen")}}>
                                <View style={{ width: 60, height: 60, borderRadius: 30, borderColor: "black", borderWidth: 0.5, marginLeft: 12,}} >
                                    <Image source={require("../Assets/more.png")} style={{ width: 40, height: 40, alignSelf: "center" ,marginTop:10 }} />
                                </View>
                            </TouchableOpacity>
                        
                        </View>

                        <Text style={{ padding: 2, fontWeight: "bold", marginTop: 25, fontSize: 17 }}>Comments</Text>

                        <View style={{marginTop:13}}>
                            
                            <View style={{flexDirection:"row"}}>
                                <Image source={require("../Assets/image_three.png")} style={{ width: 60, height: 60, borderRadius: 30, borderColor: "black", borderWidth: 0.5, }}/>
                                
                                <View >
                                    <Text style={{fontWeight:"bold",marginLeft:10,marginTop:10}}>_satishKaneria</Text>
                                    <Text style={{marginLeft:10}}>Nice work.</Text>
                                </View>

                                <Text style={{ marginTop: 10, color: "gray", marginLeft: 85 }}>Oct 31, 09:00:am</Text>
                            
                            </View>
                        
                        </View>
                        <View style={{ marginTop: 13 }}>

                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../Assets/image_six.png")} style={{ width: 60, height: 60, borderRadius: 30, borderColor: "black", borderWidth: 0.5, }} />

                                <View >
                                    <Text style={{ fontWeight: "bold", marginLeft: 10, marginTop: 10 }}>_ritaKaneria</Text>
                                    <Text style={{ marginLeft: 10 }}>Good work.</Text>
                                </View>

                                <Text style={{ marginTop: 10, color: "gray", marginLeft: 105 }}>Nov 12, 16:55:pm</Text>

                            </View>

                        </View>
                        <View style={{ marginTop: 13 }}>

                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../Assets/image_eight.png")} style={{ width: 60, height: 60, borderRadius: 30, borderColor: "black", borderWidth: 0.5, }} />

                                <View >
                                    <Text style={{ fontWeight: "bold", marginLeft: 10, marginTop: 10 }}>_kwizaKaneria</Text>
                                    <Text style={{ marginLeft: 10 }}>Keep it up!!</Text>
                                </View>

                                <Text style={{ marginTop: 10, color: "gray", marginLeft: 85 }}>Aug 23, 10:55:am</Text>

                            </View>

                        </View>
                        <View style={{ marginTop: 13 }}>

                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../Assets/image_five.png")} style={{ width: 60, height: 60, borderRadius: 30, borderColor: "black", borderWidth: 0.5, }} />

                                <View >
                                    <Text style={{ fontWeight: "bold", marginLeft: 10, marginTop: 10 }}>_harshilKaneria</Text>
                                    <Text style={{ marginLeft: 10 }}>Such a great talent.</Text>
                                </View>

                                <Text style={{marginTop:10,color:"gray",marginLeft:62}}>Sep 19, 14:55:pm</Text>

                            </View>

                        </View>
                    </View>

                </ScrollView>

                <View style={{ width: "100%", height: 40, borderWidth: 0.5, marginTop: 20, paddingLeft: 10, }}>

                    <View style={{flexDirection:"row"}}>
                    <TextInput
                        style={{ fontSize: 15, height: 40, width: "60%" }}
                        placeholder="Add your comment"
                        value={this.state.textInput_Holder}
                        onChangeText={(text) => this.setState({ textInput_Holder: text })}
                    />
                    
                    <Image source={require("../Assets/send.png")} style={{ height: 25, width: 25,alignSelf:"center",marginLeft:110 }} />
                    </View>
                </View>

                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={220}
                    duration={250}
                >
                    <View>
                        <View style={{ width: "100%", height: 50, borderWidth: 0.5, paddingLeft: 10, justifyContent: "center", }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center", }}>Share</Text>
                        </View>
                        <View style={{ width: "100%", height: 50, borderWidth: 0.5, paddingLeft: 10, justifyContent: "center", }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center", }}>Rating</Text>
                        </View>
                        <View style={{ width: "100%", height: 50, borderWidth: 0.5, paddingLeft: 10, justifyContent: "center", }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center", }}>Abusel</Text>
                        </View>

                        <View style={{width:"100%",borderWidth:5,amrgin:0}}></View>

                        <TouchableOpacity onPress={() => { this.RBSheet.close();}}>
                            <View style={{ width: "100%", height: 50, borderWidth: 0.5, paddingLeft: 10, justifyContent: "center", }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center", }} >Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </RBSheet>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        padding:5,
    },
   
    StarImage: {
        width: 25,
        height: 25,
        resizeMode: 'cover',
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 23,
        color: '#000',
        marginTop: 15,
    },
    textStyleSmall: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        marginTop: 15,
    },
});

   