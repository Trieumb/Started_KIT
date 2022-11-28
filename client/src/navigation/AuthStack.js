import React from 'react';
import Register from '../screens/register';
import Signin from '../screens/login';

export default AuthStack = (Stack) => {
    return (
        <>
            <Stack.Screen
                name="Login"
                component={Signin}
            />
            <Stack.Screen
                name="Register"
                component={Register}
            />
        </>
    )
}
