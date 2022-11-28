import React, { Component } from 'react';
import TabNavigation from './TabNavigation';

export default MainStack  = (Stack) => {
    return (
        <>
            <Stack.Screen
                name="HomePage"
                component={TabNavigation}
            />
        </>
    )
}