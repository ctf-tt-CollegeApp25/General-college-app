import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Slot } from 'expo-router';

import Demo from './components/demo';
import "../global.css"


export default function App() {
    return (
        <View className="flex flex-col justify-center items-center h-screen">
            <Text className="text-red-500 text-[30px]">General college app</Text>
            <StatusBar style="auto" />
            <Demo/>
        </View>
    );
}

