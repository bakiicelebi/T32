import React, { useState } from 'react'
import { Box, Heading, FlatList, HStack, Avatar, VStack, Text, Spacer, useDisclose } from 'native-base'
import MenuList from '../MenuList';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';

const ListBase = ({ setIsScannerOpen }: any) => {

    const handlePriceClick = () => {
        console.log("see the price clicked")
        setIsScannerOpen(true);
    }
    const navigation = useNavigation()

    const data = [{
        id: "1",
        title: "sale",
        url: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }, {
        id: "2",
        title: "return",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
    }, {
        id: "3",
        title: "products",
        url: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    }, {
        id: "4",
        title: "reports",
        url: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    }, {
        id: "5",
        title: "all products",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
    },
    //{
    //     id: "6",
    //     title: "Settings",
    //     url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
    // }, 
    // {
    //     id: "7",
    //     title: "Obtains",
    //     url: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    // }, 
    {
        id: "6",
        title: "see price",
        url: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    }];

    const handlePress = (butonKey: string) => {
        if (butonKey === "1") {
            //@ts-ignore
            navigation.navigate("SaleScreen")
        }
        if (butonKey === "3") {
            //@ts-ignore
            navigation.navigate("CategoryScreen");
        }
        if (butonKey === "4") {
            //@ts-ignore
            navigation.navigate("ReportsScreen");
        }
        if (butonKey === "5") {
            //@ts-ignore
            navigation.navigate("AllProductsScreen");
        }
        // if (butonKey === "6") {
        //     //@ts-ignore
        //     navigation.navigate("SettingsScreen");
        // }
        if (butonKey === "6") {
            handlePriceClick()
        }
    }

    const renderItems = ({ item, index }: any) => <MenuList onPress={handlePress} item={item} index={index} />

    const width = useWindowDimensions().width

    return (
        <Box flex={1} mr={4} style={{ marginTop: width/32 }} borderRadius={15}>
            <FlatList numColumns={2} data={data} renderItem={renderItems} keyExtractor={item => item.id} />
        </Box>
    );
};

export default ListBase;
