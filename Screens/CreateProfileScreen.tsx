import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import icons from 'react-native-vector-icons'

const CreateProfileScreen = ({ navigation, route }: any): React.JSX.Element => {
  const [nickname, setNickname] = useState("");
  const [status, setStatus] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const gotoLogin = () => {
    navigation.navigate("Login");
  };

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>SKY SWAN</Text>
      <Text style={styles.TextWelcome}>WELCOME!!!</Text>
      <Text style={styles.TextCreate}>LET'S CREATE YOUR PROFILE</Text>

      <Image
        source={require("../assets/Image/Logo.png")}
        resizeMode="contain"
        style={styles.myImage}
      />

      <TextInput
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
        placeholder=" NICKNAME"
      />

      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder=" STATUS"
      />

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

      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder=" AGE"
      />

      <Pressable
        style={[styles.button, styles.buttonOpenConfirm]}
        onPress={() => {
          gotoLogin(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
        }}
      >
        <Text style={styles.textStyle}>Confirm</Text>
      </Pressable>
    </View>
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
    marginTop: 40,
  },
  container: {
    flex: 1, // ทำให้ View ขยายเต็มหน้าจอ
    backgroundColor: "#69aeb6",
  },
  input: {
    color: "#69aeb6",
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // To space out buttons evenly
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
});
