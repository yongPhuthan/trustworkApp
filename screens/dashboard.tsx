import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CardDashBoard from '../components/CardDashBoard';
import {AnimatedFAB} from 'react-native-paper';
import FabButton from '../components/styles/FabButton';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import FooterBtn from '../components/styles/FooterBtn';
import NewCustomerBtn from '../components/styles/NewCustomerBtn';

type Props = {};

const Dashboard = (props: Props) => {
  const [isExtended, setIsExtended] = React.useState(true);
  const fabStyle = {width: 50};
  const handleFABPress = () => {
    // Do something when FAB is pressed
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text>dashboard</Text>
        <CardDashBoard />
      <CardDashBoard />
      </ScrollView>
      <NewCustomerBtn />
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
