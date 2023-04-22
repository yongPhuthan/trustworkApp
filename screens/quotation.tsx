import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import React, {useState, useContext, useEffect, useMemo} from 'react';
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
import {useQuery} from 'react-query';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useMutation} from 'react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {HOST_URL, DEV_API_URL,PROD_API_URL} from "@env"

type RootStackParamList = {
  Quotation: undefined;
  AddClient: undefined;
  AddProductForm: undefined;
  EditProductForm: {item: object[]};
  EditClientForm: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  InstallmentScreen:{
    data:any
  }
  SelectContract: {
    id: string
   totalPrice: number
   sellerId: string
  };
  WebViewScreen: {id: string}; // add parameter type for WebViewScreen
};

interface Audit {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUri: string;
  defaultChecked: boolean;
}
interface selectedContract {
  id: string;
  title: string;
}
interface MyObject {
  id: string;
  title: string;
  description: string;
  unitPrice: string;
  qty: string;
  discountPercent: string;
  total: string;
  audits: Audit[];
}

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Quotation'>;
}
interface IdContractList {
  id: string;
}
interface MyError {
  response: object;
  // add other properties if necessary
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

const fetchCompanyUser = async (email: string, isEmulator:boolean) => {
  const user = auth().currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  const idToken = await user.getIdToken();
  let url;
  if (isEmulator) {
    url = `http://${HOST_URL}:5001/workerfirebase-f1005/asia-southeast1/queryCompanySeller2`;
  } else {
    console.log('isEmulator Fetch',isEmulator)
    url = `https://asia-southeast1-workerfirebase-f1005.cloudfunctions.net/queryCompanySeller2`;
  }
  const response = await fetch(
    url,
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

const createQuotation = async (data: any, isEmulator:boolean) => {
  const user = auth().currentUser;
  let url;
  if (isEmulator) {
    url = `http://${HOST_URL}:5001/workerfirebase-f1005/asia-southeast1/createQuotation3`;
  } else {
    url = `https://asia-southeast1-workerfirebase-f1005.cloudfunctions.net/createQuotation3`;
  }
  const response = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.uid}`,
      },
      body: JSON.stringify({data}),
    },
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
};

const Quotation = ({navigation}: Props) => {
  const {
    state: {
      client_name,
      selectedContract,
      serviceList,
      client_address,
      client_tel,
      client_tax,
      isEmulator
    },
    dispatch,
  }: any = useContext(Store);
  // const { data, isLoading } = useQuery('data', fetchData);
  const [email, setEmail] = useState('');
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);
  const [showAddClient, setShowAddClient] = useState(true);
  const [allDiscount, setAllDiscount] = useState(0);
  const [status, setStatus] = useState('');
  const [total, setTotal] = useState(0);
  const [companyUser, setCompanyUser] = useState<CompanyUser>({id: ''});
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
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [token, setToken] = useState<FirebaseAuthTypes.User | null>(null);
  const quotationId = uuidv4();
  const [discount, setDiscount] = useState('0');
  const [vat7, setVat7] = useState(false);
  const totalPrice = useMemo(() => {
    let total = 0;
    for (let i = 0; i < serviceList.length; i++) {
      total += Number(serviceList[i].total);
    }
    return total;
  }, [serviceList]);


  // const {mutate} = useMutation(createQuotation, {
  //   onSuccess: data => {
  //     navigation.navigate('SelectContract', {id: quotationId, totalPrice, sellerId: companyUser.id});
  //   },
  //   onError: (error: MyError) => {
  //     console.error('There was a problem calling the function:', error);
  //     console.log(error.response);
  //   },
  // });

  const {data, isLoading, isError} = useQuery(
    ['companyUser', email],
    () => fetchCompanyUser(email,isEmulator).then(res => res),
    {
      onSuccess: data => {
        setCompanyUser(data);
      },
    },
  );
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

  const handleEditClient = () => {
    navigation.navigate('EditClientForm');
  };
  const handleCustomerAddressChange = (value: string) => {
    setCustomerAddress(value);
  };
  const handleButtonPress = async () => {
    // navigation.navigate('SelectContract', {id: quotationId, totalPrice, sellerId: companyUser.id});  

    setIsLoadingMutation(true);
    try {
      // Perform mutation
      // const resultArray: MyObject[] = [];
      // serviceList.forEach((obj: MyObject) => {
      //   const newObj: any = {...obj};
      //   newObj.audits = obj.audits.map((audit: Audit) => audit.id);
      //   resultArray.push(newObj);
      // });
      const clientData = {
        id: uuidv4(),
        name: client_name,
        address: client_address,
        companyId: client_tax,
        officePhone: client_tel,
        mobilePhone: client_tel,
      };
      const apiData = {
        data: {
          id: quotationId,
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
          offerContract: idContractList,
          userId: companyUser?.id,
        },
      };
      // await mutate(apiData);
   navigation.navigate('InstallmentScreen', {data: apiData });

      setIsLoadingMutation(false);
    } catch (error: Error | AxiosError | any) {
      console.error('There was a problem calling the function:', error);
      console.log(error.response);
    }
  };

  const handleInvoiceNumberChange = (text: string) => {
    setDocnumber(text);
  };
  const signOutPage = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  // const handleSelectContract = () => {
  //   navigation.navigate('SelectContract');
  // };
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
    const unsubscribe = auth().onAuthStateChanged(newUser => {
      if (newUser && newUser.email) {
        // User is authenticated, show their email
        console.log('User is authenticated:', newUser.email);
        setUser(newUser);
        setEmail(newUser.email);
      } else {
        // User is not authenticated, navigate to login page
        console.log('User is not authenticated, navigating to login page...');
        navigation.navigate('LoginScreen');
      }
    });

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 900) + 100; // generates a random 3-digit number
    setDocnumber(`${year}${month}${day}${randomNum}`);
    setDateOffer(`${year}-${month}-${day}`);
    const endDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const endYear = endDate.getFullYear();
    const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
    const endDay = String(endDate.getDate()).padStart(2, '0');
    setDateEnd(`${endYear}-${endMonth}-${endDay}`);
    return unsubscribe;
  }, [serviceList, navigation]);

  if (isLoading) {
    return <Text>LOADING ........</Text>;
  }
  const idContractList = selectedContract.map((obj: IdContractList) => obj.id);

  console.log('company user' + JSON.stringify(companyUser));
  console.log('serviceList' + JSON.stringify(serviceList));
  console.log('isEmulator', isEmulator)
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.subContainerHead}>
          <DatePickerButton
            label="วันที่เสนอราคา"
            date="today"
            onDateSelected={handleStartDateSelected}
          />

          <DocNumber
            label="เลขที่เอกสาร"
            onChange={handleInvoiceNumberChange}
            value={docNumber}
          />
          <DatePickerButton
            label="ยืนราคาถึงวันที่ี"
            date="sevenDaysFromNow"
            onDateSelected={handleEndDateSelected}
          />
        </View>
        <View style={styles.subContainer}>
          {client_name ? (
            <CardClient
            handleEditClient={handleEditClient}
            />
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

        {/* {selectedContract.length > 0 ? (
          <View style={styles.cardContainer}>
            {selectedContract.map((item: selectedContract) => (
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
                onPress={handleSelectContract}>
                <Text style={styles.selectButtonText}>Select Audit</Text>
              </TouchableOpacity>
            )}
          </View>
        )} */}
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.button} onPress={signOutPage}>
          <Text style={styles.buttonText}>sign out page</Text>
        </TouchableOpacity>
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
