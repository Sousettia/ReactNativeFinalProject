import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import icons from 'react-native-vector-icons'

const ProfileScreen = ({ navigation, route }: any): React.JSX.Element => {
  const [nickname, setNickname] = useState("");
  const [status, setStatus] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [uid, setUid] = useState("");

  const gotoHome = () => {
    navigation.navigate("Home");
  };

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  return (
    <ScrollView style={styles.container}
    showsVerticalScrollIndicator={false}>
      <Text style={styles.textTitle}>PROFILE</Text>
      <Image
        source={require("../assets/Image/CreateProfile.png")}
        resizeMode="contain"
        style={styles.myImage}
      />
      <Text style={styles.textStyle}>Nickname</Text>
      <TextInput
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
        placeholder=" NICKNAME"
      />
      <Text style={styles.textStyle}>Status</Text>
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder=" STATUS"
      />
      <Text style={styles.textStyle}>Gender</Text>

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

      <Text style={styles.textStyle}>Age</Text>

      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder=" AGE"
      />

      <Text style={styles.textStyle}>User-ID</Text>

      <TextInput
        style={styles.input}
        value={uid}
        onChangeText={setUid}
        placeholder=" USER-ID"
      />

      <Pressable
        style={[styles.button, styles.buttonLogout]}
        onPress={() => {
          gotoHome(); // เรียกใช้ฟังก์ชันการเปลี่ยนหน้าจอ
        }}
      >
        <Text style={styles.textLogout}>Log out</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileScreen;

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
    height: 120,
    marginTop: 40,
    marginBottom: 35,
  },
  textTitle: {
    marginTop: 50,
    marginBottom: 10,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 35,
  },
  textStyle: {
    borderRadius: 25,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 18,
    marginLeft: 20,
  },
  textLogout: {
    borderRadius: 25,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
  },

  button: {
    borderRadius: 25,
    paddingVertical: 3,
    paddingHorizontal: 20,
    elevation: 1,
    marginLeft: 110,
    marginRight: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLogout: {
    backgroundColor: "#a43939",
    marginTop: 25,
  },
  container: {
    flex: 1, // ทำให้ View ขยายเต็มหน้าจอ
    backgroundColor: "#69aeb6",
    padding: 20,
  },
  input: {
    color: "black",
    height: 40,
    borderRadius: 25,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#a4e1e7",
    fontSize: 15,
    fontWeight: "bold",
    borderColor: "#a4e1e7",
    borderWidth: 2, // ความหนาของขอบ
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
