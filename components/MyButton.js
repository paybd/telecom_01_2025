import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/colors';



const MyButton = ({title, onPress,isDisabled}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container,isDisabled?{opacity:0.5}:{opacity:1}]} disabled={isDisabled}>
<Text style={styles.title}>{title}</Text>
    
  
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: PRIMARY_COLOR,
    
    borderRadius: '5@s',

  
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:'10@vs',
    paddingVertical:10

  },
  title: {
    color: 'white',
    fontSize: '18@s',
 fontFamily:'BanglaSemiBold',
  
  },
});