import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import React, {useState, useContext, useEffect, useRef} from 'react';
import DocNumber from '../components/DocNumber';
import AddClient from '../components/AddClient';
import AddServices from '../components/AddServices';
import Summary from '../components/Summary';
import Divider from '../components/styles/Divider';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import firebase from '../firebase';
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
import {useQuery} from 'react-query';
import auth from '@react-native-firebase/auth';

type RootStackParamList = {
  Quotation: undefined;
  AddClient: undefined;
  AddProductForm: undefined;
  EditProductForm: undefined;
  SignUpScreen: undefined;
  SelectContract: undefined;
};

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Quotation'>;
}

interface ServiceItem {
  total: number;
  title: string | null;
  // add other properties if needed
}
interface CompanyUser {
  id: string;
  // other properties here
}
const thaiDateFormatter = new Intl.DateTimeFormat('th-TH', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const fetchCompanyUser = async (email: string) => {
  const user = auth().currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  const idToken = await user.getIdToken();

  const response = await fetch(
    `http://localhost:5001/workerfirebase-f1005/asia-southeast1/queryCompanySeller2`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({email}),
      credentials: 'include',
    },
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return data;
  
};

const Quotation = ({navigation}: Props) => {
  const {
    state: {client_name,selectedContract, serviceList,client_address,client_tel,client_tax},
    dispatch,
  }: any = useContext(Store);
  // const { data, isLoading } = useQuery('data', fetchData);
  const [email, setEmail] = useState('');

  const [showAddClient, setShowAddClient] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allDiscount, setAllDiscount] = useState(0);
  const [status, setStatus] = useState('');
  const [total, setTotal] = useState(0);
  const [companyUser, setCompanyUser] = useState<CompanyUser>({id:''});
  const [discountValue, setDiscountValue] = useState(0);
  const [summaryAfterDiscount, setSumAfterDiscount] = useState(0);
  const [vat7Amount, setVat7Amount] = useState(0);
  const [vat3Amount, setVat3Amount] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [docNumber, setDocnumber] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dateOffer, setDateOffer] = useState<String>('');
  const [dateEnd, setDateEnd] = useState<String>('');

  const [discount, setDiscount] = useState('0');
  const [vat7, setVat7] = useState(false);

  const handleValuesChange = (
    total: number,
    discountValue: number,
    sumAfterDiscount: number,
    vat7Amount: number,
    vat3Amount: number,
  ) => {
    setTotal(total);
    setDiscountValue(discountValue);
    setSumAfterDiscount(sumAfterDiscount);
    setVat7Amount(vat7Amount);
    setVat3Amount(vat3Amount);
  };
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
  const checkConnection = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/check-connection');
      const data = await response.text();
      setStatus(data);
    } catch (err) {
      console.error('Error checking connection', err);
      setStatus('Error checking connection');
    }
  };
  const handleAddClientForm = () => {
    // TODO: Add client to quotation
    navigation.navigate('AddClient');
  };

  const handleAddProductForm = () => {
    // TODO: Add client to quotation
    navigation.navigate('AddProductForm');
  };
  const handleEditService = (index: number) => {
    navigation.navigate('EditProductForm', {item: serviceList[index]});
  };
  const handleCustomerAddressChange = (value: string) => {
    setCustomerAddress(value);
  };
  const handleButtonPress = async () => {
    const clientData = {
      id: uuidv4(),
      name: client_name,
      address: client_address,
      companyId: client_tax,
      officePhone: client_tel,
      mobilePhone: client_tel,
    }
    const apiData = {
      data: {
        id: uuidv4(),
        summary: totalPrice,
        services: serviceList,
        customer: clientData,
        vat7: vat7Amount,
        taxValue: vat3Amount,
        taxName: 'vat3',
        dateEnd,
        discountValue,
        discountName: 'percent',
        dateOffer,
        docNumber,
        summaryAfterDiscount,
        allTotal: totalPrice,
        sellerSignature: '',
        conditions: [],
        userId: companyUser?.id ,
      },
    };
    console.log('apiData'+ JSON.stringify(apiData));
  };

  const handleInvoiceNumberChange = (text: string) => {
    setDocnumber(text);
  };

  const handleSelectContract = () => {
    navigation.navigate('SelectContract');
  };
  const handleStartDateSelected = (date: Date) => {
    const formattedDate = thaiDateFormatter.format(date);
    setDateOffer(formattedDate);
    console.log(dateOffer);
  };

  const handleEndDateSelected = (date: Date) => {
    const formattedEndDate = thaiDateFormatter.format(date);

    setDateEnd(formattedEndDate);
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user && user.email) {
        // User is authenticated, show their email
        console.log('User is authenticated:', user.email);
        setEmail(user.email);
      } else {
        // User is not authenticated, navigate to login page
        console.log('User is not authenticated, navigating to login page...');
        navigation.navigate('SignUpScreen');
      }
    });

    calculateTotalPrice();

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 900) + 100; // generates a random 3-digit number
    setDocnumber(`${year}${month}${day}${randomNum}`);

    return unsubscribe;
  }, [serviceList, navigation]);
  const {data, isLoading, isError} = useQuery(
    ['companyUser', email],
    () => fetchCompanyUser(email).then(res => res),
    {
      onSuccess: data => {
        setCompanyUser(data)
      },
    },
  );
  if (isLoading) {
    return <Text>LOADING ........</Text>;
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.subContainerHead}>
          <DatePickerButton
            label="วันที่เสนอราคา"
            onDateSelected={handleStartDateSelected}
          />

          <DocNumber
            label="เลขที่เอกสาร"
            onChange={handleInvoiceNumberChange}
            value={docNumber}
          />
          <DatePickerButton
            label="ยืนราคาถึงวันที่ี"
            onDateSelected={handleEndDateSelected}
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
            <CardProject
              handleEditService={() => handleEditService(index)}
              serviceList={item}
              key={index}
            />
          ))}

          <AddServices handleAddProductFrom={handleAddProductForm} />

          <Divider />
          <Summary
            title={'ยอดรวม'}
            price={totalPrice}
            onValuesChange={handleValuesChange}
          />
        </View>
        {selectedContract.length > 0 ? (
            <View style={styles.cardContainer}>
              {selectedContract.map((item)  => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={handleSelectContract}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Icon name="chevron-right" size={24} color="gray" />
                </TouchableOpacity>
              ))} 
            </View>
          ) : (
            <View style={styles.subContainer}>
              {selectedContract.length === 0 && (
                <TouchableOpacity
                style={styles.selectButton}
                onPress={(handleSelectContract)}>
                <Text style={styles.selectButtonText}>Select Audit</Text>
              </TouchableOpacity>
              )}
            </View>
          )}
 
      </ScrollView>
      <View>
        <FooterBtn onPress={handleButtonPress} />
      </View>
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
  selectButton: {
    backgroundColor: '#0073BA',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    marginTop: 20,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    justifyContent: 'space-between',

  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
