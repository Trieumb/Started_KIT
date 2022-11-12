import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Users from './Users';
import Others from './Others';

const Manager = () => {

  const Drawer = createDrawerNavigator();
   return (
    <Drawer.Navigator>
      <Drawer.Screen name="User" component={Users} />
      <Drawer.Screen name="Others" component={Others} />
    </Drawer.Navigator>
  )
}

export default Manager;

const styles = StyleSheet.create({})