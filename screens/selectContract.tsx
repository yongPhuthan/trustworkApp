import React, {useState, useContext, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CardAudit from '../components/CardAudit';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, ParamListBase} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {Store} from '../redux/Store';
import * as stateAction from '../redux/Actions';
import {useMutation} from 'react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {HOST_URL} from '@env';
import {v4 as uuidv4} from 'uuid';

type Props = {
  navigation: StackNavigationProp<ParamListBase, 'SelectContract'>;
  route: RouteProp<ParamListBase, 'SelectContract'>;
  // onGoBack: (data: string) => void;
};
type Contract = {
  title: string;
  description: string;
  price: number;
  imageUri: string;
  id: number;
  number: number;
};

interface MyError {
  response: object;
  // add other properties if necessary
}
const contracts: Contract[] = [
  {
    id: 1,
    number:101,
    title: 'Con 1',
    description: 'This is the description of Audit 1',
    price: 300,
    imageUri: 'https://images.unsplash.com/photo-1542057222-14988252f3fa',
  },
  {
    id: 2,
    number:102,
    title: 'Audit 2',
    description: 'This is the description of Audit 2',
    price: 250,
    imageUri: 'https://images.unsplash.com/photo-1556228724-4da03d9f6bf4',
  },
  {
    id: 3,
    number:103,
    title: 'Audit 3',
    description: 'This is the description of Audit 3',
    price: 350,
    imageUri: 'https://images.unsplash.com/photo-1573497497889-573cf1d9041a',
  },
];

const createContract = async ({ data, isEmulator }: { data: any, isEmulator: boolean }) => {
  const user = auth().currentUser;
  let url;
  if (isEmulator) {
    url = `http://${HOST_URL}:5001/workerfirebase-f1005/asia-southeast1/createContractAndQuotation`;
  } else {
    url = `https://asia-southeast1-workerfirebase-f1005.cloudfunctions.net/createContractAndQuotation`;
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

const SelectContract = ({navigation}: Props) => {
  const [selectedContracts, setSelectedContracts] = useState<Contract[]>([]);
  const {
    state: {selectedContract,isEmulator},
    dispatch,
  }: any = useContext(Store);
  const route = useRoute();

  const {updatedData, contract}: any = route.params;
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);

  const handleSelectContract = (contract: Contract) => {
    const existingIndex = selectedContracts.findIndex(
      a => a.title === contract.title,
    );
    if (existingIndex !== -1) {
      // if the audit is already selected, remove it
      setSelectedContracts(
        selectedContracts.filter(a => a.title !== contract.title),
      );
      dispatch(stateAction.remove_selected_contract(contract));
    } else {
      // if the audit is not selected, add it
      setSelectedContracts([...selectedContracts, contract]);
      dispatch(stateAction.selected_contract(contract));
    }

  };

  const {mutate} = useMutation(createContract, {
    onSuccess: data => {
      const newId = updatedData.data.id.slice(0, 8);
      navigation.navigate('WebViewScreen', {newId});
    },
    onError: (error: MyError) => {
      console.error('There was a problem calling the function:', error);
      console.log(error.response);
    },
  });

  const handleDonePress = async () => {
    if (selectedContracts.length > 0) {
      setIsLoadingMutation(true);
      try {
        const apiData = {
          data: {
            id: uuidv4(),
            quotationId: updatedData.data.id,
            signDate: 'preview',
            signDateStamp: 11,
            deposit: 2,
            signAddress: contract.signAddress,
            adjustPerDay: Number(contract.adjustPerDay),
            installingDay: Number(contract.installingDay),
            warantyYear: Number(contract.warantyYear),
            prepareDay: Number(contract.prepareDay),
            servayDate: contract.servayDate,
            // servayDateStamp: new Date().getTime(),
            quotationPageQty: 1,
            workCheckDay: Number(contract.workCheckDay),
            workCheckEnd: contract.workCheckEnd,
            warantyTimeWork: contract.warantyTimeWork,
            workAfterGetDeposit: contract.workAfterGetDeposit,
            sellerId : updatedData.data.userId,
            finishedDay: Number(contract.finishedDay),
            offerContract: 'preview',
            selectedContract: selectedContracts,
            offerCheck: 'preview',
            projectName: contract.projectName,
          },
          quotation:updatedData.data
        };

        // console.log('api data',JSON.stringify(apiData));
        await mutate({ data: apiData, isEmulator });

        setIsLoadingMutation(false);
      } catch (error: Error | AxiosError | any) {
        console.error('There was a problem calling the function:', error);
        console.log(error.response);
      }
    }
  };

  useEffect(() => {
    if (selectedContract.length > 0) {
      setSelectedContracts(selectedContract);
    }
  }, [selectedContract]);

  // Create a new array of audits with the `defaultChecked` prop set
  const contractsWithChecked = contracts.map(contract => ({
    ...contract,
    defaultChecked: selectedContracts.some(a => a.id === contract.id),
  }));

  console.log('selectedDataContracts', JSON.stringify(updatedData))
  console.log('contract contract contract', JSON.stringify(updatedData.data.userId))

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Select Contracts</Text>
          </View>

          <View style={styles.contractListContainer}>
            {contractsWithChecked.map((contract, index) => (
              <CardAudit
                key={index}
                title={contract.title}
                description={contract.description}
                price={contract.price}
                defaultChecked={contract.defaultChecked}
                imageUri={contract.imageUri}
                onPress={() => handleSelectContract(contract)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      {selectedContracts.length > 0 && (
        <View style={styles.containerBtn}>
          <TouchableOpacity onPress={handleDonePress} style={styles.button}>
            <Text
              style={
                styles.buttonText
              }>{`สร้างเอกสาร + (${selectedContracts.length})สัญญา`}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SelectContract;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    backgroundColor: '#EDEDED',
    padding: 10,
    marginBottom: 30,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#323232',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#323232',
  },
  description: {
    fontSize: 16,
    color: '#323232',
    marginTop: 5,
  },
  contractListContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardAudit: {
    height: 200, // Set a fixed height for the CardAudit component
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
});
