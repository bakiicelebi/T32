import React from 'react';
import { Box, HStack, Text, Pressable, useColorMode } from 'native-base';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useTranslation } from 'react-i18next';

const dataIcons = [
    {
        name: "cart"
    },
    {
        name: "arrow-u-left-top"
    },
    {
        name: "package-variant"
    },
    {
        name: "poll"
    },
    {
        name: "view-list"
    },
    // {
    //     name: "cog"
    // },
    // {
    //     name: "receipt"
    // },
    {
        name: "barcode"
    }
]

const MenuList = (props: any) => {
    const { t, i18n } = useTranslation();
    const {colorMode} = useColorMode()

    return (
        <Pressable _dark={{
            bg: "#1e1f21"
        }} _light={{
            bg: "#ffffff"
        }}  shadow={"4"}  borderRadius={10} p={3} m={3} flex={1} onPress={() => props.onPress(props.item.id)}>
            {({ isPressed }) => {
                return (<Box  style={{
                    transform: [{
                        scale: isPressed ? 0.96 : 1
                    }]
                }}>
                    <HStack space={3} alignItems={"center"}>
                        <Icon size={40} color={colorMode==="dark"? "#7f8183": "black"} name={dataIcons[props.index].name} />
                        <Text   fontSize={"xl"} fontWeight={"400"}>
                           { t(props.item.title)}
                        </Text>
                    </HStack>
                </Box>)
            }

            }
        </Pressable>)
}

export default MenuList