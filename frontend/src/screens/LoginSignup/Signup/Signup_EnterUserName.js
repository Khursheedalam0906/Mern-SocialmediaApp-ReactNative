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
import {formHead3, formInput, formbtn} from '../../../commonCss/formcss';

const Signup_EnterUserName = ({navigation, route}) => {
  const [username, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const {email} = route.params;

  const handleUserName = async () => {
    if (username == '') {
      alert('Please enter user name');
    } else {
      setLoading(true);
      const response = await fetch('http://10.0.2.2:3000/changeusername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username}),
      });
      const result = await response.json();
      if (result.error == 'User already exist') {
        alert(result.error);
        setLoading(false);
      } else {
        setLoading(false);
        // alert(result.message);
        navigation.navigate('Signup_EnterPassword', {
          username,
          email,
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
      <Text style={formHead3}>Choose a user name</Text>
      <TextInput
        style={formInput}
        placeholder="Enter user name"
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

export default Signup_EnterUserName;

const styles = StyleSheet.create({});
