import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Createplans = () => {
  return (
    <View >
          <Text style={styles.modalText}>Successful Created</Text>
          <Text style={styles.modalText}>Your Plans has been created</Text>
        </View>
  )
}

export default Createplans

const styles = StyleSheet.create({
    modalText: {
      borderRadius: 25,
      fontWeight: "bold",
      marginBottom: 15,
      fontSize: 18,
      textAlign: 'center',
    },
   
  });