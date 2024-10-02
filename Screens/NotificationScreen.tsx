import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

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
        <Switch
          onValueChange={toggleMainSwitch}
          value={isEnabled}
          trackColor={{ false: "#767577", true: "#3bec17" }}
          thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
          accessibilityLabel="Toggle all notifications"
          style={styles.switch}
        />
      </View>

      <Text style={styles.text}>Plans Notification</Text>
      {tripNotifications.map((trip, index) => (
        <View key={index} style={styles.viewSetUp}>
          <Text style={styles.textSetUp}>{trip}</Text>
          <Switch
            onValueChange={() => toggleTripSwitch(trip)}
            value={tripStates[trip]}
            trackColor={{ false: "#767577", true: "#3bec17" }}
            thumbColor={tripStates[trip] ? "#ffffff" : "#ffffff"}
            accessibilityLabel={`Toggle notification for ${trip}`}
            style={styles.switch}
          />
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
    flex: 1,
  },
  switch: {
    marginLeft: 10,
    transform: [{ scale: 1.5 }],
  },
});
