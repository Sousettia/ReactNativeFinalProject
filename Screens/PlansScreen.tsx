import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    ScrollView,
  } from "react-native";
import React from 'react'

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

const PlansScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}> 
            <Text style={styles.textTitle}>PLANS</Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {plans.map((plan, index) => (
              <View key={index} style={styles.planContainer}>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planDetail}>Budget : {plan.budget}</Text>
                <Text style={styles.planDetail}>Date On Trip : {plan.date}</Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
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
      marginTop: 50,
      marginBottom: 10,
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
    },
    planContainer: {
      backgroundColor: '#A4E1E7',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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