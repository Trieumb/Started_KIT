import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import Header from "../Header";

export default Help = () => {
    const navigation = useNavigation();
    return (
        <View style={{height:'100%'}}>
            <Header/>
            <View style={{ alignItems: 'center',justifyContent:'center', flex: 1 }}>
                <Text>Help Screen</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
})

