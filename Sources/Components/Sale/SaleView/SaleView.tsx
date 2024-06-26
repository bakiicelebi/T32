<<<<<<< HEAD
import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import CategoryScreen from "../../../Screens/CategoryScreen";
import ProductScreen from "../../../Screens/ProductScreen";
import { Box, HStack, VStack, Button, useDisclose, useColorMode, Text } from 'native-base';
import Cart from "../Cart"
import SaleTabBar from "../SaleTabBar";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import BarcodeInput from '../BarcodeInput';
import Campaigns from '../Campaigns';
import BarcodeScreen from '../BarcodeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AllProductsScreen from '../../../Screens/AllProductsScreen';
import { useSaleContext } from '../../../context/SaleContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const CategoryStack = () => {

    const {t,i18n}= useTranslation()
    const { colorMode } = useColorMode()


    return (<NavigationContainer independent>
        <Stack.Navigator>
            <Stack.Screen initialParams={{ isInHome: false }} options={{ presentation: "modal", headerShown: false, animationTypeForReplace: "push" }} name='CategoryScreen' component={CategoryScreen} />
            <Stack.Screen options={{ headerStyle: { backgroundColor: colorMode === "dark" ? "#1e1f21" : "#ffffff" }, headerTintColor: colorMode === "dark" ? "white" : "black", headerShown: true, animationEnabled: false ,headerTitle:t('Categories') }} name='ProductScreen' component={ProductScreen} />
        </Stack.Navigator>
    </NavigationContainer>)
}

