import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#1a1a1a',
        tabBarStyle: {
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#bae6fd', '#38bdf8']} // Define your gradient colors
            style={{ flex: 1 }}
          />
        ),
        headerShown: false,
      }}>
        <Tabs.Screen name="index" options={{
            headerShown : false,
            title : 'Home',
            
            tabBarIcon:({focused}) => <Feather name="home" size={24} color={focused ? "white" : "#000"} />
        }} />
        <Tabs.Screen name="items" options={{
            headerShown : false,
            title : 'Items',
            tabBarIcon:({focused}) => <Feather name="search" size={24} color={focused ? "white" : "#000"} />
        }}/>
        <Tabs.Screen name="addItem" options={{
            headerShown : false,
            title : 'Post',
            tabBarIcon:({focused}) => <Feather name="plus-square" size={24} color={focused ? "white" : "#000"} />
        }} />

        <Tabs.Screen name="campusMap" options={{
            headerShown : false,
            title : 'Map',
            tabBarIcon:({focused}) => (
                <Feather name="map-pin" size={24} color={focused ? "white" : "#000"} />
            )
        }}/>
        <Tabs.Screen name='evtracker' options={{
            headerShown : false,
            title:'EV',
            tabBarIcon :({focused}) => (
              <MaterialCommunityIcons name="bus-electric" size={24} color={focused ? "white" : "#000"} />
            )
        }}/>
    </Tabs>
  )
}

export default TabsLayout