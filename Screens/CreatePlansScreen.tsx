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
    <View style={styles.container} >
        <View style={styles.headerContain}>
          <Text style={styles.screenTitle}>CREATE PLANS</Text>
        </View> 
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
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
       <Text style={styles.textStyle}>Date On Trip</Text>
      <TextInput
        style={styles.input}
        value={dateOnTrip}
        onChangeText={setDateOnTrip}
        placeholder=" MM/DD/YYYY"
      />
      </View>
      <View style={styles.contain}>
      <Text style={styles.textStyle1}>Budget</Text>
      <TextInput
          style={styles.budgetInput}
          value={budget}
          onChangeText={setBudget}
          placeholder="0.00"
          keyboardType="numeric"
        />
      <Text style={styles.textStyle1}>Description</Text>
      <TextInput
        style={styles.description}
        multiline
        numberOfLines={7}
        value={description}
        onChangeText={setDescription}
        textAlignVertical="top"
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
      <Text style={styles.textOr}>__________________ OR __________________</Text>
      <Text style={styles.textStyle1}>Plan ID</Text>
      <TextInput 
        style={styles.planInput} 
        value={planId} 
        onChangeText={setPlanId} />
      <TouchableOpacity 
          style={styles.button} 
          onPress={() => {setModalVisible(true), toggleModal("Add")}}>
          <Text style={styles.textButton}>Add ID</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

export default CreatePlansScreen;

const styles = StyleSheet.create({
  headerContain: {
    padding: 10,
    backgroundColor:'#30777d',
    alignItems:'center',
  },
  header: {
    padding: 10,
    backgroundColor:'#30777d',
    marginBottom:10,
  },
  contain:{
    marginTop:20
  },
  screenTitle:{
    marginTop: 50,
    marginBottom: 10,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 30,
  },
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
  textOr:{
    color: "#c3c3c3",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom:20,
    marginTop:20,
  },
  textStyle1: {
    borderRadius: 25,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 18,
    marginLeft: 20,
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
    backgroundColor: "#eeeeee",
  },
  description: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#eeeeee",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    height: 125,
    paddingTop: 20,
    borderColor: "#dddddd",
    borderWidth: 2, // ความหนาของขอบ
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
  budgetInput: {
    color: "#69aeb6", // Same blue color as the image text
    fontWeight: "bold",
    fontSize: 28,     // Larger font size for the amount
    textAlign: "right", // Align to the right
    height: 40,
    borderBottomWidth: 2, // Bottom border to mimic the line
    borderColor: "#E0E0E0", 
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  planInput: {
    fontWeight: "bold",
    fontSize: 20,     // Larger font size for the amount
    height: 40,
    borderWidth: 2, // Bottom border to mimic the line
    borderColor: "#E0E0E0", 
    marginRight: 20,
    marginLeft: 20,
    marginTop:10,
    marginBottom: 10,
  },
});