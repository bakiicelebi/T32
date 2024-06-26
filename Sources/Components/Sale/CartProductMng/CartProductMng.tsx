import {  Button, HStack, Text, useColorMode } from 'native-base'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const CartProductMng = ({ productCount, setProductCount }: any) => {

    const [isDisabled, setIsDisabled] = useState(true)
    const { t, i18n } = useTranslation()

    const {
        colorMode
    } = useColorMode()

    const handleAdding = () => {
        setProductCount(productCount + 1)
        setIsDisabled(false)
    }

    const handleRemoving = () => {
        if (productCount >= 2) {
            setProductCount(productCount - 1)
        }
        if (productCount === 1) {
            setIsDisabled(true)
        }
    }

    return (
        <HStack alignItems={"center"} borderWidth={1} _dark={{ borderColor: "#7f8183" }} borderRadius={10} mr={4}>
            <Button disabled={isDisabled} onPress={handleRemoving} backgroundColor={"0"}>
                <MaterialCommunityIcons name='minus-thick' color={colorMode === "dark" ? "#7f8183" : "black"} />
            </Button>
            <Text fontSize={"md"} fontWeight={"bold"}>{productCount} {t('pcs')}</Text>
            <Button variant={"unstyled"} _dark={{ bg: "blueGray.800" }} _light={{ bg: "blueGray.400" }} onPress={handleAdding} ml={3} borderRadius={10}>
                <MaterialCommunityIcons name='plus-thick' color={colorMode === "dark" ? "#7f8183" : "black"} />
            </Button>
        </HStack>
    )
}

export default CartProductMng