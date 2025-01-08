import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/colors'
import MyButton from '../../components/MyButton'

export default function crypto() {
  return (
    <View style={styles.container}>
        <Text style={{fontSize:26,fontWeight:'bold',color:PRIMARY_COLOR,textAlign:'center'}}>USDT-TRC20</Text>
      
      <Text style={{fontSize:22,fontFamily:'BanglaSemiBold',color:PRIMARY_COLOR,marginVertical:5}}>ওয়ালেট এড্রেস :</Text>
      <Text style={{fontSize:22,color:PRIMARY_COLOR}} selectable>TQ37uK4dnUnefB9RwZaXAcAex7UoiaccYG</Text>


      <Text style={[styles.label, { fontSize: 18, marginVertical: 10,color:SECONDARY_COLOR }]}>
      ওয়ালেট এড্রেস টি কপি করতে এড্রেস এর উপর ডাবল ক্লিক করুন
        </Text>


      <Text style={[styles.label, { fontSize: 22, marginVertical: 10,marginTop:20 }]}>
          উক্ত ওয়ালেট এ usdt ট্রান্সফার করার পর নিচের বাটনে ক্লিক করে হেল্পলাইন এ রিসিট পাঠিয়ে দিন
        </Text>
      
       
      
<MyButton title={'হেল্পলাইন'} onPress={()=>{}}/>
    </View>
  )
}



const styles = ScaledSheet.create({
    container: {
     flex:1,
      backgroundColor: "white",
      padding:10,
    },

    label: {
        color: PRIMARY_COLOR,
        fontSize: "18@s",
        textTransform: "uppercase",
        fontFamily: "BanglaSemiBold",
      },
    
})