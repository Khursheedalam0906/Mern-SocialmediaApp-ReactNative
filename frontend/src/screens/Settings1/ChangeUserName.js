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
import {formHead3, formInput, formbtn} from '../../commonCss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangeUserName = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  // const {email} = route.params;

  const handleUserName = async () => {
    if (username == '') {
      alert('Please enter username');
    } else {
      setLoading(true);
      const data = await AsyncStorage.getItem('user');
      const response = await fetch('http://10.0.2.2:3000/setusername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: JSON.parse(data).user.email, username}),
      });
      const result = await response.json();
      if (result.error == 'Username already exist') {
        alert(result.error);
        setLoading(false);
      } else if (result.message == 'Username updated successfully') {
        setLoading(false);
        alert('Username updated successfully');
        navigation.navigate('settings1');
      } else if (result.error == 'Server error') {
        setLoading(false);
        alert('Server error');
      } else if (result.error == 'Invalid Credentials') {
        setLoading(false);
        alert('Invalid Credentials');
        AsyncStorage.removeItem('user');
        navigation.navigate('login');
      } else {
        setLoading(false);
        alert('Something went wrong');
      }
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
      <Text style={formHead3}>Change Username</Text>
      <TextInput
        style={formInput}
        placeholder="Enter Username"
        placeholderTextColor={'gray'}
        onChangeText={Text => setUserName(Text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleUserName()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ChangeUserName;

const styles = StyleSheet.create({});
