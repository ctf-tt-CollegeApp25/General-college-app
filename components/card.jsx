import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence, 
  interpolateColor 
} from "react-native-reanimated";
// import { View } from "twrnc";

const AnimatedCard = () => {
  const animation = useSharedValue(0);
  const texts = ["General College app", "Lost and Found", "Campus Map"];
  const url = ['/', '/addItem', '/campusMap']
  const [index, setIndex] = useState(0);

  useEffect(() => {
    animation.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000 }),
        withTiming(0, { duration: 3000 })
      ),
      -1,
      true
    );
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
        transform: [{ scale: withTiming(animation.value ? 1.2 : 1) }]
    };
  });

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
      <Animated.View className="w-[200px] h-[150px] bg-secondary flex justify-center items-center" style={animatedStyle}>
        <TouchableOpacity className='flex-1 justify-center' onPress={() =>router.push(`${url[index]}`)}>
            <Text className="text-lg font-bold text-white">{texts[index]}</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default AnimatedCard;
