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

const ChangeDescription = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  // const {email} = route.params;

  const handleDescription = async () => {
    if (description == '') {
      alert('Please enter user name');
    } else {
      setLoading(true);
      const data = await AsyncStorage.getItem('user');
      const response = await fetch('http://10.0.2.2:3000/setdescription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: JSON.parse(data).user.email,
          description,
        }),
      });
      const result = await response.json();
      if (result.message == 'Description update successfully') {
        alert(result.message);
        setLoading(false);
        navigation.navigate('settings1');
      } else if (result.error) {
        setLoading(false);
        alert(result.error);
      } else {
        setLoading(false);
        alert('something went wrong');
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
      <Text style={formHead3}>Change Description</Text>
      <TextInput
        style={formInput}
        placeholder="Enter Description"
        placeholderTextColor={'gray'}
        multiline={true}
        numberOfLines={4}
        onChangeText={Text => setDescription(Text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleDescription()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ChangeDescription;

const styles = StyleSheet.create({});
