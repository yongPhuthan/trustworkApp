import React, {createContext, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as contrains from './Constrains';
import {serviceList, selectedContract} from 'redux/Actions';

export type StateType = {
  docCounter: number;
  allData: string;
  paymentType: string;
  deposit: string;
  client_name: string;
  client_tel: string;
  client_tax: string;
  client_address: string;
  serviceList: [];
  selectedAudit: [];
  selectedContract: [];

  allTotal: number;
};

type ActionType = {
  type: string;
  payload: string | number | object;
};

type ContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

export const Store = createContext<ContextType>({
  state: {
    docCounter: 100,
    allData: 'null',
    paymentType: '444',
    deposit: 'null',
    client_name: '',
    client_tax: 'null',
    client_tel: 'null',
    client_address: 'null',
    serviceList: [],
    selectedAudit: [],
    selectedContract: [],
    allTotal: 0,
  },
  dispatch: () => {},
});

const initialState: StateType = {
  docCounter: 0,
  allData: 'null',
  paymentType: '444',
  deposit: 'null',
  client_name: '',
  client_tax: 'null',
  client_tel: 'null',
  client_address: 'null',
  serviceList: [],
  selectedAudit: [],
  selectedContract: [],
  allTotal: 0,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case contrains.ALL_DATA:
      return {...state, allData: action.payload as string};
    case contrains.DOC_COUNTER:
      return {...state, docCounter: action.payload as number};
    case contrains.PAYMENT_TYPE:
      return {...state, paymentType: action.payload as string};
    case contrains.DEPOSIT:
      return {...state, deposit: action.payload as string};
    case contrains.CLIENT_NAME:
      return {...state, client_name: action.payload as string};
    case contrains.CLIENT_TEll:
      return {...state, client_tel: action.payload as string};
    case contrains.CLIENT_ADDRESS:
      return {...state, client_address: action.payload as string};
    case contrains.CLIENT_TAX:
      return {...state, client_tax: action.payload as string};
    case contrains.ADD_SERVICES_LIST:
      return {
        ...state,
        serviceList: [...state.serviceList, action.payload] as any,
      };

    case contrains.UPDATE_SERVICE_LIST:
      return {
        ...state,
        serviceList: action.payload as any,
      };

    case contrains.SELECTED_AUDIT:
      return {
        ...state,
        selectedAudit: [...state.selectedAudit, action.payload] as any,
      };
    case contrains.REMOVE_SELECTED_AUDIT:
      return {
        ...state,
        selectedAudit: state.selectedAudit.filter(
          a => a.title !== action.payload.title,
        ) as any,
      };

    case contrains.RESET_AUDIT:
      return {...state, selectedAudit: []};
    case contrains.START_SERVICE_LIST:
      return {...state, serviceList: action.payload as any};
    case contrains.ALLTOTAL:
      return {...state, allTotal: action.payload as number};

    case contrains.SELECTED_CONTRACT:
      return {
        ...state,
        selectedAudit: [...state.selectedContract, action.payload] as any,
      };
    case contrains.REMOVE_SELECTED_CONTRACT:
      return {
        ...state,
        selectedAudit: state.selectedContract.filter(
          a => a.title !== action.payload.title,
        ) as any,
      };

    case contrains.RESET_CONTRACT:
      return {...state, selectedContract: []};

    default:
      return state;
  }
}

export function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // save state to AsyncStorage on state change
  React.useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem('state', JSON.stringify(state));
      } catch (error) {
        console.log('Error saving state:', error);
      }
    };
    saveState();
  }, [state]);

  // load state from AsyncStorage on component mount
  React.useEffect(() => {
    const loadState = async () => {
      try {
        const storedState = await AsyncStorage.getItem('state');
        if (storedState !== null) {
          dispatch({
            type: 'LOAD_STATE',
            payload: JSON.parse(storedState),
          });
        }
      } catch (error) {
        console.log('Error loading state:', error);
      }
    };
    loadState();
  }, []);

  const value: ContextType = {state, dispatch};
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
