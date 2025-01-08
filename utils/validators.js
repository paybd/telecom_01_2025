import { ToastAndroid } from "react-native";


const validateBdnumber = (phone) => {
  const format = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

  if (phone.match(format)) {
    return true;
  }

  return false;
};




function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}




export const loginValidation = (phone, password) => {


  if (phone == "") {
    ToastAndroid.show("ফোন নাম্বার লিখুন", ToastAndroid.SHORT);
    return false;
  }

  if (phone.length<8 || phone.length>14) {
    ToastAndroid.show(
      "ফোন নাম্বারটি ভ্যালিড নয়",
      ToastAndroid.SHORT
    );
    return false;
  }


  if (password == "") {
    ToastAndroid.show("পাসওয়ার্ড লিখুন", ToastAndroid.SHORT);
    return false;
  }

  if (password.length <8) {
    ToastAndroid.show(
      "পাসওয়ার্ড সর্বনিম্ন ৮ সংখ্যার হতে হবে।",
      ToastAndroid.SHORT
    );
    return false;
  }

  return true;
};









export const signupFirstValidation = (name,phone, password,confirmPassword,pin,confirmPin) => {


  if (name == "") {
    ToastAndroid.show("আপনার নাম লিখুন", ToastAndroid.SHORT);
    return false;
  }



  if (phone == "") {
    ToastAndroid.show("ফোন নাম্বার লিখুন", ToastAndroid.SHORT);
    return false;
  }

  if (phone.length<8 || phone.length>14) {
    ToastAndroid.show(
      "ফোন নাম্বারটি ভ্যালিড নয়",
      ToastAndroid.SHORT
    );
    return false;
  }


  if (password == "") {
    ToastAndroid.show("পাসওয়ার্ড লিখুন", ToastAndroid.SHORT);
    return false;
  }

  if (password.length <8) {
    ToastAndroid.show(
      "পাসওয়ার্ড সর্বনিম্ন ৮ সংখ্যার হতে হবে।",
      ToastAndroid.SHORT
    );
    return false;
  }

  if (confirmPassword == "") {
    ToastAndroid.show("কনফার্ম পাসওয়ার্ড লিখুন", ToastAndroid.SHORT);
    return false;
  }

  if (confirmPassword.length <8) {
    ToastAndroid.show(
      "কনফার্ম পাসওয়ার্ড সর্বনিম্ন ৮ সংখ্যার হতে হবে।",
      ToastAndroid.SHORT
    );
    return false;
  }

  if (password!==confirmPassword) {
    ToastAndroid.show(
      "পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড একই হতে হবে।",
      ToastAndroid.SHORT
    );
    return false;
  }








  return true;
};






export const signupSecondValidation = (pin,confirmPin) => {




  if (pin == "") {
    ToastAndroid.show("৬ সংখ্যার পিন লিখুন", ToastAndroid.SHORT);
    return false;
  }
  
  if (pin.length!==6) {
    console.log(pin);
    
    ToastAndroid.show(
      "পিন ৬ সংখ্যার হতে হবে।",
      ToastAndroid.SHORT
    );
    return false;
  }
  
  if (confirmPin == "") {
    ToastAndroid.show("কনফার্ম পিন লিখুন", ToastAndroid.SHORT);
    return false;
  }
  
  if (confirmPin.length !==6) {
    ToastAndroid.show(
      "কনফার্ম পিন ৬ সংখ্যার হতে হবে।",
      ToastAndroid.SHORT
    );
    return false;
  }
  
  if (pin!==confirmPin) {
    ToastAndroid.show("পিন ও কনফার্ম পিন একই হতে হবে।", ToastAndroid.SHORT);
    return false;
  }
  








  return true;
};



















export const changePinValidation = (
  currentPin,
newpin,
  confirmNewPin
) => {


  console.log(currentPin);
  
 

  if (currentPin == "") {
    ToastAndroid.show("৬ সংখ্যার পিন লিখুন", ToastAndroid.SHORT);
    return false;
  }

  if (currentPin.length!==6) {

    
    ToastAndroid.show(
      "পিন ৬ সংখ্যার হতে হবে।",
      ToastAndroid.SHORT
    );
    return false;
  }


  if (newpin == "") {
    ToastAndroid.show("৬ সংখ্যার নতুন পিন লিখুন", ToastAndroid.SHORT);
    return false;
  }

  if (newpin.length!==6) {

    
    ToastAndroid.show(
      "পিন ৬ সংখ্যার হতে হবে।",
      ToastAndroid.SHORT
    );
    return false;
  }










  if (confirmNewPin == "") {
    ToastAndroid.show("কনফার্ম নতুন পিন লিখুন", ToastAndroid.SHORT);
    return false;
  }

  if (confirmNewPin.length !==6) {
    ToastAndroid.show(
      "কনফার্ম পিন ৬ সংখ্যার হতে হবে।",
      ToastAndroid.SHORT
    );
    return false;
  }

  if (newpin!==confirmNewPin) {
    ToastAndroid.show("পিন ও কনফার্ম পিন একই হতে হবে।", ToastAndroid.SHORT);
    return false;
  }


  return true;
};

