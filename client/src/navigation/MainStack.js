import React, { Component } from 'react';
import Manager from '../screens/ManagerScreen/Manager';
import TabNavigation from './TabNavigation';

export default MainStack  = (Stack) => {
    return (
        <>
            {/* <Stack.Screen
                name="HomePage"
                component={TabNavigation}
            /> */}
               <Stack.Screen
                name="ManagerDrawer"
                component={Manager}
            />
        </>
    )
}