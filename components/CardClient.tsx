import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext, useEffect, useRef} from 'react';
import {Store} from '../redux/Store';
import * as stateAction from '../redux/Actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, ParamListBase} from '@react-navigation/native';

type Props = {
  handleEditClient: Function
};
const windowWidth = Dimensions.get('window').width;

const CardClient = (props: Props) => {
  const {
    state: {client_name},
    dispatch,
  }: any = useContext(Store);


  return (
    <View>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <Icon style={styles.icon} name="account" size={20} color="#19232e" />
          <Text style={styles.label}>ลูกค้า</Text>
        </View>
        <TouchableOpacity onPress={() => props.handleEditClient()}>
          <View style={styles.editButton}>
            <Icon name="pencil" size={20} color="#19232e" />
            <Text style={styles.editButtonText}>แก้ไข</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.subContainer}>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>{client_name}</Text>
          <Text style={styles.summaryPrice}></Text>
        </View>
        <View style={styles.description}>
          <Text>43/3-4 หมู่2 ถนน.เพชรเกษม ต.อ้อมใหญ่อ.สามพราน จ.ยครปฐม</Text>
        </View>
        <View style={styles.telAndTax}>
          <Text>โทร.095-9962030</Text>
          <Text>1100800667422</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardClient;

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: '#ffffff',
    padding: 50,
    marginBottom: 10,
    marginTop: 10,
    height: 'auto',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  telAndTax: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  unitPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.2,
    marginTop: 10,
  },
  subummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryText: {
    fontSize: 16,
  },
  summaryPrice: {
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  editButtonText: {
    fontSize: 14,
    color: '#19232e',
    marginLeft: 4,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: '#19232e',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
