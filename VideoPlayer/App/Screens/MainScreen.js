//MainScreen

import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    PermissionsAndroid,
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";
import MusicFiles, { RNAndroidAudioStore } from "react-native-get-music-files";

import { getLayoutSize, getFontSize } from '../Components/Responsive';

async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}

async function savePicture() {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
    }
};

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: "",
            audios:[],
        };
    }

    componentDidMount() {

    }

    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 5,
            assetType: 'Videos',
            include: ['playableDuration','filename','imageSize']
        })
            .then(r => {
                this.setState({ videos: r.edges });
                this.props.navigation.navigate("VideoListScreen", { videos: this.state.videos })
                console.log("VIDEOS--->" + JSON.stringify(this.state.videos));
            })
            .catch((err) => {
                //Error Loading Images
            });
    }

    _musicHandle = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple(
                [
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                ],
                {
                    title: "Permission",
                    message: "Storage access is requiered",
                    buttonPositive: "OK"
                }
            );
            console.log("granted",granted)
            granted && RNAndroidAudioStore.getAll({
                id: true, // get id
                artist: true, // get artist
                duration: true, // get duration
                genre: true, // get genre
                title: true, // get title
                fileName: true, // get file name
                minimumSongDuration: 1000,
                cover: true,
                icon:true,
                path: true, // get track has min duration is 1000 ms (or 1s)
            }).then(f => {
                        this.setState({ audios: f });
                        console.log("AUDIOSSS--->" + JSON.stringify(f));
                        this.props.navigation.navigate("AudioListScreen",{audios:this.state.audios})
                    })
                    .catch(er => alert(JSON.stringify(error)));
           
        } catch (err) {
            console.warn(err);
        }
       
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.buttonContainer} 
                    onPress={() => { this._handleButtonPress(), savePicture() }}>
                    <Text style={styles.buttonText}>GET VIDEO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => { this._musicHandle()}}>
                    <Text style={styles.buttonText}>GET AUDIO</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#000000",
        padding: getLayoutSize(20),
        justifyContent:"center",
    },
    buttonText: {
        fontSize: getFontSize(18),
        color: "#00f3b9",
        alignSelf: "center"
    },
    buttonContainer: {
        height: getLayoutSize(50),
        width: "90%",
        borderRadius: getLayoutSize(30),
        borderColor: "#00f3b9",
        justifyContent: "center",
        borderWidth: 1,
        alignSelf: "center",
        marginTop:getLayoutSize(50),
    },
});