import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../config/constants/Colors";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';

export default Home = () => {

    const dispatch = useDispatch();
    const [profile, setProfile] = useState({});

    const userInfo = useSelector( (state) => state.users.user?.userInfo);
    useEffect (() => {
        setProfile(JSON.parse(userInfo._j));
    },[])
    const handleLogout = async () => {
        await AsyncStorage.removeItem('AccessToken');
        await AsyncStorage.removeItem('User');
        setProfile(null);
        // setToken(null);
    }

    return (
        <View style={styles.container}>
            <HeaderComponent profile={profile} handleLogout={handleLogout} />
            <View style={styles.content}>
                <Text style={styles.text}>Home Screen</Text>
            </View>
        </View>
    );
};

const HeaderComponent = ({ profile, handleLogout }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>Hi! {profile?.userName}!</Text>
            <Pressable onPress={handleLogout} style={styles.buttonLogout}>
                <Text style={styles.text}>LogOut</Text>
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: '10%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: Colors.gray,
    },
    buttonLogout:{
        marginLeft:10,
        backgroundColor:Colors.primary,
        borderRadius:5,
        padding:3,
    },
    content: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color:Colors.dark,
    }
});

