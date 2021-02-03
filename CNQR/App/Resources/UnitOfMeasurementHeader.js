//UnitOfMeasurementHeader

import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';

import { getFontSize, getLayoutSize } from '../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewstyle}>
                    <TouchableOpacity style={styles.image} onPress={() => { this.props.navigation.navigate(this.props.screen) }}>
                        <Image source={this.props.imgSrc} style={styles.image} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ color: "#cbc7c5", fontSize: 11, alignSelf: "center" }}>{this.props.value}/2</Text>
                        <Slider
                            maximumValue={2}
                            minimumValue={0}
                            step={1}
                            minimumTrackTintColor="#00f3b9"
                            maximumTrackTintColor="#cbc7c5"
                            value={this.props.value}
                            style={{ width: 200 }}
                            onValueChange={(sliderValue) => this.setState({ sliderValue })}
                            thumbTintColor={"transparent"}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: getLayoutSize(60),
        justifyContent: "center",
        width: "100%",
    },
    viewstyle: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
    },
    image: {
        height: getLayoutSize(25),
        width: getLayoutSize(25),
        tintColor: "white",
        alignItems: "flex-end",
        position: 'absolute',
        left: getLayoutSize(10),
    },
});