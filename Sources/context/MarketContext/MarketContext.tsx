import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';
import { API_BASE_URL, API_CATEGORIES_URL, API_STATUS_URL } from '@env';
import { useTranslation } from 'react-i18next';

interface MarketContextProps {
    receipts: any[];
    total: number;
    discount: number;
    vat: number;
    grandTotal: number;
    salesCount: number;
    serverStatus: boolean;
    wrongLogins: any[];
    addReceipt: (receipt: any) => void;
    clearReceipts: () => void;
    loadStoredData: () => void;
    checkServerStatus: () => Promise<void>;
    synchronizeReceipts: () => Promise<void>;
    getUnsentReceiptsCount: () => number;
    addWrongLogin: (loginAttempt: any) => Promise<void>;
    loadWrongLogins: () => Promise<void>;
    clearWrongLogins: () => Promise<void>;
}

const MarketContext = createContext<MarketContextProps | undefined>(undefined);

const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [receipts, setReceipts] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [vat, setVat] = useState<number>(0);
    const [grandTotal, setGrandTotal] = useState<number>(0);
    const [salesCount, setSalesCount] = useState<number>(0);
    const [serverStatus, setServerStatus] = useState(false);
    const [unsentReceipts, setUnsentReceipts] = useState<any[]>([]);
    const [wrongLogins, setWrongLogins] = useState<any[]>([]);

    const { t, i18n } = useTranslation()

    useEffect(() => {
        loadStoredData();
        checkServerStatus();
    }, []);

    const addReceipt = async (receipt: any) => {
        const newReceipts = [...receipts, receipt];
        setReceipts(newReceipts);
        setTotal(prev => prev + receipt.total);
        setDiscount(prev => prev + receipt.discount);
        setVat(prev => prev + receipt.vat);
        setGrandTotal(prev => prev + receipt.grandTotal);
        setSalesCount(prev => prev + 1);

        await AsyncStorage.setItem('receipts', JSON.stringify(newReceipts));
        await AsyncStorage.setItem('totals', JSON.stringify({
            total: total + receipt.total,
            discount: discount + receipt.discount,
            vat: vat + receipt.vat,
            grandTotal: grandTotal + receipt.grandTotal,
            salesCount: salesCount + 1
        }));

        try {
            await axios.post(`${API_BASE_URL}receipts`, { data: receipt }, { timeout: 3000 });
            console.log("Receipt Posted Successfully")
        } catch (error) {
            console.log("Receipt Couldn't Posted. Receipt Added Unsent Receipts")
            Alert.alert(t("synchronization receipts"), t("receipt couldn't posted"))
            const newUnsentReceipts = [...unsentReceipts, receipt];
            setUnsentReceipts(newUnsentReceipts);
            await AsyncStorage.setItem('unsentReceipts', JSON.stringify(newUnsentReceipts));
        }
    };

    const clearReceipts = async () => {
        setReceipts([]);
        setTotal(0);
        setDiscount(0);
        setVat(0);
        setGrandTotal(0);
        setSalesCount(0);
        setUnsentReceipts([]);

        await AsyncStorage.removeItem('receipts');
        await AsyncStorage.removeItem('totals');
        await AsyncStorage.removeItem('unsentReceipts');
    };

    const loadStoredData = async () => {
        const storedReceipts = await AsyncStorage.getItem('receipts');
        const storedTotals = await AsyncStorage.getItem('totals');
        const storedUnsentReceipts = await AsyncStorage.getItem('unsentReceipts');

        if (storedReceipts) {
            setReceipts(JSON.parse(storedReceipts));
        }
        if (storedTotals) {
            const totals = JSON.parse(storedTotals);
            setTotal(totals.total);
            setDiscount(totals.discount);
            setVat(totals.vat);
            setGrandTotal(totals.grandTotal);
            setSalesCount(totals.salesCount);
        }
        if (storedUnsentReceipts) {
            setUnsentReceipts(JSON.parse(storedUnsentReceipts));
        }
    };

    useEffect(() => {
        const id = setInterval(() => {
            checkServerStatus();
        }, 3000);
        return () => clearInterval(id);
    }, []);

    const checkServerStatus = async () => {
        try {
            const response = await axios.get(API_STATUS_URL, { timeout: 3000 });
            if (response.status === 200) {
                setServerStatus(true);
            } else {
                setServerStatus(false);
            }
        } catch (error: any) {
            setServerStatus(false);
            if (error.code === 'ECONNABORTED') {
                console.log("Request timed out");
            }
        }
    };

    const synchronizeReceipts = async () => {
        if (!serverStatus) return;

        const newUnsentReceipts = [];

        for (const receipt of unsentReceipts) {
            try {
                await axios.post(`${API_BASE_URL}receipts`, receipt, { timeout: 3000 });
                console.log("Receipt Synchronized Successfully");
                Alert.alert(t('synchronization receipts'), "Receipt Synchronized Successfully")
            } catch (error) {
                newUnsentReceipts.push(receipt);
                console.log("Receipt Couldn't be Synchronized");
            }
        }

        setUnsentReceipts(newUnsentReceipts);
        await AsyncStorage.setItem('unsentReceipts', JSON.stringify(newUnsentReceipts));
    };


    const getUnsentReceiptsCount = () => {
        return unsentReceipts.length;
    };


    const addWrongLogin = async (loginAttempt: any) => {
        try {
            const storedWrongLogins = await AsyncStorage.getItem('wrongLogins');
            const currentWrongLogins = storedWrongLogins ? JSON.parse(storedWrongLogins) : [];

            const newWrongLogins = [...currentWrongLogins, loginAttempt];

            setWrongLogins(newWrongLogins);

            await AsyncStorage.setItem('wrongLogins', JSON.stringify(newWrongLogins));
        } catch (error) {
            console.error("Failed to add wrong login attempt", error);
        }
    };

    const loadWrongLogins = async () => {
        try {
            const storedWrongLogins = await AsyncStorage.getItem('wrongLogins');

            if (storedWrongLogins) {
                setWrongLogins(JSON.parse(storedWrongLogins));
            }
        } catch (error) {
            console.error("Failed to load wrong logins", error);
        }
    };

    const clearWrongLogins = async () => {

        try {
            await axios.post(`${API_BASE_URL}receipts`, wrongLogins, { timeout: 3000 });
            console.log("Wrong Attempts Synchronized Successfully");
        } catch (error) {
            console.log("Wrong Attempts Couldn't be Synchronized");
        }

        try {
            await AsyncStorage.removeItem('wrongLogins');
            setWrongLogins([])

        } catch (error) {
            console.error("Failed to remove wrong logins", error);
        }
    }


    return (
        <MarketContext.Provider value={{
            receipts, total, discount, vat, grandTotal, salesCount, serverStatus,
            addReceipt, clearReceipts, loadStoredData, checkServerStatus, synchronizeReceipts,
            getUnsentReceiptsCount, addWrongLogin, loadWrongLogins, wrongLogins, clearWrongLogins
        }}>
            {children}
        </MarketContext.Provider>
    );
};

const useMarket = () => {
    const context = useContext(MarketContext);
    if (!context) {
        throw new Error('useMarket must be used within a MarketProvider');
    }
    return context;
};

// const ServerStatusIcon: React.FC = () => {
//     const { serverStatus } = useMarket();

//     return (
//         <View>
//             <Text style={{ color: serverStatus === 'online' ? 'green' : 'red' }}>
//                 {serverStatus === 'online' ? '●' : '●'}
//             </Text>
//         </View>
//     );
// };

export { useMarket, MarketProvider };
