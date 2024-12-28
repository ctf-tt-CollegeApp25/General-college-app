import { Stack } from 'expo-router'
import { View, Text } from 'react-native'
import React from 'react'

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{
            headerShown : false,
        }}/>
    </Stack>
  )
}

export default RootLayout