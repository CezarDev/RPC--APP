import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthProvider from './src/context/AuthContext';
import React from 'react';
import AppNav from './src/screens/AppNav';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider>

        {/* <NavigationContainer> */}
          <AppNav />
        {/* </NavigationContainer> */}
        <StatusBar style="auto" />

      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1F2937',
    // alignItems: 'center',
    // justifyContent: 'center',
    // color: '#fff',
    // fontWeight: 'bold',
    // fontSize: 100,
    
  },
});
