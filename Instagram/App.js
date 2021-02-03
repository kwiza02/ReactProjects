import React  from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './App/screens/HomeDrawerNavigator';

const App = () => {
  return (
    <NavigationContainer>
        <DrawerNavigator/>
    </NavigationContainer>


  );
};
//https://github.com/react-navigation/react-navigation/issues/8695

export default App;
