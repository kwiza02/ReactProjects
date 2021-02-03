//App

import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './App/Reducers';
const store = createStore(allReducers);

import { MyStack } from './App/Navigator/StackNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

