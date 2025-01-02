import { View, Text, ScrollView, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker'
import { SafeAreaView } from 'react-native-safe-area-context';
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import * as ImagePicker from 'expo-image-picker'

const AddMarkString = ({sMark, onDel}) => {
	return(
		<View className='flex flex-row justify-between items-center h-[40px] w-[300px] border-[1px] bg-white border-quaternary rounded-[10px]'>
			<Text className='w-[200px] ml-2'>{sMark}</Text>
			<TouchableOpacity
				onPress={onDel}
				className='w-10 h-full bg-primary rounded-[10px] justify-center'
			>
				<Text className='text-[20px] text-center text-white'>X</Text>
			</TouchableOpacity>
		</View>
	)
}

const AddItemPage = () => {

	
	const [special_marks, setSpecialMarks] = useState([]);
	const[open, setOpen] = useState(false)
	const[mark, setMark] = useState('')
	const[markErr, setMarkErr] = useState(false)
	const[imageSuccess, setImageSuccess] = useState(false);
	
	const[image, setImage] = useState(null)

	const postItemSchema = z.object({
		item_name: z.string().min(5, 'Item must contain atleast 5 Characters'),
		user_name : z.string().min(5, 'User must contain atleast 5 Chracters'),
		date_of_upload : z.date(),
		contact_number: z.string()
			.length(10, 'Phone number must be exactly 10 characters')
			.regex(/^\d{10}$/, 'Phone number must contain only digits'),
		location : z.string().min(5, 'Location Must contain atleast 5 characters'),
		reason: z.string().refine((value) => (value === 'lost' || value === 'found'),
			{message : "The reason should be either lost or found"}),
		description : z.string().nonempty('Description should be provided'),
		special_marks : z.array(z.string().min(5, 'Special mark should be atleast 5 characters')).min(1, 'Please provide atleast one Special mark')
	})

	const {control, handleSubmit,setValue, formState:{errors}, reset} = useForm({
		resolver: zodResolver(postItemSchema),
		defaultValues : {special_marks : special_marks, date_of_upload : new Date()}
	})

	const handleSpecialMark = (mark) => {
		if(mark.length < 5){
			setMarkErr(true)
			return
		}

		setMarkErr(false);
		const updatedVal = [...special_marks, mark]
		setSpecialMarks(updatedVal)
		setValue('special_marks', updatedVal)
		setMark('')
	}

	const handleDelete = (mark) => {
		const updatedVal = special_marks.filter((m) => m !== mark)
		setSpecialMarks(updatedVal)
		setValue('special_marks', updatedVal)
	}

	const onsubmit = (data) => {
		if(!image){
			setImageSuccess(true);
			return;
		}
		setImageSuccess(false);
		console.log(data)
		console.log(image)
		reset()
		setSpecialMarks([])
		setImage(null)
	}

	const pickImage = async() => {
		const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()

		if(status !== 'granted'){
			console.log("Permission is not granted")
			return
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [5, 5],
			quality: 1,
		})

		if (!result.canceled) {
			setImage(result.assets[0].uri); // Set the selected image URI
		}
	}

	const takePhoto = async () => {
		const {status} = await ImagePicker.requestCameraPermissionsAsync()

		if(status !== 'granted'){
			console.log("Permission is not granted")
			return
		}

		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [5, 5],
			quality: 1,
		});
	
		if (!result.canceled) {
		setImage(result.assets[0].uri); // Set the taken photo URI
		}
	}

	const Textstyle = 'text-[18px] my-2 text-secondary font-pmedium'
	const InputStyle = ' bg-white h-[45px] w-[250px] border-[1px] border-quaternary rounded-[10px] pl-4 my-2'

	//5700FF  ---  1A1A1A --- 4D4D4D

	return (
		<SafeAreaView className="flex-1 bg-tertiary flex-row justify-center items-center">
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex">
				<View className="flex-1 flex-col p-4 items-center justify-center">

					<Text className='text-[30px] font-psemibold text-secondary text-center m-5'>Report Lost or Found</Text>

					<View className='flex-1 flex-col justify-center ml-4'>

						<View>
							<Text className={Textstyle}>Item Name : </Text>
							<Controller
								control={control}
								name='item_name'
								render={({field :{onChange, value, onBlur}}) => (
									<TextInput
										className={InputStyle}
										onChangeText={onChange}
										value={value}
										onBlur={onBlur}
									/>
								)}
								/>
							{errors.item_name && (
								<Text className='text-red-600'>{errors.item_name.message}</Text>
							)}
						</View>
						<View>
							<Text className={Textstyle}>User Name : </Text>
							<Controller
								control={control}
								name='user_name'
								render={({field : { onBlur, onChange, value}}) => (
									<TextInput
										className={InputStyle}
										onChangeText={onChange}
										value={value}
										onBlur={onBlur}
									/>
								)}
							/>
							{errors.user_name && (
								<Text className='text-red-600'>{errors.user_name.message}</Text>
							)}
						</View>
						<View>
							<Text className={Textstyle}>Date of Upload : </Text>
							<Controller
								control={control}
								name='date_of_upload'
								render={({field : { onChange, value}}) => (
									<View>
										<TouchableOpacity onPress={() => setOpen(true)}>
											<Text className='pt-[13px] pl-4  bg-white border-[1px] border-quaternary rounded-[10px] h-[45px] w-[250px]'>
												{value ? new Date(value).toLocaleString() : "Select a date"}
											</Text>
										</TouchableOpacity>
										<DateTimePickerModal
											isVisible={open}
											mode="datetime"
											onConfirm={(date) => {
												setOpen(false);
												onChange(date);
											}}
											onCancel={() => setOpen(false)}
															/>
									</View>
								)}
							/>
							{errors.date_of_upload && (
								<Text className='text-red-600'>{errors.date_of_upload.message}</Text>
							)}
						</View>
						<View>
							<Text className={Textstyle}>Location of Found : </Text>
							<Controller
								control={control}
								name='location'
								render={({field : { onBlur, onChange, value}}) => (
									<TextInput
										className={InputStyle}
										onChangeText={onChange}
										value={value}
										onBlur={onBlur}
									/>
								)}
							/>
							{errors.location && (
								<Text className='text-red-600'>{errors.location.message}</Text>
							)}
						</View>
						<View>
							<Text className={Textstyle}>Contact Number : </Text>
							<Controller
								control={control}
								name='contact_number'
								render={({field : { onBlur, onChange, value}}) => (
									<TextInput
										className={InputStyle}
										onChangeText={onChange}
										value={value}
										onBlur={onBlur}
									/>
								)}
							/>
							{errors.contact_number && (
								<Text className='text-red-600'>{errors.contact_number.message}</Text>
							)}
						</View>
						<View>
							<Text className={Textstyle}>Lost or Found : </Text>
							
							<Controller
								name="reason"
								control={control}
								defaultValue=""
								render={({ field: { onChange, value } }) => (
									<View className="h-[60px] w-[200px] bg-white rounded-[20px] border-[1px] border-quaternary">
										<Picker
											selectedValue={value}
											onValueChange={onChange} // Update value when picker changes
											style={{ flex:1 }}
											>
											<Picker.Item label="Select Reason" value=""/>
											<Picker.Item label="Lost" value="lost"/>
											<Picker.Item label="Found" value="found" />
										</Picker>
									</View>
								)}
							/>
							{errors.reason && (
								<Text className='text-red-600'>{errors.reason.message}</Text>
							)}
						</View>
						<View>
							<Text className={Textstyle}>Special Marks : </Text>
							<View className='flex flex-row gap-x-[10px]'>
								<TextInput
									className={InputStyle}
									onChangeText={setMark}
									value={mark}
								/>
								<TouchableOpacity
									className='h-[35px] w-[80px] mt-[13px] bg-primary text-tertiary rounded-[5px] justify-center items-center'
									onPress={() => handleSpecialMark(mark)}
								>
									<Text className='text-center text-white'>Add Mark</Text>
								</TouchableOpacity>
							</View>
							{errors.special_marks && (
								<Text className='text-red-600'>{errors.special_marks.message}</Text>
							)}
							{markErr && (
								<Text className='text-red-600'>Special Mark nust contain atleast 5 characters</Text>
							)}
							{special_marks.map((m, index) => (
								<View key={index}>
									<AddMarkString sMark={m} onDel={() => handleDelete(m)}/>
									<Text>{'\n'}</Text>
								</View>
							))}
						</View>
						<View>
							<Text className={Textstyle}>Description : </Text>
							<Controller
								control={control}
								name='description'
								render={({field : { onBlur, onChange, value}}) => (
									<TextInput
										className ='border-b-[2px] w-[300px]'
										onChangeText={onChange}
										value={value}
										onBlur={onBlur}
										multiline={true}
									/>
								)}
							/>
							{errors.description && (
								<Text className='text-red-600'>{errors.description.message}</Text>
							)}
						</View>
						
						<View className='flex flex-row justify-center'>
							<TouchableOpacity
								className='bg-primary h-[50px] w-[150px] rounded-[10px] justify-center m-5'
								onPress={pickImage}
							>
								<Text className='text-white text-center'>Upload Image</Text>
							</TouchableOpacity>
							<TouchableOpacity
								className='bg-primary h-[50px] w-[150px] rounded-[10px] justify-center m-5'
								onPress={takePhoto}
							>
								<Text className='text-white text-center'>Take Photo</Text>
							</TouchableOpacity>
						</View>
						{imageSuccess && (
							<Text className='text-red-600'>Please upload image</Text>
						)}
						{image && <Image
							source={{ uri: image }}
							className='h-[250px] w-[250px] ml-12 my-2'
						/>}
										
						
						<View className='flex flex-row justify-center'>
							<TouchableOpacity
								className='bg-primary  h-[50px] w-[150px] rounded-[10px] justify-center mt-6'
								activeOpacity={0.7}
								onPress={handleSubmit(onsubmit)}
								>
								<Text className='text-center text-white'>Post</Text>
							</TouchableOpacity>
						</View>
					</View>

				</View>
			</ScrollView>
		</SafeAreaView>
	);
	};

export default AddItemPage;
