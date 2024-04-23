import React, { useState } from "react";


import styles from "./HomeWindow.style";
import ListBase from "../../Components/Home/Menu/ButtonList/ListBase";

import ProfileDrawer from "../../Components/Home/Drawer/ProfileDrawer";
import { Heading, View } from "native-base";
import Dashboard from "../../Components/Home/Dashboard";



const HomeWindow = () => {

    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: .4 }}>
                <ProfileDrawer />
            </View>
            <View style={{ flex: 2 }}>
                <Dashboard />
            </View>
            <View style={{ flex: 1 }}>
                <ListBase />
            </View>

        </View>
    )

};

export default HomeWindow;