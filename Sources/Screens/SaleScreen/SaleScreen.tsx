import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SaleView from '../../Components/Sale/SaleView';
import { useSaleContext } from '../../context/SaleContext';
import { Box } from 'native-base';
import TopBar from '../../Components/GeneralComponents/TopBar';
import BottomBar from '../../Components/GeneralComponents/BottomBar';


const Tab = createBottomTabNavigator();

const SaleScreen = () => {

    const { isThere }: any = useSaleContext();

    return (
        <Box flex={1}>
            <TopBar/>
            <Box h={"88%"} top={12} justifyContent={"center"}>
                <Tab.Navigator screenOptions={{ tabBarStyle: { opacity: 0, height: 0 }, headerShown: false, freezeOnBlur: false }}>
                    {isThere(1) && <Tab.Screen name="Sale1" component={SaleView} />}
                    {isThere(2) && <Tab.Screen name="Sale2" component={SaleView} />}
                    {isThere(3) && <Tab.Screen name="Sale3" component={SaleView} />}
                    {isThere(4) && <Tab.Screen name="Sale4" component={SaleView} />}
                    {isThere(5) && <Tab.Screen name="Sale5" component={SaleView} />}
                </Tab.Navigator>
            </Box>
            <BottomBar/>
        </Box>
    )
}



export default SaleScreen;
