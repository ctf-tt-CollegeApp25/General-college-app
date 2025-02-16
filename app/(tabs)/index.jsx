import { View, Text, ScrollView, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'
import Navbar from '../../components/navbar'



const Default = () => {


    const Option = ({content}) => {

        return(
            <TouchableOpacity>
                <LinearGradient
                    colors={['#5700ff', 'blue']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="flex-1 justify-center items-center w-[150px] h-[40px]"
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
        <Navbar/>
        <ScrollView contentContainerStyle={{flexGrow : 1}} className='flex'>
            <View className='flex-1 flex-col justify-center ml-5 gap-5'>
                <Text
                    className='text-[35px] font-pbold text-quaternary'
                >College of {'\n'}Engineering Guindy</Text>


                <Text
                    className='text-[30px]'
                >
                    Helo CEG'ians
                </Text>

                {!log && 
                <View className='flex flex-col gap-[20px] '>
                    <View>
                        <TouchableOpacity
                            className='h-[40px] w-[250px] bg-primary flex flex-col justify-center rounded-[20px]'
                            >
                            <Link
                                className='text-white text-center'
                                href='/sign-in'
                            >SIGN IN</Link>

                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity
                            className='h-[40px] w-[250px] bg-primary flex flex-col justify-center rounded-[20px]'
                            >
                            <Link
                                className='text-white text-center'
                                href='/sign-up'
                            >SIGN UP</Link>

                        </TouchableOpacity>
                    </View>
                </View>
               }
                <Text
                    className='text-[30px]'
                >Explore Now </Text>
                <View
                    className='flex flex-col gap-8'
                >
                    <Option content='Lost and Found'/>
                    <Option content='Campus Map'/>
                    <Option content='Track My EV'/>
                </View>

                
            </View>
        </ScrollView>
    </SafeAreaView>
)
}

export default Default