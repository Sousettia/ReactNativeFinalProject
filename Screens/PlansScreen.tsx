import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    ScrollView,
    FlatList,
    Touchable,
    Pressable,
    Modal,
    TextInput,
  } from "react-native";
import React, { useState } from 'react'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface PlansItem {
  id: string;
  title: string;
  budget: string;
  date: string;
}

type RenderItemProps = { item: PlansItem };

const PlansScreen = () => {
  const [plans, setPlans] = useState<PlansItem[]>([
    { id: "1", title: "Camp Trip", budget: "3,000 baht", date: "8/16/2028" },
    { id: "2", title: "Sea Trip", budget: "2,000 baht", date: "10/25/2026" },
    { id: "3", title: "Chang rai Trip", budget: "8,000 baht", date: "10/25/2026" },
    // Add other items...
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<PlansItem | null>(null);
  
  const updatePlanBudget = (updatedBudget: string) => {
    if (selectedPlan) {
      const updatedPlans = plans.map(plan =>
        plan.id === selectedPlan.id
          ? { ...plan, budget: updatedBudget }
          : plan
      );
      setPlans(updatedPlans);
    }
  };

  //ฟังก์ชัน _renderItem
  const _renderItem = ({ item }: RenderItemProps) => (
    <TouchableOpacity 
      style={styles.planContainer}
      onPress={() => {
        setSelectedPlan(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.planTitle}>{item.title}</Text>
      <Text style={styles.planDetail}>{item.budget}</Text>
      <Text style={styles.planDetail}>{item.date}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.textTitle}>PLANS</Text>
      <FlatList
        data={plans} 
        renderItem={_renderItem} 
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ListHeaderComponent={() => (
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={plans} 
              renderItem={_renderItem} 
              keyExtractor={(item) => item.id}
            />
            <Text style={styles.textTitle}>YOUR CREATE PLANS</Text>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.box}>
          <Pressable onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>X</Text>
          </Pressable>
          <Text style={styles.textModalTitle}>{selectedPlan?.title}</Text>
          <View style={styles.textView}>
            <Text style={styles.text}>Budget: </Text>
            <TextInput
              style={styles.textResult}
              value={selectedPlan?.budget}
              editable={true} // Allow editing
              onChangeText={(newText) => {
                if (selectedPlan) {
                  updatePlanBudget(newText); // Update the plan's budget
                  setSelectedPlan({ ...selectedPlan, budget: newText }); // Update selected plan locally
                }
              }}
            />
          <Ionicons
            style={styles.editText}
            name="pencil-outline" size={20} color="white" />
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>Date on trip: </Text>
            <Text style={styles.textResult}>{selectedPlan?.date}</Text>
            <Ionicons
              style={styles.editText}
              name="pencil-outline" size={20} color="white" />
          </View>
          <Text style={styles.text}>Description:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.description}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          <Text style={styles.text}>Plan-Id:</Text>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default PlansScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#69aeb6',
    },
    header: {
      padding: 20,
    },
    textTitle: {
      marginLeft:10,
      marginTop: 50,
      color: "#ffffff",
      fontWeight: "bold",
      textAlign: "left",
      fontSize: 30,
    },
    textModalTitle: {
      marginLeft:10,
      marginBottom:10,
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
      backgroundColor: '#A4E1E7',
      borderRadius: 20,
      padding: 15,
      shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    invitedPlanContainer: {
      width : 200,
      height : 140,
      display: "flex",
      justifyContent: "center",
      marginHorizontal: 5,
      paddingHorizontal: 12,
      backgroundColor: '#A4E1E7',
      borderRadius: 20,
      padding: 15,
      
    },
    planTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
    },
    planDetail: {
      fontSize: 16,
      color: '#333',
      marginTop: 5,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 27,
      backgroundColor: '#30777d',
    },
    footerText: {
      fontSize: 16,
      color: '#333',
    },
    box: {
    margin: 30,
    marginTop:20,
    backgroundColor: "#b8f9ff",
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
    justifyContent: 'center',

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
      marginLeft:3,
      color: "#69aeb6",
      fontWeight: "bold",
      textAlign: "left",
    },
    textView:{
      flexDirection: 'row',
    },
    description: {
      marginTop: 3,
      width: 305,
      height: 230,
      backgroundColor: "white",
      fontSize: 15,
      borderRadius: 25,
      marginLeft:12,
      paddingTop: 30,
      paddingLeft:10,
      color: "black",
    },
    icon: {
      marginLeft: 10,
    },
    closeButton:{
      color: "#a43939",
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 310,
    },
    budgetContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainer: {
      position: 'relative',
    },
    inputIcon: {
      position: 'absolute',
      right: 30,
      bottom: 10,
    },
  });