







import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { StatusBar } from 'expo-status-bar';
import { useNetInfo } from '@react-native-community/netinfo';
import { Image, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { PRIMARY_COLOR } from '../constants/colors';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
    BanglaRegular: require("../assets/fonts/uni_bangla_regular.ttf"),
BanglaBold: require("../assets/fonts/uni_bangla_bold.ttf"),
BanglaSemiBold: require("../assets/fonts/uni_bangla_semibold.ttf"),
PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
PoppinsBold: require("../assets/fonts//Poppins-Bold.ttf"),
PoppinsSemiBold: require("../assets/fonts//Poppins-SemiBold.ttf"),
RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
RobotoBold: require("../assets/fonts//Roboto-Bold.ttf"),
RobotoSemiBold: require("../assets/fonts//Roboto-Medium.ttf"),





  });




  const { isConnected } = useNetInfo();










  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }



  return isConnected ? <RootLayoutNav /> :  <View style={styles.container}>
   
  <View style={styles.logo}>

{/* <Image
source={require("../assets/images/home.png")}
style={{ height: "100%", width: "100%", resizeMode: "contain" }}
/> */}

{/* <LottieView
       style={{height: '100%', width: '100%'}}
       source={require('../../assets/animation/signup_2.json')}
       autoPlay
       loop
     /> */}




</View>

   





        <Text style={[styles.messageStyle,{marginTop:20,color:'white'}]}>No Internet!</Text>



      
</View>;
}

function RootLayoutNav() {
  


  return (



    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

    <StatusBar backgroundColor={PRIMARY_COLOR} />

    
    <Stack>

   
  
    
    <Stack.Screen name="(tabs)" options={{headerShown:false}}/> 
    <Stack.Screen name="index" options={{headerShown:false}}/> 
   
    <Stack.Screen name="auth/signup/index" options={{title:'SIGNUP', headerTitleAlign:'center', headerTintColor:'white',headerStyle:{backgroundColor:PRIMARY_COLOR}}}/> 
    <Stack.Screen name="auth/signup/final" options={{title:'SIGNUP', headerTitleAlign:'center', headerTintColor:'white',headerStyle:{backgroundColor:PRIMARY_COLOR}}}/> 
    
    
    
    <Stack.Screen name="auth/login/index" options={{title:'LOGIN', headerTitleAlign:'center', headerTintColor:'white',headerStyle:{backgroundColor:PRIMARY_COLOR,}}}/> 
    
    <Stack.Screen name="add-balance/index" options={{title:'এড ব্যালেন্স', headerTitleAlign:'center', headerTintColor:'white',headerStyle:{backgroundColor:PRIMARY_COLOR}}}/> 
       
    <Stack.Screen name="add-balance/bkash" options={{title:'বিকাশ', headerTitleAlign:'center', headerTintColor:'white',headerStyle:{backgroundColor:PRIMARY_COLOR}}}/> 
    <Stack.Screen name="add-balance/nagad" options={{title:'নগদ', headerTitleAlign:'center', headerTintColor:'white',headerStyle:{backgroundColor:PRIMARY_COLOR}}}/> 
    <Stack.Screen name="add-balance/bank" options={{title:'ব্যাংক', headerTitleAlign:'center', headerTintColor:'white',headerStyle:{backgroundColor:PRIMARY_COLOR}}}/> 
    <Stack.Screen name="add-balance/crypto" options={{title:'ক্রিপ্টো', headerTitleAlign:'center', headerTintColor:'white',headerStyle:{backgroundColor:PRIMARY_COLOR}}}/> 
    
  
    <Stack.Screen name="customer-care/index" options={{title:'কাস্টমার কেয়ার', headerTitleAlign:'center', headerTintColor:'white',headerStyle:{backgroundColor:PRIMARY_COLOR}}}/> 
   
    <Stack.Screen name="groupChats/index" options={{title:'গ্রুপ ডিসকাশন', headerTitleAlign:'center', headerTintColor:'white',headerStyle:{backgroundColor:PRIMARY_COLOR}}}/> 
    

    <Stack.Screen name="mobile-banking/index" options={{title:'মোবাইল ব্যাংকিং', headerTitleAlign:'center', headerTintColor:'white',headerStyle:{backgroundColor:PRIMARY_COLOR}}}/> 
   





</Stack>



    </PersistGate>
  </Provider>








  );
}




const styles = ScaledSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:PRIMARY_COLOR
  },
  messageStyle:{
      fontSize:'14@s',
      color:'green',
      fontWeight:'bold',
      textAlign:'center',
      marginTop:-15
     
  },
  logo: {
    width: '150@s',
    height: '150@vs',

  },
  title: {
    fontSize: '22@s',
    fontWeight: 'bold',
    color: '#4fc3fe',
    marginBottom:'16@vs'
  },
})