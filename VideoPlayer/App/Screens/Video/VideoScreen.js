//VideoScreen

import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import Video from 'react-native-video';

import { getLayoutSize, getFontSize } from '../../Components/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class VideoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: JSON.stringify(this.props.route.params.videos),
            id:this.props.route.params.id,
        };
    }

    componentWillMount() {
                let vids=[];
                vids = JSON.parse(this.state.videos);
                let mg =[]
                let i = 0
                for (i in vids)
                {
                    console.log("this.video[i].node.image.uri", vids[i].node.image.uri,i);
                    mg.push(vids[i].node.image.uri)
                }
                this.setState({
                    videos:mg
                })
    }

    videoFunction = () => {
        return (
            <View>
                <Video source={{ uri: this.state.videos[this.state.id]}}
                    style={{ width: '100%', height: getLayoutSize(screenHeight/2), }}
                    seekColor={"#00f3b9"}
                    disableBackButton={true}
                    fullscreen={true}
                    tapAnywhereToPause={true}
                    resizeMode={"cover"}
                    controls={true}
                    onEnd={()=>this.setState({id:this.state.id+1})}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {this.videoFunction()}
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => { this.setState({ id: this.state.id -1 }, () => { this.videoFunction() }) }}>
                    <Text style={styles.buttonText}>BACK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => {this.setState({id:this.state.id+1},()=>{this.videoFunction()})}}>
                    <Text style={styles.buttonText}>NEXT</Text>
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
        justifyContent: "center",
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
        marginTop: getLayoutSize(50),
    },
});