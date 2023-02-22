import { StyleSheet, Dimensions, Text, View, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {};
const windowWidth = Dimensions.get('window').width;

const CardDashBoard = (props: Props) => {
  return (
    <TouchableOpacity style={styles.subContainer}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>คุณ ภูฐาน คันธบุษบง</Text>
        <Text style={styles.summaryPrice}>30,000 บาท</Text>
        <Icon style={styles.icon} name="chevron-right" size={26} color="#19232e" />

      </View>
      <View style={styles.description}>

      </View>
      <View style={styles.telAndTax}>
        <Text >วันที่ 13/2/2023</Text>
        {/* <Text >1100800667422</Text> */}

      </View>
    </TouchableOpacity>
  );
};

export default CardDashBoard;

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: '#ffffff',

    marginBottom: 10,
    marginTop: 10,
    height: 'auto',
    borderColor: '#ccc',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
    
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
    width: '60%'
   
  },
  summaryPrice: {
    fontSize: 18,
    width: '30%'
  },
  icon: {
    width: '10%'
  },
});
