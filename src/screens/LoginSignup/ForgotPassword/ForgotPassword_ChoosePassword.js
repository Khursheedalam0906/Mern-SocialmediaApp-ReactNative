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

const ForgotPassword_ChoosePassword = ({navigation, route}) => {
  const {useremail} = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [newCPassword, setCNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChoosePasssword = async () => {
    if (!newPassword || !newCPassword) {
      alert('Please enter all fields');
    } else if (newPassword == newCPassword) {
      setLoading(true);
      const email = useremail;
      const password = newPassword;
      const response = await fetch('http://10.0.2.2:3000/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
      const result = await response.json();
      if (result.error == 'Invalid Credentials') {
        setLoading(false);
        alert('Invalid Credentials');
      } else if (result.message == 'Password Changed successfully') {
        setLoading(false);
        alert('Password Changed successfully');
        navigation.navigate('ForgotPassword_AccountRecovered');
      }
    } else {
      alert("Password doesn't Match");
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
      <Text style={formHead2}>Choose Password</Text>
      <TextInput
        style={formInput}
        placeholder="Enter Password"
        placeholderTextColor={'gray'}
        secureTextEntry={true}
        onChangeText={Text => setNewPassword(Text)}
      />
      <TextInput
        style={formInput}
        placeholder="Confirm Password"
        placeholderTextColor={'gray'}
        onChangeText={Text => setCNewPassword(Text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleChoosePasssword()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ForgotPassword_ChoosePassword;

const styles = StyleSheet.create({});
