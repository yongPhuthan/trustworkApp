import {StyleSheet, View} from 'react-native';
import React, { useState, useEffect } from 'react';
import CardDashBoard from '../components/CardDashBoard';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import FooterBtn from '../components/styles/FooterBtn';
import NewCustomerBtn from '../components/styles/NewCustomerBtn';
import auth from '@react-native-firebase/auth';
import {HOST_URL} from "@env"
import {StackNavigationProp} from '@react-navigation/stack';


type Props = {};
interface Quotation {
  id: string;
  allTotal: number;
  dateOffer: string;
  docNumber: string;
  customer: {
    name: string;
  };
}

interface DashboardState {
  isExtended: boolean;
  companyData: any;
  quotationData: Quotation[] | null; // annotation for quotationData
}
interface DashboardScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Dashboard'>;
}
type RootStackParamList = {
  Quotation: undefined;
EditQuotation : {id: string};
  Dashboard: undefined;
};


const Dashboard = ({navigation}: DashboardScreenProps) => {
  const [isExtended, setIsExtended] = React.useState(true);
  const [companyData, setCompanyData] = useState(null);
  const [quotationData, setQuotationData] = useState<Quotation[] | null>(null);
  const fabStyle = {width: 50};
  const handleFABPress = () => {
    // Do something when FAB is pressed
  };
  const fetchDashboardData = async (email: string, authToken: string) => {
    const url = `http://${HOST_URL}:5001/workerfirebase-f1005/asia-southeast1/queryDashBoard`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    return data;
  }
  const getTokenAndEmail = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      const email = currentUser.email;
      return { token, email };
    } else {
      // User is not logged in
      return null;
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const user = await getTokenAndEmail();
      if (user) {
        console.log('user',user)

        const { token, email } = user;
        if(email && token) {
          const data = await fetchDashboardData(email, token);
          setCompanyData(data[0]);
          setQuotationData(data[1]);
        }

      }
    };
    fetchData();
  }, []);
  const handleEditQuotationPress = (id: string) => {
    navigation.navigate('EditQuotation', {
      id
    });  
 
  };
  
  const handleNewQuotationPress = () => {
    navigation.navigate('Quotation');  
 
  };

  const renderItem = ({item}: {item: Quotation}) => (
    <TouchableOpacity onPress={() => handleEditQuotationPress(item.id)}>
      <View >
        <CardDashBoard
          date={item.dateOffer}
          price={item.allTotal}
          customerName={item.customer?.name}
          description={'quotation.'}
          unit={'quotation.'}
        />
      </View>
    </TouchableOpacity>
  );

  
  return (
    <View style={{flex: 1}}>
    <FlatList
       
      data={quotationData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
    <NewCustomerBtn
    handlePress={()=>handleNewQuotationPress()}
    />
  </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  fabStyle: {
    bottom: 20,
    right: 20,
    position: 'absolute',
    color: 'white',
  },
});
