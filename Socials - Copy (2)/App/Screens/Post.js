//Post

import React, { Component } from 'react';

import GridList from 'react-native-grid-list';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    Dimensions,
    TouchableNativeFeedbackBase,
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Post extends Component {

    constructor(props){
        super(props);
        this.state={
            data:[
                { "post": require("../Assets/image_one.png"),},
                { "post": require("../Assets/image_two.jpg"), },
                { "post": require("../Assets/image_three.png"), },
                { "post": require("../Assets/image_four.png"), },
                { "post": require("../Assets/image_five.png"), },
                { "post": require("../Assets/image_six.png"), },
                { "post": require("../Assets/image_seven.png"), },
                { "post": require("../Assets/image_eight.png"), },
                { "post": require("../Assets/image_ten.png"), },
                { "post": require("../Assets/image_one.png"), },
                { "post": require("../Assets/image_two.jpg"), },
                { "post": require("../Assets/image_three.png"), },
                { "post": require("../Assets/image_four.png"), },
                { "post": require("../Assets/image_five.png"), },
                { "post": require("../Assets/image_six.png"), },
                { "post": require("../Assets/image_seven.png"), },
                { "post": require("../Assets/image_eight.png"), },
                { "post": require("../Assets/image_ten.png"), },
            ],
            modalVisible: false,
            userSelected:[],
        };
    }

    clickEventListener = (item) => {
        this.setState({ userSelected: item }, () => {
            this.setModalVisible(true);
        });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        const {modalVisible}=this.state;
        return (
            <View style={styles.container}>

                <GridList
                    data={this.state.data}
                    keyExtractor={item => item}
                    numColumns={3}
                    showSeprator
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { this.clickEventListener(item) }}>

                            <Image source={item.post} style={{ height:'100%',width:'100%' ,borderColor:'black',borderWidth:1}} />

                        </TouchableOpacity>

                    )}
                />

                <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>

                    <View style={{backgroundColor:"#000000aa",flex:1,}}>
                        <TouchableOpacity style={{width:screenWidth,height:screenHeight,position:"absolute"}} onPress={()=>{this.setModalVisible(false);}}></TouchableOpacity>
                    
                        <Image style={styles.image} source={this.state.userSelected.post} />
                    </View>

                </Modal>

            </View>
        );
    }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image:{
        height:400,
        width:400,
        marginBottom:20,
        borderWidth:1,
        borderColor:"#23202a",
        justifyContent:"center",
        marginTop:250,
        alignItems:"center",
        alignSelf:"center",
    },
});