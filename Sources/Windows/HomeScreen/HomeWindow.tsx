import React, { useState } from "react";


import styles from "./HomeWindow.style";
import ListBase from "../../Components/Home/Menu/ButtonList/ListBase";

import ProfileDrawer from "../../Components/Home/Drawer/ProfileDrawer";
import { Heading, Box, HStack, VStack } from "native-base";
import Dashboard from "../../Components/Home/Dashboard";
import OnlinePeople from "../../Components/Home/OnlinePeople/OnlinePeople";

const HomeWindow = ({ navigation }: any) => {

    return (
        <Box flex={1}>
            <Heading margin={3} textAlign={"center"}>
                HEAD
            </Heading>
            <HStack flex={1}>
                <Box>
                    <ProfileDrawer navigation={navigation} />
                </Box>
                <Box >
                    <Dashboard />
                </Box>
                <VStack flex={1}>
                    <Box flex={.3}>
                        <OnlinePeople />
                    </Box>
                    <Box flex={1}>
                        <ListBase />
                    </Box>
                </VStack>
            </HStack>
        </Box>
    )

};

export default HomeWindow;