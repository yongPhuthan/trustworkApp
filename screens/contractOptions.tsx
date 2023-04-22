import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import DatePickerButton from '../components/styles/DatePicker';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, ParamListBase} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<ParamListBase, 'ContractOption'>;
  route: RouteProp<ParamListBase, 'ContractOption'>;
};

const thaiDateFormatter = new Intl.DateTimeFormat('th-TH', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const ContractOption = ({navigation}: Props) => {
  const [projectName, setProjectName] = useState('');
  const [signAddress, setSignAddress] = useState('preview');
  const route = useRoute();
  const {data}: any = route?.params;
  const [warantyTimeWork, setWarantyTimeWork] = useState('');
  const [workingDays, setWorkingDays] = useState('');
  const [workCheckEnd, setWorkCheckEnd] = useState('');
  const [workCheckDay, setWorkCheckDay] = useState('');
  const [installingDay, setInstallingDay] = useState('');

  const [workAfterGetDeposit, setWorkAfterGetDeposit] = useState('');
  const [prepareDay, setPrepareDay] = useState('');
  const [finishedDay, setFinishedDay] = useState('');
  const [adjustPerDay, setAdjustPerDay] = useState('');
  const [showSecondPage, setShowSecondPage] = useState(false);
  const [servayDate, setServayDate] = useState<String>('preview');

  const handleSubmit = () => {
    const apiData = {
      projectName,
      signAddress,
      warantyYear: warantyTimeWork,
      workingDays,
      workAfterGetDeposit,
       prepareDay,
      finishedDay,
       adjustPerDay,
      servayDate,
      workCheckDay,
      workCheckEnd,
      installingDay,
    };
    console.log({
      projectName,
      signAddress,
      warantyYear: warantyTimeWork,
      workingDays,
      workAfterGetDeposit,
      servayDate,
   prepareDay,
     finishedDay,
     adjustPerDay,
    });
    navigation.navigate('SelectContract', {
      updatedData: data,
      contract: apiData,
    });
  };
  const handleStartDateSelected = (date: Date) => {
    const formattedDate = thaiDateFormatter.format(date);
    setServayDate(formattedDate);
    console.log(servayDate);
  };

  const handleShowSecondPage = () => {
    setShowSecondPage(true);
  };

  const handleHideSecondPage = () => {
    setShowSecondPage(false);
  };
  console.log('updatedData', JSON.stringify(data));

  return (
    <SafeAreaView style={styles.container}>
      {!showSecondPage ? (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={projectName}
            onChangeText={setProjectName}
            placeholder="Project Name"
            placeholderTextColor="#A6A6A6"
          />
          {/* <DatePickerButton
            label="ดูหน้างานเมื่อวันที่"
            date="today"
            onDateSelected={handleStartDateSelected}
          /> */}

          {/* <TextInput
            style={styles.input}
            value={signAddress}
            onChangeText={setSignAddress}
            placeholder="Address"
            placeholderTextColor="#A6A6A6"
          /> */}
          <TextInput
            style={styles.input}
            value={warantyTimeWork}
            onChangeText={setWarantyTimeWork}
            placeholder="Warranty Year"
            placeholderTextColor="#A6A6A6"
            keyboardType="numeric"
          />
   
          <TextInput
            style={styles.input}
            value={workingDays}
            onChangeText={setWorkingDays}
            placeholder="Working Days"
            placeholderTextColor="#A6A6A6"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={installingDay}
            onChangeText={setInstallingDay}
            placeholder="installingDay"
            placeholderTextColor="#A6A6A6"
            keyboardType="numeric"
          />
          <Button title="Next" onPress={handleShowSecondPage} color="#007AFF" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={workAfterGetDeposit}
              onChangeText={setWorkAfterGetDeposit}
              placeholder="workAfterGetDeposit"
              placeholderTextColor="#A6A6A6"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={prepareDay}
              onChangeText={setPrepareDay}
              placeholder="Prepare Days"
              placeholderTextColor="#A6A6A6"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={finishedDay}
              onChangeText={setFinishedDay}
              placeholder="Finished Days"
              placeholderTextColor="#A6A6A6"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={workCheckDay}
              onChangeText={setWorkCheckDay}
              placeholder="workCheckDay"
              placeholderTextColor="#A6A6A6"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={workCheckEnd}
              onChangeText={setWorkCheckEnd}
              placeholder="workCheckEnd"
              placeholderTextColor="#A6A6A6"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={adjustPerDay}
              onChangeText={setAdjustPerDay}
              placeholder="Adjust Per Days"
              placeholderTextColor="#A6A6A6"
              keyboardType="numeric"
            />
            <Button
              title="Previous"
              onPress={handleHideSecondPage}
              color="#007AFF"
            />
          </View>
        </ScrollView>
      )}
      <Button title="Submit" onPress={handleSubmit} color="#FFFFFF  " />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  scrollView: {
    flexGrow: 1,
  },
  form: {
    marginBottom: 16,
    padding: 16,
    marginTop: 100,
  },
  input: {
    height: 50,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000000',
  },
  dateInput: {
    height: 50,
    fontSize: 16,
    borderRadius: 10,

    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000000',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
  },
});

export default ContractOption;
