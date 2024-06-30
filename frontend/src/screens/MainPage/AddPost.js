import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {containerFull, goback} from '../../commonCss/pagecss';
import Icon from 'react-native-vector-icons/Ionicons';
import {formHead3, formInput, formbtn} from '../../commonCss/formcss';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPost = ({navigation}) => {
  const [postdescription, setPostDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  //
  const PicImage = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(async error => {
        await ImagePicker.clean()
          .then(() => {
            console.log('removed all tmp images from tmp directory');
          })
          .catch(e => {
            alert(e);
          });
        setImage(null);
        alert('You did not select any Image');
      });
  };

  const handleAddPost = async () => {
    if (image === null) {
      alert('Please select Image');
    } else {
      var uploadTask = storage()
        .ref()
        .child(`posts/${new Date()}`)
        .putFile(image);
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
              const response = await fetch('http://10.0.2.2:3000/addpost', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: JSON.parse(data).user.email,
                  posts: downloadURL,
                  postdescription,
                }),
              });
              const result = await response.json();
              if (result.message === 'Post added Successfully') {
                setLoading(false);
                alert('Post added Successfully');
                setImage(null);
                setPostDescription('');
                navigation.navigate('myuserprofile');
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
        onPress={() => navigation.navigate('myuserprofile')}>
        <Icon name="arrow-back" size={25} color="gray" />
        <Text style={{color: 'gray', fontSize: 18, marginLeft: 10}}>
          Go Back
        </Text>
      </TouchableOpacity>
      {/* <Image source={Logo} style={logo1} /> */}
      {image ? (
        <TouchableOpacity onPress={PicImage}>
          <Image source={{uri: image}} style={{width: 300, height: 300}} />
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={PicImage}>
            <Image
              source={require('../../../assets/gallery.png')}
              style={{width: 100, height: 100}}
            />
          </TouchableOpacity>
        </>
      )}
      <Text style={formHead3}>Post description</Text>
      <TextInput
        style={formInput}
        placeholder="Enter Description"
        placeholderTextColor={'gray'}
        multiline={true}
        onChangeText={Text => setPostDescription(Text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleAddPost()}>
          Send
        </Text>
      )}
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({});
