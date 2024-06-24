import { Box, Divider, Heading, HStack, Text, VStack } from "native-base"
import React from 'react';
import { useTranslation } from "react-i18next";



const Receipt = ({ receiptData, zReport }: any) => {
    const { t, i18n } = useTranslation();

    return (<Box>
        {zReport && <Text>Z {t('report')}</Text>}
        <Heading mb={5} fontSize={"lg"} alignSelf={"center"}>T32 GROCERY</Heading>
        <Text alignSelf={"center"}>Sakarya Univ. Computer Science Dept. 143/2</Text>
        <Text alignSelf={"center"}>Sakarya</Text>
        <HStack mt={3} justifyContent={"space-between"}>
            <Text>{t('date')}: {receiptData.date}</Text>
            <Text>{t('time')}: {receiptData.time}</Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
            <Text>{t('sale no')}: {receiptData.saleNo}</Text>
            <Text>{t('cashier')}: {receiptData.cashier}</Text>
        </HStack>
        {!zReport &&
            receiptData.items.map((item: any, index: number) => (
                <VStack key={index}>
                    <Text>{item.code} ({item.quantity} {t('pieces')} X {item.unitPrice.toFixed(2)})</Text>
                    <HStack justifyContent={"space-between"}>
                        <Text>{item.name}</Text>
                        <Text>{item.totalPrice.toFixed(2)} ₺</Text>
                    </HStack>
                    {index < receiptData.items.length - 1 && <Divider my={1} />}
                </VStack>
            ))
        }
        <Box borderWidth={"1"} borderStyle={"dashed"} mt={4} mb={3} />

        <HStack justifyContent={"space-between"}>
            <Text>{t('total received')}:</Text>
            <Text>{receiptData.totalReceived} ₺</Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
            <Text>{t('total taxes')}:</Text>
            <Text>{receiptData.totalTaxes} ₺</Text>
        </HStack>
        <Box borderWidth={"1"} borderStyle={"dashed"} mt={4} mb={3} />
        {!zReport && <HStack justifyContent={"space-between"}>
            <Text>{t('subtotal')}:</Text>
            <Text>{receiptData.subtotal} ₺</Text>
        </HStack>}
        <HStack justifyContent={"space-between"}>
            <Text>{t('discount')}:</Text>
            <Text>{receiptData.discount} ₺</Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
            <Text>{t('change given')}:</Text>
            <Text>{receiptData.changeGiven} ₺</Text>
        </HStack>
        {zReport && <Box borderWidth={"1"} borderStyle={"dashed"} mt={4} mb={3} />}
        {zReport &&
            <HStack justifyContent={"space-between"}>
                <Text>{t('card payment total')}:</Text>
                <Text>{receiptData.cardPayment} ₺</Text>
            </HStack>
        }
        {zReport &&
            <HStack justifyContent={"space-between"}>
                <Text>{t('cash payment total')}:</Text>
                <Text>{receiptData.cashPayment} ₺</Text>
            </HStack>
        }
        <Box borderWidth={"1"} borderStyle={"dashed"} mt={4} mb={3} />
        <HStack justifyContent={"space-between"}>
            <Text>{t('grand total')}:</Text>
            <Text>{receiptData.grandTotal} ₺</Text>
        </HStack>
        {!zReport && receiptData.mail !== "" &&
            <Box borderWidth={"1"} borderStyle={"dashed"} mt={4} mb={3} /> &&
            <HStack justifyContent={"space-between"}>
                <Text>{t('mail address')}:</Text>
                <Text>{receiptData.mail}</Text>
            </HStack>}
    </Box>)
}

export default Receipt
