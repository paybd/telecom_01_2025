import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'

export default function Input({label,keyboardType,}) {
  return (
    <View style={styles.input}>
      <TextInput/>
    </View>
  )
}


const styles = ScaledSheet.create({
    input:{
        height:'30@vs',
        width:'full',
        backgroundColor:'gray',
        padding:10,
        margin:10,
    

    }
  

})