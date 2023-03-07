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

type Props = {};
type ParamListBase = {
  Quotation: undefined;
  AddClient: undefined;
  AddProductForm: undefined;
  Trustwork: undefined;
  SelectAudit: undefined;
  EditProductForm: undefined;
  SignUpScreen: undefined;
  CompanyUserFormScreen: undefined;
  ContactInfoScreen: undefined;
  SettingCompany: undefined;
  // Profile: { userId: string };
};
const RootStack = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const Stack = createStackNavigator<ParamListBase>();
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
    });

    return unsubscribe;
  }, []);
  return (
    <Stack.Navigator initialRouteName="Quotation">
      {user ? (
        <>
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
            name="Trustwork"
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
            name="เลือกสัญญา"
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
            name="SettingCompany"
            component={SettingCompany}
          />
        </>
      ) : (
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
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
