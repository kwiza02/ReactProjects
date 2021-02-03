//Settings

import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    Switch,
} from 'react-native';

export default class Settings extends Component {

    constructor(props){
        super(props);
        this.state={
            switchValue:false,
        };
    }

    render() {
        return (
            <View>

                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("ChangePassword")}}>
                    <Text style={{ fontSize: 20, fontWeight: "300",padding:15 }}>Change Password</Text>
                </TouchableOpacity>

                <View style={{ width: "100%", borderWidth: 1 }}></View>

                <View style={{ flexDirection: "row",padding: 15}}>
                    <Text style={{fontWeight:"300",fontSize:20,}}>Video AutoPlay</Text>
                    <Switch
                        style={{marginLeft:170,}}
                        value={this.state.switchValue}
                        onValueChange={(switchValue) => this.setState({ switchValue })} />  
                </View>
             
                <View style={{ width: "100%", borderWidth: 1 }}></View>
             
             </View>
        );
    }

}