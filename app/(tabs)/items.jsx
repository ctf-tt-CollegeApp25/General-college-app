import React, { useState, useRef, useEffect,useCallback  } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import images from '../../constants';
import axios from 'axios';
import env from '../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchIcon from '../../components/search';
import { useFocusEffect } from 'expo-router';

import PlusButton from '../../components/plusButton'
import { router } from 'expo-router';
import Navbar from '../../components/navbar';
// const url = ['/', '/addItem', '/campusMap']

const Home = () => {
  const API_URL = env.API_URL;
  const navigation = useNavigation();
  const [searchItem, setSearchItem] = useState('');
  const [items, setItems] = useState([]);
  const textInputRef = useRef(null);

  const getItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/lost-and-found/items`);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getItems();
    }, [])
  );

  const formatDateKey = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (dateKey) => {
    const [year, month, day] = dateKey.split('-');
    return `${day} ${month} ${year.slice(-2)}`;
  };

  const filteredItems = items.filter((item) =>
    item.item_name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    const dateKey = formatDateKey(item.created_at);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {});

  const sortedDateKeys = Object.keys(groupedItems).sort((a, b) =>
    b.localeCompare(a)
  );

  const[load, setLoad] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setLoad(false)
      const timer = setTimeout(() => setLoad(true), 3000)

      return () => clearTimeout(timer)
    }, [])
  )

  return (
    <SafeAreaView className="bg-tertiary h-full">
      {load ?
      <View>
        <View className="h-9 bg-tertiary" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-tertiary p-4">
          <Navbar/>
          <TouchableWithoutFeedback onPress={() => textInputRef.current?.focus()}>
            <View className="flex flex-row bg-white w-full h-12 rounded-lg px-2 mb-4 items-center justify-between">
              <TextInput
                ref={textInputRef}
                onChangeText={(text) => setSearchItem(text)}
                placeholder="Search for an item"
                placeholderTextColor="black"
                className="flex-1"
              />
              <Image source={images.search} className="w-8 h-8 ml-2" />
            </View>
          </TouchableWithoutFeedback>
          {sortedDateKeys.map((dateKey) => (
            <View key={dateKey} className="mb-6">
              <Text className="text-xl font-pbold text-primary mb-4">
                {formatDisplayDate(dateKey)}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {groupedItems[dateKey].map((item) => (
                  <View
                    key={item.item_id}
                    className="bg-white w-64 rounded-lg mr-4 p-2 shadow-lg"
                  >
                    <Image
                      source={{ uri: item.image }}
                      className="w-full h-48 rounded-lg mb-2"
                      resizeMode="cover"
                    />
                    <Text className="text-xl font-psemibold mb-1 text-quaternary">
                      {item.item_name}
                    </Text>
                    <Text
                      style={{ textTransform: 'capitalize' }}
                      className="text-m text-quadernary font-medium"
                    >
                      {item.reason} Near: {item.location}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('itemDescription', { itemDetails: item })
                      }
                    >
                      <Text className="text-center text-purple-500 mt-2 font-medium">
                        See more details
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
          <PlusButton
            onPress={() => router.push('/addItem')}
            postionStyle='relative top-[650px] left-[280px]'
          />
        </ScrollView>
      </View>
      :<SearchIcon/>}
    </SafeAreaView>
  );
};

export default Home;
