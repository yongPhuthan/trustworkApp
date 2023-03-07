// Import the functions you need from the SDKs you need
import firebase from '@react-native-firebase/app'
import functions from '@react-native-firebase/functions';
import {getAuth, connectAuthEmulator} from 'firebase/auth'




const firebaseConfig = {
  apiKey: "AIzaSyAlFmHGPiZC-XXlfQN37zbz5gV6dYDAsrU",
  authDomain: "workerfirebase-f1005.firebaseapp.com",
  projectId: "workerfirebase-f1005",
  storageBucket: "workerfirebase-f1005.appspot.com",
  messagingSenderId: "74243864435",
  appId: "1:74243864435:web:12e09f662e9b96816cf706",
  measurementId: "G-7N3D9JHVKK",
  databaseURL:"gs://workerfirebase-f1005.appspot.com/"
  
};




if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}
// firebase.initializeApp(firebaseConfig);



if (__DEV__) {
  // If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
  // firebase.functions().useEmulator('124.120.205.238', 5001);


  firebase.functions().useEmulator("http://localhost", 5001);

  // firebase.auth().useEmulator("http://124.120.205.238:9099");

  // android
  // firebase.auth().useEmulator("http://10.0.2.2:9099");

  // iOS
  firebase.auth().useEmulator("http://localhost:9099");


  console.log('emulator')

}


console.log('App name: ', firebase.app().name);

export default firebase
