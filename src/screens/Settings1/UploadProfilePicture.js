import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {containerFull, goback} from '../../commonCss/pagecss';
import Icon from 'react-native-vector-icons/Ionicons';
import {formHead3, formbtn} from '../../commonCss/formcss';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';

const UploadProfilePicture = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <View style={containerFull}>
      <TouchableOpacity
        style={goback}
        onPress={() => navigation.navigate('editprofile')}>
        <Icon name="arrow-back" size={25} color="gray" />
        <Text style={{color: 'gray', fontSize: 18, marginLeft: 10}}>
          Go Back
        </Text>
      </TouchableOpacity>
      {/* <Image source={Logo} style={logo1} /> */}
      {image ? (
        <Image style={styles.profilepic} source={{uri: image}} />
      ) : (
        <Text style={formHead3}>Select Pic</Text>
      )}
      <Text style={formHead3}>Upload Profile Picture</Text>

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleImage()}>
          Upload
        </Text>
      )}
    </View>
  );
};

export default UploadProfilePicture;

const styles = StyleSheet.create({
  profilepic: {
    width: 125,
    height: 125,
    borderRadius: 75,
    margin: 10,
    marginTop: 20,
  },
});
