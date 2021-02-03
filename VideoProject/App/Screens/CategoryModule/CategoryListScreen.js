//CategoryListScreen

import React , {Component} from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    TouchableOpacity,
    BackHandler,
}from 'react-native';

import { getLayoutSize, getFontSize } from '../../Component/Responsive';
import { Colors, AppFonts } from '../../Resources/index';
import { Constants } from '../../RestAPI/Constants';
import {get,post} from '../../RestAPI/RestAPIHandler';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class CategoryListScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            folderCategory:[],
            indexChecked:"",
        };
    }

    disableBackButton = () => {
        BackHandler.exitApp();
        return false;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

     async componentDidMount(){
        this.setState({ isLoading: true });
        var data = await get(Constants.GET_API);
        console.log("URL " + JSON.stringify(data.result));
        this.setState({ folderCategory: data.result, isLoading: false });
        console.log("DATA--->" + this.state.folderCategory);
    }

    renderItem({item,index}){
        return(
            <TouchableOpacity
                onPress={() => { this.setState({ indexChecked: index}, () => { this.props.navigation.navigate("DisplayScreen",{foldername:item})})}}>
                    {this.state.indexChecked===index ?
                        <View style={styles.selectedFolderNameView}>
                            <Text style={styles.selectedFolderNameText}>{item.foldername}</Text>
                        </View>
                    :
                        <View style={styles.folderNameView}>
                        <Text style={styles.folderNameText}>{item.foldername}</Text>
                        </View>
                    }
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={styles.mainConatiner}>
                <FlatList
                    data={this.state.folderCategory}
                    keyExtractor={(index) => index.toString()}
                    renderItem={this.renderItem.bind(this)}
                /> 
            </View>
        )
    }
}

const styles=StyleSheet.create({
    mainConatiner:{
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR,
        justifyContent: "center",
        padding:getLayoutSize(20),
    },
    folderNameView:{
        flexDirection:"row",
        justifyContent:"center",
        borderWidth:1,
        borderColor:Colors.SEPRATOR_COLOR,
        marginTop:getLayoutSize(30),
        height:getLayoutSize(50),
    },
    selectedFolderNameView: {
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.COLOR_PRIMARY,
        marginTop: getLayoutSize(30),
        height: getLayoutSize(50),
    },
    folderNameText:{
        fontFamily:AppFonts.text.font3,
        fontSize:getFontSize(20),
        color:Colors.TITLE_COLOR,
        alignSelf:"center",
    },
    selectedFolderNameText: {
        fontFamily: AppFonts.text.font3,
        fontSize: getFontSize(20),
        color: Colors.COLOR_PRIMARY,
        alignSelf: "center",
    },
});
