
import React, {useState, useEffect} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';


import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';


import Icon from "@expo/vector-icons/FontAwesome6";
import { Bubble, Composer, GiftedChat, Send } from 'react-native-gifted-chat';
import { INPUT_BG, PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/colors';
import { supabase } from '../../utils/supabase';






export default function GroupChat() {
  const [messages3, setMessages3] = useState([]);
  

  const {userData} = useSelector(state => state.auth);

  const [tempArray1, settempArray1] = useState([]);
  const [tempArray2, settempArray2] = useState([]);


const [photo, setPhoto] = useState('')



const getAllmessage = async()=>{
    let { data: GroupChats, error } = await supabase
  .from('GroupChats')
  .select('*').eq('senderEmail', userData.email).order('createdAt', { ascending: false })



  

  if(!error){
 
    
 
      settempArray1(GroupChats);
  }

}









const getApprovedmessage = async()=>{
    let { data: GroupChats, error } = await supabase
  .from('GroupChats')
  .select('*').neq('senderEmail', userData.email).eq('isApproved', true).order('createdAt', { ascending: false })

  if(!error){
   
      settempArray2(GroupChats);
  }

}





  useEffect(() => {

getAllmessage()
getApprovedmessage()


  }, []);


  useEffect(() => {

    const m3 = [...tempArray1,...tempArray2]

    m3.sort(function(x, y){
      return new Date(x.createdAt) - new Date(y.createdAt);
  })
    setMessages3(m3.reverse())
  }, [tempArray1,tempArray2])








  useEffect(() => {
 
const channels = supabase.channel('custom-all-channel')
.on(
  'postgres_changes',
  { event: '*', schema: 'public', table: 'GroupChats' },
  (payload) => {
    getAllmessage()
getApprovedmessage()
   
  }
)
.subscribe()

    return () => {
      supabase.removeChannel(channels);
    };
  }, []);











  
  

const [sendingMessage, setsendingMessage] = useState(false)

  const onSend = async messageArray => {
    setsendingMessage(true)

    const msg = messageArray[0];
    
    let myMsg = null;

      myMsg = {...msg, senderEmail: userData.email, sent: true, isApproved: false};
   

    setMessages3(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );

    

    const { data, error } = await supabase
    .from('GroupChats')
    .insert([
      { ...myMsg },
    ])
    .select()




    setsendingMessage(false)


//     let { data: Admin, error:adminerror } = await supabase
//     .from('Admin')
//     .select('fcmToken')
  
  
//     if(adminerror){
//       return
//     }
    
  
  


//     await sendFcmNotificationToAdmin(
// Admin[0]?.fcmToken,
//       'নতুন গ্রুপ ম্যাসেজ',
//       `${userData.name} গ্রুপে একটি নতুন ম্যাসেজ পাঠিয়েছেন`,
 
//     );

   

  
      
  };











  const nameArray = [
    'Abdullah Al Rakib',
    'Sabuj Hosen',
    'Niamot Ullah',
    'Shariar Sojib',
    'Md Sofik Hosen',
    'Rejaul Karim',
    'Akhlas Hosen',
    'Afsana Mim',
    'Md Foysal Hosen',
    'Maruf Hosen',
    'Rakibul Hasan',
    'Sobuj Mondol',
    'Md Shahidul Alam',
    'ABU HANIF',
    'AHAD HOSSAIN',
    'GOLAM SAKHLAIN',
    'RONY AHMED',
    'YOUNUS ALI',
    'SAJID HOSSAIN',
    'ARMAN AHMED',
    'ATIKUR AHMED',
    'SHIHAB',
    'SAFI ISLAM',
    'FAHIM,RAYHAN',
    'MUSA',
    'MINHAZ ALI',
    'RIDOY AHMED',
    'NUR ISLAM',
    'ANOWAR HOSSAIN',
    'RIYAD HOSSAIN',
    'SOHAN HOSSAIN',
    'ASHIM HOSSAIN',
    'SAJU AHMED',
    'SAMIUL ISLAM',
    'SHEHAB',
    'NABIUL ISLAM NABIL',
    'MASUM RANA',
    'BIPLOB HOSSAIN',
    'TOHIDUL ISLAM',
    'ASHIK HOSSAIN',
    'OMER ALI',
    'SHOUROV HOSSAIN',
    'SONY',
    'SAMIUL ISLAM',
    'AKASH KHAN',
    'ATIK HOSSAIN',
    'ASIF IKBAL',
    'ASHIK HOSSAIN',
    'SAGOR KUMAR',
    'SOBAHAN ALI',
    'SHIBLU',
    'MUHAMMOD SIDDIK',
    'SAJID HOSSAIN',
    'HIMEL HOSAIN',
    'NASIR UDDIN',
    'ABU HASSAN',
    'SAMIM HOSSAIN',
    'SAGOR',
    'EMRAN HOSSAIN',
    'SANOWAR HOSSAIN',
    'RASEL Hosen',
    'EMON KHAN',
    'Abu BOKKOR',
    'BIPLOB HOSSAIN',
    'SHAH ALOM',
    'JOBAYER HOSSAIN',
    'AJADUL ISLAM',
    'ASAD Ahmed',
    'RIMON Hosen',
    'MASRUF AHMED',
    'TORAB ALI',
    'RAHIM Badshah',
    'JISAN AHMED',
    'SHOHEL RANA',
    'SHOHIDUL ISLAM',
    'JAMIL HOSSAIN',
    'RAKIBUL ISLAM',
    'SHAHADOT ALI',
    'PALLAB HOSSAIN',
    'JONY HOSSAIN',
    'SHAKOWAT HOSSAIN',
    'Arafat Hossain',
    'Najmul Hossain',
    'Masud Rana',
    'shoykot Ali',
    'Akter Hossen',
    'Monir Khan',
    'Abd al-Rahaman',
    'Abu hena',
    'Abul bashar',
    'Abdul Hakim',
    'Abul Kalam',
    'Aftab Ahmed',
    'Mahmudul Hassan',
    'Alomgir Kabir',
    'Ali Reja',
    'Alauddin',
    'Abdullah',
    'Sakil Hossain',
    'Anisul',
    'Azad Ali',
    'Azizul haque',
    'Bablu',
    'Danish',
    'Diliwar Khan',
    'Forhad Hosen',
    'Ripon Ahmed',
    'Shahajan Ali',
    'Nojrul hoque',
    'Ferdous Ahmed',
    'Ferujul Khan',
    'Saiful Islam',
    'Mehede Hassan',
    'Golam mohiuddin',
    'golam mostofa',
    'Golam Rabbany',
    'Rofik',
    'Mahabobur Rahaman',
    'Motiur Rahaman',
    'Mojammel huqe',
    'Murad',
    'Raza',
    'Riaz Hosen',
    'Saddam Hossain',
    'Rifat Hossain',
    'Nayem Hossain',
    'Rocky',
    'Rabbi Hasan',
    'Nasim Hossain',
    'Togor Khan',
    'Maruf Hossain',
    'morshed alom',
    'Rahamat Hossain',
    'zihad',
    'Jakir Hossain',
    'Sabbir Hossain',
    'dipo Chodhury',
    'khorshed alom',
    'habibur Rahaman',
    'monsur',
    'Sojib Hossain',
    'Rana Ahmed',
    'Ferajul Islam',
    'nayon Khan',
    'Aminur islam',
    'Ripon Ahmed',
    'joinal',
    'shovo',
    'Naoshad patwari',
    'riful islam',
    'Milon Khan',
    'Yousuf Hossain',
    'Alamin',
    'Raton Ahmed',
    'Anik Hossain',
    'hafijul Islam',
    'Salim Khan',
    'soboj Hossain',
    'Rohul Amin',
    'Razzak',
    'Rakib Prodhan',
    'Munna Hossain',
    'Akramul huqe',
    'Abdus Salam',
    'Roman Hossain',
    'mohammod Ali',
    'bayjhid',
    'bisal Khan',
    'Sagor Khan',
    'Haron Ahmed',
    'Anisur Ahmed',
    'Siyam Hossain',
    'Bakhtiar Hossain',
    'Shawon Kobir',
    'Sheikhhannan',
    'Rofik Mia',
    'sofiqul Hossain',
    'Abu Sayed',
    'Mominul Haque',
    'Jahid Hossain',
    'Milon Mahato',
    'Rifat Hossain',
    'Rohan Hossain',
    'Miraj Khan',
  ];
  const amountArray = [
    '৫০ টাকা','৫৫ টাকা','৬০ টাকা','৭০ টাকা','৯০ টাকা','১০০ টাকা','১১০ টাকা','১২০ টাকা',
   '১৩০ টাকা','১৪৫ টাকা','১৫০ টাকা','১৬০ টাকা','১৭০ টাকা','১৮০ টাকা','১৯০ টাকা','২০০ টাকা',
   '২১০ টাকা','২২০ টাকা','২৩০ টাকা','২৪০ টাকা','২৫০ টাকা','২৬০ টাকা','২৭০ টাকা','২৮০ টাকা',
   '৩০০ টাকা','৩১০ টাকা','৩২০ টাকা','৩৩০ টাকা','৩৪৫ টাকা','৩৫০ টাকা','৩৬০ টাকা','৩৮০ টাকা',
   '৪০০ টাকা','৪২০ টাকা','৪৫০ টাকা','৪৬০ টাকা','৪৮০ টাকা','৫০৭ টাকা','৫১০ টাকা','৫০০ টাকা',
   '৫২০ টাকা','৫৪০ টাকা','৫৬০ টাকা','৫৮০ টাকা','৬০০ টাকা','৬১০ টাকা','৬২০ টাকা','৬৪০ টাকা',
   '৬৬০ টাকা','৭০০ টাকা','৭৫০ টাকা','৭৭০ টাকা','৮০০ টাকা','৮৫০ টাকা','৯৫০ টাকা','১০০০ টাকা',
   '৩০২০ টাকা','৩০৫০ টাকা','৩০৭০ টাকা','৩০৯০ টাকা','৩০৩০ টাকা','৪০০০ টাকা','৪০১০ টাকা','৪০৩০ টাকা',
   '৪০৫০ টাকা','৪০৭০ টাকা','৫০০০ টাকা','৫০২০ টাকা','৫০৫০ টাকা','৫০৪৫ টাকা','৫১০০ টাকা','৫২০০ টাকা',
   '৫২৫০ টাকা','৫৩০০ টাকা','৫৩২৫ টাকা','৫৩৫০ টাকা','৫৪০০ টাকা','৫৪৫০ টাকা','৫৫০০ টাকা','৫৫১০ টাকা',
   '৫৫৫০ টাকা','৫৬০০ টাকা','৫৬৫০ টাকা','৫৭৫০ টাকা','৫৭০০ টাকা','৫৮০০ টাকা','৫৮৫০ টাকা','৫৯০০ টাকা',
 



   '৫০ টাকা','৫৫ টাকা','৬০ টাকা','৭০ টাকা','৯০ টাকা','১০০ টাকা','১১০ টাকা','১২০ টাকা',
   '১৩০ টাকা','১৪৫ টাকা','১৫০ টাকা','১৬০ টাকা','১৭০ টাকা','১৮০ টাকা','১৯০ টাকা','২০০ টাকা',
   '২১০ টাকা','২২০ টাকা','২৩০ টাকা','২৪০ টাকা','২৫০ টাকা','২৬০ টাকা','২৭০ টাকা','২৮০ টাকা',
   '৩০০ টাকা','৩১০ টাকা','৩২০ টাকা','৩৩০ টাকা','৩৪৫ টাকা','৩৫০ টাকা','৩৬০ টাকা','৩৮০ টাকা',
   '৪০০ টাকা','৪২০ টাকা','৪৫০ টাকা','৪৬০ টাকা','৪৮০ টাকা','৫০৭ টাকা','৫১০ টাকা','৫০০ টাকা',
   '৫২০ টাকা','৫৪০ টাকা','৫৬০ টাকা','৫৮০ টাকা','৬০০ টাকা','৬১০ টাকা','৬২০ টাকা','৬৪০ টাকা',
   '৬৬০ টাকা','৭০০ টাকা','৭৫০ টাকা','৭৭০ টাকা','৮০০ টাকা','৮৫০ টাকা','৯৫০ টাকা','১০০০ টাকা',
   '৩০২০ টাকা','৩০৫০ টাকা','৩০৭০ টাকা','৩০৯০ টাকা','৩০৩০ টাকা','৪০০০ টাকা','৪০১০ টাকা','৪০৩০ টাকা',
   '৪০৫০ টাকা','৪০৭০ টাকা','৫০০০ টাকা','৫০২০ টাকা','৫০৫০ টাকা','৫০৪৫ টাকা','৫১০০ টাকা','৫২০০ টাকা',
   '৫২৫০ টাকা','৫৩০০ টাকা','৫৩২৫ টাকা','৫৩৫০ টাকা','৫৪০০ টাকা','৫৪৫০ টাকা','৫৫০০ টাকা','৫৫১০ টাকা',
   '৫৫৫০ টাকা','৫৬০০ টাকা','৫৬৫০ টাকা','৫৭৫০ টাকা','৫৭০০ টাকা','৫৮০০ টাকা','৫৮৫০ টাকা','৫৯০০ টাকা',




   '৫০ টাকা','৫৫ টাকা','৬০ টাকা','৭০ টাকা','৯০ টাকা','১০০ টাকা','১১০ টাকা','১২০ টাকা',
   '১৩০ টাকা','১৪৫ টাকা','১৫০ টাকা','১৬০ টাকা','১৭০ টাকা','১৮০ টাকা','১৯০ টাকা','২০০ টাকা',
   '২১০ টাকা','২২০ টাকা','২৩০ টাকা','২৪০ টাকা','২৫০ টাকা','২৬০ টাকা','২৭০ টাকা','২৮০ টাকা',
   '৩০০ টাকা','৩১০ টাকা','৩২০ টাকা','৩৩০ টাকা','৩৪৫ টাকা','৩৫০ টাকা','৩৬০ টাকা','৩৮০ টাকা',
   '৪০০ টাকা','৪২০ টাকা','৪৫০ টাকা','৪৬০ টাকা','৪৮০ টাকা','৫০৭ টাকা','৫১০ টাকা','৫০০ টাকা',
   '৫২০ টাকা','৫৪০ টাকা','৫৬০ টাকা','৫৮০ টাকা','৬০০ টাকা','৬১০ টাকা','৬২০ টাকা','৬৪০ টাকা',
   '৬৬০ টাকা','৭০০ টাকা','৭৫০ টাকা','৭৭০ টাকা','৮০০ টাকা','৮৫০ টাকা','৯৫০ টাকা','১০০০ টাকা',
   '৩০২০ টাকা','৩০৫০ টাকা','৩০৭০ টাকা','৩০৯০ টাকা','৩০৩০ টাকা','৪০০০ টাকা','৪০১০ টাকা','৪০৩০ টাকা',
   '৪০৫০ টাকা','৪০৭০ টাকা','৫০০০ টাকা','৫০২০ টাকা','৫০৫০ টাকা','৫০৪৫ টাকা','৫১০০ টাকা','৫২০০ টাকা',
   '৫২৫০ টাকা','৫৩০০ টাকা','৫৩২৫ টাকা','৫৩৫০ টাকা','৫৪০০ টাকা','৫৪৫০ টাকা','৫৫০০ টাকা','৫৫১০ টাকা',
   '৫৫৫০ টাকা','৫৬০০ টাকা','৫৬৫০ টাকা','৫৭৫০ টাকা','৫৭০০ টাকা','৫৮০০ টাকা','৫৮৫০ টাকা','৫৯০০ টাকা',











   '৫০ টাকা','৫৫ টাকা','৬০ টাকা','৭০ টাকা','৯০ টাকা','১০০ টাকা','১১০ টাকা','১২০ টাকা',
   '১৩০ টাকা','১৪৫ টাকা','১৫০ টাকা','১৬০ টাকা','১৭০ টাকা','১৮০ টাকা','১৯০ টাকা','২০০ টাকা',
   '২১০ টাকা','২২০ টাকা','২৩০ টাকা','২৪০ টাকা','২৫০ টাকা','২৬০ টাকা','২৭০ টাকা','২৮০ টাকা',
   '৩০০ টাকা','৩১০ টাকা','৩২০ টাকা','৩৩০ টাকা','৩৪৫ টাকা','৩৫০ টাকা','৩৬০ টাকা','৩৮০ টাকা',
   '৪০০ টাকা','৪২০ টাকা','৪৫০ টাকা','৪৬০ টাকা','৪৮০ টাকা','৫০৭ টাকা','৫১০ টাকা','৫০০ টাকা',
   '৫২০ টাকা','৫৪০ টাকা','৫৬০ টাকা','৫৮০ টাকা','৬০০ টাকা','৬১০ টাকা','৬২০ টাকা','৬৪০ টাকা',
   '৬৬০ টাকা','৭০০ টাকা','৭৫০ টাকা','৭৭০ টাকা','৮০০ টাকা','৮৫০ টাকা','৯৫০ টাকা','১০০০ টাকা',
   '৩০২০ টাকা','৩০৫০ টাকা','৩০৭০ টাকা','৩০৯০ টাকা','৩০৩০ টাকা','৪০০০ টাকা','৪০১০ টাকা','৪০৩০ টাকা',
   '৪০৫০ টাকা','৪০৭০ টাকা','৫০০০ টাকা','৫০২০ টাকা','৫০৫০ টাকা','৫০৪৫ টাকা','৫১০০ টাকা','৫২০০ টাকা',
   '৫২৫০ টাকা','৫৩০০ টাকা','৫৩২৫ টাকা','৫৩৫০ টাকা','৫৪০০ টাকা','৫৪৫০ টাকা','৫৫০০ টাকা','৫৫১০ টাকা',
   '৫৫৫০ টাকা','৫৬০০ টাকা','৫৬৫০ টাকা','৫৭৫০ টাকা','৫৭০০ টাকা','৫৮০০ টাকা','৫৮৫০ টাকা','৫৯০০ টাকা',










  ];


  const [snackbarshow, setsnackbarshow] = useState(false);
  const [snacktext, setsnacktext] = useState('');

  const snackbarset = data => {
    setsnackbarshow(true);
    setsnacktext(data);
  };

  useEffect(() => {
    setInterval(() => {
      snackbarset(
        `${new Date().toLocaleTimeString()} | ${nameArray[
          Math.floor(Math.random() * nameArray.length)
        ].toUpperCase()} ${
          amountArray[Math.floor(Math.random() * amountArray.length)]
        }  ডিপোজিট করলেন`,
      );

      setTimeout(() => {
        setsnackbarshow(false);
      }, 3000);
    }, Math.floor(Math.random() * (15000 - 10000)) + 10000);
  }, []);






























  



  return (
    <View
    
      style={styles.gradientContainer}
      >




{snackbarshow && (
          <View
            style={{
              backgroundColor: PRIMARY_COLOR,
              position: 'absolute',
              top: 0,
              padding: 10,
              borderRadius: 10,
              elevation: 10,
              flexDirection: 'row',
              zIndex:9999,
              marginTop:10,
              marginLeft:10
            }}>
            <Text style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
              {snacktext}
            </Text>
          </View>
        )}










      <GiftedChat



        renderUsernameOnMessage={true}
        showUserAvatar
        showAvatarForEveryMessage
   

        listViewProps={{showsVerticalScrollIndicator: false}}
renderComposer={props=>{
  return <Composer {...props} placeholderTextColor='green' textInputStyle={{color:'black'}} disableComposer={sendingMessage} placeholder={sendingMessage? 'আপনার মেসেজ যাচ্ছে। অপেক্ষা করুন...' : 'আপনার মেসেজে লিখুন'}/>
}}
   
        renderSend={props => {

          return (
            <View
              style={{
                flexDirection: 'row',
                minHeight: 50,
                alignItems: 'center',
                position: 'relative',
             
                 
              
       
              }}>
             
              <Send {...props}  >
                <Icon
                  name="circle-arrow-right"
                  style={{
                    fontSize: 28,
                    marginBottom: 7,
                    marginRight: 10,
                    color: 'green',
                  }}
                />
              </Send>
            </View>
          );
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}

              
            //   wrapperStyle={{right: {backgroundColor: SECONDARY_COLOR},left: {backgroundColor: PRIMARY_COLOR}}}
            />
          );
        }}
        messages={messages3}
        onSend={messages3 => onSend(messages3)}

        user={{
          _id: userData?.email,
          name: userData?.name,
          avatar: '',
        }}
      />



<View style={{width:'107%',backgroundColor:'white',position:'absolute',top:5,left:0,padding:10,zIndex:999}}>
  <Text style={{fontWeight:'bold',fontSize:16,color:PRIMARY_COLOR}}>সতর্কতা :</Text>
  <Text>
  {`গ্রুপে আপনার ব্যক্তিগত তথ্য বা একাউন্টের কোনরকম তথ্য শেয়ার করবেন না।\nকোন গ্রুপ মেম্বার আপনার সাথে পার্সোনালভাবে যোগাযোগ করতে চাইলে এড়িয়ে চলুন।\nকোম্পানী ছাড়া অন্য কোন গ্রুপ মেম্বারের সাথে আর্থিক লেনদেন করলে এবং তৎকারনে আপনার আর্থিক ক্ষতি হলে কোম্পানি দায়ী থাকবেনা।\nযেকোন প্রয়োজনে হেল্প সেন্টারে মেসেজ দিন এবং সরাসরি কোম্পানির ভেরিভাইড এজেন্টের সাথে কথা বলুন।`}
  </Text>

</View>

    </View>
  );
}
const styles = ScaledSheet.create({
  gradientContainer: {
    flex: 1,
    padding: '10@s',
    position:'relative',
    
  },
  imageStyle: {
    height: '100@vs',
    width: '150@s',
    borderRadius: 5,
    resizeMode: 'cover',
  },
});
