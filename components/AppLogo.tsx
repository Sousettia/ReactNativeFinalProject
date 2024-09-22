import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const AppLogo = ():React.JSX.Element => {
  return (
    <View>
      <Image
        source={require("../assets/Image/Logo.png")}
        resizeMode ='cover'
        style={styles.logo}
      />
    </View>
  )
}

export default AppLogo

const styles = StyleSheet.create({
    logo:{
        width:85,
        height:50
    }
})