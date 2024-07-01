import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import { MarketProvider } from "./context/MarketContext";
import { SaleProvider } from "./context/SaleContext";


const ContextProvider = ({children}:any) => {
    return (
        <DataProvider>
            <MarketProvider>
                <CartProvider>
                    <SaleProvider>
                        {children}
                    </SaleProvider>
                </CartProvider>
            </MarketProvider>
        </DataProvider>

    )
}

export default ContextProvider;