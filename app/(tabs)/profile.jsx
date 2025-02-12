import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
  });

  const handleInputChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const saveChanges = () => {
    setEditMode(false)
  };

  return (
	<SafeAreaView className="flex-1 bg-tertiary flex-row justify-center items-center">
		<ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex">
		<View className="flex-1 flex flex-col justify-center items-center mt-[20px] p-4">

				<View className='flex-1 flex-row mt-[30px]'>
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
								value={userDetails.username}
								onChangeText={(text) => handleInputChange("username", text)}
							/>
							) : (
							<Text className="text-[16px]  text-gray-800 mt-1">{userDetails.username}</Text>
						)}
					</View>

					<View className="mb-4">
						<Text className="text-[18px] font-semibold text-secondary">Email</Text>
						{editMode ? (
						<TextInput
							className="border border-gray-300 rounded p-2 mt-1 text-gray-800 bg-white"
							value={userDetails.email}
							onChangeText={(text) => handleInputChange("email", text)}
						/>
						) : (
						<Text className="text-lg text-gray-800 mt-1">{userDetails.email}</Text>
						)}
					</View>

					<View className="mb-4">
						<Text className="text-[18px] font-semibold text-secondary">Phone</Text>
						{editMode ? (
						<TextInput
							className="border border-gray-300 rounded p-2 mt-1 text-gray-800 bg-white"
							value={userDetails.phone}
							onChangeText={(text) => handleInputChange("phone", text)}
						/>
						) : (
						<Text className="text-lg text-gray-800 mt-1">{userDetails.phone}</Text>
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

				<View
                  className="bg-white w-64 rounded-lg mr-4 p-2 shadow-lg border-2 border-black flex flex-col items-center"
                >
                  <Image
                    className="w-full h-48 rounded-lg mb-2"
                    resizeMode="cover"
                  />
                  <Text className="text-xl font-psemibold mb-1 text-quaternary">
                    card
                  </Text>
                  <Text
                    style={{ textTransform: 'capitalize' }}
                    className="text-m text-quadernary font-medium"
                  >
                    Lost Near: red building
                  </Text>
                  <TouchableOpacity
                    // onPress={() =>
                    //   navigation.navigate('itemDescription', { itemDetails: item })
                    // }
                  >
                    <Text className="text-center text-purple-500 mt-2 font-medium">
                      See more details
                    </Text>
                  </TouchableOpacity>

				  <TouchableOpacity
				  	className='h-[30px] justify-center bg-red-500 w-[100px] rounded-[8px] my-[10px]'
				  >
					<Text className='text-center text-white'>
						Received
					</Text>
				  </TouchableOpacity>
                </View>		
		</View>
	</ScrollView>
  </SafeAreaView>

  );
};

export default Profile;

