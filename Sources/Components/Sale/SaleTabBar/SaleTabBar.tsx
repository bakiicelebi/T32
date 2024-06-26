import { Box, Modal, Pressable, Text } from "native-base";
import SaleTabs from "../SaleTabs";
import { useEffect, useState } from "react";
import LogoLoading from "../../GeneralComponents/LottieComponents/LogoLoading";
import { ActivityIndicator } from "react-native";


const SaleTabBar = ({ nav, tabNumber, incTabs, decTabs, openTabs, setSelectedSale, selectedSale }: any) => {

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(false)
    }, [tabNumber])


    const handleAdding = () => {
        incTabs()
    }


    return (
        <>
            <Box marginTop={4} ml={4} flexDirection={"row"} alignItems={"center"} flex={1}>
                <SaleTabs tabNumber={tabNumber} no={1} nav={nav} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />
                {tabNumber >= 2 && <SaleTabs tabNumber={tabNumber} no={2} nav={nav} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />}
                {tabNumber >= 3 && <SaleTabs tabNumber={tabNumber} no={3} nav={nav} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />}
                {tabNumber >= 4 && <SaleTabs tabNumber={tabNumber} no={4} nav={nav} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />}
                {tabNumber >= 5 && <SaleTabs tabNumber={tabNumber} no={5} nav={nav} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />}
                {tabNumber < 5 && <Pressable shadow={"8"} borderRadius={50} _dark={{
                    bg: "#1e1f21"
                }} _light={{
                    bg: "#ffffff"
                }} isDisabled={loading} onTouchStart={() => setLoading(true)} onTouchMove={() => setLoading(false)} onPress={handleAdding}>
                    <Text px={2} fontSize={"2xl"} mx={2}>+</Text>
                </Pressable>}
                {loading && <ActivityIndicator style={{ marginLeft: 5 }} />}
            </Box>
            <Modal isOpen={loading} onClose={() => { }}>
                <Box borderRadius={15} _dark={{
                    bg: "#1e1f21"
                }} _light={{
                    bg: "#ffffff"
                }} w={100} h={100}>
                    <LogoLoading />
                </Box>
            </Modal>
        </>
    )
}

export default SaleTabBar;