import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Navigation from './navigations/Navigation';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

type Props = {};

const queryClient = new QueryClient();

const App = () => {
  return (

    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
};

export default App;
