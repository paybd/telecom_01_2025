import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import { INPUT_BG, PRIMARY_COLOR } from '../../constants/colors'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logout, signup } from '../redux/features/AuthSlice'
import { useRouter } from 'expo-router'
import { supabase } from '../../utils/supabase'
import Modal from "react-native-modal";
import MyButton from '../../components/MyButton'
import { changePasswordValidation, changePaymentValidation, changePinValidation } from '../../utils/validators'
export default function index() {
  const { userData } = useSelector((state) => state.auth);

const dispatch = useDispatch()
const router = useRouter()

const onLogout = ()=>{
  dispatch(logout())
  router.replace('/auth/login')

}


const [currentPassword, setcurrentPassword] = useState('')
const [newPassword, setnewPassword] = useState('')
const [confirmNewPassword, setconfirmNewPassword] = useState('')

const [currentPin, setcurrentPin] = useState("")
const [newpin, setNewpin] = useState("")
const [confirmNewPin, setconfirmNewPin] = useState("")

const [showPassChngmodal, setshowPassChngmodal] = useState(false)
const [showPymntChangeModal, setshowPymntChangeModal] = useState(false)

const [securePin, setsecurePin] = useState(true)
const [securePassword, setsecurePassword] = useState(true)

const onChangePin = async()=>{


try {
  const checkValid = changePinValidation(currentPin,newpin,confirmNewPin)

  if(!checkValid){
    return
  }




const { data, error } = await supabase
.from('users')
.update({ pin: newpin })
.eq('phone', userData.phone).eq('pin', currentPin)
.select()

if(data?.length){
  dispatch(signup(data[0]))
  ToastAndroid.show('পিন পরিবর্তন হয়েছে',ToastAndroid.SHORT)

}else{
  ToastAndroid.show('কিছু সমস্যা হয়েছে',ToastAndroid.SHORT)
}


setcurrentPin("")
setNewpin("")
setconfirmNewPin("")
setshowPymntChangeModal(false)
 



  

 
  
} catch (error) {
  console.log(error.message);
  setshowPymntChangeModal(false)
  
  
}       

}






const onChangePassword = async()=>{


  const checkValid = changePasswordValidation(userData.password,currentPassword,newPassword,confirmNewPassword)

  if(!checkValid){
    return
  }




const { data, error } = await supabase
.from('users')
.update({ password: newPassword })
.eq('email', userData.email)
.select()

if(error){
  ToastAndroid.show(error.message,ToastAndroid.SHORT)
  setshowPassChngmodal(false)

}else{
  dispatch(signup(data[0]))
  ToastAndroid.show('পাসওয়ার্ড পরিবর্তন হয়েছে',ToastAndroid.SHORT)
  setshowPassChngmodal(false)

  
}
        

}








  return (
    <SafeAreaView style={styles.container}>



<View style={{height:150,width:150,backgroundColor:INPUT_BG,borderRadius:'100%',marginVertical:15,alignSelf:'center',borderWidth:5,borderColor:PRIMARY_COLOR,position:'relative'}}>




 <Image
            source={{uri: userData?.photo}}
            style={{width: '100%', height: '100%', resizeMode:'cover',borderRadius:100}}
          />





<TouchableOpacity style={{position:'absolute',bottom:5,right:5,}}>
<FontAwesome6
name="camera"
style={{fontSize:34,color:INPUT_BG,textAlign:'center'}}
/>
</TouchableOpacity>





</View>







      <View style={styles.profileItem}>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:18,color:PRIMARY_COLOR,fontFamily:'BanglaSemiBold'}}>নাম</Text>
        <Text style={{fontSize:18,color:PRIMARY_COLOR,}}>{userData.name}</Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:18,color:PRIMARY_COLOR,fontFamily:'BanglaSemiBold'}}>ফোন</Text>
        <Text style={{fontSize:18,color:PRIMARY_COLOR}}>{userData.phone}</Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:18,color:PRIMARY_COLOR,fontFamily:'BanglaSemiBold'}}>পাসওয়ার্ড</Text>
        <Text style={{fontSize:18,color:PRIMARY_COLOR}}>{userData.password}</Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:18,color:PRIMARY_COLOR,fontFamily:'BanglaSemiBold'}}>পিন</Text>
      <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
      {
        securePin? <Text style={{fontSize:20,color:PRIMARY_COLOR}}>******</Text> :<Text style={{fontSize:18,color:PRIMARY_COLOR}}>{userData.pin}</Text>
      }
     <TouchableOpacity onPress={()=>setsecurePin(!securePin)}>
    {
      securePin ?   <FontAwesome6
      name="eye"
      style={{fontSize:20,color:PRIMARY_COLOR}}
      /> :   <FontAwesome6
      name="eye-slash"
      style={{fontSize:20,color:PRIMARY_COLOR}}
      />
    }
     </TouchableOpacity>

      </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:18,color:PRIMARY_COLOR,fontFamily:'BanglaSemiBold'}}>রেজিস্ট্রেশনের তারিখ</Text>
        <Text style={{fontSize:18,color:PRIMARY_COLOR}}>{new Date(userData.created_at).toLocaleDateString()}</Text>
        </View>




     



      </View>


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
 
             onPress={()=>{setshowPassChngmodal(true)}}
 
 
           >
            <MaterialIcons
            name='password'
            style={{fontSize:55,color:PRIMARY_COLOR}}
            />
 
             <Text style={{ fontSize: 18, fontFamily: "BanglaSemiBold" }}>
               পাসওয়ার্ড পরিবর্তন
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
 
             onPress={()=>{setshowPymntChangeModal(true)}}
 
 
           >
            <MaterialIcons
            name='security'
            style={{fontSize:55,color:PRIMARY_COLOR}}
            />
 
             <Text style={{ fontSize: 18, fontFamily: "BanglaSemiBold" }}>
               পিন পরিবর্তন
             </Text>
           </TouchableOpacity>
         </View>


         <TouchableOpacity
             style={{
               height: 56,
               width: "100%",
               backgroundColor: INPUT_BG,
               alignItems: "center",
               justifyContent: "center",
               borderRadius: 10,
               gap: 5,
               elevation:10,
               marginTop:10,
               flexDirection:'row'
             }}
 
             onPress={onLogout}
 
 
           >

