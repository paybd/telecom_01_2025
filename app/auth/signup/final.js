import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import MyButton from "../../../components/MyButton";
import { ScaledSheet } from "react-native-size-matters";
import { INPUT_BG, PRIMARY_COLOR } from "../../../constants/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../../utils/supabase";
import { login, signup } from "../../redux/features/AuthSlice";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from "react-redux";
import {
  loginValidation,
  signupSecondValidation,
  signupValidation,
} from "../../../utils/validators";
import { FontAwesome6 } from "@expo/vector-icons";
import { decode } from "base64-arraybuffer";

export default function final() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { name, phone, password } = useLocalSearchParams();

  const [photo, setPhoto] = useState(null);
const [photoUrl, setphotoUrl] = useState(null)
  const [isLoading, setisLoading] = useState(false);

  const [pin, setpin] = useState("");
  const [confirmPin, setconfirmPin] = useState("");



  const [isButtonDIsabled, setisButtonDIsabled] = useState(true);



  useEffect(() => {
    if (photo && pin && confirmPin) {
      setisButtonDIsabled(false);
    } else {
      setisButtonDIsabled(true);
    }
  }, [photo,pin,confirmPin]);




  const selectPhotoTapped = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,

      aspect: [3, 4],
      quality: 0.5,
      base64:true,
      cameraType:'front'
    });



    if (!result.canceled) {

setphotoUrl(result.assets[0].base64)
   
      
      setPhoto(result.assets[0]);
    }
  };






  const handleSubmit = async () => {
    try {
      setisLoading(true);

      const isValid = signupSecondValidation(pin, confirmPin);

      if (!isValid) {
        return;
      }


      let { data, error } = await supabase
        .from("users")
        .select("*")

        // Filters
        .eq("phone", phone);

      if (data?.length) {
        ToastAndroid.show(
          `আপনি ইতোমধ্যেই নিবন্ধিত।`,
          ToastAndroid.LONG
        );
        return;
      }



      const { data:photoUpload, error:uploadError } = await supabase.storage
      .from("images")
      .upload(`${phone}/${new Date().getTime()}`, decode(photoUrl), {
        contentType: 'image/jpeg',
     
        upsert: true,
      });

    if (uploadError) {

      
     console.log(uploadError.message);
     return
     
    } else {
      const photourl =


        "https://zevyexiwijxhonmmluyt.supabase.co/storage/v1/object/public/" +
        photoUpload.fullPath;



        
 


        const { data: newUser, error: newUserError } = await supabase
        .from("users")
        .insert([{ name, phone, password, pin,photo:photourl }])
        .select();


        console.log(newUserError);
        

      if (newUser?.length) {
        dispatch(signup(newUser[0]));
        router.replace("/(tabs)");

        ToastAndroid.show(`রেজিষ্ট্রেশন সাকসেসফুল।`, ToastAndroid.LONG);
      }





    }






      setisLoading(false);
    } catch (error) {
      console.log(error.message);
      setisLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          color: PRIMARY_COLOR,
          fontFamily: "BanglaSemiBold",
        }}
      >
        প্রোফাইল পিকচার ও পিন সেটাপ
      </Text>

      <TouchableOpacity
        style={{
          height: 150,
          width: 150,
          backgroundColor: INPUT_BG,
          borderRadius: "100%",
          marginVertical: 15,
          alignSelf: "center",
          borderWidth: 5,
          borderColor: PRIMARY_COLOR,
          position: "relative",
        }}

        onPress={selectPhotoTapped}
      >





        <View style={{ position: "absolute", bottom: "40%", right: "38%",zIndex:999 }}>
         {
          photo ?  <FontAwesome6
          name="camera"
          style={{ fontSize: 34, color: 'white', textAlign: "center" }}
        /> :  <FontAwesome6
        name="camera"
        style={{ fontSize: 34, color: PRIMARY_COLOR, textAlign: "center" }}
      />
         }
        </View>



        <Image
            source={{uri: photo?.uri}}
            style={{width: '100%', height: '100%', resizeMode:'cover',borderRadius:100}}
          />






      </TouchableOpacity>

      <View style={{ marginTop: 10, gap: 10 }}>
        <View>
          <Text style={styles.label}>পিন</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={pin}
            onChangeText={setpin}
            placeholder="৬ সংখ্যার পিন লিখুন"
            placeholderTextColor={PRIMARY_COLOR}
          />
        </View>

        <View>
          <Text style={styles.label}>কনফার্ম পিন</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={confirmPin}
            onChangeText={setconfirmPin}
            placeholder="পিন আবার লিখুন"
            placeholderTextColor={PRIMARY_COLOR}
          />
        </View>

        <MyButton title={"সাইন আপ"} onPress={handleSubmit} isDisabled={isButtonDIsabled} />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,

    padding: 10,
    backgroundColor: "white",
  },

  label: {
    fontSize: 22,
    color: PRIMARY_COLOR,
    fontFamily: "BanglaSemiBold",
  },
  input: {
    width: "full",
    backgroundColor: INPUT_BG,
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    fontFamily: "BanglaRegular",
  },
});
