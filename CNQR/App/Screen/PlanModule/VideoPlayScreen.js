//VideoPlayScreen

import React, { Component } from 'react';

import {
    View,
    Image,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

import { button, AppFonts, TrialHeader, } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class VideoPlayScreen extends Component{

    constructor(props){
        super(props);
        this.state={
        };
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <TouchableOpacity style={{padding:getLayoutSize(20)}}
                onPress={()=>{this.props.navigation.goBack()}}>
                    <Image source={require("../../Assets/ImageAndIcons/close.png")} 
                    style={{height:getLayoutSize(15),width:getLayoutSize(15),tintColor:"#ffffff"}}></Image>
                </TouchableOpacity>
               <Video source={require("../../Assets/ImageAndIcons/video_two.mp4")}
                    style={{ width: '100%', height: getLayoutSize(300), marginTop: getLayoutSize(screenHeight / 4) }}
                    controls={true}
                    fullscreen={false}
                    resizeMode={"contain"}
                />
                {/* <VideoPlayer source={require("../../Assets/ImageAndIcons/video_two.mp4")}
                    style={{ width: '100%', height: 500, }} 
                    seekColor={"#00f3b9"}
                    disableFullscreen={true}
                    />*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "black",
        flex: 1,
    },
});
