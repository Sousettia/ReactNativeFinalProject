import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  Modal,
  Button,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";


const WelcomeScreen = ({ navigation , route}: any): React.JSX.Element => {

  const [modalVisible, setModalVisible] = useState(false);
  const [acountVisible, setAcountVisible] = useState(false);
  const [logInVisible, setLogInVisible] = useState(false);

  const gotoCreateAccout1 = () => {
    navigation.navigate("CreateAccout1");
  };

  const gotoLogin = () => {
    navigation.navigate("Login");
  };


  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Image/Logo.png")}
        resizeMode="contain"
        style={styles.myImage}
      />

      {/* Acount Button */}
      <Pressable
        style={[styles.button, styles.buttonOpenAcount]}
        onPress={() => {
          setModalVisible(true);
          gotoCreateAccout1(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
        }}
      >
        <Text style={styles.textStyleAcount}>Create an Account</Text>
      </Pressable>

      <Text style={styles.Line}></Text>

      {/* Log In Button */}
      <Pressable
        style={[styles.button, styles.buttonOpenLogIn]}
        onPress={() => {
          setModalVisible(true);
          gotoLogin(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
        }}
      >
        <Text style={styles.textStyleLogIn}>Login</Text>
      </Pressable>

      <Text style={styles.Line}></Text>

      <Text style={styles.text}>Begin with an existing account</Text>

      <View style={styles.buttonContent}>
      <AntDesign
            name="google"
            size={40}
            color="#ffffff"
            style={styles.icon}
          />
      <FontAwesome5
            name="facebook"
            size={40}
            color="#ffffff"
            style={styles.icon}
          />
      <FontAwesome6
            name="x-twitter"
            size={40}
            color="#ffffff"
            style={styles.icon}
          />
      <FontAwesome6
            name="discord"
            size={40}
            color="#ffffff"
            style={styles.icon}
          />
      </View>

    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  myImage: {
    width: "100%",
    height: 225,
    marginTop: 150,
    marginBottom: 100,
  },
  Line: {
    marginTop: 15,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 10, // ใช้ paddingVertical แทน padding เพื่อจัดตำแหน่งในแนวตั้ง
    paddingHorizontal: 20, // ใช้ paddingHorizontal เพื่อจัดตำแหน่งในแนวนอน
    elevation: 1,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center", // จัดตำแหน่งในแนวนอน
    justifyContent: "center", // จัดตำแหน่งในแนวตั้ง
  },
  buttonOpenAcount: {
    backgroundColor: "#ffffff",
  },
  buttonOpenLogIn: {
    backgroundColor: "#69aeb6",
    borderColor: "#ffffff", 
    borderWidth: 2, // ความหนาของขอบ
  },
  textStyleAcount: {
    color: "#69aeb6",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  textStyleLogIn: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
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
  buttonContent: {
    flexDirection: "row", // Arrange items in a row
    alignItems: "center", // Center items vertically
    justifyContent: "center", // Center content horizontally
    width: "100%", // Ensure button content takes full width
    marginTop: 20,
  },
  icon: {
    marginHorizontal: 15, // Provide horizontal spacing between icons
  },
});
