import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import MyButton from "../../../components/MyButton";
import { ScaledSheet } from "react-native-size-matters";
import { INPUT_BG, PRIMARY_COLOR } from "../../../constants/colors";
import {  useRouter } from "expo-router";
import { supabase } from "../../../utils/supabase";
import { login, signup } from "../../redux/features/AuthSlice";
import { useDispatch } from "react-redux";
import { loginValidation, signupFirstValidation, signupValidation } from "../../../utils/validators";

export default function index() { 













  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleSubmit = async () => {



 const isValid = signupFirstValidation(
          name,
          phone,
          password,
          confirmPassword,
         
        );
  
        if (!isValid) {
          return;
        }







    router.push(`/auth/signup/final?name=${name}&phone=${phone}&password=${password}`)
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
        নতুন একাউন্ট তৈরী করুন
      </Text>

      <View style={{ marginTop: 10, gap: 10 }}>
        <View>
          <Text style={styles.label}>নাম</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setname}
            placeholder="পূর্ণ নাম লিখুন"
            placeholderTextColor={PRIMARY_COLOR}
          />
        </View>

        <View>
          <Text style={styles.label}>ফোন নাম্বার</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="ফোন নাম্বার লিখুন"
            placeholderTextColor={PRIMARY_COLOR}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text style={styles.label}>পাসওয়ার্ড</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setpassword}
            placeholder="পাসওয়ার্ড লিখুন"
            placeholderTextColor={PRIMARY_COLOR}
          />
        </View>

        <View>
          <Text style={styles.label}>কনফার্ম পাসওয়ার্ড</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setconfirmPassword}
            placeholder="পাসওয়ার্ড আবার লিখুন"
            placeholderTextColor={PRIMARY_COLOR}
          />
        </View>

        {/* <View>
          <Text style={styles.label}>Pin</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={pin}
            onChangeText={setpin}
            placeholder="Enter Pin"
            placeholderTextColor={PRIMARY_COLOR}
          />
        </View>

        <View>
          <Text style={styles.label}>Confirm Pin</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={confirmPin}
            onChangeText={setconfirmPin}
            placeholder="Enter pin Again"
            placeholderTextColor={PRIMARY_COLOR}
          />
        </View> */}

        <MyButton title={"এগিয়ে যান"} onPress={handleSubmit} />
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: PRIMARY_COLOR,
            fontFamily: "BanglaRegular",
          }}
        >
         একাউন্ট আছে?
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.replace("auth/login");
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: PRIMARY_COLOR,
              fontFamily: "BanglaSemiBold",
              textDecorationLine: "underline",
            }}
          >
            লগইন করুন
          </Text>
        </TouchableOpacity>
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
