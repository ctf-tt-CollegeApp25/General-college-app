import { View, Text, ScrollView, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'



const Default = () => {

    const[line1, setLine1] = useState('')
    const[line2, setLine2] = useState('')
    const[num, setNum] = useState(0)

    // const getKural = async() => {
    //     try {
    //         const res = await fetch('https://getthirukkural.appspot.com/api/3.0/kural/rnd?appid=rl8uehw072kik');
    //         const data = await res.json()
    //         if(res.ok){
    //             setLine1(data.line1)
    //             setLine2(data.line2)      
    //             setNum(data.number)      
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    //     finally{
    //         setTimeout(() => {
    //             getKural();
    //         }, 10000);
    //     }
    // }

    // useEffect(() => {
    //     getKural()
    //     return () => clearTimeout();
    // }, [])

    const Option = ({content}) => {

        return(
            <LinearGradient
                colors={['#5700ff', '#eeebe5']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="flex-1 justify-center items-center w-[150px] h-[40px]"
            >
                <TouchableOpacity
                    className='flex-1 flex-col justify-center'
                    >
                        <Text
                            className='text-center text-white'
                            >{content}</Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }

return (
    <SafeAreaView className='flex-1 bg-tertiary'>
      <StatusBar style='auto'/>
        <ScrollView contentContainerStyle={{flexGrow : 1}} className='flex'>
            <View className='flex-1 flex-col justify-center ml-4 gap-5'>
                <Text
                    className='text-[40px] font-pbold text-quaternary'
                >General {'\n'}College app</Text>

                <View>
                    <Text>{line1}{'\n'}{line2}</Text>
                </View>

                <View
                    className='flex flex-col gap-8'
                >
                    <Option content='Lost and Found'/>
                    <Option content='Campus Map'/>
                    <Option content='Track My EV'/>
                </View>

                <View>
                    <Text className='text-secondary font-pbold text-[25px] '
                    >Import Events</Text>
                    <Link href='/otp-section'>Click here for otp section</Link>
                    <Link href='/sign-up'>sign up</Link>
                    <Link href='/sign-in'>sign in</Link>
                    <Link href='/forget-password'>forget-password</Link>
                    <Link href='https://maps.app.goo.gl/K9yPmyWaRTCzhQQM8'>IT department</Link>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
)
}

export default Default