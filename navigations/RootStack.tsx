import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Quotation from '../screens/quotation';
import AddClientForm from '../screens/addClientForm';
import AddProductForm from '../screens/addProductForm';
import Dashboard from '../screens/dashboard';
import SelectContract from '../screens/selectContract';
import SelectAudit from '../screens/selectAudit';
import EditProductForm from '../screens/editProductForm';
import SignUpScreen from '../screens/singup';
import CompanyUserFormScreen from '../screens/companyUserForm';
import ContactInfoScreen from '../screens/contactInfoScreen';
import SettingCompany from '../screens/settingCompany';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import LoginScreen from '../screens/loginScreen';
import firebase from '../firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WebViewScreen from '../screens/webView';
import EditQuotation from '../screens/editQuotation';
import EditClientForm from '../screens/editClientForm';
import EditContract from '../screens/editContract';
import InstallmentScreen from '../screens/installmentScreen';
import ContractOption from '../screens/contractOptions';
import ContractCard from '../screens/contractCard';
import LayoutScreen from '../screens/dashBoardScreen';

type Props = {};
type ParamListBase = {
  Quotation: undefined;
  AddClient: undefined;
  AddProductForm: undefined;
  LayoutScreen : undefined;
  Dashboard: undefined;
  ContractCard: undefined;
  SelectAudit: {title: string; description: string; serviceID: string};
  SelectContract: {id: string};
  EditProductForm: {
    item: {
      title: string;
      id: string;
      description: string;
      qty: number;
      unit: string;
      total: number;
      unitPrice: number;
      discountPercent: number;
      audits: {
        id: string;
        title: string;
      }[];
    };
  };
  EditClientForm: undefined;
  WebViewScreen: {id: string}; // add parameter type for WebViewScreen
  SignUpScreen: undefined;
  LoginScreen: undefined;
  CompanyUserFormScreen: undefined;
  ContactInfoScreen: undefined;
  SettingCompany: undefined;
  EditQuotation: {id: string};
  EditContract: undefined;
  ContractOption: undefined;
  InstallmentScreen: {
    apiData: object[];
  };
};
const RootStack = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const Stack = createStackNavigator<ParamListBase>();
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        user
          .getIdToken()
          .then(token => {
            setToken(token);
            console.log('ID Token: ', token);
          })
          .catch(error => {
            console.error('Error getting ID token:', error);
            // Redirect to SignUpScreen or display an appropriate error message
          });
      }
    });

    return unsubscribe;
  }, []);

  console.log('ID Token: ', token);

  return (
    <>
      <Stack.Navigator initialRouteName={user ? 'Dashboard' : 'SignUpScreen'}>
        {user ? (
          <>
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="Dashboard"
              component={Dashboard}
            />
                      <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="LayoutScreen"
              component={LayoutScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
              }}
              name="Quotation"
              component={Quotation}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
              }}
              name="EditQuotation"
              component={EditQuotation}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="CompanyUserFormScreen"
              component={CompanyUserFormScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="AddClient"
              component={AddClientForm}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="ContractCard"
              component={ContractCard}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="AddProductForm"
              component={AddProductForm}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="EditProductForm"
              component={EditProductForm}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="EditClientForm"
              component={EditClientForm}
            />

            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="SelectAudit"
              component={SelectAudit}
            />

            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="ContactInfoScreen"
              component={ContactInfoScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="ContractOption"
              component={ContractOption}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="SelectContract"
              component={SelectContract}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="InstallmentScreen"
              component={InstallmentScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="EditContract"
              component={EditContract}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="SettingCompany"
              component={SettingCompany}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="SignUpScreen"
              component={SignUpScreen}
            />
            <Stack.Screen
              options={{
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="WebViewScreen"
              component={WebViewScreen}
            />
          </>
        ) : (
          <>
         
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{
                headerTransparent: true,
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
                headerTitle: '',
              }}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="LoginScreen"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#19232e',
                },
                headerTintColor: '#fff',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
              }}
              name="CompanyUserFormScreen"
              component={CompanyUserFormScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default RootStack;
