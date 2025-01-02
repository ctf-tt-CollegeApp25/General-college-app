import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
const Home = () => {
  return (
    <>
        <View className="h-9">
            <StatusBar style="dark" />
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View>
                <Text>Hello</Text>
            </View>
        </ScrollView>
    </>
  )
}

export default Home