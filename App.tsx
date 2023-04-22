import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Navigation from './navigations/Navigation';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import { Provider } from 'react-native-paper';

type Props = {};

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider>
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
    </Provider>
  );
};

export default App;
