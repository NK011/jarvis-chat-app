import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import Register from './screens/Register';
import Chats from './screens/Chats';
import AddNewChat from './screens/AddNewChat';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator()

const globalTitleStyle = {
  headerStyle: {backgroundColor: "black",},
  headerTitleStyle: {color: "white"},
  headerTintColor: "white"
}

export default function App() {
  return (
    <NavigationContainer styles={styles.container} > 
      <Stack.Navigator screenOptions={globalTitleStyle}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="Add New Chat" component={AddNewChat} />
        <Stack.Screen name="Chat Screen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
