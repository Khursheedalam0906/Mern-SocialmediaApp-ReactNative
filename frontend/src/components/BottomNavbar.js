import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import EntypoHome from 'react-native-vector-icons/Entypo';
import AntDesignSearch from 'react-native-vector-icons/AntDesign';
import AntDesignBell from 'react-native-vector-icons/FontAwesome';
import AntDesignPeople from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const BottomNavbar = ({page}) => {
  const navigation = useNavigation();
  //  console.log(page);

  return (
    <View style={styles.container}>
      {page === 'MainPage' ? (
        <TouchableOpacity onPress={() => navigation.navigate('mainpage')}>
          <EntypoHome
            name="home"
            size={28}
            color="black"
            style={styles.activeIcon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('mainpage')}>
          <EntypoHome name="home" size={28} color="white" />
        </TouchableOpacity>
      )}
      {page === 'SearchUserPage' ? (
        <TouchableOpacity onPress={() => navigation.navigate('searchuserpage')}>
          <AntDesignSearch
            name="search1"
            size={28}
            color="black"
            style={styles.activeIcon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('searchuserpage')}>
          <AntDesignSearch name="search1" size={28} color="white" />
        </TouchableOpacity>
      )}
      {page === 'Notifications' ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('notificationpage')}>
          <AntDesignBell
            name="bell"
            size={28}
            color="black"
            style={styles.activeIcon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('notificationpage')}>
          <AntDesignBell name="bell" size={28} color="white" />
        </TouchableOpacity>
      )}
      {page === 'My_UserProfile' ? (
        <TouchableOpacity onPress={() => navigation.navigate('myuserprofile')}>
          <AntDesignPeople
            name="user-circle-o"
            size={28}
            color="black"
            style={styles.activeIcon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('myuserprofile')}>
          <AntDesignPeople name="user-circle-o" size={28} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BottomNavbar;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#111111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  activeIcon: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});
