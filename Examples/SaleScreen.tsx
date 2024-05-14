import styles from "./SaleScreen.style";
import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, useWindowDimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import Tabs from "../../Components/Sale/SaleTabs/SaleTabs";
import CategoryScreen from "../CategoryScreen";
import ProductScreen from "../ProductScreen";

const Stack = createStackNavigator();
/*******  
 * 
 * 
 * 
 * STATE MANAGEMENTTA EKLENECEK ŞEY TABIN İNDEXİ 
 * YAPILACAK YENİ ŞEY HER SEKME EKLENDİĞİNDE STACKTEN YENİ GELECEK DİZİDEN DEĞİL
 * 
 */

function TabButtons({ tabs, deleteTab, lastTab, addButton }: any) {
    const navigation = useNavigation();
    const route = useRoute();

    const [activeTab, setActiveTab] = useState(route.name)

    const handleClose = (deleteKey: string) => {
        deleteTab(deleteKey);
    }

    return (
        <View style={{ position: 'absolute', alignItems: "center", flexDirection: "row", top: 20, left: 20 }}>
            {tabs.map((tab: any) => (
                <View key={tab.key}>
                    <Tabs
                        lastTab={lastTab}
                        tabKey={tab.key}
                        activeTab={activeTab}
                        closePage={() => handleClose(tab.key)}
                        navigate={() => {
                            //@ts-ignore
                            navigation.navigate(tab.key)
                        }}
                    />
                </View>
            ))}
            {tabs.length < 5 && <TouchableOpacity onPress={addButton}>
                <Text style={{ backgroundColor: "gray", flex: 1, verticalAlign: "middle", fontSize: 20 }}> + </Text>
            </TouchableOpacity>}

        </View>
    );
}

function Screen({ tab, tabs, deleteTab, addTab, name }: any) {
    console.log("bbb")
    const layout = useWindowDimensions();
    return (
        <View style={{ flex: 1, backgroundColor: "blue" }}>
            <TabButtons addButton={addTab} lastTab={tabs.length === 1} deleteTab={deleteTab} tabs={tabs} />
            <View style={{ backgroundColor: "green", marginTop: 80, marginLeft: 20, borderWidth: 1, padding: 10, marginBottom: 20, width: layout.width / 1.5, flex: 1 }}>
                <NavigationContainer independent >
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="CategoryScreenInSaleScreen" component={CategoryScreen} />
                        <Stack.Screen component={ProductScreen} name="ProductScreen" />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
            <View style={{ flex: .2 }} >
                <Text>AAAAAAAAAAAAA</Text>
            </View>
        </View>
    );
}

const SaleScreen = () => {
    const [tabs, setTabs] = React.useState([{ key: '1', title: 'Tab 1' }]);


    useEffect(() => console.log("asas"), [])

    const addTab = () => {
        const newKey = `${tabs.length + 1}`;
        const newTitle = `Tab ${tabs.length + 1}`;
        setTabs([...tabs, { key: newKey, title: newTitle }]);
    };

    const deleteTab = (deleteKey: any) => {

        if (tabs.length === 1) {
            return;
        }

        const newTabs = tabs.filter(tab => tab.key !== deleteKey);



        // Tab anahtarlarını sıralı olarak güncelle
        const updatedTabs = newTabs.map((tab, index) => ({
            ...tab,
            key: `${index + 1}`, // Anahtarları 1'den başlayarak sırala
            title: `Tab ${index + 1}` // Başlıkları da güncelle
        }));

        // Güncellenmiş tabları ayarla
        setTabs(updatedTabs);
    };




    return (

        // <NavigationContainer independent>
        //     <Stack.Navigator
        //         screenOptions={{
        //             animationEnabled: false,
        //             headerShown: false
        //         }}>
        //         {tabs.map(tab => (
        //             <Stack.Screen
        //                 key={tab.key}
        //                 name={tab.key}
        //                 options={{ title: tab.title }}>
        //                 {() => <Screen tabs={tabs} deleteTab={deleteTab} addTab={addTab} tab={tab} name={tab.title} />}
        //             </Stack.Screen>
        //         ))}
        //     </Stack.Navigator>
        // </NavigationContainer>



        // <NavigationContainer>
        //     <Stack.Navigator>
        //         {/* <Stack.Screen component={ } name="TabSale1" />
        //         <Stack.Screen component={ } name="TabSale2" />
        //         <Stack.Screen component={ } name="TabSale3" />
        //         <Stack.Screen component={ } name="TabSale4" />
        //         <Stack.Screen component={ } name="TabSale5" /> */}
        //     </Stack.Navigator>
        // </NavigationContainer>

    );
}

export default SaleScreen;