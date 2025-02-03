import React, { useState } from 'react';
import { View, Text,SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import images from '../../constants';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import env from "../../env";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
    
    const API_URL = env.API_URL;
    const navigation = useNavigation();
    const [searchItem, setSearchItem] = useState('');
    const [items, setItems] = useState([]);
    console.log(API_URL);
    const getItems = async () => {
        try {
            const response = await axios.get(`${API_URL}/lost-and-found/items`);
            setItems(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getItems();
    }, []);
    //console.log(items);

   
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = String(date.getFullYear()).slice(-2);
    
        return `${day} ${month} ${year}`;
    };
    
    const groupedItems = items.reduce((acc, item) => {
        const formattedDate = formatDate(item.created_at);
        acc[formattedDate] = acc[formattedDate] || [];
        acc[formattedDate].push(item);
    
        return acc;
    }, {});
    

    return (
        <>
        <SafeAreaView className="bg-tertiary h-full">
            <View className="h-9 bg-tertiary">
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-tertiary p-4">
                <View className="flex flex-row bg-white w-full h-12 rounded-lg px-2 mb-4 items-center justify-between">
                    <TextInput
                        onChangeText={(text) => setSearchItem(text)}
                        placeholder="Search for an item"
                        placeholderTextColor="black"
                    />
                    <Image 
                        source={images.search} 
                        className="w-8 h-8 ml-2" 
                    />
                </View>

                {Object.entries(groupedItems).map(([date, items]) => (
                    <View key={date} className="mb-6">
                        <Text className="text-xl font-pbold text-secondary mb-4">{date}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {items.map((item) => (
                                <View
                                    key={item.item_id}
                                    className="bg-white w-64 rounded-lg mr-4 p-2 shadow-lg border-2 border-black"
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        className="w-full h-48 rounded-lg mb-2 "
                                        resizeMode="cover"
                                    />
                                    <Text className="text-xl font-psemibold mb-1 text-quadernary">{item.item_name}</Text>
                                    <Text className="text-m text-quadernary font-medium">Lost Near: {item.location}</Text>
                                    {/* <Text className="text-m text-primary">Username: {item.username}</Text>
                                    <Text className="text-m primary">Contact: {item.contact_number}</Text> */}
                                    <TouchableOpacity onPress={() => navigation.navigate("itemDescription" , {
                                        itemDetails: item
                                    })}>
                                        <Text className="text-center text-purple-500 mt-2 font-medium">See more details</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Home;
