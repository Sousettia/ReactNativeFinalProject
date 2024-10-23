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
import { AuthContext, AuthProvider } from "./auth-backend/context/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import CreatePlansScreen from "./Screens/CreatePlansScreen";

const HomeStack = createStackNavigator();
const PlansStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const CreatePlansStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const LoginStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabContainer() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "HomeStack") {
            iconName = focused ? "home" : "home-outline"
            size = 30;
          } else if (route.name === "PlansStack") {
            iconName = focused ? "people" : "people-outline"
            size = 30;
          } else if (route.name === "CreatePlansStack") {
            iconName = focused ? "add-circle" : "add-circle-outline"
            size = 40;
            color = "white";
          } else if (route.name === "ProfileStack") {
            iconName = focused ? "person" : "person-outline"
            size = 30;
          } else if (route.name === "NotificationsStack") {
            iconName = focused ? "notifications" : "notifications-outline"
            size = 30;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ddf3f5",
        tabBarInactiveTintColor: "#69aeb6",
        tabBarStyle: {
          backgroundColor: "#417F85",
          height: 60,
          paddingBottom: 3,
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="PlansStack"
        component={PlansStackScreen}
        options={{ tabBarLabel: "Plans" }}
      />
      <Tab.Screen
        name="CreatePlansStack"
        component={CreatePlansStackScreen}
        options={{ tabBarLabel: "" }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{ tabBarLabel: "Profile" }}
      />
      <Tab.Screen
        name="NotificationsStack"
        component={NotificationsStackScreen}
        options={{ tabBarLabel: "Notifications" }}
      />
    </Tab.Navigator>
  );
}

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
    <PlansStack.Navigator
      initialRouteName="Plans"
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold" },
        headerShown: false,
      }}
    >
      <PlansStack.Screen name="Plans" component={PlansScreen} />
    </PlansStack.Navigator>
  );
}

function CreatePlansStackScreen() {
  return (
    <CreatePlansStack.Navigator
      initialRouteName="CreatePlans"
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold" },
        headerShown: false,
      }}
    >
      <CreatePlansStack.Screen
        name="CreatePlans"
        component={CreatePlansScreen}
      />
    </CreatePlansStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold" },
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

function NotificationsStackScreen() {
  return (
    <NotificationsStack.Navigator
      initialRouteName="Notifications"
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold" },
        headerShown: false,
      }}
    >
      <NotificationsStack.Screen
        name="Notifications"
        component={NotificationScreen}
      />
    </NotificationsStack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <LoginStackScreen />
    </NavigationContainer>
  );
  /*
  <AuthProvider>
      <NavigationContainer>
        <AuthContext.Consumer>
          {({ isAuthenticated }) => (
            isAuthenticated ? <TabContainer /> : <LoginStackScreen />
          )}
        </AuthContext.Consumer>
      </NavigationContainer>
    </AuthProvider>
  */
};

export default App;
