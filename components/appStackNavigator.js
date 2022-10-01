import React from 'react';
import {  View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import Home from '../screens/Home';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SurveyDetails from '../screens/SurveyDetails';

import {
  Ionicons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const LStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  return (
    <LStack.Navigator>
      <LStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <LStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <LStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />

      <LStack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </LStack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let ionicon;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'md-settings' : 'md-settings-outline';
          }
          return (
            <View>
              <Ionicons
                name={iconName}
                color={color}
                size={25}
              />
            </View>
          );
        },
        tabBarActiveTintColor: '#0059D4',
        tabBarInactiveTintColor: '#40485A',
        tabBarStyle: {
          height: '10%',
          backgroundColor: '#EDE5E8',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const HStack = createStackNavigator();

const HStackNavigator = () => {
  return (
    <HStack.Navigator>
      <HStack.Screen
        name="SurveyList"
        component={Home}
        options={{ headerShown: false }}
      />
      <HStack.Screen
        name="SurveyDetails"
        component={SurveyDetails}
        options={{ headerShown: false }}
      />
    </HStack.Navigator>
  );
};

const SStack = createStackNavigator();

const SStackNavigator = () => {
  return (
    <SStack.Navigator>
      <SStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <SStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </SStack.Navigator>
  );
};

export default StackNavigator;
