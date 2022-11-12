import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import Help from '../screens/Help';
import About from '../screens/About';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'Help') {
                        iconName = focused ? 'ios-help-circle' : 'ios-help-circle-outline';
                    } else if (route.name === 'About') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;   
                },
                tabBarActiveTintColor: '#339966',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarLabelStyle:{
                    fontSize:16,
                }
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Settings" component={Setting} />
            <Tab.Screen name="Help" component={Help} />
            <Tab.Screen name="About" component={About} />
        </Tab.Navigator>
    )
}
export default TabNavigation;