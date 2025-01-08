import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  INPUT_BG,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from "../../constants/colors";
import { AntDesign, Entypo, EvilIcons, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../utils/supabase";
import { updateUserBalance } from "../redux/features/AuthSlice";

export default function index() {
const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.auth);


console.log(userData);


  const router = useRouter()
  const [balanceshow, setbalanceshow] = useState(false);

  const showbalance = async () => {

let { data: users, error } = await supabase
.from('users')
.select('balance').eq('phone', userData.phone)


dispatch(updateUserBalance(users[0].balance))


    setbalanceshow(true);

    setTimeout(() => {
      setbalanceshow(false);
    }, 2000);
  };



const [homeImage, sethomeImage] = useState('')
  const getHomeImage = async()=>{

let { data, error } = await supabase
.from('homeImage')
.select('*')



if(data.length){
  sethomeImage(data[0].image_link)
}
        
  }


useEffect(() => {
  getHomeImage()
}, [])





  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            height: 85,
            width: 65,
            borderWidth:2,
            borderColor:'white',
            borderRadius:5
            

           
          }}
        >
         
 <Image
            source={{uri: userData?.photo}}
            style={{width: '100%', height: '100%', resizeMode:'cover',borderRadius:5}}
          />



        </View>

        <View>
          <Text style={styles.welcome}>স্বাগতম!</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Text style={styles.logo_label}>{userData?.name}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            {balanceshow ? (
              <TouchableOpacity style={styles.balance}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "BanglaBold",
                    color: PRIMARY_COLOR,
                  }}
                >
                  {userData.balance} টাকা
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.balance}
                onPress={() => showbalance()}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "BanglaBold",
                    color: PRIMARY_COLOR,
                  }}
                >
                  ব্যালেন্স জানতে ট্যাপ করুন
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{
                height: 32,
                width: 64,
                backgroundColor: "white",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => router.push("add-balance")}
            >
              <FontAwesome6
                name="circle-plus"
                style={{ fontSize: 25, color: PRIMARY_COLOR }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
<View style={styles.itemWrapper}>
        <View style={{ width: "33.33%", padding: 10 }}>
          <TouchableOpacity style={styles.itemStyle} onPress={()=>router.push('add-balance')}>
            <FontAwesome6
              name="circle-plus"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >
              এড ব্যালেন্স
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "33.33%", padding: 10 }}>
        <TouchableOpacity style={styles.itemStyle} onPress={()=>router.push('mobile-banking')}>
            <FontAwesome6
              name="mobile-button"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >মোবাইল ব্যাংকিং
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "33.33%", padding: 10 }}>
        <TouchableOpacity style={styles.itemStyle} onPress={()=>router.push('withdraw')}>
            <MaterialCommunityIcons
              name="bank"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >
              ব্যাংকিং
            </Text>
          </TouchableOpacity>
        </View>


        <View style={{ width: "33.33%", padding: 10 }}>
        <TouchableOpacity style={styles.itemStyle} onPress={()=>router.push('withdraw')}>
            <Entypo
              name="old-phone"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >
              রিচার্জ
            </Text>
          </TouchableOpacity>
        </View>




        <View style={{ width: "33.33%", padding: 10 }}>
        <TouchableOpacity style={styles.itemStyle} onPress={()=>router.push('withdraw')}>
            <FontAwesome5
              name="globe-americas"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >
              রেমিট্যান্স
            </Text>
          </TouchableOpacity>
        </View>



        <View style={{ width: "33.33%", padding: 10 }}>
        <TouchableOpacity style={styles.itemStyle} onPress={()=>router.push('withdraw')}>
            <MaterialIcons
              name="sim-card"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >
              সিম অফার
            </Text>
          </TouchableOpacity>
        </View>






        <View style={{ width: "33.33%", padding: 10 }}>
        <TouchableOpacity style={styles.itemStyle} onPress={()=>router.push('withdraw')}>
            <Ionicons
              name="receipt"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >
              বিল পে
            </Text>
          </TouchableOpacity>
        </View>




        <View style={{ width: "33.33%", padding: 10 }}>
        <TouchableOpacity style={styles.itemStyle} onPress={()=>router.push('withdraw')}>
            <MaterialIcons
              name="savings"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >
             সেভিংস
            </Text>
          </TouchableOpacity>
        </View>










        <View style={{ width: "33.33%", padding: 10 }}>
        <TouchableOpacity style={styles.itemStyle} onPress={()=>router.push('withdraw')}>
            <MaterialCommunityIcons
              name="currency-bdt"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >
              লোন
            </Text>
          </TouchableOpacity>
        </View>







        <View style={{ width: "100%", padding: 10 }}>
        <View style={[styles.itemStyle,{height:150}]}> 
        <Image
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={{
              uri: homeImage,
            }}
          />
            
          </View>
        </View>

        


        <View style={{ width: "33.33%", padding: 10 }}>
        <TouchableOpacity style={styles.itemStyle} onPress={()=>router.push('/customer-care')}>
            <AntDesign
              name="customerservice"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >
              কাস্টমার কেয়ার   
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{ width: "33.33%", padding: 10 }}>
        <TouchableOpacity style={styles.itemStyle} onPress={()=>router.push('/groupChats')}>
            <Octicons
              name="comment-discussion"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >
              গ্রুপ চ্যাট
            </Text>
          </TouchableOpacity>
        </View> */}

       

        <View style={{ width: "33.33%", padding: 10 }}>
        <TouchableOpacity style={styles.itemStyle} onPress={()=>router.push('leaderboard')}>
            <Entypo
              name="folder-video"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >
              টিউটোরিয়াল
            </Text>
          </TouchableOpacity>
        </View>

      

        <View style={{ width: "33.33%", padding: 10 }}>
        <View style={styles.itemStyle}>
            <FontAwesome6
              name="building-user"
              style={{ fontSize: 50, color: PRIMARY_COLOR }}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",

                color: PRIMARY_COLOR,
                fontFamily: "BanglaSemiBold",
              }}
            >
              কোম্পানী সম্পর্কে
            </Text>
          </View>
        </View>
      </View> 
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,

    padding: 10,
  },

  header: {
    height: "16%",
    backgroundColor: PRIMARY_COLOR,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    margin: -10,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    zIndex: 1000,
    alignItems:'center',
  },

  welcome: {
    fontFamily: "BanglaRegular",
    fontSize: 18,
    color: "white",
  },

  logo_label: {
    fontSize: "18@s",
    fontFamily: "BanglaRegular",
    color: "#F5EFE6",
    textTransform: "uppercase",
  },
  balance: {
    backgroundColor: "white",
    padding: "5@s",
    borderRadius: "5@s",
    minWidth: "150@s",
    alignItems: "center",
  },

  itemWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: INPUT_BG,
    margin: -10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  itemStyle: {
    backgroundColor: "white",
    height: 100,
    borderRadius: 10,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});
