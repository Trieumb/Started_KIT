import React, { Component, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Users from '../screens/managerScreen/users/Users';
import AddUser from '../screens/managerScreen/users/AddUser';

const Stack = createNativeStackNavigator();
export default UserManagerStack= () => {

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='User' component={Users}/>
                <Stack.Screen name='AddUser' component={AddUser}/>
            </Stack.Navigator>
        </>
    )
};