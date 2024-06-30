import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Heart from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Post_Big_Card = ({username, profilePic, post_pic, likes, comments}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.c1}>
        <Image source={{uri: profilePic}} style={styles.profilePic} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <Image source={{uri: post_pic}} style={styles.postPic} />
      <View style={styles.s2}>
        {isLiked ? (
          <View style={styles.s21}>
            <Heart
              name="heart"
              size={25}
              color="white"
              style={styles.iconliked}
              onPress={() => setIsLiked(false)}
            />
            <Text style={styles.liked}>{likes.length + 1}</Text>
          </View>
        ) : (
          <View style={styles.s21}>
            <Heart
              name="hearto"
              size={25}
              color="white"
              onPress={() => setIsLiked(true)}
            />
            <Text style={styles.notliked}>{likes.length}</Text>
          </View>
        )}
        <View style={styles.s22}>
          <TouchableOpacity onPress={() => setShowComments(!showComments)}>
            <FontAwesome name="comment" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {showComments == true && (
        <View style={styles.s3}>
          {comments.map((item, index) => {
            return (
              <View style={styles.s31} key={item.id}>
                <Text style={styles.usernameText}>{item.username}</Text>
                <Text style={styles.commentText}>{item.comment}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Post_Big_Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    // height: 500,
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
    borderColor: 'white',
    borderWidth: 1,
  },
  c1: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
  username: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 17,
  },
  postPic: {
    width: '100%',
    aspectRatio: 1,
  },
  s2: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
  },
  s21: {
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  notliked: {
    color: 'gray',
    marginLeft: 10,
    fontSize: 16,
  },
  liked: {
    color: '#DC143C',
    marginLeft: 10,
    fontSize: 25,
  },
  iconliked: {
    color: '#DC143C',
    fontSize: 30,
  },
  s22: {
    marginLeft: 22,
  },
  s3: {
    width: '100%',
    backgroundColor: '#111111',
    padding: 10,
  },
  s31: {},
  usernameText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
  },
  commentText: {
    color: 'gray',
    fontSize: 17,
    marginLeft: 5,
  },
  s31: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
});
