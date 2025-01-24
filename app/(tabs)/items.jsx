import React, { useState } from 'react';
import { View, Text,SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import images from '../../constants';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
    const navigation = useNavigation();
    const [searchItem, setSearchItem] = useState('');

    const items = [
        { 
            id: 1, 
            image: images.keys, 
            item_name: 'Keys', 
            lostNear: 'Red Building', 
            targetPage: 'itemDescription', 
            publishedDate: '2024-12-29', 
            username: 'JohnDoe', 
            contact_number: '1234567890',
            description: `Now is the winter of our discontent Made glorious summer by this sun
of York; And all the clouds that lour'd upon our house In the deep bosom of the ocean buried. Now are our brows bound with victorious wreaths; Our bruised arms hung up for monuments;
Our stern alarums changed to merry meetings, Our dreadful marches to delightful measures.
Grim-visaged war hath smooth'd his wrinkled front; And now, instead of mounting barded steeds To fright the souls of fearful adversaries, He capers nimbly in a lady's chamber To the lascivious pleasing of a lute.
But I, that am not shaped for sportive tricks, Nor made to court an amorous looking-glass; I, that
am rudely stamp'd, and want love's majesty To strut before a wanton
ambling nymph; I, that am curtail'd of this fair proportion,`
        },
        { 
            id: 2, 
            image: images.camera, 
            item_name: 'Camera', 
            lostNear: 'Knowledge Park', 
            targetPage: 'itemDescription', 
            publishedDate: '2024-12-29', 
            username: 'JaneSmith', 
            contact_number: '9876543210',
            description : "This camera was found near Red Building"
        },
        { 
            id: 3, 
            image: images.credit, 
            item_name: 'Credit Card', 
            lostNear: 'Library', 
            targetPage: 'DetailsPage', 
            publishedDate: '2024-12-28', 
            username: 'AliceBrown', 
            contact_number: '5555555555' 
        },
        { 
            id: 4, 
            image: images.headphones, 
            item_name: 'Headphones', 
            lostNear: 'IT Department', 
            targetPage: 'ProfilePage', 
            publishedDate: '2024-12-28', 
            username: 'BobGreen', 
            contact_number: '6666666666' 
        },
        { 
            id: 5, 
            image: images.credit, 
            item_name: 'Credit Card', 
            lostNear: 'Library', 
            targetPage: 'DetailsPage', 
            publishedDate: '2024-12-30', 
            username: 'AliceBrown', 
            contact_number: '5555555555' 
        },
        { 
            id: 6, 
            image: images.headphones, 
            item_name: 'Headphones', 
            lostNear: 'IT Department', 
            targetPage: 'ProfilePage', 
            publishedDate: '2024-12-30', 
            username: 'BobGreen', 
            contact_number: '6666666666' 
        },
    ];

    const groupedItems = items.reduce((acc, item) => {
        acc[item.publishedDate] = acc[item.publishedDate] || [];
        acc[item.publishedDate].push(item);
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
                                    key={item.id}
                                    className="bg-white w-64 rounded-lg mr-4 p-2 shadow-lg border-2 border-black"
                                >
                                    <Image
                                        source={item.image}
                                        className="w-full h-48 rounded-lg mb-2 "
                                        resizeMode="cover"
                                    />
                                    <Text className="text-xl font-psemibold mb-1 text-quadernary">{item.item_name}</Text>
                                    <Text className="text-m text-quadernary font-medium">Lost Near: {item.lostNear}</Text>
                                    {/* <Text className="text-m text-primary">Username: {item.username}</Text>
                                    <Text className="text-m primary">Contact: {item.contact_number}</Text> */}
                                    <TouchableOpacity onPress={() => navigation.navigate(item.targetPage , {
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
