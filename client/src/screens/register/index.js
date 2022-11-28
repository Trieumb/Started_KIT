import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SignUp from './Register'
import SocialLogin from './SocialLogin'

const Register = () => {
    return (
        <View style={styles.container}>
            <SignUp style={styles.signUp} />
            <SocialLogin />
        </View>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    signUp: {
        height: '60%',
        width: '100%',
    }
})