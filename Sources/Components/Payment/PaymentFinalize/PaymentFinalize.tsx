import React, { useEffect, useState } from 'react'
import { Box, VStack, HStack, Text, Button, Divider, Heading } from 'native-base'
import NumberPad from '../../Sale/NumberPad'
import CustomModal from '../CustomModal/CustomModal';
import Receipt from '../Receipt';
import { useNavigation } from '@react-navigation/native';
import { Alert, LogBox } from 'react-native';
import { useTranslation } from 'react-i18next';

const PaymentFinalize = (prop: any) => {

    const [mail, setMail] = useState("");
    const [cardPaying, setCardPaying] = useState("0");
    const [cashPaying, setCashPaying] = useState("0");
    const [totalPaid, setTotalPaid] = useState("0");
    const [cashPaid, setCashPaid] = useState("0");
    const [cardPaid, setCardPaid] = useState("0");
    const [change, setChange] = useState("0");
    const [amountDue, setAmountDue] = useState("0");
    const [remaining, setRemaining] = useState(amountDue);
    const [isCashActive, setIsCashActive] = useState(true);
    const [isFinishDisabled, setIsFinishDisabled] = useState(true);
    const [isPaymentDisabled, setIsPaymentDisabled] = useState(true);
    const [hasCash, setHasCash] = useState(false);
    const [hasCard, setHasCard] = useState(false);
    const [CancelControl, setCancelControl] = useState(false);
    const [hasCreditCardChange, setHasCreditCardChange] = useState(false);
    const [isSubtotalModalActive, setIsSubtotalModalActive] = useState(false);
    const [isPaymentModalActive, setIsPaymentModalActive] = useState(false);
    const [isFinishModalActive, setIsFinishModalActive] = useState(false)
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
    const [isFinishedDocument, setIsFinishedDocument] = useState(false)

    const navigation = useNavigation();

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const { handleEmailReceipt, cancellation, handleSaveReceipt, createReceipt, cartGeneralTotal, mailComing, setCardPayment, setCashPayment, setChange: setChangeComing, receiptData } = prop;

    const { t, i18n } = useTranslation()

    useEffect(() => {
        const newAmount = cartGeneralTotal.toString()
        setAmountDue(newAmount)
        setRemaining(newAmount)
    }, [cartGeneralTotal])

    useEffect(() => {
        if (mailComing) {
            setMail(mailComing)
        }

    }, [mailComing])

    const handleNumPad = (value: string) => {
        if (value === 'X') {
            if (isCashActive) {
                setCashPaying(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
            } else {
                setCardPaying(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
            }
        } else if (value === 'A') {
            if (isCashActive) {
                setCashPaying(prev => prev.includes(".") ? prev : prev + ".");
            } else {
                setCardPaying(prev => prev.includes(".") ? prev : prev + ".");
            }
        } else {
            if (isCashActive) {
                setCashPaying(prev => prev === "0" ? value.toString() : prev + value);
            } else {
                setCardPaying(prev => prev === "0" ? value.toString() : prev + value);
            }
        }
    };

    useEffect(() => {

        const cardPayingControl = parseFloat(cardPaying);
        const cashPayingControl = parseFloat(cashPaying);
        const cardPayment = cardPayingControl + parseFloat(cardPaid);
        const cashPayment = cashPayingControl + parseFloat(cashPaid);
        const totalPaying = cardPayingControl + cashPayingControl;
        const totalPaid = cardPayment + cashPayment;
        const amountControl = parseFloat(amountDue);
        const remainingControl = parseFloat(remaining);

        if (cashPayingControl > 0) {
            setHasCash(true)
        }
        else {
            setHasCash(false)
        }

        if (cardPayingControl > 0) {
            setHasCard(true)
        }
        else {
            setHasCard(false)
        }

        if (totalPaid >= amountControl) {
            if (cardPayingControl > remainingControl) {
                setHasCreditCardChange(true)
                setIsPaymentDisabled(true);
            }
            else if (cardPayingControl === amountControl) {
                if (cashPayment === 0) {
                    setHasCreditCardChange(false);
                    if (amountControl === 0) {
                        setIsPaymentDisabled(true);
                    }
                    else {
                        setIsPaymentDisabled(false)
                    }
                }
                else {
                    setHasCreditCardChange(true)
                    setIsPaymentDisabled(true);
                }
            }
            else {
                const changeAmount = totalPaid - amountControl;
                setChange(changeAmount.toString());
                setIsPaymentDisabled(false);

                if (cardPayingControl >= remainingControl || cashPayingControl >= remainingControl) {
                    setHasCreditCardChange(false)
                }
                else {
                    setHasCreditCardChange(true)
                }
            }
        }
        else if (totalPaid > 0 && totalPaid < amountControl) {
            setChange("0")
            setIsPaymentDisabled(false)
            setHasCreditCardChange(false)
        }
        else {
            setChange("0");
            setIsPaymentDisabled(true);
            setHasCreditCardChange(false);
        }
    }, [cashPaying, cardPaying])

    useEffect(() => {
        if (isFinishDisabled) {
            setIsPaymentDisabled(false)
        }
        else {
            setIsPaymentDisabled(true)
        }

        if (remaining === "0" && parseFloat(totalPaid) > 0) {
            setIsFinishDisabled(false);
            setIsPaymentDisabled(true)
        }
        else {
            setIsFinishDisabled(true)
        }

    }, [isPaymentDisabled, remaining])

    useEffect(() => {
        if (hasCreditCardChange === true) {
            setIsPaymentDisabled(true)
        }
        else {
            setIsPaymentDisabled(false)
        }
    }, [hasCreditCardChange])

    useEffect(() => {
        if (parseFloat(totalPaid) > 0) {
            setCancelControl(true)
        }
        else {
            setCancelControl(false)
        }
    }, [totalPaid])

    const handleDeletePaying = () => {
        setCashPaying("0")
        setCardPaying("0")
    }

    const handleSubtotal = () => {
        setIsSubtotalModalActive(true);
    }

    const handleFullyCard = () => {
        setCardPaying(remaining)
        setCashPaying("0")
        setIsSubtotalModalActive(false)
    }

    const handleFullyCash = () => {
        setCashPaying(remaining)
        setCardPaying("0")
        setIsSubtotalModalActive(false)
    }

    const handlePaymentModal = () => {
        setIsPaymentModalActive(true)
    }

    const handlePaymentCard = () => {
        const paying = parseFloat(cardPaying);
        const paidCard = parseFloat(cardPaid) + paying
        const remain = parseFloat(remaining)
        const total = parseFloat(totalPaid)

        if ((remain - paying) < 0) {
            setRemaining("0")
        }
        else {
            setRemaining((remain - paying).toString())
        }

        setTotalPaid((total + paying).toString());
        setCardPaid(paidCard.toString());
        setCardPayment(paidCard)
        setCardPaying("0");
        setIsPaymentModalActive(false)
    }

    const handlePaymentCash = () => {
        const paying = parseFloat(cashPaying);
        const paidCash = parseFloat(cashPaid) + paying
        const remain = parseFloat(remaining)
        const total = parseFloat(totalPaid)

        if ((remain - paying) < 0) {
            setRemaining("0")
        }
        else {
            setRemaining((remain - paying).toString())
        }

        setTotalPaid((total + paying).toString());
        setCashPaid(paidCash.toString());
        setCashPayment(paidCash)
        setCashPaying("0");
        setIsPaymentModalActive(false)
    }

    const handleFinishDocument = () => {
        createReceipt()
        
        setChangeComing(change)
        setIsFinishModalActive(true)
    }

    const handleReceipt = (hasEmail: boolean) => {
        if (hasEmail) {
            handleEmailReceipt()
        }
        
        setIsFinishModalActive(false)
        setIsReceiptModalOpen(true)
    }

    const handleSavingReceipt = () => {
        setIsFinishedDocument(true)
        handleSaveReceipt()
        cancellation(true)
        //@ts-ignore
        navigation.navigate("SaleScreen")
    }

    const handleCancel = () => {
        Alert.alert(t('cart cancellation'), t('cart will be empty'), [
            {
                text: t('cancel'),
                onPress: () => { console.log('Cancel Pressed'); },
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    cancellation(true)
                    console.log("The cart has been emptied")
                    console.log('OK Pressed')
                }
            },
        ])
        
        //@ts-ignore
        navigation.navigate("SaleScreen")
    }

    return (
        <Box mt={2} flex={1} >
            <VStack flex={1} space={4}>
                <HStack space={3} justifyContent={"space-between"} flex={1.5}>
                    <Button disabled={CancelControl} _text={{ fontSize: "md", fontWeight: "semibold" }} colorScheme={CancelControl ? "muted" : "danger"} onPress={handleCancel} flex={1}>{t('cancel document')}</Button>
                    <Button onPress={handleFinishDocument} _text={{ fontSize: "md", fontWeight: "semibold" }} disabled={isFinishDisabled} colorScheme={isFinishDisabled ? "muted" : "success"} flex={1}>{t('finish document')}</Button>
                </HStack>
                <HStack flex={10} justifyContent="space-between" space={2}>
                    <VStack space={3} flex={1} >
                        <Button _pressed={{ _text: { fontSize: "md" } }} borderWidth={1} borderColor={"#7f8183"} shadow={"7"} variant={"unstyled"} borderRadius={15} _dark={{ bg: "#1e1f21" }} _light={{ bg: "#ffffff" }}
                            p={1} _text={{
                                fontSize: "lg", _dark: { color: "white" },
                                _light: { color: "black" }, fontWeight: "semibold"
                            }} onPress={() => setIsCashActive(true)} flex={1}>{t('cash')}</Button>
                        <Button _pressed={{ _text: { fontSize: "md" } }} borderWidth={1} borderColor={"#7f8183"} shadow={"7"} variant={"unstyled"} borderRadius={15} _dark={{ bg: "#1e1f21" }} _light={{ bg: "#ffffff" }}
                            p={1} _text={{
                                fontSize: "lg", _dark: { color: "white" },
                                _light: { color: "black" }, fontWeight: "semibold"
                            }} onPress={() => setIsCashActive(false)} flex={1}>{t('card')}</Button>
                        <Button _pressed={{ _text: { fontSize: "md" } }} borderWidth={1} borderColor={"#7f8183"} shadow={"7"} variant={"unstyled"} borderRadius={15} _dark={{ bg: "#1e1f21" }} _light={{ bg: "#ffffff" }}
                            p={1} _text={{
                                fontSize: "lg", _dark: { color: "white" },
                                _light: { color: "black" }, fontWeight: "semibold"
                            }} onPress={handleSubtotal} flex={1}>{t('subtotal')}</Button>
                    </VStack>
                    <Box alignItems={"center"} flex={2}>
                        <NumberPad contentXtra={"."} onPress={handleNumPad} />
                    </Box>
                </HStack>
                <VStack flex={8}>
                    <HStack space={4} alignItems={"center"} justifyContent={"space-between"} flex={2}>
                        <Button flex={1} _text={{ fontSize: "md", fontWeight: "semibold" }} onPress={handleDeletePaying} colorScheme={"danger"}>{t('delete all')}</Button>
                        <Heading flex={1} fontSize={"lg"}>
                            {t('bill details')}
                        </Heading>
                        <Button _text={{ fontSize: "md", fontWeight: "semibold" }} onPress={handlePaymentModal} disabled={isPaymentDisabled} colorScheme={isPaymentDisabled ? "muted" : "success"} flex={1}>{t('get payment')}</Button>
                    </HStack>
                    {hasCreditCardChange && <Box alignItems={"center"}>
                        <Text fontSize={"lg"} color={"danger.700"} bold>{t('warning payment')}</Text>
                    </Box>}
                    <Divider borderColor={"#7f8183"} thickness="3" orientation="horizontal" />
                    <HStack flex={1} justifyContent={"space-between"}>
                        <Text fontSize={"xl"}>{t('cash')} {t('paying')}: </Text>
                        <Text fontSize={"xl"}>{parseFloat(cashPaying).toFixed(2)} ₺</Text>
                        {cashPaid !== "0" && <HStack>
                            <Text fontSize={"xl"}>{t('paid')}: </Text>
                            <Text fontSize={"xl"}>{parseFloat(cashPaid).toFixed(2)} ₺</Text>
                        </HStack>}
                    </HStack>
                    <HStack flex={1} justifyContent={"space-between"}>
                        <Text fontSize={"xl"}>{t('card')} {t('paying')}: </Text>
                        <Text fontSize={"xl"}>{parseFloat(cardPaying).toFixed(2)} ₺</Text>
                        {cardPaid !== "0" && <HStack>
                            <Text fontSize={"xl"}>{t('paid')}: </Text>
                            <Text fontSize={"xl"}>{parseFloat(cardPaid).toFixed(2)} ₺</Text>
                        </HStack>}
                    </HStack>
                    {change !== "0" && <HStack flex={1} justifyContent={"space-between"}>
                        <Text fontSize={"xl"}>{t('change given')}: </Text>
                        <Text fontSize={"xl"}>{parseFloat(change).toFixed(2)} ₺</Text>
                    </HStack>}
                    <HStack flex={1} justifyContent={"space-between"}>
                        <Text fontSize={"xl"}>{t('total')} {t('paid')}: </Text>
                        <Text fontSize={"xl"}>{parseFloat(totalPaid).toFixed(2)} ₺</Text>
                    </HStack>
                    <HStack flex={1} justifyContent={"space-between"}>
                        <Text fontSize={"xl"}>{t('remaining')} {t('payment')}: </Text>
                        <Text fontSize={"xl"}>{parseFloat(remaining).toFixed(2)} ₺</Text>
                    </HStack>
                </VStack>
            </VStack>
            <CustomModal button2={t('cancel')} header={t('subtotal')} isOpen={isSubtotalModalActive} setIsOpen={setIsSubtotalModalActive}>
                <HStack space={2}>
                    <Button disabled={totalPaid >= amountDue} colorScheme={(totalPaid >= amountDue) ? "muted" : "success"} variant={"outline"} onPress={handleFullyCard} flex={1}>{t('pay fully by card')}</Button>
                    <Button disabled={totalPaid >= amountDue} colorScheme={(totalPaid >= amountDue) ? "muted" : "success"} onPress={handleFullyCash} flex={1}>{t('pay fully by cash')}</Button>
                </HStack>
            </CustomModal>
            <CustomModal button2={t('cancel')} header={t('select payment type')} isOpen={isPaymentModalActive} setIsOpen={setIsPaymentModalActive}>
                <HStack space={2}>
                    <Button disabled={!hasCard} colorScheme={hasCard ? "success" : "muted"} variant={"outline"} onPress={handlePaymentCard} flex={1}>{t('pay by card')}</Button>
                    <Button disabled={!hasCash} colorScheme={hasCash ? "success" : "muted"} onPress={handlePaymentCash} flex={1}>{t('pay by cash')}</Button>
                </HStack>
            </CustomModal>
            <CustomModal button2={t('cancel')} header={t('finish document')} isOpen={isFinishModalActive} setIsOpen={setIsFinishModalActive}>
                <HStack space={2}>
                    <Button disabled={mail === ""} colorScheme={mail === "" ? "muted" : "success"} variant={"outline"} onPress={() => handleReceipt(true)} flex={1}>{t('email and finish')}</Button>
                    <Button disabled={isFinishedDocument} colorScheme={"success"} onPress={() => handleReceipt(false)} flex={1}>{t('finish document')}</Button>
                </HStack>
            </CustomModal>
            <CustomModal buttonConfirm={handleSavingReceipt} button2={t('save')} header={t('receipt')} isOpen={isReceiptModalOpen} setIsOpen={setIsReceiptModalOpen}>
                {receiptData && <Receipt receiptData={receiptData} />}
            </CustomModal>
        </Box>
    )
}

export default PaymentFinalize;



