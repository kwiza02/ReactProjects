//VideoPlayerScreen

import React ,{Component} from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
}from 'react-native';

import Video from 'react-native-video';

import { getLayoutSize, getFontSize } from '../../Component/Responsive';
import { Colors, AppFonts } from '../../Resources/index';
import { Constants } from '../../RestAPI/Constants';
import { get, post } from '../../RestAPI/RestAPIHandler';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class VideoPlayerScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            videoLink:this.props.route.params.videoLink,
            id:this.props.route.params.id,
            foldername:this.props.route.params.foldername
        };
    }

    componentDidMount(){
        console.log("ID--->"+this.state.id);
        console.log("LINK--->" + JSON.stringify(this.state.videoLink));
        console.log("FOLDERNAME--->" + this.state.foldername);
    }

    render(){
        return(
            <View style={styles.mainConatiner}>
                <Video source={{ uri: 'https://storage.googleapis.com/snackvideolite/'+this.state.foldername+"/"+this.state.videoLink['link']}}
                    style={{ width: '100%', height: getLayoutSize(screenHeight / 2), }}
                    seekColor={"#10fec3"}
                    disableBackButton={true}
                    fullscreen={true}
                    tapAnywhereToPause={true}
                    resizeMode={"cover"}
                    controls={true}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    mainConatiner: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR,
        justifyContent: "center",
        padding: getLayoutSize(20),
    },
});