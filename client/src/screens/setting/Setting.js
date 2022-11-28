import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Pressable, ScrollView , StyleSheet} from "react-native";
import { deleteUser, getAllUser, logoutUser} from "../../redux/reducers/UserSlice";
import Colors from "../../config/constants/Colors";

export default Setting = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.users.users?.allUsers); 
    const id = user.others?._id;
    console.log(userList);
    useEffect(() => {
        if (!user) {
            navigation.navigate('Login');
        }
        if (user?.accessToken) {
            dispatch(getAllUser(user?.accessToken));
        }
    }, []);
    const handleDeleteUser = (id) => {
        deleteUser(user?.accessToken, dispatch, id);
    }
    return (
        <View style={styles.container}>
            {
                (user.others?.admin === false) ? (
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
                                            <Pressable style={styles.deleteButton} onPress={handleDeleteUser(id)} >
                                                <Text style={styles.redText}>Delete</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    deleteButton: {
        borderWidth: 1, 
        marginTop: 5
        
    },
    redText: {
        color: Colors.red,
    }
});