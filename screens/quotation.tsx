import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext, useEffect, useRef} from 'react';
import DocNumber from '../components/DocNumber';
import AddClient from '../components/AddClient';
import AddServices from '../components/AddServices';
import Summary from '../components/Summary';
import Divider from '../components/styles/Divider';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStack from '../navigations/RootStack';
import Navigation from '../navigations/Navigation';
import CardProject from '../components/CardProject';
import CardClient from '../components/CardClient';
import {BottomNavigation} from 'react-native-paper';
import FooterBtn from '../components/styles/FooterBtn';
import DatePickerButton from '../components/styles/DatePicker';
import {Store} from '../redux/Store';
import * as stateAction from '../redux/Actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
  Quotation: undefined;
  เพิ่มลูกค้า: undefined;
  เพิ่มรายการ: undefined;
  // Profile: { userId: string };
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'เพิ่มลูกค้า'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface ServiceItem {
  total: number;
  title: string | null;
  // add other properties if needed
}
const thaiDateFormatter = new Intl.DateTimeFormat('th-TH', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
});
const Quotation = ({navigation}: Props) => {
  const {
    state: {client_name, serviceList},
    dispatch,
  }: any = useContext(Store);
  const [showAddClient, setShowAddClient] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allDiscount, setAllDiscount] = useState(0);

  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleCustomerNameChange = (value: string) => {
    setCustomerName(value);
  };
  const calculateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < serviceList.length; i++) {
      total += Number(serviceList[i].total);
    }
    setTotalPrice(total);
  };

  const handleAddClientForm = () => {
    // TODO: Add client to quotation
    navigation.navigate('เพิ่มลูกค้า');
  };

  const handleAddProductForm = () => {
    // TODO: Add client to quotation
    navigation.navigate('เพิ่มรายการ');
  };

  const handleCustomerAddressChange = (value: string) => {
    setCustomerAddress(value);
  };
  const handleInvoiceNumberChange = (text: string) => {
    setInvoiceNumber(text);
  };
  const handleDateSelected = (date: Date) => {
    console.log('Selected date:', date);
  };
  useEffect(() => {
    calculateTotalPrice();
  }, [serviceList]);
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.subContainerHead}>
          <DatePickerButton
            label="วันที่เสนอราคา"
            onDateSelected={handleDateSelected}
          />

          <DocNumber
            label="เลขที่เอกสาร"
            onChange={handleInvoiceNumberChange}
            value={invoiceNumber}
          />
          <DatePickerButton
            label="ยืนราคาถึงวันที่ี"
            onDateSelected={handleDateSelected}
          />
        </View>
        <View style={styles.subContainer}>
          {client_name ? (
            <CardClient />
          ) : (
            <AddClient handleAddClient={handleAddClientForm} />
          )}
          <View style={styles.header}>
            <Icon
              style={styles.icon}
              name="briefcase"
              size={20}
              color="#19232e"
            />

            <Text style={styles.label}>บริการ-สินค้า</Text>
          </View>

          {serviceList.map((item: any, index: number) => (
            <CardProject serviceList={item} key={index} />
          ))}

          <AddServices handleAddProductFrom={handleAddProductForm} />

          <Divider />
          <Summary title={'ยอดรวม'} price={totalPrice} />
        </View>
      </ScrollView>
      <FooterBtn />
    </View>
  );
};

export default Quotation;

const styles = StyleSheet.create({
  container: {},
  subContainerHead: {
    padding: 30,
    marginBottom: 10,
    height: 'auto',
  },
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
  containerBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    bottom: 0,

    width: '100%',

    paddingBottom: 30,
  },
  button: {
    width: '90%',
    top: '30%',
    height: 50,
    backgroundColor: '#0073BA',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
  header: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
