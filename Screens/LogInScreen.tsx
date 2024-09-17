import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

const LogInScreen = ({
  navigation,
  route,
  onPress,
}: any): React.JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const goto1 = () => {
    navigation.navigate("Google");
  };

  const goto2 = () => {
    navigation.navigate("Facebook");
  };

  const goto3 = () => {
    navigation.navigate("X");
  };

  const goto4 = () => {
    navigation.navigate("Discord");
  };

  const goto5 = () => {
    navigation.navigate("Email");
  };

  const gotoHome = () => {
    navigation.navigate("Home");
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
          goto2(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
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
          goto3(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
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
          goto4(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
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

      <Text style={styles.textTitle}>____________ OR ____________</Text>

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
          gotoHome(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
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
    marginTop: 1,
  },
  textTitle: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 5, // ใช้ paddingVertical แทน padding เพื่อจัดตำแหน่งในแนวตั้ง
    paddingHorizontal: 20, // ใช้ paddingHorizontal เพื่อจัดตำแหน่งในแนวนอน
    elevation: 1,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
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
    marginTop: 20,
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
