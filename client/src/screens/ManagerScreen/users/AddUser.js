import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../config/constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../redux/reducers/AuthSlice';

const AddUser = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = () => {
    const user = {
        email: email,
        userName: userName,
        password: password,
    }
    dispatch(registerUser(user));
    navigation.navigate('User');
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.buttonBack} onPress={() => navigation.navigate('User')}>
                <Ionicons name="chevron-back" size={20} style={styles.icon} />
                <Text style={styles.textBack}>Back</Text>
            </Pressable>
            <View style={styles.content}>
                <Text style={styles.title}>Thêm tài khoản!</Text>
                <TextInput placeholder='Email'
                    value={email}
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput placeholder='Tên đăng nhập'
                    value={userName}
                    style={styles.input}
                    onChangeText={text => setUserName(text)}
                />
                <TextInput placeholder='Mật khẩu'
                    value={password}
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    autoCapitalize={false} />
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.text}>Thêm</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default AddUser

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
    title: {
        fontSize: 25,
        color: Colors.primary,
    },
    buttonBack: {
        flexDirection: 'row',
    },
    textBack: {
        marginLeft: 5,
        color: Colors.primary,
    },
    icon: {
        marginLeft: 5,
        width: 25,
        height: 25,
        color: Colors.primary,
    },
    content: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        width: '80%',
        marginVertical: 15,
    },
    button: {
        borderWidth: 1,
        borderRadius: 5,
        width: '80%',
        padding: 5,
        marginTop: 15,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Colors.white,
        fontSize: 18,

    },

})