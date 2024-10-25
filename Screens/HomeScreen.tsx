import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  Touchable,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from 'react'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface PlansItem {
id: string;
title: string;
budget: string;
date: string;
}

type RenderItemProps = { item: PlansItem };

const PlansScreen = () => {
const [plans, setPlans] = useState<PlansItem[]>([
  { id: "1", title: "Camp Trip", budget: "3,000 baht", date: "8/16/2028" },
  { id: "2", title: "Sea Trip", budget: "2,000 baht", date: "10/25/2026" },
  { id: "3", title: "Chang rai Trip", budget: "8,000 baht", date: "10/25/2026" },
  { id: "4", title: "Japan Trip", budget: "8,000 baht", date: "10/25/2026" },
  { id: "5", title: "Puket Trip", budget: "8,000 baht", date: "10/25/2026" },  
  { id: "6", title: "Chang Mai Trip", budget: "8,000 baht", date: "10/25/2026" },  

]);
const [isModalVisible, setModalVisible] = useState(false);
const [description, setDescription] = useState("");
const [selectedPlan, setSelectedPlan] = useState<PlansItem | null>(null);


//ฟังก์ชัน _renderItem
const _renderItem = ({ item }: RenderItemProps) => (
  <TouchableOpacity 
    style={styles.planContainer}
  >
    <Text style={styles.planTitle}>{item.title}</Text>
    <Text style={styles.planDetail}>{item.date}</Text>
  </TouchableOpacity>
);
return (
  <View style={styles.container} >
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <Image
            source={require("../assets/Image/CreateProfile.png")}
            resizeMode="contain"
            style={styles.myImage}
          />
          <View>
          <Text style={styles.textTitle}>Welcome,</Text>
          <Text style={styles.textUserTitle}>Welcome,</Text>
        </View>  
      </View>
      {/*Search bar */}
        <View style={styles.searchBarContainer}>
            <TextInput 
              style={styles.textInput}
              placeholder="Search"  
            />
            <Ionicons
              style={styles.seachBtn}
              name="search-outline" size={21} />
        </View>
    </View>
    <View>
        <Text style={styles.textPlan}>Upcoming Plans</Text>
    </View>
    <View style={styles.containerFlat}>
    <FlatList
      data={plans} 
      numColumns={2}
      columnWrapperStyle={{gap:10, paddingHorizontal:12}}
      contentContainerStyle={{gap:10, paddingBottom:20}}
      renderItem={_renderItem} 
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    />
    </View>
  </View>
);
}

export default PlansScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  containerFlat: {
    flex: 1,
    backgroundColor: '#eeeeee',
    justifyContent: 'center', // จัดให้อยู่กลางแนวตั้ง
    alignItems: 'center',    // จัดให้อยู่กลางแนวนอน
  },
  header: {
    padding: 20,
    paddingTop: 30,
    backgroundColor:'#30777d',
  },
  textInput:{
    padding:7,
    paddingHorizontal:16,
    backgroundColor:'#A4E1E7',
    borderRadius:8,
    width:'85%',
  },
  textPlan: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333', 
    marginVertical: 10,  // เพิ่ม margin ด้านบนและด้านล่าง
    marginLeft: 20,      // ขยับข้อความไปทางซ้าย
    textAlign: 'left',   // จัดให้อยู่ทางซ้าย
  },
  textTitle: {
    marginLeft:10,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 18,
  },
  textUserTitle: {
    marginLeft:10,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
  },
  textModalTitle: {
    marginLeft:10,
    marginBottom:10,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 30,
  },
  myImage: {
    width: 58,    // ลดขนาดความกว้าง
    height: 58,   // ลดขนาดความสูง
    marginTop: 10,
    marginBottom: 10,
  },
  planContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    height: 180, 
    marginTop: 20,  
    aspectRatio: 1,
  },
  profileContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  invitedPlanContainer: {
    width : 200,
    height : 140,
    display: "flex",
    justifyContent: "center",
    marginHorizontal: 5,
    paddingHorizontal: 12,
    backgroundColor: '#A4E1E7',
    borderRadius: 20,
    padding: 15,
  },
  searchBarContainer:{
    display:'flex',
    flexDirection:'row',
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  planDetail: {
    fontSize: 14,
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
  box: {
  margin: 30,
  marginTop:20,
  backgroundColor: "#b8f9ff",
  borderRadius: 20,
  padding: 10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  justifyContent: 'center',

  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    color: "#30777d",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
  },
  textResult: {
    marginTop: 10,
    marginBottom: 10,
    color: "#69aeb6",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
  },
  seachBtn: {
    backgroundColor:'#A4E1E7',
    padding:10,
    borderRadius:8,
    textAlign: "left",
    marginLeft: 4,
    color:"#30777d",
  },
  textView:{
    flexDirection: 'row',
  },
  description: {
    marginTop: 3,
    width: 305,
    height: 230,
    backgroundColor: "white",
    fontSize: 15,
    borderRadius: 25,
    marginLeft:12,
    paddingTop: 30,
    paddingLeft:10,
    color: "black",
  },
  icon: {
    marginLeft: 10,
  },
  closeButton:{
    color: "#a43939",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 310,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    right: 30,
    bottom: 10,
  },
});