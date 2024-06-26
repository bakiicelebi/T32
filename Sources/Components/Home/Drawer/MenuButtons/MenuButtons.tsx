import React, { useState } from "react";
import { View, TouchableWithoutFeedback, StyleSheet, Animated, Dimensions, Button } from 'react-native';
import styles from "./MenuButtons.style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Box, Pressable, useColorMode, Text } from "native-base";
import { useTranslation } from "react-i18next";

const size = Dimensions.get("window");
const width = size.width;
const height = size.height;


const ProfileDrawer = (props: any) => {
    const { t, i18n } = useTranslation();
    const {
        colorMode,
        toggleColorMode
    } = useColorMode();
    return (
        <Box paddingBottom={7}>
            <Pressable onPress={props.onPress} disabled={props.disabled}>
                <Box alignItems={"center"} style={{ flexDirection: "row", alignItems: "center", alignSelf: props.disabled ? "center" : "auto" }}>
                    <Icon size={40} style={{ color: colorMode === "dark" ? "#7f8183" : "black" }} name={props.icon} />
                    {!props.disabled && <Text color={props.icon === "logout" ? "red.400" : "black"} _dark={{ color: props.icon === "logout" ? "red.400" : "#7f8183" }} fontSize={"2xl"} ellipsizeMode="tail" style={styles.menuButtonText} numberOfLines={1} >{t(props.title)}</Text>}
                </Box>
            </Pressable>
        </Box>
    );
};

export default ProfileDrawer;