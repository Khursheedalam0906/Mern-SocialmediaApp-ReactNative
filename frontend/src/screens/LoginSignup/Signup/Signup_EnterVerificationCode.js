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
import {
  formHead2,
  formHead3,
  formInput,
  formbtn,
} from '../../../commonCss/formcss';

const Signup_EnterVerificationCode = ({navigation, route}) => {
  const [enterVerificationCode, setEnterVerificationCode] = useState('');
  const {userEmail, userVerificationCode} = route.params;
  const {loading, setLoading} = useState(false);
  console.log(userEmail, userVerificationCode);

  const handleVerification = () => {
    if (userVerificationCode == enterVerificationCode) {
      navigation.navigate('Signup_EnterUserName', {
        email: userEmail,
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
        A varification code has been sent to your email
      </Text>
      <TextInput
        value={enterVerificationCode}
        style={formInput}
        placeholder="Enter 6-Digit verification code"
        placeholderTextColor={'gray'}
        onChangeText={Text => setEnterVerificationCode(Text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleVerification()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default Signup_EnterVerificationCode;

const styles = StyleSheet.create({});
