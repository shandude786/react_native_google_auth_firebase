import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {User, GoogleSignin} from '@react-native-google-signin/google-signin';
import {signInWithGoogle} from './src/config/firebase/GoogleSignIn';
type Props = {};

const App = (props: Props) => {
  const [userInfo, setUserInfo] = React.useState<User | null>();

  const googleSignIn = () => {
    signInWithGoogle().then(data => {
      if (!data) {
        console.log('Error');
        return;
      }
      setUserInfo(data);
      console.log('Data', data);
    });
  };

  const googleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {userInfo !== null && <Text>{userInfo?.user.name}</Text>}
      {userInfo !== null && <Text>{userInfo?.user.email}</Text>}
      {userInfo !== null && (
        <Image
          source={{
            uri: userInfo?.user.photo as string,
          }}
          style={{width: 100, height: 100, margin: 10}}
        />
      )}
      {userInfo == null ? (
        <TouchableOpacity
          style={{
            padding: 20,
            borderWidth: 2,
            borderRadius: 20,
          }}
          onPress={() => googleSignIn()}>
          <Text>Sign In </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            padding: 20,
            borderWidth: 2,
            borderRadius: 20,
            marginTop: 30,
          }}
          onPress={() => googleSignOut()}>
          <Text>Sign Out </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default App;
