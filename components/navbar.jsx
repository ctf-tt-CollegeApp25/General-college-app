import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import images from '../constants'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';


const Navbar = () => {
    return (
        <View className='h-[60px] w-full flex flex-row justify-around items-center '>
            <View>
                {/* <Image
                    source={images.ctflogo}
                    className='h-14 w-auto'
                    resizeMode='center'
                /> */}
            </View>

            <View>
                <TouchableOpacity
                    className='h-full w-[50px] justify-center ml-[300px]'
                    onPress={()=> router.push('profile')}
                >
                    <FontAwesome6 name="user-secret" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Navbar;
