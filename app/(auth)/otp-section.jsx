import React, { useState, useRef } from "react";
import {
View,
Text,
TextInput,
Alert,
TouchableOpacity,
ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { router } from "expo-router";

export default function App() {

const [otpVisible, setOtpVisible] = useState(false);
const [otp, setOtp] = useState(["", "", "", ""]); // 4-digit OTP
const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]; // Refs for OTP boxes
const[otpErr, setOtpErr] = useState('')

const handleSendOTP = (data) => {
	setOtpVisible(true); 
};

const handleOTPChange = (text, index) => {
	const newOtp = [...otp];
	newOtp[index] = text.replace(/[^0-9]/g, ""); // Ensure only numbers are entered
	setOtp(newOtp);

	// Automatically move to the next box if the current box is filled
	if (text && index < otpRefs.length - 1) {
	otpRefs[index + 1].current.focus();
	}

	// Automatically move back if the user deletes
	if (!text && index > 0) {
	otpRefs[index - 1].current.focus();
	}
};

const handleVerifyOTP = () => {
	const enteredOtp = otp.join("");
	if (enteredOtp.length !== 4) {
		setOtpErr( "Please enter the full 4-digit OTP.")
		return;
	}
	setOtpErr('')
	router.push('/forget-password')
};

	const mobileSchema = z.object({
		contact_number : z.string()
					.length(10, 'Phone number must be exactly 10 characters')
					.regex(/^\d{10}$/, 'Phone number must contain only digits'),
	})

	const {control, handleSubmit, formState:{errors}} = useForm({
		resolver : zodResolver(mobileSchema)
	})

return (
	<SafeAreaView className='flex-1 bg-tertiary flex-row justify-center items-center'>
		<ScrollView contentContainerStyle={{ flexGrow: 1 }} className='flex'>
			<View className='flex-1 flex-col p-4 items-center justify-center'>
				<Text
					className='text-[30px] relative bottom-[50px] right-[80px]'
				>Get Your otp</Text>
				<View className='flex flex-col items-center justify-center'>
					<Text 
						className='text-[20px] text-quaternary font-psemibold my-4'
					>Enter Phone Number</Text>

					<Controller
						control={control}
						name="contact_number"
						render={({field : {onChange, value}}) => (
							<TextInput
								className='bg-white h-[50px] w-[250px] border-[1px] border-quaternary rounded-[10px] pl-4 my-2'
								placeholder="Phone Number"
								keyboardType="numeric"
								maxLength={10}
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>

					{errors.contact_number && (
						<Text className='text-red-600'>{errors.contact_number.message}</Text>
					)}
					


					{!otpVisible && (
						<TouchableOpacity
							className='bg-primary h-[40px] w-[130px] rounded-[10px] justify-center my-5'
							onPress={handleSubmit(handleSendOTP)}
						>
							<Text
							className='text-white text-center'
							>Send OTP</Text>

						</TouchableOpacity>
					)}
				</View>

				{/* OTP Boxes Appear Below */}
				<View>
					{otpVisible && (
						<View
							className='items-center'
						>
						<Text
							className='text-[22px] text-quaternary font-psemibold my-4'
						>Enter OTP</Text>
						<View className='flex flex-row gap-[20px]'>
							{otp.map((digit, index) => (
							<TextInput
								key={index}
								ref={otpRefs[index]} // Assign ref to each input
								className='h-[50px] w-[50px] rounded-[10px] bg-white text-center text-quaternary border-secondary border-[2px] font-bold text-[18px]'
								keyboardType="numeric"
								maxLength={1}
								value={digit}
								onChangeText={(text) => handleOTPChange(text, index)}
							/>
							))}
						</View>
							{otpErr && (
								<Text className='text-red-600 my-4'>{otpErr}</Text>
							)}
						<TouchableOpacity
							className='h-[50px] w-[140px] bg-primary rounded-[10px] justify-center mt-[50px]'
							onPress={handleVerifyOTP}
						>
							<Text
								className='text-center text-white text-[18px] '
							>Verify OTP</Text>
						</TouchableOpacity>

						<TouchableOpacity
							className='h-[50px] w-[140px] bg-primary rounded-[10px] justify-center mt-[50px]'
							onPress={() => setOtpVisible(false)}
						>
							<Text
								className='text-center text-white text-[18px] '
							>Resend OTP</Text>
						</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</ScrollView>
	</SafeAreaView>

);
}
