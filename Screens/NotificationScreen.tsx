import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { selectPlans } from "../auth-backend/auth/plan-slice";
const NotificationScreen = () => {
  const formattedPlans = useSelector(selectPlans) || [];
  const [isEnabled, setIsEnabled] = useState(false);
  const [tripStates, setTripStates] = useState<Record<string, boolean>>({});
  const [notificationPreference, setNotificationPreference] = useState("all");

  const tripNotifications = formattedPlans.map((plan) => plan.title);

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

  const toggleTripSwitch = (trip: any) => {
    setTripStates((prev) => ({
      ...prev,
      [trip]: !prev[trip],
    }));
  };

  const selectNotificationPreference = (preference: any) => {
    setNotificationPreference(preference);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.screenTitle}>NOTIFICATION</Text>
        </View>
      </View>
      <View style={styles.pad}>
        {/* Toggle Notification */}
        <View style={styles.viewSetUp}>
          <Text style={styles.textSetUp}>Allow The Notification</Text>
          <TouchableOpacity
            style={[styles.togglerWrapper, isEnabled && styles.togglerActive]}
            onPress={toggleMainSwitch}
          >
            <View
              style={[styles.togglerSlider, isEnabled && styles.sliderActive]}
            >
              <View
                style={[styles.togglerKnob, isEnabled && styles.knobActive]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Dropdown for Notification Preferences */}
        {isEnabled && (
          <>
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

            {/* Dropdown for Trip Notifications */}
            <Text style={styles.text}>Plans Notification</Text>
            <View style={styles.dropdownList}>
              {tripNotifications.map((trip, index) => (
                <View key={index} style={styles.viewSetUp}>
                  <Text style={styles.textSetUp}>{trip}</Text>
                  <TouchableOpacity
                    style={[
                      styles.togglerWrapper,
                      tripStates[trip] && styles.togglerActive,
                    ]}
                    onPress={() => toggleTripSwitch(trip)}
                  >
                    <View
                      style={[
                        styles.togglerSlider,
                        tripStates[trip] && styles.sliderActive,
                      ]}
                    >
                      <View
                        style={[
                          styles.togglerKnob,
                          tripStates[trip] && styles.knobActive,
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  pad: {
    padding: 5,
  },
  header: {
    padding: 10,
    backgroundColor: "#30777d",
    alignItems: "center",
    marginBottom: 10,
  },
  screenTitle: {
    marginTop: 50,
    marginBottom: 10,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 30,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#30777d",
    marginTop: 15,
    marginLeft: 15,
    marginBottom: -5,
  },
  viewSetUp: {
    backgroundColor: "#eeeeee",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 2,
    borderBottomWidth: 2, // Bottom border to mimic the line
    borderColor: "#E0E0E0",
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  textSetUp: {
    color: "#0d1b3b",
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
    backgroundColor: "#eeeeee",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 2,
    borderBottomWidth: 2, // Bottom border to mimic the line
    borderColor: "#E0E0E0",
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  dropdownText: {
    color: "#0d1b3b",
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
  dropdownList: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
  },
});
