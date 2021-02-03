//AudioScreen

import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { getLayoutSize, getFontSize } from '../../Components/Responsive';
import Sound from 'react-native-sound';
export default class AudioScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async componentDidMount() {

            if (this.sound) {
                this.sound.play(this.playComplete);
                this.setState({ playState: 'playing' });
            } else {
                const filepath = this.props.navigation.state.params.filepath;
                console.log('[Play]', filepath);

                this.sound = new Sound(filepath, '', (error) => {
                    if (error) {
                        console.log('failed to load the sound', error);
                        Alert.alert('Notice', 'audio file error. (Error code : 1)');
                        this.setState({ playState: 'paused' });
                    } else {
                        this.setState({ playState: 'playing', duration: this.sound.getDuration() });
                        this.sound.play(this.playComplete);
                    }
                });
            }
    }

    render() {
        return (
            <View>
                <Text>HIi</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});