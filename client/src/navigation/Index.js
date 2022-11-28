import React, { Component, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import UserManagerStack from './UserManagerStack';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();
export default RootComponent = () => {

    const [token, setToken] = useState(null);
    const userToken = useSelector((state) => state.users.user?.userToken);
    const isLogin = useSelector( (state) => state.auth.login?.isLogin);
    useEffect (() => {
        setToken(userToken?._j);
    },[token]);
    return (
        <NavigationContainer>
            <StatusBar barStyle='light-content' />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    (isLogin || token) ? MainStack(Stack) : AuthStack(Stack)
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}