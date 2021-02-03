//ModalProgress

import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Dimensions,
    Modal,
    ActivityIndicator,
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class ModelProgress extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.isVisible}>

                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Loading</Text>
                        <View style={styles.loading}>
                            <View style={styles.loader}>
                                <ActivityIndicator size="large" color="white" />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 55,
        backgroundColor: '#000000'
    },
    title: {
        fontSize: 18,
        color: "white",
        fontWeight: 'bold',
    },
    loading: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loader: {
        flex: 1,
        alignSelf: "center"
    },
});
