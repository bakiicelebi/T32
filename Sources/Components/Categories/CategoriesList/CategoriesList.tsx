import { Box, Image, Text, Pressable } from "native-base";
import React from 'react'
import { useWindowDimensions } from "react-native";

const CategoriesList = ({ item, onPress }: any) => {
    const layout = useWindowDimensions()

    return (
        <Pressable  alignItems={"center"} flex={1} my={4}  onPress={() => onPress(item.item.key)}>
            <Box _dark={{
                bg: "#1e1f21"
            }} _light={{
                bg: "#ffffff"
            }} shadow={"6"} borderRadius={15} justifyContent={"center"} w={"50%"} p={5} alignItems={"center"} >
                <Image alt="photo" source={{ uri: item.item.imageUrl }} w={100} h={100} resizeMode="contain" />
                <Text pt={3} fontSize={"xl"}>{item.item.name}</Text>
            </Box>
        </Pressable>
    )
}

export default CategoriesList;