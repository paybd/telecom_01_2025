import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import { INPUT_BG, PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/colors'
import { supabase } from "../../utils/supabase";
import MyButton from "../../components/MyButton";
import Modal from "react-native-modal";
import { useRouter } from 'expo-router'
export default function index() {

const router = useRouter()

const [whatsapp, setwhatsapp] = useState('')
const [imo, setimo] = useState('')
const [showimoModal, setshowimoModal] = useState(false)
const getContactDetails = async()=>{

  
let { data: contacts, error } = await supabase
.from('contacts')
.select('*')





if(contacts?.length){
contacts.map((data,index)=>{
  if(data.contact_name==='whatsapp'){
    setwhatsapp(data.contact_link)
  }

  if(data.contact_name==='imo'){
    setimo(data.contact_link)
  }



})

}



        

}


useEffect(() => {
getContactDetails()
}, [])


const onWhatsappButtonClicked = async()=>{
  await Linking.openURL(whatsapp)
}


const onImoButtonClicked = async()=>{
setshowimoModal(true)
}


const goToCustomerCare = ()=>{


  
  router.push('/customer-care')
} 




  return (
    <SafeAreaView style={styles.container}>



   <Text style={{fontSize:18,fontFamily:'BanglaSemiBold',color:PRIMARY_COLOR}}>নিচের বাটন এ ক্লিক করে কাস্টমার কেয়ার এ যোগাযোগ করতে পারবেন </Text>
      

     <MyButton title={"কাস্টমার কেয়ার"} onPress={goToCustomerCare}/>

      <Text style={{fontSize:26,fontFamily:'BanglaSemiBold',color:SECONDARY_COLOR,textAlign:'center'}}>অথবা </Text>
      
      <Text style={{fontSize:18,fontFamily:'BanglaSemiBold',color:PRIMARY_COLOR}}>নিচের অপসন গুলো থেকে যেকোনো একটি যোগাযোগ মাধ্যম বেছে নিন</Text> 

      
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
               backgroundColor: INPUT_BG,
               alignItems: "center",
               justifyContent: "center",
               borderRadius: 10,
               gap: 5,
               elevation:10,
             }}
 
             onPress={onWhatsappButtonClicked}
 
 
           >
            <Image
              style={{
                height: "50%",
                width: "50%",
                resizeMode: "contain",
                borderRadius: 10,
              }}
              source={require("../../assets/icons/whatsapp.png")}
            />
 
             <Text style={{ fontSize: 18, fontFamily: "BanglaSemiBold" }}>
               হোয়াটসঅ্যাপ
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
               backgroundColor: INPUT_BG,
               alignItems: "center",
               justifyContent: "center",
               borderRadius: 10,
               gap: 5,
               elevation:10,
             }}
 
             onPress={onImoButtonClicked}
 
 
           >
             <Image
              style={{
                height: "50%",
                width: "50%",
                resizeMode: "contain",
                borderRadius: 10,
              }}
              source={require("../../assets/icons/imo.png")}
            />
 
             <Text style={{ fontSize: 18, fontFamily: "BanglaSemiBold" }}>
               ইমু
             </Text>
           </TouchableOpacity>
         </View>






       




         </View>




         <Modal
        isVisible={showimoModal}
        onBackdropPress={() => {
          setshowimoModal(false);

          
        }}
        onBackButtonPress={() => {
         setshowimoModal(false)
        }}
      >

 <View style={{width:'full',backgroundColor:'white',padding:10,borderRadius:10,alignItems:'center'}}>

  <Text style={{fontSize:20,fontFamily:'BanglaRegular',color:PRIMARY_COLOR}}>আমাদের সাথে নিচের ইমু নাম্বারে যোগাযোগ করতে পারবেন👇👇</Text>
        <Text style={{fontSize:22,fontFamily:'BanglaSemiBold',color:PRIMARY_COLOR}}>{imo}</Text>

        </View>



   
      </Modal>
















    </SafeAreaView>
  )
}


const styles = ScaledSheet.create({
    container:{
        flex:1,
       
        padding:10,
        paddingTop:20,
        backgroundColor:'white'
       
    },

    profileItem:{
      width:'full',
      
      backgroundColor:INPUT_BG,
      padding:10,
      borderRadius:10,
      gap:25
    },
    topTab: {
      width: "100%",
  marginTop:10,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
})

