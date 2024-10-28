import React, { useState } from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
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
import { Ionicons } from "@expo/vector-icons";
import CreatePlansScreen from "./Screens/CreatePlansScreen";
import { Provider } from "react-redux";
import { store } from "./auth-backend/redux-toolkit/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useAppDispatch,
  useAppSelector,
} from "./auth-backend/redux-toolkit/hooks";
import {
  selectAuthState,
  setIsLoading,
  setIsLogin,
  setProfile,
} from "./auth-backend/auth/auth-slice";
import { ActivityIndicator, View } from "react-native";
import { getProfile } from "./auth-backend/services/auth-service";

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
            iconName = focused ? "home" : "home-outline";
            size = 30;
          } else if (route.name === "PlansStack") {
            iconName = focused ? "people" : "people-outline";
            size = 30;
          } else if (route.name === "CreatePlansStack") {
            iconName = focused ? "add-circle" : "add-circle";
            size = 71;
            color = "#30777d";
          } else if (route.name === "ProfileStack") {
            iconName = focused ? "person" : "person-outline";
            size = 30;
          } else if (route.name === "NotificationsStack") {
            iconName = focused ? "notifications" : "notifications-outline";
            size = 30;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#30777d",
        tabBarInactiveTintColor: "#30777d",
        tabBarStyle: {
          backgroundColor: "#ffffff",
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
        options={{
          tabBarLabel: "",
          tabBarItemStyle: { marginTop: -24 },
          tabBarStyle: { display: 'none' }, // ซ่อน tabBar 
        }}
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
        headerStyle: { backgroundColor: "#69aeb6" },
        headerTitleStyle: { fontWeight: "bold" },
        headerShown: false
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

const App = (): React.JSX.Element => {
  const { isLogin, isLoading } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();
  const checkLogin = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getProfile();

      if (response?.data) {
        dispatch(setProfile(response.data));
        console.log(response.data);
        dispatch(setIsLogin(true));
      } else {
        //ไมไ่ด้ Login ให้กลับไปที่หน้า LoginScreen
        dispatch(setIsLogin(false));
        console.log("here");
      }
    } catch (error) {
      console.log("check login catch", isLogin);
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      checkLogin();
    }, [])
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return isLogin ? <TabContainer /> : <LoginStackScreen />; //return App
  //return <TabContainer/>
};
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
export default AppWrapper;

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
