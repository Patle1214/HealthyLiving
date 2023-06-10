import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home.js';
import Sleep from './screens/Sleep.js';
import Profile from './screens/Profile.js';
import Workout from './screens/Workout.js';
import Options from './screens/Options.js';
import Goals from './screens/Goals.js';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown : false}} name="Profile" component={Profile} />

      <Stack.Screen options={{headerShown : false}} name="Home" component={Home} />
      <Stack.Screen options={{headerShown : false}} name="Sleep" component={Sleep} />
      <Stack.Screen options={{headerShown : false}} name="Workout" component={Workout} />
        <Stack.Screen options={{headerShown : false}} name="Options" component={Options} />
        <Stack.Screen options={{headerShown : false}} name="Goals" component={Goals} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
