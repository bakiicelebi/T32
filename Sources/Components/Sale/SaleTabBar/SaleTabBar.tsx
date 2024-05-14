import { Box, Pressable, Text } from "native-base";
import SaleTabs from "../SaleTabs";


const SaleTabBar = ({ nav, tabNumber, incTabs, decTabs, openTabs, setSelectedSale, selectedSale }: any) => {

    const isSelectedSaleTab = (index: any) => {
        return index === selectedSale;
    }


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
    )
}

export default SaleTabBar;