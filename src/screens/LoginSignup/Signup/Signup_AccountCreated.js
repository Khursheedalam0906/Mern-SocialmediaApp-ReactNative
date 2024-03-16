import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {containerFull, goback, logo1, row} from '../../../commonCss/pagecss';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../../../assets/logo.png';
import {formHead2, formbtn} from '../../../commonCss/formcss';
import Check from 'react-native-vector-icons/MaterialCommunityIcons';

const Signup_AccountCreated = ({navigation}) => {
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
      <View style={row}>
        <Check name="check-decagram" size={30} color="#99B83C" />
        <Text style={formHead2}> Account Created Successfully</Text>
      </View>
      <Text style={formbtn} onPress={() => navigation.navigate('mainpage')}>
        Let's Roll
      </Text>
    </View>
  );
};

export default Signup_AccountCreated;

const styles = StyleSheet.create({});
