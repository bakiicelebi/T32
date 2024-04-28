import React, { useEffect, useState } from 'react';
import { Box, Center, Icon, HStack, NativeBaseProvider, Heading, Button, VStack } from 'native-base';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");
const Settings = () => {


    return (<NativeBaseProvider>

        <Center flex={1}>
            <Heading>
                Settings
            </Heading>
            <Box bg="coolGray.500" height={height / 1.5} borderRadius={15} width={width / 1.5} >
                <VStack flex={1} bg={"blue.400"} >
                    <HStack alignItems={"center"} justifyContent={"space-evenly"} flex={1} bg={"amber.700"} >
                        <Button _text={{ fontSize: "2xl" }} variant={"outline"}>
                            DENEME 1
                        </Button>
                        <Button _text={{ fontSize: "2xl" }} variant={"outline"}>
                            DENEME 2
                        </Button>
                    </HStack>
                    <HStack alignItems={"center"} justifyContent={"space-evenly"} flex={1} bg={"amber.700"} >
                        <Button _text={{ fontSize: "2xl" }} variant={"outline"}>
                            DENEME 1
                        </Button>
                        <Button _text={{ fontSize: "2xl" }} variant={"outline"}>
                            DENEME 2
                        </Button>
                    </HStack>
                    <HStack alignItems={"center"} justifyContent={"space-evenly"} flex={1} bg={"amber.700"} >
                        <Button _text={{ fontSize: "2xl" }} variant={"outline"}>
                            DENEME 1
                        </Button>
                        <Button _text={{ fontSize: "2xl" }} variant={"outline"}>
                            DENEME 2
                        </Button>
                    </HStack>



                </VStack>
            </Box>

        </Center>
    </NativeBaseProvider>)
}

export default Settings;