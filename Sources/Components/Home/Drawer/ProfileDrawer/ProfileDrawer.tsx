import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Text, StyleSheet, Animated, Dimensions, Button, Pressable } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import styles from "./ProfileDrawer.style";
import AsyncStorage from '@react-native-async-storage/async-storage';

import MenuButtons from "../MenuButtons";
import ProfileSection from "../ProfileSection";

const size = Dimensions.get("window");
const width = size.width;
const height = size.height;

const ProfileDrawer = ({ navigation }: any) => {

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

    const handleLogout = async () => {
        setLoading(true)
        try {
            await AsyncStorage.removeItem('userData');
            console.log("cikis Yapildi")
            navigation.navigate("LogInScreen")
        } catch (error) {
            console.log('Error logging out: ', error);
        }
        setLoading(false)
    };


    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback disabled={loading || isMenuOpen} onPress={toggleMenu} style={styles.menuButton}>
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
                    <Button title="Log Out" onPress={handleLogout} />
                </Animated.View>
            </TouchableWithoutFeedback>
            {isMenuOpen && (
                <TouchableWithoutFeedback disabled={loading} onPress={toggleMenu}>
                    <BlurView
                        style={{
                            position: "absolute",
                            top: -100,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            width: width,
                            height: height
                        }}
                        blurType="dark"  // Values = dark, light, xlight .
                        blurAmount={8}
                        // viewRef={this.state.viewRef}
                        reducedTransparencyFallbackColor="white"
                    />
                </TouchableWithoutFeedback>
            )}
        </View >
    );
};

export default ProfileDrawer;