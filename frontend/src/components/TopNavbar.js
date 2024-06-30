import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import logo from '../../assets/logo.png';
import {logo1, logo2} from '../commonCss/pagecss';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesignSettings from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Add from 'react-native-vector-icons/MaterialIcons';

const TopNavbar = ({page, addpage}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {addpage === 'AddPost' && (
        <TouchableOpacity onPress={() => navigation.navigate('addpost')}>
          <Add
            name="library-add"
            size={28}
            color="white"
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('mainpage')}>
        <Image source={logo} style={logo2} />
      </TouchableOpacity>

      {page === 'MainPage' && (
        <TouchableOpacity onPress={() => navigation.navigate('all_chats')}>
          <Icon
            name="chatbubbles-sharp"
            size={30}
            color="gray"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      {page === 'My_UserProfile' && (
        <TouchableOpacity onPress={() => navigation.navigate('settings1')}>
          <AntDesignSettings
            name="setting"
            size={30}
            color="gray"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TopNavbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    top: 0,
    position: 'absolute',
    backgroundColor: '#111111',
    zIndex: 100,
  },
  icon: {
    color: 'white',
    paddingRight: 10,
  },
});
