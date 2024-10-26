import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { logout } from "../auth-backend/services/auth-service";
import {
  useAppDispatch,
  useAppSelector,
} from "../auth-backend/redux-toolkit/hooks";
import {
  selectAuthState,
  setIsLogin,
  setProfile,
  fetchProfile,
} from "../auth-backend/auth/auth-slice";

const ProfileScreen = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLogin, profile, isLoading } = useAppSelector(selectAuthState);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isLogin && !profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isLogin, profile]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchProfile()).finally(() => setRefreshing(false));
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const calculateAge = (dob: Date) => {
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
  };
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.screenTitle}>PROFILE</Text>
        </View>
      </View>
      <View style={styles.pad}>
        <Image
          source={require("../assets/Image/CreateProfile.png")}
          resizeMode="contain"
          style={styles.myImage}
        />
        <Text style={styles.textStyle}>Nickname</Text>
        <TextInput
          style={styles.input}
          value={profile?.nickname || ""}
          editable={false}
          placeholder="NICKNAME"
        />
        <Text style={styles.textStyle}>Gender</Text>
        <TextInput
          style={styles.input}
          value={profile?.gender || ""}
          editable={false}
          placeholder="GENDER"
        />
        <Text style={styles.textStyle}>Age</Text>
        <TextInput
          style={styles.input}
          value={profile?.DoB ? calculateAge(new Date(profile.DoB)) : ""}
          editable={false}
          placeholder="AGE"
        />
        <Text style={styles.textStyle}>User-ID</Text>
        <TextInput
          style={styles.input}
          value={profile?._id || ""}
          editable={false}
          placeholder="USER-ID"
        />
        <Pressable
          style={[styles.button, styles.buttonLogout]}
          onPress={async () => {
            await logout();
            dispatch(setIsLogin(false));
          }}
        >
          <Text style={styles.textLogout}>Log out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // ทำให้ View ขยายเต็มหน้าจอ
    backgroundColor: "#eeeeee",
  },
  Line: {
    marginTop: 2,
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
  pad: {
    padding: 10,
  },
  icons: {
    fontSize: 25,
    color: "#6b8d71",
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
  },
  myImage: {
    width: "100%",
    height: 140,
    marginTop: 15,
    marginBottom: 10,
  },
  textTitle: {
    marginTop: 50,
    marginBottom: 10,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 35,
  },
  textStyle: {
    borderRadius: 25,
    color: "#30777d",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 18,
    marginLeft: 20,
  },
  textLogout: {
    borderRadius: 25,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
  },

  button: {
    borderRadius: 25,
    paddingVertical: 3,
    paddingHorizontal: 20,
    elevation: 1,
    marginLeft: 110,
    marginRight: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLogout: {
    backgroundColor: "#a43939",
    marginTop: 25,
  },

  input: {
    color: "black",
    height: 40,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#eeeeee",
    fontSize: 15,
    fontWeight: "bold",
    borderColor: "#dddddd",
    borderWidth: 2, // ความหนาของขอบ
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // To space out buttons evenly
    marginTop: 20,
    marginBottom: 10,
  },
  radioButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioButtonInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#30777d",
  },
  selectedRadioButton: {
    borderColor: "#30777d",
  },
  genderText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10, // Added margin to space out text from buttons
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
