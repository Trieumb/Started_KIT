import React, { Component, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import AuthStack from '../navigation/AuthStack';
import MainStack from '../navigation/MainStack';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
export default RootComponent = () => {

    const user = useSelector((state) => state.auth.login?.currentUser);
    return (
        <NavigationContainer>
            <StatusBar barStyle='light-content' />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    ( user?.accessToken) ? MainStack(Stack) : AuthStack(Stack)
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}