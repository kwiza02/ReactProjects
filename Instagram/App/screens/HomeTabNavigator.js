import React, { Component } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Text,
View,
TouchableOpacity,
Image,
BackHandler,
} from 'react-native';

import Follow from '../screens/Follow';
import Unfollow from '../screens/Unfollow';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View>
       <View >
        <Image style={{height:80,width:80,borderRadius:40,alignSelf:"center",marginBottom:10,marginTop:10}} source={require("../Assest/image_ten.png")}/>
        <Text style={{alignSelf:"center",marginBottom:10,fontSize:18,color:"black",fontWeight:"bold"}}>Narendra Modi</Text>
    </View>
      <View style={{ flexDirection: 'row',backgroundColor:"gainsboro",height:50,justifyContent:"space-evenly",alignItems:"center" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <Text style={{alignSelf:"center", color: isFocused ? '#673ab7' : '#222',padding:10,borderBottomWidth: isFocused? 3 : 0,borderColor:"blue"}}>
                {label}
              </Text>
              
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
 }

const Tab = createMaterialTopTabNavigator();

export default class HomeTabNavigator extends Component {

  disableBackButton=()=>{
    this.props.navigation.navigate("HomeScreen");
    return true;
  }

  UNSAFE_componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress',this.disableBackButton);
  }

  UNSAFE_componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress',this.disableBackButton);
  }
  render(){
  return (

      <Tab.Navigator tabBar={props => <MyTabBar {...props} />} tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
          tabStyle: { height: 50 },
          indicatorStyle: {backgroundColor:'red',height:3,width:100},
      }}>
        <Tab.Screen name="Follow" component={Follow}/>
        <Tab.Screen name="Unfollow" component={Unfollow} />
          
      </Tab.Navigator>
    );
}
}