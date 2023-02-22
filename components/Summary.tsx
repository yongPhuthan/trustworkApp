import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Switch,

} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector';
import React, {useState, useRef} from 'react';
import Divider from './styles/Divider';

type Props = {
  title: string;
  price: number;
};

const windowWidth = Dimensions.get('window').width;

const Summary = (props: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedValue, setSelectedValue] = useState('item1');
  const [pickerVisible, setPickerVisible] = useState(false);
  const onButtonPress = () => {
    setPickerVisible(!pickerVisible);
  };
  const pickerRef = useRef() as any;
  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
  const data = [
    {key: 'item1', label: 'Item 1'},
    {key: 'item2', label: 'Item 2'},
    {key: 'item3', label: 'Item 3'},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>{props.title}</Text>
        <Text style={styles.summaryPrice}>{props.price}</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>ส่วนลดรวม</Text>
        <Text style={styles.summaryPrice}>0</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>หัก ณ ที่จ่าย</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={pickerVisible ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setPickerVisible(!pickerVisible)}
          value={pickerVisible}
        />
        {pickerVisible ? (
          <ModalSelector
            data={data}
            endFillColor={'black'}
            style={styles.summarySelecter}
            initValue={selectedValue}
            onChange={option => setSelectedValue(option.key)}></ModalSelector>
        ) : (
          <Text style={styles.summaryPrice}>ไม่มี</Text>
        )}
      </View>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>vat               </Text>
        <Switch
        shouldRasterizeIOS
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={pickerVisible ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setPickerVisible(!pickerVisible)}
          value={pickerVisible}
        />
        {pickerVisible ? (
          <ModalSelector
            data={data}
            endFillColor={'black'}
            style={styles.summarySelecter}
            initValue={selectedValue}
            onChange={option => setSelectedValue(option.key)}></ModalSelector>
        ) : (
          <Text style={styles.summaryPrice}>ไม่มี</Text>
        )}
      </View>
      <Divider />
      <View style={styles.summaryTotal}>
        <Text style={styles.totalSummary}>รวมทั้งสิ้น</Text>
        <Text style={styles.totalSummary}>{props.price}</Text>
      </View>

    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryTotal: {
    flexDirection: 'row',
    marginBottom:100,
    justifyContent: 'space-between',
  },
  container: {
    width: windowWidth * 0.7,

    alignSelf: 'flex-end',
  },
  text: {
    marginVertical: 10,
  },
  summaryText: {
    fontSize: 16,
    marginVertical: 10,
  },
  totalSummary: {
    fontSize: 20,
    fontWeight:'bold',
    marginVertical: 10,
  },
  summaryPrice: {
    fontSize: 18,
    marginVertical: 10,
  },
  summarySelecter: {
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 0,
  },
  summaryInput: {
    fontSize: 14,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
});
