//Comment

import React, { Component } from 'react';

import {
    Text,
    StyleSheet,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    BackHandler,
} from 'react-native';

import Header from '../Components/Header';

import AsyncStorage from '@react-native-community/async-storage';

export default class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flatlistState: 'setting',
            userSelected: [],
            data: [

                {
                    "name": "Miyah Myles",
                    "photo": require("../Assets/person.png"),
                    "time": "1 hour ago",
                    "place": "Rajkot,Gujrat",
                },
                {
                    "name": "June Cha",
                    "photo": require("../Assets/person.png"),
                    "time": "9 minutes ago",
                    "place": "Jamnagar,Gujrat",
                },
                {
                    "name": "Iida Niskanen",
                    "photo": require("../Assets/person.png"),
                    "time": "9 minutes ago",
                    "place": "Rajkot,Gujrat",
                },
                {
                    "name": "Renee Sims",
                    "photo": require("../Assets/person.png"),
                    "time": "5 minutes ago",
                    "place": "Mumbai,Gujrat",
                },
                {
                    "name": "Jonathan Nuez",
                    "photo": require("../Assets/person.png"),
                    "time": "9 minutes ago",
                    "place": "Rajkot,Gujrat",
                },
                {
                    "name": "Sasha Ho",
                    "photo": require("../Assets/person.png"),
                    "time": "6 minutes ago",
                    "place": "Ahemdabad,Gujrat",
                },
                {
                    "name": "Abdullah Hadley",
                    "photo": require("../Assets/person.png"),
                    "time": "9 minutes ago",
                    "place": "Rajkot,Gujrat",
                },
                {
                    "name": "Thomas Stock",
                    "photo": require("../Assets/person.png"),
                    "time": "10 minutes ago",
                    "place": "Baroda,Gujrat",
                },
                {
                    "name": "Veeti Seppanen",
                    "photo": require("../Assets/person.png"),
                    "time": "9 minutes ago",
                    "place": "Surat,Gujrat",
                },
                {
                    "name": "Bonnie Riley",
                    "photo": require("../Assets/person.png"),
                    "time": "2 minutes ago",
                    "place": "Nashik,Gujrat",
                }
            ]
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

    _storeName = async () => {
        try {
            alert(this.state.flatlistState);
            // await AsyncStorage.setItem(
            //   'flatListState',
            //   JSON.stringify(this.state.userName),
            // );
        } catch (error) { }
    };
    _retrieveData = async () => {
        try {
            // const value = await AsyncStorage.getItem('TaskData');
            // if (value !== null) {
            //   const value1 = JSON.parse(value);
            //   this.setState({
            //     TaskData: value1,
            //   });
            // }
        } catch (error) { }
    };
    message = async () => {
        try {
            const flatListState = 'Message';
            await AsyncStorage.setItem('flatListState', flatListState);
            this.props.navigation.navigate('People');
        } catch (error) { }
    };
    setting = async () => {
        try {
            const flatListState = 'setting';
            await AsyncStorage.setItem('flatListState', flatListState);
            this.props.navigation.navigate('People');
        } catch (error) { }
    };

    renderItem({ item, index }) {
        return (
            <View>

                <TouchableOpacity onPress={() => { this.props.navigation.navigate("Message",{name:item.name}) }}>

                    <View style={{ marginTop: 10, flexDirection: "row", marginLeft: 20, marginBottom: 10 }}>


                        <Image source={item.photo} style={{ height: 60, width: 60, borderRadius: 30, borderColor: "#20232a", borderWidth: 2 }} />

                        <View style={{ flexDirection: "row", alignSelf: "center", flex: 1, justifyContent: "space-around" }}>

                            <View style={{ flexDirection: "column", marginTop: 10 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 15, marginLeft: 5, }}>{item.name}{"\n"}<Text style={{ fontWeight: "normal" }}>{item.emailid}</Text></Text>
                                <Text style={{ marginTop: -10, marginLeft: 5, color: "black", }}>{item.place}</Text>
                            </View>

                            <Text style={{ alignSelf: "center", marginLeft: 70, color: "gray", }}>{item.time}</Text>

                        </View>

                    </View>

                </TouchableOpacity>

            </View>
        );
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: "100%",
                    backgroundColor: "gray",
                }}
            />
        );
    }


    render() {
        return (

            <View style={{ flex: 1 }}>


                <View style={{ flexDirection: "row", borderBottomColor: "gray", borderWidth: 1, padding: 15 }}>

                    <Text style={{ fontWeight: "bold", fontSize: 20, alignSelf: "center", marginLeft: 3, marginRight: 250 }}>Message</Text>

                    <TouchableOpacity onPress={() => { this.message(); }}>
                        <Image source={require("../Assets/follow.png")} style={{ height: 35, width: 35, marginLeft: 1 }} />
                    </TouchableOpacity>

                </View>

                <FlatList
                    data={this.state.data}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    keyExtractor={item => item}
                    renderItem={this.renderItem.bind(this)} />

            </View>


        );
    }

}

const styles = StyleSheet.create({
    container: {

        display: "flex",
        flexDirection: "column",
        padding: 10,
        borderBottomColor: '#000000',
        backgroundColor: "white",
        justifyContent: "center",
    },
    inputStyle: {
        width: '100%',
        marginBottom: 10,
        borderColor: "#20232a",
        height: 70,
        borderWidth: 1,
        flexDirection: "row",
        padding: 10,
        marginTop: 10
    },
    followouter: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 25,
        borderRadius: 4,
        marginTop: 10,
        backgroundColor: 'dodgerblue'
    },
    unfollowouter: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 25,
        borderRadius: 4,
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#999296',
    },
});
