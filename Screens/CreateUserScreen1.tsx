import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";

const CreateUserScreen1 = ({ navigation, route }: any): React.JSX.Element => {
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

  const goto5 = () => {
    navigation.navigate("Email");
  };

  return (
    <View style={styles.container}>
      {/* รูปโลโก้ */}
      <Image
        source={require("../Picture/Logo.jpg")}
        resizeMode="contain"
        style={styles.myImage}
      />

      {/* เว้นบรรทัด */}
      <Text style={styles.Line}></Text>

      <Text style={styles.textTitle}>Create an Account</Text>

      {/* เว้นบรรทัด */}
      <Text style={styles.Line}></Text>

      {/* Google Button */}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
          goto1(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
        }}
      >
        <Text style={styles.textStyle}>Continue with Google</Text>
      </Pressable>

      {/* Facebook Button */}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
          goto2(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
        }}
      >
        <Text style={styles.textStyle}>Continue with Facebook</Text>
      </Pressable>

      {/* X Button */}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
          goto3(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
        }}
      >
        <Text style={styles.textStyle}>Continue with X</Text>
      </Pressable>

      {/* Discord Button */}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
          goto4(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
        }}
      >
        <Text style={styles.textStyle}>Continue with Discord</Text>
      </Pressable>

      {/* เว้นบรรทัด */}
      <Text style={styles.Line}></Text>

      {/* E-mail Button */}
      <Pressable
        style={[styles.button, styles.buttonOpenEmail]}
        onPress={() => {
          setModalVisible(true);
          goto5(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
        }}
      >
        <Text style={styles.textStyle}>Sign Up with E-mail address</Text>
      </Pressable>
    </View>
  );
};

export default CreateUserScreen1;

const styles = StyleSheet.create({
  myImage: {
    width: "100%",
    height: 250,
    marginTop: 100,
    marginBottom: 20,
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
    borderRadius: 25,
    paddingVertical: 10, // ใช้ paddingVertical แทน padding เพื่อจัดตำแหน่งในแนวตั้ง
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
    borderWidth: 2, // ความหนาของขอบ
    backgroundColor: "#69aeb6",
  },
  textStyle: {
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
  buttonOpenEmail: {
    backgroundColor: "#30777d",
  },
});
