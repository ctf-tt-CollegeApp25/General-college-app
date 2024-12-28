import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="addItem" options={{
            headerShown : false,
            title : 'Add/Remove Item',
        }} />
        <Tabs.Screen name="home" options={{
            headerShown : false,
            title : 'Home',
        }} />
        <Tabs.Screen name="profile" options={{
            headerShown : false,
            title : 'Profile',
        }}/>
    </Tabs>
  )
}

export default TabsLayout