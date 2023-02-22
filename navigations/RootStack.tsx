import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Quotation from '../screens/quotation';
import AddClientForm from '../screens/addClientForm';
import AddProductForm from '../screens/addProductForm';
import Dashboard from '../screens/dashboard';
import SelectContract from '../screens/selectContract';
import SelectAudit from '../screens/selectAudit';
type Props = {};

const RootStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="ใบเสนอราคา">
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#19232e',
          },
          headerTintColor: '#fff',
        }}
        name="ใบเสนอราคา"
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
        name="เพิ่มลูกค้า"
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
        name="เพิ่มรายการ"
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
        name="เลือกAudit"
        component={SelectAudit}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
