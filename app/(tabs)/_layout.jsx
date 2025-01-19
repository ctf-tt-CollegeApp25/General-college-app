import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{
            headerShown : false,
            title : 'Home',
        }} />
        <Tabs.Screen name="items" options={{
            headerShown : false,
            title : 'Items',
        }}/>
        <Tabs.Screen name="addItem" options={{
            headerShown : false,
            title : 'Add/Remove Item',
        }} />
        
        <Tabs.Screen name="profile" options={{
            headerShown : false,
            title : 'Profile',
        }}/>
        <Tabs.Screen name="campusMap" options={{
            headerShown : false,
            title : 'Campus Map',
        }}/>
    </Tabs>
  )
}

export default TabsLayout