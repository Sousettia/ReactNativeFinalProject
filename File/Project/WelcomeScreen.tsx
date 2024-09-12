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


const WelcomeScreen = ({ navigation , route}: any): React.JSX.Element => {

  const [modalVisible, setModalVisible] = useState(false);
  const [acountVisible, setAcountVisible] = useState(false);
  const [logInVisible, setLogInVisible] = useState(false);

  const gotoAcount = () => {
    navigation.navigate("Acount");
  };

  const gotoLogin = () => {
    navigation.navigate("Login");
  };


  return (
    <View style={styles.container}>
      <Image
        source={require("../Picture/Logo.jpg")}
        resizeMode="contain"
        style={styles.myImage}
      />
      <Text style={styles.Line}></Text>

      {/* Acount Button */}
      <Pressable
        style={[styles.button, styles.buttonOpenAcount]}
        onPress={() => {
          setModalVisible(true);
          gotoAcount(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
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

      <Text style={styles.Line}></Text>

      <Text style={styles.text}>ใส่ icon ยังไงหว่า</Text>

    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  myImage: {
    width: "100%",
    height: 250,
    marginTop: 100,
    marginBottom: 20,
  },
  Line: {
    marginTop: 5,
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
});
