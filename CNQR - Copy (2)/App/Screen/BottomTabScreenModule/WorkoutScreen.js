//WorkoutScreen

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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyPlanScreen from '../WorkoutModule/MyPlanScreen';
import WorkoutsScreen from '../WorkoutModule/WorkoutsScreen';
import ProgressScreen from '../WorkoutModule/ProgressScreen';

import { button, AppFonts,Colors, TrialHeader, PlanHeader } from '../../Resources/index';
import { getLayoutSize, getFontSize } from '../../Component/Responsive';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const Tab = createMaterialTopTabNavigator();

export default class WorkoutScreen extends Component {

    render() {
        return (
            <View style={styles.mainContainer}>
                <PlanHeader title={require("../../Assets/ImageAndIcons/logo.png")}
                    isBack={true}
                    screen={"DiscoverScreen"}
                    navigation={this.props.navigation} />
                <Tab.Navigator tabBarOptions={{
                    activeTintColor: Colors.DEFAULT_APP_FONT_COLOR,
                    scrollEnabled: false,
                    inactiveTintColor: "#818181",
                    labelStyle: {
                        fontSize: getFontSize(12.5),
                        fontWeight: "bold",
                        fontFamily:AppFonts.text.font4,
                    },
                    indicatorStyle: {
                        backgroundColor: Colors.COLOR_PRIMARY,
                        position: "relative",
                        opacity:0.6,
                    },
                    style: {
                        borderTopWidth:0.2,
                        borderTopColor: "#282c30",
                        backgroundColor: "black",
                    }
                }}>
                    <Tab.Screen name="MyPlanScreen" component={MyPlanScreen} options={{title:"MY PLAN"}} />
                    <Tab.Screen name="WorkoutsScreen" component={WorkoutsScreen} options={{ title: "WORKOUTS" }}/>
                    <Tab.Screen name="ProgressScreen" component={ProgressScreen} options={{ title: "PROGRESS" }}/>
                </Tab.Navigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
    },
});