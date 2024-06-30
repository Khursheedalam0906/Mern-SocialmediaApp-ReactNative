import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerFull} from '../../commonCss/pagecss';
import BottomNavbar from '../../components/BottomNavbar';
import TopNavbar from '../../components/TopNavbar';
import {formHead} from '../../commonCss/formcss';

const Notifications = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TopNavbar />
      <View style={styles.c1}>
        <View style={styles.notification}>
          <Text style={styles.text}>Some Notification</Text>
        </View>
        <View style={styles.notification}>
          <Text style={styles.text}>Some Notification</Text>
        </View>
        <View style={styles.notification}>
          <Text style={styles.text}>Some Notification</Text>
        </View>
        <View style={styles.notification}>
          <Text style={styles.text}>Some Notification</Text>
        </View>
        <View style={styles.notification}>
          <Text style={styles.text}>Some Notification</Text>
        </View>
      </View>
      <BottomNavbar page={'Notifications'} />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
  c1: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  notification: {
    width: '90%',
    height: 50,
    backgroundColor: '#111111',
    marginTop: 10,
  },
  text: {
    color: 'white',
    padding: 10,
  },
});
