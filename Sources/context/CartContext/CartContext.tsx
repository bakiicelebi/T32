import React, { createContext, useState, ReactNode, useContext } from 'react';

interface CartContextType {
    cart1: any[];
    cart2: any[];
    cart3: any[];
    cart4: any[];
    cart5: any[];
    piece: number;
    pieceBarcode: string;
    isDiscountApplied: boolean;
    handlePiece: (comingPiece: number) => void;
    handlePieceBarcode: (comingPieceBarcode: string) => void;
    discountInvert: () => void;
    clearCart: (cartNo: number) => Promise<void>;
    addCart1: (newProduct: any) => Promise<void>;
    addCart2: (newProduct: any) => Promise<void>;
    addCart3: (newProduct: any) => Promise<void>;
    addCart4: (newProduct: any) => Promise<void>;
    addCart5: (newProduct: any) => Promise<void>;
    removeCart: (cartNo: number, removeProduct: any) => Promise<void>;
}

const defaultValue: CartContextType = {
    cart1: [],
    cart2: [],
    cart3: [],
    cart4: [],
    cart5: [],
    pieceBarcode: "",
    piece: 1,
    handlePiece: (comingPiece: number) => { },
    handlePieceBarcode: (comingPieceBarcode: string) => { },
    isDiscountApplied: false,
    discountInvert: () => { },
    clearCart: async () => { },
    addCart1: async () => { },
    addCart2: async () => { },
    addCart3: async () => { },
    addCart4: async () => { },
    addCart5: async () => { },
    removeCart: async () => { },
};

const CartContext = createContext<CartContextType | undefined>(defaultValue);

const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a SaleProvider');
    }
    return context;
};

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart1, setCart1] = useState<any[]>(defaultValue.cart1);
    const [cart2, setCart2] = useState<any[]>(defaultValue.cart2);
    const [cart3, setCart3] = useState<any[]>(defaultValue.cart3);
    const [cart4, setCart4] = useState<any[]>(defaultValue.cart4);
    const [cart5, setCart5] = useState<any[]>(defaultValue.cart5);
    const [isDiscountApplied, setIsDiscountApplied] = useState(defaultValue.isDiscountApplied);
    const [piece, setPiece] = useState(defaultValue.piece)
    const [pieceBarcode, setPieceBarcode] = useState(defaultValue.pieceBarcode)

    const handlePieceBarcode = (comingPieceBarcode: string) => {
        setPieceBarcode(comingPieceBarcode)
    }

    const handlePiece = (comingPiece: number) => {
        setPiece(comingPiece)
    }

    const addCart1 = async (newProduct: any) => {
        setCart1([...cart1, newProduct]);
    };
    const addCart2 = async (newProduct: any) => {
        setCart2([...cart2, newProduct]);
    };
    const addCart3 = async (newProduct: any) => {
        setCart3([...cart3, newProduct]);
    };
    const addCart4 = async (newProduct: any) => {
        setCart4([...cart4, newProduct]);
    };
    const addCart5 = async (newProduct: any) => {
        setCart5([...cart5, newProduct]);
    };

    const discountInvert = () => {
        setIsDiscountApplied(!isDiscountApplied);
    };

    const removeCart = async (cartNo: number, removeProduct: any) => {
        switch (cartNo) {
            case 1:
                setCart1(cart1.filter(item => item !== removeProduct));
                break;
            case 2:
                setCart2(cart2.filter(item => item !== removeProduct));
                break;
            case 3:
                setCart3(cart3.filter(item => item !== removeProduct));
                break;
            case 4:
                setCart4(cart4.filter(item => item !== removeProduct));
                break;
            case 5:
                setCart5(cart5.filter(item => item !== removeProduct));
                break;
            default:
                console.log("invalid cart no");
                break;
        }
    };

    const clearCart = async (cartNo: number) => {
        if (cartNo === 1) setCart1([]);
        if (cartNo === 2) setCart2([]);
        if (cartNo === 3) setCart3([]);
        if (cartNo === 4) setCart4([]);
        if (cartNo === 5) setCart5([]);
    };

    return (
        <CartContext.Provider value={{ cart1, cart2, cart3, cart4, cart5, isDiscountApplied, discountInvert, removeCart, addCart1, addCart2, addCart3, addCart4, addCart5, clearCart, piece, handlePiece, handlePieceBarcode, pieceBarcode }}>
            {children}
        </CartContext.Provider>
    );
};

export { useCartContext, CartProvider };
