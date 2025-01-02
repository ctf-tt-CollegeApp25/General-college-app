import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import '../global.css'
import Demo from '../components/demo'
const IndexPage = () => {
  return (
    <View>
      <Text className='text-2xl'>IndexPage</Text>
      <Text className='text-green-300 '>Hello</Text>
      <Demo/>
      <Link href="/home" className='text-3xl font-pregular'>Lost And Found</Link>
    </View>
  )
}

export default IndexPage