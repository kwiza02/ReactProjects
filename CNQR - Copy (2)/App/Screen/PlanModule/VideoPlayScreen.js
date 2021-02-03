//VideoPlayScreen

import React, { Component } from 'react';

import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    BackHandler,
    Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import HTML from "react-native-render-html";
import { WebView } from 'react-native-webview';

import { button, AppFonts, PlanHeader,Colors,TextUtils,ScaleUtils, String} from '../../Resources/index';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class VideoPlayScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            video:"",
            id:"",
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
          if (this.props.route.params.video !="undefined"){
              console.log(this.props.route.params.video);
              this.setState({ video: this.props.route.params.video })
              console.log("VIDEOo----->" + this.state.video);
        }
     }

    render(){
        return(
            <View style={styles.mainContainer}>

                <TouchableOpacity
                    style={{ padding: ScaleUtils.MARGIN_TWENTY,}}
                    onPress={() => { this.props.navigation.goBack(); }}
                >

                    <Image source={require("../../Assets/ImageAndIcons/close.png")}
                        style={{ height: ScaleUtils.IMAGE_SIZE_TWENTY, width: ScaleUtils.IMAGE_SIZE_TWENTY, tintColor: Colors.DEFAULT_APP_FONT_COLOR}}
                    />
                </TouchableOpacity>

                {/* <Video source={JSON.stringify(this.props.route.params.video)}
                    style={{ width: '100%', height:350, }}
                    controls={true}
                    fullscreen={true}
                    resizeMode={"contain"}
                />  */}
                {/* <VideoPlayer source={this.props.route.params.video}
                    style={{ width: '100%', height: 500, }} 
                    seekColor={"#00f3b9"}
                    disableFullscreen={true}
                    />  */}
                <WebView
                source={{html:this.state.video}}
                containerStyle={{alignContent:"center"}}
                allowsFullscreenVideo={true}
                style={{marginTop:getLayoutSize(350),backgroundColor:"#000000",marginLeft:getLayoutSize(130)}}>
                </WebView> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
        justifyContent:"center"
    },
});
