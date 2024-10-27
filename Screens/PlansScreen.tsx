import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAllPlans } from "../auth-backend/services/plan-service";
import { useAppDispatch } from "../auth-backend/redux-toolkit/hooks";
import { setPlans } from "../auth-backend/auth/plan-slice";

interface oldPlansItem {
  id: string;
  title: string;
  budget: number;
  date: string;
  description: string;
}

type RenderItemProps = { item: oldPlansItem };

const PlansScreen = () => {
  const dispatch = useAppDispatch();
  const [oldplans, setOldPlans] = useState<oldPlansItem[]>([
    {
      id: "1",
      title: "Camp Trip",
      budget: 3000,
      date: "8/16/2025",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<oldPlansItem | null>(null);
  const [friends, setFriends] = useState<string[]>([]);
  const [newFriendName, setNewFriendName] = useState(""); // New state for friend input
  const [activityNames, setActivityNames] = useState<string[]>([]);
  const [activityCosts, setActivityCosts] = useState<string[]>([]);
  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityCost, setNewActivityCost] = useState("");

  // Function to add a new activity
  const addActivity = () => {
    if (newActivityName.trim() && newActivityCost.trim()) {
      setActivityNames((prevNames) => [...prevNames, newActivityName]);
      setActivityCosts((prevCosts) => [...prevCosts, newActivityCost]);
      setNewActivityName(""); // Clear name input
      setNewActivityCost(""); // Clear cost input
    } else {
      console.log("Activity name and cost cannot be empty.");
    }
  };

  // Function to remove an activity
  const removeActivity = (index: number) => {
    setActivityNames((prevNames) => prevNames.filter((_, i) => i !== index));
    setActivityCosts((prevCosts) => prevCosts.filter((_, i) => i !== index));
  };
  const addFriend = () => {
    if (newFriendName.trim()) {
      setFriends((prevFriends) => [...prevFriends, newFriendName]);
      setNewFriendName(""); // Clear the input after adding
      console.log("Added friend:", newFriendName);
    } else {
      console.log("Friend name cannot be empty.");
    }
  };
  // Function to remove a friend from the list
  const removeFriend = (friendToRemove: string) => {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend !== friendToRemove)
    );
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getAllPlans();
        if (response && response.data) {
          console.log("Fetched plans:", response.data); // Log fetched plans

          // Map the fetched data to match the oldPlansItem interface
          const newPlans = response.data.map((plan: any) => ({
            id: plan.planId,
            title: plan.planName,
            budget: plan.budget,
            date: new Date(plan.dateOnTrip).toLocaleDateString("en-GB"),
            description: plan.description,
          }));
          // Replace the old plans with the newly fetched plans
          setOldPlans(newPlans);
          dispatch(setPlans(response.data)); // Optional: Set plans in the global state
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans(); // Fetch plans on component mount
  }, [dispatch]);

  const updatePlanBudget = (updatedBudget: string) => {
    if (selectedPlan) {
      const budgetValue = parseFloat(updatedBudget);
      const validBudget = isNaN(budgetValue) ? 0 : budgetValue; // Set to 0 if NaN
      const updatedPlans = oldplans.map((oldplan) =>
        oldplan.id === selectedPlan.id
          ? { ...oldplan, budget: validBudget } // Use validBudget
          : oldplan
      );
      setOldPlans(updatedPlans);
    }
  };

  const openModal = (item: oldPlansItem) => {
    setSelectedPlan(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setDescription("");
    setModalVisible(false);
  };

  const _renderItem = ({ item }: RenderItemProps) => (
    <TouchableOpacity
      style={styles.planContainer}
      onPress={() => openModal(item)}
    >
      <Text style={styles.planTitle}>{item.title}</Text>
      <Text style={styles.planDetail}>{item.budget}</Text>
      <Text style={styles.planDetail}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>PLANS</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={oldplans}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListHeaderComponent={() => (
            <View>
              <Text style={styles.textTitle}>YOUR CREATE PLANS</Text>
            </View>
          )}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.box}>
            <ScrollView contentContainerStyle={styles.modalContent}
            showsVerticalScrollIndicator={false}>
            <Pressable onPress={closeModal}>
              <Text style={styles.closeButton}>X</Text>
            </Pressable>
            <Text style={styles.textModalTitle}>{selectedPlan?.title}</Text>
            <View style={styles.textView}>
              <Text style={styles.text}>Budget : </Text>
              <TextInput
                style={styles.textResult}
                value={selectedPlan?.budget.toString()} // Convert to string for display
                editable={true} // Allow editing
                onChangeText={(newText) => {
                  if (selectedPlan) {
                    updatePlanBudget(newText); // Update the plan's budget
                    setSelectedPlan({
                      ...selectedPlan,
                      budget: parseFloat(newText) || 0,
                    }); // Set to 0 if parsing fails
                  }
                }}
              />
              <Text style={styles.textResult}> baht</Text>
              {/* Non-editable suffix */}
              <Ionicons
                style={styles.editText}
                name="pencil-outline"
                size={20}
                color="white"
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>Date on trip : </Text>
              <Text style={styles.textResult}>{selectedPlan?.date}</Text>
              <Ionicons
                style={styles.editText}
                name="pencil-outline"
                size={20}
                color="white"
              />
            </View>
            <Text style={styles.text}>Description :</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.description}
                value={selectedPlan?.description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            <Text style={styles.text}>Participants :</Text>
            <View style={styles.friendsContainer}>
              {friends.map((friend, index) => (
                <View key={index} style={styles.friendItem}>
                  <Text style={styles.friendName}>{friend}</Text>
                  <Pressable onPress={() => removeFriend(friend)}>
                    <Ionicons name="close-circle" size={20} color="#a43939" />
                  </Pressable>
                </View>
              ))}
            </View>
            <View style={styles.inputFriendContainer}>
              <TextInput
                style={styles.friendInput}
                placeholder="Enter friend's name"
                value={newFriendName}
                onChangeText={setNewFriendName}
              />
              <Pressable onPress={addFriend} style={styles.addButton}>
                <Ionicons name="add" size={24} color="white" />
              </Pressable>
            </View>
            
            <Text style={styles.text}>Add Activities :</Text>
            {/* Input for Activity Name */}
            <TextInput
              style={styles.input}
              placeholder="Enter activity name"
              value={newActivityName}
              onChangeText={setNewActivityName}
            />
            {/* Input for Activity Cost */}
            <TextInput
              style={styles.input}
              placeholder="Enter activity cost"
              value={newActivityCost}
              onChangeText={setNewActivityCost}
              keyboardType="numeric"
            />

            {/* Button to add activity */}
            <Pressable onPress={addActivity} style={styles.button}>
              <Text style={styles.addButtonText}>Add Activities</Text>
            </Pressable>

            {/* List of activities */}
            <ScrollView style={styles.activityList}>
              {activityNames.map((activity, index) => {
                const totalCost = parseFloat(activityCosts[index]) || 0; // รับค่า cost ต่อ activity
                const perPersonCost = friends.length > 0 ? (totalCost / friends.length).toFixed(2) : totalCost.toFixed(2); // คำนวณค่าใช้จ่ายต่อคน

                return (
                  <View key={index} style={styles.activityItem}>
                    <Pressable onPress={() => removeActivity(index)}>
                      <Ionicons name="close-circle" size={20} color="#a43939" />
                    </Pressable>
                    <Text style={styles.activityText}>{activity}</Text>
                    <Text style={styles.activityCost}>  Total: {totalCost} | Per Person: {perPersonCost} </Text>
                    
                  </View>
                );
              })}
            </ScrollView>

            <View style={styles.textView}>
              <Text style={styles.text}>Plan-ID : </Text>
              <Text style={styles.textResult}>{selectedPlan?.id}</Text>
            </View>
            {/* รวมค่าใช้จ่ายทั้งหมดต่อคน */}
              <View style={styles.textView}>
                <Text style={styles.text}>Cost per person : </Text>
                <Text style={styles.textResult}>
                  {friends.length > 0
                    ? (
                        activityCosts.reduce((total, cost) => total + parseFloat(cost || "0"), 0) /
                        friends.length
                      ).toFixed(2)
                    : "0"} {/* คำนวณเฉพาะเมื่อมีเพื่อนอย่างน้อย 1 คน */}
                  {" "}baht
                </Text>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default PlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  header: {
    padding: 10,
    backgroundColor: "#30777d",
    alignItems: "center",
    marginBottom: 10,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10, // เพิ่ม margin ด้านบนและด้านล่าง
    marginLeft: 20, // ขยับข้อความไปทางซ้าย
    textAlign: "left", // จัดให้อยู่ทางซ้าย
  },
  screenTitle: {
    marginTop: 50,
    marginBottom: 10,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 30,
  },
  textModalTitle: {
    marginLeft: 10,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 30,
  },
  myImage: {
    width: "45%",
    height: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  planContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  invitedPlanContainer: {
    width: 200,
    height: 140,
    display: "flex",
    justifyContent: "center",
    marginHorizontal: 5,
    paddingHorizontal: 12,
    backgroundColor: "#A4E1E7",
    borderRadius: 20,
    padding: 15,
  },
  planTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#30777d",
  },
  planDetail: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 27,
    backgroundColor: "#30777d",
  },
  footerText: {
    fontSize: 16,
    color: "#333",
  },
  box: {
    margin: 30,
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    color: "#30777d",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
  },
  textResult: {
    marginTop: 10,
    marginBottom: 10,
    color: "#69aeb6",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
  },
  editText: {
    marginTop: 12,
    marginLeft: 3,
    color: "#69aeb6",
    fontWeight: "bold",
    textAlign: "left",
  },
  textView: {
    flexDirection: "row",
  },
  description: {
    marginTop: 3,
    width: 305,
    height: 230,
    backgroundColor: "white",
    fontSize: 15,
    borderRadius: 25,
    marginLeft: 12,
    padding:13,
    color: "black",
    borderWidth: 2,
    borderColor: "#dddddd",
  },
  icon: {
    marginLeft: 10,
  },
  closeButton: {
    color: "#a43939",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 310,
  },
  budgetContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  suffix: {
    marginLeft: 5,
    fontSize: 20,
    color: "#69aeb6", // Match the color to your design
  },
  inputContainer: {
    position: "relative",
  },
  inputFriendContainer: {
    flexDirection: "row", // Aligns TextInput and button horizontally
    alignItems: "center", // Centers them vertically
    marginVertical: 10,
    marginLeft: 10,
  },
  inputIcon: {
    position: "absolute",
    right: 30,
    bottom: 10,
  },
  friendsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginLeft: 10,
  },
  friendName: {
    fontSize: 16,
    color: "#69aeb6",
    margin: 5,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#30777d",
    alignItems: "center",
    justifyContent: "center",
  },
  friendInput: {
    flex: 1, // Takes available width
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    paddingHorizontal: 10,
    marginRight: 10, // Adds spacing between TextInput and button
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  activityList: {
    marginTop: 20,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityText: {
    fontSize: 16,
    color: "#333",
  },
  activityCost: {
    fontSize: 16,
    color: "#69aeb6",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  activityContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  button: {
    borderRadius: 25,
    paddingVertical: 3,
    paddingHorizontal: 23,
    elevation: 1,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#30777d",
    
    alignSelf: "center", // Center horizontally
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: "100%",
  },
});
