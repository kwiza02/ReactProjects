//MultipleVideoPlayerScreen

import React, { Component } from 'react';

import {
    View,
    Image,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';

import { button, AppFonts, TrialHeader, } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class MultipleVideoPlayerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[
                {
                    video:require("../../Assets/ImageAndIcons/21.mp4")
                },
                {
                    video: require("../../Assets/ImageAndIcons/21.mp4")
                },
                {
                    video: require("../../Assets/ImageAndIcons/21.mp4")
                },
            ],
        };
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={{ padding: getLayoutSize(20) }}
                    onPress={() => { this.props.navigation.goBack() }}>
                    <Image source={require("../../Assets/ImageAndIcons/close.png")}
                        style={{ height: getLayoutSize(15), width: getLayoutSize(15), tintColor: "#ffffff" }}></Image>
                </TouchableOpacity>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <Video source={item.video}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            style={{ width:screenWidth, height: getLayoutSize(300), marginTop: getLayoutSize(screenHeight / 4) }}
                             />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />
                {/*<Video source={require("../../Assets/ImageAndIcons/video_two.mp4")}
                    style={{ width: '100%', height: getLayoutSize(300), marginTop: getLayoutSize(screenHeight / 4) }}
                    controls={true}
                    fullscreen={false}
                    resizeMode={"contain"}
        />*/}
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
