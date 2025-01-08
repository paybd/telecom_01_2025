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
import { supabase } from "../../utils/supabase";
  
  
  export default function nagad() {
    const router = useRouter();

    const [wallet_no, setwallet_no] = useState('')


const getNagadWallet = async()=>{
  let { data, error } = await supabase
  .from('paymentAccounts')
  .select("*")

  // Filters
  .eq('wallet_type', 'nagad')

  if(data.length){
    setwallet_no(data[0].wallet_no)
  }

}

  useEffect(() => {

    getNagadWallet()
  
  }, [])



const goToHelpLine = ()=>{

  router.replace('/customer-care')

}




    
    return (
     
        <View style={styles.container}>
  
  
  
  
  
  
  
  
  
         
  
  <Text style={[styles.label, { fontSize: 22, marginVertical: 10 }]}>
            ১। নিচের নগদ নাম্বার এ টাকা পাঠান
          </Text>
  
        
            <View style={styles.paymentStyle}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap:10
                }}
              >
                <Image
                  style={styles.itemImage}
                  source={require("../../assets/images/nagad.png")}
                />
  
                <Text style={styles.paymentText}>নগদ পার্সোনাল</Text>
              </View>
  
              <Text style={styles.numberStyle}>{wallet_no}</Text>
            </View>
  
           
       
            <Text style={[styles.label, { fontSize: 22, marginVertical: 10 }]}>
            ২। নিচের বাটনে ক্লিক করে যত টাকা পাঠিয়েছেন সেই এমাউন্ট এবং যে নাম্বার থেকে টাকা পাঠিয়েছেন তার লাস্ট ৩ ডিজিট হেল্পলাইন এ পাঠিয়ে দিন
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
  