import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ChatCard = ({chat}) => {
  return (
    <View style={styles.chatcard}>
      <Image source={{uri: chat.profile_Image}} style={styles.image} />
      <View style={styles.c1}>
        <Text style={styles.usernameText}>{chat.username}</Text>
        <Text style={styles.lastmessageText}>{chat.lastmessage}</Text>
      </View>
    </View>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  chatcard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#111111',
    marginVertical: 10,
    padding: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  usernameText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  c1: {
    marginLeft: 10,
  },
  lastmessageText: {
    color: 'gray',
  },
});
