import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";

const register = async (username, email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      username,
      email,
      password,
    });
    const { token } = response.data;
    console.log('Registration successful, token:', token);
    // Store token and navigate to Home
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.msg || error.message);
  }
};


const CreateAccount1 = ({
  navigation,
  route,
  onPress,
}: any): React.JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);

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

  const gotoCreateAccount2 = () => {
    navigation.navigate("CreateAccount2");
  };

  return (
    <View style={styles.container}>
      {/* รูปโลโก้ */}
      <Image
        source={require("../assets/Image/Logo.png")}
        resizeMode="contain"
        style={styles.myImage}
      />

      <Text style={styles.textTitle}>Create an Account</Text>

      {/* เว้นบรรทัด */}
      <Text style={styles.Line}></Text>

      {/* Google Button */}
      <Pressable
        style={[styles.button, styles.buttonOpen]} // Apply specific Google button styling
        onPress={() => {
          setModalVisible(true);
          goto1(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
        }}
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

      {/* เว้นบรรทัด */}
      <Text style={styles.Line}></Text>

      {/* E-mail Button */}
      <Pressable
        style={[styles.buttonEmail, styles.buttonOpenEmail]}
        onPress={() => {
          setModalVisible(true);
          gotoCreateAccount2(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
        }}
      >
        <Text style={styles.textStyle}>Sign Up with E-mail address</Text>
      </Pressable>
    </View>
  );
};

export default CreateAccount1;

const styles = StyleSheet.create({
  myImage: {
    width: "100%",
    height: 225,
    marginTop: 100,
    marginBottom: 50,
  },
  Line: {
    marginTop: 10,
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
  buttonEmail: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 1,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOpen: {
    borderColor: "#ffffff", // ขอบสีขาว
    borderWidth: 4, // ความหนาของขอบ
    backgroundColor: "#69aeb6",
  },
  textStyle: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
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
  buttonOpenEmail: {
    backgroundColor: "#30777d",
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
