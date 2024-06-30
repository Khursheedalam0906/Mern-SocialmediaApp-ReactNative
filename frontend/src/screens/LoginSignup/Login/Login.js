import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {containerFull, hr80, logo1} from '../../../commonCss/pagecss';
import Logo from '../../../../assets/logo.png';
import {
  formInput,
  formTextLinkCenter,
  formTextLinkRight,
  formbtn,
} from '../../../commonCss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email == '' || password == '') {
      alert('Please enter email and password');
    } else {
      setLoading(true);
      fetch('http://10.0.2.2:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(res => res.json())
        .then(async data => {
          if (data.error) {
            setLoading(false);
            alert(data.error);
          } else if (data.message == 'Signed in Successfully') {
            setLoading(false);
            await AsyncStorage.setItem('user', JSON.stringify(data));
            navigation.navigate('mainpage', {data});
          }
        })
        .catch(err => {
          setLoading(false);
          alert(err);
        });
    }
  };

  return (
    <View style={containerFull}>
      <Image source={Logo} style={logo1} />
      <TextInput
        placeholder="Enter Your Email"
        placeholderTextColor={'gray'}
        keyboardType="email-address"
        value={email}
        style={formInput}
        onChangeText={Text => setEmail(Text)}
      />
      <TextInput
        placeholder="Enter Your Password"
        placeholderTextColor={'gray'}
        value={password}
        style={formInput}
        secureTextEntry={true}
        onChangeText={Text => setPassword(Text)}
      />
      <Text
        style={formTextLinkRight}
        onPress={() => navigation.navigate('ForgotPassword_EnterEmail')}>
        Forgot Password
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleLogin()}>
          Submit
        </Text>
      )}

      <View style={hr80}></View>
      <Text style={formTextLinkCenter}>
        Don't have an account?{' '}
        <Text
          style={{color: 'white'}}
          onPress={() => navigation.navigate('Signup_EnterEmail')}>
          Signup
        </Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
