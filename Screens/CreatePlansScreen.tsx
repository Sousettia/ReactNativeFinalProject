import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Modal,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import icons from "react-native-vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Createplans from "../components/Createplans";
import Planid from "../components/Planid";

const CreatePlansScreen = ({ navigation, route }: any): React.JSX.Element => {
  const [planName, setPlanName] = useState("");
  const [budget, setBudget] = useState("");
  const [dateOnTrip, setDateOnTrip] = useState("");
  const [description, setDescription] = useState("");
  const [planId, setPlanId] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");

  const toggleModal = (plan: string) => {
    setSelectedButton(plan);
    setModalVisible(true);
  };

  const renderComponent = () => {
    if (selectedButton === "Create") {
      return <Createplans/>;
    } else if (selectedButton === "Add") {
      return <Planid/>;
    }
    return null;
  };
  const gotoHome = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.textTitle}>CREATE PLANS</Text>
      <Image
        source={require("../assets/Image/CreateProfile.png")}
        resizeMode="contain"
        style={styles.myImage}
      />
      <Text style={styles.textStyle}>Plan Name</Text>
      <TextInput
        style={styles.input}
        value={planName}
        onChangeText={setPlanName}
      />
      <Text style={styles.textStyle}>Budget</Text>
      <TextInput style={styles.input} value={budget} onChangeText={setBudget} />
      <Text style={styles.textStyle}>Date On Trip</Text>
      <TextInput
        style={styles.input}
        value={dateOnTrip}
        onChangeText={setDateOnTrip}
        placeholder=" MM/DD/YYYY"
      />

      <Text style={styles.textStyle}>Description</Text>
      <TextInput
        style={styles.description}
        multiline
        numberOfLines={7}
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => {setModalVisible(true), toggleModal("Create")}}>
        <Text style={styles.textButton}>Create Plan</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!setModalVisible);
        }}
        
      >
        <View style={styles.modalView}>
          {renderComponent()}
          <View style={styles.buttomView}>
          <TouchableOpacity
            style={styles.touchableOpacityCancel}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textButton}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacityConfirm}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textButton}>Confirm</Text>
          </TouchableOpacity>
          </View>
    </View>
      </Modal>
      <Text style={styles.textStyle}>Plan ID</Text>
      <TextInput style={styles.input} value={planId} onChangeText={setPlanId} />
      <TouchableOpacity 
          style={styles.button} 
          onPress={() => {setModalVisible(true), toggleModal("Add")}}>
          <Text style={styles.textButton}>Add ID</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreatePlansScreen;

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    marginTop:370,
  },
  modalText: {
    borderRadius: 25,
    fontWeight: "bold",
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    alignItems:'center'
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
    textAlign: "center",
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
  textButton: {
    borderRadius: 20,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  buttomView:{
    width: '100%',
    flexDirection: 'row'
  },
  touchableOpacityCancel:{
    flex:1,
    paddingVertical:10,
    alignItems: 'center',
    backgroundColor: "#c0c0c0",
    borderBottomLeftRadius: 20,
  },
  touchableOpacityConfirm:{
    flex:1,
    paddingVertical:10,
    alignItems: 'center',
    backgroundColor: "#69aeb6",
    borderBottomRightRadius: 20,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 3,
    paddingHorizontal: 23,
    elevation: 1,
    marginLeft: 110,
    marginRight: 110,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#30777d",
    marginBottom: 10,
  },
  container: {
    flex: 1, // ทำให้ View ขยายเต็มหน้าจอ
    backgroundColor: "#69aeb6",
  },
  description: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#a4e1e7",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    height: 125,
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
  },
});