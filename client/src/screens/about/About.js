import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import Colors from "../../config/constants/Colors";
import Header from "../Header";

export default About = () => {
    
    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.aboutContent}>
                <Text style={styles.text}>Design by:</Text>
                <Text style={styles.text}>Nguyen Van Trieu</Text>
                <Text style={styles.text}>B2CQ CNTT02-K65</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: Colors.primary,
        fontSize: 16,
    },
    aboutContent: {
        alignItems: 'center',
        justifyContent:'center', 
        flex: 1 
    }
});

