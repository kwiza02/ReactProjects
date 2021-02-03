//Message

import React, { Component } from 'react';

import {
    Text,
    StyleSheet,
    View,
    FlatList,
    Image,
    BackHandler,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert,
    ScrollView,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Message extends Component {

    constructor(props) {
        super(props);
        this.array = [{
            title: null
        },
        ],
            this.state = {
                message: '',
                isOpenPicker: false,
                isOpenPicker2: false,
                isOpenPicker3: false,
                arrayHolder: [],
                textInput_Holder: '',
                name:props.route.params.name,
            };
    }

    disableBackButton = () => {
        this.props.navigation.navigate("Comment");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    clickEventListener = (item) => {
        this.setModalVisible(true);
    }

    setModalVisible(visible) {
        this.setState({ isOpenPicker: visible });
    }

    clickEventListener2 = (item) => {
        this.setModalVisible2(true);
    }

    setModalVisible2(visible) {
        this.setState({ isOpenPicker2: visible });
    }

    clickEventListener3 = (item) => {
        this.setModalVisible3(true);
    }

    setModalVisible3(visible) {
        this.setState({ isOpenPicker3: visible });
    }

    joinData = () => {

        if (this.state.textInput_Holder !== '') {
            this.array.push({ title: this.state.textInput_Holder });
            this.setState({ arrayHolder: [...this.array] })
            this.setState({ textInput_Holder: '' })
        } else {

        }
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
                this.setModalVisible2(false);
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
                this.setModalVisible2(false);
            });
        }
    }


    selectPhotoTapped2(flag) {
        if (flag == 1) {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: false,
                mediaType: "video",
            }).then(image => {
                console.log(image);
                this.setState({
                    avtarSource: image.path,
                });
                this.setModalVisible3(false);
            });
        } else {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: false,
                mediaType: "video",
            }).then(image => {
                console.log(image);
                this.setState({
                    avtarSource: image.path,
                });
                this.setModalVisible3(false);
            });
        }
    }

    getInitialState() {
        return {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }


    render() {
        return (

            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: "row", borderBottomColor: "gray", borderWidth: 1, height: 65, }}>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Comment") }} style={{ marginTop: 18 }}>

                        <Image source={require("../Assets/leftArrow.png")} style={{ height: 30, width: 30, alignSelf: "center", marginLeft: 20 }} />

                    </TouchableOpacity>

                    <Image source={require("../Assets/person.png")} style={{ height: 45, width: 45, alignSelf: "center", marginLeft: 20 }} />

                    <Text style={{ fontWeight: "bold", fontSize: 20, alignSelf: "center", marginLeft: 10, }}>{this.state.name}</Text>

                </View>

                <ScrollView style={{flex:1}}>


                    <View >

                        <FlatList

                            data={this.state.arrayHolder}

                            keyExtractor={(index) => index.toString()}

                            renderItem={({ item }) => <Text style={{ fontSize: 18, alignSelf: "flex-end", borderWidth: 1, margin: 10, borderRadius: 4, padding: 3, fontWeight: "900", backgroundColor: "skyblue" }} > {item.title} </Text>}
                        />
                    </View>


                    <Modal
                        transparent={true}
                        animationType={"feed"}
                        visible={this.state.isOpenPicker}>

                        <View style={styles.popupOverlay}>

                            <TouchableOpacity style={{ width: screenWidth, height: screenHeight, position: 'absolute' }}
                                onPress={() => { this.setModalVisible(false) }} />

                            <View style={styles.popup}>

                                <TouchableOpacity onPress={() => { this.clickEventListener2() }}>
                                    <Text style={{ padding: 15, paddingLeft: 30, fontSize: 18 }}>Picture</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { this.clickEventListener3() }}>
                                    <Text style={{ padding: 15, paddingLeft: 30, fontSize: 18 }}>Video</Text>
                                </TouchableOpacity>

                                <Text style={{ padding: 15, paddingLeft: 30, fontSize: 18 }}>Contact</Text>

                                <TouchableOpacity onPress={() => {this.props.navigation.navigate("Map")}}>
                                <Text style={{ padding: 15, paddingLeft: 30, fontSize: 18 }}>Location</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>

                    <Modal
                        transparent={true}
                        animationType={"feed"}
                        visible={this.state.isOpenPicker2}>

                        <View style={styles.popupOverlay2}>

                            <TouchableOpacity style={{ width: screenWidth, height: screenHeight, position: 'absolute' }}
                                onPress={() => { this.setModalVisible2(false) }} />

                            <View style={styles.popup2}>

                                <TouchableOpacity onPress={() => this.selectPhotoTapped(2)}>

                                    <Image source={require("../Assets/camera.png")} style={{ height: 30, width: 30, alignSelf: "center", marginTop: 10 }} />

                                    <Text style={{ padding: 5, alignSelf: "center" }}>Capture from Camera</Text>

                                </TouchableOpacity>

                                <TouchableOpacity style={{ padding: 30 }} onPress={() => this.selectPhotoTapped(1)}>

                                    <Image source={require("../Assets/gallery.png")} style={{ height: 30, width: 30, alignSelf: "center", marginBottom: 2 }} />

                                    <Text style={{ padding: 5, alignSelf: "center" }}>Choose from gallery</Text>

                                </TouchableOpacity>

                            </View>

                        </View>
                    </Modal>

                    <Modal
                        transparent={true}
                        animationType={"feed"}
                        visible={this.state.isOpenPicker3}>

                        <View style={styles.popupOverlay2}>

                            <TouchableOpacity style={{ width: screenWidth, height: screenHeight, position: 'absolute' }}
                                onPress={() => { this.setModalVisible3(false) }} />

                            <View style={styles.popup2}>

                                <TouchableOpacity onPress={() => this.selectPhotoTapped2(2)}>

                                    <Image source={require("../Assets/camera.png")} style={{ height: 30, width: 30, alignSelf: "center", marginTop: 10 }} />

                                    <Text style={{ padding: 5, alignSelf: "center" }}>Capture from Camera</Text>

                                </TouchableOpacity>

                                <TouchableOpacity style={{ padding: 30 }} onPress={() => this.selectPhotoTapped2(1)}>

                                    <Image source={require("../Assets/gallery.png")} style={{ height: 30, width: 30, alignSelf: "center", marginBottom: 2 }} />

                                    <Text style={{ padding: 5, alignSelf: "center" }}>Choose from gallery</Text>

                                </TouchableOpacity>

                            </View>

                        </View>
                    </Modal>

                </ScrollView>

                <View style={styles.inputStyle}>

                    <TextInput
                        style={{ fontSize: 18, height: 60, alignSelf: "center", width: 200 }}
                        placeholder="Enter your message"
                        onChangeText={(text) => this.setState({ textInput_Holder: text })}
                        value={this.state.textInput_Holder}
                        multiline={true} />

                    <TouchableOpacity onPress={() => this.clickEventListener()} style={{ height: 30, width: 30, marginLeft: 115 }}>

                        <Image source={require("../Assets/attachment.png")} style={{ height: 30, width: 30, }} />

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.joinData(); }}>

                        <Image source={require("../Assets/send.png")} style={{ width: 30, height: 30, marginLeft: 20 }} />


                    </TouchableOpacity>

                </View>

            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        justifyContent: "center",
    },
    inputStyle: {
        width: '100%',
        borderColor: "gray",
        height: 52,
        borderWidth: 0.7,
        padding: 10,
        marginTop: 780,
        flexDirection: "row",
        position: "absolute"
    },
    popup: {
        backgroundColor: 'white',
        marginTop: 569,
        borderRadius: 2,
        justifyContent: "center",
        alignSelf: 'center',
        marginLeft: 250,
        width: 270,
        shadowColor: "gray",
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 20,
        shadowOffset: { height: 3, width: 0 }
    },
    popupOverlay: {
        flex: 1,
    },
    popup2: {
        backgroundColor: 'white',
        borderRadius: 2,
        marginTop: 300,
        justifyContent: "center",
        alignSelf: 'center',
        width: 270,
        shadowColor: "gray",
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 20,
        shadowOffset: { height: 3, width: 0 }
    },
    popupOverlay2: {
        flex: 1,
    },
});
