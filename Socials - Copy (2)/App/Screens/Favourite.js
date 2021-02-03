//Favourite

import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Favourite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "name": "Miyah Myles",
                    "date": "Jun 11, 06:44 PM",
                    "profile": require("../Assets/person.png"),
                    "post": require("../Assets/city.png"),
                    "postName": "city",
                    "postInfo": "Delhi the capital of India.Known for heritages.One of India's largest city.",
                    "postTag": "#City",
                    "postCommentInfo": "Well defined!!!",
                    "postLike": require("../Assets/like.png"),
                    "likeCount": "0 Likes",
                    "postComment": require("../Assets/commentGray.png"),
                    "commentCount": "0 Comments",
                    "others": require("../Assets/more.png"),
                },
                {
                    "name": "Miyah Myles",
                    "date": "Jun 11, 06:44 PM",
                    "profile": require("../Assets/person.png"),
                    "post": require("../Assets/city.png"),
                    "postName": "city",
                    "postInfo": "Delhi the capital of India.Known for heritages.One of India's largest city.",
                    "postTag": "#City",
                    "postCommentInfo": "Well defined!!!",
                    "postLike": require("../Assets/like.png"),
                    "likeCount": "0 Likes",
                    "postComment": require("../Assets/commentGray.png"),
                    "commentCount": "0 Comments",
                    "others": require("../Assets/more.png"),
                },
                {
                    "name": "Miyah Myles",
                    "date": "Jun 11, 06:44 PM",
                    "profile": require("../Assets/person.png"),
                    "post": require("../Assets/city.png"),
                    "postName": "city",
                    "postInfo": "Delhi the capital of India.Known for heritages.One of India's largest city.",
                    "postTag": "#City",
                    "postCommentInfo": "Well defined!!!",
                    "postLike": require("../Assets/like.png"),
                    "likeCount": "0 Likes",
                    "postComment": require("../Assets/commentGray.png"),
                    "commentCount": "0 Comments",
                    "others": require("../Assets/more.png"),
                },
                {
                    "name": "Miyah Myles",
                    "date": "Jun 11, 06:44 PM",
                    "profile": require("../Assets/person.png"),
                    "post": require("../Assets/city.png"),
                    "postName": "city",
                    "postInfo": "Delhi the capital of India.Known for heritages.One of India's largest city.",
                    "postTag": "#City",
                    "postCommentInfo": "Well defined!!!",
                    "postLike": require("../Assets/like.png"),
                    "likeCount": "0 Likes",
                    "postComment": require("../Assets/commentGray.png"),
                    "commentCount": "0 Comments",
                    "others": require("../Assets/more.png"),

                },
                {
                    "name": "Miyah Myles",
                    "date": "Jun 11, 06:44 PM",
                    "profile": require("../Assets/person.png"),
                    "post": require("../Assets/city.png"),
                    "postName": "city",
                    "postInfo": "Delhi the capital of India.Known for heritages.One of India's largest city.",
                    "postTag": "#City",
                    "postCommentInfo": "Well defined!!!",
                    "postLike": require("../Assets/like.png"),
                    "likeCount": "0 Likes",
                    "postComment": require("../Assets/commentGray.png"),
                    "commentCount": "0 Comments",
                    "others": require("../Assets/more.png"),

                },
                {
                    "name": "Miyah Myles",
                    "date": "Jun 11, 06:44 PM",
                    "profile": require("../Assets/person.png"),
                    "post": require("../Assets/city.png"),
                    "postName": "city",
                    "postInfo": "Delhi the capital of India.Known for heritages.One of India's largest city.",
                    "postTag": "#City",
                    "postCommentInfo": "Well defined!!!",
                    "postLike": require("../Assets/like.png"),
                    "likeCount": "0 Likes",
                    "postComment": require("../Assets/commentGray.png"),
                    "commentCount": "0 Comments",
                    "others": require("../Assets/more.png"),

                },
                {
                    "name": "Miyah Myles",
                    "date": "Jun 11, 06:44 PM",
                    "profile": require("../Assets/person.png"),
                    "post": require("../Assets/city.png"),
                    "postName": "city",
                    "postInfo": "Delhi the capital of India.Known for heritages.One of India's largest city.",
                    "postTag": "#City",
                    "postCommentInfo": "Well defined!!!",
                    "postLike": require("../Assets/like.png"),
                    "likeCount": "0 Likes",
                    "postComment": require("../Assets/commentGray.png"),
                    "commentCount": "0 Comments",
                    "others": require("../Assets/more.png"),

                },
                {
                    "name": "Miyah Myles",
                    "date": "Jun 11, 06:44 PM",
                    "profile": require("../Assets/person.png"),
                    "post": require("../Assets/city.png"),
                    "postName": "city",
                    "postInfo": "Delhi the capital of India.Known for heritages.One of India's largest city.",
                    "postTag": "#City",
                    "postCommentInfo": "Well defined!!!",
                    "postLike": require("../Assets/like.png"),
                    "likeCount": "0 Likes",
                    "postComment": require("../Assets/commentGray.png"),
                    "commentCount": "0 Comments",
                    "others": require("../Assets/more.png"),

                },
                {
                    "name": "Miyah Myles",
                    "date": "Jun 11, 06:44 PM",
                    "profile": require("../Assets/person.png"),
                    "post": require("../Assets/city.png"),
                    "postName": "city",
                    "postInfo": "Delhi the capital of India.Known for heritages.One of India's largest city.",
                    "postTag": "#City",
                    "postCommentInfo": "Well defined!!!",
                    "postLike": require("../Assets/like.png"),
                    "likeCount": "0 Likes",
                    "postComment": require("../Assets/commentGray.png"),
                    "commentCount": "0 Comments",
                    "others": require("../Assets/more.png"),

                },
                {
                    "name": "Miyah Myles",
                    "date": "Jun 11, 06:44 PM",
                    "profile": require("../Assets/person.png"),
                    "post": require("../Assets/city.png"),
                    "postName": "city",
                    "postInfo": "Delhi the capital of India.Known for heritages.One of India's largest city.",
                    "postTag": "#City",
                    "postCommentInfo": "Well defined!!!",
                    "postLike": require("../Assets/like.png"),
                    "likeCount": "0 Likes",
                    "postComment": require("../Assets/commentGray.png"),
                    "commentCount": "0 Comments",
                    "others": require("../Assets/more.png"),

                },
                {
                    "name": "Miyah Myles",
                    "date": "Jun 11, 06:44 PM",
                    "profile": require("../Assets/person.png"),
                    "post": require("../Assets/city.png"),
                    "postName": "city",
                    "postInfo": "Delhi the capital of India.Known for heritages.One of India's largest city.",
                    "postTag": "#City",
                    "postCommentInfo": "Well defined!!!",
                    "postLike": require("../Assets/like.png"),
                    "likeCount": "0 Likes",
                    "postComment": require("../Assets/commentGray.png"),
                    "commentCount": "0 Comments",
                    "others": require("../Assets/more.png"),

                },
                {
                    "name": "Miyah Myles",
                    "date": "Jun 11, 06:44 PM",
                    "profile": require("../Assets/person.png"),
                    "post": require("../Assets/city.png"),
                    "postName": "city",
                    "postInfo": "Delhi the capital of India.Known for heritages.One of India's largest city.",
                    "postTag": "#City",
                    "postCommentInfo": "Well defined!!!",
                    "postLike": require("../Assets/like.png"),
                    "likeCount": "0 Likes",
                    "postComment": require("../Assets/commentGray.png"),
                    "commentCount": "0 Comments",
                    "others": require("../Assets/more.png"),

                },
            ]
        };
    }

    renderItem({ item }) {
        return (
            <View style={{ flex: 1 }}>

                <View style={styles.inputStyle}>

                    <Image source={item.profile} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />

                    <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: "space-between", flex: 1 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }} >{item.name}</Text>
                        <Text style={{ fontSize: 15 }}>{item.date}</Text>
                    </View>

                </View>

                <Image source={item.post} style={{ height: 300, width: "100%" }} />

                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.postName}</Text>
                    <Text style={{ fontSize: 15, }}>{item.postInfo}</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.postTag}</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.postCommentInfo}</Text>
                </View>

                <View style={{ borderColor: "gray", borderWidth: 0.5, marginTop: 3 }}></View>

                <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center", }} >
                    <View style={{ flexDirection: "row", marginLeft: 20, alignItems: "center" }}>
                        <Image source={item.postLike} style={{ height: 30, width: 30 }} />
                        <Text style={{ fontSize: 18, color: "gray", marginLeft: 5 }}>{item.likeCount}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 30, justifyContent: "center" }}>
                        <Image source={item.postComment} style={{ height: 28, width: 28, marginRight: 14, alignSelf: "center" }} />
                        <Text style={{ fontSize: 18, color: "gray", alignSelf: "center" }}>{item.commentCount}</Text>
                    </View>
                    <Image source={item.others} style={{ height: 30, width: 30, marginLeft: 60 }} />
                </View>

                <View style={{ borderColor: "gray", borderWidth: 0.5, marginTop: 10, marginBottom: 15 }}></View>

            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item}
                    renderItem={this.renderItem.bind(this)} />

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
    },
    inputStyle: {
        width: '100%',
        height: 75,
        flexDirection: "row",
        padding: 10,
    },
});