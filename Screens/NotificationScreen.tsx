import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const NotificationScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const tripNotifications = [
    "Camp Trip",
    "Sea Trip",
    "Japan Trip",
    "Puket Trip",
    "Chang Mai Trip",
    "Chang Rai Trip",
  ];

  const [tripStates, setTripStates] = useState(
    tripNotifications.reduce((acc, trip) => ({ ...acc, [trip]: false }), {})
  );

  const toggleMainSwitch = () => setIsEnabled((prev) => !prev);

  const toggleTripSwitch = (trip) => {
    setTripStates((prev) => ({
      ...prev,
      [trip]: !prev[trip],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>NOTIFICATION</Text>
      <View style={styles.viewSetUp}>
        <Text style={styles.textSetUp}>Allow The Notification</Text>
        <TouchableOpacity
          style={[styles.togglerWrapper, isEnabled && styles.togglerActive]}
          onPress={toggleMainSwitch}
        >
          <View style={[styles.togglerSlider, isEnabled && styles.sliderActive]}>
            <View style={[styles.togglerKnob, isEnabled && styles.knobActive]} />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Plans Notification</Text>
      {tripNotifications.map((trip, index) => (
        <View key={index} style={styles.viewSetUp}>
          <Text style={styles.textSetUp}>{trip}</Text>
          <TouchableOpacity
            style={[styles.togglerWrapper, tripStates[trip] && styles.togglerActive]}
            onPress={() => toggleTripSwitch(trip)}
          >
            <View style={[styles.togglerSlider, tripStates[trip] && styles.sliderActive]}>
              <View style={[styles.togglerKnob, tripStates[trip] && styles.knobActive]} />
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#69aeb6",
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
  text: {
    marginTop: 25,
    marginBottom: 15,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
  },
  viewSetUp: {
    backgroundColor: "#30777d",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 25,
    padding: 2,
  },
  textSetUp: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  togglerWrapper: {
    marginRight: 15,
    width: 65,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#ccc",
    justifyContent: 'center',
    padding: 2,
    position: 'relative',
  },
  togglerActive: {
    backgroundColor: "#3BEC17",
  },
  togglerSlider: {
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: "#ccc",
    position: 'relative',
    justifyContent: 'center',
  },
  sliderActive: {
    backgroundColor: "#3BEC17",
  },
  togglerKnob: {
    marginLeft: 2,
    width: 26,
    height: 26,
    backgroundColor: "#ffffff",
    borderRadius: 13,
    position: 'absolute',
  },
  knobActive: {
    transform: [{ translateX: 30 }],
  },
});