<MaterialIcons
            name='logout'
            style={{fontSize:30,color:PRIMARY_COLOR}}
            />
            
            
            <Text style={{fontSize:18,color:PRIMARY_COLOR,fontFamily:'BanglaSemiBold'}}>লগ আউট</Text>
           
          
           
           </TouchableOpacity>


         </View>







         <Modal
        isVisible={showPassChngmodal}
        onBackdropPress={() => {
          setshowPassChngmodal(false);
          setcurrentPassword('')
          setnewPassword('')
          setconfirmNewPassword('')
        }}
        onBackButtonPress={() => {
          setshowPassChngmodal(false);
        }}
      >


        <View style={{width:'full',backgroundColor:'white',padding:10,borderRadius:10}}>

          <Text style={{fontSize:22,color:PRIMARY_COLOR,fontFamily:'BanglaSemiBold',textAlign:'center'}}>পাসওয়ার্ড পরিবর্তন</Text>

<View style={{gap:10}}>
  <View>
  <Text style={styles.label}>বর্তমান পাসওয়ার্ড</Text>

<TextInput
style={styles.inputStyle}

value={currentPassword}
onChangeText={setcurrentPassword}
placeholder='বর্তমান পাসওয়ার্ড টাইপ করুন'
/>
  </View>



  <View>
  <Text style={styles.label}>নতুন পাসওয়ার্ড</Text>

<TextInput
style={styles.inputStyle}

value={newPassword}
onChangeText={setnewPassword}
placeholder='নতুন পাসওয়ার্ড টাইপ করুন'

/>
  </View>





  <View>
  <Text style={styles.label}>কনফার্ম নতুন পাসওয়ার্ড</Text>

<TextInput
style={styles.inputStyle}

value={confirmNewPassword}
onChangeText={setconfirmNewPassword}
placeholder='নতুন পাসওয়ার্ড আবার টাইপ করুন'
/>
  </View>


<MyButton
title={'কনফার্ম'}
onPress={onChangePassword}
/>

</View>


        </View>
      </Modal>







      <Modal
        isVisible={showPymntChangeModal}
        onBackdropPress={() => {
          setshowPymntChangeModal(false);
setcurrentPin("")
setNewpin("")
setconfirmNewPin("")
          
        }}
        onBackButtonPress={() => {
          setshowPassChngmodal(false);
          setshowPymntChangeModal(false);
          setcurrentPin("")
          setNewpin("")
          setconfirmNewPin("")
        }}
      >


        <View style={{width:'full',backgroundColor:'white',padding:10,borderRadius:10}}>

          <Text style={{fontSize:22,color:PRIMARY_COLOR,fontFamily:'BanglaSemiBold',textAlign:'center'}}>পিন পরিবর্তন</Text>

<View style={{gap:10}}>
  <View>
  <Text style={styles.label}>বর্তমান পিন</Text>

<TextInput
style={styles.inputStyle}

value={currentPin}
onChangeText={setcurrentPin}
placeholder='বর্তমান পিন টাইপ করুন'
keyboardType='numeric'

/>
  </View>



  <View>
  <Text style={styles.label}>নতুন পিন</Text>

<TextInput
style={styles.inputStyle}

value={newpin}
onChangeText={setNewpin}
placeholder='নতুন পিন টাইপ করুন'
keyboardType='numeric'
/>
  </View>





  <View>
  <Text style={styles.label}>কনফার্ম নতুন পিন</Text>

<TextInput
style={styles.inputStyle}

value={confirmNewPin}
onChangeText={setconfirmNewPin}
placeholder='নতুন পিন পুনরায় টাইপ করুন'
keyboardType='numeric'

/>
  </View>


<MyButton
title={'কনফার্ম'}
onPress={onChangePin}
/>

</View>


        </View>
      </Modal>









    </SafeAreaView>
  )
}


const styles = ScaledSheet.create({
    container:{
        flex:1,
       
        padding:10,
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


label:{
  fontSize:18,
  color:PRIMARY_COLOR,
  fontFamily:'BanglaSemiBold'
  

},
  inputStyle:{
    
      width:'full',
      backgroundColor:INPUT_BG,
      padding:10,
      borderRadius:10,
      fontSize:18,
      color:PRIMARY_COLOR,
      fontFamily:'BanglaRegular'
      
      
  

  }
})