const SaleView = () => {

    const { selectedSale, setSelectedSale, openTabs, tabNumber, incTabs, decTabs } = useSaleContext();
    const [isScannerOpen, setIsScannerOpen] = useState(false)
    const [forPrice, setForPrice] = useState(false)
    const [isInHome, setIsInHome] = useState(false)
    const { t, i18n } = useTranslation();

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const { colorMode } = useColorMode()


    const navigation = useNavigation();

    const handleInputClick = () => {
        console.log("camera clicked")
        setForPrice(false)
        //@ts-ignore
        // navigation.navigate("BarcodeScreen")
        setIsScannerOpen(true);
    }

    const handlePriceClick = () => {
        console.log("see the price clicked")
        setForPrice(true)
        //@ts-ignore
        //navigation.navigate("BarcodeScreen", { forPrice: true })
        setIsScannerOpen(true);
    }

    return (
        // <DismissKeyboard >
        <Box _dark={{
            bg: "#141615"
        }} _light={{
            bg: "#eff3f6"
        }} flex={1}  >
            {isScannerOpen && <BarcodeScreen forPrice={forPrice} setIsOpen={setIsScannerOpen} />}
            <VStack flex={1}>
                <HStack style={{ flex: .1 }}>
                    <Box flex={1}>
                        <SaleTabBar selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} nav={navigation} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />
                    </Box>
                    <Box flex={.5}>
                        <BarcodeInput handleInputClick={handleInputClick} />
                    </Box>
                </HStack>
=======
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import CategoryScreen from "../../../Windows/CategoryScreen";
import ProductScreen from "../../../Windows/ProductScreen";
import { Text, Box, HStack, VStack, Button } from 'native-base';
import Cart from "../Cart"
import SaleTabBar from "../SaleTabBar";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

const Tab = createMaterialBottomTabNavigator();



//const Stack = createNativeStackNavigator();

const SaleView = ({ tabNumber, incTabs, decTabs, openTabs, setSelectedSale, selectedSale }: any) => {

    const navigation = useNavigation();

    return (
        <Box style={{ flex: 1, backgroundColor: "blue" }}>
            <VStack flex={1}>
                <Box style={{ flex: .1 }}>
                    <SaleTabBar selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} nav={navigation} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />
                </Box>
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
                <Box flex={1}>
                    <HStack flex={1}>
                        <VStack flex={1}>
                            <Box flex={1}>
<<<<<<< HEAD
                                <Box borderWidth={1} borderColor={"#515557"} shadow={"6"} ml={4} mt={15} flex={1} >
                                    <NavigationContainer independent >
                                        <Tab.Navigator
                                            screenOptions={({ route }) => ({
                                                headerShown: false,
                                                tabBarStyle: { backgroundColor: colorMode === "dark" ? "#1e1f21" : "#ffffff" },
                                                tabBarIcon: ({ size }) => {
                                                    let iconName: any;
                                                    if (route.name === 'Categories') {
                                                        iconName = 'grid';
                                                    } else if (route.name === 'All Products') {
                                                        iconName = 'format-list-bulleted';
                                                    }
                                                    return <Icon name={iconName} size={size} color={colorMode === "dark" ? "#7f8183" : "black"} />;
                                                },
                                                tabBarLabel: ({ focused }) => {
                                                    let label: any;
                                                    if (route.name === 'Categories') {
                                                        label = 'Categories';
                                                    } else if (route.name === 'All Products') {
                                                        label = 'All Products';
                                                    }
                                                    return <Text fontSize={focused ? "lg" : "md"} color={focused ? "yellow.500" : "gray.500"}>     {t(label)}</Text>;
                                                },
                                                
                                            })}>
                                            <Tab.Screen initialParams={{ isInHome: isInHome }} name="Categories" component={CategoryStack} />
                                            <Tab.Screen initialParams={{ isInHome: isInHome }} name="All Products" component={AllProductsScreen} />
                                        </Tab.Navigator>
                                    </NavigationContainer>
                                </Box>
                                <Box mb={1} ml={4} flex={.15} flexDirection={"row"} alignItems={"center"}   >
                                    <HStack space={4} justifyContent={"space-evenly"} flex={1} >
                                        <Button _pressed={{ _text: { fontSize: "md" } }} shadow={"4"} ml={3} _dark={{ bg: "blueGray.800" }} _light={{ bg: "blueGray.400" }} _text={{ _dark: { color: "white" }, _light: { color: "black" }, fontSize: "lg" }} flex={1} onPress={handlePriceClick}>
                                            {t('see price')}
                                        </Button>
                                        <Button _pressed={{ _text: { fontSize: "md" } }} shadow={"4"} mr={3} _dark={{ bg: "blueGray.800" }} _light={{ bg: "blueGray.400" }} _text={{ _dark: { color: "white" }, _light: { color: "black" }, fontSize: "lg" }} flex={1} onPress={onOpen}>
                                            {t('campaigns')}
=======
                                <Box borderWidth={5} mt={50} ml={5} marginTop={50} flex={1} bg={"yellow.400"}>
                                    <NavigationContainer independent >
                                        <Tab.Navigator >
                                            <Tab.Screen name="CategoryScreen" component={CategoryScreen} />
                                            <Tab.Screen component={ProductScreen} name="ProductScreen" />
                                            <Tab.Screen name="FavoritesScreen" component={CategoryScreen} />
                                            <Tab.Screen component={ProductScreen} name="SearchScreen" />
                                        </Tab.Navigator>
                                    </NavigationContainer>
                                </Box>
                                <Box ml={5} flex={.2} flexDirection={"row"} bg="red.300" alignItems={"center"}  >
                                    <HStack justifyContent={"space-evenly"} flex={1} space={2}>
                                        <Button >
                                            <Text fontSize={"xl"}>Button 1 DDDDDD</Text>
                                        </Button>
                                        <Button>
                                            <Text fontSize={"xl"}>Button 2 FFFFFF</Text>
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
                                        </Button>
                                    </HStack>
                                </Box>
                            </Box>
                        </VStack>
                        <VStack flex={.5}>
<<<<<<< HEAD
                            <Box mt={15} flex={1} m={2}  >
=======
                            <Box mt={50} flex={1} padding={2}>
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
                                <Cart />
                            </Box>
                        </VStack>
                    </HStack>
                </Box>
            </VStack >
<<<<<<< HEAD
            <Campaigns isOpen={isOpen} onClose={onClose} />
        </Box >

=======
        </Box >
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
    )
}

export default SaleView;