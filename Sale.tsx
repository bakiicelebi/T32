import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import CategoryScreen from "../CategoryScreen";
import ProductScreen from "../ProductScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const SaleScreen = () => {
    const [sales, setSales] = useState({
        1: true,
        2: false,
        3: false,
        4: false,
        5: false
    });

    const [tabNumber, setTabNumber] = useState(1);

    const isSaleOpen = (number) => {
        return sales[number];
    };

    const closeTab = (closedTab) => {
        const updatedSales = { ...sales };
        updatedSales[closedTab] = false;
        setSales(updatedSales);
        setTabNumber(tabNumber - 1);
    };

    const incTabs = () => {
        const closedTabs = Object.keys(sales).filter(key => !sales[key]);
        if (closedTabs.length > 0) {
            const nextTab = closedTabs[0];
            const updatedSales = { ...sales };
            updatedSales[nextTab] = true;
            setSales(updatedSales);
            setTabNumber(parseInt(nextTab));
        }
    };
    

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: "blue" }}>
            <Tab.Navigator screenOptions={{ headerShown: true, freezeOnBlur: false }}>
                {Object.keys(sales).map((key) => (
                    isSaleOpen(key) && (
                        <Tab.Screen key={key} name={`Sale${key}`}>
                            {() => (
                                <SaleView
                                    tabNumber={tabNumber}
                                    setTabNumber={setTabNumber}
                                    sales={sales}
                                    setSales={setSales}
                                    incTabs={incTabs}
                                    closeTab={closeTab}
                                    saleNumber={parseInt(key)}
                                    navigation={navigation}
                                />
                            )}
                        </Tab.Screen>
                    )
                ))}
            </Tab.Navigator>
        </View>
    );
};

const SaleView = ({ tabNumber, setTabNumber, sales, setSales, incTabs, closeTab, saleNumber, navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <SaleTabs
                tabNumber={tabNumber}
                setTabNumber={setTabNumber}
                sales={sales}
                setSales={setSales}
                incTabs={incTabs}
                closeTab={closeTab}
                navigation={navigation}
            />
            <CategoryScreen />
        </View>
    );
};

const SaleTabs = ({ tabNumber, setTabNumber, sales, setSales, incTabs, closeTab, navigation }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "yellow" }}>
            {Object.keys(sales).map((key) => (
                sales[key] && (
                    <Pressable key={key} onPress={() => navigation.navigate(`Sale${key}`)}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10 }}>
                            <Text style={{ fontSize: 20 }}>Sale {key}</Text>
                            {tabNumber > 1 && (
                                <Pressable onPress={() => closeTab(parseInt(key))}>
                                    <Text style={{ fontSize: 20, paddingLeft: 15 }}>X</Text>
                                </Pressable>
                            )}
                        </View>
                    </Pressable>
                )
            ))}
            {tabNumber < 5 && (
                <Pressable onPress={incTabs}>
                    <Text style={{ marginHorizontal: 10, fontSize: 20 }}>+</Text>
                </Pressable>
            )}
        </View>
    );
};

export default SaleScreen;
