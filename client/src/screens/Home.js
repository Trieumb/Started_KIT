import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from 'react-native';

export default Home = () => {

    const handleLogout = async () => {
        await AsyncStorage.removeItem('AccessToken');
    };
    useEffect(() => {
        handleLogout();
    },[]);
    const user = useSelector((state) => state.auth.login?.currentUser);
    return (
        <View style={{ width: '100%', height: '100%', }}>
            <HeaderComponent user={user} handleLogout={handleLogout} />
            <View style={styles.home_content}>
                <Text>Home Screen</Text>
            </View>
        </View>
    );
};

const HeaderComponent = ( {user, handleLogout} ) => {
    return (
        <View style={styles.header}>
            <Text>Hi! {user?.others.userName}</Text>
            <Pressable style={styles.home_buttonSearch} onPress={() => {handleLogout()}}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        height: '7%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
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
});

