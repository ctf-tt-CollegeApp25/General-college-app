import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import env from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
const Profile = () => {
	const [editMode, setEditMode] = useState(false);
	const [items, setItems] = useState([]);
	const [user_id, setUserId] = useState(null);
	const [loading, setLoading] = useState(true);
	const API_URL = env.API_URL;
	const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
	const fetchData = async () => {
	  try {
		const storedUserId = await AsyncStorage.getItem("user_id");
		const token = await AsyncStorage.getItem("authToken");
		if (storedUserId) {
		  setUserId(storedUserId);
		  await fetchUserData(token); 
		  await retrieveItems(storedUserId, token);
		}
	  } catch (error) {
		console.error("Error retrieving user_id:", error);
	  } finally {
		setLoading(false);
	  }
	};
  
	fetchData();
  }, []);
  const fetchUserData = async (token) => {
	try {
	  const response = await axios.get(`${API_URL}/profile`, {
		headers: { Authorization: `Bearer ${token}` }
	  });
	  //console.log(response.data);
	  setUserDetails({
		user_name: response.data.user_name,
		email_id: response.data.email_id,
		phone_number: response.data.phone_number
	  });
	} catch (error) {
	  Alert.alert("Error", "Failed to load profile data");
	}
  };
  const retrieveItems = async (userId, token) => {
	try {
	  const response = await axios.get(`${API_URL}/lost-and-found/items/${userId}`, {
		headers: { Authorization: `Bearer ${token}` },
	  });
	  setItems(Array.isArray(response.data) ? response.data : []);
    console.log(items);
	} catch (error) {
	  console.error("Error fetching items:", error);
	}
  };

  const handleDelete = async (itemId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      await axios.delete(`${API_URL}/lost-and-found/delete/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems(items.filter((item) => item.item_id !== itemId));
      Alert.alert("Success", "Item deleted successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to delete item");
    }
  };

  const handleInputChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const saveChanges = async () => {
    try {
      setEditMode(false);
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.patch(`${API_URL}/profile`, userDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to update profile');
      setEditMode(true);
    }
  };
  if (loading) {
	return (
	  <SafeAreaView className="flex-1 bg-tertiary justify-center items-center">
		<Text>Loading...</Text>
	  </SafeAreaView>
	);
  } else {
  return (
	<SafeAreaView className="flex-1 bg-tertiary h-screen w-full">
		<ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex">
			<View className="flex-1 flex-col  items-center p-4 gap-[0px]">
					<View className='flex-1 flex-row '>
						<Text className="text-2xl font-bold text-gray-800 mb-4 text-center">Profile</Text>
						<TouchableOpacity
								className="relative left-[90px]"
								onPress={() => (editMode ? saveChanges() : setEditMode(true))}
								>
									{editMode ? 
										<Feather name="save" size={24} color="black" />
										:
										<Feather name="edit" size={24} color="black" />
									}
						</TouchableOpacity>
					</View>

					<View className="bg-tertiary rounded-lg w-full max-w-lg p-6 flex flex-col gap-[30px]">

						<View className="mb-4">
							<Text className="text-[18px] font-semibold text-secondary">Name</Text>
							{editMode ? (
								<TextInput
									className="border border-gray-300 rounded p-2 mt-1 text-gray-800 bg-white"
									value={userDetails.user_name}
									onChangeText={(text) => handleInputChange("user_name", text)}
								/>
								) : (
								<Text className="text-[16px]  text-gray-800 mt-1">{userDetails.user_name}</Text>
							)}
						</View>

						<View className="mb-4">
							<Text className="text-[18px] font-semibold text-secondary">Email</Text>
							{editMode ? (
							<TextInput
								className="border border-gray-300 rounded p-2 mt-1 text-gray-800 bg-white"
								value={userDetails.email_id}
								onChangeText={(text) => handleInputChange("email_id", text)}
							/>
							) : (
							<Text className="text-lg text-gray-800 mt-1">{userDetails.email_id}</Text>
							)}
						</View>

						<View className="mb-4">
							<Text className="text-[18px] font-semibold text-secondary">Phone</Text>
							{editMode ? (
							<TextInput
								className="border border-gray-300 rounded p-2 mt-1 text-gray-800 bg-white"
								value={userDetails.phone_number}
								onChangeText={(text) => handleInputChange("phone_number", text)}
							/>
							) : (
							<Text className="text-lg text-gray-800 mt-1">{userDetails.phone_number}</Text>
							)}
						</View>

						<View>
							<TouchableOpacity className='h-[35px] w-[180px] bg-primary justify-center rounded-[10px]'>
								<Link href='/otp-section' className=' text-white text-center'>
									Forget Password
								</Link>
							</TouchableOpacity>
						</View>
					</View>

					<View className="mt-8">
							<Text className="text-2xl font-bold text-gray-800 mb-4">Your Items</Text>
							{items.length > 0 ? (
					<View className="flex-row flex-wrap justify-between">
						{items.map((item) => (
							<View 
								key={item.item_id} 
								className="bg-white w-full mb-4 p-4 rounded-lg shadow"
							>
								<Image
									source={{ uri: item.image }}
									className="w-full h-48 rounded-lg mb-3"
									resizeMode="cover"
								/>
								<Text className="text-lg font-semibold mb-1">{item.item_name}</Text>
								<Text className="text-gray-600 mb-2">Lost Near: {item.location}</Text>
								<TouchableOpacity
									className="bg-red-500 py-2 px-4 rounded-lg"
									onPress={() => handleDelete(item.item_id)}
								>
									<Text className="text-white text-center">Mark as Received/Handed Over</Text>
								</TouchableOpacity>
							</View>
						))}
							</View>
						) : (
							<Text className="text-gray-500 text-center">No items found.</Text>
						)}

						</View>

        </View>
		</ScrollView>
  </SafeAreaView>

  );
}};

export default Profile;

