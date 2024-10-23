import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const CreateAccount2 = ({ navigation, route }: any): React.JSX.Element => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPasss] = useState("");

  const gotoCreateProfile = () => {
    navigation.navigate("CreateProfile", {
      username,
      email,
      password,
    });
  };

  // Validate user inputs
  const validateInputs = () => {
    if (!username || !email || !password || !confirmPass) {
      Alert.alert("Error", "Please fill in all the fields.");
      return false;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Invalid email format.");
      return false;
    }

    // Check if passwords match
    if (password !== confirmPass) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }

    return true;
  };
  // Handle user registration
  const handleRegister = async () => {
    if (!validateInputs()) return;
    // If validation passes, navigate to CreateProfileScreen
    gotoCreateProfile();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Image/Logo.png")}
        resizeMode="contain"
        style={styles.myImage}
      />
      <Text style={styles.textTitle}>Create an Account</Text>

      {/* เว้นบรรทัด */}
      <Text style={styles.Line}></Text>

      {/* ผู้ใช้*/}
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />

      {/* เว้นบรรทัด */}
      <Text style={styles.Line}></Text>

      {/* อีเมล*/}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
      />

      {/* เว้นบรรทัด */}
      <Text style={styles.Line}></Text>

      {/* รหัสผ่าน*/}
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />

      {/* เว้นบรรทัด */}
      <Text style={styles.Line}></Text>

      {/* ยืนยันรหัสผ่าน*/}
      <TextInput
        style={styles.input}
        value={confirmPass}
        onChangeText={setConfirmPasss}
        placeholder="Confirm-Password"
      />

      {/* เว้นบรรทัด */}
      <Text style={styles.Line}></Text>

      <Pressable
        style={[styles.button, styles.buttonOpenConfirm]}
        onPress={() => {
          handleRegister();
        }}
      >
        <Text style={styles.textStyle}>Confirm</Text>
      </Pressable>
    </View>
  );
};

export default CreateAccount2;

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
    height: 225,
    marginTop: 100,
    marginBottom: 50,
  },
  textTitle: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  Text: {
    fontSize: 20,
    color: "#6b8d71",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50,
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
    marginTop: 20,
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
});
