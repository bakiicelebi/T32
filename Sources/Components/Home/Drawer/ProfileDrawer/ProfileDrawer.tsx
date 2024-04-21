import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Text, StyleSheet, Animated, Dimensions, Button, Pressable } from 'react-native';
import styles from "./ProfileDrawer.style";

import MenuButtons from "../MenuButtons";
import ProfileSection from "../ProfileSection";

const size = Dimensions.get("window");
const width = size.width;
const height = size.height;

const ProfileDrawer = () => {

    const start: any = width * 0.07;
    const end: any = width * 0.2;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuWidth, setMenuWidth] = useState(new Animated.Value(start));
    const [loading, setLoading] = useState(false);
    const [fullyClosed, setFullyClosed] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setLoading(true);
        const toValue = isMenuOpen ? start : end;

        Animated.timing(
            menuWidth,
            {
                toValue,
                duration: 300,
                useNativeDriver: false,
            }
        ).start(() => {
            setFullyClosed(!fullyClosed);
            setLoading(false);
        });
    };


    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback disabled={loading} onPress={toggleMenu} style={styles.menuButton}>
                <Animated.View style={[styles.menu, { width: menuWidth }]}>
                    <View style={{ flex: .3 }}>
                        <ProfileSection fullyClosed={fullyClosed} name="John DOE" menuOpen={isMenuOpen} />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <MenuButtons disabled={!isMenuOpen} icon="ABS" title={"aassads"} />
                        <MenuButtons disabled={!isMenuOpen} icon="ABC" title={"asdsasad"} />
                        <MenuButtons disabled={!isMenuOpen} icon="SBS" title={"aassads"} />
                        <MenuButtons disabled={!isMenuOpen} icon="KLA" title={"asdsasad"} />
                    </View>
                    <View style={{ flex: .5, justifyContent: "flex-end" }}>
                        <Text style={{ fontSize: 30 }}>LOG OUT</Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View >
    );
};

export default ProfileDrawer;