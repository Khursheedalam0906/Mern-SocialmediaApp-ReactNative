import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopNavbar from '../../components/TopNavbar';
import noPic from '../../../assets/user.png';
import BottomNavbar from '../../components/BottomNavbar';
import Refresh from 'react-native-vector-icons/Foundation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Other_UserProfile = ({navigation, route}) => {
  const [userdata, setUserdata] = useState(null);
  const {user} = route.params;
  const [loading, setLoading] = useState(false);

  // console.log(user);

  const loaddata = async () => {
    setLoading(true);
    const response = await fetch('http://10.0.2.2:3000/otheruserdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: user.email}),
    });
    const result = await response.json();
    if (result.message == 'User Found') {
      setUserdata(result.user);
      isMyProfile(result.user);
      CheckFollow(result.user);
      setLoading(false);
    } else if (result.error == 'User Not Found') {
      alert('User Not Found');
      setLoading(false);
      navigation.navigate('searchuserpage');
    } else if (result.error == 'Server Error') {
      alert('Server Error');
      setLoading(false);
      navigation.navigate('searchuserpage');
    } else {
      alert('Something went wrong');
      setLoading(false);
      navigation.navigate('searchuserpage');
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  // console.log('userdata ', userdata);
  // console.log('ProfilePic', userdata.profilePic);

  // check my profile or other profile
  const [isSameUser, setIsSameUser] = useState(false);

  const isMyProfile = async otherProfile => {
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserObj = JSON.parse(loggeduser);
    if (loggeduserObj.user.email == otherProfile.email) {
      setIsSameUser(true);
      console.log('Same user');
    } else {
      setIsSameUser(false);
      console.log('Other user');
    }
  };

  // check follow or not
  const [isFollowing, setIsFollowing] = useState(false);

  const CheckFollow = async otheruser => {
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserObj = JSON.parse(loggeduser);
    const response = await fetch('http://10.0.2.2:3000/checkfollow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followfrom: loggeduserObj.user.email,
        followto: otheruser.email,
      }),
    });
    const result = await response.json();
    if (result.message == 'User in following list') {
      setIsFollowing(true);
    } else if (result.message == 'User not in following list') {
      setIsFollowing(false);
    } else {
      alert('Something went wrong');
    }
  };

  // follow this user
  const FollowThisUser = async otheruser => {
    // console.log('Follow this user', otheruser);
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserObj = JSON.parse(loggeduser);
    const response = await fetch('http://10.0.2.2:3000/followuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followfrom: loggeduserObj.user.email,
        followto: otheruser.email,
      }),
    });
    const result = await response.json();
    if (result.message == 'User Followed') {
      setIsFollowing(true);
      loaddata();
    } else {
      alert('Something went wrong');
    }
  };

  // unfollow this user
  const UnFollowThisUser = async otheruser => {
    // console.log('Follow this user', otheruser);
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserObj = JSON.parse(loggeduser);
    const response = await fetch('http://10.0.2.2:3000/unfollowuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followfrom: loggeduserObj.user.email,
        followto: otheruser.email,
      }),
    });
    const result = await response.json();
    if (result.message == 'User Unfollowed') {
      setIsFollowing(false);
      loaddata();
    } else {
      alert('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <TopNavbar
        navigation={navigation}
        page={'Other_UserProfile'}
        // addpage={'AddPost'}
      />
      <BottomNavbar navigation={navigation} page={'SearchUserPage'} />
      <Refresh
        name="refresh"
        size={30}
        color="white"
        style={styles.refresh}
        onPress={() => loaddata()}
      />
      <Text style={[styles.refresh2, {color: 'white'}]}>Refresh</Text>
      {userdata ? (
        <ScrollView>
          <View style={styles.c1}>
            {userdata.profilePic ? (
              <Image
                style={styles.profilepic}
                source={{uri: userdata.profilePic}}
              />
            ) : (
              <Image style={styles.profilepic} source={noPic} />
            )}
            <Text style={styles.txt}>{userdata.username}</Text>
            {!isSameUser && (
              <View style={styles.row}>
                {isFollowing ? (
                  <TouchableOpacity onPress={() => UnFollowThisUser(userdata)}>
                    <Text style={styles.follow}>UnFollow</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => FollowThisUser(userdata)}>
                    <Text style={styles.follow}>Followd</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('messagepage', {
                      fuseremail: userdata.email,
                      fuserid: userdata._id,
                    })
                  }>
                  <Text style={styles.message}>Message</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.c11}>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Followers</Text>
                <Text style={styles.txt2}>{userdata.followers.length}</Text>
              </View>
              <View style={styles.vr1}></View>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Following</Text>
                <Text style={styles.txt2}>{userdata.following.length}</Text>
              </View>
              <View style={styles.vr1}></View>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Posts</Text>
                <Text style={styles.txt2}>{userdata.posts.length}</Text>
              </View>
            </View>

            {userdata.description.length > 0 && (
              <Text style={styles.description}>{userdata.description}</Text>
            )}
          </View>
          {isFollowing || isSameUser ? (
            <View>
              {userdata.posts.length > 0 ? (
                <View style={styles.c1}>
                  <Text style={styles.txt}>Posts</Text>
                  <View style={styles.c13}>
                    {userdata.posts?.map(item => {
                      return (
                        <Image
                          key={item.posts}
                          style={styles.postpic}
                          source={{uri: item.posts}}
                        />
                      );
                    })}
                  </View>
                </View>
              ) : (
                <View style={styles.c2}>
                  <Text style={styles.txt1}>
                    You have not posted anything yet
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.c2}>
              <Text style={styles.txt1}>Follow to see posts</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.indicator}
        />
      )}
    </View>
  );
};

export default Other_UserProfile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
  c1: {
    width: '100%',
    alignItems: 'center',
  },
  profilepic: {
    width: 125,
    height: 125,
    borderRadius: 75,
    margin: 10,
    marginTop: 20,
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#111111',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  txt1: {
    color: 'white',
    fontSize: 15,
  },
  txt2: {
    color: 'white',
    fontSize: 20,
  },
  c11: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  c111: {
    alignItems: 'center',
  },
  vr1: {
    width: 1,
    height: 50,
    backgroundColor: 'white',
  },
  description: {
    color: 'white',
    fontSize: 15,
    marginVertical: 10,
    backgroundColor: '#111111',
    width: '100%',
    padding: 10,
    paddingVertical: 20,
  },
  postpic: {
    width: '30%',
    height: 120,
    margin: 5,
  },
  c13: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'center',
  },
  c2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  refresh: {
    position: 'absolute',
    top: 80,
    right: 20,
    zIndex: 1,
  },
  indicator: {
    width: '100%',
    height: '100%',
  },
  refresh2: {
    position: 'absolute',
    top: 110,
    right: 8,
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  follow: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#0AD6A0',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  message: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
});
