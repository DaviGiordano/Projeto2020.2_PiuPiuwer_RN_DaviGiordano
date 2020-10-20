import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';

import { ImageBackground, StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';

import { useFonts, Quicksand_400Regular,Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';

import Login from './src/pages/Login';
import Routes from './src/routes';

import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/auth'

export default function App() {



  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold
  });

  
  if (!fontsLoaded) {
    return <AppLoading />;
  }else{
    return(
      <NavigationContainer>
        <AuthProvider>
          <Routes/>
          <StatusBar style='auto' ></StatusBar>
        </AuthProvider>
      </NavigationContainer>
      
    );

  }
  
}

