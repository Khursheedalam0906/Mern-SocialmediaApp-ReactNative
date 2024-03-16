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
import AsyncStorage from '@react-native-async-storage/async-storage';
import noPic from '../../../assets/user.png';
import BottomNavbar from '../../components/BottomNavbar';
import Refresh from 'react-native-vector-icons/Foundation';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const My_UserProfile = ({navigation}) => {
  const [userdata, setUserdata] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const loaddata = async () => {
    AsyncStorage.getItem('user')
      .then(async value => {
        fetch('http://10.0.2.2:3000/userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(value).token,
          },
          body: JSON.stringify({email: JSON.parse(value).user.email}),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message == 'User Found') {
              setUserdata(data.user);
            } else {
              alert('Login Again');
              navigation.navigate('login');
            }
          })
          .catch(err => {
            navigation.navigate('login');
          });
      })
      .catch(err => {
        navigation.navigate('login');
      });
  };

  useEffect(() => {
    loaddata();
  }, []);

  const handleImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if (result.didCancel) {
      setImage(null);
      alert('You did not select any image.');
    } else {
      setImage(result.assets[0].uri);
      var uploadTask = storage()
        .ref()
        .child(`chatprofileimages/${new Date()}-${result.assets[0].fileName}`)
        .putFile(result.assets[0].uri);

      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // alert('Uploaded');
          setLoading(true);
        },
        error => {
          alert('Something went wrong');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async downloadURL => {
            if (downloadURL) {
              const data = await AsyncStorage.getItem('user');
              const response = await fetch(
                'http://10.0.2.2:3000/uploadprofile',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: JSON.parse(data).user.email,
                    profilePic: downloadURL,
                  }),
                },
              );
              const result = await response.json();
              if (result.message === 'Profile picture uploaded Successfully') {
                setLoading(false);
                alert('Profile picture uploaded Successfully');
              } else if (result.error === 'Invalid Credentials') {
                alert('Invalid Credentials');
                setLoading(false);
              } else if (result.error === 'Server error') {
                setLoading(false);
                alert('Server error');
              } else {
                alert('Please try again');
                setLoading(false);
              }
              //
            } else {
              alert('Please select an image');
              setLoading(false);
            }
          });
        },
      );
    }
  };

  // console.log('userdata ', userdata);
  // console.log('ProfilePic', userdata.profilePic);

  return (
    <View style={styles.container}>
      <TopNavbar
        navigation={navigation}
        page={'My_UserProfile'}
        addpage={'AddPost'}
      />
      <BottomNavbar navigation={navigation} page={'My_UserProfile'} />
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
              <TouchableOpacity onPress={handleImage}>
                <Image
                  style={styles.profilepic}
                  source={{uri: userdata.profilePic}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleImage}>
                <Image style={styles.profilepic} source={noPic} />
              </TouchableOpacity>
            )}
            <Text style={styles.txt}>{userdata.username}</Text>

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
          {userdata.posts.length > 0 ? (
            <View style={styles.c1}>
              <Text style={styles.txt}>Your Posts</Text>
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
              <Text style={styles.txt1}>You have not posted anything yet</Text>
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

export default My_UserProfile;

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
});
