//DoctorListScreen

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
    Modal,
    Alert,
    PermissionsAndroid,
} from "react-native";

import {
    launchCamera,
    launchImageLibrary} from 'react-native-image-picker';

import { getLayoutSize, getFontSize } from '../Component/Responsive';
import { AppFonts } from '../Resources/index';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs camera permission',
                },
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    } else return true;
};

const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'External Storage Write Permission',
                    message: 'App needs write permission',
                },
            );
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            alert('Write permission err', err);
        }
        return false;
    } else return true;
};

console.disableYellowBox = true;

export default class DoctorListScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            isOpenPicker:false,
            name:"",
            detail:"",
            avtarSource:"",
            indexChecked:"",
            info:[]
            
        };
    }

    componentDidMount(){

    }

    captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
           launchCamera(
                {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                },
                (response) => {
                    this.setState({avtarSource:response});
                },
            )
        }
    };

    addItems(){
        if(this.state.info == [])
        this.setState({
            info:[]
        })
        this.state.info.push({name:this.state.name,detail:this.state.detail,avtarSource:this.state.avtarSource})
        this.setState({info:this.state.info})
    }

    deleteAddress(item) {
        console.log('item',item)
        Alert.alert(
            'Delete Address',
            'Are you sure want to delete this address ?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.removeText(item) },
            ],
            { cancelable: true }
        )
    }

    removeText(item) {
        console.log('item>>>',item)
        let info = this.state.info
        for (let i in this.state.info)
            {if(i == item)
           info.splice(item,1);
            }

            this.setState({
                info
            })
            console.log('this.state',this.state)
    }

    renderItem({item,index}){
        return(
            <View>
                <TouchableOpacity onPress={() => { this.setState({ indexChecked: index }) }}
                    style={{ flexDirection: "row", padding: getLayoutSize(20), backgroundColor: this.state.indexChecked === index ? "#fff8dc" :null }}>
                        <Image
                            source={item.avtarSource}
                            style={item.avtarSource ? styles.uploadAvatar : null}
                        />
                        <View style={{ alignSelf: "center", marginLeft: getLayoutSize(10) }}>
                            <Text style={{ fontSize: getFontSize(20), fontFamily: AppFonts.text.font3 }}>{item.name}</Text>
                            <Text style={{ fontSize: getFontSize(15), fontFamily: AppFonts.text.font4, color: "#818181" }}>{item.detail}</Text>
                        </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderSeprator() {
        return (
            <View style={{
                borderColor: "#a9a9a9",
                borderWidth: 1,
                marginTop: getLayoutSize(5)
            }}></View>
        );
    }

    render(){
        return(
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                    <Image source={require("../Assets/Icons/back_with_arrow.png")}
                        style={{ height: getLayoutSize(23), width: getLayoutSize(23), tintColor: "#000000", marginLeft: getLayoutSize(20), marginTop: getLayoutSize(20) }} />
                </TouchableOpacity>
                <FlatList
                    data={this.state.info}
                    extraData={this.state}
                    keyExtractor={(index) => index.toString()}
                    renderItem={this.renderItem.bind(this)}
                    ItemSeparatorComponent={this.renderSeprator}/>
                
                <View style={{flexDirection:"row",position:"absolute",bottom:getLayoutSize(30),justifyContent:"space-between"}}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.setState({isOpenPicker:true})}}>
                        <Text style={styles.textStyle}>ADD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.deleteAddress(this.state.indexChecked),console.log("INDEX---->"+this.state.indexChecked);}}>
                        <Text style={styles.textStyle}>DELETE</Text>
                    </TouchableOpacity>
                    <Modal
                    transparent={true}
                    visible={this.state.isOpenPicker}
                    animationType={"fade"}>
                        <View style={styles.popupOverlay}>
                            <TouchableOpacity style={{ width: screenWidth, height: screenHeight, position: 'absolute' }}
                                onPress={() => { this.setState({isOpenPicker:false}) }} />
                                <View style={styles.popup}>
                                    {/* {<TouchableOpacity onPress={this.captureImage()}>
                                        <Image source={require("../Assets/Icons/Bitmap_3.png")} style={styles.uploadAvatar} />
                                    </TouchableOpacity>}  */}
                                    <Image
                                        source={this.state.avtarSource}
                                        style={styles.uploadAvatar}
                                    />
                                    <View style={{marginTop:getLayoutSize(-15),marginLeft:getLayoutSize(30)}}>
                                        <TouchableOpacity onPress={() => this.captureImage()}>
                                            <Image source={require("../Assets/Icons/outline_photo_camera_black_36pt.png")} style={{ height: getLayoutSize(30), width: getLayoutSize(30), alignSelf: "center"}} />
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChangeText={(value) => this.setState({ name: value })}
                                    />
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder="Detail"
                                        value={this.state.detail}
                                        onChangeText={(value) => this.setState({ detail: value })}
                                    />
                                <View style={{flexDirection:"row",marginTop:getLayoutSize(30),marginBottom:getLayoutSize(30)}}>
                                    <TouchableOpacity style={styles.buttonStyle} onPress={() => { this.setState({ isOpenPicker: false }), this.addItems()}}>
                                        <Text style={styles.textStyle}>DONE</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.setState({name:null,detail:null,avtarSource:null})}}>
                                        <Text style={styles.textStyle}>CLEAR</Text>
                                    </TouchableOpacity>
                                </View>
                                </View>
                        </View>
                    </Modal>
                   
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    buttonStyle:{
        height:getLayoutSize(50),
        width:"45%",
        backgroundColor:"cornflowerblue",
        borderRadius:getLayoutSize(25),
        justifyContent:"center",
        marginHorizontal: getLayoutSize(10),
    },
    textStyle:{
        color:"#ffffff",
        fontSize:getFontSize(15),
        fontFamily:AppFonts.text.font1,
        alignSelf:"center",
    },
    popupOverlay: {
        backgroundColor: "#00000057",
        flex: 1,
        padding:getLayoutSize(20)
    },
    popup: {
        backgroundColor: 'white',
        marginTop:getLayoutSize(250),
        borderRadius: 7,
        justifyContent: "center",
        height:getLayoutSize(350),
        padding:getLayoutSize(20)
    },
    uploadAvatar: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: "#23202a",
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 40,
    },
    inputStyle: {
        width: '100%',
        fontSize: 15,
        borderBottomWidth:1,
        borderColor:"#a9a9a9",
        marginBottom: 2,
    },
});