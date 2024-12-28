import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import '../global.css'
import Demo from '../components/demo'
const IndexPage = () => {
  return (
    <View>
      <Text className='text-2xl'>IndexPage</Text>
      <Text className='text-red-800'>Hello</Text>
      <Demo name="Raj"/>
      <Link href="/home" className='text-3xl'>Click-Me Home</Link>
    </View>
  )
}

export default IndexPage