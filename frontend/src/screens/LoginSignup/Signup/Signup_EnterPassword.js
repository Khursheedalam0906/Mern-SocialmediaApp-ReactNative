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

const Signup_EnterPassword = ({navigation, route}) => {
  const {username, email} = route.params;
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(username, email, password);

  const handlePassword = async () => {
    if (password === cPassword) {
      setLoading(true);
      const response = await fetch('http://10.0.2.2:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, email, password}),
      });
      const result = await response.json();
      if (result.error == 'Please add all the fields') {
        alert('Please add all the fields');
        setLoading(false);
      } else if (result.message == 'User Register Successfully') {
        setLoading(false);
        // alert('User Register Successfully');
        navigation.navigate('Signup_AccountCreated');
      } else if (result.error == 'User not Registered') {
        setLoading(false);
        alert('User not Registered');
      }
    } else {
      setLoading(false);
      alert("Password doesn't match");
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
      <Text style={formHead2}>Choose a strong password</Text>
      <TextInput
        style={formInput}
        secureTextEntry={true}
        placeholder="Enter Password"
        placeholderTextColor={'gray'}
        onChangeText={Text => setPassword(Text)}
      />
      <TextInput
        style={formInput}
        secureTextEntry={true}
        placeholder="Enter Conform Password"
        placeholderTextColor={'gray'}
        onChangeText={Text => setCPassword(Text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handlePassword()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default Signup_EnterPassword;

const styles = StyleSheet.create({});
