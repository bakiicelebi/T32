import { Text, Box, Center, Button, VStack, Heading, HStack, FlatList, Modal } from 'native-base';
import React, { useEffect, useState } from 'react';
import CartCards from '../CartCards';
import { ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSaleContext } from '../../../context/SaleContext';
import { useCartContext } from '../../../context/CartContext';
import CustomAccordion from '../../Products/CustomAccordion';
import { useTranslation } from 'react-i18next';
import LogoLoading from '../../GeneralComponents/LottieComponents/LogoLoading';

const Cart = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { selectedSale, openTabs } = useSaleContext();
    const { cart1, cart2, cart3, cart4, cart5, clearCart, removeCart } = useCartContext();
    const [data, setData] = useState<any[]>([]);
    const [cartNo, setCartNo] = useState<number | any>();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false)
    const [cartSubtotal, setCartSubtotal] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [cartGeneralTotal, setCartGeneralTotal] = useState(0)
    const [cartTaxes, setCartTaxes] = useState(0)
    const [cartDiscount, setCartDiscount] = useState(0)
    const [prices, setPrices] = useState<any[]>([]);
    const [discountPrices, setDiscountPrices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false)
    const [isDisabledCancellation, setIsDisabledCancellation] = useState(true);
    const [isDisabledConfirmation, setIsDisabledConfirmation] = useState(true);

    const { t, i18n } = useTranslation()


    useEffect(() => {
        if (data.length) {
            setIsDisabledCancellation(false)
            setIsDisabledConfirmation(false)
        }
        else {
            setIsDisabledCancellation(true)
            setIsDisabledConfirmation(true)
        }
    }, [data])

    useEffect(() => {
        setData([])
        setPrices([])
        setDiscountPrices([])
    }, [selectedSale])

    useEffect(() => {
        const disc = discountPrices.reduce((acc, curr) => acc + curr.Price, 0);
        setCartDiscount(parseFloat(disc.toFixed(2)));
        const newGeneral = cartTotal - cartDiscount;
        setCartGeneralTotal(parseFloat(newGeneral.toFixed(2)));
    }, [discountPrices, cartDiscount, cartTotal])

    useEffect(() => {
        const subtotal = cartTotal * (1 - 0.18);
        const taxes = cartTotal * (0.18);
        setCartSubtotal(parseFloat(subtotal.toFixed(2)));
        setCartTaxes(parseFloat(taxes.toFixed(2)));
    }, [cartTotal]);

    useEffect(() => {
        const total = prices.reduce((acc, curr) => acc + curr.Price, 0);
        setCartTotal(parseFloat(total.toFixed(2)));
    }, [prices, selectedSale]);

    useEffect(() => {
        setCartNo(openTabs[selectedSale - 1]);
    }, [selectedSale, openTabs]);

    useEffect(() => {
        if (cartNo !== undefined) {
            fetchCart();
        }
    }, [cartNo, selectedSale, cart1, cart2, cart3, cart4, cart5]);

    const fetchCart = () => {
        let selectedCart;
        switch (cartNo) {
            case 1:
                selectedCart = cart1;
                break;
            case 2:
                selectedCart = cart2;
                break;
            case 3:
                selectedCart = cart3;
                break;
            case 4:
                selectedCart = cart4;
                break;
            case 5:
                selectedCart = cart5;
                break;
            default:
                selectedCart = [];
        }
        setData(selectedCart);
    };

    const handleCancellation = (finished: boolean) => {

        if (finished) {
            clearCart(cartNo);
            setCartDiscount(0)
            setCartTotal(0)
            setCartSubtotal(0)
            setCartGeneralTotal(0)
            setCartTaxes(0)
            setPrices([])
            setDiscountPrices([])
            console.log("The cart has been emptied")
            console.log('OK Pressed')
        }
        else {
            Alert.alert(t('cart cancellation'), t('cart will be empty'), [
                {
                    text: t('cancel'),
                    onPress: () => { console.log('Cancel Pressed'); },
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        setLoading(true)
                        //@ts-ignore
                        clearCart(cartNo);
                        setCartDiscount(0)
                        setCartTotal(0)
                        setCartSubtotal(0)
                        setCartGeneralTotal(0)
                        setCartTaxes(0)
                        setPrices([])
                        setDiscountPrices([])
                        console.log("The cart has been emptied")
                        console.log('OK Pressed')
                        setLoading(false)
                    }
                },
            ])
        }

    };

    const handleDeleting = async (itemBarcode: string, productPrice: any, discountPrice: any) => {

        setLoading(true)
        const updatedDiscountPrices = discountPrices.filter(item => item.Barcode !== itemBarcode);
        setDiscountPrices(updatedDiscountPrices);

        const updatedPrices = prices.filter(item => item.Barcode !== itemBarcode);
        setPrices(updatedPrices);


        const newCartTotal = cartTotal - productPrice;
        setCartTotal(newCartTotal);
        setCartDiscount(cartDiscount - discountPrice)


        console.log(itemBarcode + " has been deleted")
        removeCart(cartNo, itemBarcode).then(() => setLoading(false));

    };

    const handleConfirmation = () => {
        if (data.length > 0) {
            console.log("confirmed");
            Alert.alert(t('cart confirmation'), t('cart will be approved'), [
                {
                    text: t('cancel'),
                    onPress: () => { console.log('Cancel Pressed'); },
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        //@ts-ignore
                        navigation.navigate("PaymentScreen", {
                            cartData: data, cartDiscount: cartDiscount, cartGeneralTotal: cartGeneralTotal,
                            cartSubtotal: cartSubtotal, cartTaxes: cartTaxes, cartTotal: cartTotal, prices: prices,
                            cancellation: handleCancellation
                        });
                        console.log('OK Pressed')
                    }
                },
            ]);

        } else {
            Alert.alert(t("cart confirmation cancelled"), t("cart is empty"));
        }
    };

    const handleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen)
    }

    const renderCards = ({ item }: any) => <CartCards setDiscountPrices={setDiscountPrices} setPrices={setPrices} handleDeleting={handleDeleting} item={item} type={"cart"} />;

    return (
        <>
            <VStack pt={2} pb={2} flex={1}>
                <HStack mb={2} alignItems={"center"} mx={2} justifyContent={"space-between"}>
                    <Box>
                        <Button disabled={isDisabledCancellation} shadow={"6"} _pressed={{ _text: { fontSize: "sm" } }} _dark={{ bg: "#1e1f21" }} _light={{ bg: "#ffffff" }} borderRadius={10} _text={{ fontSize: "md" }} colorScheme={isDisabledCancellation ? "muted" : "secondary"} variant={"outline"} onPress={() => handleCancellation(false)}>{t('cart cancellation')}</Button>
                    </Box>
                    <Heading>
                        {t('cart')}
                    </Heading>
                    <Box>
                        <Button disabled={isDisabledConfirmation} _pressed={{ _text: { fontSize: "sm" } }} shadow={"6"} _dark={{ bg: "#1e1f21" }} _light={{ bg: "#ffffff" }} borderRadius={10} _text={{ fontSize: "md" }} colorScheme={isDisabledConfirmation ? "muted" : "primary"} variant={"outline"} onPress={handleConfirmation}>{t('confirm cart')}</Button>
                    </Box>
                </HStack>
                <Box mx={2} borderTopRadius={10} flex={1} padding={2} borderWidth={1} borderColor={"#515557"} >
                    {loading && <ActivityIndicator />}
                    <Box mb={1} flexDirection={"row"} justifyContent={"space-between"}>
                        <Text fontSize={"lg"}>{t('product quantity')}:</Text>
                        <Text fontSize={"lg"}>{data.length}</Text>
                    </Box>
                    {!data.length && <Center flex={1}><Text>{t('cart is empty')}...</Text></Center>}
                    <FlatList data={data} renderItem={renderCards} keyExtractor={(item, index) => index.toString()} />
                </Box>

                {/* CUSTOM ACCORDION */}
                <Box mb={2} mx={2} flex={isAccordionOpen ? .7 : .15}>
                    <CustomAccordion isAccordionOpen={isAccordionOpen} handleAccordion={handleAccordion} cartGeneralTotal={cartGeneralTotal} cartSubtotal={cartSubtotal}
                        cartTaxes={cartTaxes} cartDiscount={cartDiscount} cartTotal={cartTotal} />
                </Box>

                {/**PaperProvider AccordionList */}
                {/* <List.Section>
                <List.Accordion title="Total Price">
                    <List.Item title="SubTotal:" /><List.Item title={}/>
                    <List.Item title="Second item" />
                </List.Accordion>
            </List.Section> */}
            </VStack>
            <Modal isOpen={loading} onClose={() => { }}>
                <Box borderRadius={15} _dark={{
                    bg: "#1e1f21"
                }} _light={{
                    bg: "#ffffff"
                }} w={100} h={100}>
                    <LogoLoading />
                </Box>
            </Modal>
        </>
    );
};

export default Cart;
