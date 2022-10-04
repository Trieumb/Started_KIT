import React, {Component, useState} from 'react';
import {EvilIcons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';

import {
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

export default (Home = ({navigation}) => {
  return (
    <View style={{width: '100%', height: '100%', marginTop: 30}}>
      <HeaderComponent navigation={navigation} />
      <View style={styles.home_content}>
        <Text>Home Screen</Text>
      </View>
      <FooterComponent navigation={navigation} />
    </View>
  );
});

const HeaderComponent = ({navigation}) => {
  return (
    <View style={styles.home_header}>
      <TouchableOpacity style={styles.home_buttonBack} onPress={() => navigation.navigate('Login')}>
        <Ionicons name="chevron-back-outline" size={30} color="#339966" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.home_buttonSearch}>
        <EvilIcons name="search" size={30} color="#339966" />
      </TouchableOpacity>
    </View>
  );
};
const FooterComponent = ({navigation}) => {
  return (
    <View style={styles.home_footer}>
      <TouchableOpacity>
        <AntDesign name="exclamation" size={30} color="#339966" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="help" size={30} color="#339966" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.home_buttonSetting}
        onPress={() => {
          navigation.navigate ('Setting');
        }}
      >
        <AntDesign name="setting" size={30} color="#339966" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create ({
  home_header: {
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  home_header_touch: {},
  home_icon: {
    width: 25,
    height: 25,
  },
  home_iconBack: {
    height: 30,
    width: 30,
    color: 'red',
  },
  home_iconSearch: {
    height: 30,
    width: 30,
    color: 'red',
  },
  home_buttonBack: {},
  home_content: {
    height: '85%',
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
    marginBottom: 25,
  },
  footer_icon: {
    width: 25,
    height: 25,
    backgroundColor: 'green',
    color: 'white',
  },
});
