import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { INPUT_BG, PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";
import { useSelector } from "react-redux";

export default function index() {
  const { userData } = useSelector((state) => state.auth);
const [history, sethistory] = useState([])
  const getHistory = async () => {

console.log('ijkhjkgh');


    let { data, error } = await supabase
      .from("history")
      .select("*")
      .eq("order_by", userData.email)
     


      
    if (data.length) {
     sethistory(data)
    }
  };


  useEffect(() => {
    
  
    getHistory()
  }, [])
  


  useEffect(() => {
 
    const channels = supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'history' },
      (payload) => {
getHistory()
       
      }
    )
    .subscribe()
    
        return () => {
          supabase.removeChannel(channels);
        };
      }, []);
    
    
    
    
    
    
    


  return (
    <ScrollView style={{ backgroundColor: PRIMARY_COLOR, padding: 10 }}>
      <SafeAreaView style={styles.container}>
       
  {
    history?.map((data,index)=>{
      return <View style={styles.historyItem} key={data.id}>
      <View style={{width:'70%'}}>
        {
          data.request_type==='deposit' ? <Text
          style={{
            fontSize: 30,
            color: 'white',
            fontFamily: "BanglaBold",
              backgroundColor:PRIMARY_COLOR,
           
            padding:5,
             width:'70%'
          }}
        >
          ডিপোজিট
        </Text> : <Text
          style={{
            fontSize: 30,
            color: 'white',
            fontFamily: "BanglaBold",
            backgroundColor:SECONDARY_COLOR,
      
            padding:5,
            width:'50%'
          }}
        >
          উইথড্র
        </Text>
        }



<Text
          style={{
            fontSize: 24,
            color: PRIMARY_COLOR,
            fontFamily: "BanglaSemiBold",
          }}
        >
          গেম আইডি: {data.game_id}
        </Text>

        





        <Text
          style={{
            fontSize: 24,
            color: PRIMARY_COLOR,
            fontFamily: "BanglaSemiBold",
          }}
        >
          এমাউন্ট: {data.amount} টাকা
        </Text>

        <Text
          style={{
            fontSize: 24,
            color: SECONDARY_COLOR,
            fontFamily: "BanglaSemiBold",
           
          }}
        >
          কমিশন: {parseInt(data.commission)} টাকা
        </Text>






        <Text style={{ fontSize: 16, color: 'green' }}>
          {new Date(data.created_at).toLocaleDateString()}
        </Text>
      </View>

      {
        data.status==='processing' && <Text
        style={{
          backgroundColor: "yellow",
          borderRadius: 5,
          padding: 10,
          color: PRIMARY_COLOR,
          fontWeight: "bold",
          fontSize: 13,
          textTransform:'uppercase',
          width:'30%'
        }}
      >
        {data.status}
      </Text>
      }


{
        data.status==='failed' && <Text
        style={{
          backgroundColor: SECONDARY_COLOR,
          borderRadius: 5,
         textAlign:'center',
         paddingVertical:5,
          color: "white",
          fontWeight: "500",
          fontSize: 18,
           textTransform:'uppercase',
           width:'30%'
        }}
      >
        {data.status}
      </Text>
      }


{
        data.status==='success' && <Text
        style={{
          backgroundColor: "green",
          borderRadius: 5,
          textAlign:'center',
         paddingVertical:5,
          color: "white",
          fontWeight: "500",
          fontSize: 18,
           textTransform:'uppercase',
           width:'30%'
        }}
      >
        {data.status}
      </Text>
      }
    </View>
    })
  }








      </SafeAreaView>
    </ScrollView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    gap: 10,

  },

  historyItem: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
