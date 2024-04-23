import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import styles from "./DashBase.style";
import NumberChart from '../NumberChart';
import BarChart from '../BarChart';
import PieChart from '../PieChart';
import { Box, HStack, VStack } from 'native-base';



const DashBase = () => {
    return (
            <Box bg={"darkBlue.800"} flex={1} padding={15}>
                <VStack>
                    <HStack >
                        <NumberChart />
                        <BarChart />
                        <NumberChart />
                    </HStack>
                    <HStack alignItems={"center"} justifyContent={"space-evenly"}>
                        <PieChart />
                        <PieChart />
                    </HStack>
                </VStack>
            </Box>
    )
}

export default DashBase;