import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import env from "../env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [items, setItems] = useState([]);
  const [user_id, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = env.API_URL;
  const [userDetails, setUserDetails] = useState({});

  const handleLogout = async () => {
	try {
	  await AsyncStorage.clear();
	  Alert.alert("Success", "Logged out successfully", [
		{ 
		  text: "OK", 
		  onPress: () => {
			router.replace("/");
			setTimeout(() => router.replace("/sign-in"), 1);
		  }
		}
	  ]);
	} catch (error) {
	  Alert.alert("Error", "Failed to logout");
	}
  };

  useEffect(() => {
	const fetchData = async () => {
	  try {
		const storedUserId = await AsyncStorage.getItem("userId");
		const token = await AsyncStorage.getItem("authToken");
		console.log(storedUserId, token);
		if (!storedUserId || !token) {
		  Alert.alert("Login Required", "Please log in to access your profile", [
			{ text: "OK", onPress: () => router.replace("/sign-in") },
		  ]);
		  return;
		}
  
		setUserId(storedUserId);
		await fetchUserData(token);
		await retrieveItems(storedUserId, token);
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
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails({
        user_name: response.data.user_name,
        email_id: response.data.email_id,
        phone_number: response.data.phone_number,
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
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      await axios.delete(`${API_URL}/lost-and-found/delete/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems((prevItems) => prevItems.filter((item) => item.item_id !== itemId));
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
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.patch(`${API_URL}/profile`, userDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully");
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.error || "Failed to update profile");
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
          <View className="flex-1 flex-col items-center p-4 gap-[0px]">
            {/* Header */}
            <View className="flex-row justify-between w-full px-4">
              <Text className="text-2xl font-bold text-gray-800">Profile</Text>
              <TouchableOpacity onPress={() => (editMode ? saveChanges() : setEditMode(true))}>
                {editMode ? <Feather name="save" size={24} color="black" /> : <Feather name="edit" size={24} color="black" />}
              </TouchableOpacity>
            </View>

            {/* Profile Info */}
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
                  <Text className="text-[16px] text-gray-800 mt-1">{userDetails.user_name}</Text>
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
                <TouchableOpacity className="h-[35px] w-[180px] bg-primary justify-center rounded-[10px]">
                  <Link href="/otp-section" className="text-white text-center">
                    Forget Password
                  </Link>
                </TouchableOpacity>
              </View>
            </View>

            {/* User Items */}
            <View className="mt-8">
              <Text className="text-2xl font-bold text-gray-800 mb-4">Your Items</Text>
              {items.length > 0 ? (
                <View className="flex-row flex-wrap justify-between">
                  {items.map((item) => (
                    <View key={item.item_id} className="bg-white w-full mb-4 p-4 rounded-lg shadow">
                      <Image source={{ uri: item.image }} className="w-full h-48 rounded-lg mb-3" resizeMode="cover" />
                      <Text className="text-lg font-semibold mb-1">{item.item_name}</Text>
                      <TouchableOpacity className="bg-red-500 py-2 px-4 rounded-lg" onPress={() => handleDelete(item.item_id)}>
                        <Text className="text-white text-center">Mark as Received/Handed Over</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ) : (
                <Text className="text-gray-500 text-center">No items found.</Text>
              )}
            </View>

            <TouchableOpacity className="h-[30px] w-[100px] bg-red-500 justify-center rounded-[10px] self-end mt-4" onPress={handleLogout}>
              <Text className="text-white text-center">Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default Profile;