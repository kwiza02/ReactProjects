//Followers

import React, { Component } from 'react';

import {
    Text,
    StyleSheet,
    View,
    FlatList,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';

export default class Followers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            follow: true,
            userSelected: [],
            data: [

                {
                    "name": "Miyah Myles",
                    "emailid": "miyah.myles@gmail.com",
                    "photo": require("../Assets/person.png"),
                    "isFollow": false,
                },
                {
                    "name": "June Cha",
                    "emailid": "june.cha@gmail.com",
                    "photo": require("../Assets/person.png"),
                    "isFollow": false,
                },
                {
                    "name": "Iida Niskanen",
                    "emailid": "iida.niskanen@gmail.com",
                    "photo": require("../Assets/person.png"),
                    "isFollow": false,
                },
                {
                    "name": "Renee Sims",
                    "emailid": "renee.sims@gmail.com",
                    "photo": require("../Assets/person.png"),
                    "isFollow": false,
                },
                {
                    "name": "Jonathan Nuez",
                    "emailid": "jonathan.nuez@gmail.com",
                    "photo": require("../Assets/person.png"),
                    "isFollow": false,
                },
                {
                    "name": "Sasha Ho",
                    "emailid": "sasha.ho@gmail.com",
                    "photo": require("../Assets/person.png"),
                    "isFollow": false,
                },
                {
                    "name": "Abdullah Hadley",
                    "emailid": "abdullah.hadley@gmail.com",
                    "photo": require("../Assets/person.png"),
                    "isFollow": false,
                },
                {
                    "name": "Thomas Stock",
                    "emailid": "thomas.stock@gmail.com",
                    "photo": require("../Assets/person.png"),
                    "isFollow": false,
                },
                {
                    "name": "Veeti Seppanen",
                    "emailid": "veeti.seppanen@gmail.com",
                    "photo": require("../Assets/person.png"),
                    "isFollow": false,
                },
                {
                    "name": "Bonnie Riley",
                    "emailid": "bonnie.riley@gmail.com",
                    "photo": require("../Assets/person.png"),
                    "isFollow": false,
                }
            ]
        };
    }

    updatefollow = (item, index) => {
        var list = this.state.data;
        list[index].isFollow = !item.isFollow
        this.setState({ data: list }, () => {
            console.log("data list --> " + JSON.stringify(list));
        });
    }

    renderItem({ item, index }) {
        return (
            <View style={styles.inputStyle}>
                <Image source={item.photo} style={{ height: 60, width: 60, borderRadius: 30, borderColor: "#20232a", borderWidth: 2,marginTop:-10 }} />

                <View style={{ alignItems: "center", flex: 1 }} >
                    <Text style={{ fontWeight: "bold" }}>{item.name}{"\n"}<Text style={{ fontWeight: "normal" }}>{item.emailid}</Text></Text>
                </View>

                <TouchableHighlight underlayColor='#DFE1E3' onPress={() => { this.updatefollow(item, index) }} >
                    {item.isFollow === true ?
                        <View style={styles.followouter}>
                            <Text style={{ color: 'white', fontSize: 12 }}>Follow</Text>
                        </View>
                        :
                        <View style={styles.unfollowouter}>
                            <Text style={{ color: 'black', fontSize: 12 }}>Unfollow</Text>
                        </View>
                    }
                </TouchableHighlight>

            </View>
        );
    }

    render() {
        return (


            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.container}>

                    <FlatList
                        data={this.state.data}
                        keyExtractor={item => item}
                        renderItem={this.renderItem.bind(this)} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 10,
        backgroundColor: "white",
        justifyContent: "center",
    },
    inputStyle: {
        width: '100%',
        marginBottom: 5,
        height: 75,
        flexDirection: "row",
        padding: 10,
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
