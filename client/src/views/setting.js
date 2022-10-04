import React, {Component, useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  SafeAreaView,
} from 'react-native';

export default (Setting = ({navigation}) => {
  return (
    <View style={{height: '100%', marginTop: 50}}>
      <View style={{height: '10%'}}>
        <TouchableOpacity
          style={{marginLeft: 20}}
          onPress={() => {
            navigation.navigate ('Home');
          }}
        >
          <Ionicons name="chevron-back-outline" size={30} color="#339966" />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity>
          <Text style={{backgroundColor: 'red', padding: 20, color: 'white'}}>
            Đăng Xuất
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
