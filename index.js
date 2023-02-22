/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './redux/Store';
import {StoreProvider} from './redux/Store';
import 'react-native-get-random-values'

const Root = () => (
  <StoreProvider>
    <App />
  </StoreProvider>
);
AppRegistry.registerComponent(appName, () => Root);
