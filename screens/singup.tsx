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

  // Profile: { userId: string };
};

const SignUpScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] =
    useState<FirebaseAuthTypes.NativeFirebaseAuthError | null>(null);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);


  const signUpEmail = async() => {
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userPassword', password);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('CompanyUserFormScreen');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('อีเมลล์นี้ถูกสมัครสมาชิกไปแล้ว');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('กรอกอีเมลล์ไม่ถูกต้อง');
        }

        console.error(error);
      });
  };
  useEffect(() => {
    AsyncStorage.getItem('userEmail').then(email => setEmail(email || ''));
    AsyncStorage.getItem('userPassword').then(password =>
      setPassword(password || ''),
    );
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>
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
      <TouchableOpacity style={styles.loginBtn} onPress={signUpEmail}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
      <Button title={'Sign in with Google'} onPress={() =>  {
    GoogleSignin.configure({
 
      webClientId: "74243864435-qne1vsc8riejp19er266ohbmmu7our10.apps.googleusercontent.com",
        iosClientId: '74243864435-459ndmbeg0fn74qe8oqdtg742344gc44.apps.googleusercontent.com',
    });
GoogleSignin.hasPlayServices().then((hasPlayService) => {
        if (hasPlayService) {
             GoogleSignin.signIn().then((userInfo) => {
                       console.log(JSON.stringify(userInfo))
             }).catch((e) => {
             console.log("ERROR IS: " + JSON.stringify(e));
             })
        }
}).catch((e) => {
    console.log("ERROR IS: " + JSON.stringify(e));
})
}} />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

export default SignUpScreen;

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
