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
                    return <Box m={2} w={size.width / 17} h={size.height / 9} alignItems={"center"} maxW="100" opacity={isPressed ? .9 : 1} p="5" rounded="15" style={{
                        transform: [{
                            scale: isPressed ? 0.96 : 1
                        }]
                    }}>
                        <Image maxW={size.width / 20} maxH={size.height / 15} resizeMode='cover' source={{ uri: item.url }} alt={item.title} size="md" />
                        <Box  >
                            <Text size={"md"} fontWeight={"400"} textAlign={"center"} flex={1}>
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