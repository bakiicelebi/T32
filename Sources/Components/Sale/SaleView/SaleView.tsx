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
                <Box flex={1}>
                    <HStack flex={1}>
                        <VStack flex={1}>
                            <Box flex={1}>
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

export default SaleView;