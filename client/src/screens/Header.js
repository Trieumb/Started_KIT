import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Colors from '../config/constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();  
  return (
    <View style={styles.header}>
            <Pressable style={styles.buttonBack} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="chevron-back" size={20} style={styles.icon}/>
                <Text style={styles.text}>Thoát</Text>
            </Pressable>
          </View>
  )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        height: '7%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.silver,
    },
    buttonBack: {
      flexDirection: 'row',
    },
    icon: {
      color: Colors.primary,
    },
    text: {
        color: Colors.primary,
        marginLeft: 5,
    }
})