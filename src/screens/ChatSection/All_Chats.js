import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LeftCircle from 'react-native-vector-icons/AntDesign';
import {formHead2} from '../../commonCss/formcss';
import ChatCard from '../../Cards/ChatCard';

const All_Chats = ({navigation}) => {
  const [keyword, setKeyword] = useState('');

  let chats = [
    {
      username: 'Ram',
      lastmessage: 'hello',
      time: '12:00 PM',
      profile_Image:
        'https://scontent.fbho6-1.fna.fbcdn.net/v/t39.30808-1/272328471_3101984250079904_5217305298242456632_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=107&ccb=1-7&_nc_sid=5740b7&_nc_ohc=ydE7cmI2ZqgAX-vdfVr&_nc_ht=scontent.fbho6-1.fna&oh=00_AfAIP8SdtZ-vsMM6uSzzMUPhOp-KDgYWsOUROFlUWSH2MQ&oe=65DF9876',
    },
    {
      username: 'Mohan',
      lastmessage: 'how are you',
      time: '01:33 AM',
      profile_Image:
        'https://scontent.fbho6-1.fna.fbcdn.net/v/t39.30808-1/272328471_3101984250079904_5217305298242456632_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=107&ccb=1-7&_nc_sid=5740b7&_nc_ohc=ydE7cmI2ZqgAX-vdfVr&_nc_ht=scontent.fbho6-1.fna&oh=00_AfAIP8SdtZ-vsMM6uSzzMUPhOp-KDgYWsOUROFlUWSH2MQ&oe=65DF9876',
    },
    {
      username: 'Rohan',
      lastmessage: 'what are you doing',
      time: '10:00 PM',
      profile_Image:
        'https://scontent.fbho6-1.fna.fbcdn.net/v/t39.30808-1/272328471_3101984250079904_5217305298242456632_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=107&ccb=1-7&_nc_sid=5740b7&_nc_ohc=ydE7cmI2ZqgAX-vdfVr&_nc_ht=scontent.fbho6-1.fna&oh=00_AfAIP8SdtZ-vsMM6uSzzMUPhOp-KDgYWsOUROFlUWSH2MQ&oe=65DF9876',
    },
  ];

  // console.log(keyword);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('mainpage')}
        style={styles.gohomeicon}>
        <LeftCircle name="leftcircle" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.c1}>
        <Text style={formHead2}>Your Chats</Text>
        <TextInput
          style={styles.searchbar}
          placeholder="Search"
          placeholderTextColor={'gray'}
          onChangeText={Text => setKeyword(Text)}
        />
      </View>
      <View style={styles.c2}>
        {chats
          .filter(chat => {
            if (keyword == '') {
              return chat;
            } else if (
              chat.username.toLowerCase().includes(keyword.toLowerCase())
            ) {
              return chat;
            }
          })
          .map(chat => {
            return <ChatCard key={chat.username} chat={chat} />;
          })}
      </View>
    </ScrollView>
  );
};

export default All_Chats;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  gohomeicon: {
    position: 'absolute',
    top: 15,
    left: 20,
    color: 'white',
    fontSize: 30,
    zIndex: 997,
    elevation: 998,
    marginTop: 5,
  },
  c1: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#111111',
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
  searchbar: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginTop: 25,
    fontSize: 18,
  },
  c2: {
    width: '100%',
    padding: 10,
  },
});
