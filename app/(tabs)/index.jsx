import { View, Text, ScrollView, Button, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'
import Navbar from '../../components/navbar'
import AnimatedCard from '../../components/card'


const Default = () => {


    const Option = ({content}) => {

        return(
            <TouchableOpacity>
                <LinearGradient
                    colors={['#bae6fd', '#38bdf8']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="flex-1 justify-center items-center w-[150px] h-[50px]"
                >
                        <Text
                            className='text-center text-white'
                        >{content}</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    const[log, setLog] = useState(false)

return (
    <SafeAreaView className='flex-1 bg-tertiary'>
        <StatusBar style='dark'/>
        {/* <LinearGradient
                colors={['#fff', "#9ca3af"]}
                start={{x : 0, y:0}}
                end={{x : 0, y : 1}}
                className='flex-1'
        > */}
        <ScrollView contentContainerStyle={{flexGrow : 1}} className='flex'>
            <Navbar/>
           
            <View className='flex-1 flex-col justify-end items-center m-5 gap-5'>
                {/* <Text
                    className='text-[35px] font-pbold text-quaternary'
                >College of {'\n'}Engineering Guindy</Text>


                <Text
                    className='text-[30px]'
                >
                    Helo CEG'ians
                </Text> */}

                <AnimatedCard/>

                {!log && 
                <View className='flex flex-col gap-[20px] '>
                    <View>
                        <TouchableOpacity
                            className='h-[40px] w-[250px] bg-primary flex flex-col justify-center rounded-[10px]'
                            >
                            <Link
                                className='text-white text-center'
                                href='/sign-in'
                            >SIGN IN</Link>

                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity
                            className='h-[40px] w-[250px] bg-primary flex flex-col justify-center rounded-[10px]'
                            >
                            <Link
                                className='text-white text-center'
                                href='/sign-up'
                            >SIGN UP</Link>

                        </TouchableOpacity>
                    </View>
                </View>
               }
            
                
            </View>
        </ScrollView>
        {/* </LinearGradient> */}
    </SafeAreaView>
)
}

export default Default