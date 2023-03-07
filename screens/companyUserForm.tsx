import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {firebase as firebaseFunction} from '@react-native-firebase/functions';
import firebase from '../firebase';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {v4 as uuidv4} from 'uuid';

import {ScrollView} from 'react-native-gesture-handler';
interface CompanyUserFormScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'CompanyUserFormScreen'>;
}
type RootStackParamList = {
  Quotation: undefined;
  ContactInfoScreen: {
    bizName: string;
    userName: string;
    userLastName: string;
    address: string;
    officeTel: string;
    mobileTel: string;
    bizType: string;
    logo: string | null;
    signature: string | null;
    companyNumber: string;
    bankaccount: object;
    conditions: string;
  };
  AddProductForm: undefined;
  SignUpScreen: undefined;
  EditProductForm: undefined;
  CompanyUserFormScreen: undefined;
  // Profile: { userId: string };
};

const CompanyUserFormScreen = ({navigation}: CompanyUserFormScreenProps) => {
  const [bizName, setBizName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userLastName, setUserLastName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [officeTel, setOfficeTel] = useState<string>('');
  const [mobileTel, setMobileTel] = useState<string>('');
  const [bizType, setBizType] = useState<string>('');
  const [logo, setLogo] = useState<string>('');
  const [signature, setSignature] = useState<string | null>(null);
  const [companyNumber, setCompanyNumber] = useState<string>('');
  const [bankaccount, setBankaccount] = useState<object>({});
  const [conditions, setConditions] = useState<string>('');
  const [userEmail, setUserEmail] = useState('');
  const [page, setPage] = useState(1);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);



  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };
  const handleButtonPress = async () => {
    // Get a reference to the createCompanyUser function
    const createCompanyUser = firebaseFunction
      .functions()
      .httpsCallable('createCompanyUser');

    // Create an object with the user input data
    const data = {
      id: uuidv4(), // assuming the user's UID will be used as the companyUser's ID
      bizName,
      userName,
      userLastName,
      address,
      officeTel,
      mobileTel,
      bizType,
      logo,
      companyNumber,
    };

    try {
      console.log(JSON.stringify(data)); //
      // Call the createCompanyUser function with the user input data
      const result = await createCompanyUser(data);
      console.log(result); // log the result object to the console
    } catch (error) {
      console.error(error); // log any errors to the console
    }
  };

  const testConnection = async () => {
    console.log('test connection');
    const helloWorldCall = firebase.functions().httpsCallable('helloWorldCall');
    helloWorldCall().then(result => {
      console.log(result.data); // "Hello from Firebase! onCall"
    }).catch(error => {
      console.log(error);
    });
    
  };
  const getToken = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      return user.getIdToken();
    } else {
      // Handle user not logged in
    }
  };
  

  const createCompanyUser = async () => {
    const data = {
      id: uuidv4(), // assuming the user's UID will be used as the companyUser's ID
      bizName,
      userName,
      userLastName,
      address,
      officeTel,
      mobileTel,
      bizType,
      logo,
      companyNumber,
    };

    try {
      console.log('try')

      const response = await fetch('https://asia-southeast1-workerfirebase-f1005.cloudfunctions.net/createCompanyUserReq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken}`
        },
        body: JSON.stringify(data)
      });
      
      const res = await response.json();
      console.log(res);
      console.log('token'+(getToken));

      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

  const testConnectionHttp = async () => {
    console.log('test connection');
    https://us-central1-<project-id>.cloudfunctions.net/date
    fetch('http://localhost:5001/workerfirebase-f1005/us-central1/helloWorldReq')
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  
  };
  const signOutPage = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  async function getAuthToken() {
    try {
      const user = auth().currentUser;
  
      if (user) {
        const token = await user.getIdToken();
        console.log('Auth token:', token);
        console.log('UID:', user.uid);

        return user;
      } else {
        console.error('User not signed in.');
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
  }

  const handleFunction = async () => {
    const user = auth().currentUser;
    const data = {
      id: uuidv4(), // assuming the user's UID will be used as the companyUser's ID
      bizName,
      userName,
      userLastName,
      address,
      officeTel,
      mobileTel,
      bizType,
      logo,
      companyNumber,
    };
    await fetch('http://localhost:5001/workerfirebase-f1005/asia-southeast1/createCompanySeller', {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.uid}`,
      },
      body: JSON.stringify({ data }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigation.navigate('Quotation');

      // return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('There was a problem calling the function:', error);
      console.log(error.response);
    });
    
      
  };

  const renderPage1 = () => {
    return (
      <>
        <Text style={styles.label}>Biz Name</Text>
        <TextInput
          style={styles.input}
          value={bizName}
          onChangeText={setBizName}
        />
        <Text style={styles.label}>User Name</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />
        <Text style={styles.label}>User Last Name</Text>
        <TextInput
          style={styles.input}
          value={userLastName}
          onChangeText={setUserLastName}
        />
        <TouchableOpacity style={styles.button} onPress={handleNextPage}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </>
    );
  };
  const renderPage2 = () => {
    return (
      <>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
        <Text style={styles.label}>Office Tel</Text>
        <TextInput
          style={styles.input}
          value={officeTel}
          onChangeText={setOfficeTel}
        />
        <Text style={styles.label}>Mobile Tel</Text>
        <TextInput
          style={styles.input}
          value={mobileTel}
          onChangeText={setMobileTel}
        />
        <TouchableOpacity style={styles.button} onPress={testConnectionHttp}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFunction}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={signOutPage}>
          <Text style={styles.buttonText}>sign out page</Text>
        </TouchableOpacity>
      </>
    );
  };


  return (
    <View style={styles.container}>
      {page === 1 ? renderPage1() : renderPage2()}
    </View>
  );
};

export default CompanyUserFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  label: {
    color: '#444444',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0066C0',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
