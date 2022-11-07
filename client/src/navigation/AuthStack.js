import React from 'react';
import Register from '../screens/Register';
import Login from '../screens/Login';

export default AuthStack = (Stack) => {
    return (
        <>
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Register"
                component={Register}
            />
        </>
    )
}
