import styles from "./SaleScreen.style";
import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import Tabs from "../../Components/Sale/Tab/Tab";


const Stack = createStackNavigator();



function TabButtons({ tabs, deleteTab, lastTab, addButton }: any) {
    const navigation = useNavigation(); // useNavigation hook'unu kullanarak navigation nesnesine erişim sağla
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

export default function App() {
    const [tabs, setTabs] = React.useState([{ key: '1', title: 'Tab 1' }]);

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


    function Screen({ tab, name }: any) {
        return (
            <View style={{ flex: 1, backgroundColor: "blue", justifyContent: 'center', alignItems: 'center' }}>
                <Text>{name}</Text>
                <TabButtons addButton={addTab} lastTab={tabs.length === 1} deleteTab={deleteTab} tabs={tabs} />

            </View>
        );
    }
    return (
        <Stack.Navigator
            screenOptions={{
                animationEnabled: false,
                headerShown: false
            }}>
            {tabs.map(tab => (
                <Stack.Screen
                    key={tab.key}
                    name={tab.key}
                    options={{ title: tab.title }}>
                    {() => <Screen tab={tab} name={tab.title} />}
                </Stack.Screen>
            ))}
        </Stack.Navigator>

    );
}
