import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Post_Big_Card from '../Cards/Post_Big_Card';

const FollowerRandomPost = () => {
  let data = [
    {
      id: 1,
      username: 'khursheed',
      image:
        'https://images.designtrends.com/wp-content/uploads/2016/06/07124514/Sunset-HD-Nature-Wallpaper.jpg',
      profilePic:
        'https://sguru.org/wp-content/uploads/2017/04/cool-boys-profile-picture-for-facebook-12.jpg',
      likes: ['Harshal Jain', 'Viraj_123'],
      comments: [
        {
          id: 1,
          username: 'harshal_123',
          comment: 'nicepost',
        },
        {
          id: 2,
          username: 'Viraj',
          comment: 'good',
        },
      ],
    },
    {
      id: 2,
      username: 'Radha',
      image:
        'https://www.pixelstalk.net/wp-content/uploads/2016/06/Amazing-high-resolution-nature-wallpapers-2560x1920.jpg',
      profilePic:
        'https://sguru.org/wp-content/uploads/2017/04/cool-boys-profile-picture-for-facebook-12.jpg',
      likes: ['Mohan', 'Sohan'],
      comments: [
        {
          id: 1,
          username: 'Mugambo',
          comment: 'nice',
        },
        {
          id: 2,
          username: 'Reena',
          comment: 'bad',
        },
      ],
    },
    {
      id: 3,
      username: 'Najir hussain',
      image: 'https://images3.alphacoders.com/165/thumb-1920-165265.jpg',
      profilePic:
        'https://sguru.org/wp-content/uploads/2017/04/cool-boys-profile-picture-for-facebook-12.jpg',
      likes: ['Reena', 'Obdul'],
      comments: [
        {
          id: 1,
          username: 'Ram',
          comment: 'very bad',
        },
        {
          id: 2,
          username: 'Badal',
          comment: 'good',
        },
      ],
    },
  ];

  // console.log(data[0].username);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {data.map(item => {
        return (
          <Post_Big_Card
            key={item.id}
            username={item.username}
            profilePic={item.profilePic}
            post_pic={item.image}
            likes={item.likes}
            comments={item.comments}
          />
        );
      })}
    </ScrollView>
  );
};

export default FollowerRandomPost;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    marginVertical: 50,
  },
});
