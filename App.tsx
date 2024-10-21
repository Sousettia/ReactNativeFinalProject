import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./Screens/WelcomeScreen";
import LogInScreen from "./Screens/LogInScreen";
import CreateAccount1 from "./Screens/CreateAccount1";
import CreateAccount2 from "./Screens/CreateAccount2";
import CreateProfileScreen from "./Screens/CreateProfileScreen";
import HomeScreen from "./Screens/HomeScreen";
import PlansScreen from "./Screens/PlansScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import NotificationScreen from "./Screens/NotificationScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CreatePlans from "./Screens/CreatePlans";

const HomeStack = createStackNavigator();
const LoginStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoginStackScreen() {
  return (
    <LoginStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: "#417F85" },
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <LoginStack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={WelcomeScreen}
      />
      <LoginStack.Screen name="Login" component={LogInScreen} />
      <LoginStack.Screen name="CreateAccount1" component={CreateAccount1} />
      <LoginStack.Screen name="CreateAccount2" component={CreateAccount2} />
      <LoginStack.Screen name="CreateProfile" component={CreateProfileScreen} />
    </LoginStack.Navigator>
  );
}
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold" },
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}
function PlansStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="plans"
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold" },
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="plans" component={PlansScreen} />
    </HomeStack.Navigator>
  );
}
function ProfileStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="profile"
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold" },
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="profile" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
}
function NotificationsStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="notifications"
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold" },
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="notifications" component={NotificationScreen} />
    </HomeStack.Navigator>
  );
}

const App = () => {
  const [isCreate] = useState(false);

  return (
    <NavigationContainer>
      {!isCreate ? (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Home"
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={30} color={color} />
              ),
              tabBarActiveTintColor: "#ddf3f5",
              tabBarInactiveTintColor: "#69aeb6",
              tabBarStyle: {
                backgroundColor: "#417F85",
                height: 60,
                paddingBottom: 3,
              },
            }}
            component={HomeStackScreen}
          />
          <Tab.Screen
            name="Plans"
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="user-friends" size={30} color={color} />
              ),
              tabBarActiveTintColor: "#ddf3f5",
              tabBarInactiveTintColor: "#69aeb6",
              tabBarStyle: {
                backgroundColor: "#417F85",
                height: 60,
                paddingBottom: 3,
              },
            }}
            component={PlansStackScreen}
          />
          <Tab.Screen
            name="Create Plan"
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <FontAwesome name="plus-circle" size={30} color={color} />
              ),
              tabBarActiveTintColor: "#ddf3f5",
              tabBarInactiveTintColor: "#69aeb6",
              tabBarStyle: {
                backgroundColor: "#417F85",
                height: 60,
                paddingBottom: 3,
              },
            }}
            component={CreatePlans}
          />
          <Tab.Screen
            name="Profile"
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <FontAwesome name="user" size={30} color={color} />
              ),
              tabBarActiveTintColor: "#ddf3f5",
              tabBarInactiveTintColor: "#69aeb6",
              tabBarStyle: {
                backgroundColor: "#417F85",
                height: 60,
                paddingBottom: 3,
              },
            }}
            component={ProfileStackScreen}
          />
          <Tab.Screen
            name="Notifications"
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Ionicons name="notifications" size={30} color={color} />
              ),
              tabBarActiveTintColor: "#ddf3f5",
              tabBarInactiveTintColor: "#69aeb6",
              tabBarStyle: {
                backgroundColor: "#417F85",
                height: 60,
                paddingBottom: 3,
              },
            }}
            component={NotificationsStackScreen}
          />
        </Tab.Navigator>
      ) : (
        <LoginStackScreen />
      )}
    </NavigationContainer>
  );
};

export default App;
