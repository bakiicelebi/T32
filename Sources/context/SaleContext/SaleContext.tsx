import React, { createContext, useContext, useState } from 'react';
import { useCartContext } from '../CartContext';

interface SaleContextType {
    tabNumber: number;
    selectedSale: number;
    openTabs: number[];
    incTabs: () => Promise<void>;
    isThere: (tabNo:number) => boolean;
    decTabs: (decTab: number) => void;
    setSelectedSale: (sale: number) => void;
}

const SaleContext = createContext<SaleContextType | undefined>(undefined);

const useSaleContext = () => {
    const context = useContext(SaleContext);
    if (!context) {
        throw new Error('useSaleContext must be used within a SaleProvider');
    }
    return context;
}

const SaleProvider = ({ children }: any) => {
    const [openTabs, setOpenTabs] = useState([1]);
    const [selectedSale, setSelectedSale] = useState(1);
    const [tabNumber, setTabNumber] = useState(1);

    const {clearCart}= useCartContext();

    const addNumberToUniqueArray = () => {
        for (let i = 1; i <= 5; i++) {
            if (!openTabs.includes(i)) {
                setOpenTabs([...openTabs, i]);
                break;
            }
        }
        return openTabs;
    };

    const removeElementFromArray = (desiredNumber: number) => {
        for (let i = 0; i < openTabs.length; i++) {
            if (openTabs[i] === desiredNumber) {
                openTabs.splice(i, 1);
                break;
            }
        }
        return openTabs;
    };

    const incTabs = async () => {
        addNumberToUniqueArray();
        setTabNumber(tabNumber + 1);
    };

    const decTabs = (decTab: number) => {
        setSelectedSale(1);
        clearCart(decTab);
        removeElementFromArray(decTab);
        setTabNumber(tabNumber - 1);
    };

    const isThere = (tabNo: number) => {
        return openTabs.includes(tabNo);
    };

    return (
        <SaleContext.Provider value={{ tabNumber, selectedSale, openTabs, incTabs, decTabs, setSelectedSale, isThere }}>
            {children}
        </SaleContext.Provider>
    );
}

export { useSaleContext, SaleProvider };
