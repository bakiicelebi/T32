import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorMode, extendTheme, NativeBaseProvider, StorageManager, useColorMode } from "native-base";
import HomeScreen from "./Screens/HomeScreen"
import SaleScreen from "./Screens/SaleScreen";
import LogInScreen from "./Screens/LogInScreen/LogInScreen"
import ProductScreen from "./Screens/ProductScreen";
import CategoryScreen from "./Screens/CategoryScreen";
import { PaperProvider } from 'react-native-paper';
import PaymentScreen from "./Screens/PaymentScreen";
import { SaleProvider } from "./context/SaleContext";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import { MarketProvider } from "./context/MarketContext";
import SettingsScreen from "./Screens/SettingsScreen";
import ReportsScreen from "./Screens/ReportsScreen";
import AllProductsScreen from "./Screens/AllProductsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import "./context/Translate/i18n";

const Stack = createNativeStackNavigator();

const Router = () => {

  const [isInHome, setIsInHome] = useState(true)

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('Language');
        if (storedLanguage) {
          i18next.changeLanguage(storedLanguage);
          console.log("Started with" + storedLanguage)
        }
      } catch (e) {
        console.log(e)
      }
    }
    loadLanguage()
  }, [])


  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem('color_mode');
        return val === 'dark' ? 'dark' : 'light';
      } catch (e) {
        return 'light';
      }
    },
    set: async (value: ColorMode) => {
      try {
        //@ts-ignore
        await AsyncStorage.setItem('color_mode', value);
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <DataProvider>
      <MarketProvider>
        <CartProvider>
          <SaleProvider>
            <NavigationContainer>
              <NativeBaseProvider colorModeManager={colorModeManager}>
                <Stack.Navigator screenOptions={{
                  headerShown: false
                }} >
                  {/* <Stack.Screen name="LogInScreen" component={LogInScreen} /> */}
                  <Stack.Screen name="HomeScreen" component={HomeScreen} />
                  <Stack.Screen name="SaleScreen" component={SaleScreen} />
                  <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                  <Stack.Screen initialParams={{ isInHome: isInHome }} name="CategoryScreen" component={CategoryScreen} />
                  <Stack.Screen initialParams={{ isInHome: isInHome }} name="AllProductsScreen" component={AllProductsScreen} />
                  <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
                  <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
                  <Stack.Screen initialParams={{ isInHome: isInHome }} name="ProductScreen" component={ProductScreen} />
                </Stack.Navigator>
              </NativeBaseProvider>
            </NavigationContainer>
          </SaleProvider>
        </CartProvider>
      </MarketProvider>
    </DataProvider>
  );
}

export default Router;