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

  
    return (
      <>
        <SafeAreaView className="flex-1 bg-quadernary">
          <ScrollView className="p-4">
            <View className="bg-tertiary p-6 rounded-lg shadow-md mb-5">
              <Image
                source={{uri : itemDetails.image}}
                className="w-full h-64 rounded-lg mb-4"
                resizeMode="cover"
              />
              <Text className="text-2xl text-primary font-pbold mb-4">{itemDetails.item_name}</Text>
              <Text className="text-lg font-pregular text-gray-700 mb-4">{itemDetails.description}</Text>
              <View className="flex-row justify-between items-center mt-4">
                <TouchableOpacity
                  className="bg-blue-500 p-4 rounded-full shadow-md flex-1 mr-2"
                  onPress={() => console.log('Call pressed')}
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
      </>
    );
  };
  
  export default ItemDescription;