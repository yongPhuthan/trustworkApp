import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Divider from '../components/styles/Divider';
import {useForm, Controller} from 'react-hook-form';
import {Store} from '../redux/Store';
import * as stateAction from '../redux/Actions';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {v4 as uuidv4} from 'uuid';

const windowWidth = Dimensions.get('window').width;
type FormData = {
  title: string;
  description: string;
  unitPrice: string;
  qty: string;
  unit: string;
  id: string;
  discountPercent: string;
  total: string;
};
type ServiceList = {
  id: string;
  title: string;
  description: string;
  unitPrice: number;
  qty: number;
  discountPercent: number;
  total: number;
};

type RootStackParamList = {
  Quotation: undefined;
  เพิ่มลูกค้า: undefined;
  เพิ่มรายการ: undefined;
  // Profile: { userId: string };
};
type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Quotation'
>;
type Props = {
  navigation: HomeScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Quotation'>;
};

const AddProductForm = ({navigation}: Props) => {
  const {control, handleSubmit} = useForm<FormData>();
  const [qty, setQuantity] = useState(0);
  const [count, setCount] = useState(0);
  const [unitPrice, setPrice] = useState(0);
  const [total, setTotalCost] = useState(0);
  const [serviceListState, setServiceList] = useState<ServiceList[]>([]);

  const {
    state: {serviceList},
    dispatch,
  }: any = useContext(Store);

  const handleFormSubmit = (data: FormData) => {
   
    const newServiceItem = {
      id: uuidv4(), // generate a unique ID for the new item
      title: data.title,
      description: data.description,
      unitPrice: data.unitPrice,
      qty: data.qty,
      discountPercent: data.discountPercent,
      total: (qty * unitPrice).toString(),
    };
    dispatch(stateAction.service_list(newServiceItem as any))
    console.log('serviceList'+ JSON.stringify(serviceList));

    navigation.goBack();
  };

  useEffect(() => {
    // Calculate the total cost based on the quantity and price values
    setTotalCost(qty * unitPrice);
  }, [qty, unitPrice]);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Controller
          control={control}
          name="title"
          defaultValue=""
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="ชื่อสินค้า-บริการ.."
              style={styles.inputName}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="รายละเอียด..."
              keyboardType="name-phone-pad"
              multiline
              textAlignVertical="top"
              numberOfLines={4}
              style={styles.inputAddress}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <View style={styles.summary}>
          <Text style={styles.price}>ราคา:</Text>
          <Controller
            control={control}
            name="unitPrice"
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.price}
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={value => {
                  onChange(value);
                  setPrice(parseInt(value, 10));
                }}
                value={value}
              />
            )}
          />
        </View>
        <View style={styles.summary}>
          <Text style={styles.price}>จำนวน:</Text>

          {/* START COUNTER BUTTON */}
          <View style={styles.containerCounter}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (count > 0) {
                  setCount(count - 1);
                  setQuantity(qty - 1);
                }
              }}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Controller
              control={control}
              name="qty"
              defaultValue=""
              render={({field: {onChange, value}}) => (
                <TextInput
                  style={styles.counter}
                  placeholder="0"
                  keyboardType="number-pad"
                  onChangeText={value => {
                    onChange(value);
                    setQuantity(parseInt(value, 10));
                  }}
                  value={qty.toString()}
                />
              )}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setCount(count + 1);
                setQuantity(qty + 1);
              }}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* END COUNTER BUTTON */}
        </View>
        <View style={styles.summary}>
          <Text style={styles.price}>หน่วย:</Text>
          <Controller
            control={control}
            name="unit"
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.price}
                placeholder="ชุด"
                keyboardType="number-pad"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View style={styles.summary}>
          <Text style={styles.price}>ส่วนลด(%):</Text>
          <Controller
            control={control}
            name="discountPercent"
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.price}
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <Divider />
        <View style={styles.summary}>
          <Text style={styles.price}>รวมเป็นเงิน:</Text>
          <Controller
            control={control}
            name="total"
            defaultValue=""
            render={({field: {value}}) => (
              <TextInput
                style={styles.priceSummary}
                placeholder="0"
                keyboardType="number-pad"
                value={(qty * unitPrice).toString()}
                editable={false}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={handleSubmit(handleFormSubmit)}>
          <Text style={styles.label}>บันทึก</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AddProductForm;

const styles = StyleSheet.create({
  container: {},
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

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 40,
    backgroundColor: '#0073BA',
  },

  inputName: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    fontSize: 16,
    height: 40,
  },
  inputAddress: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    fontSize: 16,
    height: 100,
  },
  label: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',

    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    fontSize: 16,
    height: 40,
  },
  prefix: {
    paddingHorizontal: 5,
    paddingVertical: 5,

    fontWeight: 'bold',
    color: 'black',
  },
  containerPrice: {
    alignSelf: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        paddingVertical: 10,
     
      },
      android: {
        paddingVertical: 0,
       
      },
    }),
  },
  priceSummary: {
    fontSize: 18,
    marginTop: -10,
    color: 'black',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: 'black',
  },
  counter: {
    fontSize: 18,
    paddingHorizontal: 20,
  },
  containerCounter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e9f4f9',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  count: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
