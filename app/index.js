import React, { useEffect } from 'react'
import { Image, Text, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { PRIMARY_COLOR } from '../constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import * as Application from 'expo-application';
import { useSelector } from 'react-redux'
export default function index() {

console.log('application id is');

const { userData } = useSelector((state) => state.auth);
  


    const router = useRouter()

useEffect(() => {
 setTimeout(()=>{
  if(userData){

    router.replace("/(tabs)");

  
    
  }else{
    router.replace("/auth/login");
  }

 },3000)
}, [])



  return (
   <SafeAreaView style={styles.container}>

     <View
              style={{
          height:200,
                width: 300,
                marginBottom:10
    
               
              }}
            >
              <Image
                style={{
                  height: "100%",
                  width: "100%",
                  resizeMode: "contain",
                  borderRadius: 5,
                }}
                source={require('../assets/images/sp.png')}
              />
            </View>

    <Text style={{fontSize:20,fontFamily:'BanglaSemiBold',color:PRIMARY_COLOR}}>বেট, ডিপোজিট, উইথড্র</Text>

   </SafeAreaView>
  )
}


const styles = ScaledSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    }

})