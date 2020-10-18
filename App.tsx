import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import { useFonts, Quicksand_400Regular,Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';

import Login from './src/pages/Login';
import AppStack from './src/routes/AppStack';



export default function App() {

  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold
  });

  
  if (!fontsLoaded) {
    return <AppLoading />;
  }else{
    return(
      <>
      <AppStack></AppStack>
      <StatusBar style='auto' ></StatusBar>
      </>
    );

  }
  
}

