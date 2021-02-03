//MultipleVideoScreen

import React, { Component } from 'react';

import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    BackHandler,
    Dimensions,
    FlatList,
    ScrollView,
    ImageBackground,
    Alert,
} from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import HTML from "react-native-render-html";
import { WebView } from 'react-native-webview';

import { button, AppFonts, PlanHeader, Colors, TextUtils, ScaleUtils, String } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class MultipleVideoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            video: [],
            id: "",
            position: this.props.route.params.id,
            // plans: [
            //     {
            //         image: require('../../Assets/ImageAndIcons/bouncingBall.png')
            //     },
            //     {
            //         image: require('../../Assets/ImageAndIcons/bouncingBall.png')
            //     },
            //     {
            //         image: require('../../Assets/ImageAndIcons/bouncingBall.png')
            //     },
            //     {
            //         image: require('../../Assets/ImageAndIcons/bouncingBall.png')
            //     },
            //     {
            //         image: require('../../Assets/ImageAndIcons/bouncingBall.png')
            //     },
            //     {
            //         image: require('../../Assets/ImageAndIcons/bouncingBall.png')
            //     },
            // ],
            indexChecked:0,
        };
    }

    disableBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    componentDidMount() {
        if (this.props.route.params.video != "undefined" && this.props.route.params.id != "undefined" ) {
            console.log(this.props.route.params.video);
            console.log(this.props.route.params.id);
        }
    }

    videoFunction(){

        return(
           <View>
                {/* <VideoPlayer source={this.props.route.params.video[this.state.position]} */}
                <VideoPlayer source={{ uri: this.props.route.params.video[this.state.position] }}
                    style={{ width: '100%', height: 350, }}
                    seekColor={"#00f3b9"}
                    disableBackButton={true}
                    fullscreen={true}
                    tapAnywhereToPause={true}
                    resizeMode={"contain"}
                />
           </View>
        )
    }

    renderItem = ({ item, index }) => {
        return (

            this.state.indexChecked === index ?
            <TouchableOpacity
            style={{ borderColor: "#00f3b9", borderWidth: this.state.indexChecked === index ? 2 : 0 ,borderRadius:10,padding:getLayoutSize(10)}}>
                    <ImageBackground source={require('../../Assets/ImageAndIcons/bouncingBall.png')} style={styles.renderImageBackground} imageStyle={styles.renderImageStyle}>

                    <ImageBackground source={require('../../Assets/ImageAndIcons/Rectangle.png')} style={styles.renderShadow} imageStyle={styles.renderImageStyle} >
                        <Image source={require('../../Assets/ImageAndIcons/play.png')} style={styles.renderImagePlay}></Image>
                        <TouchableOpacity>
                        </TouchableOpacity>
                    </ImageBackground>
                </ImageBackground>
                <Text style={{color:"white"}}>{index}</Text>
            </TouchableOpacity>
            :
                <TouchableOpacity 
                onPress={() => { this.setState({indexChecked : index,
                    position:index
                });
                        Alert.alert(JSON.stringify(this.props.route.params.video[index]));
                        this.videoFunction()
            }}
                style={{ borderColor: "#00f3b9", borderWidth: this.state.indexChecked === index ? 2 : 0, borderRadius: 10, padding: getLayoutSize(10) }}>
                    <ImageBackground source={require('../../Assets/ImageAndIcons/bouncingBall.png')} style={styles.renderImageBackground} imageStyle={styles.renderImageStyle}>

                        <ImageBackground source={require('../../Assets/ImageAndIcons/Rectangle.png')} style={styles.renderShadow} imageStyle={styles.renderImageStyle} >
                            <Image source={require('../../Assets/ImageAndIcons/play.png')} style={styles.renderImagePlay}></Image>
                            <TouchableOpacity>

                            </TouchableOpacity>
                        </ImageBackground>
                    </ImageBackground>
                </TouchableOpacity>

        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>

                <TouchableOpacity
                    style={{ padding: ScaleUtils.MARGIN_TWENTY, }}
                    onPress={() => { this.props.navigation.goBack(); }}
                >

                    <Image source={require("../../Assets/ImageAndIcons/close.png")}
                        style={{ height: ScaleUtils.IMAGE_SIZE_TWENTY, width: ScaleUtils.IMAGE_SIZE_TWENTY, tintColor: Colors.DEFAULT_APP_FONT_COLOR }}
                    />
                </TouchableOpacity>

                <ScrollView>
                     {this.videoFunction()} 
                    {/* <Video source={{ uri: this.props.route.params.video[this.state.position] }}
                        style={{ width: '100%', height: 350, }}
                        controls={true}
                        fullscreen={true}
                        resizeMode={"contain"}
                    /> */}
                    {/* <VideoPlayer source={this.props.route.params.video}
                    style={{ width: '100%', height: 500, }} 
                    seekColor={"#00f3b9"}
                    disableFullscreen={true}
                    />  */}
                    {/* <WebView
                    source={{ html: this.state.video }}
                    containerStyle={{ alignContent: "center" }}
                    allowsFullscreenVideo={true}
                    style={{ marginTop: getLayoutSize(350), backgroundColor: "#000000", marginLeft: getLayoutSize(130) }}>
                </WebView> */}

        <View style={{padding:getLayoutSize(10),marginTop:getLayoutSize(100)}}>
                        <FlatList
                            data={this.props.route.params.video}
                            keyExtractor={item => item}
                            horizontal={true}
                            renderItem={this.renderItem.bind(this)}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
    },
    item: {
        height: '100%',
        width: 40,
        overflow: 'hidden',
    },
    video: { flex: 1 },
    renderShadow: {
        width: ScaleUtils.IMAGE_WIDTH,
        height: screenHeight,
    },
    renderImageBackground: {
        height: getLayoutSize(200),
        width: getLayoutSize(150),
        justifyContent: "center",
    },
    renderImageStyle: {
        resizeMode: "cover",
        borderColor: "transparent",
        borderRadius: 10,
        opacity: 0.8
    },
    renderImagePlay: {
        height: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        width: ScaleUtils.IMAGE_SIZE_TWENTYFIVE,
        tintColor: Colors.DEFAULT_SUB_CONTENT_COLOR,
        resizeMode: "cover",        
        marginTop: getLayoutSize(150)
    },
});
