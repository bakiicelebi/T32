import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import styles from "./DashBase.style";
import NumberChart from '../NumberChart';
import BarChart from '../BarChart';
import PieChart from '../PieChart';
import { Box, HStack, VStack } from 'native-base';



const DashBase = () => {
    return (
<<<<<<< HEAD
        <Box  flex={1} padding={15}>
            <VStack alignItems={"center"} >
                <HStack shadow={"4"} borderRadius={15} p={5} ml={-2}  pr={9} marginTop={7} 
                _dark={{
                    bg: "#1e1f21"
                }} _light={{
                    bg: "#ffffff"
                }}  space={16} >
                    <VStack>
                        <NumberChart type={true} />
                        <NumberChart type={false} />
                    </VStack>
                    <BarChart />
                </HStack>
                <HStack  alignItems={"center"} justifyContent={"space-evenly"}>
                    <PieChart type={true} />
                    <PieChart type={false} />
                </HStack>
            </VStack>
        </Box>
=======
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
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
    )
}

export default DashBase;