export const changePasswordValidation = (
  oldPass,
  currentPass,
  newPass,
  confirmNewPass
) => {
  if (currentPass.length < 8 || newPass.length < 8 || confirmNewPass < 8) {
    ToastAndroid.show("পাসওয়ার্ড মিনিমাম ৮ ডিজিট হতে হবে", ToastAndroid.SHORT);
    return false;
  }

  if (oldPass !== currentPass) {
    ToastAndroid.show("বর্তমান পাসওয়ার্ড টি ভুল", ToastAndroid.SHORT);
    return false;
  }

  if (newPass !== confirmNewPass) {
    ToastAndroid.show(
      "পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড ম্যাচ করেনি",
      ToastAndroid.SHORT
    );
    return false;
  }

  if (newPass !== confirmNewPass) {
    ToastAndroid.show(
      "পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড ম্যাচ করেনি",
      ToastAndroid.SHORT
    );
    return false;
  }

  return true;
};

export const depositValidation = (gameId, amount,currentBalance) => {





  if(parseInt(amount)>currentBalance){


    
    ToastAndroid.show("আপনার যথেষ্ট পরিমাণ ব্যালেন্স নাই", ToastAndroid.SHORT);
    return false;
  }

  if(parseInt(amount)<20){


    
    ToastAndroid.show("মিনিমাম ডিপোজিট ২০/= টাকা", ToastAndroid.SHORT);
    return false;
  }

  return true;
};












export const MobileBankingFirstValidation = (phone, amount, currentbalance) => {
  const isValidNumber =  validateBdnumber(phone);
  if (!isValidNumber) {
    ToastAndroid.show("নাম্বারটি ভ্যালিড নয়।", ToastAndroid.LONG);
    return false;
  }

  if (parseInt(amount) < 250) {
    ToastAndroid.show("সর্বনিম্ন 250/= টাকা পাঠাতে হবে।", ToastAndroid.LONG);
    return false;
  }

  if (parseInt(amount) >= parseInt(currentbalance)) {
    ToastAndroid.show("আপনার যথেষ্ট পরিমাণ ব্যালেন্স নেই।", ToastAndroid.LONG);
    return false;
  }

  return true;
};






export const RechargeFirstValidation = (phone, amount, currentbalance) => {
  const isValidNumber = validateBdnumber(phone);
  if (!isValidNumber) {
    ToastAndroid.show("নাম্বারটি ভ্যালিড নয়।", ToastAndroid.LONG);
    return false;
  }

  if (parseInt(amount) < 100) {
    ToastAndroid.show("সর্বনিম্ন 100/= টাকা পাঠাতে হবে।", ToastAndroid.LONG);
    return false;
  }

  if (parseInt(amount) >= parseInt(currentbalance)) {
    ToastAndroid.show("আপনার যথেষ্ট পরিমাণ ব্যালেন্স নেই।", ToastAndroid.LONG);
    return false;
  }

  return true;
};


















export const DriveOfferValidation = (phone, amount, currentbalance) => {
  const isValidNumber = validateBdnumber(phone);
  if (!isValidNumber) {
    ToastAndroid.show("নাম্বারটি ভ্যালিড নয়।", ToastAndroid.LONG);
    return false;
  }

  

  if (parseInt(amount) >= parseInt(currentbalance)) {
    ToastAndroid.show("আপনার যথেষ্ট পরিমাণ ব্যালেন্স নেই।", ToastAndroid.LONG);
    return false;
  }

  return true;
};













export const BankingValidation = (account_holder,account_no,branch,amount, currentbalance) => {

  if (isNumeric(branch)) {
    ToastAndroid.show("ইনভ্যালিড ব্রাঞ্চ নেম", ToastAndroid.LONG);
    return false;
  }
  

  if (isNumeric(account_holder)) {
    ToastAndroid.show("ইনভ্যালিড হোল্ডার নেম", ToastAndroid.LONG);
    return false;
  }

  if (isNaN(parseInt(account_no))) {
    ToastAndroid.show("ইনভ্যালিড একাউন্ট নাম্বার", ToastAndroid.LONG);
    return false;
  }








  if (parseInt(amount) < 25000) {
    ToastAndroid.show("ব্যাংক ট্রান্সফারের ক্ষেত্রে সর্বনিম্ন ২৫০০০/= টাকা পাঠাতে হবে।", ToastAndroid.LONG);
    return false;
  }

  if (parseInt(amount) >= parseInt(currentbalance)) {
    ToastAndroid.show("আপনার যথেষ্ট পরিমাণ ব্যালেন্স নেই।", ToastAndroid.LONG);
    return false;
  }

  return true;
};



export const Pinvalidation = (inputPin, userPin)=>{

  if (inputPin.length!==6) {
    ToastAndroid.show("পিনটি ভ্যালিড নয়।", ToastAndroid.LONG);
    return false;
  }

  if (inputPin!==userPin) {
    ToastAndroid.show("আপনার পিনটি সঠিক নয়।", ToastAndroid.LONG);
    return false;
  }



  return true;





}
