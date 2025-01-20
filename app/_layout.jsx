import { SplashScreen, Stack } from 'expo-router'
import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { StatusBar } from "expo-status-bar";

import '../global.css'

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  
  const [fontsLoaded ,error] = useFonts({
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
      "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
      "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  })

  useEffect(() => {
      if(error){
          console.log(error)
      }
      if(fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded,error]);

  if(!fontsLoaded && !error) return null;
  
  return (

    <>
      <Stack>
          <Stack.Screen name="(tabs)" options={{
              headerShown : false,
          }}/>
          <Stack.Screen name="(auth)" options={{
              headerShown : false,
          }}/>
          <Stack.Screen name = "itemDescription" options={{
              headerShown : false,
          }}/>
      </Stack>
    </>
  )
}

export default RootLayout