import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './RootStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/dashboard';
import LoginScreen from '../screens/loginScreen';
import firebase from '../firebase';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import SignUpScreen from '../screens/singup';
import {createStackNavigator} from '@react-navigation/stack';
type Props = {};

type ParamListBase = {
  Quotation: undefined;
  AddClient: undefined;
  AddProductForm: undefined;
  LayoutScreen: undefined;
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
function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<ParamListBase>();

const Navigation = (props: Props) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="ใบเสนอราคา" component={RootStack} />
          <Tab.Screen name="สัญญา" component={RootStack} />
          <Tab.Screen name="บัญชี" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
