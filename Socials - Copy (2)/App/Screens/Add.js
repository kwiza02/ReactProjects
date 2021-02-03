//Add

import React, { Component } from 'react';

import {
    Text,
    Button,
    View,
    TouchableOpacity,
    Dimensions,
    BackHandler,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default class Add extends Component {

    constructor(props) {
        super(props);
            this.state = {
                message: '',
                isOpenPicker: false,
                arrayHolder: [],
                isCamera: true,
                isGallery:false,
            };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("Home");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    componentDidMount(){
        this.selectPhotoTapped(2);
    }


    selectPhotoTapped(flag) {
        if (flag == 1) {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {
                console.log(image);
                this.setState({
                    avtarSource: image.path,
                });
                this.setModalVisible(false);
            });
        } else {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                console.log(image);
                this.setState({
                    avtarSource: image.path,
                });
                this.setModalVisible(false);
            });
        }
    }


    render() {
        return (
            <View>

            </View>
        );
    }

}