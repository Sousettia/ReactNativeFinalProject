import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { AuthContext } from "../auth-backend/context/AuthContext";

const LogInScreen = ({
  navigation,
  route,
  onPress,
}: any): React.JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  //const { login } = useContext(AuthContext); // Use login function from context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Basic validation
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.192:5000/api/auth/login",
        {
          username: username,
          password: password,
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Logged in successfully!");
        //login(response.data); // Use login function from context to set auth state
        navigation.navigate("Home"); // Navigate to the HomeStack
      } else {
        Alert.alert("Error", "Failed to log in.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 400) {
        Alert.alert("Error", "Invalid username or password.");
      } else {
        Alert.alert("Error", "An error occurred during login.");
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* รูปโลโก้ */}
      <Image
        source={require("../assets/Image/Logo.png")}
        resizeMode="contain"
        style={styles.myImage}
      />

      {/* Google Button */}
      <Pressable
        style={[styles.button, styles.buttonOpen]} // Apply specific Google button styling
        onPress={onPress}
      >
        <View style={styles.buttonContent}>
          <AntDesign
            name="google"
            size={30}
            color="#ffffff"
            style={styles.icon}
          />
          <Text style={styles.textStyle}>Continue with Google</Text>
        </View>
      </Pressable>

      {/* Facebook Button */}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.buttonContent}>
          <FontAwesome5
            name="facebook"
            size={30}
            color="#ffffff"
            style={styles.icon}
          />
          <Text style={styles.textStyle}>Continue with Facebook</Text>
        </View>
      </Pressable>

      {/* X Button */}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.buttonContent}>
          <FontAwesome6
            name="x-twitter"
            size={30}
            color="#ffffff"
            style={styles.icon}
          />
          <Text style={styles.textStyle}>Continue with X</Text>
        </View>
      </Pressable>

      {/* Discord Button */}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.buttonContent}>
          <FontAwesome6
            name="discord"
            size={30}
            color="#ffffff"
            style={styles.icon}
          />
          <Text style={styles.textStyle}>Continue with Discord</Text>
        </View>
      </Pressable>

      <Text style={styles.Line2}></Text>

      <Text style={styles.textTitle}>________________ OR ________________</Text>

      <Text style={styles.Line2}></Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <FontAwesome5
          name="user"
          size={20}
          color="#69aeb6"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
      </View>

      <Text style={styles.Line2}></Text>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#69aeb6"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
      </View>

      <Pressable
        style={[styles.buttonLogin, styles.buttonOpenLogin]}
        onPress={() => {
          handleLogin();
        }}
      >
        <Text style={styles.textStyle}>Login</Text>
      </Pressable>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  myImage: {
    width: "100%",
    height: 225,
    marginTop: 85,
    marginBottom: 20,
  },
  Line: {
    marginTop: 10,
  },
  Line2: {
    marginTop: 0,
  },
  textTitle: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 5, // ใช้ paddingVertical แทน padding เพื่อจัดตำแหน่งในแนวตั้ง
    paddingHorizontal: 20, // ใช้ paddingHorizontal เพื่อจัดตำแหน่งในแนวนอน
    elevation: 1,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 5,
    alignItems: "center", // จัดตำแหน่งในแนวนอน
    justifyContent: "center", // จัดตำแหน่งในแนวตั้ง
  },
  buttonOpen: {
    borderColor: "#ffffff", // ขอบสีขาว
    borderWidth: 4, // ความหนาของขอบ
    backgroundColor: "#69aeb6",
  },
  textStyle: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 17,
  },
  container: {
    flex: 1, // ทำให้ View ขยายเต็มหน้าจอ
    backgroundColor: "#69aeb6",
  },
  text: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 25,
    backgroundColor: "#a4e1e7",
    borderColor: "#a4e1e7",
    borderWidth: 0,
  },
  input: {
    flex: 1,
    color: "#69aeb6",
    height: 40,
    marginLeft: 40, // Add margin to prevent text from overlapping the icon
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  inputIcon: {
    position: "absolute",
    left: 10,
  },
  buttonLogin: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 1,
    marginLeft: 110,
    marginRight: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOpenLogin: {
    backgroundColor: "#30777d",
    marginTop: 15,
  },
  icon: {
    marginRight: 10,
  },
  buttonContent: {
    flexDirection: "row", // Arrange items in a row
    alignItems: "center", // Center items vertically
    justifyContent: "flex-start", // Align content to the left
    width: "100%", // Ensure button content takes full width
  },
});
