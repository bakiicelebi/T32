<<<<<<< HEAD
import { Box, Modal, Pressable, Text } from "native-base";
import SaleTabs from "../SaleTabs";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import LogoLoading from "../../GeneralComponents/LottieComponents/LogoLoading";
=======
import { Box, Pressable, Text } from "native-base";
import SaleTabs from "../SaleTabs";
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a


const SaleTabBar = ({ nav, tabNumber, incTabs, decTabs, openTabs, setSelectedSale, selectedSale }: any) => {

<<<<<<< HEAD
    const [loading, setLoading] = useState(false)

=======
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
    const isSelectedSaleTab = (index: any) => {
        return index === selectedSale;
    }

<<<<<<< HEAD
    

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
=======

    return (

        <Box style={{ flex: 1, alignItems: "center", flexDirection: "row", left: 20, top: 20, backgroundColor: "yellow", }}>

            <SaleTabs tabNumber={tabNumber} no={1} nav={nav} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />
            {tabNumber >= 2 && <SaleTabs tabNumber={tabNumber} no={2} nav={nav} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />}
            {tabNumber >= 3 && <SaleTabs tabNumber={tabNumber} no={3} nav={nav} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />}
            {tabNumber >= 4 && <SaleTabs tabNumber={tabNumber} no={4} nav={nav} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />}
            {tabNumber >= 5 && <SaleTabs tabNumber={tabNumber} no={5} nav={nav} decTabs={decTabs} openTabs={openTabs} setSelectedSale={setSelectedSale} selectedSale={selectedSale} />}
            {tabNumber < 5 && <Pressable onPress={incTabs}>
                <Text style={{ marginHorizontal: 10, fontSize: 20 }}>+</Text>
            </Pressable>}

        </Box>
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
    )
}

export default SaleTabBar;