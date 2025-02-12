import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{
            headerShown : false,
            title : 'Home',
            tabBarIcon:() => <Feather name="home" size={24} color="#4d4d4d" />
        }} />
        <Tabs.Screen name="items" options={{
            headerShown : false,
            title : 'Items',
            tabBarIcon:() => <Feather name="search" size={24} color="#4d4d4d" />
        }}/>
        <Tabs.Screen name="addItem" options={{
            headerShown : false,
            title : 'Post Item',
            tabBarIcon:() => <Feather name="plus-square" size={24} color="#4d4d4d" />
        }} />
        
        <Tabs.Screen name="profile" options={{
            headerShown : false,
            title : 'Profile',
        }}/>
        <Tabs.Screen name="campusMap" options={{
            headerShown : false,
            title : 'Map',
            tabBarIcon:({color, size}) => (
                <Feather name="map-pin" size={24} color="#4d4d4d" />
            )
        }}/>
    </Tabs>
  )
}

export default TabsLayout