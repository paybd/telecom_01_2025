import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  ToastAndroid,
  StyleSheet,
} from "react-native";

import { useSelector } from "react-redux";
import MyButton from "../../components/MyButton";

import { useRouter } from "expo-router";

import { useEffect, useState } from "react";

import Modal from "react-native-modal";
import {
  MobileBankingFirstValidation,
  Pinvalidation,
} from "../../utils/validators";
import { supabase } from "../../utils/supabase";
import { INPUT_BG, PRIMARY_COLOR } from "../../constants/colors";
export default function MobileBanking() {
  const router = useRouter();

  const [mobile_banking, setmobile_banking] = useState(null);
  const [phone, setphone] = useState("");
  const [amount, setamount] = useState("");
  const [payment_method, setpayment_method] = useState("");
  const [pin, setpin] = useState("");
  const { userData } = useSelector((state) => state.auth);

  const [isButtonDIsabled, setisButtonDIsabled] = useState(true);
  const [isLoading, setisLoading] = useState("");

  useEffect(() => {
    if (
      mobile_banking &&
      phone &&
      phone.length === 11 &&
      amount &&
      payment_method
    ) {
      setisButtonDIsabled(false);
    } else {
      setisButtonDIsabled(true);
    }
  }, [mobile_banking, phone, amount, payment_method]);

  const [isConfirmButtonDisabled, setisConfirmButtonDisabled] = useState(false);

  useEffect(() => {
    if (pin.length === 6) {
      setisConfirmButtonDisabled(false);
    } else {
      setisConfirmButtonDisabled(true);
    }
  }, [pin]);

  const onSubmit = async () => {
    const isValidPin= Pinvalidation(pin, userData.pin);

    if (isValidPin) {
      setisLoading(true);
      try {
        const { data, error } = await supabase
          .from("Transactions")
          .insert([
            {
              name: userData.name,
              orderBy: userData.phone,
              phone,
              amount,
              mobile_banking_name: mobile_banking,
              payment_method,
              status: "pending",
              transaction: "mobile_banking",
              commission: parseInt(amount * 0.01),
            },
          ])
          .select();

        if (error) {
          setisLoading(false);
          ToastAndroid.show(
            "পিনটি সঠিক নয়।",
            ToastAndroid.SHORT
          );
        setpin("")
          return;
        }

        const newBalance = userData.balance - amount;

        const { data: d, error: updatebalanceError } = await supabase
          .from("Users")
          .update({ balance: newBalance })
          .eq("phone", userData.phone)
          .select();

        if (updatebalanceError) {
          await supabase
            .from("Transactions")
            .delete()
            .eq("orderBy", userData.balance);

          setisLoading(false);
          ToastAndroid.show(
            "সার্ভার সমস্যা। আবার চেষ্টা করুন",
            ToastAndroid.SHORT
          );
         
        } else {
         
          router.replace(`/(tabs)`);
        }

        setisLoading(false);
        setphone("");
        setamount("");
        setshowModal(false);



      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        setisLoading(false);
        setphone("");
        setamount("");
        setshowModal(false);

      }
     
    }
  };

  const [showModal, setshowModal] = useState(false);

  const onPressNext = () => {
    const isValid = MobileBankingFirstValidation(
      phone,
      amount,
      userData.balance
    );

    if (isValid) {
      setshowModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          style={{
            flexDirection: "row",
            gap: 10,
            marginVertical: 10,
            paddingVertical: 5,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={
              mobile_banking === "bkash"
                ? [
                    styles.mobile_banking_item,
                    { backgroundColor: PRIMARY_COLOR },
                  ]
                : styles.mobile_banking_item
            }
            onPress={() => setmobile_banking("bkash")}
          >
            <Image
              source={require("../../assets/images/bkash.png")}
              style={{ height: 50, width: "100%", resizeMode: "contain" }}
            />

            <Text
              style={
                mobile_banking === "bkash"
                  ? {
                      fontSize: 16,
                      fontFamily: "BanglaSemiBold",
                      color: "white",
                    }
                  : {
                      fontSize: 16,
                      fontFamily: "BanglaSemiBold",
                      color: PRIMARY_COLOR,
                    }
              }
            >
              বিকাশ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              mobile_banking === "nagad"
                ? [
                    styles.mobile_banking_item,
                    { backgroundColor: PRIMARY_COLOR },
                  ]
                : styles.mobile_banking_item
            }
            onPress={() => setmobile_banking("nagad")}
          >
            <Image
              source={require("../../assets/images/nagad.png")}
              style={{ height: 50, width: "100%", resizeMode: "contain" }}
            />

            <Text
              style={
                mobile_banking === "nagad"
                  ? {
                      fontSize: 16,
                      fontFamily: "BanglaSemiBold",
                      color: "white",
                    }
                  : {
                      fontSize: 16,
                      fontFamily: "BanglaSemiBold",
                      color: PRIMARY_COLOR,
                    }
              }
            >
              নগদ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              mobile_banking === "rocket"
                ? [
                    styles.mobile_banking_item,
                    { backgroundColor: PRIMARY_COLOR },
                  ]
                : styles.mobile_banking_item
            }
            onPress={() => setmobile_banking("rocket")}
          >
            <Image
              source={require("../../assets/images/rocket.png")}
              style={{ height: 50, width: "100%", resizeMode: "contain" }}
            />

            <Text
              style={
                mobile_banking === "rocket"
                  ? {
                      fontSize: 16,
                      fontFamily: "BanglaSemiBold",
                      color: "white",
                    }
                  : {
                      fontSize: 16,
                      fontFamily: "BanglaSemiBold",
                      color: PRIMARY_COLOR,
                    }
              }
            >
              রকেট
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              mobile_banking === "mkash"
                ? [
                    styles.mobile_banking_item,
                    { backgroundColor: PRIMARY_COLOR },
                  ]
                : styles.mobile_banking_item
            }
            onPress={() => setmobile_banking("mkash")}
          >
            <Image
              source={require("../../assets/images/mkash.png")}
              style={{ height: 50, width: "100%", resizeMode: "contain" }}
            />

            <Text
              style={
                mobile_banking === "mkash"
                  ? {
                      fontSize: 16,
                      fontFamily: "BanglaSemiBold",
                      color: "white",
                    }
                  : {
                      fontSize: 16,
                      fontFamily: "BanglaSemiBold",
                      color: PRIMARY_COLOR,
                    }
              }
            >
              এমক্যাশ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              mobile_banking === "ucash"
                ? [
                    styles.mobile_banking_item,
                    { backgroundColor: PRIMARY_COLOR },
                  ]
                : styles.mobile_banking_item
            }
            onPress={() => setmobile_banking("ucash")}
          >
            <Image
              source={require("../../assets/images/ucash.png")}
              style={{ height: 50, width: "100%", resizeMode: "contain" }}
            />

            <Text
              style={
                mobile_banking === "ucash"
                  ? {
                      fontSize: 16,
                      fontFamily: "BanglaSemiBold",
                      color: "white",
                    }
                  : {
                      fontSize: 16,
                      fontFamily: "BanglaSemiBold",
                      color: PRIMARY_COLOR,
                    }
              }
            >
              ইউক্যাশ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              mobile_banking === "surecash"
                ? [
                    styles.mobile_banking_item,
                    { backgroundColor: PRIMARY_COLOR },
                  ]
                : styles.mobile_banking_item
            }
            onPress={() => setmobile_banking("surecash")}
          >
            <Image
              source={require("../../assets/images/surecash.jpg")}
              style={{ height: 50, width: "100%", resizeMode: "contain" }}
            />

            <Text
              style={
                mobile_banking === "surecash"
                  ? {
                      fontSize: 16,
                      fontFamily: "BanglaSemiBold",
                      color: "white",
                    }
                  : {
                      fontSize: 16,
                      fontFamily: "BanglaSemiBold",
                      color: PRIMARY_COLOR,
                    }
              }
            >
              শিওরক্যাশ
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={{ alignItems: "center" }}>
       {
        mobile_banking && <>
           <Text style={styles.title}>ট্রানজেকশন টাইপ সিলেক্ট করুন</Text>
          <View style={[styles.itemSection]}>
            {payment_method === "send-money" ? (
              <View
                style={[
                  styles.amountItem,
                  { opacity: 1, backgroundColor: PRIMARY_COLOR },
                ]}
              >
                <Text style={[styles.amountTitle, { color: "white" }]}>
                  সেন্ড মানি
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setpayment_method("send-money");
                }}
              >
                <View style={styles.amountItem}>
                  <Text style={styles.amountTitle}>সেন্ড মানি</Text>
                </View>
              </TouchableOpacity>
            )}

            {payment_method === "cash-out" ? (
              <View
                style={[
                  styles.amountItem,
                  { opacity: 1, backgroundColor: PRIMARY_COLOR },
                ]}
              >
                <Text style={[styles.amountTitle, { color: "white" }]}>
                  ক্যাশ অ্যাউট
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setpayment_method("cash-out");
                }}
              >
                <View style={styles.amountItem}>
                  <Text style={styles.amountTitle}>ক্যাশ অ্যাউট</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </>
       }

          {payment_method && (
            <View>
              <View>
                <Text style={styles.label}>একাউন্ট নাম্বার</Text>

                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setphone}
                  keyboardType="numeric"
                />
              </View>

              <View>
                <Text style={styles.label}>এমাউন্ট</Text>

                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setamount}
                  keyboardType="numeric"
                />
              </View>

              <View
                style={[
                  styles.itemSection,
                  { marginTop: -5, marginBottom: 10 },
                ]}
              >
                {amount === "500" ? (
                  <View
                    style={[
                      styles.amountSelectItem,
                      { backgroundColor: PRIMARY_COLOR, opacity: 1 },
                    ]}
                  >
                    <Text style={[styles.amountTitle, { color: "white" }]}>
                      ৫০০
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => setamount("500")}
                    style={styles.amountSelectItem}
                  >
                    <Text style={styles.amountTitle}>৫০০</Text>
                  </TouchableOpacity>
                )}

                {amount === "5000" ? (
                  <View
                    style={[
                      styles.amountSelectItem,
                      { backgroundColor: PRIMARY_COLOR, opacity: 1 },
                    ]}
                  >
                    <Text style={[styles.amountTitle, { color: "white" }]}>
                      ৫০০০
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => setamount("5000")}
                    style={styles.amountSelectItem}
                  >
                    <Text style={styles.amountTitle}>৫০০০</Text>
                  </TouchableOpacity>
                )}

                {amount === "10000" ? (
                  <View
                    style={[
                      styles.amountSelectItem,
                      { backgroundColor: PRIMARY_COLOR, opacity: 1 },
                    ]}
                  >
                    <Text style={[styles.amountTitle, { color: "white" }]}>
                      ১০০০০
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => setamount("10000")}
                    style={styles.amountSelectItem}
                  >
                    <Text style={styles.amountTitle}>১০০০০</Text>
                  </TouchableOpacity>
                )}

                {amount === "25000" ? (
                  <View
                    style={[
                      styles.amountSelectItem,
                      { backgroundColor: PRIMARY_COLOR, opacity: 1 },
                    ]}
                  >
                    <Text style={[styles.amountTitle, { color: "white" }]}>
                      ২৫০০০
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => setamount("25000")}
                    style={styles.amountSelectItem}
                  >
                    <Text style={styles.amountTitle}>২৫০০০</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text
                style={{
                  fontSize: 18,
                  color: PRIMARY_COLOR,
                  textAlign: "center",
                  marginTop: 5,
                  fontFamily: "BanglaSemiBold",

                  paddingVertical: 10,
                  borderRadius: 5,
                }}
              >
                ব্যবহারযোগ্য ব্যালেন্স : ৳{userData.balance} টাকা
              </Text>

              <MyButton
                title={"এগিয়ে যান"}
                onPress={onPressNext}
                color={"green"}
                isDisabled={isButtonDIsabled}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        isVisible={showModal}
        onBackdropPress={() => {
          setshowModal(false);
        }}
        onBackButtonPress={() => {
          setshowModal(false);
        }}
      >
        <View style={[styles.modalStyle, { gap: 10 }]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >


{
  mobile_banking==='bkash' && 
  <Image
    style={styles.ModalIcon}
    source={require('../../assets/images/bkash.png')}
  />

}


{
  mobile_banking==='nagad' && 
  <Image
    style={styles.ModalIcon}
    source={require('../../assets/images/nagad.png')}
  />

}




{
  mobile_banking==='rocket' && 
  <Image
    style={styles.ModalIcon}
    source={require('../../assets/images/rocket.png')}
  />

}





{
  mobile_banking==='upay' &&
  <Image
    style={styles.ModalIcon}
    source={require('../../assets/images/upay.png')}
  />

}





{
  mobile_banking==='mkash' && 
  <Image
    style={styles.ModalIcon}
    source={require('../../assets/images/mkash.png')}
  />

}

{
  mobile_banking==='ucash' && 
  <Image
    style={styles.ModalIcon}
    source={require('../../assets/images/ucash.png')}
  />

}


{
  mobile_banking==='surecash' && 
  <Image
    style={styles.ModalIcon}
    source={require('../../assets/images/surecash.jpg')}
  />

}



{
  mobile_banking==='okwallet' && 
  <Image
    style={styles.ModalIcon}
    source={require('../../assets/images/okwallet.png')}
  />

}




{
  payment_method==='send-money' && <Text style={{fontSize:24,fontWeight:'medium',fontFamily:'BanglaSemiBold'}}> |   সেন্ড মানি</Text>

}

{
  payment_method==='cash-out' && <Text style={{fontSize:24,fontFamily:'BanglaSemiBold'}}> |   ক্যাশ আউট</Text>

}







          </View>

          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: PRIMARY_COLOR,
              marginTop: -10,
            }}
          ></View>

          <View style={{ flexDirection: "row", gap: 40, paddingVertical: 15 }}>
            <View
              style={{ borderRightWidth: 1, paddingRight: 55, marginRight: 10 }}
            >
              <Text style={[styles.modalTitle, { color: PRIMARY_COLOR }]}>
                একাউন্ট নাম্বার
              </Text>
              <Text
                style={[styles.modalTitle, { fontFamily: "BanglaRegular" }]}
              >
               
                {phone}
              </Text>
            </View>

            <View>
              <Text style={[styles.modalTitle, { color: PRIMARY_COLOR }]}>
                এমাউন্ট
              </Text>
              <Text
                style={[styles.modalTitle, { fontFamily: "BanglaRegular" }]}
              >
                {amount} টাকা
              </Text>
            </View>
          </View>

          <View>
            <Text style={[styles.label, { color: PRIMARY_COLOR }]}>পিন</Text>

            <TextInput
              style={styles.input}
              value={pin}
              onChangeText={setpin}
              keyboardType="numeric"
              secureTextEntry={true}
            />
          </View>

          <MyButton
            title={"কনফার্ম"}
            isLoading={isLoading}
            onPress={onSubmit}
            color={"green"}
            isDisabled={isConfirmButtonDisabled}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  input: {
    height: 45,
    minWidth: 300,
    borderRadius: 5,

    paddingHorizontal: 20,
    color: PRIMARY_COLOR,
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 15,
    backgroundColor: INPUT_BG,
    textTransform: "uppercase",
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
  },
  label: {
    color: PRIMARY_COLOR,
    fontSize: 18,
    textTransform: "uppercase",
    fontFamily: "BanglaSemiBold",
  },

  title: {
    color: PRIMARY_COLOR,
    fontSize: 23,
    textTransform: "uppercase",
    fontFamily: "BanglaBold",
  },

  itemSection: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "no-wrap",
    gap: 10,

    justifyContent: "center",
    paddingTop: 10,
  },

  amountItem: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "center",
    minWidth: "80@s",
    alignItems: "center",
    borderRadius: 4,
    opacity: 0.5,
    backgroundColor: PRIMARY_COLOR,
  },

  amountSelectItem: {
    width: "22%",

    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: "center",

    alignItems: "center",
    borderRadius: 5,

    borderWidth: 2,
    elevation: 5,

    borderColor: PRIMARY_COLOR,
    backgroundColor: INPUT_BG,
    opacity: 0.5,
  },

  amountTitle: {
    fontSize: 14,
    color: "black",
    fontFamily: "BanglaBold",
    textAlign: "center",
  },
  itemLogo: {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,

    backgroundColor: INPUT_BG,
  },

  itemicon: {
    fontSize: 50,
    color: "#1A4D2E",
  },
  itemlabel: {
    width: "100%",

    fontSize: 10,

    textAlign: "center",
    color: PRIMARY_COLOR,
    fontFamily: "BanglaBold",
  },
  iconStyle: {
    height: "80%",
    width: "65%",
    resizeMode: "contain",
  },

  bigIcon: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  itemlabel: {
    height: "20%",
    width: "100%",

    fontSize: 14,
    fontWeight: 400,

    textAlign: "center",
    color: "white",
  },
  cardView: {
    width: 200,
    height: 100,

    padding: 5,

    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 10,
  },

  mobile_banking_item: {
    height: 80,
    width: 80,

    alignItems: "center",
    borderRadius: 5,

    elevation: 5,
    backgroundColor: "white",
    marginBottom: 6,
    marginHorizontal: 4,
    padding: 5,
  },

  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },

  modalStyle: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "white",

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minHeight: 300,
    margin: -20,

    padding: 10,
  },

  ModalIcon: {
    height: 50,
    width: 80,
  },
  modalTitle: {
    fontSize: 24,
    color: PRIMARY_COLOR,
    fontFamily: "BanglaSemiBold",
    textTransform: "uppercase",
  },
});
