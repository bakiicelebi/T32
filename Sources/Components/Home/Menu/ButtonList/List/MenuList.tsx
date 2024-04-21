import React from 'react';
import { Box, HStack, Avatar, VStack, Text, Spacer, Pressable, Badge, Flex, Image } from 'native-base';
import { Dimensions } from 'react-native';

const size = Dimensions.get("window");

const MenuList = (props: any) => {

    const item = props.item;
    return (
        // <Box borderBottomWidth="1" _dark={{
        //     borderColor: "muted.50"
        // }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
        //     <HStack space={[2, 3]} justifyContent="space-between">
        //         <Avatar size="48px" source={{
        //             uri: item.avatarUrl
        //         }} />
        //         <VStack>
        //             <Text _dark={{
        //                 color: "warmGray.50"
        //             }} color="coolGray.800" bold>
        //                 AAA
        //             </Text>
        //             <Text color="coolGray.600" _dark={{
        //                 color: "warmGray.200"
        //             }}>
        //                 BBB
        //             </Text>
        //         </VStack>
        //         <Spacer />
        //         <Text fontSize="xs" _dark={{
        //             color: "warmGray.50"
        //         }} color="coolGray.800" alignSelf="flex-start">
        //             CCCC
        //         </Text>
        //     </HStack>
        // </Box>
        <Box flex={1} alignItems="center" >
            <Pressable  >
                {({
                    isPressed
                }) => {
                    return <Box m={2} w={size.width/10} h={size.height/6}  alignItems={"center"} maxW="96" bg={isPressed ? 'coolGray.200' : 'coolGray.100'} p="5" rounded="15" style={{
                        transform: [{
                            scale: isPressed ? 0.96 : 1
                        }]
                    }}>
                        <Image source={{ uri: item.url }} alt={item.title} size="md" />
                        <Box p={2}>
                            <Text>
                                {item.title}
                            </Text>
                        </Box>
                    </Box>

                }}
            </Pressable>
        </Box>
    )
}

export default MenuList;