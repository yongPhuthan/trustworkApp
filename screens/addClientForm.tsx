import React, {useState, useContext, useEffect, useRef} from 'react';
import {Text, View, TextInput, Button, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  clientName,
  clientAddress,
  clientTel,
  clientVat,
} from '../redux/Actions';
import {Store} from '../redux/Store';
import * as stateAction from '../redux/Actions';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, ParamListBase} from '@react-navigation/native';

type FormValues = {
  name: string;
  address: string;
  phone: string;
  taxId: string;
};

interface Props {
  navigation: StackNavigationProp<ParamListBase, 'AddClient'>;
  route: RouteProp<ParamListBase, 'AddClient'>;
}

const AddClientForm = ({navigation, route}: Props) => {
  const {
    state: {client_name},
    dispatch,
  }: any = useContext(Store);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      taxId: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    // Send form data to backend API to add client
    console.log(data);
    dispatch(stateAction.client_name(data.name));
    dispatch(stateAction.client_address(data.address));
    dispatch(stateAction.client_tel(data.phone));
    dispatch(stateAction.client_tax(data.taxId));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text>{client_name}</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="ชื่อลูกค้า"
              style={styles.inputName}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="ที่อยู่"
              keyboardType="name-phone-pad"
              multiline
              textAlignVertical="top"
              numberOfLines={4}
              style={styles.inputAddress}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="address"
        />
        {errors.address && <Text>This is required.</Text>}

        <Controller
          control={control}
       
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="เบอร์โทรศัพท์"
              keyboardType="phone-pad"
              style={styles.inputName}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="phone"
        />
        {/* {errors.phone && <Text>This is required.</Text>} */}

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="เลขทะเบียนภาษี(ถ้ามี)"
              keyboardType="number-pad"
              style={styles.inputName}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="taxId"
        />

        <Button title="บันทึก" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default AddClientForm;

const styles = StyleSheet.create({
  container: {},
  subContainer: {
    backgroundColor: '#ffffff',
    padding: 30,
    marginBottom: 10,
    height: 'auto',
  },
  form: {
    border: '1px solid #0073BA',
    borderRadius: 10,
  },
  date: {
    textAlign: 'right',
  },

  inputName: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    fontSize: 16,
    height: 40,
  },
  inputAddress: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    fontSize: 16,
    height: 100,
  },
  label: {
    fontSize: 16,
    color: 'white',
  },
});
