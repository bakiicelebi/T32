/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { name as appName } from './app.json';

<<<<<<< HEAD

=======
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
import App from './App';
import Router from './Sources/Router';




//AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => Router);
