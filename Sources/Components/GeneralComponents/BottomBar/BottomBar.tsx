import React, { useState } from 'react'
import { Box, Divider, HStack, Text, useColorMode } from 'native-base'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useMarket } from '../../../context/MarketContext'
import packageJson from '../../../../package.json';
import { useData } from '../../../context/DataContext';
import { useTranslation } from 'react-i18next';

const BottomBar = () => {
    const { serverStatus } = useMarket()
    const { inUser }: any = useData()
    const { t, i18n } = useTranslation();

    const { colorMode } = useColorMode()

    return (
        <Box _dark={{
            bg: "#1e1f21"
        }} _light={{
            bg: "#ffffff"
        }} zIndex={99} position={"absolute"} bottom={0} justifyContent={"center"} w={"100%"} height={"6%"}>
            <HStack alignItems={"center"} justifyContent={"space-around"}>
                <HStack alignItems={"center"}>
                    <Icon name='circle' size={20} color={serverStatus ? "green" : "red"} />
                    <Text fontSize={"2xl"}>  {t('shop')} {serverStatus ? t('online') : t('offline')}</Text>
                </HStack>
                <HStack alignItems={"center"}>
                    <Icon name='cart-outline' size={25} color={colorMode === "dark" ? "#7f8183" : "black"} />
                    <Text fontSize={"2xl"}>  {t('register no')}: {1}</Text>
                </HStack>
                <HStack alignItems={"center"}>
                    <Icon name='store' size={25} color={colorMode === "dark" ? "#7f8183" : "black"} />
                    <Text fontSize={"2xl"}>  {t('shop')}: {4230}</Text>
                </HStack>
                <HStack alignItems={"center"}>
                    <Icon name='publish' size={25} color={colorMode === "dark" ? "#7f8183" : "black"} />
                    <Text fontSize={"2xl"}>  {t('version')}: {packageJson.version}</Text>
                </HStack>
                <HStack alignItems={"center"}>
                    <Icon name='account' size={25} color={colorMode === "dark" ? "#7f8183" : "black"} />
                    <Text fontSize={"2xl"}>   {t('cashier')}: {inUser?.name ?? "Anonymus"} {inUser?.surname ?? "Anonymus"}</Text>
                </HStack>
            </HStack>
        </Box>
    )
}

export default BottomBar