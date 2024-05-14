import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import App from "../App"
import HomeWindow from "./Windows/HomeScreen"
import SaleScreen from "./Windows/SaleScreen";
import LogInScreen from "./Windows/LogInScreen/LogInScreen"
import ProductScreen from "./Windows/ProductScreen";
import CategoryScreen from "./Windows/CategoryScreen";
import { PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <PaperProvider>
            <NavigationContainer>
                <NativeBaseProvider>
                    <Stack.Navigator screenOptions={{
                        headerShown: false
                    }} >
                        {/* <Stack.Screen name="LogInScreen" component={LogInScreen} /> */}
                        <Stack.Screen name="SaleScreen" component={SaleScreen} />
                        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
                        <Stack.Screen name="ProductScreen" component={ProductScreen} />
                        <Stack.Screen name="HomeWindow" component={HomeWindow} />

                    </Stack.Navigator>
                </NativeBaseProvider>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default Router;