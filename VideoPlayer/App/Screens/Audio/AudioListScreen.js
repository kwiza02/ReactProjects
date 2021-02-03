//AudioListScreen

import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';

import { getLayoutSize,getFontSize } from '../../Components/Responsive';
import Sound from 'react-native-sound';

export default class AudioListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            audios:this.props.route.params.audios,
            flag:false,
        };
    }

    componentDidMount() {

    }

    async play (item) {
        //console.log('item',item.path)
        this.sound = new Sound(item.path)
        console.log("THIS.SOUND--->" + JSON.stringify(this.sound));
        if (this.sound) {
            this.sound.play();
        } else {
            const filepath = item.path;
            console.log('[Play]', filepath);

            this.sound = new Sound(filepath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    // Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    // this.setState({ playState: 'paused' });
                } else {
                    // this.setState({ playState: 'playing', duration: this.sound.getDuration() });
                    this.sound.play();
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                    {this.state.audios && this.state.audios.map((item, index) =>
                    (
                        <TouchableOpacity style={{ flexDirection: "row", padding: getLayoutSize(20) }}
                            onPress={() => { this.play(item),this.setState({flag:!this.state.flag}) }}>
                            <Image source={require("../../Assets/Icons/mp3.png")} style={styles.audioImage} />
                            <View style={{ marginLeft: getLayoutSize(20), alignSelf: "center" }}>
                                <Text style={{ color: "#ffffff" }}>{item.title}</Text>
                                <Text style={{ color: "#ffffff" }}>{item.duration} seconds</Text>
                            </View>
                        </TouchableOpacity>
                    )
                    )}
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => { this.sound.stop(),this.setState({flag:!this.state.flag}) }}>
                    {this.state.flag !== true ?
                        <Text style={styles.buttonText}>PLAY</Text>
                    :
                        <Text style={styles.buttonText}>PAUSE</Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#000000",
    },
    audioImage: {
        height: getLayoutSize(60),
        width: getLayoutSize(60),
        borderRadius: getLayoutSize(30),
        resizeMode:"contain",
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
       position:"absolute",
       bottom:getFontSize(30),
    },
});