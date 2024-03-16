import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import noPic from '../../assets/user.png';

const UserCard = ({user, navigation}) => {
  //console.log(user);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('otheruserprofile', {user})}>
      <View style={styles.container}>
        <View style={styles.c1}>
          {user.profilePic ? (
            <Image source={{uri: user.profilePic}} style={styles.image} />
          ) : (
            <Image source={noPic} style={styles.image} />
          )}
          <Text style={styles.username}>{user.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: 100,
    backgroundColor: '#111111',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
  },
  c1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  username: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
