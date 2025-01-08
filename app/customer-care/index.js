// import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useSelector } from 'react-redux';



import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase';

export default function index() {
    const [messages, setMessages] = useState([])
    const { userData } = useSelector((state) => state.auth);




    const getAllMessages = async()=>{
console.log('hii');

        // const chatId = "admin@gmail.com"+userData.email

let { data: customerCare, error } = await supabase
.from('customerCare')
.select('*').eq("chatId","admin@gmail.com"+userData.email)

console.log("data is");


console.log(error);



if(customerCare.length){
setMessages(customerCare?.reverse())
}
        
}



    useEffect(() => {
       getAllMessages()
      }, [])




      const onSend = async(messages) => {


console.log(messages);


        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        )


        const newMessage = {
            ...messages[0],
            chatId: "admin@gmail.com"+userData.email,
            senderEmail: userData.email,
        }




        const { data, error } = await supabase
        .from('customerCare')
        .insert([
          { ...newMessage },
        ])
        .select()

        console.log('error is ');
        


        console.log(error);
        
                
                


      }





  useEffect(() => {
 
const channels = supabase.channel('custom-all-channel')
.on(
  'postgres_changes',
  { event: '*', schema: 'public', table: 'customerCare' },
  (payload) => {
    getAllMessages()
   
  }
)
.subscribe()

    return () => {
      supabase.removeChannel(channels);
    };
  }, []);









    

  return (

          <GiftedChat

          
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: userData.email,
        name: userData.name,
        avatar:''
      }}
    />
 
  )
}