import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const NotificationScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [tripStates, setTripStates] = useState({});
  const [notificationPreference, setNotificationPreference] = useState("all");

  const tripNotifications = [
    "Camp Trip",
    "Sea Trip",
    "Japan Trip",
    "Puket Trip",
    "Chang Mai Trip",
    "Chang Rai Trip",
  ];

  React.useEffect(() => {
    const initialStates = tripNotifications.reduce(
      (acc, trip) => ({ ...acc, [trip]: false }),
      {}
    );
    setTripStates(initialStates);
  }, []);

  const toggleMainSwitch = () => {
    setIsEnabled((prev) => !prev);
  };

  const toggleTripSwitch = (trip) => {
    setTripStates((prev) => ({
      ...prev,
      [trip]: !prev[trip],
    }));
  };

  const selectNotificationPreference = (preference) => {
    setNotificationPreference(preference);
  };

  return (
    <ScrollView style={styles.container}
    showsVerticalScrollIndicator={false}>
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

      {isEnabled && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => selectNotificationPreference("all")}
          >
            <View
              style={[
                styles.radioCircle,
                notificationPreference === "all" && styles.selected,
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.dropdownText}>Allow All notifications</Text>
        </View>
      )}
      {isEnabled && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => selectNotificationPreference("mentions")}
          >
            <View
              style={[
                styles.radioCircle,
                notificationPreference === "mentions" && styles.selected,
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.dropdownText}>Allow Only notifications</Text>
        </View>
      )}

      <Text style={styles.text}>Plans Notification</Text>
      {tripNotifications.map((trip, index) => (
        <View key={index} style={styles.viewSetUp}>
          <Text style={styles.textSetUp}>{trip}</Text>
          <TouchableOpacity
            style={[styles.togglerWrapper, tripStates[trip] && styles.togglerActive]}
            onPress={() => toggleTripSwitch(trip)}
          >
            <View
              style={[styles.togglerSlider, tripStates[trip] && styles.sliderActive]}
            >
              <View
                style={[styles.togglerKnob, tripStates[trip] && styles.knobActive]}
              />
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
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
    justifyContent: "center",
    padding: 2,
    position: "relative",
  },
  togglerActive: {
    backgroundColor: "#3BEC17",
  },
  togglerSlider: {
    marginTop: 15,
    marginBottom: 15,
    width: "100%",
    height: "100%",
    borderRadius: 15,
    backgroundColor: "#ccc",
    position: "relative",
    justifyContent: "center",
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
    position: "absolute",
  },
  knobActive: {
    transform: [{ translateX: 30 }],
  },
  dropdown: {
    backgroundColor: "#30777d",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 50,
    borderRadius: 25,
    padding: 2,
  },
  dropdownText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  radioButton: {
    marginRight: 15,
  },
  radioCircle: {
    marginLeft: 10,
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "#3BEC17",
    borderColor: "#ffffff",
  },
});
