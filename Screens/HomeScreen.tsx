import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {useNavigation} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useLayoutEffect} from "react";
import AppLogo from "../components/AppLogo";


const plans = [
  { title: 'Camp Trip', budget: '3,000 baht', date: '8/16/2028' },
  { title: 'Sea Trip', budget: '2,000 baht', date: '10/25/2026' },
  { title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
  { title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
  { title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
  { title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
  { title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
  { title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
  { title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
];

const HomeScreen = () => {
  
  return (
    <ScrollView style={styles.container}
    showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        {/* รูปโลโก้ */}
        <Image
        source={require("../assets/Image/Logo.png")}
        resizeMode="cover"
        style={styles.myImage}
      />
        <Text style={styles.textTitle}>UPCOMING PLANS</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}
      style ={styles.planContainer}>
        {plans.map((plan, index) => (
          <View key={index} >
            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.planDetail}>Budget : {plan.budget}</Text>
            <Text style={styles.planDetail}>Date On Trip : {plan.date}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#69aeb6',
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  textTitle: {
    marginTop: 10,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 35,
  },
  myImage: {
    width: "45%",
    height: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#A4E1E7',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  planContainer: {
    backgroundColor: '#69aeb6',
    borderRadius: 10,
    padding: 15,
  },
  planTitle: {
    fontSize: 18,
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
});