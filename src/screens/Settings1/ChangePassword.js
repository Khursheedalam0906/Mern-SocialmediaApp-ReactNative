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
import {containerFull, goback, logo1} from '../../commonCss/pagecss';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../../assets/logo.png';
import {
  formHead2,
  formInput,
  formTextLinkRight,
  formbtn,
} from '../../commonCss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({navigation}) => {
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmnewpassword, setCNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePassswordChanged = () => {
    if (oldpassword === '' || newpassword === '' || confirmnewpassword === '') {
      alert('Please fill all the fields');
    } else if (newpassword !== confirmnewpassword) {
      alert('New password and confirm new password must be same');
    } else {
      setLoading(true);
      AsyncStorage.getItem('user').then(data => {
        fetch('http://10.0.2.2:3000/changepassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(data).tokens,
          },
          body: JSON.stringify({
            email: JSON.parse(data).user.email,
            oldpassword: oldpassword,
            newpassword: newpassword,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message == 'Password Changed Successfully') {
              setLoading(false);
              alert('Password Changed Successfully');
              AsyncStorage.removeItem('user');
              navigation.navigate('login');
            } else {
              alert('Wrong Password');
              setLoading(false);
            }
          });
      });
    }
  };
  return (
    <View style={containerFull}>
      <TouchableOpacity
        style={goback}
        onPress={() => navigation.navigate('settings1')}>
        <Icon name="arrow-back" size={25} color="gray" />
        <Text style={{color: 'gray', fontSize: 18, marginLeft: 10}}>
          Go Back
        </Text>
      </TouchableOpacity>
      <Image source={Logo} style={logo1} />
      <Text style={formHead2}>Change Password</Text>
      <TextInput
        style={formInput}
        placeholder="Enter Old Password"
        placeholderTextColor={'gray'}
        secureTextEntry={true}
        onChangeText={Text => setOldPassword(Text)}
      />
      <TextInput
        style={formInput}
        placeholder="Enter New Password"
        placeholderTextColor={'gray'}
        secureTextEntry={true}
        onChangeText={Text => setNewPassword(Text)}
      />
      <TextInput
        style={formInput}
        placeholder="Confirm New Password"
        placeholderTextColor={'gray'}
        secureTextEntry={true}
        onChangeText={Text => setCNewPassword(Text)}
      />
      <Text
        style={formTextLinkRight}
        onPress={() => navigation.navigate('ForgotPassword_EnterEmail')}>
        Forgot Password
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handlePassswordChanged()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
