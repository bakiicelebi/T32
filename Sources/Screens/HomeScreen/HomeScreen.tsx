import React, { useEffect, useState } from "react";
import styles from "./HomeScreen.style";
import ListBase from "../../Components/Home/Menu/ButtonList/ListBase";
import ProfileDrawer from "../../Components/Home/Drawer/ProfileDrawer";
import { Heading, Box, HStack, VStack, Text } from "native-base";
import Dashboard from "../../Components/Home/Dashboard";
import OnlinePeople from "../../Components/Home/OnlinePeople/OnlinePeople";
import BottomBar from "../../Components/GeneralComponents/BottomBar";
import TopBar from "../../Components/GeneralComponents/TopBar";
import CampaignsSlider from "../../Components/Home/CampaignsSlider";
import BarcodeScreen from "../../Components/Sale/BarcodeScreen";
import { FlatList, useWindowDimensions } from "react-native";
import CustomModal from "../../Components/Payment/CustomModal";
import { useTranslation } from "react-i18next";


const HomeScreen = ({ navigation, route }: any) => {

    const [isScannerOpen, setIsScannerOpen] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    const height = useWindowDimensions().height
    const { t, i18n } = useTranslation()

    const { wrongAttempts } = route.params || { wrongAttempts: [] };

    const renderWrongAttemps = ({ item }: any) => {
        return (
            <Box p={3} borderRadius={15} borderColor={"#515557"} m={1} borderWidth={1}>
                <HStack mr={5} ml={5} flex={1} justifyContent={"space-between"}>
                    <Text fontSize={"lg"}>{item.date}</Text>
                    <Text fontSize={"lg"}>{item.time}</Text>
                </HStack>
                <Box mt={2} mb={2} borderWidth={1} bg={"#515557"} borderStyle={"dashed"} />
                <Text textAlign={"center"}>{item.reason}</Text>
            </Box>
        )
    }

    useEffect(() => {
        if (wrongAttempts && wrongAttempts.length > 0) {
            setModalVisible(true);
            console.log(wrongAttempts)
        }
    }, [wrongAttempts]);

    return (
        <>
            <Box _dark={{
                bg: "#141615"
            }} _light={{
                bg: "#eff3f6"
            }} flex={1}>
                <TopBar />
                <HStack h={height * (.86)} top={height / 26} justifyContent={"center"} flex={1}>
                    {isScannerOpen && <BarcodeScreen forPrice={true} setIsOpen={setIsScannerOpen} />}
                    <Box flex={.9}  >
                        <ProfileDrawer navigation={navigation} />
                    </Box>
                    <Box flex={4} >
                        <Dashboard />
                    </Box>
                    <VStack flex={3}>
                        <Box flex={1}>
                            <ListBase setIsScannerOpen={setIsScannerOpen} />
                        </Box>
                        <Box shadow={"4"} mr={5} flex={1} marginBottom={81} >
                            <CampaignsSlider />
                        </Box>
                    </VStack>
                </HStack>
                <BottomBar />
            </Box>
            <CustomModal button2={t('cancel')} header={t('wrong attempts')} isOpen={modalVisible} setIsOpen={setModalVisible}>
                <FlatList data={wrongAttempts} renderItem={renderWrongAttemps} keyExtractor={(item: any, index: any) => index} />
            </CustomModal>
        </>
    )

};

export default HomeScreen;