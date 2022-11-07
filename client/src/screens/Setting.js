import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Pressable, ScrollView } from "react-native";
import { deleteUser, getAllUser, logoutUser} from "../api/requestApi";

export default Setting = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.users.users?.allUsers);
    useEffect(() => {
        if (!user) {
            navigation.navigate('Login');
        }
        if (user?.accessToken) {
            getAllUser(user?.accessToken, dispatch);
        }
    }, []);
    console.log(user?.accessToken)
    const handleLogout = async () => {
        logoutUser(user?.accessToken, dispatch);
        console.log('Logout')
    };
    const handleDeleteUser = (id) => {
        deleteUser(user?.accessToken, dispatch, id);
    }
    return (
        <View style={{ flex: 1 }}>
            {
                (user?.others.admin === false) ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Text>Setting Screen</Text>
                        <Pressable style={{
                            borderWidth: 1, height: 30, borderRadius: 5, padding: 5,
                            alignItems: 'center', marginTop: 10
                        }}
                            onPress={handleLogout}>
                            <Text >Log out</Text>
                        </Pressable>
                    </View>
                ) : (
                    <ScrollView>
                        <View>
                            <Text>Danh sách tài khoản!</Text>
                            {
                                userList?.map((user, index) => {
                                    return (
                                        <View key={user.email} style={{ padding: 10 }}>
                                            <Text>{user.email}</Text>
                                            <Pressable style={{ borderWidth: 1, marginTop: 5, }} onPress={handleDeleteUser} >
                                                <Text style={{ color: 'red' }}>Delete</Text>
                                            </Pressable>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                )
            }
        </View>
    )
}