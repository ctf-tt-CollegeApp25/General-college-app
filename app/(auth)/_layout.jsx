import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="sign-in" options={{
            headerShown : true,
        }}/>
        <Stack.Screen name="sign-up" options={{
            headerShown : true,
        }}/>
        <Stack.Screen name="otp-section" options={{
            headerShown : true,
        }}/>
        <Stack.Screen name="forget-password" options={{
            headerShown : true,
        }}/>
    </Stack>
  )
}

export default AuthLayout