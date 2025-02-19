import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import images from '../constants/index';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';

const Navbar = () => {
    return (
        <View className='h-[65px] w-full flex flex-row justify-between items-center px-4'>
            <TouchableOpacity
                onPress={() => router.push('https://cegtechforum.in')}
            >

                <Image
                    source={images.ctflogo}
                    className='h-[60px] w-[60px]'
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* Profile Button */}
            <TouchableOpacity
                className='p-2'
                onPress={() => router.push('profile')}
            >
                <FontAwesome6 name="user-secret" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

export default Navbar;
