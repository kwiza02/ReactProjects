//VideoFull

import React, { Component } from 'react';

import VideoPlayer from 'react-native-video-controls';

import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

export default class VideoFull extends Component{

    constructor(props){
        super(props);
        this.state={
            itemVideo:props.route.params.video,
            itemPost:props.route.params.post,
            flag:props.route.params.flag,
            name:props.route.params.name,
        };
    }

    render(){
        return(
            <View style={{flex:1}}>

                <View style={{ flexDirection: "row", borderBottomColor: "gray", borderWidth: 1, height: 65, }}>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Home") }} style={{ marginTop: 18 }}>

                        <Image source={require("../Assets/leftArrow.png")} style={{ height: 30, width: 30, alignSelf: "center", marginLeft:20 }} />

                    </TouchableOpacity>

                <Text style={{ fontWeight: "bold", fontSize: 20, alignSelf: "center", marginLeft:100, }}>{this.state.name}</Text>

                </View>

                {this.state.flag=='' ?
                <VideoPlayer source={JSON.stringify(this.state.itemVideo)}
                    style={{ width: '100%', height: 270, }}
                    disableBack={true}
                    tapAnywhereToPause={true}>
                </VideoPlayer>
                :
                <View style={{alignItems:"center",marginTop:200}}>
                <Image source={JSON.stringify(this.state.itemPost)} style={{width:500,height:300,alignSelf:"center"}}></Image>
                </View>
        }
            </View>
        );
    }
}

