import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default Help = () => {
    const navigation = useNavigation();
    return (
        <View style={{height:'100%'}}>
            <View style={styles.header}>
            <Pressable style={styles.home_buttonBack} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="chevron-back" size={20} style={styles.icon}/>
                <Text style={{marginLeft:5, color:"#339966"}}>Back</Text>
            </Pressable>
            </View>
            <View style={{ alignItems: 'center',justifyContent:'center', flex: 1 }}>
                <Text>Help Screen</Text>
            </View>
        </View>
    )
}
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
        marginLeft:5,
        width: 25,
        height: 25,
        color: '#339966',
    },
    home_buttonBack: {
        flexDirection: 'row',
    }
})

