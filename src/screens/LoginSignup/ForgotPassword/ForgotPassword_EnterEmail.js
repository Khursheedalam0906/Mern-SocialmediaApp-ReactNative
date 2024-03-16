import {
  ActivityIndicator,
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
import {formHead2, formInput, formbtn} from '../../../commonCss/formcss';

const ForgotPassword_EnterEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotEmail = async () => {
    if (!email) {
      alert('Please enter email');
    } else {
      setLoading(true);
      const response = await fetch(
        'http://10.0.2.2:3000/verifyforgotpassword',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email}),
        },
      );
      const result = await response.json();
      if (result.error === 'Invalid Credentials') {
        alert('Invalid Credentials');
        setLoading(false);
      } else if (result.message === 'Verification code sent to your Email') {
        alert(result.message);
        setLoading(false);
        navigation.navigate('ForgotPassword_EnterEmailVerificationCode', {
          useremail: result.email,
          userVerificationCode: result.verificationCode,
        });
      }
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
      <Text style={formHead2}>Verify Your Email</Text>
      <TextInput
        style={formInput}
        keyboardType="email-address"
        placeholder="Enter Your Email"
        placeholderTextColor={'gray'}
        onChangeText={Text => setEmail(Text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleForgotEmail()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ForgotPassword_EnterEmail;

const styles = StyleSheet.create({});
