import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, Animated, Dimensions, useWindowDimensions, Alert } from 'react-native';
import { View, Text, Box, useColorMode } from 'native-base';
import { BlurView } from '@react-native-community/blur';
import styles from "./ProfileDrawer.style";
import AsyncStorage from '@react-native-async-storage/async-storage';

import MenuButtons from "../MenuButtons";
import ProfileSection from "../ProfileSection";
import { useData } from "../../../../context/DataContext";
import { useTranslation } from "react-i18next";

const size = Dimensions.get("window");
const width = size.width;
const height = size.height;

const ProfileDrawer = ({ navigation }: any) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fullyClosed, setFullyClosed] = useState(true);
    const [start, setStart] = useState(useWindowDimensions().width * 0.08);
    const [end, setEnd] = useState(useWindowDimensions().width * 0.23);
    const [menuWidth, setMenuWidth] = useState(new Animated.Value(start));


    const { t, i18n } = useTranslation();
    const { inUser, removeUser }: any = useData()

    const { colorMode }: any = useColorMode()


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

        Alert.alert(t('logging out'), t('sure you want to log out?'), [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'YES', onPress: () => yesPressed() },
        ]);

        const yesPressed = async () => {
            setLoading(true)
            try {
                await AsyncStorage.removeItem('userData');
                removeUser()
                console.log("cikis Yapildi")
                navigation.navigate("LogInScreen")
            } catch (error) {
                console.log('Error logging out: ', error);
            }
            setLoading(false)
        }
    };

    const handleAccount = () => {
        console.log("handleAccount")
        toggleMenu()
    }

    const handleReports = () => {
        navigation.navigate("ReportsScreen")
        toggleMenu()
    }

    const handleSettings = () => {
        navigation.navigate("SettingsScreen")
        toggleMenu()
    }

    return (
        <Box mr={2} top={12} zIndex={99} flexDirection={"row"}>
            <TouchableWithoutFeedback disabled={loading || isMenuOpen} onPress={toggleMenu} style={styles.menuButton}>
                <Animated.View style={[styles.menu, { width: menuWidth }]}>
                    <Box shadow={"5"} style={{
                        padding: 10,
                        paddingBottom: 10,
                        borderRadius: 15
                    }} _dark={{
                        bg: "#1e1f21"
                    }} _light={{
                        bg: "#ffffff"
                    }} flex={1} >
                        <Box flex={.3} >
                            <ProfileSection fullyClosed={fullyClosed} user={inUser} menuOpen={isMenuOpen} />
                        </Box>
                        <Box flex={1} justifyContent={"center"}>
                            <MenuButtons disabled={!isMenuOpen} onPress={handleAccount} icon="account" title={"account"} />
                            <MenuButtons disabled={!isMenuOpen} onPress={handleReports} icon="poll" title={"reports"} />
                            <MenuButtons disabled={!isMenuOpen} onPress={handleSettings} icon="cog" title={"settings"} />
                        </Box>
                        <MenuButtons disabled={!isMenuOpen} onPress={handleLogout} icon="logout" title={"log out"} />
                    </Box>
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
                            height: height + 100
                        }}
                        blurType={colorMode}  // Values = dark, light, xlight .
                        blurAmount={8}
                        // viewRef={this.state.viewRef}
                        reducedTransparencyFallbackColor="white"
                    />
                </TouchableWithoutFeedback>
            )}
        </Box >
    );
};

export default ProfileDrawer;