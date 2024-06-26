import styles from "./SaleScreen.style";
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useFocusEffect, useNavigation, useNavigationState, useRoute, } from '@react-navigation/native';
import CategoryScreen from "../CategoryScreen";
import ProductScreen from "../ProductScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, Box, Center, Icon, HStack, NativeBaseProvider, Heading, VStack, Button, Pressable } from 'native-base';
import Cart from "../../Components/Sale/Cart/Cart"
import SaleTabs from "../../Components/Sale/SaleTabs";

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

const Views = ({ tabNumber, incTabs, decTabs, openTabs, setSelectedSale, selectedSale }: any) => {

    const navigation = useNavigation();


    return (
        <Box style={{ flex: 1, backgroundColor: "blue" }}>
            <VStack flex={1}>
                <Box style={{ flex: .1 }}>
                    <Base selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} navigation={navigation} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />
                </Box>
                <Box flex={1}>
                    <HStack flex={1}>
                        <VStack flex={1}>
                            <Box flex={1}>
                                <Box borderWidth={5} mt={50} ml={5} marginTop={50} flex={1} bg={"yellow.400"}>
                                    <NavigationContainer independent >
                                        <Stack.Navigator screenOptions={{ headerShown: false, animation: "none", animationTypeForReplace: "push" }}>
                                            <Stack.Screen name="CategoryScreenInSaleScreen" component={CategoryScreen} />
                                            <Stack.Screen component={ProductScreen} name="ProductScreenInSale1" />
                                        </Stack.Navigator>
                                    </NavigationContainer>
                                </Box>
                                <Box ml={5} flex={.2} flexDirection={"row"} bg="red.300" alignItems={"center"}  >
                                    <HStack justifyContent={"space-evenly"} flex={1} space={2}>
                                        <Button >
                                            <Text fontSize={"xl"}>Button 1</Text>
                                        </Button>
                                        <Button>
                                            <Text fontSize={"xl"}>Button 2</Text>
                                        </Button>
                                    </HStack>
                                </Box>
                            </Box>
                        </VStack>
                        <VStack flex={.5}>
                            <Box mt={50} flex={1} padding={2}>
                                <Cart />
                            </Box>
                        </VStack>
                    </HStack>
                </Box>
            </VStack >
        </Box >
    )
}


