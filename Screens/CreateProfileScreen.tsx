import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Alert,
  Platform,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker"; // Import Image Picker
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateProfileScreen = ({ navigation, route }: any): React.JSX.Element => {
  const { username, email, password } = route.params;
  const [nickname, setNickname] = useState("");
  const [DoB, setDoB] = useState<Date | null>(null); // Initialize DoB as null
  const [gender, setGender] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for the selected image
  const [showDatePicker, setShowDatePicker] = useState(false); // Toggle for date pick
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlertModal = (message: string) => {
    setAlertMessage(message);
    setAlertModalVisible(true);
  };

  const pickImage = async () => {
    // Ask for permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showAlertModal('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  
    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only images
      allowsEditing: true, // Allow user to edit the image (crop)
      aspect: [4, 3], // Aspect ratio for cropping (optional)
      quality: 1, // Image quality (1 means highest)
    });
  
    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setSelectedImage(selectedImageUri); // Set the image URI for preview
  
      // Create FormData
      const formData = new FormData();
  
      // Append the image to FormData
      formData.append('image', {
        uri: selectedImageUri,
        type: 'image/jpeg', // Change to match your image format if needed
        name: 'uploaded_image.jpg',
      } as any); // Use 'as any' to bypass TypeScript type checking (if necessary)
  
      try {
        // Send POST request to the server
        const response = await fetch('http://192.168.1.192:5000/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        if (data.imageUrl) {
          console.log('Image uploaded:', data.imageUrl);
          // Handle the returned image URL as needed
        } else {
          console.log('Upload failed:', data.message);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  // Handle Date Picker change
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDoB(selectedDate); // Set the selected date
    }
    setShowDatePicker(false); // Hide the picker after selection
  };
  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://172.17.8.191:5000/api/auth/register",
        {
          username,
          email,
          password,
          nickname,
          DoB: DoB?.toISOString().split("T")[0], // Format DoB to YYYY-MM-DD
          gender,
        }
      );
      if (response.status === 200) {
        showAlertModal("Account created successfully!");
        console.log("Navigating to Login Screen...");
        navigation.navigate("Login");
      } else {
        showAlertModal("Failed to create account.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("JWT Secret: ", process.env.JWT_SECRET);
        console.log("Full Axios error object:", error);
        console.log("Axios error response:", error.response?.data);
        console.log("Axios error status:", error.response?.status);

        if (error.response && error.response.status === 400) {
          showAlertModal(
            "User already exists. Please try a different username or email."
          );
        } else {
          showAlertModal(
            `An error occurred during registration: ${
              error.response?.data || error.message
            }`
          );
        }
      } else {
        console.log("Unexpected error:", error);
        showAlertModal("An unexpected error occurred.");
      }
    }
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.textTitle}>SKY SWAN</Text>
      <Text style={styles.TextWelcome}>WELCOME!!!</Text>
      <Text style={styles.TextCreate}>LET'S CREATE YOUR PROFILE</Text>

      {/* Image that can be clicked to pick an image */}
      <Pressable onPress={pickImage} style={styles.imageContainer}>
        <Image
          source={
            selectedImage
              ? { uri: selectedImage } // Display the selected image
              : require("../assets/Image/CreateProfile.png") // Default image
          }
          style={styles.imageFrame}
          resizeMode="cover" // Use 'cover' to fill the frame, or 'contain' to fit inside
        />
      </Pressable>

      <TextInput
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
        placeholder=" NICKNAME"
      />
      {/* Date of Birth Picker */}
      <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={DoB ? styles.selectedDate : styles.placeholder}>
          {DoB ? DoB.toDateString() : "SELECT DATE OF BIRTH"}
        </Text>
      </Pressable>

      {/* Show DateTimePicker when required */}
      {showDatePicker && (
        <DateTimePicker
          value={DoB || new Date()} // Show current date if no date is selected
          mode="date"
          display="default"
          maximumDate={new Date()} // Ensuring DoB can't be in the future
          onChange={handleDateChange}
        />
      )}

      <View style={styles.genderContainer}>
        <Pressable
          style={[
            styles.radioButton,
            gender === "Male" && styles.selectedRadioButton,
          ]}
          onPress={() => handleGenderSelect("Male")}
        >
          {gender === "Male" && <View style={styles.radioButtonInner} />}
        </Pressable>
        <Text style={styles.genderText}>Male</Text>

        <Pressable
          style={[
            styles.radioButton,
            gender === "Female" && styles.selectedRadioButton,
          ]}
          onPress={() => handleGenderSelect("Female")}
        >
          {gender === "Female" && <View style={styles.radioButtonInner} />}
        </Pressable>
        <Text style={styles.genderText}>Female</Text>

        {/* <Pressable
          style={[
            styles.radioButton,
            gender === "Other" && styles.selectedRadioButton,
          ]}
          onPress={() => handleGenderSelect("Other")}
        >
          {gender === "Other" && <View style={styles.radioButtonInner} />}
        </Pressable>
        <Text style={styles.genderText}>Other</Text> */}
      </View>

      <TouchableOpacity
        style={[styles.button, styles.buttonOpenConfirm]}
        onPress={() => {
          handleRegister(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
        }}
      >
        <Text style={styles.textStyle}>Confirm</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={alertModalVisible}
        onRequestClose={() => setAlertModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{alertMessage}</Text>
          <View style={styles.buttomView}>
            <TouchableOpacity
              style={styles.touchableOpacityConfirm}
              onPress={() => setAlertModalVisible(false)}
            >
              <Text style={styles.textButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CreateProfileScreen;

const styles = StyleSheet.create({
  Line: {
    marginTop: 2,
  },
  icons: {
    fontSize: 25,
    color: "#6b8d71",
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
  },
  myImage: {
    width: "100%",
    height: 150,
    marginTop: 40,
    marginBottom: 35,
  },
  textTitle: {
    marginTop: 60,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
  },
  TextWelcome: {
    marginTop: 40,
    marginLeft: 30,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 25,
  },
  TextCreate: {
    marginTop: 15,
    marginLeft: 30,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 15,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 1,
    marginLeft: 110,
    marginRight: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOpenConfirm: {
    backgroundColor: "#30777d",
    marginTop: 25,
  },
  container: {
    flex: 1, // ทำให้ View ขยายเต็มหน้าจอ
    backgroundColor: "#69aeb6",
  },
  input: {
    color: "#000000",
    height: 40,
    borderRadius: 25,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#a4e1e7",
    fontSize: 15,
    fontWeight: "bold",
    borderColor: "#a4e1e7",
    borderWidth: 2, // ความหนาของขอบ
  },
  textStyle: {
    borderRadius: 25,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // To space out buttons evenly
    marginTop: 20,
    marginBottom: 10,
  },
  radioButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioButtonInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#30777d",
  },
  selectedRadioButton: {
    borderColor: "#30777d",
  },
  genderText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10, // Added margin to space out text from buttons
  },
  imageContainer: {
    alignSelf: "center",
    width: 150, // Set a fixed width for the frame
    height: 150, // Set a fixed height for the frame
    borderRadius: 75, // Rounded frame (optional)
    overflow: "hidden", // Ensure the image doesn't go outside the frame
    marginTop: 50,
    marginBottom: 15,
  },
  imageFrame: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    position: "absolute", // Position the placeholder in the input field
    left: 15, // Adjust to where you want the placeholder to appear
    top: "25%", // Vertically center the text
    color: "#4d4a4a", // Placeholder color (similar to system color)
    fontSize: 15, // Font size of the placeholder
    fontWeight: "bold",
    zIndex: 1, // Ensure the placeholder is above the TextInput
  },
  selectedDate: {
    position: "absolute", // Position the placeholder in the input field
    left: 15, // Adjust to where you want the placeholder to appear
    top: "25%", // Vertically center the text
    color: "#000000", // Placeholder color (similar to system color)
    fontSize: 15, // Font size of the placeholder
    fontWeight: "bold",
    zIndex: 1, // Ensure the placeholder is above the TextInput
  },
  touchableOpacityConfirm: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#69aeb6",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    marginTop: 370,
  },
  modalText: {
    borderRadius: 25,
    fontWeight: "bold",
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
  },
  buttomView: {
    width: "100%",
    flexDirection: "row",
  },
  textButton: {
    borderRadius: 20,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});
