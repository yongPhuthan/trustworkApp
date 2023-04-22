import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'SignUpScreen'>;
}
type RootStackParamList = {
  SettingCompany: undefined;
  SignUpScreen: undefined;
  CompanyUserFormScreen: undefined;
  Dashboard: undefined;

  // Profile: { userId: string };
};

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  
    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');
  
    // Handle login
    function onAuthStateChanged(user:any) {
      if (user) {
      
      }
    }

      // Handle the button press
  const signInWithPhoneNumber = async (phoneNumber: string) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log('Error signing in with phone number:', error);
    }
  };

  async function confirmCode() {
    try {
      await confirm?.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }



  const [error, setError] = useState<FirebaseAuthTypes.NativeFirebaseAuthError | null>(null);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const loginWithEmail = async () => {
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userPassword', password);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in successfully!');
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          console.log('อีเมลล์หรือรหัสผ่านไม่ถูกต้อง');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('กรอกอีเมลล์ไม่ถูกต้อง');
        }

        console.error(error);
      });
  };

  // useEffect(() => {
  //   AsyncStorage.getItem('userEmail').then(email => setEmail(email || ''));
  //   AsyncStorage.getItem('userPassword').then(password =>
  //     setPassword(password || ''),
  //   );
  // }, []);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LOGIN</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={loginWithEmail}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Button
        title={'or Sign up'}
        onPress={() => navigation.navigate('SignUpScreen')}
      />
      {confirm ? (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  ) : (
    <Button
      title="Phone Number Sign In"
      onPress={() => signInWithPhoneNumber('+66 959962030')}
    />
  )}
  {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
});
