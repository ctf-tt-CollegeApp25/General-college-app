import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Place = () => {
    return(
        <View>
        </View>
    )
}

const CampusMap = () => {
    return (
        <SafeAreaView className='flex-1 flex-row justify-center items-center bg-tertiary'>
            <ScrollView contentContainerStyle={{flexGrow : 1}} className='flex'>
                <View
                    className='flex-1 flex-col justify-center items-center'
                >
                    <Text>Campus Map</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CampusMap