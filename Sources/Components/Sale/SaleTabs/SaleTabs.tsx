import { Box, HStack, Text, Pressable } from 'native-base'
import React, { useEffect, useState } from 'react';


const SaleTabs = ({ tabNumber, no, nav, decTabs, openTabs, setSelectedSale, selectedSale }: any) => {

    const isSelectedSaleTab = (index: any) => {
        return index === selectedSale;
    }

    return (
        <Pressable onPress={() => { setSelectedSale(no); console.log(selectedSale); nav.navigate(`Sale${openTabs[no - 1]}`) }}>
            <Box style={{ backgroundColor: isSelectedSaleTab(no) ? "green" : "yellow", flexDirection: "row", alignItems: "center", marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={{ fontSize: 20 }}>Sale {no}</Text>
                {tabNumber > 1 && <Pressable onPress={() => decTabs(openTabs[no - 1])}>
                    <Text style={{ fontSize: 20, paddingLeft: 15 }}>X</Text>
                </Pressable>}
            </Box>
        </Pressable >
    )
}

export default SaleTabs;