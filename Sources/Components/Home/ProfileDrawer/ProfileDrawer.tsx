import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Text, StyleSheet, Animated, Dimensions, Button, Pressable } from 'react-native';
import styles from "./ProfileDrawer.style";

import MenuButtons from "../MenuButtons";
import ProfileSection from "../ProfileSection";

const size = Dimensions.get("window");
const width = size.width;
const height = size.height;

const ProfileDrawer = () => {

    const start = width * 0.07;
    const end = width * 0.2;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuWidth, setMenuWidth] = useState(new Animated.Value(start));

    

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        Animated.timing(
            menuWidth,
            {
                toValue: isMenuOpen ? start : end,
                duration: 300,
                useNativeDriver: false,
            }
        ).start();

    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={toggleMenu} style={styles.menuButton}>
                <Animated.View style={[styles.menu, { width: menuWidth }]}>
                    <ProfileSection name="John DOE" menuOpen={isMenuOpen} />
                    <MenuButtons disabled={!isMenuOpen} icon="ABS" title={"aassads"} />
                    <MenuButtons disabled={!isMenuOpen} icon="ABC" title={"asdsasad"} />
                    <MenuButtons disabled={!isMenuOpen} icon="SBS" title={"aassads"} />
                    <MenuButtons disabled={!isMenuOpen} icon="KLA" title={"asdsasad"} />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View >
    );
};

export default ProfileDrawer;