import React, { useEffect, useState } from 'react'
import { Pressable, Switch } from 'react-native'
import { Box, Center, Divider, HStack, Image, Menu, Modal, Spinner, Text, useColorMode, VStack } from 'native-base'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Icon2 from "react-native-vector-icons/MaterialIcons"
import OnlinePeople from '../../Home/OnlinePeople'
import { useData } from '../../../context/DataContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import i18n from '../../../context/Translate/i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'
import i18next from 'i18next'
import LogoLoading from '../LottieComponents/LogoLoading'

const TopBar = () => {

    const { fetchData, fetchAll, fetchCampaigns, fetchRoutes, fetchUsers, fetchCategories } = useData()
    const [isShopOnline, setIsShopOnline] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [language, setLanguage] = useState('en');


    const { t, i18n } = useTranslation();

    const route = useRoute()

    useEffect(() => {
        if (route.name === "HomeScreen") {
            setIsDisabled(false)
        }
        else{
            setIsDisabled(true)
        }
    }, [route.name])

    const navigation = useNavigation()

    const {
        colorMode,
        toggleColorMode,
    } = useColorMode();

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


    const color = isDisabled
        ? 'red'
        : (colorMode === 'dark' ? '#7f8183' : 'black');

    const handleNavigateHome = () => {
        //@ts-ignore
        navigation.navigate("HomeScreen")

    }

    const handleFetch = async () => {
        setLoading2(true)
        await fetchDatas().then(() => setLoading2(false))
        console.log("Updated Data")
    }

    const fetchDatas = async () => {
        await fetchData();
        await fetchAll();
        await fetchCampaigns();
        await fetchRoutes();
        await fetchUsers();
        await fetchCategories();
    }

    const handleColor = () => {
        setLoading(true)
        toggleColorMode()
    }


    return (
        <>
            <Box _dark={{
                bg: "#1e1f21"
            }} _light={{
                bg: "#ffffff"
            }} position={"absolute"} zIndex={999} top={0} justifyContent={"center"} w={"100%"} height={"7%"}>
                <HStack flex={1} alignItems={"center"} justifyContent={"space-between"}  >
                    <HStack ml={15} alignItems={"center"} >
                        <Image alt='T32Logo' maxW={65} resizeMode='contain' maxH={65} source={require("../../../assets/Images/ayrilan.png")} />
                        <Text ml={5} fontWeight={"bold"} fontSize={"2xl"}>T32 GROCERY</Text>
                    </HStack>
                    <HStack alignItems={"center"} justifyContent={"flex-end"} pr={22} space={10}>
                        <Pressable onPress={handleNavigateHome}>
                            <Icon color={colorMode === "dark" ? "#7f8183" : "black"} name='home-outline' size={30} />
                        </Pressable>
                        <Pressable disabled={isDisabled} onPress={handleFetch}>
                            <Icon color={color} name='tray-arrow-down' size={30} />
                        </Pressable>
                        <HStack alignItems={"center"}>
                            <Menu placement='bottom' trigger={triggerProps => {
                                return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                    <Icon2 color={colorMode === "dark" ? "#7f8183" : "black"} size={30} name='translate' />
                                </Pressable>;
                            }}>
                                {!(language === 'en') && <Menu.Item onTouchStart={() => setLoading(true)} onTouchMove={() => setLoading(false)} onPress={() => changeLanguage('en')} isDisabled={language === 'en'}>English</Menu.Item>}
                                {!(language === 'tr') && <Menu.Item onTouchStart={() => setLoading(true)} onTouchMove={() => setLoading(false)} onPress={() => changeLanguage('tr')} isDisabled={language === 'tr'}>Türkçe</Menu.Item>}
                                {!(language === 'de') && <Menu.Item onTouchStart={() => setLoading(true)} onTouchMove={() => setLoading(false)} onPress={() => changeLanguage('de')} isDisabled={language === 'de'}>Deutsch</Menu.Item>}
                            </Menu>
                        </HStack>
                        <Pressable disabled={loading} onPress={() => { handleColor(); }}>
                            <Icon2 color={colorMode === "dark" ? "orange" : "black"} size={30} name={colorMode === "dark" ? 'light-mode' : 'dark-mode'} />
                        </Pressable>
                        <OnlinePeople />
                    </HStack>


                </HStack>
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
            <Modal isOpen={loading2} onClose={() => { }}>
                <Box borderRadius={15} _dark={{
                    bg: "#1e1f21"
                }} _light={{
                    bg: "#ffffff"
                }} w={100} h={100}>
                    <LogoLoading />
                    <Text>Data Fetching...</Text>
                </Box>
            </Modal>
        </>
    )
}

export default TopBar