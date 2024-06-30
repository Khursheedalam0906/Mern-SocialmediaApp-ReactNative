import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {containerFull, goback, logo1, row} from '../../../commonCss/pagecss';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../../../assets/logo.png';
import {formHead2, formInput, formbtn} from '../../../commonCss/formcss';
import Check from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPassword_AccountRecovered = ({navigation}) => {
  return (
    <View style={containerFull}>
      <TouchableOpacity
        style={goback}
        onPress={() => navigation.navigate('login')}>
        <Icon name="arrow-back" size={25} color="gray" />
        <Text style={{color: 'gray', fontSize: 18, marginLeft: 10}}>
          Go Back
        </Text>
      </TouchableOpacity>
      <Image source={Logo} style={logo1} />
      <View style={row}>
        <Check name="check-decagram" size={30} color="#99B83C" />
        <Text style={formHead2}> Account Recover Successfully</Text>
      </View>
      <Text style={formbtn} onPress={() => navigation.navigate('login')}>
        Let's Roll
      </Text>
    </View>
  );
};

export default ForgotPassword_AccountRecovered;

const styles = StyleSheet.create({});
