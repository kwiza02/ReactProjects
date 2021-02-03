//CommentScreen

import React, { Component } from 'react';

import {
    Text,
    StyleSheet,
    View,
    FlatList,
    Image,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';

export default class CommentScreen extends Component {

    render() {
        return (

             <ScrollView contentContainerStyle={styles.container}>

                <View style={{ marginTop: 13 }}>

                    <View style={{ flexDirection: "row" }}>
                        <Image source={require("../Assets/image_three.png")} style={{ width: 60, height: 60, borderRadius: 30, borderColor: "black", borderWidth: 0.5, }} />

                        <View >
                            <Text style={{ fontWeight: "bold", marginLeft: 10, marginTop: 10 }}>_satishKaneria</Text>
                            <Text style={{ marginLeft: 10 }}>Nice work.</Text>
                        </View>

                        <Text style={{ marginTop: 10, color: "gray", marginLeft: 85 }}>Oct 31, 09:00:am</Text>

                    </View>

                </View>
                <View style={{ marginTop: 13 }}>

                    <View style={{ flexDirection: "row" }}>
                        <Image source={require("../Assets/image_six.png")} style={{ width: 60, height: 60, borderRadius: 30, borderColor: "black", borderWidth: 0.5, }} />

                        <View >
                            <Text style={{ fontWeight: "bold", marginLeft: 10, marginTop: 10 }}>_ritaKaneria</Text>
                            <Text style={{ marginLeft: 10 }}>Good work.</Text>
                        </View>

                        <Text style={{ marginTop: 10, color: "gray", marginLeft: 105 }}>Nov 12, 16:55:pm</Text>

                    </View>

                </View>
                <View style={{ marginTop: 13 }}>

                    <View style={{ flexDirection: "row" }}>
                        <Image source={require("../Assets/image_eight.png")} style={{ width: 60, height: 60, borderRadius: 30, borderColor: "black", borderWidth: 0.5, }} />

                        <View >
                            <Text style={{ fontWeight: "bold", marginLeft: 10, marginTop: 10 }}>_kwizaKaneria</Text>
                            <Text style={{ marginLeft: 10 }}>Keep it up!!</Text>
                        </View>

                        <Text style={{ marginTop: 10, color: "gray", marginLeft: 85 }}>Aug 23, 10:55:am</Text>

                    </View>

                </View>
                <View style={{ marginTop: 13 }}>

                    <View style={{ flexDirection: "row" }}>
                        <Image source={require("../Assets/image_five.png")} style={{ width: 60, height: 60, borderRadius: 30, borderColor: "black", borderWidth: 0.5, }} />

                        <View >
                            <Text style={{ fontWeight: "bold", marginLeft: 10, marginTop: 10 }}>_harshilKaneria</Text>
                            <Text style={{ marginLeft: 10 }}>Such a great talent.</Text>
                        </View>

                        <Text style={{ marginTop: 10, color: "gray", marginLeft: 62 }}>Sep 19, 14:55:pm</Text>

                    </View>

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
        borderBottomColor: '#000000',
        backgroundColor: "white",
        flex:1,
    },
});
