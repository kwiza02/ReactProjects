//SelectedScreen

import React, { Component } from 'react';

import {
    Image,
    ImageBackground,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    FlatList,
} from 'react-native';

export default class SelectedScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: ({ focused }) => (
            <View
                style={{
                    width: 80,
                    borderRadius: 30,
                    padding: 10,
                    backgroundColor: focused ? Colors.primary2Color : Colors.snow,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text
                    style={{
                        color: focused ? Colors.snow : Colors.decs,
                        fontSize: 12
                    }}
                >
                    {navigation.state.routeName}
                </Text>
            </View>
        )
    });
    constructor(props) {
        super(props);
        this.state = {
            screen: ''
        };
    }
    screenIs = payload => {
        this.setState({ screen: payload.state.routeName })
    }

    render() {
        const { navigation } = this.props;
        return (
            <View
                style={styles.container}
            >
                <NavigationEvents
                    onWillFocus={this.screenIs}
                />
                <Text>{this.state.screen}</Text>
            </View>
        );
    }
}