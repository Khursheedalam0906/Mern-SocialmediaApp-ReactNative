import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {containerFull, goback, logo1} from '../../../commonCss/pagecss';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../../../assets/logo.png';
import {formHead3, formInput, formbtn} from '../../../commonCss/formcss';

const ForgotPassword_EnterEmailVerificationCode = ({navigation, route}) => {
  const {useremail, userVerificationCode} = route.params;
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerificationCode = async () => {
    if (userVerificationCode == verificationCode) {
      navigation.navigate('ForgotPassword_ChoosePassword', {
        useremail,
      });
    } else {
      alert('Invalid Verification Code');
    }
  };

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
      <Text style={formHead3}>
        A Verification code has been sent to your email
      </Text>
      <TextInput
        style={formInput}
        placeholder="Enter 6-Digit Code here"
        placeholderTextColor={'gray'}
        onChangeText={Text => setVerificationCode(Text)}
      />
      <Text style={formbtn} onPress={() => handleVerificationCode()}>
        Next
      </Text>
    </View>
  );
};

export default ForgotPassword_EnterEmailVerificationCode;

const styles = StyleSheet.create({});
