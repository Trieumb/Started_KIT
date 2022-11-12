import React, { Component, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
export default RootComponent = () => {

    const [token, setToken] = useState(null);
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('AccessToken');
            if (token !== null) {
                setToken(token);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getToken();
    }, [])
    const user = useSelector((state) => state.auth.login?.currentUser);
    return (
        <NavigationContainer>
            <StatusBar barStyle='light-content' />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    (user?.accessToken || token) ? MainStack(Stack) : AuthStack(Stack)
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}