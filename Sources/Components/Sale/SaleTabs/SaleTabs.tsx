import { Box, HStack, Text, Pressable, useColorMode, Modal } from 'native-base'
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import LogoLoading from '../../GeneralComponents/LottieComponents/LogoLoading';

const SaleTabs = ({ tabNumber, no, nav, decTabs, openTabs, setSelectedSale, selectedSale }: any) => {

    const [loading, setLoading] = useState(false)

    const { t, i18n } = useTranslation()
    const isSelectedSaleTab = (index: any) => {
        return index === selectedSale;
    }

    useEffect(() => {
        setLoading(false)
    }, [selectedSale])

    useEffect(() => {
        setLoading(false)
    }, [tabNumber])

    const {
        colorMode
    } = useColorMode()

    return (<>
        <Pressable onTouchStart={() => { if (!isSelectedSaleTab(no)) { setLoading(true) } }} onTouchMove={() => setLoading(false)} borderRadius={10} shadow={"8"} mr={3} _dark={{
            bg: isSelectedSaleTab(no) ? "blueGray.800" : "#1e1f21"
        }} _light={{
            bg: isSelectedSaleTab(no) ? "blueGray.400" : "#ffffff"
        }} onPress={() => { setSelectedSale(no); console.log(selectedSale); nav.navigate(`Sale${openTabs[no - 1]}`) }}>
            <HStack space={3} justifyContent={"space-between"} alignItems={"center"} p={3} py={2}>
                <Text style={{ fontSize: 20 }}>{t('sale')} {no}</Text>
                {tabNumber > 1 && <Pressable onTouchStart={() => setLoading(true)} onTouchMove={() => setLoading(false)} onPress={() => decTabs(openTabs[no - 1])}>
                    <Icon color={colorMode === "dark" ? "#7f8183" : "black"} size={23} name='close' />
                </Pressable>}
            </HStack>
        </Pressable >
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
    )
}

export default SaleTabs;