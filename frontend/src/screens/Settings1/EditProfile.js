import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formHead} from '../../commonCss/formcss';

const EditProfile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('myuserprofile')}
        style={{padding: 10}}>
        <Ionicons name="chevron-back-circle" size={30} color="white" />
      </TouchableOpacity>
      <Text style={formHead}>Edit Profile</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('uploadprofilepicture')}>
        <Text style={styles.text}>Change Profile Picture</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <TouchableOpacity onPress={() => navigation.navigate('changeusername')}>
        <Text style={styles.text}>Change username</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate('changedescription')}>
        <Text style={styles.text}>Change Description</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
    </View>
  );
};

export default EditProfile;

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
