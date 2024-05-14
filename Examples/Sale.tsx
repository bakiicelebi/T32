import styles from "./SaleScreen.style";
import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, useWindowDimensions, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useFocusEffect, useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import CategoryScreen from "../CategoryScreen";
import ProductScreen from "../ProductScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
    return (
        <Stack.Navigator screenOptions={{ animation: "none" }}>
            <Stack.Group screenOptions={{ animation: "none" }}>
                <Stack.Screen name="TabSale1" component={CategoryScreen} />
                <Stack.Screen name="ProductScreenInSale1" component={ProductScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="TabSale2" component={CategoryScreen} />
                <Stack.Screen name="ProductScreenInSale2" component={CategoryScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="TabSale3" component={CategoryScreen} />
                <Stack.Screen name="ProductScreenInSale3" component={CategoryScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="TabSale4" component={CategoryScreen} />
                <Stack.Screen name="ProductScreenInSale4" component={CategoryScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="TabSale5" component={CategoryScreen} />
                <Stack.Screen name="ProductScreenInSale5" component={CategoryScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

const Views = ({ tabNumber, incTabs, decTabs }: any) => {

    const navigation = useNavigation();


    return (
        <View style={{ flex: 1, backgroundColor: "blue" }}>
            <View style={{ flex: .1 }}>
                <Base navigation={navigation} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />
            </View>
            <View style={{ backgroundColor: "green", marginTop: 80, marginLeft: 20, borderWidth: 1, padding: 10, marginBottom: 20, width: useWindowDimensions().width / 1.5, flex: 1 }}>
                <NavigationContainer independent >
                    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none", animationTypeForReplace: "push" }}>
                        <Stack.Screen name="CategoryScreenInSaleScreen" component={CategoryScreen} />
                        <Stack.Screen component={ProductScreen} name="ProductScreenInSale1" />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
            <View style={{ flex: .15 }} >
                <Text>AAAAAAAAAAAAA</Text>
            </View>
        </View>
    )
}

const useSortSales = (initialState) => {
    const [sales, setSales] = useState(initialState);

    useEffect(() => {
        sortSales();
    }, []);

    const sortSales = () => {
        const sortedSales = {};
        const trueKeys = [];
        const falseKeys = [];

        // True olanları başa, false olanları sona ayırma
        Object.entries(sales).forEach(([key, value]) => {
            if (value) {
                trueKeys.push(key);
            } else {
                falseKeys.push(key);
            }
        });

        // True olanları önce, false olanları sonra ekleme
        trueKeys.forEach((key) => {
            sortedSales[key] = true;
        });
        falseKeys.forEach((key) => {
            sortedSales[key] = false;
        });

        setSales(sortedSales);
    };

    return sales;
};

const Screens = () => {

        // Tab eklendiğinde çalışmayan stacklerden biri açılsın keyli değil
        //  Açılan stackleri sırayla alıp bir dizide tut ve butonları onlara göre karar ver


    const [sales, setSales] = useState([
        { key: 1, value: true },
        { key: 2, value: true },
        { key: 3, value: true },
        { key: 4, value: false },
        { key: 5, value: false }
    ]);

    // Function to sort the sales array with false values at the end
    // function sortSales() {
    //     sales.sort((a, b) => {
    //         // Handle cases where values are the same (both true or both false)
    //         if (a.value === b.value) {
    //             return 0;
    //         }

    //         // Sort true values before false values
    //         return a.value ? -1 : 1;
    //     });
    // }

    function sortSales(sales) {
        return sales.sort((a, b) => {
          // prioritize sorting by value (true last)
          if (a.value !== b.value) {
            return a.value ? -1 : 1;  // true values come after false values
          }
          // if values are the same, sort by key
          return a.key - b.key;
        });
      }

     sortSales(sales);

     console.log(sales);

    // useEffect(() => {
    //     sortSales();
    //     console.log(sales)
    // }, [sales])
    // useEffect(() => {
    //     sortSales();
    //     console.log(sales);
    // }, [])



    // // sales dizisini sırala
    // sortSales();
    // console.log("İlk sıralama:", sales);

    // // Örnek bir değişiklik yapalım
    // sales[2].value = false; // 2. elemanın değerini false olarak değiştirdik

    // // Değişiklik yaptıktan sonra tekrar sırala
    // sortSales();
    // console.log("Yeniden sıralama:", sales);

    // sales[2].value = true; // 2. elemanın değerini false olarak değiştirdik

    // // Değişiklik yaptıktan sonra tekrar sırala
    // sortSales();
    // console.log("Yeniden sıralama:", sales);

    const [tabNumber, setTabNumber] = useState(1);
    const incTabs = () => {
        setTabNumber(tabNumber + 1);
        setSales(prevSales => ({ ...prevSales, 2: true }));
    }
    const decTabs = (decTab: any) => {
        setTabNumber(tabNumber - 1);
        setSales(prevSales => ({ ...prevSales, [decTab]: false }));

    };

    const isSaleOpen = (number: 1 | 2 | 3 | 4 | 5): boolean => {
        return sales[number];
    };

    return (

        <Tab.Navigator screenOptions={{ headerShown: true, freezeOnBlur: false }}>
            {isSaleOpen(1) && <Tab.Screen name="Sale1" >
                {() => (<Views tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
            {isSaleOpen(2) && <Tab.Screen name="Sale2" >
                {() => (<Views tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
            {isSaleOpen(3) && <Tab.Screen name="Sale3" >
                {() => (<Views tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
            {isSaleOpen(4) && <Tab.Screen name="Sale4" >
                {() => (<Views tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
            {isSaleOpen(5) && <Tab.Screen name="Sale5" >
                {() => (<Views tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
        </Tab.Navigator>

    )
}

const Base = ({ navigation, tabNumber, incTabs, decTabs }: any) => {



    return (
        <View style={{ flex: 1, alignItems: "center", flexDirection: "row", left: 20, top: 20, backgroundColor: "yellow", }}>
            <Pressable onPress={() => navigation.navigate("Sale1")}>
                <View style={{ backgroundColor: "green", flexDirection: "row", alignItems: "center", marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 20 }}>Sale 1</Text>
                    <Pressable onPress={() => decTabs(1)}>
                        <Text style={{ fontSize: 20, paddingLeft: 15 }}>X</Text>
                    </Pressable>
                </View>
            </Pressable >
            {tabNumber >= 2 && <Pressable onPress={() => navigation.navigate("Sale2")}>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 20 }}>Sale 2</Text>
                    <Pressable onPress={() => decTabs(2)}>
                        <Text style={{ fontSize: 20, paddingLeft: 15 }}>X</Text>
                    </Pressable>
                </View>
            </Pressable>}
            {tabNumber >= 3 && <Pressable onPress={() => navigation.navigate("Sale3")}>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 20 }}>Sale 3</Text>
                    <Pressable onPress={() => decTabs(3)}>
                        <Text style={{ fontSize: 20, paddingLeft: 15 }}>X</Text>
                    </Pressable>
                </View>
            </Pressable>}
            {tabNumber >= 4 && <Pressable onPress={() => navigation.navigate("Sale4")}>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 20 }}>Sale 4</Text>
                    <Pressable onPress={() => decTabs(4)}>
                        <Text style={{ fontSize: 20, paddingLeft: 15 }}>X</Text>
                    </Pressable>
                </View>
            </Pressable>}
            {tabNumber >= 5 && <Pressable onPress={() => navigation.navigate("Sale5")}>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 20 }}>Sale 5</Text>
                    <Pressable onPress={() => decTabs(5)}>
                        <Text style={{ fontSize: 20, paddingLeft: 15 }}>X</Text>
                    </Pressable>
                </View>
            </Pressable>}
            {tabNumber < 5 && <Pressable onPress={incTabs}>
                <Text style={{ marginHorizontal: 10, fontSize: 20 }}>+</Text>
            </Pressable>}
        </View>
    )
}

export default Screens;
