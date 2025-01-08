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
      .eq("orderBy", userData.phone)
     

console.log(data);

      
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
    <ScrollView style={{ backgroundColor: INPUT_BG, padding: 10 }}>
      <SafeAreaView style={styles.container}>
       
  {
    history?.map((data,index)=>{
      return <View style={styles.historyItem} key={data.id}>
      <View style={{}}>
        {
          data.transaction==='mobile_banking' && <Text
          style={{
            fontSize: 28,
            color: 'white',
            fontFamily: "BanglaBold",
             color:PRIMARY_COLOR,
           textTransform:'uppercase',
           
             
          }}
        >
          মোবাইল ব্যাংকিং <Text style={{color:'red',fontSize:18}}>{data.mobile_banking}</Text>
        </Text>
        }


{
          data.transaction==='bank_transfer' && <Text
          style={{
            fontSize: 28,
            color: 'white',
            fontFamily: "BanglaBold",
             color:PRIMARY_COLOR,
           textTransform:'uppercase',
           
             
          }}
        >
          ব্যাংক ট্রান্সফার <Text style={{color:'red',fontSize:18}}>{data.bank}</Text>
        </Text>
        }




{
          data.transaction==='drive_offer' && <Text
          style={{
            fontSize: 28,
            color: 'white',
            fontFamily: "BanglaBold",
             color:PRIMARY_COLOR,
           textTransform:'uppercase',
           
             
          }}
        >
          সিম অফার <Text style={{color:'red',fontSize:18}}>{data.operator}</Text>
        </Text>
        }




{
          data.transaction==='' && <Text
          style={{
            fontSize: 28,
            color: 'white',
            fontFamily: "BanglaBold",
             color:PRIMARY_COLOR,
           textTransform:'uppercase',
           
             
          }}
        >
          রিচার্জ<Text style={{color:'red',fontSize:18}}>{data.operator}</Text>
        </Text>
        }







        





       {
        data.transaction==='mobile_banking' ?  <Text
        style={{
          fontSize: 24,
          color: PRIMARY_COLOR,
          fontFamily: "BanglaSemiBold",
        }}
      >
        {data.phone} <Text style={{color:'red',fontSize:18}}>{data.payment_method}</Text>
      </Text> :  <Text
          style={{
            fontSize: 24,
            color: PRIMARY_COLOR,
            fontFamily: "BanglaSemiBold",
          }}
        >
          {data.amount} টাকা
        </Text>
       }



<Text
          style={{
            fontSize: 24,
            color: PRIMARY_COLOR,
            fontFamily: "BanglaSemiBold",
          }}
        >
           {data.amount} টাকা
        </Text>
        

      {
        data.status==='success' &&   <Text
        style={{
          fontSize: 24,
          color: SECONDARY_COLOR,
          fontFamily: "BanglaSemiBold",
         
        }}
      >
        কমিশন: {parseInt(data.commission)} টাকা
      </Text>
      }


{
        data.pin &&  <Text
        style={{
          fontSize: 24,
          color: SECONDARY_COLOR,
          fontFamily: "BanglaSemiBold",
         
        }}
      >
        পিন: {data.pin}
      </Text>
      }






        <Text style={{ fontSize: 20, color: 'green' }}>
          {new Date(data.created_at).toLocaleDateString()}
        </Text>
      </View>


      <View style={{position:'absolute',top:0,right:0}}>
      {
        data.status==='pending' && <Text
        style={{
          backgroundColor: "yellow",
          borderTopRightRadius: 5,
          padding: 10,
          color: PRIMARY_COLOR,
          fontWeight: "bold",
          fontSize: 13,
          textTransform:'uppercase',
        
        }}
      >
        {data.status}
      </Text>
      }


{
        data.status==='failed' && <Text
        style={{
          backgroundColor: "red",
          borderTopRightRadius: 5,
          padding: 10,
          color: 'white',
          fontWeight: "bold",
          fontSize: 13,
          textTransform:'uppercase',
        
        }}
      >
        {data.status}
      </Text>
      }


{
        data.status==='success' && <Text
        style={{
          backgroundColor: "green",
          borderTopRightRadius: 5,
          padding: 10,
          color: 'white',
          fontWeight: "bold",
          fontSize: 13,
          textTransform:'uppercase',
        
        }}
      >
        {data.status}
      </Text>
      }
      </View>

     
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
    position:'relative',
    elevation:5
  },
});
