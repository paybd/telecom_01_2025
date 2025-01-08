import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    ToastAndroid,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { ScaledSheet } from "react-native-size-matters";
  
  import { useDispatch, useSelector } from "react-redux";
  
  
  import MyButton from "../../components/MyButton";
  import { useLocalSearchParams, useRouter } from "expo-router";
  import { INPUT_BG, PRIMARY_COLOR } from "../../constants/colors";
  
  
  export default function bank() {
    const router = useRouter();





    const goToHelpLine = ()=>{

      router.replace('/customer-care')
    
    }
    
    
    
    return (
     
        <View style={styles.container}>
  
  
  
  
  
  
  
  
  
         
  
 
  
        
            
  
           
       
            <Text style={[styles.label, { fontSize: 22, marginVertical: 10 }]}>
            ব্যাংক একাউন্ট এর তথ্য জানার জন্য নিচের বাটন এ ক্লিক করে হেল্পলাইন এ যোগাযোগ করুন
          </Text>
        
         
        
  <MyButton title={'হেল্পলাইন'} onPress={goToHelpLine}/>
         
  
         
        </View>
  
    );
  }
  
  const styles = ScaledSheet.create({
    container: {
     flex:1,
      backgroundColor: "white",
      
  
      padding: "10@vs",
    },
  
  
    label: {
      color: PRIMARY_COLOR,
      fontSize: "18@s",
      textTransform: "uppercase",
      fontFamily: "BanglaSemiBold",
    },
  
  
    paymentStyle: {
      backgroundColor: PRIMARY_COLOR,
      borderRadius: "5@s",
      paddingVertical: "10@s",
      paddingHorizontal:'40@s',
      alignItems: "center",
      gap: "30@s",
    },
    paymentText: {
      fontSize: "20@s",
      color: "white",
      fontFamily: "BanglaSemiBold",
    },
  
  
    itemImage: {
      height: "60@vs",
      width: "40%",
      resizeMode:'contain'
    },
  
  
    numberStyle: {
      fontSize: "32@s",
      textAlign: "center",
      color: 'white',
      fontWeight: "bold",
      marginTop: -25,
    },
    
  });
  