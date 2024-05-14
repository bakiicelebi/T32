import React, { useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SaleView from '../../Components/Sale/SaleView';


const Tab = createBottomTabNavigator();

const SaleScreen = () => {

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
        <Tab.Navigator screenOptions={{ headerShown: false, freezeOnBlur: false, tabBarStyle: { height: 0 } }}>
            {isThere(1) && <Tab.Screen name="Sale1" >
                {() => (<SaleView selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
            {isThere(2) && <Tab.Screen name="Sale2" >
                {() => (<SaleView selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
            {isThere(3) && <Tab.Screen name="Sale3" >
                {() => (<SaleView selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
            {isThere(4) && <Tab.Screen name="Sale4" >
                {() => (<SaleView selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
            {isThere(5) && <Tab.Screen name="Sale5" >
                {() => (<SaleView selectedSale={selectedSale} setSelectedSale={setSelectedSale} openTabs={openTabs} tabNumber={tabNumber} incTabs={incTabs} decTabs={decTabs} />)}
            </Tab.Screen>}
        </Tab.Navigator>
    )
}

export default SaleScreen;
