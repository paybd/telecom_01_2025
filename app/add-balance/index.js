import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { INPUT_BG, PRIMARY_COLOR } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function index() {
 const router = useRouter()

  const onSelectOption = (option) => {
   if(option==='bkash'){
    router.push('/add-balance/bkash')
   }

   if(option==='nagad'){
    router.push('/add-balance/nagad')
   }

   if(option==='bank'){
    router.push('/add-balance/bank')
   }

   if(option==='crypto'){
    router.push('/add-balance/crypto')
   }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topTab}>
       


      <View
          style={{
            width: "50%",
            padding: 5,
          }}
        >
          <TouchableOpacity
            style={{
              height: 100,
              width: "100%",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              gap: 5,
              elevation:10,
            }}

            onPress={()=>onSelectOption('bkash')}


          >
            <Image
              style={{
                height: "50%",
                width: "50%",
                resizeMode: "contain",
                borderRadius: 10,
              }}
              source={require("../../assets/images/bkash.png")}
            />

            <Text style={{ fontSize: 18, fontFamily: "BanglaSemiBold" }}>
              বিকাশ
            </Text>
          </TouchableOpacity>
        </View>




        <View
          style={{
            width: "50%",
            padding: 5,
          }}
        >
          <TouchableOpacity
            style={{
              height: 100,
              width: "100%",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              gap: 5,
              elevation:10,
            }}
            onPress={()=>onSelectOption('nagad')}


          >
            <Image
              style={{
                height: "50%",
                width: "50%",
                resizeMode: "contain",
                borderRadius: 10,
              }}
              source={require("../../assets/images/nagad.png")}
            />

            <Text style={{ fontSize: 18, fontFamily: "BanglaSemiBold" }}>
              নগদ
            </Text>
          </TouchableOpacity>
        </View>








        <View
          style={{
            width: "50%",
            padding: 5,
          }}
        >
          <TouchableOpacity
            style={{
              height: 100,
              width: "100%",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              gap: 5,
              elevation:10,
            }}

            onPress={()=>onSelectOption('bank')}

          >
            <Image
              style={{
                height: "50%",
                width: "50%",
                resizeMode: "contain",
                borderRadius: 10,
              }}
              source={require("../../assets/images/bank.png")}
            />

            <Text style={{ fontSize: 18, fontFamily: "BanglaSemiBold" }}>
              ব্যাংক
            </Text>
          </TouchableOpacity>
        </View>








        <View
          style={{
            width: "50%",
            padding: 5,
          }}
        >
          <TouchableOpacity
            style={{
              height: 100,
              width: "100%",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              gap: 5,
              elevation:10,
            }}

            onPress={()=>onSelectOption('crypto')}

          >
            <Image
              style={{
                height: "50%",
                width: "50%",
                resizeMode: "contain",
                borderRadius: 10,
              }}
              source={require("../../assets/images/crypto.png")}
            />

            <Text style={{ fontSize: 18, fontFamily: "BanglaSemiBold" }}>
              ক্রিপ্টো
            </Text>
          </TouchableOpacity>
        </View>



      </View>

      {/* <View style={{flex:1,backgroundColor:PRIMARY_COLOR}}>

</View> */}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  topTab: {
    width: "100%",

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
