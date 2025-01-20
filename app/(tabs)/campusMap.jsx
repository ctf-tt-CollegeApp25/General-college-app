import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants'
import { Link } from 'expo-router'


const Place = () => {
    return(
        <View
            className='h-[130px] w-[310px] border rounded-xl py-2 px-1 flex flex-row justify-center gap-2 bg-secondary'
        >
            <View 
                className='w-[110px] rounded-[10px]'
            >
                <Image
                    source={images.keys}
                    className='h-[110px] w-[100px] rounded-[10px]'
                />
            </View>
            <View
                className='bg-tertiary w-[180px] rounded-[10px] flex flex-col justify-center items-center'
            >
                <Text
                    className = 'text-[20px] text-quaternary font-psemibold'
                >Red Building It Department</Text>

                <Link
                    className='bg-primary w-[100px] text-center text-white h-[27px] p-1 rounded-[10px]' 
                    href='https://maps.app.goo.gl/K9yPmyWaRTCzhQQM8'
                    
                >
                Navigate</Link>
                
            </View>
        </View>
    )
}

const CampusMap = () => {
    return (
        <SafeAreaView className='flex-1 flex-row justify-center items-center bg-tertiary'>
            <ScrollView contentContainerStyle={{flexGrow : 1}} className='flex'>
                <View
                    className='flex-1 flex-col items-center'
                >
                    <View>
                        <Text
                            className='text-[30px] font-psemibold m-4 text-center'
                        >Campus map</Text> 
                    </View>
                    <View
                        className='m-[20px] flex flex-col gap-[20px]'
                    >
                        <Place/>
                        <Place/>
                        <Place/>
                        <Place/>
                        <Place/>
                        <Place/>
                        <Place/>
                        <Place/>
                        <Place/>
                        
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CampusMap