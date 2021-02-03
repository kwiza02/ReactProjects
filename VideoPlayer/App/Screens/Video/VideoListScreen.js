//VideoListScreen

import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';

import { getLayoutSize, getFontSize } from '../../Components/Responsive';

export default class VideoListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos:this.props.route.params.videos,
        };
    }

    componentDidMount() {
        console.log("VIDEOSS-->"+this.state.videos);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {this.state.videos && this.state.videos.map((item,index) => 
                (
                    <TouchableOpacity style={{flexDirection:"row",padding:getLayoutSize(20)}}
                        onPress={()=>{this.props.navigation.navigate("VideoScreen",{id:index,videos:this.state.videos}),console.log("ID-->"+index);}}>
                        <Image source={{ uri: item.node.image.uri}} style={styles.videoImage}/>
                        <View style={{marginLeft:getLayoutSize(20),alignSelf:"center"}}>
                            <Text style={{color:"#ffffff"}}>{item.node.image.filename}</Text>
                            <Text style={{ color: "#ffffff" }}>{item.node.image.playableDuration} seconds</Text>
                        </View>
                    </TouchableOpacity>
                )
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"#000000",
    },
    videoImage:{
        height:getLayoutSize(60),
        width: getLayoutSize(60),
        borderRadius: getLayoutSize(30),
    },
});