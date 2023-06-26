import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const signInWithGoogle = async () => {
  try {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId:
        '271037986947-7s03mcfieclepi3vst2dtj1tsi01i0an.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const {idToken} = await GoogleSignin.signIn();
    const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
    auth().signInWithCredential(googleCredentials);

    return userInfo;
  } catch (error) {
    console.log('Google Sign in Error', error);
    return null;
  }
};
