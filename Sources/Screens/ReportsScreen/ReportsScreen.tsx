import React, { useEffect, useState } from 'react';
import { Box, Center, HStack, Heading, Button, VStack, Badge, Text, FlatList, Divider, useColorMode } from 'native-base';
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { useMarket } from '../../context/MarketContext';
import CustomModal from '../../Components/Payment/CustomModal';
import Receipt from '../../Components/Payment/Receipt';
import { createPDF } from '../../Functions/CreatePDF';
import { generateReceiptHTML } from '../../Functions/GenerateHtml';
import { useData } from '../../context/DataContext';
import TopBar from '../../Components/GeneralComponents/TopBar';
import BottomBar from '../../Components/GeneralComponents/BottomBar';
import { useTranslation } from 'react-i18next';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get("window");

const ReportsScreen = () => {
    const [isReceiptsModalOpen, setIsReceiptsModalOpen] = useState(false);
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState([]);
    const [isCampaignsModalOpen, setIsCampaignsModalOpen] = useState(false);
    const [unsentReceiptsCount, setUnsentReceiptsCount] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [wrongAttempts, setWrongAttempts] = useState<any[]>([])
    const [wrongAttemptsCount, setWrongAttemptsCount] = useState(0)

    const { salesCount, receipts, serverStatus, getUnsentReceiptsCount, synchronizeReceipts, clearReceipts } = useMarket();
    const { campaignsState, inUser }: any = useData()
    const { wrongLogins, loadWrongLogins, clearWrongLogins } = useMarket()
    const { t, i18n } = useTranslation()

    const {
        colorMode
    } = useColorMode()

    useEffect(() => {
        getWrongLogins()
    }, [wrongLogins])


    useEffect(() => {
        const count = getUnsentReceiptsCount()
        setUnsentReceiptsCount(count)
        loadWrongLogins()
    }, [])

    const getWrongLogins = async () => {
        const storedWrongLogins = await AsyncStorage.getItem('wrongLogins');
        if (storedWrongLogins) {
            setWrongAttempts(JSON.parse(storedWrongLogins));
            setWrongAttemptsCount(wrongAttempts.length)
        }
        else {
            setWrongAttempts([])
            setWrongAttemptsCount(0)
        }
    }

    const handleClearAttempts = () => {
        clearWrongLogins()
        getWrongLogins()
    }

    const handleZReport = () => {
        Alert.alert(t('Z report request'), t('sure you want to get Z report'), [
            {

                text: 'Cancel',
                onPress: () => { console.log('Cancel Pressed'); },
                style: 'cancel',
            },
            {

                text: 'Yes', onPress: () => {
                    console.log('Yes Pressed');
                    handleZReportPrint()
                }
            }]);
    };

    const handleZReportPrint = async () => {
        const aggregatedReceipt: any = {
            saleNo: 0,
            totalReceived: 0,
            totalTaxes: 0,
            discount: 0,
            cardPayment: 0,
            cashPayment: 0,
            grandTotal: 0,
            changeGiven: 0,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            cashier: inUser.name + " " + inUser.surname
        };
    
        receipts.forEach(receipt => {
            aggregatedReceipt.saleNo = receipt.saleNo;
            aggregatedReceipt.totalReceived += receipt.totalReceived;
            aggregatedReceipt.totalTaxes += receipt.totalTaxes;
            aggregatedReceipt.discount += receipt.discount;
            aggregatedReceipt.changeGiven += receipt.changeGiven;
            aggregatedReceipt.cardPayment += receipt.cardPayment;
            aggregatedReceipt.cashPayment += receipt.cashPayment;
            aggregatedReceipt.grandTotal += receipt.grandTotal;
        });
    
        aggregatedReceipt.totalReceived = Number(aggregatedReceipt.totalReceived.toFixed(2));
        aggregatedReceipt.totalTaxes = Number(aggregatedReceipt.totalTaxes.toFixed(2));
        aggregatedReceipt.discount = Number(aggregatedReceipt.discount.toFixed(2));
        aggregatedReceipt.cardPayment = Number(aggregatedReceipt.cardPayment.toFixed(2));
        aggregatedReceipt.cashPayment = Number(aggregatedReceipt.cashPayment.toFixed(2));
        aggregatedReceipt.grandTotal = Number(aggregatedReceipt.grandTotal.toFixed(2));
    
        setSelectedReceipt(aggregatedReceipt);
        const pdfContent = generateReceiptHTML(aggregatedReceipt, true, t);
        await createPDF(pdfContent, true, t).then(() => clearReceipts());
    };
    

    const handleReceipts = () => {
        setIsReceiptsModalOpen(true);
    };

    const sendUnsentReports = () => {
        if (!serverStatus) {
            Alert.alert(t("synchronization receipts"), t("please connect before synchronization"))
        }
        else {
            synchronizeReceipts().then(() => {
                const count = getUnsentReceiptsCount()
                setUnsentReceiptsCount(count)
            })
        }

    };

    const handleSavePDF = async () => {
        const pdfContent = generateReceiptHTML(selectedReceipt, false, t);
        await createPDF(pdfContent, false, t);
    };

    const displayReceipt = (receipt: any) => {
        setSelectedReceipt(receipt);
        setIsReceiptModalOpen(true);
    };

    const handleCampaigns = () => {
        setIsCampaignsModalOpen(true)
    }

    const renderCampaigns = ({ item }: any) => (
        <Box m={5}>
            <Box mb={3} justifyContent={"space-between"} flex={1}>
                <Heading fontSize={"2xl"} flex={1}>{item.name}</Heading>
                <Text alignSelf={"center"} fontSize={"xl"} >{item.description}</Text>
            </Box>
            <Divider />
        </Box>
    )

    const renderReceipts = ({ item }: any) => (
        <Box m={5}>
            <HStack alignItems={"center"} space={5} justifyContent={"space-between"} flex={1}>
                <Text flex={1}>{t('sale')} {item.saleNo}</Text>
                <Button onPress={() => displayReceipt(item)} flex={3}>
                    <Text color={"white"}>{t('receipt')} {item.saleNo} {"("}{item.time}{")"}</Text>
                </Button>
            </HStack>
        </Box>
    );

    const renderWrongAttemps = ({ item }: any) => {
        return (
            <Box p={3} borderRadius={15} borderColor={"#515557"} m={1} borderWidth={1}>
                <HStack mr={5} ml={5} flex={1} justifyContent={"space-between"}>
                    <Text fontSize={"lg"}>{item.date}</Text>
                    <Text fontSize={"lg"}>{item.time}</Text>
                </HStack>
                <Box mt={2} mb={2} borderWidth={1} bg={"#515557"} borderStyle={"dashed"} />
                <Text textAlign={"center"}>{item.reason}</Text>
                <Box mt={2} mb={2} borderWidth={1} bg={"#515557"} borderStyle={"dashed"} />
                <HStack mr={5} ml={5} flex={1} justifyContent={"space-between"}>
                    <Text fontSize={"lg"}>{t('user code')}: {item.userCode}</Text>
                    <Text fontSize={"lg"}>{t('password')}:{item.password}</Text>
                </HStack>
            </Box>
        )
    }

    return (
        <>
            <Box flex={1}>
                <TopBar />
                <Box _dark={{
                    bg: "#141615"
                }} _light={{
                    bg: "#eff3f6"
                }} h={"90%"} top={10} justifyContent={"center"}>
                    <Center mb={5} flex={1}>
                        <Heading pb={1} fontSize={"4xl"}>
                            {t('reports')}
                        </Heading>
                        <Box _dark={{
                            bg: "#1e1f21"
                        }} _light={{
                            bg: "#ffffff"
                        }} shadow={"5"} height={height / 1.5} borderRadius={15} width={width / 1.5} >
                            <VStack flex={1} >
                                <HStack alignItems={"center"} justifyContent={"space-evenly"} flex={1}>
                                    <Box h={'50%'} w={'40%'}>
                                        <Badge
                                            rounded="full" mb={-4} mr={-4} zIndex={5} variant="solid" alignSelf="flex-end" _text={{ fontSize: 20, m: 1 }}>
                                            {salesCount}
                                        </Badge>
                                        <Button _pressed={{ borderColor: colorMode === "dark" ? "blueGray.400" : "warmGray.100" }} borderWidth={1} borderColor={"#7f8183"}
                                            shadow={"7"} variant={"unstyled"} borderRadius={15}
                                            p={1} _dark={{ bg: "#14141a" }} _light={{ bg: "#ffffff" }} onPress={handleReceipts} style={StyleSheet.absoluteFill} flex={1} >
                                            <HStack alignItems={"center"} space={3}>
                                                <Icon size={30} name={"receipt"} color={colorMode === "dark" ? "white" : "black"} />
                                                <Text fontSize={"2xl"}>{t('receipts')}</Text>
                                            </HStack>
                                        </Button>
                                    </Box>
                                    <Button h={'50%'} w={'40%'} _pressed={{ borderColor: colorMode === "dark" ? "blueGray.400" : "warmGray.100" }} borderWidth={1} borderColor={"#7f8183"}
                                        shadow={"7"} variant={"unstyled"} borderRadius={15}
                                        p={1} _dark={{ bg: "#14141a" }} _light={{ bg: "#ffffff" }} >
                                        <HStack alignItems={"center"} space={3}>
                                            <Icon size={30} name={"alpha-x-circle-outline"} color={colorMode === "dark" ? "white" : "black"} />
                                            <Text fontSize={"2xl"}>{t('X report')}</Text>
                                        </HStack>
                                    </Button>
                                </HStack>
                                <HStack alignItems={"center"} justifyContent={"space-evenly"} flex={1}>
                                    <Box h={'50%'} w={'40%'}>
                                        <Badge
                                            rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{ fontSize: 20, m: 1 }}>
                                            {unsentReceiptsCount}
                                        </Badge>
                                        <Button _pressed={{ borderColor: colorMode === "dark" ? "blueGray.400" : "warmGray.100" }} borderWidth={1} borderColor={"#7f8183"}
                                            shadow={"7"} variant={"unstyled"} borderRadius={15}
                                            p={1} _dark={{ bg: "#14141a" }} _light={{ bg: "#ffffff" }} onPress={sendUnsentReports} style={StyleSheet.absoluteFill} flex={1} _text={{ fontSize: "2xl" }}>
                                            <HStack alignItems={"center"} space={3}>
                                                <Icon size={30} name={"autorenew"} color={colorMode === "dark" ? "white" : "black"} />
                                                <Text fontSize={"2xl"}>{t('unsent reports')}</Text>
                                            </HStack>
                                        </Button>
                                    </Box>
                                    <Button _pressed={{ borderColor: colorMode === "dark" ? "blueGray.400" : "warmGray.100" }} borderWidth={1} borderColor={"#7f8183"}
                                        shadow={"7"} variant={"unstyled"} borderRadius={15}
                                        p={1} _dark={{ bg: "#14141a" }} _light={{ bg: "#ffffff" }} onPress={handleZReport} h={'50%'} w={'40%'} _text={{ fontSize: "2xl" }}>
                                        <HStack alignItems={"center"} space={3}>
                                            <Icon size={30} name={"alpha-z-circle-outline"} color={colorMode === "dark" ? "white" : "black"} />
                                            <Text fontSize={"2xl"}>{t('Z report')}</Text>
                                        </HStack>
                                    </Button>
                                </HStack>
                                <HStack alignItems={"center"} justifyContent={"space-evenly"} flex={1}>
                                    <Box h={'50%'} w={'40%'}>
                                        <Badge
                                            rounded="full" mb={-4} mr={-4} zIndex={5} variant="solid" alignSelf="flex-end" _text={{ fontSize: 20, m: 1 }}>
                                            {wrongAttemptsCount}
                                        </Badge>
                                        <Button _pressed={{ borderColor: colorMode === "dark" ? "blueGray.400" : "warmGray.100" }} borderWidth={1} borderColor={"#7f8183"}
                                            shadow={"7"} variant={"unstyled"} borderRadius={15}
                                            p={1} _dark={{ bg: "#14141a" }} _light={{ bg: "#ffffff" }} onPress={() => setModalVisible(true)} style={StyleSheet.absoluteFill} flex={1} >
                                            <HStack alignItems={"center"} space={3}>
                                                <Icon size={30} name={"alert-circle-outline"} color={colorMode === "dark" ? "white" : "black"} />
                                                <Text fontSize={"2xl"}>{t('wrong attempts')}</Text>
                                            </HStack>
                                        </Button>
                                    </Box>
                                    <Button h={'50%'} w={'40%'} _pressed={{ borderColor: colorMode === "dark" ? "blueGray.400" : "warmGray.100" }} borderWidth={1} borderColor={"#7f8183"}
                                        shadow={"7"} variant={"unstyled"} borderRadius={15}
                                        p={1} _dark={{ bg: "#14141a" }} _light={{ bg: "#ffffff" }} onPress={handleCampaigns} _text={{ fontSize: "2xl" }}>
                                        <HStack alignItems={"center"} space={3}>
                                            <Icon size={30} name={"format-list-checkbox"} color={colorMode === "dark" ? "white" : "black"} />
                                            <Text fontSize={"2xl"}>{t('campaigns list')}</Text>
                                        </HStack>
                                    </Button>
                                </HStack>
                            </VStack>
                        </Box>
                    </Center>
                </Box>
                <BottomBar />
            </Box>
            <CustomModal button2={t('cancel')} header={t("today's receipts")} isOpen={isReceiptsModalOpen} setIsOpen={setIsReceiptsModalOpen}>
                {receipts.length ? <FlatList data={receipts} renderItem={renderReceipts} keyExtractor={item => item.saleNo} /> : <Text fontSize={20} textAlign={"center"}>{t('no receipt')}</Text>}
            </CustomModal>
            <CustomModal buttonConfirm={handleSavePDF} button2={t('save as pdf')} header={t('receipts')} isOpen={isReceiptModalOpen} setIsOpen={setIsReceiptModalOpen}>
                {selectedReceipt && <Receipt receiptData={selectedReceipt} />}
            </CustomModal>
            <CustomModal button2={t('cancel')} header={t('campaigns')} isOpen={isCampaignsModalOpen} setIsOpen={setIsCampaignsModalOpen}>
                <FlatList data={campaignsState} renderItem={renderCampaigns} keyExtractor={(item: any) => item.id} />
            </CustomModal>
            <CustomModal button1={t('cancel')} buttonConfirm={handleClearAttempts} button2={t('clear')} header={t('wrong attempts')} isOpen={modalVisible} setIsOpen={setModalVisible}>
                {wrongAttempts.length ? <FlatList data={wrongAttempts} renderItem={renderWrongAttemps} keyExtractor={(item: any, index: any) => index} /> : <Text fontSize={20} textAlign={"center"}>0 {t('wrong attempts')}</Text>}
            </CustomModal>
        </>
    );
};

export default ReportsScreen;
