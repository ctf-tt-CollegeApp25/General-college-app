import { View, Text } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withRepeat
} from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedView = Animated.createAnimatedComponent(View);

const SearchIcon = () => {
  const translateY = useSharedValue(-150); 
  const scale = useSharedValue(0.1); 
  const rotate =useSharedValue(0)

  useEffect(() => {
        translateY.value = withRepeat(withTiming(0, { duration: 3000 }), 1, false);
        scale.value = withTiming(1, { duration: 3000 }); // Scale up smoothly
        rotate.value = withTiming(315, {duration : 3000})
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }, {rotate : `${rotate.value}deg`}],
    rotate : rotate.value
  }));

  return (
    <View className="flex-1 flex-col justify-center items-center">
      <AnimatedView style={animatedStyle}>
        <Svg width={150} height={150} viewBox="0 0 24 24" fill="none">
          <Circle cx="11" cy="11" r="7" stroke="#38bdf8" strokeWidth="2" />
          <Path d="M18 18 L25 25" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        </Svg>
      </AnimatedView>
      <Text className="text-center text-[25px] m-[30px]">Don't fear</Text>
    </View>
  );
};

// import { View } from "react-native";
// import Svg, { Path, Rect, Circle } from "react-native-svg";
// import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
// import { useEffect } from "react";

// const AnimatedView = Animated.createAnimatedComponent(View);

// const SearchIcon = () => {
//   const translateY = useSharedValue(300); // Start from bottom

//   useEffect(() => {
//     translateY.value = withTiming(0, { duration: 4000 }); // Move up in 4 sec
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//   }));

//   return (
//     <View className="flex-1 flex-col justify-center items-center">
//       <AnimatedView style={animatedStyle}>
//         <Svg width={150} height={100} viewBox="0 0 100 60" fill="none">
//           <Rect x="10" y="20" width="80" height="30" stroke="#38bdf8" strokeWidth="3" rx="5" />
//           <Circle cx="25" cy="50" r="5" fill="#38bdf8" />
//           <Circle cx="75" cy="50" r="5" fill="#38bdf8" />
//           <Path d="M45 15 L55 5 L65 15" stroke="#38bdf8" strokeWidth="2" />
//         </Svg>
//       </AnimatedView>
//     </View>
//   );
// };

// export default EVIcon;


// import { View } from "react-native";
// import Svg, { Path, Circle, Rect } from "react-native-svg";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withRepeat,
//   Easing,
// } from "react-native-reanimated";
// import { useEffect } from "react";

// const AnimatedView = Animated.createAnimatedComponent(View);

// const SearchIcon = () => {
//   const translateY = useSharedValue(300); // Start off-screen at the bottom

//   useEffect(() => {
//     translateY.value = withTiming(0, {
//       duration: 5000,
//       easing: Easing.inOut(Easing.ease),
//     });
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//   }));

//   return (
//     <View className="flex-1 flex-col justify-center items-center">
//       <AnimatedView style={animatedStyle}>
//         <Svg width={200} height={100} viewBox="0 0 200 100" fill="none">
//           {/* Car Body */}
//           <Rect x="30" y="40" width="140" height="40" rx="10" fill="#38bdf8" />
//           <Circle cx="50" cy="85" r="10" fill="#333" />
//           <Circle cx="150" cy="85" r="10" fill="#333" />
//           {/* Windows */}
//           <Rect x="50" y="45" width="40" height="20" fill="#fff" opacity="0.8" />
//           <Rect x="110" y="45" width="40" height="20" fill="#fff" opacity="0.8" />
//           {/* Headlights */}
//           {/* <Path d="M170 60 L190 60" stroke="#ffeb3b" strokeWidth="4" strokeLinecap="round" /> */}
//         </Svg>
//       </AnimatedView>
//     </View>
//   );
// };

// export default EVVehicle;


// import { View } from "react-native";
// import Svg, { Path, Rect, Circle } from "react-native-svg";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withRepeat,
// } from "react-native-reanimated";
// import { useEffect } from "react";

// const SearchIcon = () => {
//   const translateY = useSharedValue(300);
//   const rotateX = useSharedValue(30);
  
//   useEffect(() => {
//     translateY.value = withTiming(0, { duration: 4000 });
//     rotateX.value = withRepeat(withTiming(-10, { duration: 2000 }), -1, true);
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateY: translateY.value },
//       { perspective: 600 },
//       { rotateX: `${rotateX.value}deg` },
//     ],
//   }));

//   return (
//     <View className="flex-1 justify-center items-center">
//       <Animated.View style={animatedStyle}>
//         <Svg width={150} height={100} viewBox="0 0 200 100" fill="none">
//           {/* Car Body */}
//           <Rect x="20" y="40" width="160" height="40" fill="#38bdf8" rx="10" />
          
//           {/* Roof */}
//           <Path d="M 50 40 Q 100 10, 150 40" fill="#1E3A8A" />
          
//           {/* Windows */}
//           <Rect x="60" y="25" width="30" height="15" fill="#93C5FD" />
//           <Rect x="110" y="25" width="30" height="15" fill="#93C5FD" />
          
//           {/* Wheels */}
//           <Circle cx="50" cy="80" r="10" fill="#1E293B" />
//           <Circle cx="150" cy="80" r="10" fill="#1E293B" />
//         </Svg>
//       </Animated.View>
//     </View>
//   );
// };

// export default EVIcon;


export default SearchIcon;
