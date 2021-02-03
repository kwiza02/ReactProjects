//DisplayScreen

import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    TouchableOpacity,
    Alert,
    BackHandler,
} from 'react-native';

import { getLayoutSize, getFontSize } from '../../Component/Responsive';
import { Colors, AppFonts } from '../../Resources/index';
import { Constants } from '../../RestAPI/Constants';
import { get, post } from '../../RestAPI/RestAPIHandler';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class DisplayScreen extends Component {
    
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            foldername:this.props.route.params.foldername,
            videos:[],
        };
    }

    disableBackButton = () => {
       this.props.navigation.navigate("CategoryListScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

     async componentDidMount(){
        this.setState({
            videos:this.state.foldername.video
        })
        console.log("VIDEOS---->" + JSON.stringify(this.state.videos));
    }

    renderItem = (item,index) => {
        return(
            <TouchableOpacity style={{flexDirection:"row",margin:getLayoutSize(2)}}
                onPress={() => { this.props.navigation.navigate("VideoPlayerScreen",{id:index,videoLink:item,foldername:this.state.foldername.foldername})}}>
                <Image source={{ uri:'https://storage.googleapis.com/snackvideolite/' +this.state.foldername.foldername + "/"+ item['thumb']}} 
                    style={styles.imageStyle} />
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={styles.mainConatiner}>
                <FlatList
                    data={this.state.videos}
                    keyExtractor={item => item}
                    renderItem={({item,index}) => this.renderItem(item,index)}
                    numColumns={3}
                    horizontal={false}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    mainConatiner: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR,
        justifyContent: "center",
    },
    imageStyle:{
        height:getLayoutSize(150),
        width:getLayoutSize(screenWidth/3),
        resizeMode:"cover",
        position:"relative"
    },
});