import React from 'react'
import { Box, Heading, FlatList, HStack, Avatar, VStack, Text, Spacer } from 'native-base'
import MenuList from '../List/MenuList';

const Example = () => {
    const data = [{
        id: "1",
        title: "Sale",
        url: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }, {
        id: "2",
        title: "Return",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
    }, {
        id: "3",
        title: "Prices",
        url: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    }, {
        id: "4",
        title: "Reports",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
    }, {
        id: "5",
        title: "Enter Product",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
    }, {
        id: "6",
        title: "Obtains",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
    }, {
        id: "7",
        title: "Others",
        url: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    }, {
        id: "8",
        title: "See The Price",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
    }];

    const renderItems = ({ item }: any) => <MenuList item={item} />

    return (
        <Box>
            <FlatList numColumns={2} data={data} renderItem={renderItems} keyExtractor={item => item.id} />
        </Box>
    );
};

export default Example;