import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SocialLogin from '../register/SocialLogin'
import { StatusBar } from "react-native";
import Login from './Login';
import Colors from '../../config/constants/Colors';

const Signin = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={Colors.primary}/>
        <Login style={styles.login}/>
        <SocialLogin style={styles.loginSocial}/>
    </View>
  )
}

export default Signin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    login: {
      width: '100%',
      height:'70%',
    },
    loginSocial: {
      flex: 1,
    }
})