import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import Colors from '../../config/constants/Colors';
import { API_URL } from '../../config/api/Axios';
import { WINDOW_WITH } from '../../config/constants/Constants';
import axios from 'axios';

const SocialLogin = () => {

    const loginGoogleHandle = async () => {
        try {
            const response = await axios.get(API_URL + '/auth/google');
            if (response.status === 200) {
                navigation.navigate('Home');
            }
        } catch (error) {
            alert(error)
        }
    };
    const loginFacebookHandle = async () => {
        try {
          const response = await axios.get('http://192.168.1.9:5000/auth/facebook');
          if (response.status === 200) {
            navigation.navigate('Home');
          }
        } catch (error) {
          alert(error)
        }
      }
    return (
        <View style={styles.container}>
            <View style={styles.seperate}>
                <View style={styles.dash} />
                <Text > Hoặc đăng nhập với </Text>
                <View style={styles.dash} />
            </View>
            <TouchableOpacity style={styles.buttonSocail} onPress={loginGoogleHandle}>
                <Image
                    style={styles.iconInput}
                    source={require('../../images/gg.png')}
                    resizeMode="stretch"
                />
                <Text style={styles.textSocail}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSocail} onPress={loginFacebookHandle}>
                <Image
                    style={styles.iconInput}
                    source={require('../../images/Facebook_Logo_(2019).png.webp')}
                    resizeMode="stretch"
                />
                <Text style={styles.textSocail}>Facebook</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SocialLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    seperate: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: WINDOW_WITH - 80,
        height: 40,
        marginLeft: 40,
    },
    dash: {
        width: '30%',
        height: 1,
        backgroundColor: Colors.gray,
    },
    buttonSocail: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: WINDOW_WITH - 60,
        height: 40,
        borderRadius: 5,
        marginLeft: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    textSocail: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 15,
    },
    iconInput: {
        width: 16,
        height: 16,
        marginLeft: 10,
    }
});
