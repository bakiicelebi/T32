/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { name as appName } from './app.json';


import App from './App';
import Router from './Sources/Router';




//AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => Router);
