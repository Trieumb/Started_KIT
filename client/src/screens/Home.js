import React, { useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser } from "../api/requestApi";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from 'react-native';


export default Home = ({navigation}) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken;
    const id = user?.others._id;
    console.log(id);
    const handleLogout = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }
    return (
        <View style={{ width: '100%', height: '100%', }}>
            <HeaderComponent user={user} handleLogout={handleLogout} />
            <View style={styles.home_content}>
                <Text>Home Screen</Text>
            </View>
        </View>
    );
};

const HeaderComponent = ({ user, handleLogout }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>Hi! {user?.others.userName}</Text>
            <Pressable onPress={handleLogout} style={styles.buttonLogout}>
                <Text style={styles.text}>LogOut</Text>
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        height: '10%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    buttonLogout:{
        marginLeft:10,
        backgroundColor:'#339966',
        borderRadius:5,
        padding:3,
    },
    icon: {
        width: 25,
        height: 25,
    },
    home_buttonBack: {
        backgroundColor: 'red',
    },
    home_content: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    home_footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    footer_icon: {
        width: 25,
        height: 25,
        color: 'white',
    },
    text: {
        fontSize: 16,
        color:'black'
    }
});

