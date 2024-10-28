import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppSelector } from "../auth-backend/redux-toolkit/hooks";
import { selectAuthState } from "../auth-backend/auth/auth-slice";
import axios from "axios";
import { addPlanToUser } from "../auth-backend/services/userplan-service";

const CreatePlansScreen = ({ navigation, route }: any): React.JSX.Element => {
  const { profile } = useAppSelector(selectAuthState);

  const [planName, setPlanName] = useState("");
  const [budget, setBudget] = useState("");
  const [dateOnTrip, setDateOnTrip] = useState<Date | null>(null);
  const [description, setDescription] = useState("");
  const [planId, setPlanId] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // Utility function to generate a 5-character plan ID
  const generatePlanId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let planId = "";
    for (let i = 0; i < 5; i++) {
      planId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return planId;
  };

  // Handle Date Picker change
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDateOnTrip(selectedDate); // Set the selected date
    }
    setShowDatePicker(false); // Hide the picker after selection
  };

  // Format date for display
  const formatDate = (dateOnTrip: Date) => {
    if (!dateOnTrip) return "";
    const d = new Date(dateOnTrip);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;
  };

  const handleBudgetChange = (text: string) => {
    // Remove any non-numeric characters and THB symbol
    const numericValue = text.replace(/[^0-9]/g, "");
    setBudget(numericValue);
  };

  // Format the budget for display with THB
  const formatBudget = (value: string) => {
    if (!value) return "";
    const number = parseInt(value, 10);
    // Format with commas and add THB
    return `${number.toLocaleString("th-TH")} THB`;
  };

  const showAlertModal = (message: string) => {
    setAlertMessage(message);
    setAlertModalVisible(true);
  };

  const handleCreatePlan = async () => {
    // Form validation
    if (!planName.trim()) {
      showAlertModal("Please enter a plan name");
      return;
    }

    if (!dateOnTrip) {
      showAlertModal("Please select a date for the trip");
      return;
    }

    if (!budget) {
      showAlertModal("Please enter a budget");
      return;
    }

    // Generate a new plan ID
    const newPlanId = generatePlanId();

    // Get creator ID from profile
    const creatorId = profile?._id;

    if (!creatorId) {
      showAlertModal("User profile not found");
      return;
    }

    try {
      const response = await axios.post(
        "http://172.17.8.191:5000/api/plans/create",
        {
          planId: newPlanId,
          planName: planName.trim(),
          dateOnTrip: dateOnTrip.toISOString().split("T")[0], // Format date to YYYY-MM-DD
          budget: parseInt(budget.replace(/[^0-9]/g, "")), // Remove non-numeric chars and convert to number
          description: description.trim(),
          creator: creatorId,
        }
      );

      if (response.status === 201) {
        // Clear the form
        setPlanName("");
        setBudget("");
        setDateOnTrip(null);
        setDescription("");
        setPlanId("");

        // Close the modal if it's open
        setModalVisible(false);

        showAlertModal("Plan created successfully!");
      } else {
        showAlertModal("Failed to create plan.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("Full Axios error object:", error);
        console.log("Axios error response:", error.response?.data);
        console.log("Axios error status:", error.response?.status);

        showAlertModal(
          error.response?.status === 400
            ? "Invalid plan data. Please check your input and try again."
            : `An error occurred while creating the plan: ${
                error.response?.data?.message || error.message
              }`
        );
      } else {
        console.log("Unexpected error:", error);
        showAlertModal("An unexpected error occurred while creating the plan.");
      }
    }
  };
  const handleAddID = async () => {
    try {
      await addPlanToUser(profile?._id, planId); // Calls your addPlanToUser service
      showAlertModal("Plan added to user successfully.");
    } catch (error) {
      showAlertModal("Please Input Plan ID");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContain}>
        <Text style={styles.screenTitle}>CREATE PLANS</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={require("../assets/Image/latest.png")}
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
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={dateOnTrip ? styles.dateinput : styles.placeholder}>
              {dateOnTrip ? formatDate(dateOnTrip) : "SELECT DATE"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dateOnTrip || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <Text style={styles.textStyle1}>Budget</Text>
        <View style={styles.contain}>
          <TextInput
            style={[
              styles.budgetInput,
              // Add right padding to prevent text overlapping with THB
              { paddingRight: 15 },
            ]}
            value={formatBudget(budget)}
            onChangeText={handleBudgetChange}
            placeholder="0.00"
            keyboardType="numeric"
            placeholderTextColor="#69aeb6"
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
            onPress={() => {
              setModalVisible(true), handleCreatePlan();
            }}
          >
            <Text style={styles.textButton}>Create Plan</Text>
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={alertModalVisible}
            onRequestClose={() => setAlertModalVisible(false)}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{alertMessage}</Text>
              <View style={styles.buttomView}>
                <TouchableOpacity
                  style={styles.touchableOpacityConfirm}
                  onPress={() => setAlertModalVisible(false)}
                >
                  <Text style={styles.textButton}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={styles.textOr}>
            __________________ OR __________________
          </Text>
          <Text style={styles.textStyle1}>Plan ID</Text>
          <TextInput
            style={styles.planInput}
            value={planId}
            onChangeText={setPlanId}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(true);
              handleAddID();
            }}
          >
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
    backgroundColor: "#30777d",
    alignItems: "center",
  },
  header: {
    padding: 10,
    backgroundColor: "#30777d",
    marginBottom: 10,
  },
  contain: {
    marginTop: 20,
  },
  screenTitle: {
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
    justifyContent: "center",
    marginTop: 370,
  },

  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
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
  textOr: {
    color: "#c3c3c3",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
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
  buttomView: {
    width: "100%",
    flexDirection: "row",
  },
  touchableOpacityConfirm: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#69aeb6",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
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
  dateinput: {
    color: "black",
    height: 40,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  placeholder: {
    position: "absolute", // Position the placeholder in the input field
    left: 15, // Adjust to where you want the placeholder to appear
    top: "25%", // Vertically center the text
    color: "#4d4a4a", // Placeholder color (similar to system color)
    fontSize: 15, // Font size of the placeholder
    fontWeight: "bold",
    zIndex: 1, // Ensure the placeholder is above the TextInput
  },
  budgetInput: {
    color: "#69aeb6", // Same blue color as the image text
    fontWeight: "bold",
    fontSize: 28, // Larger font size for the amount
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
    fontSize: 20, // Larger font size for the amount
    height: 40,
    borderWidth: 2, // Bottom border to mimic the line
    borderColor: "#E0E0E0",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  modalText: {
    borderRadius: 25,
    fontWeight: "bold",
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
  },
});
