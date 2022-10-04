import React, {Component, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import Login from './login';
import Home from './home';
import Setting from './setting';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator ();
export default (RootComponent = function () {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouterName="Login"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
