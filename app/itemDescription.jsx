import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView ,Linking,SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";

const ItemDescription = () => {
  const route = useRoute();
  const { itemDetails } = route.params; 
  const openWhatsApp = (phoneNumber) => {
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}`;
    Linking.canOpenURL(whatsappURL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(whatsappURL);
        } else {
          Alert.alert("Error", "WhatsApp is not installed on this device.");
        }
      })
      .catch((err) => console.error("An error occurred while opening WhatsApp:", err));
  };
  return (
    <>
    <SafeAreaView className="bg-tertiary h-full"> 
    <ScrollView 
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 16,
        }} 
        className="bg-tertiary p-4 ">
      
      <View className="bg-white mb-4 rounded-lg shadow-lg p-4 flex items-center">
        <Image
          source={itemDetails.image}
          className="w-56 h-56 rounded-lg mb-4"
          resizeMode="cover"
        />
        <View>
          <Text className="text-2xl font-psemibold mb-2">Item: {itemDetails.item_name}</Text>
          <Text className="text-lg mb-2 font-pregular">Found Near: {itemDetails.lostNear}</Text>
          <Text className="text-lg mb-2 font-pregular">Published Date: {itemDetails.publishedDate}</Text>
          <Text className="text-lg mb-2 font-pregular">Username: {itemDetails.username}</Text>
          <Text className="text-lg mb-2 font-pregular">Contact Number: {itemDetails.contact_number}</Text>
          <Text className="text-lg mb-2 font-pregular">Item Description: {itemDetails.description}</Text>
        </View>
        <View className="flex flex-row justify-evenly mt-4">
          <TouchableOpacity
            className="bg-blue-500 p-4 rounded-full mr-4"
            onPress={() => Linking.openURL(`tel:${itemDetails.contact_number}`)}
          >
            <Text className="text-white text-center text-pregular">📞 Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-500 p-4 rounded-full"
            onPress={() => openWhatsApp(itemDetails.contact_number)}
          >
            <Text className="text-white text-center text-pregular">💬 WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
    </>
  );
}
export default ItemDescription;