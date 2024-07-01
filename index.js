/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { name as appName } from './app.json';

import Router from './Sources';


AppRegistry.registerComponent(appName, () => Router);
