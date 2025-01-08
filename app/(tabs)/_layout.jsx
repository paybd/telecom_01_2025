import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Image, Pressable, StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from '../../constants/colors';
import { AntDesign, EvilIcons, FontAwesome6 } from '@expo/vector-icons';




// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/


export default function TabLayout() {


  return (
    <Tabs
    
      screenOptions={{
        // tabBarActiveTintColor: COLOR1,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
        tabBarStyle: {
          height:60,
          paddingVertical:4,
     
         
        
          backgroundColor: PRIMARY_COLOR,
          borderTopWidth:0,
  
        
         
      },
      tabBarLabelStyle:{
        color:'white',
        fontSize:14,
  
        
        
       }
      

        
      }}>





      <Tabs.Screen
        name="index"
        options={{
          title: 'হোম',
          tabBarIcon: () =>  <FontAwesome
          name="home"
          style={{ fontSize: 29, color: 'white' }}
          />,
  
   
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                 
                    
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'হিস্টোরি',
          tabBarIcon: () =>  <FontAwesome
          name="history"
          style={{ fontSize: 29, color: 'white' }}
          />
        }}
      />



<Tabs.Screen
        name="contact"
        options={{
          title: 'যোগাযোগ',
          tabBarIcon: () =>  <AntDesign
          name="customerservice"
          style={{ fontSize: 29, color: 'white' }}
          />
        }}
      />
      
<Tabs.Screen
        name="profile"
        options={{
          title: 'প্রোফাইল',
          tabBarIcon: () =>  <EvilIcons
          name="user"
          style={{ fontSize: 33, color: 'white' }}
          />
        }}
      />




    </Tabs>
  );
}


const styles = StyleSheet.create({
  iconStyle: {
    height: '100%',
    width: '100%',
    resizeMode:'contain'
  },
});