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
import {
  INPUT_BG,
  PRIMARY_COLOR,
} from "../../../constants/colors";
import { useRouter } from "expo-router";
import { supabase } from "../../../utils/supabase";
import { login } from "../../redux/features/AuthSlice";
import { useDispatch } from "react-redux";
import { loginValidation } from "../../../utils/validators";

export default function index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async () => {
    try {
      setisLoading(true);

      const isValid = loginValidation(phone, password);

      if (!isValid) {
        return;
      }

      let { data, error } = await supabase
        .from("users")
        .select("*")

        // Filters
        .eq("phone", phone)
        .eq("password", password);

      if (data.length) {
        dispatch(login(data[0]));
        router.replace("/(tabs)");
      } else {
        ToastAndroid.show(`Phone Or Password Didn't Match`, ToastAndroid.LONG);
      }

      setisLoading(false);
    } catch (error) {
      console.log(error.message);
      setisLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36, marginTop: 40, color: PRIMARY_COLOR,fontFamily:'PoppinsSemiBold' }}>
        Welcome Back!
      </Text>

      <View style={{ marginTop: 10, gap: 10 }}>
        <View>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter Your Number"
            placeholderTextColor={PRIMARY_COLOR}
          />
        </View>

        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={password}
            onChangeText={setpassword}
            placeholder="Enter Your Password"
            placeholderTextColor={PRIMARY_COLOR}
          />
        </View>

        <MyButton
          title={"LOGIN"}
          isLoading={isLoading}
          onPress={handleSubmit}
        />
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
            fontFamily: "PoppinsRegular",
          }}
        >
          Not Registered?
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.replace("auth/signup");
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: PRIMARY_COLOR,
              fontFamily: "PoppinsRegular",
              textDecorationLine: "underline",
            }}
          >
            SignUp Here
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
    fontFamily: "PoppinsSemiBold",
  },
  input: {
    width: "full",
    backgroundColor: INPUT_BG,
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    fontFamily: "PoppinsRegular",
  },
});
