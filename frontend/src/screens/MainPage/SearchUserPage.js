import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {containerFull} from '../../commonCss/pagecss';
import BottomNavbar from '../../components/BottomNavbar';
import TopNavbar from '../../components/TopNavbar';
import UserCard from '../../Cards/UserCard';

const SearchUserPage = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const getSearchUser = async () => {
    if (keyword.length > 0) {
      setLoading(true);
      const response = await fetch('http://10.0.2.2:3000/searchuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({keyword: keyword}),
      });
      const result = await response.json();
      if (result.message == 'User Found') {
        setData(result.user);
        setLoading(false);
        setError('');
      } else if (result.error == 'No User Found') {
        setError('No User Found');
        setLoading(false);
      } else if (result.error == 'Server Error') {
        setError('Server Error');
        setLoading(false);
      } else {
        alert('Something went wrong');
        setLoading(false);
      }
    } else {
      setError('');
      setData([]);
    }
  };

  useEffect(() => {
    getSearchUser();
  }, [keyword]);

  return (
    <View style={containerFull}>
      <TopNavbar />
      <TextInput
        placeholder="Search by Username..."
        placeholderTextColor={'gray'}
        style={styles.searchbar}
        value={keyword}
        onChangeText={Text => setKeyword(Text)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="white" style={{marginTop: 30}} />
      ) : (
        <></>
      )}
      <BottomNavbar page={'SearchUserPage'} />

      <ScrollView style={styles.userlists} showsVerticalScrollIndicator={false}>
        {data
          .filter(item => {
            if (keyword == '') {
              return null;
            } else if (
              item.username.toLowerCase().includes(keyword.toLowerCase())
            ) {
              return item;
            }
          })
          .map((item, index) => {
            return <UserCard key={index} user={item} navigation={navigation} />;
          })}
      </ScrollView>
    </View>
  );
};

export default SearchUserPage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
  searchbar: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginTop: 25,
    fontSize: 18,
    marginTop: 70,
    color: 'black',
  },
  userlists: {
    width: '100%',
    marginTop: 15,
    marginBottom: 55,
  },
  errorText: {
    color: 'white',
    marginTop: 30,
    fontSize: 24,
    fontWeight: '700',
  },
});
