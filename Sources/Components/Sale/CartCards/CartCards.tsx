import { Box, HStack, VStack, Image, Text } from "native-base";
import CartProductMng from "../CartProductMng";
import SwipeableCards from "../SwipeableCards";
import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import { useCartContext } from "../../../context/CartContext";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";

const CartCards = ({ setDiscountPrices, setPrices, item, type, handleDeleting, cartPrices }: any) => {
    const [productPrice, setProductPrice] = useState(0);
    const [productCount, setProductCount] = useState(1);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [product, setProduct] = useState<any>(null);
    const { products } = useData();
    const { isDiscountApplied, piece, pieceBarcode, handlePieceBarcode, handlePiece } = useCartContext()
    const layout = useWindowDimensions()

    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (piece != 1 && product?.Barcode === pieceBarcode) {
            setProductCount(piece * productCount)
            handlePiece(1)
            handlePieceBarcode("");
        }
    }, [piece, pieceBarcode])

    useEffect(() => {
        if (product) {
            if (type === "payment" && cartPrices) {
                const matchedCartPrice = cartPrices.find((price: any) => price.Barcode === item);
                if (matchedCartPrice) {
                    setProductCount(matchedCartPrice.Price / product.Price);
                }
            }
        }
    }, [cartPrices, type, item, product]);

    useEffect(() => {
        if (product) {
            const newPrice = productCount * product.Price;
            setProductPrice(newPrice);

            if (type === "cart") {
                setPrices((prevPrices: any) => {
                    const updatedPrices = prevPrices.filter((price: any) => price.Barcode !== product.Barcode);
                    return [...updatedPrices, { Barcode: product.Barcode, Price: newPrice }];
                });

                if (isDiscountApplied && product.Campaign1) {
                    const discountedPrice = newPrice * 0.2;
                    setDiscountPrice(discountedPrice)
                    setDiscountPrices((prevDiscountPrices: any) => {
                        const updatedDiscountPrices = prevDiscountPrices.filter((price: any) => price.Barcode !== product.Barcode);
                        return [...updatedDiscountPrices, { Barcode: product.Barcode, Price: discountedPrice }];
                    });
                }
                if (!isDiscountApplied) {

                    setDiscountPrices((prevDiscountPrices: any) => {
                        const updatedDiscountPrices = prevDiscountPrices.filter((price: any) => price.Barcode !== product.Barcode);
                        return [...updatedDiscountPrices, { Barcode: product.Barcode, Price: 0 }];
                    });
                }
            }
        }
    }, [isDiscountApplied, productCount, product, setPrices, setDiscountPrices]);


    useEffect(() => {
        if (products && item) {
            const matchedProduct = products.find(product => product.Barcode === item);
            setProduct(matchedProduct);
            setProductPrice(matchedProduct.Price)
        }
    }, [products, item]);

    if (!product) {
        return <ActivityIndicator />
    }



    return (
        <SwipeableCards handleDeleting={() => handleDeleting(item, productPrice, discountPrice)} type={type === "cart" ? "delete" : "payment"}>
            <HStack px={1} borderRadius={10} _dark={{
                bg: "#1e1f21",
                borderWidth: 1,
                borderColor: "#515557"
            }} _light={{
                bg: "#ffffff"
            }} >
                <Box p={3} my={2} mr={4}>
                    <Image w={layout.width / 25} h={layout.width / 25} alt='Product Image' source={{ uri: product.imageUrl }} />
                </Box>
                <Box flex={1} >
                    <VStack flex={1}>
                        <Box py={1} flex={1} px={2} justifyContent={"center"}>
                            <Text fontSize={"xl"}>{product.ProductName}</Text>
                        </Box>
                        <HStack alignItems={"center"} px={2} flex={.2} flexDirection={"row"} justifyContent={"space-between"}>
                            {type === "payment" && <Text fontSize={"md"} fontWeight={"semibold"}>KDV: %18</Text>}
                            {type === "payment" && <Text fontSize={"md"} fontWeight={"semibold"}>{productCount} pcs</Text>}
                            <Text borderWidth={1} borderColor={"#515557"} fontWeight={"semibold"} padding={2} borderRadius={5} p={1} alignSelf={"center"}>{parseFloat(productPrice.toFixed(2))} ₺</Text>
                            {type === "cart" && <CartProductMng productCount={productCount} setProductCount={setProductCount} />}
                        </HStack>
                        <HStack alignItems={"center"} px={2} flex={.2} flexDirection={"row"} justifyContent={"space-between"}>
                            <Box justifyContent={"center"} flex={1}>
                                <Text fontWeight={"semibold"} py={1}>{product.Barcode}</Text>
                            </Box>
                            <Box py={1} justifyContent={"center"} flex={1}>
                                <Text textAlign={"center"} fontWeight={"semibold"} color={"#ea7465"}>{product.Campaign1 && isDiscountApplied ? t("campaign applied") : ""}</Text>
                            </Box>
                        </HStack>
                    </VStack>
                </Box>
            </HStack>
        </SwipeableCards>
    );
}

export default CartCards;
