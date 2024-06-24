import React, { useEffect, useState } from 'react';
import { Box, Center, HStack, Pressable, Heading, Button, VStack, Badge, Text, FlatList, Divider, Menu, useColorMode, Modal } from 'native-base';
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { useMarket } from '../../context/MarketContext';
import CustomModal from '../../Components/Payment/CustomModal';
import Receipt from '../../Components/Payment/Receipt';
import { createPDF } from '../../Functions/CreatePDF';
import { generateReceiptHTML } from '../../Functions/GenerateHtml';
import { useData } from '../../context/DataContext';
import axios from 'axios';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Icon2 from "react-native-vector-icons/MaterialIcons"
import TopBar from '../../Components/GeneralComponents/TopBar';
import BottomBar from '../../Components/GeneralComponents/BottomBar';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import LogoLoading from '../../Components/GeneralComponents/LottieComponents/LogoLoading';

const testHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            color: #333;
        }
        p {
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <h1>Test Document</h1>
    <p>
        This is a test document to verify the PDF printing functionality in React Native. This document contains a title and several paragraphs of text. The goal is to ensure that the formatting, including the headings and paragraph styles, are accurately represented in the generated PDF.
    </p>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium, nisi et aliquam convallis, est libero hendrerit massa, sed varius orci magna et elit. Vivamus faucibus sapien at ligula consequat, nec volutpat justo ultricies.
    </p>
    <p>
        Phasellus bibendum velit a sapien cursus, a pulvinar lectus consectetur. Duis vel lacinia massa. Donec dictum, eros nec aliquet hendrerit, mauris nulla cursus enim, non aliquet metus nulla sed justo.
    </p>
    <p>
        Thank you for testing the PDF printing functionality with this sample text.
    </p>
</body>
</html>
`

const { width, height } = Dimensions.get("window");

const ReportsScreen = () => {

    const [language, setLanguage] = useState('en');
    const [loading, setLoading] = useState(false)

    const { t, i18n } = useTranslation();

    const {
        colorMode,
        toggleColorMode
    } = useColorMode()

    useEffect(() => {
        setLanguage(i18next.language)
    }, [i18next.language])


    useEffect(() => {
        setLoading(false)
        console.log("changed color mode to: " + colorMode)
    }, [colorMode])

    const saveLangToLocal = async (lng: any) => {
        await AsyncStorage.setItem('Language', lng)
    }

    const changeLanguage = async (lng: any) => {
        i18n.changeLanguage(lng).then(() => setLoading(false));
        setLanguage(lng);
        saveLangToLocal(lng)
    };

    const handleTest = () => {
        createPDF(testHtml, false, t)
    }

    const handleColor = () => {
        setLoading(true)
        toggleColorMode()
    }

    return (<>
        <Box flex={1}>
            <TopBar />
            <Box _dark={{
                bg: "#141615"
            }} _light={{
                bg: "#eff3f6"
            }} h={"90%"} top={10} justifyContent={"center"}>
                <Center mb={5} flex={1}>
                    <Heading pb={5} fontSize={"4xl"}>
                        {t('settings')}
                    </Heading>
                    <Box
                        _dark={{
                            bg: "#1e1f21"
                        }} _light={{
                            bg: "#ffffff"
                        }} shadow={"5"} height={height / 1.5} borderRadius={15} width={width / 1.5} >
                        <VStack flex={1} >
                            <HStack alignItems={"center"} justifyContent={"space-evenly"} flex={1}>
                                <Button onPress={handleTest} _pressed={{ borderColor: colorMode === "dark" ? "blueGray.400" : "warmGray.100" }} borderWidth={1} borderColor={"#7f8183"}
                                    shadow={"7"} variant={"unstyled"} borderRadius={15}
                                    p={1} _dark={{ bg: "#14141a" }} _light={{ bg: "#ffffff" }} h={'50%'} w={'40%'}>
                                    <HStack ml={-6} space={6} alignItems={"center"}>
                                        <Icon size={30} name='printer-outline' color={colorMode === "dark" ? "white" : "black"} />
                                        <Text fontSize={"2xl"}>{t('printer test')}</Text>
                                    </HStack>
                                </Button>
                                <Menu placement='bottom' trigger={triggerProps => {
                                    return (<Button {...triggerProps} _pressed={{ borderColor: colorMode === "dark" ? "blueGray.400" : "warmGray.100" }} borderWidth={1} borderColor={"#7f8183"}
                                        shadow={"7"} variant={"unstyled"} borderRadius={15}
                                        p={1} _dark={{ bg: "#14141a" }} _light={{ bg: "#ffffff" }} h={'50%'} w={'40%'}>
                                        <HStack ml={-6} space={6} alignItems={"center"}>
                                            <Icon2 size={30} name='translate' color={colorMode === "dark" ? "white" : "black"} />
                                            <Text fontSize={"2xl"}>{t('language')}</Text>
                                        </HStack>
                                    </Button>);
                                }}>
                                    {!(language === 'en') && <Menu.Item onTouchStart={() => setLoading(true)} onTouchMove={() => setLoading(false)} onPress={() => changeLanguage('en')} isDisabled={language === 'en'}>English</Menu.Item>}
                                    {!(language === 'tr') && <Menu.Item onTouchStart={() => setLoading(true)} onTouchMove={() => setLoading(false)} onPress={() => changeLanguage('tr')} isDisabled={language === 'tr'}>Turkce</Menu.Item>}
                                    {!(language === 'de') && <Menu.Item onTouchStart={() => setLoading(true)} onTouchMove={() => setLoading(false)} onPress={() => changeLanguage('de')} isDisabled={language === 'de'}>Deutsch</Menu.Item>}
                                </Menu>
                            </HStack>
                            <HStack alignItems={"center"} justifyContent={"space-evenly"} flex={1}>
                                <Button isDisabled={loading} _pressed={{ borderColor: colorMode === "dark" ? "orange.300" : "warmGray.100" }} borderWidth={2} borderColor={colorMode === "dark" ? "orange.400" : "black"}
                                    shadow={"7"} variant={"unstyled"} borderRadius={15}
                                    p={1} _dark={{ bg: "#14141a" }} _light={{ bg: "#ffffff" }} h={'50%'} w={'40%'} onPress={() => { handleColor(); }}  >
                                    <HStack alignItems={"center"} ml={-6} space={6}>
                                        <Icon2 color={colorMode === "dark" ? "orange" : "black"} size={30} name={colorMode === "dark" ? 'light-mode' : 'dark-mode'} />
                                        <Text fontSize={"2xl"}>{colorMode === "dark" ? t('light') : t('dark')}</Text>
                                    </HStack>
                                </Button>
                                <Button _pressed={{ borderColor: colorMode === "dark" ? "blueGray.400" : "warmGray.100" }} borderWidth={1} borderColor={"#7f8183"}
                                    shadow={"7"} variant={"unstyled"} borderRadius={15}
                                    p={1} _dark={{ bg: "#14141a" }} _light={{ bg: "#ffffff" }} h={'50%'} w={'40%'} _text={{ fontSize: "2xl" }}>
                                    <HStack alignItems={"center"} space={3}>
                                        <Icon size={30} name={"cog-outline"} color={colorMode === "dark" ? "white" : "black"} />
                                        <Text fontSize={"2xl"}>{t('configuration')}</Text>
                                    </HStack>
                                </Button>
                            </HStack>
                            <HStack alignItems={"center"} justifyContent={"space-evenly"} flex={1}>
                                <Button _pressed={{ borderColor: colorMode === "dark" ? "blueGray.400" : "warmGray.100" }} borderWidth={1} borderColor={"#7f8183"}
                                    shadow={"7"} variant={"unstyled"} borderRadius={15}
                                    p={1} _dark={{ bg: "#14141a" }} _light={{ bg: "#ffffff" }} h={'50%'} w={'40%'} _text={{ fontSize: "2xl" }}>
                                    <HStack ml={-6} space={6} alignItems={"center"}>
                                        <Icon size={30} name='printer-pos' color={colorMode === "dark" ? "white" : "black"} />
                                        <Text fontSize={"2xl"}>Ingenico</Text>
                                    </HStack>
                                </Button>
                                <Button _pressed={{ borderColor: colorMode === "dark" ? "blueGray.400" : "warmGray.100" }} borderWidth={1} borderColor={"#7f8183"}
                                    shadow={"7"} variant={"unstyled"} borderRadius={15}
                                    p={1} _dark={{ bg: "#14141a" }} _light={{ bg: "#ffffff" }} h={'50%'} w={'40%'} _text={{ fontSize: "2xl" }}>
                                    <HStack ml={-6} space={6} alignItems={"center"}>
                                        <Icon size={30} name='receipt' color={colorMode === "dark" ? "white" : "black"} />
                                        <Text fontSize={"2xl"}>{t('operations')}</Text>
                                    </HStack>
                                </Button>
                            </HStack>
                        </VStack>
                    </Box>
                </Center>
            </Box >
            <BottomBar />
        </Box >
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

export default ReportsScreen;
