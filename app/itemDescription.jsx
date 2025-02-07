import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  SafeAreaView,
  Alert,
} from "react-native";
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
      .catch((err) =>
        console.error("An error occurred while opening WhatsApp:", err)
      );
  };

  const callNumber = (phoneNumber) => {
    const phoneCallURL = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneCallURL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneCallURL);
        } else {
          Alert.alert('Error', 'Phone call is not supported on this device.');
        }
      })
      .catch((err) =>
        console.error("Error while trying to make a call:", err)
      );
  };

  return (
    <SafeAreaView className="flex-1 bg-quadernary">
      <ScrollView className="p-4">
        <View className="bg-tertiary p-6 rounded-lg shadow-md mb-5">
          <Image
            source={{ uri: itemDetails.image }}
            className="w-full h-64 rounded-lg mb-4"
            resizeMode="cover"
          />
          <Text className="text-2xl text-primary font-pbold mb-4">
            {itemDetails.item_name}
          </Text>
          <Text className="text-xl font-pregular mb-4">
            <Text className="text-primary">Description: </Text>
            <Text className="text-gray-700">{itemDetails.description}</Text>
          </Text>
          <Text className="text-xl font-pregular mb-4">
            <Text className="text-primary">Username: </Text>
            <Text className="text-gray-700">{itemDetails.user_name}</Text>
          </Text>
          <Text className="text-xl font-pregular mb-4">
            <Text className="text-primary">Contact: </Text>
            <Text className="text-gray-700">{itemDetails.contact_number}</Text>
          </Text>
          <Text className="text-xl font-pregular mb-4">
            <Text className="text-primary">Special Marks: </Text>
            <Text className="text-gray-700">{itemDetails.special_marks}</Text>
          </Text>
          
          <View className="flex-row justify-between items-center mt-4">
            <TouchableOpacity
              className="bg-blue-500 p-4 rounded-full shadow-md flex-1 mr-2"
              onPress={() => callNumber(itemDetails.contact_number)}
            >
              <Text className="text-white text-center font-medium text-lg">
                📞 Call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-green-500 p-4 rounded-full shadow-md flex-1 mr-2"
              onPress={() => openWhatsApp(itemDetails.contact_number)}
            >
              <Text className="text-white text-center font-medium text-lg">
                💬 WhatsApp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemDescription;
