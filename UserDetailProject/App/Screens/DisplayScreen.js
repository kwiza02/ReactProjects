//DisplayScreen

import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import { getFontSize, getLayoutSize } from '../Component/Responsive';
import { Colors, AppFonts } from '../Resources/index';
import Input from "../Component/Input";
import { post, get } from '../RestAPI/RestAPIHandler';
import Utils from '../Component/Utils';
import { Constants } from '../RestAPI/Constants';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class DisplayScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading:false,
            data:[],
            hobbies:[],
        };
    }

     async componentDidMount() { 
         this.setState({ isLoading: true });
         var data = await get(Constants.GET_API);
         console.log("URL " + JSON.stringify(data));
        this.setState({ data: data, isLoading: false });
     }

     renderItem({item,index}){
         return(
             <View style={{ marginTop: getLayoutSize(30)}} >
                 <Text style={{color:Colors.TITLE_COLOR}}>fName:  {item.fName}</Text>
                 <Text style={{ color: Colors.COLOR_PRIMARY }}>mName:  {item.mName}</Text>
                 <Text style={{ color: Colors.TITLE_COLOR }}>lName:  {item.lName}</Text>
                 <Text style={{ color: Colors.COLOR_PRIMARY }}>email:  {item.email}</Text>
                 <Text style={{ color: Colors.TITLE_COLOR }}>password:  {item.password}</Text>
                 <Text style={{ color: Colors.COLOR_PRIMARY }}>country:  {item.country}</Text>
                 <Text style={{ color: Colors.TITLE_COLOR }}>state:  {item.state}</Text>
                 <Text style={{ color: Colors.COLOR_PRIMARY }}>city:  {item.city}</Text>
                 <Text style={{ color: Colors.TITLE_COLOR }}>gender:  {item.gender}</Text>
                 <Text style={{ color: Colors.COLOR_PRIMARY }}>pincode:  {item.pincode}</Text>
                 <Text style={{ color: Colors.TITLE_COLOR }}>address:  {item.address}</Text>
                 <Text style={{ color: Colors.COLOR_PRIMARY }}>birthDate:  {item.birthdate}</Text>
                 <Text style={{ color: Colors.TITLE_COLOR }}>phoneNumber:  {item.phoneNumber}</Text>
             </View>
         )
     }

     renderSeprator(){
         return(
             <View style={{
                 borderBottomWidth:1,
                 borderColor:Colors.SEPRATOR_COLOR,
             }}>

             </View>
         )
     }

    render() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(index) => index.toString()}
                    renderItem={this.renderItem.bind(this)}
                    ItemSeparatorComponent={this.renderSeprator}>

                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.BACKGROUND_COLOR,
        padding: getLayoutSize(20)
    },
});