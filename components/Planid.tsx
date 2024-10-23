import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Planid = () => {
  return (
    <View >
          <Text style={styles.modalText}>Added Successful</Text>
          <Text style={styles.modalText}>Your Plans has been added</Text>
        </View>
  )
}

export default Planid;

const styles = StyleSheet.create({
    modalText: {
      borderRadius: 25,
      fontWeight: "bold",
      marginBottom: 15,
      fontSize: 18,
      textAlign: 'center',
    },
   
  });