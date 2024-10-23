import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    ScrollView,
    FlatList,
    Touchable,
  } from "react-native";
import React from 'react'
import { TouchableOpacity } from "react-native-gesture-handler";

interface PlansItem {
  id: string;
  title: string;
  budget: string;
  date: string;
}

type RenderItemProps = { item: PlansItem };

const PlansScreen = () => {
  const plans: PlansItem[] = [
    { id: "1", title: 'Camp Trip', budget: '3,000 baht', date: '8/16/2028' },
    { id: "2", title: 'Sea Trip', budget: '2,000 baht', date: '10/25/2026' },
    { id: "3", title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
    { id: "4", title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
    { id: "5", title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
    { id: "6", title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
    { id: "7", title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
    { id: "8", title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
    { id: "9", title: 'Chang rai Trip', budget: '8,000 baht', date: '10/25/2026' },
  ];
  

  //ฟังก์ชัน _renderItem
  const _renderItem = ({ item }: RenderItemProps) => (
    <TouchableOpacity style={styles.planContainer}>
      <Text style={styles.planTitle}>{item.title}</Text>
      <Text style={styles.planDetail}>{item.budget}</Text>
      <Text style={styles.planDetail}>{item.date}</Text>
    </TouchableOpacity>
  );
  const __renderItem = ({ item }: RenderItemProps) => (
    <TouchableOpacity style={styles.invitedPlanContainer}>
      <Text style={styles.planTitle}>{item.title}</Text>
      <Text style={styles.planDetail}>{item.budget}</Text>
      <Text style={styles.planDetail}>{item.date}</Text>
    </TouchableOpacity>
  );
    return (
        <ScrollView style={styles.container}
        showsVerticalScrollIndicator={false}>
            <Text style={styles.textTitle}>PLANS</Text>
          <View>
            <FlatList
                data={plans} 
                renderItem={_renderItem} 
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id} 
                scrollEnabled={false}
            ListHeaderComponentStyle ={{ marginVertical: 10}}
            ListHeaderComponent={() => (
              <View>
                <FlatList
                horizontal={true}
                data={plans} 
                renderItem={__renderItem}
                contentContainerStyle={{ gap: 10, paddingHorizontal:12}} 
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                
                />
                <Text style={styles.textTitle}>YOUR CREATE PLANS</Text>
              </View>
            )}
            />
            
          </View>
        </ScrollView>
      );
}

export default PlansScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#69aeb6',
    },
    header: {
      padding: 20,
    },
    textTitle: {
      marginTop: 50,
      color: "#ffffff",
      fontWeight: "bold",
      textAlign: "left",
      fontSize: 35,
    },
    myImage: {
      width: "45%",
      height: 100,
      marginTop: 10,
      marginBottom: 10,
    },
    planContainer: {
      marginHorizontal: 16,
      marginVertical: 8,
      paddingHorizontal: 20,
      backgroundColor: '#A4E1E7',
      borderRadius: 20,
      padding: 15,
      shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
    planTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    planDetail: {
      fontSize: 16,
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
  });