const Screens = () => {

    const [openTabs, setOpenTabs] = useState([1]);
    const [selectedSale, setSelectedSale] = useState(1);

    const addNumberToUniqueArray = () => {
        for (let i = 1; i <= 5; i++) {
            if (!openTabs.includes(i)) {
                openTabs.push(i);
                break;
            }
        }
        return openTabs;
    };

    const removeElementFromArray = (desiredNumber: any) => {
        for (let i = 0; i < openTabs.length; i++) {
            if (openTabs[i] === desiredNumber) {
                openTabs.splice(i, 1);
                break;
            }
        }
        return openTabs;
    };

    const [tabNumber, setTabNumber] = useState(1);

    const incTabs = () => {
        addNumberToUniqueArray();
        setTabNumber(tabNumber + 1);
    };

    const decTabs = (decTab: any) => {
        setSelectedSale(1);
        removeElementFromArray(decTab);
        setTabNumber(tabNumber - 1);

    };

    const isThere = (tabNo: number) => {
        return openTabs.includes(tabNo);
    };

    return (

        <Tab.Navigator screenOptions={{ headerShown: true, freezeOnBlur: false, tabBarStyle: { height: 0 } }}>
            {isThere(1) && <Tab.Screen name="Sale1" >
                {() => (<Views selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
            {isThere(2) && <Tab.Screen name="Sale2" >
                {() => (<Views selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
            {isThere(3) && <Tab.Screen name="Sale3" >
                {() => (<Views selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
            {isThere(4) && <Tab.Screen name="Sale4" >
                {() => (<Views selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
            {isThere(5) && <Tab.Screen name="Sale5" >
                {() => (<Views selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
        </Tab.Navigator>
    )
}

const Base = ({ navigation, tabNumber, incTabs, decTabs, openTabs, setSelectedSale, selectedSale }: any) => {

    const isSelectedSaleTab = (index: any) => {
        return index === selectedSale;
    }
    console.log(isSelectedSaleTab(1))


    return (

        <View style={{ flex: 1, alignItems: "center", flexDirection: "row", left: 20, top: 20, backgroundColor: "yellow", }}>

            <SaleTabs tabNumber={tabNumber} no={1} nav={navigation} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />
            {tabNumber >= 2 && <SaleTabs tabNumber={tabNumber} no={2} nav={navigation} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />}
            {tabNumber >= 3 && <SaleTabs tabNumber={tabNumber} no={3} nav={navigation} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />}
            {tabNumber >= 4 && <SaleTabs tabNumber={tabNumber} no={4} nav={navigation} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />}
            {tabNumber >= 5 && <SaleTabs tabNumber={tabNumber} no={5} nav={navigation} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />}
            {tabNumber < 5 && <Pressable onPress={incTabs}>
                <Text style={{ marginHorizontal: 10, fontSize: 20 }}>+</Text>
            </Pressable>}
            {/* <Pressable onPress={() => { setSelectedSale(1); console.log(selectedSale); navigation.navigate(`Sale${openTabs[0]}`) }}>
                <View style={{ backgroundColor: isSelectedSaleTab(1) ? "green" : "yellow", flexDirection: "row", alignItems: "center", marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 20 }}>Sale 1</Text>
                    <Pressable onPress={() => decTabs(openTabs[0])}>
                        <Text style={{ fontSize: 20, paddingLeft: 15 }}>X</Text>
                    </Pressable>
                </View>
            </Pressable >
            { <Pressable onPress={() => { setSelectedSale(2); navigation.navigate(`Sale${openTabs[1]}`); setSelectedSale(2); }}>
                <View style={{ backgroundColor: isSelectedSaleTab(2) ? "green" : "yellow", flexDirection: "row", alignItems: "center", marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 20 }}>Sale 2</Text>
                    <Pressable onPress={() => decTabs(openTabs[1])}>
                        <Text style={{ fontSize: 20, paddingLeft: 15 }}>X</Text>
                    </Pressable>
                </View>
            </Pressable>}
            {tabNumber >= 3 && <Pressable onPress={() => { setSelectedSale(3); navigation.navigate(`Sale${openTabs[2]}`) }}>
                <View style={{ backgroundColor: isSelectedSaleTab(3) ? "green" : "yellow", flexDirection: "row", alignItems: "center", marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 20 }}>Sale 3</Text>
                    <Pressable onPress={() => decTabs(openTabs[2])}>
                        <Text style={{ fontSize: 20, paddingLeft: 15 }}>X</Text>
                    </Pressable>
                </View>
            </Pressable>}
            {tabNumber >= 4 && <Pressable onPress={() => { setSelectedSale(4); navigation.navigate(`Sale${openTabs[3]}`) }}>
                <View style={{ backgroundColor: isSelectedSaleTab(4) ? "green" : "yellow", flexDirection: "row", alignItems: "center", marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 20 }}>Sale 4</Text>
                    <Pressable onPress={() => decTabs(openTabs[3])}>
                        <Text style={{ fontSize: 20, paddingLeft: 15 }}>X</Text>
                    </Pressable>
                </View>
            </Pressable>}
            {tabNumber >= 5 && <Pressable onPress={() => { setSelectedSale(5); navigation.navigate(`Sale${openTabs[4]}`) }}>
                <View style={{ backgroundColor: isSelectedSaleTab(5) ? "green" : "yellow", flexDirection: "row", alignItems: "center", marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 20 }}>Sale 5</Text>
                    <Pressable onPress={() => decTabs(openTabs[4])}>
                        <Text style={{ fontSize: 20, paddingLeft: 15 }}>X</Text>
                    </Pressable>
                </View>
            </Pressable>}*/}

        </View>
    )
}

export default Screens;
