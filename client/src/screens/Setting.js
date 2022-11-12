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
    const handleDeleteUser = (id) => {
        deleteUser(accessToken, dispatch, id);
    }
    return (
        <View style={{ flex: 1 }}>
            {
                (user?.others.admin === false) ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, flex:1 }}>
                        <Text>Setting Screen</Text>
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
                                            <Pressable style={{ borderWidth: 1, marginTop: 5, }} onPress={handleDeleteUser(id)} >
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