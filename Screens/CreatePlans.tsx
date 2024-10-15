import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const CreatePlans = () => {
    const [description, setDescription] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.textTitle}>CAMP TRIP</Text>
        <View style={styles.budgetContainer}>
           <Text style={styles.text}>BUDGET: 3,000 baht</Text> 
           <Icon name="pen" size={20} color="#ffffff" style={styles.icon} />
        </View>
        <View style={styles.budgetContainer}>
           <Text style={styles.text}>Date on trip: 8/16/2028</Text> 
           <Icon name="pen" size={20} color="#ffffff" style={styles.icon} />
        </View>
        <View style={styles.budgetContainer}>
           <Text style={styles.text}>Create Date: 9/20/2027</Text> 
           <Icon name="pen" size={20} color="#ffffff" style={styles.icon} />
        </View>
        <View style={styles.budgetContainer}>
           <Text style={styles.text}>MEMBER: John,Jane,June,Jim</Text> 
           <Icon name="pen" size={20} color="#ffffff" style={styles.icon} />
        </View>
        <Text style={styles.text}>Description:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.description}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          <Icon name="pen" size={20} color="#30777d" style={styles.inputIcon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#69aeb6",
    padding: 20,
  },
  box: {
    marginTop: 50,
    marginLeft: 10,
    width: 350,
    height: 700,
    backgroundColor: "#30777d",
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 2,
  },
  textTitle: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 25,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 35,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
  },
  description: {
    marginTop: 20,
    marginLeft: 20,
    width: 305,
    height: 320,
    backgroundColor: "#a4e1e7",
    borderRadius: 25,
  },
  icon: {
    marginLeft: 10,
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

export default CreatePlans;
