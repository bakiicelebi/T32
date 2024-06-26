import { Box, VStack, Text, HStack, FlatList } from 'native-base'
import React, { useState } from 'react'
import CartCards from '../../Sale/CartCards';
import { ActivityIndicator } from 'react-native';
import CustomAccordion from '../../Products/CustomAccordion';
import { useTranslation } from 'react-i18next';

const PaymentCart = ({ cartGeneralTotal, cartDiscount, cartTaxes, cartTotal, cartSubtotal, cartData, cartPrices }: any) => {

    const [isAccordionOpen, setIsAccordionOpen] = useState(false)
    const [price, setPrice] = useState(2);
    const { t, i18n } = useTranslation()
    const handleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen)
    }

    const renderCards = ({ item }: any) => <CartCards cartPrices={cartPrices} item={item} type={"payment"} />

    return (
        < Box mt={2} flex={1} >
            {!cartData.length && <ActivityIndicator />}
            <VStack flex={1} space={4}>
                <Box borderWidth={1} borderTopRadius={15} borderColor={"#7f8183"} p={4} h="100%">
                    <HStack px={2} py={1} pb={1} justifyContent={"space-between"}>
                        <Text fontWeight={"semibold"} fontSize={"lg"}>{t('product quantity')}:</Text>
                        <Text fontWeight={"semibold"} fontSize={"lg"}>{cartData.length}</Text>
                    </HStack>
                    <FlatList nestedScrollEnabled data={cartData} renderItem={renderCards} keyExtractor={(item, index) => index.toString()} />
                </Box>
            </VStack>
            <Box flex={isAccordionOpen ? .7 : .15}>
                <CustomAccordion isAccordionOpen={isAccordionOpen} handleAccordion={handleAccordion} cartGeneralTotal={cartGeneralTotal} cartSubtotal={cartSubtotal}
                    cartTaxes={cartTaxes} cartDiscount={cartDiscount} cartTotal={cartTotal} />
            </Box>
        </Box >
    )
}

export default PaymentCart;
