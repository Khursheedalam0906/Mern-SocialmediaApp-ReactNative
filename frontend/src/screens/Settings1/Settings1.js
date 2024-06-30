import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formHead} from '../../commonCss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings1 = ({navigation}) => {
  const logout = () => {
    AsyncStorage.removeItem('user');
    navigation.navigate('login');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('myuserprofile')}
        style={{padding: 10}}>
        <Ionicons name="chevron-back-circle" size={30} color="white" />
      </TouchableOpacity>
      <Text style={formHead}>Settings</Text>
      <TouchableOpacity onPress={() => navigation.navigate('editprofile')}>
        <Text style={styles.text}>Edit Profile</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <TouchableOpacity onPress={() => navigation.navigate('changepassword')}>
        <Text style={styles.text}>Change Password</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <TouchableOpacity>
        <Text style={styles.text}>Customer Support</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <TouchableOpacity onPress={() => logout()}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
    </View>
  );
};

export default Settings1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  line: {
    color: 'white',
    marginTop: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  text: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    marginHorizontal: 20,
  },
});
