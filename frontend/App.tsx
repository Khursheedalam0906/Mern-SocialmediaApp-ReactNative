import {Settings, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup_EnterEmail from './src/screens/LoginSignup/Signup/Signup_EnterEmail';
import Signup_EnterVerificationCode from './src/screens/LoginSignup/Signup/Signup_EnterVerificationCode';
import Signup_EnterPassword from './src/screens/LoginSignup/Signup/Signup_EnterPassword';
import Signup_EnterUserName from './src/screens/LoginSignup/Signup/Signup_EnterUserName';
import Signup_AccountCreated from './src/screens/LoginSignup/Signup/Signup_AccountCreated';
import ForgotPassword_EnterEmail from './src/screens/LoginSignup/ForgotPassword/ForgotPassword_EnterEmail';
import ForgotPassword_EnterEmailVerificationCode from './src/screens/LoginSignup/ForgotPassword/ForgotPassword_EnterEmailVerificationCode';
import ForgotPassword_ChoosePassword from './src/screens/LoginSignup/ForgotPassword/ForgotPassword_ChoosePassword';
import ForgotPassword_AccountRecovered from './src/screens/LoginSignup/ForgotPassword/ForgotPassword_AccountRecovered';
import MainPage from './src/screens/MainPage/MainPage';
import All_Chats from './src/screens/ChatSection/All_Chats';
import SearchUserPage from './src/screens/MainPage/SearchUserPage';
import Notifications from './src/screens/MainPage/Notifications';
import My_UserProfile from './src/screens/Profile/My_UserProfile';
import Settings1 from './src/screens/Settings1/Settings1';
import ChangePassword from './src/screens/Settings1/ChangePassword';
import Login from './src/screens/LoginSignup/Login/Login';
import EditProfile from './src/screens/Settings1/EditProfile';
import ChangeUserName from './src/screens/Settings1/ChangeUserName';
import ChangeDescription from './src/screens/Settings1/ChangeDescription';
import UploadProfilePicture from './src/screens/Settings1/UploadProfilePicture';
import AddPost from './src/screens/MainPage/AddPost';
import Other_UserProfile from './src/screens/Profile/Other_UserProfile';
import MessagePage from './src/screens/ChatSection/MessagePage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="mainpage" component={MainPage} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Signup_EnterEmail" component={Signup_EnterEmail} />
        <Stack.Screen
          name="Signup_EnterVerificationCode"
          component={Signup_EnterVerificationCode}
        />
        <Stack.Screen
          name="Signup_EnterPassword"
          component={Signup_EnterPassword}
        />
        <Stack.Screen
          name="Signup_EnterUserName"
          component={Signup_EnterUserName}
        />
        <Stack.Screen
          name="Signup_AccountCreated"
          component={Signup_AccountCreated}
        />
        <Stack.Screen
          name="ForgotPassword_EnterEmail"
          component={ForgotPassword_EnterEmail}
        />
        <Stack.Screen
          name="ForgotPassword_EnterEmailVerificationCode"
          component={ForgotPassword_EnterEmailVerificationCode}
        />
        <Stack.Screen
          name="ForgotPassword_ChoosePassword"
          component={ForgotPassword_ChoosePassword}
        />
        <Stack.Screen
          name="ForgotPassword_AccountRecovered"
          component={ForgotPassword_AccountRecovered}
        />

        <Stack.Screen
          name="all_chats"
          component={All_Chats}
          options={{animation: 'slide_from_left'}}
        />
        <Stack.Screen
          name="searchuserpage"
          component={SearchUserPage}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="notificationpage"
          component={Notifications}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="myuserprofile"
          component={My_UserProfile}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen name="settings1" component={Settings1} />
        <Stack.Screen name="changepassword" component={ChangePassword} />
        <Stack.Screen name="editprofile" component={EditProfile} />
        <Stack.Screen name="changeusername" component={ChangeUserName} />
        <Stack.Screen name="changedescription" component={ChangeDescription} />
        <Stack.Screen
          name="uploadprofilepicture"
          component={UploadProfilePicture}
        />
        <Stack.Screen name="addpost" component={AddPost} />
        <Stack.Screen name="otheruserprofile" component={Other_UserProfile} />
        <Stack.Screen name="messagepage" component={MessagePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
