import AsyncStorage from "@react-native-async-storage/async-storage";
import { http } from "./http-service";

export async function login(username: string, password: string) {
  const response = await http.post("http://192.168.145.108:5000/api/auth/login", {
    username: username,
    password: password,
  });

  //save token to storage
  await AsyncStorage.setItem("@token", JSON.stringify(response.data));
  return response;
}

export async function logout() {
  await AsyncStorage.removeItem("@token");
}

export async function getProfile() {
  const tokenString = await AsyncStorage.getItem("@token");
  //ถ้าไม่มี token
  if (!tokenString) {
    console.log("Profile No token");
    return null;
  }
  //ถ้ามี token
  const token = JSON.parse(tokenString);
  const response = await http.get(
    "http://192.168.145.108:5000/api/auth/profile",
    {
      headers: { Authorization: "Bearer " + token.token },
    }
  );
  return response;
}