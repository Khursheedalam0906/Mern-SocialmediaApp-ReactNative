import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {containerFull} from '../../commonCss/pagecss';
import BottomNavbar from '../../components/BottomNavbar';
import TopNavbar from '../../components/TopNavbar';
import FollowerRandomPost from '../../components/FollowerRandomPost';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainPage = ({navigation}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(data => {
        //  console.log('async userdata ', data);
        setUserData(JSON.parse(data));
      })
      .catch(err => alert(err));
  }, []);

  console.log('parsedata', userData);

  return (
    <View style={containerFull}>
      <TopNavbar navigation={navigation} page={'MainPage'} />
      <FollowerRandomPost />
      <BottomNavbar page={'MainPage'} />
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
});
