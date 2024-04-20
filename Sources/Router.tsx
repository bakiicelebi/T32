import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeWindow from "./Windows/HomeWindow"

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name="HomeWindow" component={HomeWindow} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;