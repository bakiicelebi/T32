import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import App from "../App"
import HomeWindow from "./Windows/HomeWindow"


const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <NativeBaseProvider>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }} >
                    <Stack.Screen name="HomeWindow" component={HomeWindow} />
                </Stack.Navigator>
            </NativeBaseProvider>
        </NavigationContainer>
    );
}

export default Router;